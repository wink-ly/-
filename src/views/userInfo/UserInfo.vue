<template>
    <div class="main">
        <el-table :data="tableData" stripe v-if="user.identity == '管理员'">
            <el-table-column label="openid" prop="openid" align="center">
            </el-table-column>
            <el-table-column label="session_key" prop="session_key" align="center">
            </el-table-column>
        </el-table>
        <span v-else>无权查看</span>
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

<style lang="less" scoped>
.main {
    margin-left: 16vh;
    background-color: #f5f5f5;
    height: 100vh;
    padding: 20px;
    display: flex;
    justify-content: center;
    @media screen and (min-width: 220px) and (max-width:600px) {
        margin-top: 60px;
        margin-left: 0;
    }
}

.el-table {
    width: 80%;
    @media screen and (min-width: 220px) and (max-width:600px) {
        width: 100%;
    }
}
</style>