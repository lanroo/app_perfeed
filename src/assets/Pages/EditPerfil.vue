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
        <button @click.prevent="openCreateAvatarModal">Ou crie o seu próprio avatar</button>
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

    <!-- Modal para Criar Avatar -->
    <div v-if="showCreateAvatarModal" class="modal">
      <div class="modal-content">
        <h2>Criar seu próprio avatar</h2>
        
        <!-- Preview do Avatar -->
        <div id="avatar-container"></div>
        
        <!-- Seleção de Gênero -->
        <div class="avatar-customization">
          <div>
            <label for="gender">Gênero</label>
            <select v-model="customAvatar.gender" @change="updateAvatar('gender')">
              <option value="masculino">Masculino</option>
              <option value="feminino">Feminino</option>
            </select>
          </div>

          <!-- Seleção de Cor da Pele -->
          <div>
            <label for="skinColor">Tom de Pele</label>
            <div class="color-options">
              <div v-for="color in skinColors" :key="color" 
                   :style="{ backgroundColor: color }" 
                   class="color-option" 
                   @click="setSkinColor(color)">
              </div>
            </div>
          </div>

          <!-- Seleção de Tipo e Cor de Cabelo -->
          <div>
            <label for="hairStyle">Estilo de Cabelo</label>
            <select v-model="customAvatar.hairStyle" @change="updateAvatar('hairStyle')">
              <option v-for="style in hairStyles" :key="style" :value="style">{{ style }}</option>
            </select>
          </div>

          <div>
            <label for="hairColor">Cor do Cabelo</label>
            <div class="color-options">
              <div v-for="color in hairColors" :key="color" 
                   :style="{ backgroundColor: color }" 
                   class="color-option" 
                   @click="setHairColor(color)">
              </div>
            </div>
          </div>

          <!-- Seleção de Roupa -->
          <div>
            <label for="outfit">Roupas</label>
            <select v-model="customAvatar.outfit" @change="updateAvatar('outfit')">
              <option v-for="outfit in outfitOptions" :key="outfit" :value="outfit">{{ outfit }}</option>
            </select>
          </div>

          <!-- Seleção de Acessórios -->
          <div>
            <label for="accessory">Acessórios</label>
            <select v-model="customAvatar.accessory" @change="updateAvatar('accessory')">
              <option v-for="accessory in accessoryOptions" :key="accessory" :value="accessory">{{ accessory }}</option>
            </select>
          </div>
        </div>

        <!-- Escolha de fundo -->
        <div class="background-options">
          <label>
            <input type="radio" v-model="background" value="white"> Fundo Branco
          </label>
          <label>
            <input type="radio" v-model="background" value="colorful"> Fundo Colorido
          </label>
        </div>

        <button @click="captureAvatar">Criar</button>
        <button @click="closeCreateAvatarModal">Cancelar</button>
      </div>
    </div>

  </div>
</template>

