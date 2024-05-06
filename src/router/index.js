// router/index.js

import { createRouter, createWebHistory } from 'vue-router';
import LoginForm from '@/components/LoginForm';
import SignupForm from '@/components/SignupForm';
import ForgotPassword from '@/components/ForgotPassword';
import FeedView from '@/components/Feed/FeedView'; 

const routes = [
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
