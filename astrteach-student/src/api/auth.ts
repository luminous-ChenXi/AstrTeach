import request from '@/utils/request'

export const login = (data: { username: string; password: string }) => {
  return request({ url: '/auth/login', method: 'post', data })
}

export const getInfo = () => {
  return request({ url: '/auth/info', method: 'get' })
}

export const logout = () => {
  return request({ url: '/auth/logout', method: 'post' })
}
