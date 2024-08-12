<template>
  <div class="login-container">
    <div class="login-overlay2">
      <div class="background"></div>
      <div class="content">
        <h2 class="login-title">Access your account</h2>
        <img :src="Logo" alt="Logomarca" class="login-logo">
        <div class="login-overlay"></div>
        <form @submit.prevent="login" class="login-form">
          <input type="text" v-model="username" class="login-input" :class="{ 'active': username }" placeholder="Number or e-mail">
          <input type="password" v-model="password" class="login-input" :class="{ 'active': password }" placeholder="Password">
          <div v-if="passwordValidationMessage" class="validation-message">{{ passwordValidationMessage }}</div>
          <button type="submit" class="login-button">Login</button>
          <a href="#" @click="redirectToForgotPassword" class="forgot-password">Forgot your password?</a>
          <button type="button" @click="createAccount" class="button-account">Create Account</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from '@/assets/logo.png';

export default {
  name: 'LoginForm',
  data() {
    return {
      username: '',
      password: '',
      Logo: Logo 
    };
  },
  computed: {
    passwordValidationMessage() {
      if (this.password.length > 0 && this.password.length < 6) {
        return 'Password must be at least 6 characters long.';
      }
      return '';
    }
  },
  methods: {
    createAccount() {
      this.$router.push({ name: 'signup' });
    },
    login() {
      if (!this.passwordValidationMessage) {
        // Adicione aqui a lógica de login, se houver.
      } else {
        alert('Please correct the errors before submitting.');
      }
    },
    redirectToForgotPassword() {
      this.$router.push({ name: 'forgotpassword' });
    }
  }
}
</script>

<style scoped>
body {
  font-family: 'Roboto', sans-serif; 
}

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;       
  height: 100vh;      
  overflow: hidden;  
}

.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(120deg, #6A11CB, #2575FC, #e53ee8);
  background-size: 200% 200%;
  animation: gradient 10s ease infinite;
  z-index: -1;
}

.content {
  position: relative;
  z-index: 1;
}

.login-overlay2 {
  width: 36%; 
  max-width: 400px; 
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 50px;
  padding: 20px; 
  box-shadow: 0 4px 6px rgba(0,0,0,0.1); 
}

@media (max-width: 600px) {
  .login-overlay2 {
    width: 90%; 
    padding: 10px;
  }
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.login-title {
  font-family: 'Poppins', sans-serif;
  color: #652ed4;
  text-align: center;
  font-size: 28px;
  margin-bottom: 30px;
  display: block;
  padding-top: 23px;
  text-shadow: 1px 1px 3px rgba(233, 230, 230, 0.6);
  display: none;
}

.login-logo {
  margin-top: 35px;
  width: 200px;
  height: auto;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.login-input {
  font-family: 'Roboto', sans-serif;
  padding: 12px;
  margin-bottom: 20px;
  border-radius: 8px;
  border: none;
  background-color: rgba(255, 255, 255, 0.7);
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  width: 300px;
  font-size: 16px;
  color: #555;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  transform: scale(1);
}

.login-input:hover {
  transform: scale(1.05);
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
}

.login-input.active::placeholder {
  color: transparent;
}

.login-input:focus::placeholder {
  color: #555;
}

.login-input:focus {
  outline: none;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
}

.validation-message {
  color: red;
  font-size: 14px;
  margin-top: -10px;
  margin-bottom: 10px;
  word-break: break-all;
}

.forgot-password {
  font-family: 'Roboto', sans-serif;
  display: block;
  color: #060505;
  text-align: center;
  margin: 22px 6px;
  text-decoration: none;
  transition: color 0.3s ease;
  padding-bottom: 10px;
  cursor: pointer;
}

.forgot-password:hover {
  color: #321194;
}

.login-button {
  font-family: 'Roboto', sans-serif;
  padding: 15px 138px;
  border: none;
  background-color: #4F0AC9;
  color: #fff;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: 18px;
}

.login-button:hover {
  background-color: #6A11CB;
}

.button-account {
  font-family: 'Roboto', sans-serif;
  padding: 15px 50px;
  border: none;
  background-color: #af2aca;
  color: #fff;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: 18px;
}

.button-account:hover {
  background-color: #bf6cbc;
}
</style>
