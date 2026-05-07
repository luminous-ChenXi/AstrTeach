<template>
  <div class="login-container">
    <el-form
      ref="loginFormRef"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
    >
      <div class="login-logo">
        <div class="logo-icon">A</div>
        <span class="logo-text">AstrTeach</span>
      </div>
      <div class="login-title">
        <h2>智教管理平台</h2>
        <p>全场景智慧教学协同系统</p>
      </div>

      <el-form-item prop="username">
        <el-input
          v-model="loginForm.username"
          placeholder="请输入用户名"
          :prefix-icon="User"
          size="large"
        />
      </el-form-item>

      <el-form-item prop="password">
        <el-input
          v-model="loginForm.password"
          type="password"
          placeholder="请输入密码"
          :prefix-icon="Lock"
          size="large"
          show-password
          @keyup.enter="handleLogin"
        />
      </el-form-item>

      <el-form-item>
        <div style="display: flex; justify-content: space-between; width: 100%">
          <el-checkbox v-model="rememberMe">记住我</el-checkbox>
          <el-link type="primary" underline="never">忘记密码？</el-link>
        </div>
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          class="login-btn"
          :loading="loading"
          @click="handleLogin"
        >
          登 录
        </el-button>
      </el-form-item>

      <div class="login-options">
        <span>还没有账号？</span>
        <a @click="$router.push('/register')">立即注册</a>
      </div>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { User, Lock } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import { useUserStore } from '@/store'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

const loginFormRef = ref<FormInstance>()
const loading = ref(false)
const rememberMe = ref(false)

const loginForm = reactive({
  username: '',
  password: '',
})

const loginRules: FormRules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
}

const handleLogin = async () => {
  const form = loginFormRef.value
  if (!form) return
  await form.validate(async (valid) => {
    if (valid) {
      loading.value = true
      try {
        await userStore.loginAction(loginForm)
        const redirect = (route.query.redirect as string) || '/'
        router.push(redirect)
        ElMessage.success('登录成功')
      } catch (error: any) {
        ElMessage.error(error.message || '登录失败')
      } finally {
        loading.value = false
      }
    }
  })
}
</script>

<style lang="scss" scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

  .login-form {
    width: 420px;
    padding: 40px 36px;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 8px 40px rgba(0, 0, 0, 0.12);

    .login-title {
      text-align: center;
      margin-bottom: 8px;

      h2 {
        font-size: 26px;
        font-weight: 700;
        color: #303133;
        margin: 0;
      }

      p {
        font-size: 14px;
        color: #909399;
        margin-top: 8px;
      }
    }

    .login-logo {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      margin-bottom: 24px;

      .logo-icon {
        width: 40px;
        height: 40px;
        background: #409eff;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        font-size: 20px;
        font-weight: 700;
      }

      .logo-text {
        font-size: 22px;
        font-weight: 700;
        color: #303133;
      }
    }

    .login-btn {
      width: 100%;
      height: 44px;
      border-radius: 8px;
      font-size: 16px;
      font-weight: 600;
    }

    .login-options {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 12px;
      font-size: 14px;
      color: #909399;

      a {
        color: #409eff;
        cursor: pointer;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}
</style>
