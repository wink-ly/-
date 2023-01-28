<template>
    <div class="main">
        <el-table :data="tableData" stripe v-show="user.identity == '管理员'">
            <el-table-column label="openid" width="300" prop="openid" align="center">
            </el-table-column>
            <el-table-column label="session_key" width="300" prop="session_key" align="center">
            </el-table-column>
        </el-table>
        <span v-show="user.identity != '管理员'">无权查看</span>
    </div>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance, computed } from "vue";
import { useStore } from "vuex";
const { proxy } = getCurrentInstance();
const store = useStore();
const user = computed(() => {
    return store.getters.user;
});

let tableData = ref([])

// 获取表格数据;
const getProfile = () => {
    proxy.$axios
        .post("/user/allUsers")
        .then((res) => {
            tableData.value = res.data;
        })
};

onMounted(() => {
    getProfile();
});

</script>

<style scoped>
.main {
    margin-left: 18%;
    background-color: #f5f5f5;
    width: 82%;
    height: 100vh;
    padding: 20px;
    /* overflow: scroll; */
    display: flex;
    justify-content: center;
}

.el-table {
    width: 50%;
}
</style>