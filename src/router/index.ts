import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import LoginForm from '@/components/LoginForm.vue';
import SignupForm from '@/components/SignupForm.vue';
import ForgotPassword from '@/components/ForgotPassword.vue';
import FeedView from '@/components/Feed/FeedView.vue'; 
import PerfilPage from '@/assets/Pages/PerfilPage.vue';
import EditPerfil from '@/assets/Pages/EditPerfil.vue';

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
  {
    path: '/profile',
    name: 'profile',
    component: PerfilPage 
  },
  {
    path: '/edit-profile',
    name: 'edit-profile',
    component: EditPerfil 
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
