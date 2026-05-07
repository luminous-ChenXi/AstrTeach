import request from '@/utils/request'

export const getExamPaperList = (params?: object) => {
  return request({
    url: '/exam-papers',
    method: 'get',
    params,
  })
}

export const createExamPaper = (data: object) => {
  return request({
    url: '/exam-papers',
    method: 'post',
    data,
  })
}

export const getQuestionList = (params?: object) => {
  return request({
    url: '/questions',
    method: 'get',
    params,
  })
}

export const createQuestion = (data: object) => {
  return request({
    url: '/questions',
    method: 'post',
    data,
  })
}
