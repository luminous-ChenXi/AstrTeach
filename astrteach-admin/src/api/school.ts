import request from '@/utils/request'

export const getSchoolList = (params?: object) => {
  return request({
    url: '/schools',
    method: 'get',
    params,
  })
}

export const getSchoolDetail = (id: string) => {
  return request({
    url: `/schools/${id}`,
    method: 'get',
  })
}

export const createSchool = (data: object) => {
  return request({
    url: '/schools',
    method: 'post',
    data,
  })
}

export const updateSchool = (id: string, data: object) => {
  return request({
    url: `/schools/${id}`,
    method: 'put',
    data,
  })
}

export const deleteSchool = (id: string) => {
  return request({
    url: `/schools/${id}`,
    method: 'delete',
  })
}
