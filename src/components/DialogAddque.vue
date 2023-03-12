<template>
    <div class="dialog">
        <el-dialog :title="dialog.title" v-model="dialog.show">
            <el-form ref="form" :model="formData" :rules="form_rules">
                <el-form-item prop="question" label="问题:">
                    <el-input type="text" v-model="formData.question"></el-input>
                </el-form-item>
                <el-form-item prop="answer" label="解答:">
                    <el-input type="textarea" v-model="formData.answer"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="dialog.show = false">取消</el-button>
                    <el-button type="primary" @click="onSubmit(form)">提交</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script setup>
import { ref, reactive, getCurrentInstance } from "vue";
const { proxy } = getCurrentInstance();
const emits = defineEmits(['update']);
const props = defineProps({
    dialog: Object,
    formData: Object,
});
const form = ref(null);
const form_rules = reactive({
    question: [{ required: true, message: "问题不能为空", trigger: "blur" }],
    answer: [{ required: true, message: "解答不能为空!", trigger: "blur" }],
});

const onSubmit = (form) => {
    form.validate((valid) => {
        if (valid) {
            const url = props.dialog.option == "add" ? "add" : `edit/${props.formData.count}`;
            proxy.$axios.post(`/user/${url}`, props.formData).then(() => {
                if (props.dialog.option == "edit") {
                    proxy.$message({ message: "数据更新成功", duration: 1000, type: "success" });
                } else {
                    proxy.$message({ message: "数据添加成功", duration: 1000, type: "success" });
                }
                props.dialog.show = false;
                emits("update");
            })
        }
    })
}
</script>

<style>
.dialog :deep(.el-dialog) {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    @media screen and (min-width: 220px) and (max-width:600px) {
        width: 90vw !important;
        height: 80vh !important;
    }
}
</style>