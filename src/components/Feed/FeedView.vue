<template>
  <div>
    <AppNavbar :userProfileImage="userProfileImage" @navigate="navigate" />
    <div class="feed-container">
      <h1>Feed</h1>
      <div class="comment-box">
        <textarea v-model="newPostContent" placeholder="No que você está pensando?" class="comment-input" @focus="expandTextarea" @input="expandTextarea"></textarea>
        <button @click="createPost" class="comment-button">Postar</button>
      </div>

      <div class="post-list">
        <div v-for="post in visiblePosts" :key="post.id" class="post">
          <div class="user-info">
            <img :src="post.userImage" alt="User Image" class="user-image">
            <div class="user-details">
              <span class="user-name">{{ post.userName }}</span>
              <span class="post-timestamp">{{ post.timestamp }}</span>
            </div>
            <span v-if="post.userName === 'Lanna Almeida'" class="edit-buttons">
              <button @click="editPost(post)" class="icon-button"><i class="fas fa-pencil-alt"></i></button>
              <button @click="deletePost(post)" class="icon-button"><i class="fas fa-trash"></i></button>
            </span>
          </div>
          <p>{{ post.content }}</p>
          <img v-if="post.image" :src="post.image" alt="Post Image">
          <div class="post-actions">
            <button @click="toggleLike(post)" class="action-button"><i :class="['fas', post.liked ? 'fa-heart' : 'far fa-heart']"></i>{{ post.likes }}</button>
            <button @click="sharePost(post)" class="action-button"><i class="fas fa-share"></i> Compartilhar</button>
            <span class="shares-count">{{ post.shares }} Compartilhamentos</span>
          </div>
          <div v-if="post.comments && post.comments.length > 0">
            <h3>Comentários:</h3>
            <ul>
              <li v-for="comment in post.comments" :key="comment.id">{{ comment.text }}</li>
            </ul>
          </div>
        </div>
      </div>
      <div v-if="loading" class="loading">Carregando...</div>
    </div>

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
import AppNavbar from '@/components/AppNavbar.vue';

export default {
  components: {
    AppNavbar
  },
  data() {
    return {
      userProfileImage: 'https://randomuser.me/api/portraits/men/32.jpg',
      isUserMenuOpen: false,
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
          image: 'https://www.feriasbrasil.com.br/fotosfb/261179695-MOB.jpg',
          timestamp: this.generateRandomTimestamp()
        },
      ],
      visiblePosts: [],
      loading: false,
      newPostContent: '',
      showEditModal: false,
      showDeleteModal: false,
      editedPostContent: '',
      postToDelete: null,
      postToEdit: null
    };
  },
  created() {
    this.loadMorePosts();
  },
  methods: {
    navigate(route) {
      this.$router.push(route);
    },
    toggleUserMenu() {
      this.isUserMenuOpen = !this.isUserMenuOpen;
    },
    generateRandomTimestamp() {
      const months = [
        'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
        'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
      ];
      const day = Math.floor(Math.random() * 30) + 1;
      const month = months[Math.floor(Math.random() * months.length)];
      const hour = Math.floor(Math.random() * 24);
      const minute = Math.floor(Math.random() * 60);
      return `${day} de ${month} às ${hour}:${minute < 10 ? '0' + minute : minute}`;
    },
    goToHome() {
      this.$router.push({ name: 'feed' });
    },
    goToLogin() {
      this.$router.push({ name: 'login' });
    },
    goToSignup() {
      this.$router.push({ name: 'signup' });
    },
    goToForgotPassword() {
      this.$router.push({ name: 'forgotpassword' });
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
      setTimeout(() => {
        const startIndex = this.visiblePosts.length;
        const endIndex = startIndex + 5;
        this.visiblePosts = this.posts.slice(0, endIndex);
        this.loading = false;
      }, 1000);
    },
    createPost() {
      if (this.newPostContent.trim() !== '') {
        const newPost = {
          id: Date.now(),
          userName: 'Lanna Almeida',
          userImage: this.userProfileImage,
          title: 'Nova Postagem',
          content: this.newPostContent,
          comment: '',
          comments: [],
          liked: false,
          likes: 0,
          shares: 0,
          image: null,
          timestamp: this.generateRandomTimestamp()
        };
        this.posts.unshift(newPost);
        this.newPostContent = '';
        this.visiblePosts.unshift(newPost);
      }
    },
    editPost(post) {
      this.postToEdit = post;
      this.editedPostContent = post.content;
      this.showEditModal = true;
    },
    saveEdit() {
      if (this.postToEdit) {
        this.postToEdit.content = this.editedPostContent;
        this.showEditModal = false;
        this.postToEdit = null;
      }
    },
    cancelEdit() {
      this.showEditModal = false;
      this.postToEdit = null;
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

.feed-container[data-v-ab293e58] {
    max-width: 800px;
    margin: 0 auto;
    padding: 90px;
}
.feed-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.post-list {
  display: flex;
  flex-direction: column;
  align-items: center; 
}

.post {
  margin-bottom: 20px;
  border: 1px solid #ccc;
  padding: 10px; 
  border-radius: 10px;
  width: 100%; 
  max-width: 400px;
}

.post img {
  max-width: 100%;
  margin-top: 10px;
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
  padding: 8px; 
  border: 1px solid #ccc;
  border-radius: 20px;
  outline: none;
  font-size: 16px;
  resize: none;
  transition: height 0.3s ease;
  max-width: 400px; 
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
  width: 40px;
  height: 40px;
  border-radius: 40%;
  margin-right: 10px;
  cursor: pointer;
}

.user-name {
  font-weight: bold;
  font-size: 18px;
  color: #333;
  font-family: 'Helvetica Neue', Arial, sans-serif;
}
h1 {
    display: none;
}

.dropdown[data-v-1fd76d11] {
    position: absolute;
    top: 50px;
    right: 28px;
    background-color: #ffffff;
    border-radius: 5px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    z-index: 1000;
    padding: 10px 0;
    min-width: 160px;
}
.home-icon {
  width: 24px; /* Ajuste o tamanho conforme necessário */
  height: 24px;
  filter: invert(100%); /* Isso inverte as cores, tornando o ícone branco */
}

.user-details {
  margin-right: 10px; 
}

.post-timestamp {
  display: block;
  font-size: 14px; 
  color: #666; 
}

.modal-overlay {
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
  height: 100px; 
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

.edit-buttons button {
  background: none;
  cursor: pointer;
}

.edit-buttons img {
  display: block; 
}

.icon-button {
  border: none;
  background: none;
  cursor: pointer;
  padding: 5px;  
  margin-right: 3px;  
}

span.edit-buttons {
  margin-left: 33%;
}

.icon-button:last-child {
  margin-right: 0;
}

.icon-button i {
  color: #140841;
  font-size: 16px; 
}
</style>
