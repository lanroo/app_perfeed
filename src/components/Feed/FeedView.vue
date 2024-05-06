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

      <div class="post-list">
        <div v-for="post in visiblePosts" :key="post.id" class="post">
          <div class="user-info">
            <img :src="post.userImage" alt="User Image" class="user-image">
            <span class="user-name">{{ post.userName }}</span>
          </div>
          <h2>{{ post.title }}</h2>
          <p>{{ post.content }}</p>
          <img v-if="post.image" :src="post.image" alt="Post Image">
          <div class="post-actions">
            <button @click="toggleLike(post)" class="action-button">{{ post.liked ? 'Descurtir' : 'Curtir' }}</button>
            <button @click="sharePost(post)" class="action-button">Compartilhar</button>
            <span class="likes-count">{{ post.likes }} Curtidas</span>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      posts: [
        { 
          id: 1, 
          userName: 'João Hanz',
          userImage: 'https://randomuser.me/api/portraits/men/1.jpg',
          title: 'Nossa nova conquista!',
          content: 'Hoje alcançamos mais um marco importante em nosso projeto. Estou muito feliz por fazer parte desse time incrível!',
          comment: '', 
          comments: [],
          liked: true,
          likes: 20,
          shares: 5,
          image: 'https://via.placeholder.com/150'
        },
        { 
          id: 2, 
          userName: 'Maria Oliveira',
          userImage: 'https://randomuser.me/api/portraits/women/2.jpg',
          title: 'Comemorando aniversário',
          content: 'É meu aniversário hoje! Muito grata por mais um ano de vida e por todas as pessoas maravilhosas ao meu redor.',
          comment: '', 
          comments: [],
          liked: false,
          likes: 10,
          shares: 2,
          image: 'https://via.placeholder.com/150'
        },
        
      ],
      visiblePosts: [],
      loading: false,
      newPostContent: ''
    };
  },
  created() {
    this.loadMorePosts();
  },
  methods: {
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
      // Simulação de carregamento de mais posts 
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
          userName: 'Novo Usuário',
          userImage: 'https://randomuser.me/api/portraits/lego/1.jpg', //random image
          title: 'Nova Postagem',
          content: this.newPostContent,
          comment: '',
          comments: [],
          liked: false,
          likes: 0,
          shares: 0,
          image: null 
        };
        this.posts.unshift(newPost); 
        this.newPostContent = ''; 
      }
    }
  }
};
</script>

<style scoped>

h1 {
  margin-top: 12%;
}
.feed-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.post {
  margin-bottom: 20px;
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 10px;
}

.post img {
  max-width: 100%;
  margin-top: 10px;
}

.navbar {
  background-color: #6A11CB;
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
  font-size: 20px;
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
}

.comment-input {
  flex: 1;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 20px;
  outline: none;
  font-size: 16px;
  resize: none;
  transition: height 0.3s ease;
}

.comment-input:focus {
  border-color: #6A11CB;
}

.comment-button {
  margin-left: 10px;
  padding: 12px 20px;
  border: none;
  border-radius: 20px;
  background-color: #6A11CB;
  color: #fff;
  cursor: pointer;
  outline: none;
  transition: background-color 0.3s ease;
}

.comment-button:hover {
  background-color: #51279B;
}

.post-actions {
  margin-top: 10px;
}

.action-button {
  margin-right: 10px;
  padding: 8px 16px;
  border: none;
  border-radius: 20px;
  background-color: #6A11CB;
  color: #fff;
  cursor: pointer;
  outline: none;
  transition: background-color 0.3s ease;
}

.action-button:hover {
  background-color: #51279B;
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
</style>
