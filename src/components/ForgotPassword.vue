<template>
  <div class="reset-password-container">
    <div class="background"></div>
    <div class="content">
      <h2 class="title">Reset Your Password</h2>
      <div class="lock"></div>
      <form @submit.prevent="resetPassword" class="form">
        <input type="email" v-model="email" class="input" :class="{ 'active': email }" placeholder="Enter your email" autocomplete="email">
        <div v-if="emailValidationMessage" class="validation-message">{{ emailValidationMessage }}</div>
        <button type="submit" class="button" :disabled="isSending">Send Reset Link</button>
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
      Logo: Logo,
      isSending: false
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
        this.isSending = true;
        setTimeout(() => {
          console.log('Reset link sent to:', this.email);
          alert('A password reset link has been sent to your email.');
          this.isSending = false;
        }, 2000);
      } else {
        alert('Please enter a valid email address.');
      }
    },
    goBack() {
      this.$router.push({ name: 'login' });
      console.log('Navigating back to login page');
    }
  },
  mounted() {
    const lock = document.querySelector('.lock');
    lock.classList.add('animateLock');
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
  background-color: #6e3ca5;
}

.content {
    position: relative;
    z-index: 1;
    background-color: #333; /* Cor de fundo do conteúdo */
    padding: 51px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(25, 62, 212, 0.1);
    text-align: center;
    padding-left: 33px;
    cursor: pointer!important;
}

.title {
  margin-bottom: 20px;
  color: #bcadcd;
}

.lock {
  width: 100px;
  height: 100px;
  background: url('https://img.icons8.com/fluency/48/private2.png') center/cover no-repeat; 
  margin: 0 auto 20px;
  
}

.animateLock {
  animation: pulseLock 2s infinite; /* animation */
}

@keyframes pulseLock {
  0% {
    transform: scale(0.9);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(0.9);
  }
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
  color: #ff4444;
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
  color:#f5ebff;
  text-decoration: none;
}

.back-link:hover {
  text-decoration: underline;
  color: #d529c1; 
}
</style>
