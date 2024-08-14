<template>
  <div class="edit-profile-page">
    <h1>Editar Perfil</h1>
    <form @submit.prevent="saveProfile">

      <!-- Visualização e Edição da Capa do Perfil -->
      <div class="form-group">
        <label for="coverPhoto">Foto da capa</label>
        <div class="cover-preview-container">
          <img :src="currentCoverPhoto" alt="Capa atual" class="cover-preview">
          <a href="#" @click.prevent="triggerCoverUpload" class="edit-link">Editar</a>
        </div>
        <input type="file" id="coverPhoto" ref="coverInput" @change="onCoverFileSelected" style="display: none;">
      </div>

      <!-- Visualização e Edição da Foto do Perfil -->
      <div class="form-group">
        <label for="profilePicture">Foto do perfil</label>
        <div class="profile-preview-container">
          <img :src="currentProfilePicture" alt="Foto de perfil atual" class="profile-preview">
          <a href="#" @click.prevent="triggerProfileUpload" class="edit-link">Editar</a>
        </div>
        <input type="file" id="profilePicture" ref="profileInput" @change="onFileSelected" style="display: none;">
      </div>

      <!-- Escolher Avatar -->
      <div class="form-group">
        <label for="avatar">Escolher Avatar</label>
        <div class="avatar-options">
          <img v-for="avatar in avatars" :key="avatar" :src="avatar" :alt="'Avatar ' + avatar" class="avatar-option" @click="selectAvatar(avatar)">
        </div>
      </div>
      
      <div class="form-group">
        <label for="firstName">Nome:</label>
        <input v-model="firstName" type="text" id="firstName" placeholder="Nome">
      </div>
      
      <div class="form-group">
        <label for="lastName">Sobrenome:</label>
        <input v-model="lastName" type="text" id="lastName" placeholder="Sobrenome">
      </div>

      <button type="submit" class="save-button">Salvar</button>
    </form>
  </div>
</template>

<script>
import { AvatarGenerator } from 'random-avatar-generator';

export default {
  name: 'EditPerfil',
  data() {
    return {
      firstName: 'Julia',
      lastName: 'Silva',
      currentCoverPhoto: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiQxsdbrkQqRfP5zI_1Kt6Fx809rAXXxsyhBYcf0iK5fF7h_9m0NSnMGT9zZotBb_9jEzf70HRlHnL2P3Y3JqPPVoP0cPJPHG3IlqC6xwJb1b-uTDhzG23BY8mmrsHTIJwemc4TD9r8NG45/s1600/Capa+para+Facebook+-fb-capas.blogspot+-+estilo+intagram+-+dente+de+leao.jpg',
      currentProfilePicture: 'https://randomuser.me/api/portraits/lego/6.jpg',
      selectedCoverPhoto: '',
      selectedProfilePicture: '',
      avatars: []
    };
  },
  created() {
    const generator = new AvatarGenerator();
    this.avatars = Array.from({ length: 8 }, () => generator.generateRandomAvatar());
  },
  methods: {
    triggerCoverUpload() {
      this.$refs.coverInput.click();
    },
    triggerProfileUpload() {
      this.$refs.profileInput.click();
    },
    onFileSelected(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.currentProfilePicture = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    onCoverFileSelected(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.currentCoverPhoto = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    selectAvatar(avatar) {
      this.currentProfilePicture = avatar; // Define o avatar como a foto de perfil selecionada
    },
    saveProfile() {
      alert(`Perfil salvo com sucesso! \nNome: ${this.firstName} ${this.lastName}`);
    }
  }
};
</script>

<style scoped>
.edit-profile-page {
  max-width: 600px;
  margin: 0 auto;
  background-color: #fff;
  padding: 64px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  font-family: 'Poppins', sans-serif;
  margin-top: 2vw;
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: 600;
  color: #555;
}

input[type="text"],
input[type="file"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

.cover-preview-container {
  position: relative;
  margin-bottom: 20px;
}

.cover-preview {
  width: 100%;
  height: auto;
  max-width: 600px;
  border-radius: 8px;
}

.profile-preview-container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 20px;
  text-align: center;
}

.cover-preview-container .edit-link {
  position: absolute;
  top: 10px; 
  right: 10px; 
  color: #fafafa;
  text-decoration: none;
  font-weight: 600;
  cursor: pointer;
}

.cover-preview-container .edit-link:hover {
  text-decoration: underline;
}

.profile-preview {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-bottom: 10px;
}

.avatar-options {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.avatar-option {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.avatar-option:hover {
  transform: scale(1.1);
}

.edit-link {
  color: #4267B2;
  text-decoration: none;
  font-weight: 600;
  cursor: pointer;
}

.edit-link:hover {
  text-decoration: underline;
}

.save-button {
  background-color: #4267B2;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 600;
  margin-top: 20px;
  transition: background-color 0.3s ease;
  display: block;
  width: 100%;
  text-align: center;
}

.save-button:hover {
  background-color: #365899;
}
</style>
