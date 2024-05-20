import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  /* 路由方式两种例子*/
  {
    path: '/',
    redirect: '/UserLogin'
  },
  {
    path: '/UserLogin',
    name: 'UserLogin',
    component: () => import('../views/Edu_System/UserLogView.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/Edu_System/HomeView.vue')
  },
  {
    path: '/AllCourses',
    name: 'AllCourses',
    component: () => import('../views/Edu_System/AllCoursesView.vue')
  },
  {
    path: '/CoursesSelect',
    name: 'CoursesSelect',
    component: () => import('../views/Edu_System/CoursesSelectView.vue')
  },
  {
    path: '/CoursesTable',
    name: 'CoursesTable',
    component: () => import('../views/Edu_System/CoursesTableView.vue')
  },
  {
    path: '/GradesInfo',
    name: 'GradesInfo',
    component: () => import('../views/Edu_System/GradesInfoView.vue')
  },
  {
    path: '/StudentsInfo',
    name: 'StudentsInfo',
    component: () => import('../views/Edu_System/StudentsInfoView.vue')
  },
  {
    path: '/TeachersInfo',
    name: 'TeachersInfo',
    component: () => import('../views/Edu_System/TeachersInfoView.vue')
  },
  {
    path: '/UserInfo',
    name: 'UserInfo',
    component: () => import('../views/Edu_System/UserInfoView.vue')
  },
  {
    path: '/CoursesByTeacher',
    name: 'CoursesByTeacher',
    component: () => import('../views/Edu_System/CoursesByTeacher.vue')
  },
  {
    path: '/CoursesByManager',
    name: 'CoursesByManager',
    component: () => import('../views/Edu_System/CoursesByManager.vue')
  },
  {
    path: '/CoursesByTeacher_Class',
    name: 'CoursesByTeacher_Class',
    component: () => import('../views/Edu_System/CoursesByTeacher_Class.vue')
  },
  {
    path: '/CoursesByTeacher_Add',
    name: 'CoursesByTeacher_Add',
    component: () => import('../views/Edu_System/CoursesByTeacher_Add.vue')
  },
  {
    path: '/ClassByManager',
    name: 'ClassByManager',
    component: () => import('../views/Edu_System/ClassByManager.vue')
  },
  {
    path: '/AllUsers',
    name: 'AllUsers',
    component: () => import('../views/Edu_System/AllUsersView.vue')
  },
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  const userData = JSON.parse(localStorage.getItem('userData'));
  const usercno = JSON.parse(localStorage.getItem('usercno'));
  to.meta.usercno = usercno;
  to.meta.userData = userData;
  next();
  if (userData) {
    to.meta.userData = userData;
    next();
  }
  else {
    if (to.path === '/UserLogin') {
      next();
    } else {
      next('/UserLogin');
    }
  }
})

export default router