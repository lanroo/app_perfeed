<template>
  <div class="reset-password-container">
    <div class="background"></div>
    <div class="content">
      <h2 class="title">Reset Your Password</h2>
      <img :src="Logo" alt="Logo" class="logo">
      <form @submit.prevent="resetPassword" class="form">
        <input type="email" v-model="email" class="input" :class="{ 'active': email }" placeholder="Enter your email" autocomplete="email">
        <div v-if="emailValidationMessage" class="validation-message">{{ emailValidationMessage }}</div>
        <button type="submit" class="button">Send Reset Link</button>
      </form>
      <a href="#" @click="goBack" class="back-link">Back to Login</a>
    </div>
  </div>
</template>

<script>
import Logo from '@/assets/logo.png';

export default {
  name: 'ResetPasswordForm',
  data() {
    return {
      email: '',
      Logo: Logo
    };
  },
  computed: {
    emailValidationMessage() {
      if (!this.isValidEmail(this.email)) {
        return 'Please enter a valid email address.';
      }
      return '';
    }
  },
  methods: {
    isValidEmail(email) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(email);
    },
    resetPassword() {
      if (this.isValidEmail(this.email)) {
        console.log('Reset link sent to:', this.email);
        alert('A password reset link has been sent to your email.');
      } else {
        alert('Please enter a valid email address.');
      }
    },
    goBack() {
      this.$router.push({ name: 'login' });
      console.log('Navigating back to login page');
    }
  }
}
</script>

<style scoped>
.reset-password-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #6A11CB; 
}

.content {
  position: relative;
  z-index: 1;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.title {
  margin-bottom: 20px;
  color: #6A11CB; 
}

.logo {
  width: 100px;
  margin-bottom: 20px;
}

.input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #6A11CB; 
  border-radius: 4px;
}

.input.active {
  border-color: #007bff; 
}

.validation-message {
  color: red;
  margin-bottom: 10px;
}

.button {
  width: 100%;
  padding: 10px;
  background-color: #6A11CB; 
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.button:hover {
  background-color: #4F0AC9; 
}

.back-link {
  display: block;
  margin-top: 10px;
  color: #6A11CB; 
  text-decoration: none;
}

.back-link:hover {
  text-decoration: underline;
  color: #4F0AC9; 
}
</style>
