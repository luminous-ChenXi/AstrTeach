import request from '@/utils/request'

export const getUserList = (params?: object) => {
  return request({
    url: '/users',
    method: 'get',
    params,
  })
}

export const getUserDetail = (id: string) => {
  return request({
    url: `/users/${id}`,
    method: 'get',
  })
}

export const createUser = (data: object) => {
  return request({
    url: '/users',
    method: 'post',
    data,
  })
}

export const updateUser = (id: string, data: object) => {
  return request({
    url: `/users/${id}`,
    method: 'put',
    data,
  })
}

export const deleteUser = (id: string) => {
  return request({
    url: `/users/${id}`,
    method: 'delete',
  })
}
