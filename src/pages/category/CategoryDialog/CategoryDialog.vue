<template>
  <a-modal v-model:visible="visible" cancelText="取消" okText="保存" :title="title" @ok="onSave">
    <a-form :model="category" :labelCol="{ span: 5 }" :wrapperCol="{ span: 18}">
      <a-form-item label="所属父类别" v-bind="validateInfos.Father">
        <a-cascader v-model:value="value" :options="options" placeholder="请选择父类别" />
      </a-form-item>
      <a-form-item label="分类名称" v-bind="validateInfos.Name">
       <a-input v-model:value="category.Name" placeholder="请输入分类名称" />
      </a-form-item>
      <a-form-item  v-bind="validateInfos.Image" name="upload" label="分类封面" >
      <a-upload
      v-model:file-list="fileList1"
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      list-type="picture"
      class="upload-list-inline"
    >
      <a-button>
        <upload-outlined></upload-outlined>
        upload
      </a-button>
    </a-upload>
    </a-form-item>

    </a-form>
  </a-modal>
</template>
<script setup>
import { ref, reactive, defineExpose } from 'vue';
import { UploadOutlined } from '@ant-design/icons-vue';
import { Form } from 'ant-design-vue';
import { message } from 'ant-design-vue';
import http from '../../../http'


// data
const visible = ref(false);
const title = ref('新建图书分类');
let callbackFn = null;
//
const category = ref({
  Name: '',
  Priority: 99,
});
const rule = reactive({
  Father: [{ required: true, message: '请选择父类别', trigger: 'change' }],
  Name: [{ required: true, message: '请输入分类名称', trigger: 'change' }],
  Image: [{ required: true, message: '请上传分类封面', trigger: 'change' }],
});

const { resetFields, validate, validateInfos } = Form.useForm(category, rule);

// methods
const onSave = async () => {
  try {
    const { Name: name } = await validate();

    if (!category.value.Id) {
      createCategory(name);
      return;
    }
    updateCategory();

  } catch {
    message.error('请输入有效分类数据');
  }
};
//编辑
const updateCategory=async()=>{
try {
  const res=http.updateCategory(category.value);
  message.success('编辑分类成功', 1, () => {
      visible.value = false;
      if (typeof callbackFn === 'function') {
        callbackFn(res)
      }
    })
} catch  {
  message.error('编辑失败')
}
}

//新增
const createCategory = async (name) => {
  try {
    const res = await http.createCategory(name);
    message.success('新建分类成功', 1, () => {
      visible.value = false;
      if (typeof callbackFn === 'function') {
        callbackFn(res)
      }
    })
  } catch (ex) {
    message.error('新增失败')
  }


}

//
const show = ({ text, fn, item = null }) => {
  resetFields();
  title.value = text;
  visible.value = true;
  if (item) {
    category.value =JSON.parse(JSON.stringify(item));
   
  }

  callbackFn = fn;
};

defineExpose({
  show,
});
</script>
<style scoped>
.ant-input-number {
  width: 100%;
}
.upload-list-inline :deep(.ant-upload-list-item) {
  float: left;
  width: 200px;
  margin-right: 8px;
}
.upload-list-inline [class*='-upload-list-rtl'] :deep(.ant-upload-list-item) {
  float: right;
}
</style>
  