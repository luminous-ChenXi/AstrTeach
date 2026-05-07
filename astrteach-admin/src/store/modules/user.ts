import { defineStore } from 'pinia'
import { login, logout, getInfo } from '@/api/auth'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const token = ref(getToken() || '')
  const username = ref('')
  const realName = ref('')
  const role = ref('')
  const avatar = ref('')
  const schoolName = ref('')

  const loginAction = async (loginForm: { username: string; password: string }) => {
    const res = await login(loginForm)
    const { accessToken, user } = res.data
    token.value = accessToken
    setToken(accessToken)
    username.value = user.username
    realName.value = user.realName
    role.value = user.role
    avatar.value = user.avatarUrl || ''
    schoolName.value = user.schoolName || ''
  }

  const getInfoAction = async () => {
    const res = await getInfo()
    const { user } = res.data
    username.value = user.username
    realName.value = user.realName
    role.value = user.role
    avatar.value = user.avatarUrl || ''
    schoolName.value = user.schoolName || ''
    return res.data
  }

  const logoutAction = async () => {
    try {
      await logout()
    } finally {
      token.value = ''
      username.value = ''
      realName.value = ''
      role.value = ''
      avatar.value = ''
      schoolName.value = ''
      removeToken()
    }
  }

  const resetState = () => {
    token.value = ''
    username.value = ''
    realName.value = ''
    role.value = ''
    avatar.value = ''
    schoolName.value = ''
    removeToken()
  }

  return {
    token,
    username,
    realName,
    role,
    avatar,
    schoolName,
    loginAction,
    getInfoAction,
    logoutAction,
    resetState,
  }
})
