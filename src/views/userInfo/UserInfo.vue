<template>
    <div class="main">
        <div class="button">
            <el-button type="primary" class="addButton" @click="handleAdd" :disabled="user.identity != '管理员'"><el-icon>
                    <Plus />
                </el-icon>添加</el-button>
        </div>
        <div class="table">
            <el-table :data="tableData" stripe class="userdata">
                <el-table-column prop="count" v-if="false">
                </el-table-column>
                <el-table-column label="问题" prop="question" width="200" align="center">
                </el-table-column>
                <el-table-column label="解答" prop="answer" width="210" align="center" show-overflow-tooltip>
                </el-table-column>
                <el-table-column label="操作" prop="option" width="200" align="center">
                    <template #default="scope">
                        <el-button type="warning" @click="handleEdit(scope.row)" :disabled="user.identity != '管理员'">
                            <el-icon>
                                <Edit />
                            </el-icon>编辑</el-button>
                        <el-button type="danger" @click="DeleteQue(scope.row)" :disabled="user.identity != '管理员'">
                            <el-icon>
                                <Delete />
                            </el-icon>删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-table :data="feedbackData" stripe class="feedback">
                <el-table-column label="count" prop="id" width="140" align="center">
                </el-table-column>
                <el-table-column label="用户反馈" prop="feedback" width="200" align="center" show-overflow-tooltip>
                </el-table-column>
                <el-table-column label="操作" prop="option" width="200" align="center">
                    <template #default="scope">
                        <el-button type="danger" @click="DeleteFb(scope.row)" :disabled="user.identity != '管理员'">
                            <el-icon>
                                <Delete />
                            </el-icon>删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
    <dialog-vue :dialog="dialog" :formData="formData" @update="getFeedback" @update1="getAnswer"></dialog-vue>
    <dialog1-vue :dialog="dialog1" :formData="formData" @update="getAnswer"></dialog1-vue>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance, computed } from "vue";
import { Edit, Delete, Plus } from "@element-plus/icons";
import { useStore } from "vuex";
import DialogVue from "@/components/DialogDelete.vue";
import Dialog1Vue from "@/components/DialogAddque.vue";
const { proxy } = getCurrentInstance();
const store = useStore();
const user = computed(() => {
    return store.getters.user;
});

let dialog = ref({ show: false, option: "" });
let dialog1 = ref({ show: false, title: "", option: "" });
let tableData = ref([])
let feedbackData = ref([])
const formData = ref({
    id: "",
    count: "",
    question: "",
    answer: ""
});

const getAnswer = () => {
    proxy.$axios
        .post("/user/answer")
        .then((res) => {
            tableData.value = res.data;
        })
};

const getFeedback = () => {
    proxy.$axios
        .post("/user/showfeedback")
        .then((res) => {
            feedbackData.value = res.data;
        })
}

const handleAdd = () => {
    dialog1.value = {
        show: true,
        title: "添加信息",
        option: "add",
    }
    formData.value = {
        question: "",
        answer: "",
    }
}

const handleEdit = (row) => {
    dialog1.value = {
        show: true,
        title: "编辑信息",
        option: "edit",
    }
    formData.value = {
        count: row.count,
        question: row.question,
        answer: row.answer,
    }
}

const DeleteQue = (row) => {
    dialog.value = {
        show: true,
        option: "question_delete",
    };
    formData.value = {
        count: row.count,
    }
}

const DeleteFb = (row) => {
    dialog.value = {
        show: true,
        option: "feedback_delete",
    };
    formData.value = {
        id: row.id,
    }
}

onMounted(() => {
    getAnswer();
    getFeedback();
});

</script>

<style lang="less" scoped>
:deep(.el-popper) {
    max-width: 250px;
}

.main {
    height: 100vh;
    margin-left: 16vh;
    background-color: #f5f5f5;

    @media screen and (min-width: 220px) and (max-width:600px) {
        flex-direction: column;
        margin-top: 60px;
        margin-left: 0;
        height: 90vh;
    }
}

.button{
    padding: 10px;
}

.table {
    height: 90%;
    display: flex;
    justify-content: space-around;

    @media screen and (min-width: 220px) and (max-width:600px) {
        flex-direction: column;
        align-items: center;
    }
}

::-webkit-scrollbar {
    display: none;
}

.userdata {
    width: 45%;
    height: 90%;
    overflow: scroll;

    @media screen and (min-width: 220px) and (max-width:600px) {
        width: 90%;
        height: 45%;
    }
}

.feedback {
    width: 40%;
    height: 90%;
    overflow: scroll;

    @media screen and (min-width: 220px) and (max-width:600px) {
        width: 90%;
        height: 45%;
        margin-top: 10px;
    }
}</style>