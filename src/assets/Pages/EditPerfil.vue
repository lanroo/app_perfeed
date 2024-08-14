<template>
  <div class="edit-profile-page">
    <h1>Editar Perfil</h1>
    <form @submit.prevent="saveProfile">

      <!-- Edição da capa do perfil -->
      <div class="form-group">
        <label for="coverPhoto">Trocar Capa do Perfil:</label>
        <input type="file" id="coverPhoto" @change="onCoverFileSelected">
      </div>

      <div class="form-group">
        <label for="firstName">Nome:</label>
        <input v-model="firstName" type="text" id="firstName" placeholder="Nome">
      </div>
      
      <div class="form-group">
        <label for="lastName">Sobrenome:</label>
        <input v-model="lastName" type="text" id="lastName" placeholder="Sobrenome">
      </div>
      
      <div class="form-group">
        <label for="profilePicture">Trocar Foto do Perfil:</label>
        <input type="file" id="profilePicture" @change="onFileSelected">
      </div>
      
      <div class="form-group">
        <label for="avatar">Escolher Avatar:</label>
        <div class="avatar-options">
          <img v-for="avatar in avatars" :key="avatar" :src="avatar" :alt="'Avatar ' + avatar" class="avatar-option" @click="selectAvatar(avatar)">
        </div>
      </div>
      
      <button type="submit" class="save-button">Salvar</button>
    </form>
    
    <div v-if="selectedAvatar || selectedCoverPhoto" class="preview">
      <h2>Pré-visualização:</h2>
      <div v-if="selectedCoverPhoto">
        <h3>Capa do Perfil:</h3>
        <img :src="selectedCoverPhoto" alt="Capa escolhida" class="cover-preview">
      </div>
      <div v-if="selectedAvatar" class="avatar-preview-container">
        <h3>Avatar Escolhido:</h3>
        <img :src="selectedAvatar" alt="Avatar escolhido" class="avatar-preview">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditPerfil',
  data() {
    return {
      firstName: 'Julia',
      lastName: 'Silva',
      selectedAvatar: '',
      selectedCoverPhoto: '',
      avatars: [
        'https://i.pravatar.cc/150?img=1',
        'https://i.pravatar.cc/150?img=2',
        'https://i.pravatar.cc/150?img=3',
        'https://i.pravatar.cc/150?img=4',
        'https://i.pravatar.cc/150?img=5'
      ]
    };
  },
  methods: {
    onFileSelected(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.selectedAvatar = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    onCoverFileSelected(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.selectedCoverPhoto = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    selectAvatar(avatar) {
      this.selectedAvatar = avatar;
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
  margin-top: 7vw;
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
}

.form-group {
  margin-bottom: 15px;
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

.avatar-options {
  display: flex;
  gap: 10px;
  margin-top: 10px;
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
}

.save-button:hover {
  background-color: #365899;
}

.preview {
  margin-top: 20px;
  text-align: center;
}

.cover-preview {
  width: 100%;
  height: auto;
  margin-bottom: 20px;
  border-radius: 8px;
}

.avatar-preview-container {
  margin-top: 20px;
}

.avatar-preview {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
</style>
