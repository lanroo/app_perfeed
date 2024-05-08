<template>
  <div class="signup-container">
    <div class="signup-background"></div>
    <div class="signup-content">
      <h2 class="signup-title">Create a New Account</h2>
      <img :src="Logo" alt="Logo" class="signup-logo">
      <form @submit.prevent="createAccount" class="signup-form">
        <input type="text" v-model.trim="fullName" placeholder="Full Name" class="signup-input" required>
        <input type="email" v-model.trim="email" placeholder="Email Address" class="signup-input" required>
        <input type="password" v-model="password" placeholder="Password" class="signup-input" required>
        <input type="password" v-model="confirmPassword" placeholder="Confirm Password" class="signup-input" required>
        <p v-if="passwordMismatch" class="validation-message">Passwords do not match.</p>
        <button type="submit" class="signup-button">Create Account</button>
        <a href="#" @click="goBack" class="login-link">Back to Login</a>
      </form>
    </div>
  </div>
</template>

<script>
import Logo from '@/assets/logo.png';


export default {
  name: 'CreateAccountForm',
  data() {
    return {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      Logo: Logo
    };
  },
  computed: {
    passwordMismatch() {
      return this.password !== this.confirmPassword && this.confirmPassword;
    }
  },
  methods: {
    createAccount() {
      if (!this.passwordMismatch) {
        console.log('New account created with:', {
          fullName: this.fullName,
          email: this.email,
          password: this.password
        });
        alert('Your account has been created successfully!');
        this.$router.push({ name: 'login' });
      } else {
        alert('Please make sure your passwords match.');
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
body {
  font-family: 'Roboto', sans-serif;
  background-color: #f4f4f9;
}

.signup-container {
    position: fixed;
    width: 100%;
    height: 122vh;
    display: flex;
    justify-content: center;
    align-items: center;
}


.signup-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #5e60ce, #6930c3);
  background-size: cover;
  z-index: -1;
}

.signup-content {
    position: fixed;
    width: 380px;
    padding: 40px;
    background: rgba(255, 255, 255, 0.85);
    border-radius: 12px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.47);
    z-index: 1;
    margin-bottom: 11%;
}

.signup-title {
  font-family: 'Poppins', sans-serif;
  color: #383d41;
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
}

.signup-logo {
  width: 100px;
  height: auto;
  display: block;
  margin: 20px auto 30px;
}

.signup-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.signup-input {
  padding: 12px 20px;
  margin-bottom: 15px;
  border-radius: 8px;
  border: 1px solid #ccc;
  background-color: #fff;
  width: 100%;
  font-size: 16px;
  color: #333;
  transition: width 0.3s ease, box-shadow 0.3s ease;
}

.signup-input:hover {
  width: 105%; 
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.signup-input:focus {
  border-color: #5e60ce;
  box-shadow: 0 0 8px rgba(94, 96, 206, 0.5);
  outline: none;
}

.validation-message {
  color: #e63946;
  font-size: 14px;
  margin-bottom: 10px;
}

.signup-button {
  padding: 10px 50px;
  background-color: #6930c3;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s;
}

.signup-button:hover {
  background-color: #5e60ce;
}

.login-link {
  color: #4A4A4A;
  text-align: center;
  margin-top: 10px;
  text-decoration: none;
  padding: 8px 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  transition: all 0.3s;
}

.login-link:hover {
  background-color: #f8f9fa;
  border-color: #bdbdbd;
}
</style>