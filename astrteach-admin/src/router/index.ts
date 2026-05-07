import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'

export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    hidden: true,
  },
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index.vue'),
      },
    ],
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        meta: { title: '工作台', icon: 'Odometer', affix: true },
      },
    ],
  },
  {
    path: '/teaching',
    component: Layout,
    redirect: '/teaching/prep',
    name: 'Teaching',
    meta: { title: '教学核心', icon: 'Reading' },
    children: [
      {
        path: 'prep',
        name: 'AiPrep',
        component: () => import('@/views/teaching/prep.vue'),
        meta: { title: 'AI 备课', icon: 'MagicStick' },
      },
      {
        path: 'classroom',
        name: 'Classroom',
        component: () => import('@/views/teaching/classroom.vue'),
        meta: { title: '课堂互动', icon: 'Monitor' },
      },
      {
        path: 'grading',
        name: 'Grading',
        component: () => import('@/views/teaching/grading.vue'),
        meta: { title: '作业批改', icon: 'EditPen' },
      },
      {
        path: 'profile',
        name: 'StudentProfile',
        component: () => import('@/views/teaching/profile.vue'),
        meta: { title: '学情画像', icon: 'DataAnalysis' },
      },
    ],
  },
  {
    path: '/exam',
    component: Layout,
    redirect: '/exam/index',
    name: 'Exam',
    meta: { title: '考试测评', icon: 'Document' },
    children: [
      {
        path: 'index',
        name: 'ExamIndex',
        component: () => import('@/views/exam/index.vue'),
        meta: { title: '题库与考试', icon: 'Notebook' },
      },
    ],
  },
  {
    path: '/management',
    component: Layout,
    redirect: '/management/class',
    name: 'Management',
    meta: { title: '管理与协同', icon: 'UserFilled' },
    children: [
      {
        path: 'class',
        name: 'ClassMgmt',
        component: () => import('@/views/management/class.vue'),
        meta: { title: '班级管理', icon: 'User' },
      },
      {
        path: 'home-school',
        name: 'HomeSchool',
        component: () => import('@/views/management/home-school.vue'),
        meta: { title: '家校沟通', icon: 'ChatDotRound' },
      },
    ],
  },
  {
    path: '/extension',
    component: Layout,
    redirect: '/extension/research',
    name: 'Extension',
    meta: { title: '拓展', icon: 'SetUp' },
    children: [
      {
        path: 'research',
        name: 'Research',
        component: () => import('@/views/extension/research.vue'),
        meta: { title: '教科研辅助', icon: 'Flask' },
      },
      {
        path: 'ai-learning',
        name: 'AiLearning',
        component: () => import('@/views/extension/ai-learning.vue'),
        meta: { title: 'AI 素养学习', icon: 'Cpu' },
      },
    ],
  },
  {
    path: '/system',
    component: Layout,
    redirect: '/system/user',
    name: 'System',
    meta: { title: '系统管理', icon: 'Setting' },
    children: [
      {
        path: 'user',
        name: 'SystemUser',
        component: () => import('@/views/system/user.vue'),
        meta: { title: '用户管理', icon: 'User' },
      },
      {
        path: 'role',
        name: 'SystemRole',
        component: () => import('@/views/system/role.vue'),
        meta: { title: '角色管理', icon: 'UserFilled' },
      },
      {
        path: 'menu',
        name: 'SystemMenu',
        component: () => import('@/views/system/menu.vue'),
        meta: { title: '菜单管理', icon: 'Menu' },
      },
      {
        path: 'school',
        name: 'SystemSchool',
        component: () => import('@/views/system/school.vue'),
        meta: { title: '学校管理', icon: 'School' },
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/error/404.vue'),
    hidden: true,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes,
  scrollBehavior: () => ({ top: 0 }),
})

export default router
