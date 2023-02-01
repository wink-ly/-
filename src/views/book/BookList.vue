<template>
    <meta name="referrer" content="never">
    <div class="list">
        <el-button type="primary" class="addButton" @click="handleAdd" :disabled="user.identity != '管理员'"><el-icon>
                <Plus />
            </el-icon>添加</el-button>
        <el-table :data="tableData" stripe>
            <el-table-column label="序号" width="100" prop="bookid" align="center">
            </el-table-column>
            <el-table-column label="封面" width="140" prop="img" align="center">
                <template #default="scope">
                    <el-image :src="scope.row.img" style="width: 60px; height: 85px ; border-radius: 5px;">
                    </el-image>
                </template>
            </el-table-column>
            <el-table-column label="书名" width="160" prop="book_name" align="center">
            </el-table-column>
            <el-table-column label="作者" width="140" prop="author" align="center">
            </el-table-column>
            <el-table-column label="出版社" width="140" prop="publish" align="center">
            </el-table-column>
            <el-table-column label="分类" width="120" prop="category" align="center">
            </el-table-column>
            <el-table-column label="数量" width="100" prop="count" align="center">
            </el-table-column>
            <el-table-column label="介绍" width="250" prop="introduction" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="操作" width="200" prop="operation" align="center">
                <template #default="scope">
                    <el-button type="warning" @click="handleEdit(scope.row)"
                        :disabled="user.identity != '管理员'"><el-icon>
                            <Edit />
                        </el-icon>编辑</el-button>
                    <el-button type="danger" @click="handleDelete(scope.row)"
                        :disabled="user.identity != '管理员'"><el-icon>
                            <Delete />
                        </el-icon>删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-row>
            <el-col :span="24">
                <div class="pagesize">
                    <el-pagination v-model:current-page="paginations.page_index" :page-size="paginations.page_size"
                        :page-sizes="paginations.page_sizes" :layout="paginations.layout" :total="paginations.total"
                        @size-change="handleSizeChange" @current-change="handleCurrentChange" />
                </div>
            </el-col>
        </el-row>
    </div>
    <dialog-vue :dialog="dialog" @update="getProfile" :formData="formData"></dialog-vue>
</template>

<script setup>
import { Plus, Edit, Delete } from "@element-plus/icons";
import { ref, onMounted, getCurrentInstance, computed } from "vue";
import DialogVue from "@/components/Dialog.vue";
import { useStore } from "vuex";
const { proxy } = getCurrentInstance();
const store = useStore();
const user = computed(() => {
    return store.getters.user;
});

let tableData = ref([])
let allTableData = ref([]);
let dialog = ref({ show: false, title: "", option: "" });
const formData = ref({
    bookid: "",
    book_name: "",
    author: "",
    publish: "",
    category: "",
    count: "",
    img: "",
    introduction: "",
});

const paginations = ref({
    page_index: 1, // 当前位于哪一页
    total: 0, // 总数
    page_size: 0, // 一页显示多少条
    page_sizes: [5, 10, 15], // 每页显示多少条
    layout: "total, sizes, prev, pager, next, jumper", // 翻页属性
});

// 获取表格数据;
const getProfile = () => {
    proxy.$axios
        .post("/book/allBooks")
        .then((res) => {
            allTableData.value = res.data;
            // 将书籍总数存入localStorage
            localStorage.setItem("data", res.data.length)
            // 设置分页数据
            setPaginations();
        })
};
const setPaginations = () => {
    // 分页属性设置
    paginations.value.total = allTableData.value.length;
    paginations.value.page_index = 1;
    paginations.value.page_size = 5;
    // 设置默认的分页数据
    tableData.value = allTableData.value.filter((item, index) => {
        return index < paginations.value.page_size;
    });
};

const handleSizeChange = (page_size) => {
    // 切换页面
    paginations.value.page_index = 1;
    paginations.value.page_size = page_size;
    tableData.value = allTableData.value.filter((item, index) => {
        return index < page_size;
    });
};

const handleCurrentChange = (page) => {
    // 获取当前页
    let index = paginations.value.page_size * (page - 1);
    // 数据的总数
    let nums = paginations.value.page_size * page;
    // 容器
    let tables = ref([]);
    for (let i = index; i < nums; i++) {
        if (allTableData.value[i]) {
            tables.value.push(allTableData.value[i]);
        }
        tableData.value = tables.value;
    }
};

//编辑
const handleEdit = (row) => {
    dialog.value = {
        show: true,
        title: "修改信息",
        option: "edit",
    };
    formData.value = {
        bookid: row.bookid,
        book_name: row.book_name,
        author: row.author,
        publish: row.publish,
        category: row.category,
        count: row.count,
        img: row.img,
        introduction: row.introduction,
    };
};
//添加
const handleAdd = () => {
    dialog.value = {
        show: true,
        title: "添加信息",
        option: "add",
    };
    formData.value = {
        bookid: "",
        book_name: "",
        author: "",
        publish: "",
        category: "",
        count: "",
        img: "",
        introduction: "",
    };
};
//删除
const handleDelete = (row) => {
    proxy.$axios.post(`/book/delete/${row.bookid}`).then((res) => {
        proxy.$message("删除成功！");
        getProfile();
    });
};

onMounted(() => {
    getProfile();
});

</script>

<style lang="css">
.el-popper {
    max-width: 250px;
}
</style>
<style lang="less" scoped>
.list {
    margin-left: 16vh;
    background-color: #f5f5f5;
    height: 100vh;
    padding: 20px;
    overflow: scroll;
}


.addButton {
    float: right;
    margin-top: 0;
    margin: 5px;
}

.pagesize {
    float: right;
    margin: 10px;
    height: 55px;
}
</style>

