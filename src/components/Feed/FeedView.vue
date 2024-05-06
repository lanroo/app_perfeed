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
      <div class="post-list">
        <div v-for="post in posts" :key="post.id" class="post">
          <h2>{{ post.title }}</h2>
          <p>{{ post.content }}</p>
          <img v-if="post.image" :src="post.image" alt="Post Image">
          <div class="comment-box">
            <textarea
              v-model="post.comment"
              placeholder="Adicione um comentário"
              class="comment-input"
              @focus="expandTextarea"
              @input="expandTextarea"
            ></textarea>
            <button @click="addComment(post)" class="comment-button">Comentar</button>
          </div>
          <div v-if="post.comments && post.comments.length > 0">
            <h3>Comentários:</h3>
            <ul>
              <li v-for="comment in post.comments" :key="comment.id">{{ comment.text }}</li>
            </ul>
          </div>
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
          title: 'Primeira Postagem', 
          content: '',
          comment: '', 
          comments: [] 
        },
        { 
          id: 2, 
          title: 'Segunda Postagem', 
          content: 'Conteúdo da segunda postagem.', 
          image: 'https://via.placeholder.com/150',
          comment: '', 
          comments: [] 
        },
        // Adicione mais postagens conforme necessário
      ]
    };
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
    }
  }
};
</script>

<style scoped>
/* Estilo para o componente do feed */

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
  background: #6a11cb6b;
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
</style>
