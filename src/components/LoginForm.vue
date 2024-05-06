<template>
  <div class="login-container">
    <div class="background"></div>
    <div class="content">
      <h2 class="login-title">Access your account</h2>
      <img :src="Logo" alt="Logomarca" class="login-logo">
      <div class="login-overlay"></div> <!-- Camada retangular -->
      <form @submit.prevent="login" class="login-form">
        <input type="text" v-model="username" class="login-input" :class="{ 'active': username }" placeholder="Number or e-mail">
        <input type="password" v-model="password" class="login-input" :class="{ 'active': password }" placeholder="Password">
        <button type="submit" class="login-button">Entrar</button>
      </form>
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
  methods: {
    login() {
      // Lógica de login aqui
      console.log('Usuário:', this.username);
      console.log('Senha:', this.password);
    }
  }
}
</script>

<style scoped>
.login-container {
  position: relative;
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
  background: linear-gradient(120deg, #6A11CB, #2575FC);
  background-size: 200% 200%;
  animation: gradient 10s ease infinite;
  z-index: -1;
}

.content {
  position: relative;
  z-index: 1;
}

.login-overlay {
    position: absolute;
    top: 0px;
    left: 437px;
    width: 35%;
    height: 123%;
    background-color: rgba(255, 255, 255, 0.5);
    z-index: -1;
    border-radius: 50px;
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
  color: #fff;
  text-align: center;
  font-size: 24px;
  margin-bottom: 30px;
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
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2)
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

.login-button {
  padding: 12px 24px;
  border: none;
  background-color: #4F0AC9;
  color: #fff;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: 18px;
  margin-top: 6%;
}

.login-button:hover {
  background-color: #6A11CB;
}
</style>
