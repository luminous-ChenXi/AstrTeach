import request from '@/utils/request'

export const getAssignmentList = (params?: object) => {
  return request({
    url: '/assignments',
    method: 'get',
    params,
  })
}

export const createAssignment = (data: object) => {
  return request({
    url: '/assignments',
    method: 'post',
    data,
  })
}

export const getLessonPlanList = (params?: object) => {
  return request({
    url: '/lesson-plans',
    method: 'get',
    params,
  })
}

export const createLessonPlan = (data: object) => {
  return request({
    url: '/lesson-plans',
    method: 'post',
    data,
  })
}

export const getStudentProfileList = (params?: object) => {
  return request({
    url: '/student-profiles',
    method: 'get',
    params,
  })
}
