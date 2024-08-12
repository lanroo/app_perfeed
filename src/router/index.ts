import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import LoginForm from '@/components/LoginForm.vue';
import SignupForm from '@/components/SignupForm.vue';
import ForgotPassword from '@/components/ForgotPassword.vue';
import FeedView from '@/components/Feed/FeedView.vue'; 

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/feed' 
  },
  {
    path: '/feed', 
    name: 'feed',
    component: FeedView 
  },
  {
    path: '/login',
    name: 'login',
    component: LoginForm
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignupForm
  },
  { 
    path: '/forgot-password',
    name: 'forgotpassword',
    component: ForgotPassword
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
