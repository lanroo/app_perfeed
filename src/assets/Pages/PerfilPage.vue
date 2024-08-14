<template>
  <div class="profile-page">
    <!-- Capa do perfil -->
    <div class="cover-photo">
      <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiQxsdbrkQqRfP5zI_1Kt6Fx809rAXXxsyhBYcf0iK5fF7h_9m0NSnMGT9zZotBb_9jEzf70HRlHnL2P3Y3JqPPVoP0cPJPHG3IlqC6xwJb1b-uTDhzG23BY8mmrsHTIJwemc4TD9r8NG45/s1600/Capa+para+Facebook+-fb-capas.blogspot+-+estilo+intagram+-+dente+de+leao.jpg" alt="Capa do Perfil" class="cover-image">
      <button class="edit-cover-button">Editar foto da capa</button>
    </div>

    <!-- Foto e informações do perfil -->
    <div class="profile-info">
      <img src="https://randomuser.me/api/portraits/lego/6.jpg" alt="Foto de Perfil" class="profile-image">
      <div class="profile-details">
        <h1 class="profile-name">Julia Silva</h1>
        <p class="profile-friends">49 amigos</p>
        <div class="profile-actions">
          <button class="add-story-button">+ Adicionar ao story</button>
          <button class="edit-profile-button">Editar perfil</button>
        </div>
      </div>
    </div>

    <!-- Navegação do perfil -->
    <div class="profile-nav">
      <ul>
        <li><a href="#posts" @click.prevent="setActiveSection('posts')">Publicações</a></li>
        <li><a href="#about" @click.prevent="setActiveSection('about')">Sobre</a></li>
        <li><a href="#friends" @click.prevent="setActiveSection('friends')">Amigos</a></li>
        <li><a href="#photos" @click.prevent="setActiveSection('photos')">Fotos</a></li>
        <li><a href="#videos" @click.prevent="setActiveSection('videos')">Vídeos</a></li>
      </ul>
    </div>

    <!-- Conteúdo do perfil -->
    <div class="profile-content">
      <section v-if="activeSection === 'posts'" id="posts">
        <h2>Publicações</h2>
        <div v-for="post in posts" :key="post.id" class="post-card">
          <div class="post-header">
            <img :src="post.userImage" alt="User Image" class="post-user-image">
            <div>
              <h3 class="post-user-name">{{ post.userName }}</h3>
              <p class="post-timestamp">{{ post.timestamp }}</p>
            </div>
          </div>
          <p class="post-content">{{ post.content }}</p>
          <img v-if="post.image" :src="post.image" alt="Post Image" class="post-image">
          <div class="post-actions">
            <button @click="toggleLike(post)" class="action-button"><i :class="['fas', post.liked ? 'fa-heart' : 'far fa-heart']"></i> {{ post.likes }}</button>
            <button @click="sharePost(post)" class="action-button"><i class="fas fa-share"></i> Compartilhar</button>
            <span class="shares-count">{{ post.shares }} Compartilhamentos</span>
          </div>
        </div>
      </section>

      <section v-if="activeSection === 'photos'" id="photos">
        <h2>Fotos</h2>
        <div class="photo-grid">
          <img v-for="photo in photos" :key="photo" :src="photo" class="photo">
        </div>
      </section>

      <section v-if="activeSection === 'friends'" id="friends">
        <h2>Amigos</h2>
        <div class="friend-list">
          <img v-for="friend in friends.slice(0, 20)" :key="friend.id" :src="friend.image" alt="Amigo" class="friend-icon">
        </div>
        <a href="#" @click.prevent="viewAllFriends">Ver todos</a>
      </section>

      <section v-if="activeSection === 'about'" id="about">
        <h2>Sobre</h2>
        <p>{{ bio }}</p>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PerfilPage',
  data() {
    return {
      activeSection: 'posts',
      posts: this.generateRandomPosts(),
      photos: this.generateRandomPhotos(),
      friends: this.generateRandomFriends(),
      bio: "Desenvolvedora de software com paixão por tecnologia. Adoro explorar novas linguagens de programação e criar soluções inovadoras."
    };
  },
  methods: {
    setActiveSection(section) {
      this.activeSection = section;
    },
    generateRandomPosts() {
      return [
        {
          id: 1,
          userName: 'Julia Silva',
          userImage: 'https://randomuser.me/api/portraits/lego/6.jpg',
          content: 'Javascript que me deu!',
          timestamp: '22 de agosto às 6:05',
          image: 'https://www.cnnbrasil.com.br/wp-content/uploads/sites/12/2024/01/Fiat-Strada-2024-Ultra-foto-Thiago-Ventura.jpg?w=1200&h=675&crop=1',
          liked: true,
          likes: 15,
          shares: 3
        },
        {
          id: 2,
          userName: 'Julia Silva',
          userImage: 'https://randomuser.me/api/portraits/lego/6.jpg',
          content: 'Finalmente terminei aquele livro que estava lendo há meses. Altamente recomendável!',
          timestamp: '10 de abril às 19:11',
          image: null,
          liked: false,
          likes: 8,
          shares: 1
        }
      ];
    },
    generateRandomPhotos() {
      return Array.from({ length: 10 }, (_, index) => `https://picsum.photos/200/200?random=${index + 1}`);
    },
    generateRandomFriends() {
      return Array.from({ length: 50 }, (_, index) => ({
        id: index,
        image: `https://randomuser.me/api/portraits/thumb/men/${index + 1}.jpg`
      }));
    },
    toggleLike(post) {
      post.liked = !post.liked;
      post.likes += post.liked ? 1 : -1;
    },
    sharePost(post) {
      post.shares++;
    },
    viewAllFriends() {
      alert('Exibindo todos os amigos...');
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap');

.profile-page {
  max-width: 900px;
  margin: 0 auto;
  color: white;
  padding-top: 20px;
  font-family: 'Poppins', sans-serif;
}

.cover-photo {
  position: relative;
  width: 100%;
  height: 300px;
  background-color: #333;
}

.cover-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.profile-info {
  position: relative;
  text-align: center;
  margin-top: -75px;
  margin-bottom: 20px;
  z-index: 1;
}

.profile-image {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 5px solid white;
  object-fit: cover;
  background-color: white;
  position: relative;
}

.profile-details {
  margin-top: 10px;
}

.profile-name {
  font-size: 28px;
  font-weight: 600;
  color: #333;
}

.profile-friends {
  font-size: 16px;
  color: #aaa;
  margin-top: 5px;
}

.profile-actions {
  margin-top: 10px;
}

.profile-actions button {
  background-color: #4267B2;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 500;
  margin-right: 10px;
  transition: background-color 0.3s ease;
}

.profile-actions button:hover {
  background-color: #365899;
}

.profile-nav {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}

.profile-nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  gap: 20px;
}

.profile-nav li {
  display: inline;
}

.profile-nav a {
  text-decoration: none;
  color: #4267B2;
  font-weight: 600;
  font-size: 16px;
}

.profile-nav a:hover {
  color: #365899;
}

.profile-content {
  padding: 20px;
  background-color: #140841e0;
  border-radius: 8px;
  color: #E4E6EB;
}

.profile-content section {
  margin-bottom: 40px;
}

.profile-content h2 {
  font-size: 22px;
  margin-bottom: 15px;
  color: #E4E6EB;
  font-weight: 600;
}

/* Estilos para os posts */
.post-card {
  background-color: white;
  color: #333;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 20px;
  font-family: 'Poppins', sans-serif;
}

.post-header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.post-user-image {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.post-user-name {
  font-weight: 600;
  margin: 0;
  font-size: 18px;
  color: #333;
}

.post-timestamp {
  font-size: 12px;
  color: #888;
  margin: 0;
}

.post-content {
  margin-bottom: 10px;
  font-size: 16px;
}

.post-image {
  width: 100%;
  height: auto;
  border-radius: 5px;
  margin-bottom: 10px;
}

.post-actions {
  display: flex;
  align-items: center;
}

.action-button {
  background-color: #6a1b9a;
  color: white;
  border: none;
  padding: 5px 15px;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px;
  font-weight: 500;
  transition: background-color 0.3s ease;
}

.action-button i {
  margin-right: 5px;
}

.action-button:hover {
  background-color: #541382;
}

.shares-count {
  font-size: 12px;
  color: #888;
}

/* Estilos para fotos e amigos */
.photo-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
}

.photo {
  width: 100%;
  height: 100px;
  object-fit: cover;
  border-radius: 5px;
}

.friend-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.friend-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}


</style>
