import { createRouter, createWebHistory } from 'vue-router';
import LoginForm from '@/components/LoginForm';
import SignupForm from '@/components/SignupForm';
import ForgotPassword from '@/components/ForgotPassword';

const routes = [
  {
    path: '/',
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
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
