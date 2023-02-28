<template>
    <div class="main">
        <div class="top">
            <div class="count">
                <span>书籍总数</span>
                <text><el-icon style="color: #f90000;">
                        <Management />
                    </el-icon>{{ books }}</text>
            </div>
            <div class="count">
                <span>累计用户数</span>
                <text><el-icon style="color: #08761f;">
                        <UserFilled />
                    </el-icon>{{ users }}</text>
            </div>
            <div class="count">
                <span>共享请求数</span>
                <text><el-icon style="color: #5470c6;">
                        <Opportunity />
                    </el-icon>{{ share }}</text>
            </div>
        </div>
        <div class="charts">
            <div class="list">
                <h2 style="color: #636363;">用户共享</h2>
                <el-table :header-cell-style="{ background: '#f7f8fc' }" :data="tableData">
                    <el-table-column label="书名" width="140" prop="book_name" align="center">
                    </el-table-column>
                    <el-table-column label="作者" width="130" prop="author" align="center">
                    </el-table-column>
                    <el-table-column label="出版社" width="130" prop="publish" align="center">
                    </el-table-column>
                    <el-table-column label="用户号码" width="130" prop="tel" align="center" v-if="user.identity == '管理员'">
                    </el-table-column>
                    <el-table-column label="操作" width="210" prop="option" align="center">
                        <template #default="scope">
                            <el-button type="warning" :disabled="user.identity != '管理员'">
                                <el-icon>
                                    <Edit />
                                </el-icon>复制</el-button>
                            <el-button type="danger" @click="handleDelete(scope.row)" :disabled="user.identity != '管理员'">
                                <el-icon>
                                    <Delete />
                                </el-icon>删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="column">
                <div id="pie" class="pie"></div>
                <div id="pie" class="pie"></div>
            </div>
        </div>
    </div>
</template>

<script setup>
import * as echarts from 'echarts';
import { ref, onMounted, getCurrentInstance, computed } from "vue";
import { Management, UserFilled, Opportunity, Delete, Edit } from "@element-plus/icons";
import { useStore } from "vuex";
const { proxy } = getCurrentInstance();
const store = useStore();
const user = computed(() => {
    return store.getters.user;
});
let books = localStorage.getItem("data");
let users = localStorage.getItem("user");
var share = 0;
const category = ["经典文学", "亲子共读", "科幻畅想", "心灵成长", "科学技术"]
var array = [];
var tableData = ref([]);

const getTable = async () => {
    await proxy.$axios
        .post("/book/share")
        .then((res) => {
            if (res.data === '暂无数据') {
                tableData.value = null
                share = 0
            } else {
                share = res.data.length
                tableData.value = res.data;
            }
        })
}

const getUsers = () => {
    proxy.$axios
        .post("/user/allUsers")
        .then((res) => {
            localStorage.setItem("user", res.data.length)
        })
};

const handleDelete = (row) => {
    proxy.$axios.post(`/book/delshare/${row.book_name}`).then((res) => {
        proxy.$message("删除成功！");
        getTable();
    });
};

const getPie = async () => {
    var chartDom = document.getElementById('pie');
    var chartPie = echarts.init(chartDom);
    var option;

    for (let i = 0; i < 5; i++) {
        await proxy.$axios
            .post(`/book/category/${category[i]}`)
            .then((res) => {
                array[i] = res.data.length
            })
    }
    option = {
        title: {
            text: '分类情况',
            left: 'center'
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            left: 'left'
        },
        series: [
            {
                type: 'pie',
                radius: '50%',
                data: [
                    { value: array[0], name: category[0] },
                    { value: array[1], name: category[1] },
                    { value: array[2], name: category[2] },
                    { value: array[3], name: category[3] },
                    { value: array[4], name: category[4] }
                ],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    chartDom.removeAttribute('_echarts_instance_');
    option && chartPie.setOption(option);

}
//监听浏览器窗口大小改变
window.addEventListener('resize', () => {
    location.reload()
});

onMounted(() => {
    getPie();
    getTable();
    getUsers();
})
</script>

<style lang="less" scoped>
.main {
    height: 92vh;
    background-color: #f7f8fc;
    padding: 20px;
}

.top {
    display: flex;
    color: #141313;

    div:first-child {
        margin-left: 20vh;
    }

    span {
        font-size: 16px;
        font-weight: bold;
        margin: 10px;

        @media screen and (min-width: 220px) and (max-width:600px) {
            width: 100%;
            font-size: 12px;
            text-align: center;
        }
    }
}

.count {
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 16vh;
    width: 20%;
    margin: 20px;
    padding: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);

    @media screen and (min-width: 220px) and (max-width:600px) {
        width: 100%;
        margin-left: 10px;
        margin-top: 60px;
    }
}

.charts {
    display: flex;
    height: 70%;

    @media screen and (min-width: 220px) and (max-width:600px) {
        height: 60vh;
        display: block;
        width: 100%;
        overflow: scroll;
    }
}

.list {
    height: 98%;
    width: 50vw;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
    padding: 10px;
    margin: 5px;
    margin-left: 20vh;
    display: flex;
    align-items: center;
    flex-direction: column;

    @media screen and (min-width: 220px) and (max-width:600px) {
        margin-left: 0;
        margin: 10px;
        padding: 5px;
        width: 95%;
    }
}

.list :deep(.el-table) {
    background-color: transparent;
}

.list :deep(.el-table ::before) {
    height: 0px;
}

.list :deep(.el-table tr) {
    background-color: transparent;
}

.column {
    height: auto;
    width: 30vw;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    @media screen and (min-width: 220px) and (max-width:600px) {
        height: 95%;
        width: 100%;
    }
}

.pie {
    height: 46%;
    width: 90%;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
    padding: 10px;
    margin: 10px;
}

::-webkit-scrollbar {
    display: none;
}
</style>