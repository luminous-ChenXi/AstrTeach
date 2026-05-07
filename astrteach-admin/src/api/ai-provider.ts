import request from '@/utils/request'

export const getAiProviderList = (params?: object) => {
  return request({
    url: '/ai-providers',
    method: 'get',
    params,
  })
}

export const getAiProviderDetail = (id: string) => {
  return request({
    url: `/ai-providers/${id}`,
    method: 'get',
  })
}

export const createAiProvider = (data: object) => {
  return request({
    url: '/ai-providers',
    method: 'post',
    data,
  })
}

export const updateAiProvider = (id: string, data: object) => {
  return request({
    url: `/ai-providers/${id}`,
    method: 'put',
    data,
  })
}

export const deleteAiProvider = (id: string) => {
  return request({
    url: `/ai-providers/${id}`,
    method: 'delete',
  })
}

export const toggleAiProvider = (id: string) => {
  return request({
    url: `/ai-providers/${id}/toggle`,
    method: 'post',
  })
}

export const testAiProvider = (id: string) => {
  return request({
    url: `/ai-providers/${id}/test`,
    method: 'post',
  })
}
