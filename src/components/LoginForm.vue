<template>
  <div>
    <nav class="navbar">
      <div class="navbar-brand">
        <span class="navbar-item">
          Perfeed
        </span>
      </div>
      <div class="navbar-menu">
        <div class="navbar-start">
          <a class="navbar-item" @click="goToHome">
            Início
          </a>
        </div>
      </div>
    </nav>

    <div class="feed-container">
      <h1>Feed</h1>

      <!-- Caixa de comentário -->
      <div class="comment-box">
        <textarea
          v-model="newPostContent"
          placeholder="No que você está pensando?"
          class="comment-input"
          @focus="expandTextarea"
          @input="expandTextarea"
        ></textarea>
        <button @click="createPost" class="comment-button">Postar</button>
      </div>

      <!-- Lista de posts -->
      <div class="post-list">
        <div v-for="post in visiblePosts" :key="post.id" class="post">
          <!-- Informações do usuário -->
          <div class="user-info">
            <img :src="post.userImage" alt="User Image" class="user-image">
            <div class="user-details">
              <span class="user-name">{{ post.userName }}</span>
              <span class="post-timestamp">{{ post.timestamp }}</span>
            </div>
            <!-- Editar e excluir post (seu post) -->
            <span v-if="post.userName === 'Lanna Almeida'" class="edit-buttons">
              <button @click="editPost(post)">
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA6ElEQVR4nO2VOw7CMAxAOQxiY+vAhA0IMbDSOAOX6MQIE3Cq2sAR2OEEICZWUCSqllZQhsZSRZ/kJYnyZDufVquhzgDbCNlcUegIbAMlKa1Q6JEECN2ATU9V+i63gbr4FUdv4m9yYLpULnJRJge2UaXSdGOzzc6h0CIVm6UXaaachczzY94OUT5zrZP78CKHH6QqPcVGWhXwN+XF2Exe/2nJtanwcUgADufqUkdf7Fhd6hjtqaMm7UvYzW4MHLYHOzsEtjNkunvLFMVsPmWFsZ16kTpQzFmlj3lQ6IBMJxRau7IXFjTUkSf9xKa1VMyYvgAAAABJRU5ErkJggg==" alt="Editar">
              </button>

              <button @click="deletePost(post)">
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAABAElEQVR4nO2VwW0CMRBFLUEbkEZAFAAC/7/aS6gAziAlDSQVJBVABVABVJBUEDrgtFp7JRZtCogyM4ZIgS/tzfbzG+9onLvnlylJXwJjd+0EIASyvMjhJTBuDo9kLfmaPapqBHIvhf1wif3fgIGd2Py2EoBjgjIfxeBIfprfGPiQG5PbBH/0Rg4G3hOA38TgSD4naKcnjfE0gfGj3DjL+mZj73ticJHnXSu4mEw6YnCd561AVoYyV/Vg0HaaROBg6OEvp00wDAvTcIjA2vDGK70x8GowfrEYzw3GMzW48n6kBVfAUA0uyIdAnhStdGr2OksiuZTM5u+1wMIEvedf5AzHiXfzk3bADAAAAABJRU5ErkJggg==" alt="Excluir">
              </button>

            </span>


          </div>
          <!-- Conteúdo do post -->
          <p>{{ post.content }}</p>
          <!-- Imagem do post -->
          <img v-if="post.image" :src="post.image" alt="Post Image">
          <!-- Ações do post -->
          <div class="post-actions">
            <button @click="toggleLike(post)" class="action-button">
              <i :class="['fas', post.liked ? 'fa-heart' : 'far fa-heart']"></i>
              {{ post.likes }}
            </button>
            <button @click="sharePost(post)" class="action-button">
              <i class="fas fa-share"></i> Compartilhar
            </button>
            <span class="shares-count">{{ post.shares }} Compartilhamentos</span>
          </div>
          <!-- Comentários do post -->
          <div v-if="post.comments && post.comments.length > 0">
            <h3>Comentários:</h3>
            <ul>
              <li v-for="comment in post.comments" :key="comment.id">{{ comment.text }}</li>
            </ul>
          </div>
        </div>
      </div>
      <!-- Loading -->
      <div v-if="loading" class="loading">Carregando...</div>
    </div>

    <!-- Modal de Edição -->
    <div v-if="showEditModal" class="modal-overlay">
      <div class="modal">
        <h2>Editar Post</h2>
        <textarea v-model="editedPostContent" class="modal-textarea"></textarea>
        <div class="modal-buttons">
          <button @click="cancelEdit" class="modal-cancel-button">Cancelar</button>
          <button @click="saveEdit" class="modal-save-button">Salvar</button>
        </div>
      </div>
    </div>

    <!-- Modal de Exclusão -->
    <div v-if="showDeleteModal" class="modal-overlay">
      <div class="modal">
        <h2>Excluir Post</h2>
        <p>Deseja realmente excluir este post?</p>
        <div class="modal-buttons">
          <button @click="cancelDelete" class="modal-cancel-button">Cancelar</button>
          <button @click="confirmDelete" class="modal-delete-button">Excluir</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      posts: [
        {
          id: 1,
          userName: 'Ana Souza',
          userImage: 'https://randomuser.me/api/portraits/women/3.jpg',
          content: 'Aproveitando o sol e o mar hoje na praia. Que dia incrível!',
          comment: '',
          comments: [],
          liked: true,
          likes: 15,
          shares: 3,
          image: 'https://www.feriasbrasil.com.br/fotosfb/261179695-MOB.jpg', // Imagem atualizada
          timestamp: this.generateRandomTimestamp()
        },
        // Outros posts...
      ],
      visiblePosts: [],
      loading: false,
      newPostContent: '',
      showEditModal: false,
      showDeleteModal: false,
      editedPostContent: '',
      postToDelete: null,
      postToEdit: null // Definindo postToEdit como null
    };
  },
  created() {
    // Inicialmente, exibe os 5 primeiros posts
    this.loadMorePosts();
  },
  methods: {
    generateRandomTimestamp() {
      const months = [
        'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
        'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
      ];
      
      const day = Math.floor(Math.random() * 30) + 1; // Gera um dia aleatório entre 1 e 30
      const month = months[Math.floor(Math.random() * months.length)]; // Gera um mês aleatório
      const hour = Math.floor(Math.random() * 24); // Gera uma hora aleatória entre 0 e 23
      const minute = Math.floor(Math.random() * 60); // Gera um minuto aleatório entre 0 e 59
      
      return `${day} de ${month} às ${hour}:${minute < 10 ? '0' + minute : minute}`;
    },
    goToHome() {
      this.$router.push({ name: 'feed' });
    },
    addComment(post) {
      if (post.comment.trim() !== '') {
        post.comments.push({ id: Date.now(), text: post.comment });
        post.comment = '';
      }
    },
    expandTextarea(event) {
      event.target.style.height = 'auto';
      event.target.style.height = event.target.scrollHeight + 'px';
    },
    toggleLike(post) {
      post.liked = !post.liked;
      post.likes += post.liked ? 1 : -1;
    },
    sharePost(post) {
      post.shares++;
    },
    loadMorePosts() {
      this.loading = true;
      // Simulação de carregamento de mais posts (após 1 segundo)
      setTimeout(() => {
        const startIndex = this.visiblePosts.length;
        const endIndex = startIndex + 5;
        this.visiblePosts = this.posts.slice(0, endIndex);
        this.loading = false;
      }, 1000);
    },
    createPost() {
      // Adicionando um novo post com o conteúdo digitado
      if (this.newPostContent.trim() !== '') {
        const newPost = {
          id: Date.now(),
          userName: 'Lanna Almeida', // Seu nome
          userImage: 'https://scontent.fbel1-1.fna.fbcdn.net/v/t39.30808-6/397194225_6116207795147875_3350928849902618526_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_ohc=2Ywj54siZYcQ7kNvgFiMhHI&_nc_ht=scontent.fbel1-1.fna&cb_e2o_trans=q&oh=00_AfCwgJ2pI8XYrmjp8jNNHoGgXgFXhI70JuZ3FmpGVo9rFg&oe=663F0284', // Sua foto
          title: 'Nova Postagem',
          content: this.newPostContent,
          comment: '',
          comments: [],
          liked: false,
          likes: 0,
          shares: 0,
          image: null, // Você pode adicionar uma imagem se desejar
          timestamp: this.generateRandomTimestamp()
        };
        this.posts.unshift(newPost); // Adiciona o novo post no início do array
        this.newPostContent = ''; // Limpa o campo de texto
        this.visiblePosts.unshift(newPost); // Adiciona o novo post visível no início do array
      }
    },
    editPost(post) {
      this.postToEdit = post; // Atualizando postToEdit
      this.editedPostContent = post.content;
      this.showEditModal = true;
    },
    saveEdit() {
      if (this.postToEdit) { // Verificando se postToEdit está definido
        this.postToEdit.content = this.editedPostContent;
        this.showEditModal = false;
        this.postToEdit = null; // Resetando postToEdit
      }
    },
    cancelEdit() {
      this.showEditModal = false;
      this.postToEdit = null; // Resetando postToEdit
    },
    deletePost(post) {
      this.postToDelete = post;
      this.showDeleteModal = true;
    },
    confirmDelete() {
      const index = this.posts.findIndex(p => p.id === this.postToDelete.id);
      if (index !== -1) {
        this.posts.splice(index, 1);
        this.visiblePosts = this.posts.slice(0, this.visiblePosts.length);
      }
      this.showDeleteModal = false;
    },
    cancelDelete() {
      this.showDeleteModal = false;
    }
  }
};

