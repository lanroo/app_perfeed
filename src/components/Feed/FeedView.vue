<template>
  <div>
    <AppNavbar :userProfileImage="userProfileImage" @navigate="navigate" />
    <div class="feed-container">
      <h1>Feed</h1>

      <!-- Comment Box Trigger -->
      <div class="comment-box" @click="openModal">
        <textarea v-model="newPostContent" placeholder="No que você está pensando?" class="comment-input"></textarea>
      </div>

      <div class="post-list">
        <div v-for="post in visiblePosts" :key="post.id" class="post">
          <!-- Post Content -->
          <div class="user-info">
            <img :src="post.userImage" alt="User Image" class="user-image">
            <div class="user-details">
              <span class="user-name">{{ post.userName }}</span>
              <span class="post-timestamp">{{ post.timestamp }}</span>
            </div>
            <span v-if="post.userName === 'Ylanna Almeida'" class="edit-buttons">
              <button @click="editPost(post)" class="icon-button"><i class="fas fa-pencil-alt"></i></button>
              <button @click="deletePost(post)" class="icon-button"><i class="fas fa-trash"></i></button>
            </span>
          </div>
          <p>{{ post.content }}</p>
          <img v-if="post.image" :src="post.image" alt="Post Image">
          <video v-if="post.video" controls :src="post.video"></video>
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

    <!-- Modal for Creating a Post -->
    <div v-if="showCreatePostModal" class="modal-overlay">
      <div class="modal">
        <h2>Criar Publicação</h2>
        <textarea v-model="newPostContent" placeholder="No que você está pensando?" class="modal-textarea"></textarea>

        <!-- Box Icons Section -->
        <div class="box-icons">
         <label for="file-upload" class="custom-file-upload">
          <img src="https://img.icons8.com/?size=100&id=97397&format=png&color=000000" alt="Upload Icon" class="upload-icon">
        </label>
        <input id="file-upload" type="file" @change="handleFileUpload" multiple class="file-input" accept="image/*,video/*">
        </div>       

        <div v-if="filePreviews.length > 0" class="previews">
          <div v-for="(file, index) in filePreviews" :key="index" class="preview">
            <img v-if="file.type.startsWith('image/')" :src="file.url" class="preview-image">
            <video v-if="file.type.startsWith('video/')" :src="file.url" class="preview-video" controls></video>
          </div>
        </div>

        <div class="modal-buttons">
          <button @click="cancelCreatePost" class="modal-cancel-button">Cancelar</button>
          <button @click="createPost" class="modal-post-button">Postar</button>
        </div>
      </div>
    </div>

    <!-- Modal for Editing a Post -->
    <div v-if="showEditModal" class="modal-overlay">
      <div class="modal">
        <h2>Editar Publicação</h2>
        <textarea v-model="editedPostContent" placeholder="Edite seu post" class="modal-textarea"></textarea>
        <div class="modal-buttons">
          <button @click="cancelEditPost" class="modal-cancel-button">Cancelar</button>
          <button @click="saveEditPost" class="modal-post-button">Salvar</button>
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
      userProfileImage: 'https://randomuser.me/api/portraits/lego/6.jpg',
      posts: [
        {
          id: 1,
          userName: 'Ana Paula Souza',
          userImage: 'https://randomuser.me/api/portraits/women/3.jpg',
          content: 'Aproveitando o sol e o mar hoje na praia. Que dia incrível!',
          liked: true,
          likes: 15,
          shares: 3,
          image: 'https://www.feriasbrasil.com.br/fotosfb/261179695-MOB.jpg',
          timestamp: '25 de julho às 14:35',
          comments: []
        },
        {
          id: 2,
          userName: 'Carlos Lima',
          userImage: 'https://randomuser.me/api/portraits/men/1.jpg',
          content: 'Finalmente terminei aquele livro que estava lendo há meses. Altamente recomendável!',
          liked: false,
          likes: 8,
          shares: 1,
          image: null,
          timestamp: '24 de julho às 10:15',
          comments: []
        },
        {
          id: 3,
          userName: 'Larissa Maria',
          userImage: 'https://randomuser.me/api/portraits/women/65.jpg',
          content: 'Hoje está um dia lindo!',
          liked: false,
          likes: 8,
          shares: 1,
          image: null,
          timestamp: '23 de julho às 17:45',
          comments: []
        },
        {
          id: 4,
          userName: 'Pedro Henrique',
          userImage: 'https://randomuser.me/api/portraits/men/2.jpg',
          content: 'Aprendendo novas receitas hoje. A cozinha está um caos, mas vale a pena! 🍲',
          liked: false,
          likes: 12,
          shares: 2,
          image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2',
          timestamp: '22 de julho às 13:25',
          comments: []
        },
        {
          id: 5,
          userName: 'Marta Lima',
          userImage: 'https://randomuser.me/api/portraits/women/4.jpg',
          content: 'Reflexões sobre a vida... Às vezes é bom desacelerar e pensar em tudo que conquistamos.',
          liked: true,
          likes: 18,
          shares: 4,
          image: null,
          timestamp: '21 de julho às 09:55',
          comments: []
        }
      ],
      visiblePosts: [],
      loading: false,
      newPostContent: '',
      showCreatePostModal: false,
      filePreviews: [],
      showEditModal: false,
      editedPostContent: '',
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
    loadMorePosts() {
      this.loading = true;
      setTimeout(() => {
        const startIndex = this.visiblePosts.length;
        const endIndex = startIndex + 5;
        const newPosts = this.posts.slice(startIndex, endIndex);
        
        if (newPosts.length > 0) {
          this.visiblePosts = [...this.visiblePosts, ...newPosts];
        }
        this.loading = false;
      }, 1000);
    },
    openModal() {
      this.showCreatePostModal = true;
    },
    closeModal() {
      this.showCreatePostModal = false;
      this.filePreviews = [];
    },
    createPost() {
      if (this.newPostContent.trim() !== '') {
        const newPost = {
          id: Date.now(),
          userName: 'Ylanna Almeida',
          userImage: this.userProfileImage,
          content: this.newPostContent,
          liked: false,
          likes: 0,
          shares: 0,
          image: this.filePreviews.find(file => file.type.startsWith('image/'))?.url || null,
          video: this.filePreviews.find(file => file.type.startsWith('video/'))?.url || null,
          timestamp: this.generateRandomTimestamp(),
          comments: []
        };
        this.posts.unshift(newPost);
        this.newPostContent = '';
        this.visiblePosts.unshift(newPost);
        this.closeModal();
      }
    },
    cancelCreatePost() {
      this.newPostContent = '';
      this.closeModal();
    },
    handleFileUpload(event) {
      const files = Array.from(event.target.files);
      this.filePreviews = files.map(file => ({
        url: URL.createObjectURL(file),
        type: file.type
      }));
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
    toggleLike(post) {
      post.liked = !post.liked;
      post.likes += post.liked ? 1 : -1;
    },
    sharePost(post) {
      post.shares++;
    },
    editPost(post) {
      this.postToEdit = post;
      this.editedPostContent = post.content;
      this.showEditModal = true;
    },
    saveEditPost() {
      if (this.postToEdit) {
        this.postToEdit.content = this.editedPostContent;
        this.showEditModal = false;
        this.postToEdit = null;
      }
    },
    cancelEditPost() {
      this.showEditModal = false;
      this.postToEdit = null;
    }
  }
};
</script>

