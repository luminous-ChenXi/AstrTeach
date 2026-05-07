import request from '@/utils/request'

export const getClassList = (params?: object) => {
  return request({
    url: '/classes',
    method: 'get',
    params,
  })
}

export const getClassDetail = (id: string) => {
  return request({
    url: `/classes/${id}`,
    method: 'get',
  })
}

export const createClass = (data: object) => {
  return request({
    url: '/classes',
    method: 'post',
    data,
  })
}

export const updateClass = (id: string, data: object) => {
  return request({
    url: `/classes/${id}`,
    method: 'put',
    data,
  })
}

export const deleteClass = (id: string) => {
  return request({
    url: `/classes/${id}`,
    method: 'delete',
  })
}
