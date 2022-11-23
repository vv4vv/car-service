<template>
  <div class="category-page">
    <div class="page-header">
      <div class="l-list">
        <a-radio-button value="large" @click="onCreateNew"
          ><plus-outlined /> 新增</a-radio-button
        >
        <!-- <a-radio-button value="large"><delete-outlined /> 删除</a-radio-button> -->
      </div>
      <div class="r-list">
        <a-input-search
          v-model:value="value"
          placeholder="请输入关键字"
          style="width: 400px"
          @search="onSearch"
          autocomplete="off"
        />
      </div>
    </div>
    <div class="page-body">
      <a-table
        :columns="COLUMNS_CATEGORY"
        :data-source="data"
        :row-selection="rowSelection"
      >
        <template #bodyCell="{ column }">
          <template v-if="column.key === 'operation'" class="operation-button">
            <a-button @click.prevent="onEdit(record)">
              <template #icon><edit-outlined /></template>
            </a-button>
            <a-popconfirm
              title="确认删除该分类吗?"
              ok-text="Yes"
              cancel-text="No"
              @confirm="confirm"
              @cancel="cancel"
            >
              <a-button type="primary" danger>
                <template #icon><delete-outlined /></template>
              </a-button>
            </a-popconfirm>
          </template>
        </template>
      </a-table>
    </div>
  </div>
  <category-dialog ref="dialogRef"></category-dialog>
</template>
<script setup>
import {
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons-vue";
import { defineComponent, ref, onMounted } from "vue";
import { COLUMNS_CATEGORY } from "../../columns";
import CategoryDialog from "./CategoryDialog/CategoryDialog.vue";

import http from "../../http";
import { message } from "ant-design-vue";
const categories = ref([]);
const dialogRef = ref();
const data = [
  {
    key: 1,
    name: "喷漆贴膜",
    weight: 99,
    children: [
      {
        key: 11,
        name: "汽车喷漆",
        weight: 99,
        children: [
          {
            key: 121,
            name: "整车喷漆",
            weight: 99,
          },
        ],
      },
      {
        key: 12,
        name: "汽车贴膜",
        weight: 99,
        children: [
          {
            key: 121,
            name: "贴膜",
            weight: 99,
          },
        ],
      },
    ],
  },
];
// methods
const onCreateNew = () => {
  dialogRef.value.show({
    text: "新增分类信息",
    fn: (newCategory) => {
      categories.value.push(newCategory);
    },
  });
};

const onEdit = (category) => {
  // console.log(category);
  dialogRef.value.show({
    text: "编辑分类信息",
    item: category,
    fn: () => {
      getCategories();
    },
  });
};
const getCategory = async () => {
  try {
    const res = await http.getCategories();
    console.log(res);
    categories.value = res;
  } catch (ex) {
    console.log(ex);
    message.error("加载分类数据失败");
  }
};

onMounted(() => {
  getCategory();
});
</script>


<style scoped>
.page-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.l-list {
  margin: 0 20px 20px 0;
}
.r-list {
  margin-bottom: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.ant-table-cell button {
  margin: 0 5px;
}
</style>