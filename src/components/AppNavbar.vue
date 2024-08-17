<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <span class="navbar-item">Perfeed</span>
    </div>
    <div class="navbar-menu">
      <div class="navbar-start">
        <a class="navbar-item" @click="goToFeed">
          <img src="https://cdn-icons-png.flaticon.com/512/1946/1946488.png" alt="Início" class="home-icon">
        </a>
      </div>
      <div class="navbar-end">
        <div class="user-menu" @click="toggleUserMenu">
          <img :src="userProfileImage" alt="User Image" class="user-image">
          <div v-if="isUserMenuOpen" class="dropdown">
            <a class="dropdown-item" @click="goToProfile">Perfil</a>
            <a class="dropdown-item" @click="goToSettings">Configurações e privacidade</a>
            <a class="dropdown-item" @click="goToSupport">Ajuda e suporte</a>
            <a class="dropdown-item" @click="goToLogin">Sair</a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'AppNavbar',
  props: {
    userProfileImage: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      isUserMenuOpen: false
    };
  },
  methods: {
    toggleUserMenu() {
      this.isUserMenuOpen = !this.isUserMenuOpen;
    },
    goToFeed() {
      this.$router.push({ name: 'feed' });
    },
    goToProfile() {
      this.$router.push({ name: 'profile' });
    },
    goToSettings() {
      this.$router.push({ name: 'settings' });
    },
    goToSupport() {
      this.$router.push({ name: 'support' });
    },
    goToLogin() {
      this.$router.push({ name: 'login' });
    }
  }
};
</script>


<style scoped>
.navbar {
  background-color: #140841; 
  color: #fff;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  position: fixed; 
  top: 0;
  left: 0;
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.navbar-brand {
  font-weight: bold;
  font-size: 24px;
  color: #ffffff;
}

.navbar-item {
  color: #ffffff;
  margin-left: 20px;
  cursor: pointer;
  transition: color 0.3s ease;
}

.navbar-item:hover {
  color: #dddddd;
}

.navbar-menu {
  display: flex;
  align-items: center;
}

.navbar-start,
.navbar-end {
  display: flex;
  align-items: center;
}

.home-icon {
  width: 24px; 
  height: 24px;
  filter: invert(100%); 
}

.user-menu {
  position: relative;
  margin-left: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.user-image {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid #ffffff;
  transition: transform 0.3s ease, border-color 0.3s ease;
  margin-right: 59px;
}

.user-image:hover {
  transform: scale(1.1);
  border-color: #dddddd;
}

.dropdown {
  position: absolute;
  top: 50px;
  right: 0;
  background-color: #ffffff;
  border-radius: 5px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  padding: 10px 0;
  min-width: 160px;
}

.dropdown-item {
  padding: 10px 20px;
  color: #333;
  text-decoration: none;
  display: block;
  transition: background-color 0.3s ease;
}

.dropdown-item:hover {
  background-color: #f0f0f0;
}
</style>
