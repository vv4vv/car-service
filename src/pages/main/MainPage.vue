<template>
  <div class="main-page">
    <a-layout style="min-height: 100vh">
      <!-- 左侧导航栏 -->
      <a-layout-sider v-model:collapsed="collapsed" collapsible>
        <div class="logo">服务管理</div>
        <a-menu
          @click="onMenuClick"
          v-model:selectedKeys="selectedKeys"
          theme="dark"
          mode="inline"
        >
          <!-- 欢迎页 -->
          <a-menu-item key="welcome">
            <pie-chart-outlined />
            <span>欢迎页</span>
          </a-menu-item>
          <!-- 预约 -->
          <a-menu-item key="reservation">
            <bulb-outlined />
            <span>预约管理</span>
          </a-menu-item>
          <!-- 服务 -->
          <a-menu-item key="service">
            <desktop-outlined />
            <span>服务管理</span>
          </a-menu-item>
          <!-- 分类 -->
          <a-menu-item key="category">
            <appstore-outlined />
            <span>分类管理</span>
          </a-menu-item>
          <!-- 论坛 -->
          <a-sub-menu key="forum">
            <template #title>
              <span>
                <home-outlined />
                <span>论坛管理</span>
              </span>
            </template>
            <a-menu-item key="post">帖子</a-menu-item>
            <a-menu-item key="problem">百科</a-menu-item>
          </a-sub-menu>
          <!-- 用户管理 -->
          <a-sub-menu key="member">
            <template #title>
              <span>
                <team-outlined />
                <span>用户管理</span>
              </span>
            </template>
            <a-menu-item key="admin">管理员</a-menu-item>
            <a-menu-item key="user">用户</a-menu-item>
          </a-sub-menu>
        </a-menu>
      </a-layout-sider>
      <a-layout>
        <!-- 顶部 -->
        <a-layout-header style="background: #fff; padding: 0">
          <!-- 头像/用户名 -->
          <a-dropdown placement="bottomRight">
            <div class="avatar-wrap">
              <a-avatar size="small" style="margin-right: 5px">
                <template #icon><UserOutlined /></template>
              </a-avatar>
              <span>用户名</span>
            </div>
            <!-- 下拉框 -->
            <template #overlay>
              <a-menu>
                <a-menu-item>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    @click="showModal"
                  >
                    修改密码
                  </a>
                </a-menu-item>
                <a-menu-item>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    @click="onLogout"
                  >
                    退出登录
                  </a>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </a-layout-header>
        <!-- 右侧主体内容 -->
        <a-layout-content style="margin: 0 16px">
          <a-breadcrumb style="margin: 16px 0">
            <a-breadcrumb-item>CarService</a-breadcrumb-item>
            <a-breadcrumb-item>{{ title }}</a-breadcrumb-item>
          </a-breadcrumb>
          <div
            :style="{ padding: '24px', background: '#fff', minHeight: '460px' }"
          >
            <router-view></router-view>
          </div>
        </a-layout-content>
        <a-layout-footer style="text-align: center">
          CarService ©2022 Created by xxx
        </a-layout-footer>
      </a-layout>
    </a-layout>
  </div>
  <!-- 修改密码弹出框 -->
  <a-modal
    v-model:visible="visible"
    title="修改密码"
    @ok="onSave"
    cancelText="取消"
    okText="保存"
  >
    <a-form
      :model="formState"
      name="basic"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 16 }"
      autocomplete="off"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >
      <a-form-item label="原始密码" name="oldpassword">
        <a-input v-model:value="oldpassword" />
      </a-form-item>

      <a-form-item label="新密码" name="newpassword">
        <a-input v-model:value="newpassword" />
      </a-form-item>
      <a-form-item label="确认密码" name="confirmpassword">
        <a-input v-model:value="confirmpassword" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script setup>
import { useRouter } from "vue-router";
import {
  PieChartOutlined,
  DesktopOutlined,
  UserOutlined,
  TeamOutlined,
  FileOutlined,
  AppstoreOutlined,
  BulbOutlined,
  SettingOutlined,
  HomeOutlined,
} from "@ant-design/icons-vue";
import { defineComponent, ref } from "vue";

const title = ref("");
const router = useRouter();
const visible = ref(false);
const oldpassword = ref("");
const newpassword = ref("");
const confirmpassword = ref("");

// 左侧导航栏跳转
const onMenuClick = ({ key }) => {
  router.push({ name: key });
  title.value = key;
};

// 显示修改密码对话框
const showModal = () => {
  visible.value = true;
  newpassword.value='';
  confirmpassword.value='';
};

// 退出登录
const onLogout = () => {
  router.push("/login");
};
</script>
<style scoped>
/* 左侧导航栏 */
#components-layout-demo-side .logo {
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
}

.site-layout .site-layout-background {
  background: #fff;
}
[data-theme="dark"] .site-layout .site-layout-background {
  background: #141414;
}
/* 服务管理title */
.logo {
  height: 32px;
  margin: 16px;
  font-size: 20px;
  color: #fff;
  line-height: 32px;
  text-align: center;
}
/* 头像/用户名 */
.avatar-wrap {
  float: right;
  margin-right: 20px;
}
</style>