<style scoped>
.feed-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 90px;
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

.post img, .post video {
  max-width: 100%;
  margin-top: 10px;
}

.upload-icon[data-v-ab293e58] {
    width: 23px;
    height: 21px;
}

.box-icons {
      display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid rgb(40 18 120 / 6%);
    border-radius: 8px;
    width: 98%;
    background-color: rgba(40, 18, 120, 0.2); 
    margin-top: 0;
    padding: 4px; 
    height: 24px; 
    margin-bottom: 1vw;
}

.comment-box {
  display: flex;
  align-items: center;
  margin-top: 20px;
  margin-left: 24%;
  margin-bottom: 7%;
  cursor: pointer;
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
  cursor: text;
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
  box-sizing: border-box;
}

.modal h2 {
  margin-top: 0;
}

.modal-textarea {
  width: 100%;
  max-width: 100%; 
  height: 150px; 
  margin-bottom: 10px;
  box-sizing: border-box; 
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  resize: vertical; 
}

.custom-file-upload {
  display: inline-block;
  cursor: pointer;
}

.upload-icon {
  width: 50px;
  height: 50px;
}

.file-input {
  display: none;
}

.previews {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 10px;
}

.preview {
  display: inline-block;
  max-width: 100px;
  max-height: 100px;
  overflow: hidden;
}

.preview img, .preview video {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 5px;
}

.modal-buttons {
  display: flex;
  justify-content: space-between;
}

.modal-post-button {
  background-color: #281278;
  color: #fff;
  padding: 8px 16px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  outline: none;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.modal-post-button:hover {
  background-color: #180c45;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
}

.modal-cancel-button {
  background-color: #ccc;
  padding: 8px 16px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  outline: none;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.modal-cancel-button:hover {
  background-color: #b3b3b3;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
}

.user-info {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.user-image {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
  cursor: pointer;
}

.user-name {
  font-weight: bold;
  font-size: 18px;
  color: #333;
  font-family: 'Helvetica Neue', Arial, sans-serif;
  white-space: nowrap;
}

.user-details {
  margin-right: 10px;
}

h1 {
    display: flex;
    justify-content: space-around;
    margin-right: 26vw;
}

.post-timestamp {
  display: block;
  font-size: 14px;
  color: #666;
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

.loading {
  margin-top: 20px;
  text-align: center;
  font-style: italic;
  color: #666;
}

.dropdown {
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
  margin-left: 41%!important;
  white-space: nowrap;
}

.icon-button:last-child {
  margin-right: 0;
}

.icon-button i {
  color: #140841;
  font-size: 16px;
}
</style>
