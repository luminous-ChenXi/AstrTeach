import request from '@/utils/request'

export const login = (data: { username: string; password: string }) => {
  return request({
    url: '/auth/login',
    method: 'post',
    data,
  })
}

export const register = (data: {
  username: string
  password: string
  realName: string
  phone?: string
  email?: string
  role: string
  schoolId: string
}) => {
  return request({
    url: '/auth/register',
    method: 'post',
    data,
  })
}

export const getInfo = () => {
  return request({
    url: '/auth/info',
    method: 'get',
  })
}

export const logout = () => {
  return request({
    url: '/auth/logout',
    method: 'post',
  })
}

export const refreshToken = (refreshToken: string) => {
  return request({
    url: '/auth/refresh',
    method: 'post',
    data: refreshToken,
  })
}
