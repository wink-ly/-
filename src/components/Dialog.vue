<template>
    <div class="dialog">
        <el-dialog :title="dialog.title" v-model="dialog.show">
            <div class="form">
                <el-form ref="form" :model="formData" :rules="form_rules" labe-width="120px" style="width:80%">
                    <el-form-item prop="bookid" label="序号:" label-width="200px" v-show="dialog.option == 'edit' ? false : true">
                        <el-input type="bookid" v-model="formData.bookid"></el-input>
                    </el-form-item>

                    <el-form-item prop="book_name" label="书名:" label-width="200px">
                        <el-input type="book_name" v-model="formData.book_name"></el-input>
                    </el-form-item>

                    <el-form-item prop="author" label="作者:" label-width="200px">
                        <el-input type="author" v-model="formData.author"></el-input>
                    </el-form-item>

                    <el-form-item prop="publish" label="出版社:" label-width="200px">
                        <el-input type="publish" v-model="formData.publish"></el-input>
                    </el-form-item>

                    <el-form-item prop="category" label="分类:" label-width="200px">
                        <el-select v-model="formData.category" placeholder="书籍分类">
                            <el-option v-for="(formtype, index) in form_type_list" :key="index" :label="formtype"
                                :value="formtype"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item prop="img" label="封面url:" label-width="200px">
                        <el-input type="img" v-model="formData.img"></el-input>
                    </el-form-item>

                    <el-form-item prop="count" label="数量:" label-width="200px">
                        <el-input type="count" v-model="formData.count"></el-input>
                    </el-form-item>

                    <el-form-item prop="introduction" label="简介:" label-width="200px">
                        <el-input type="textarea" v-model="formData.introduction"></el-input>
                    </el-form-item>

                    <el-form-item class="text_right" label-width="200px">
                        <el-button @click="dialog.show = false">取消</el-button>
                        <el-button type="primary" @click="onSubmit(form)">提交</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>
    </div>
</template>
  
<script setup>
import { ref, reactive, getCurrentInstance, defineEmits } from "vue";
const { proxy } = getCurrentInstance();
const emits = defineEmits(["sendMsg"]);
const props = defineProps({
    dialog: Object,
    formData: Object,
});
const form = ref(null);
const form_type_list = ref([
    "科幻畅想",
    "心灵成长",
    "亲子共读",
    "科学技术",
]);

const form_rules = reactive({
    bookid: [{ required: true, message: "序号不能为空", trigger: "blur" }],
    book_name: [{ required: true, message: "书名不能为空", trigger: "blur" }],
    author: [{ required: true, message: "作者不能为空!", trigger: "blur" }],
    publish: [{ required: true, message: "出版社不能为空!", trigger: "blur" }],
});

const onSubmit = (form) => {
    form.validate((valid) => {
        if (valid) {
            const url = props.dialog.option == "add" ? "add" : `edit/${props.formData.bookid}`;
            proxy.$axios.post(`/book/${url}`, props.formData).then((res) => {
                if (props.dialog.option == "edit") {
                    proxy.$message({ message: "数据更新成功", type: "success" });
                } else {
                    proxy.$message({ message: "数据添加成功", type: "success" });
                }
                // 隐藏dialog
                props.dialog.show = false;
                // 数据添加后 自动刷新
                emits("update");
            })
        }
    });

};
</script>
  
<style lang="less" scoped>

</style>