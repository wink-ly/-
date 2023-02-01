<template>
    <router-view />
</template>

<script setup>
import jwt_decode from "jwt-decode";
import { useStore } from "vuex";
import { onMounted } from "vue";
const store = useStore();

onMounted(() => {
    if (localStorage.mytoken) {
        const decoded = jwt_decode(localStorage.mytoken);
        // token存储到vuex中
        store.dispatch("setAuthenticated", !isEmpty(decoded));
        store.dispatch("setUser", decoded);
    }
});
// 判断是否为空的方法
const isEmpty = (value) => {
    return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
    );
};

</script>

<style>
</style>
