<template>
    <header class="top">
        <div class="left">
            <img src="../assets/images/logo.png" alt="" />
            <span>有点简朴的后台管理</span>
        </div>
        <div class="right">
            <img src="../assets/images/touxiang.png" alt="" />
            <span>欢迎</span>
            <span class="name">{{ user.name }}</span>
            <el-dropdown trigger="click" @command="setDialogInfo">
                <el-icon>
                    <ArrowDown />
                </el-icon>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="info">个人中心</el-dropdown-item>
                        <el-dropdown-item command="logout">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </header>
</template>

<script setup>
import { ArrowDown } from "@element-plus/icons";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
const router = useRouter();
const store = useStore();
const user = JSON.parse(JSON.stringify(store.getters.user))
const setDialogInfo = (Item) => {
    switch (Item) {
        case "info":
            showInfoList();
            break;
        case "logout":
            logout();
            break;
    }
};


const showInfoList = () => {
    router.push("/infoshow");
};

const logout = () => {
    // 清除token
    localStorage.removeItem("mytoken");
    // 设置vuex store
    store.dispatch("clearCurrentState");
    //   跳转
    router.push("/login");
};

</script>

<style lang="less" scoped>
.top {
    background-color: #fff;
    width: 100vw;
    height: 60px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    display: flex;
}

.left {
    color: #388adb;
    display: flex;
    align-items: center;
    font-size: 24px;
    width: 40vw;
    margin-left: 60px;
    letter-spacing: 3px;

    @media screen and (min-width: 220px) and (max-width:600px) {
        margin-left: 30px;
        font-size: 16px;
    }
}

.right {
    color: #808080;
    position: absolute;
    height: inherit;
    width: 40%;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    right: 0;
}

img {
    height: 25px;
    width: 25px;
    margin: 6px;
}

.name {
    color: #388adb;
    margin-left: 8px;
}

.el-icon {
    color: #000;
    margin-left: 5px;
}
</style>