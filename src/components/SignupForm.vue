<template>
  <div class="signup-container">
    <div class="signup-background"></div>
    <div class="signup-content">
      <h2 class="signup-title">Create a New Account</h2>
      <img :src="Logo" alt="Logomarca" class="signup-logo">
      <div class="signup-overlay"></div>
      <form @submit.prevent="createAccount" class="signup-form">
        <input type="text" v-model="fullName" class="signup-input" :class="{ 'active': fullName }" placeholder="Full Name">
        <input type="email" v-model="email" class="signup-input" :class="{ 'active': email }" placeholder="Email Address">
        <input type="password" v-model="password" class="signup-input" :class="{ 'active': password }" placeholder="Password">
        <input type="password" v-model="confirmPassword" class="signup-input" :class="{ 'active': confirmPassword }" placeholder="Confirm Password">
        <div v-if="passwordMismatch" class="validation-message">Passwords do not match.</div>
        <button type="submit" class="signup-button">Create Account</button>
        <a href="#" @click="goBack" class="forgot-password">Back to Login</a>
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
      return this.password !== this.confirmPassword && this.confirmPassword.length > 0;
    }
  },
  methods: {
    createAccount() {
      if (this.password === this.confirmPassword) {
        // Implement logic to create a new account
        console.log('New account created with:', {
          fullName: this.fullName,
          email: this.email,
          password: this.password
        });
        alert('Your account has been created successfully!');
        // Redirect to the login page
        this.$router.push({ name: 'login' });
      } else {
        alert('Please make sure your passwords match.');
      }
    },
    goBack() {
      // Navigate back to the login page
      this.$router.push({ name: 'login' });
      console.log('Navigating back to login page');
    }
  }
}
</script>

<style scoped>
/* Styles for the signup page */
body {
  font-family: 'Roboto', sans-serif; 
}

.signup-container {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.signup-background {
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

.signup-content {
  position: relative;
  z-index: 1;
}

.signup-overlay {
  position: absolute;
  top: 2px;
  left: 437px;
  width: 35%;
  height: 97%;
  background-color: rgba(255, 255, 255, 0.5);
  z-index: -1;
  border-radius: 50px;
}

.signup-title {
  font-family: 'Poppins', sans-serif;
  color: #652ed4;
  text-align: center;
  font-size: 28px;
  margin-bottom: 30px;
  display: block;
  padding-top: 23px;
  text-shadow: 1px 1px 3px rgba(233, 230, 230, 0.6);
}

.signup-logo {
  margin-top: 35px;
  width: 200px;
  height: auto;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.signup-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.signup-input {
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

.signup-input:hover {
  transform: scale(1.05);
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
}

.signup-input.active::placeholder {
  color: transparent;
}

.signup-input:focus::placeholder {
  color: #555;
}

.signup-input:focus {
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
  margin: 17px 4px;
  text-decoration: none;
  transition: color 0.3s ease;
  padding-bottom: 10px;
}

.forgot-password:hover {
  color: #321194;
}

.signup-button {
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

.signup-button:hover {
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