<script>
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

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
      avatars: [
        'https://i.pravatar.cc/150?img=1',
        'https://i.pravatar.cc/150?img=2',
        'https://i.pravatar.cc/150?img=3',
        'https://i.pravatar.cc/150?img=4',
        'https://i.pravatar.cc/150?img=5',
        'https://i.pravatar.cc/150?img=6',
        'https://i.pravatar.cc/150?img=7',
        'https://i.pravatar.cc/150?img=8'
      ],
      showCreateAvatarModal: false,
      customAvatar: {
        gender: 'masculino',
        skinColor: '#f5d6c6',
        hairStyle: 'curto',
        hairColor: '#000000',
        outfit: '',
        accessory: ''
      },
      skinColors: ['#f5d6c6', '#d2a679', '#8d5524', '#c68642', '#e0ac69'],
      hairColors: ['#000000', '#8b4513', '#ffdbac', '#d1b280', '#ffffff'],
      hairStyles: ['curto', 'longo', 'cacheado', 'trançado'],
      outfitOptions: ['Roupa1', 'Roupa2', 'Roupa3'],
      accessoryOptions: ['Chapéu', 'Óculos', 'Brincos'],
      background: 'white',
      scene: null,
      camera: null,
      renderer: null,
      avatar: null
    };
  },
  mounted() {
    this.initScene();
    this.loadAvatarByGender(); // Carregar o avatar com base no gênero selecionado inicialmente
  },
  methods: {
    initScene() {
      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000); // Ajuste a proporção para o tamanho do canvas
      this.renderer = new THREE.WebGLRenderer({ alpha: true });
      this.renderer.setSize(400, 400); // Tamanho fixo para o canvas
      const container = document.getElementById('avatar-container');
      if (container) {
        container.appendChild(this.renderer.domElement);
      }
      this.camera.position.z = 3;
      this.animate = this.animate.bind(this);
    },
    loadAvatarByGender() {
      const loader = new GLTFLoader();
      const modelPath = this.customAvatar.gender === 'masculino' 
        ? '/models/male_avatar.glb' 
        : '/models/female_avatar.glb';

      // Remover o avatar atual antes de carregar o novo
      if (this.avatar) {
        this.scene.remove(this.avatar);
        this.avatar = null;
      }

      loader.load(modelPath, (gltf) => {
        this.avatar = gltf.scene;
        this.scene.add(this.avatar);
        this.updateAvatar('skin'); // Atualizar cor da pele após carregar o novo avatar
        this.updateAvatar('hair'); // Atualizar cabelo após carregar o novo avatar
        this.renderer.render(this.scene, this.camera);
        this.animate(); // Inicia a animação
      });
    },
    updateAvatar(part) {
      if (this.avatar) {
        if (part === 'gender') {
          this.loadAvatarByGender();
        } else if (part === 'skin') {
          this.avatar.traverse((child) => {
            if (child.isMesh && child.name.includes('Skin')) {
              child.material.color.set(this.customAvatar.skinColor);
            }
          });
        } else if (part === 'hair') {
          this.avatar.traverse((child) => {
            if (child.isMesh && child.name.includes('Hair')) {
              child.material.color.set(this.customAvatar.hairColor);
            }
          });
        } else if (part === 'outfit') {
          // Implementar lógica de troca de roupa
        } else if (part === 'accessory') {
          // Implementar lógica de troca de acessórios
        }
        this.renderer.render(this.scene, this.camera);
      }
    },
    animate() {
      requestAnimationFrame(this.animate);
      if (this.avatar) {
        this.renderer.render(this.scene, this.camera);
      }
    },
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
      this.currentProfilePicture = avatar; 
    },
    setSkinColor(color) {
      this.customAvatar.skinColor = color;
      this.updateAvatar('skin');
    },
    setHairColor(color) {
      this.customAvatar.hairColor = color;
      this.updateAvatar('hair');
    },
    captureAvatar() {
      this.renderer.render(this.scene, this.camera);
      const imgData = this.renderer.domElement.toDataURL('image/png');
      this.currentProfilePicture = imgData; // imagem de perfil
      this.showCreateAvatarModal = false;
    },
    saveProfile() {
      alert(`Perfil salvo com sucesso! \nNome: ${this.firstName} ${this.lastName}`);
    },
    closeCreateAvatarModal() {
      this.showCreateAvatarModal = false;
    },
    openCreateAvatarModal() {
      this.showCreateAvatarModal = true;
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

/* Modal para criação de avatar */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 80%;
  max-width: 500px;
}

#avatar-container {
  width: 400px;
  height: 400px;
  margin: 0 auto 20px auto;
  background-color: #f0f0f0;
  border-radius: 8px;
}

.color-options {
  display: flex;
  gap: 10px;
}

.color-option {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
}

.avatar-customization {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.background-options {
  margin-bottom: 20px;
}
</style>
