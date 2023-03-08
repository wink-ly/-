<template>
    <div class="dialog">
        <el-dialog v-model="dialog.show">
            <div class="main">
                <span>确定删除吗？</span>
                <div>
                    <el-button @click="dialog.show = false">取消</el-button>
                    <el-button type="primary" @click="onSubmit()">确定</el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>
  
<script setup>
import { getCurrentInstance } from "vue";
const { proxy } = getCurrentInstance();
const emits = defineEmits(['update']);
const props = defineProps({
    dialog: Object,
    formData: Object,
});

const onSubmit = () => {
    if (props.dialog.option == "home_delete") {
        proxy.$axios.post(`/book/delshare/${props.formData.book_name}`).then(() => {
            proxy.$message({ message: "删除成功！", duration: 1000 });
            props.dialog.show = false;
            emits("update");
        });
    }
    if (props.dialog.option == "book_delete") {
        proxy.$axios.post(`/book/delete/${props.formData.bookid}`).then(() => {
            proxy.$message({ message: "删除成功！", duration: 1000 });
            props.dialog.show = false;
            emits("update");
        });
    }
};

</script>
  
<style lang="less" scoped>
.dialog :deep(.el-dialog) {
    width: 18vw;
    height: 16vh;
    margin-top: 35vh;

    @media screen and (min-width: 220px) and (max-width:600px) {
        width: 90vw !important;
        height: 80vh !important;
    }
}

.dialog :deep(.el-dialog__header) {
    margin-bottom: 0;
    padding: 0;
}

.main {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    span {
        margin: 10px;
    }
}
</style>