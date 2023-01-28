<template>
    <el-row class="menu">
        <el-col>
            <el-menu active-text-color="#cfcfcf" background-color="#1f7fd0" text-color="#fff">
                <router-link to="/home">
                    <el-menu-item index="0">
                        <img src="../assets/images/home.png" alt="" />
                        <span>首页</span>
                    </el-menu-item>
                </router-link>
                <template v-for="item in items">
                    <el-sub-menu v-if="item.children" :index="item.path" :key="item.path">
                        <template #title>
                            <i :class="`iconfont  ${item.icon}`"></i>
                            <span slot="title">{{ item.name }}</span>
                        </template>
                        <router-link v-for="(citem, cindex) in item.children" :to="citem.path" :key="cindex">
                            <el-menu-item :index="citem.path">
                                <span slot="title">{{ citem.name }}</span>
                            </el-menu-item>
                        </router-link>
                    </el-sub-menu>
                </template>
            </el-menu>
        </el-col>
    </el-row>
</template>

<script setup>
import { reactive } from "vue";
const items = reactive([
    {
        icon: "",
        name: "书籍管理",
        path: "book",
        children: [
            {
                path: "booklist",
                name: "书单",
            },
        ],
    },
    {
        icon: "",
        name: "信息管理",
        path: "info",
        children: [
            {
                path: "infoshow",
                name: "个人中心",
            },
            {
                path: "userinfo",
                name: "用户信息"
            }
        ],
    },
]);
</script>

<style lang="less" scoped>
.menu {
    border: none;
    width: 18%;
    height: 100vh;
    position: absolute;
}

.el-menu {
    height: 100%;
}

.router-link-active {
    text-decoration: none;
}

a {
    text-decoration: none;
}

.el-menu-item img {
    height: 22px;
    width: 22px;
    margin: 5px;
}
</style>
