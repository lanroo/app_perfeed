<template>
  <div class="reset-password-container">
    <div class="background"></div>
    <div class="content">
      <h2 class="title">Reset Your Password</h2>
      <div class="lock-icon"></div>
      <form @submit.prevent="resetPassword" class="form">
        <input type="email" v-model="email" class="input" :class="{ 'active': email }" placeholder="Enter your email" required autocomplete="email">
        <p v-if="emailValidationMessage" class="validation-message">{{ emailValidationMessage }}</p>
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
    // const lock = document.querySelector('.lock');
    // lock.classList.add('animateLock');
}
}
</script>

<style scoped>
@keyframes pulseLock {
  0%, 100% {
    transform: scale(1); 
  }
  50% {
    transform: scale(1.1); 
  }
}

.lock-icon {
  width: 50px;
  height: 50px;
  background: url('https://img.icons8.com/fluency/48/private2.png') center/cover no-repeat;
  margin: 20px auto;
  animation: pulseLock 1.5s infinite; 
}

.background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #5a3f95, #8348af);
}

.content {
  position: relative;
  background: #fff;
  padding: 40px 60px;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  text-align: center;
  max-width: 360px; 
  width: 100%;
}

.title {
  font-family: 'Poppins', sans-serif;
  color: #383d41;
  margin-bottom: 25px;
  font-size: 22px;
}

.input {
  width: 100%;
  padding: 12px 15px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  transition: all 0.3s ease; 
  box-sizing: border-box; 
}
.input:hover {
  transform: scale(1.03); 
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2); 
}

.input.active, .input:focus {
  border-color: #5e60ce;
  box-shadow: 0 2px 8px rgba(94, 96, 206, 0.5); 
}

.validation-message {
  color: #d9534f;
  margin-bottom: 15px;
}

.button {
  width: 100%;
  padding: 12px;
  background-color: #6e3ca5;
  color: #fff;
  font-weight: 500;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.button:hover {
  background-color: #5e60ce;
}

.button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.back-link {
  display: block;
  margin-top: 15px;
  color: #6e3ca5;
  text-decoration: none;
}

.back-link:hover {
  text-decoration: underline;
  color: #5e60ce;
}
.reset-password-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  box-sizing: border-box;
}

</style>