</script>

<style scoped>

h1 {
  margin-top: 8%;
  font-family: 'Helvetica Neue', Arial, sans-serif;
  margin-left: 24%;
}
.feed-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.post-list {
  display: flex;
  flex-direction: column;
  align-items: center; /* Centraliza na horizontal */
}

.post {
  margin-bottom: 20px;
  border: 1px solid #ccc;
  padding: 10px; /* Reduzindo o padding */
  border-radius: 10px;
  width: 100%; /* Define a largura total */
  max-width: 400px; /* Define a largura máxima */
}

.post img {
  max-width: 100%;
  margin-top: 10px;
}

.navbar {
  background-color: #140841; 
  color: #fff;
  padding: 10px 20px;
  width: 100%;
  position: fixed; 
  top: 0; 
  left: 0;
  z-index: 1000; 
}

.navbar-brand {
  font-weight: bold;
  font-size: 24px;
}

.navbar-item {
  color: #fff;
  margin-right: 10px;
  cursor: pointer;
}

.navbar-item:hover {
  text-decoration: underline;
}

.comment-box {
  display: flex;
  align-items: center;
  margin-top: 20px;
  margin-left: 24%;
  margin-bottom: 7%;
}

.comment-input {
  flex: 1;
  padding: 8px; /* Reduzindo o padding */
  border: 1px solid #ccc;
  border-radius: 20px;
  outline: none;
  font-size: 16px;
  resize: none;
  transition: height 0.3s ease;
  max-width: 400px; /* Define a largura máxima */
}

