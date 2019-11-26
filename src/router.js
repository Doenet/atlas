import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store';
import Home from './views/Home.vue';
import Signup from './views/Signup.vue';
import Login from './views/Login.vue';
import Profile from './views/Profile.vue';
import Courses from './views/Courses.vue';
import LearnerCourse from './views/LearnerCourse.vue';
import InstructorCourse from './views/InstructorCourse.vue';
import InstructorCourseAssignment from './views/InstructorCourseAssignment.vue';
import NewInstructorCourse from './views/NewInstructorCourse.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup,
    },
    {
      path: '/courses',
      name: 'Courses',
      component: Courses,
    },
    {
      path: '/instructors/me/courses/new',
      name: 'NewInstructorCourse',
      component: NewInstructorCourse,
    },
    {
      path: '/instructors/me/courses/:id',
      name: 'InstructorCourse',
      component: InstructorCourse,
      props: true,
    },
    {
      path: '/instructors/me/courses/:id/assignments/:assignmentIndex',
      name: 'InstructorCourseAssignment',
      component: InstructorCourseAssignment,
      props: true,
    },
    {
      path: '/learners/me/courses/:id',
      name: 'LearnerCourse',
      component: LearnerCourse,
      props: true,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
  ],
});

router.beforeEach((to, from, next) => {
  // BADBAD: checkForUpdates()
  const requiresAuth = to.matched.some(record => record.path !== '/login');

  if (requiresAuth && (!store.state.token)) {
    return next('/login');
  }
  // checkIfTokenNeedsRefresh()
  // store.commit(types.SUCCESS, null)
  // store.commit(types.ERROR, null)
  return next();
});

export default router;
