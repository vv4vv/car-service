<template>
  <div class="login-page">
    <div class="content">
      <h2>用户登录</h2>
      <a-form :model="account" @submit.prevent="onLogin" @finishFailed="onFail">
        <!-- 手机号码 -->
        <a-form-item name="phone" :rules="rule.phone">
          <a-input v-model:value="account.phone" placeholder="请输入手机号码">
            <template #prefix>
              <MobileOutlined style="color: rgba(0, 0, 0, 0.25)" />
            </template>
          </a-input>
        </a-form-item>
        <!-- 密码 -->
        <a-form-item name="password" :rules="rule.password">
          <a-input v-model:value="account.password" type="password" placeholder="请输入密码">
            <template #prefix>
              <LockOutlined style="color: rgba(0, 0, 0, 0.25)" />
            </template>
          </a-input>
        </a-form-item>
        <!-- 登录 -->
        <a-form-item>
          <a-button :loading="loading" type="primary" html-type="submit" block>
            登录
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>

</template>
  
<script setup>
import { MobileOutlined, LockOutlined } from '@ant-design/icons-vue';
import { reactive, ref } from 'vue';
import { message } from 'ant-design-vue';
import { useRouter } from 'vue-router';

// 账号
const account = reactive({
  phone: '19851660332',
  password: '0332',
});

const router = useRouter();

const loading = ref(false);
// 验证
const rule = reactive({
  phone: [{ required: true, message: '请输入手机号码', trigger: 'change' },
  { pattern: /^1[3-9]\d{9}$/, message: '输入有误,请输入正确的手机号码', trigger: 'change' }],
  password: [{ required: true, message: '请输入密码', trigger: 'change' },
  { pattern: /^\d{4}$/, message: '输入有误,请输入正确的密码', trigger: 'change' }],
})
// 登录
const onLogin =  () => {
 router.replace('/main');
};
// 登录失败
const onFail = () => {
  message.error('登陆失败')
};
</script>
  
<style scoped >
.login-page {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f2f2f2;
}

.content {
  width: 400px;
  background-color: #fff;
  margin: 100px auto auto;
  padding: 16px 24px;
}
</style>