.comment-input:focus {
  border-color: #281278;
}

.comment-button {
  margin-left: 10px;
  padding: 12px 20px;
  border: none;
  border-radius: 20px;
  background-color: #281278; 
  color: #fff;
  cursor: pointer;
  outline: none;
  transition: background-color 0.3s ease;
}

.comment-button:hover {
  background-color: #180c45; 
}

.post-actions {
  margin-top: 10px;
}

.action-button {
  margin-right: 10px;
  padding: 8px 16px;
  border: none;
  border-radius: 20px;
  background-color: #281278;
  color: #fff;
  cursor: pointer;
  outline: none;
  transition: background-color 0.3s ease;
}

.action-button:hover {
  background-color: #180c45;
}

.likes-count,
.shares-count {
  margin-right: 10px;
  font-size: 14px;
  color: #666;
}

.loading {
  margin-top: 20px;
  text-align: center;
  font-style: italic;
  color: #666;
}

.user-info {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.user-image {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
}

.user-name {
  font-weight: bold;
  font-size: 18px;
  color: #333;
  font-family: 'Helvetica Neue', Arial, sans-serif;
}

.user-details {
  margin-right: 10px; /* Ajuste conforme necessário */
}

.post-timestamp {
  display: block;
  font-size: 14px; /* Ajuste conforme necessário */
  color: #666; /* Cor do texto */
}

/* Estilos para os modais */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Fundo escuro com transparência */
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  max-width: 400px;
  width: 100%;
}

.modal h2 {
  margin-top: 0;
}

.modal-textarea {
  width: 100%;
  height: 100px; /* Altura ajustável */
  margin-bottom: 10px;
}

.modal-buttons {
  display: flex;
  justify-content: space-between;
}

.modal-button {
  padding: 8px 16px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  outline: none;
}

.modal-cancel-button {
  background-color: #ccc;
}

.modal-save-button {
  background-color: #281278;
  color: #fff;
}

.modal-delete-button {
  background-color: #ff4b4b;
  color: #fff;
}

</style>
