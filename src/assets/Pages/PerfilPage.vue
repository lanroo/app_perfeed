<template>
  <div class="profile-page">
    <!-- Capa do perfil -->
    <div class="cover-photo">
      <img src="https://example.com/capa.jpg" alt="Capa do Perfil" class="cover-image">
      <button class="edit-cover-button">Editar foto da capa</button>
    </div>

    <!-- Foto e informações do perfil -->
    <div class="profile-info">
      <img src="https://randomuser.me/api/portraits/women/4.jpg" alt="Foto de Perfil" class="profile-image">
      <div class="profile-details">
        <h1 class="profile-name">Lanna Roosevelt</h1>
        <p class="profile-friends">4,8 mil amigos</p>
        <div class="profile-actions">
          <button class="add-story-button">+ Adicionar ao story</button>
          <button class="edit-profile-button">Editar perfil</button>
        </div>
      </div>
    </div>

    <!-- Navegação do perfil -->
    <div class="profile-nav">
      <ul>
        <li><a href="#posts" @click.prevent="navigateTo('posts')">Publicações</a></li>
        <li><a href="#about" @click.prevent="navigateTo('about')">Sobre</a></li>
        <li><a href="#friends" @click.prevent="navigateTo('friends')">Amigos</a></li>
        <li><a href="#photos" @click.prevent="navigateTo('photos')">Fotos</a></li>
        <li><a href="#videos" @click.prevent="navigateTo('videos')">Vídeos</a></li>
      </ul>
    </div>

    <!-- Conteúdo do perfil -->
    <div class="profile-content">
      <section id="posts">
        <h2>Publicações</h2>
      </section>

      <section id="about">
        <h2>Sobre</h2>
      </section>

      <section id="friends">
        <h2>Amigos</h2>
      </section>

      <section id="photos">
        <h2>Fotos</h2>
      </section>

      <section id="videos">
        <h2>Vídeos</h2>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PerfilPage',
  methods: {
    navigateTo(sectionId) {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }
};
</script>

<style scoped>
.profile-page {
  max-width: 900px;
  margin: 0 auto;
  color: white;
}

.cover-photo {
  position: relative;
}

.cover-image {
  width: 100%;
  height: 300px;
  object-fit: cover;
}

.edit-cover-button {
  position: absolute;
  bottom: 10px;
  right: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}

.profile-info {
  position: relative;
  text-align: center;
  margin-top: -70px;
  margin-bottom: 20px;
}

.profile-image {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 5px solid white;
  object-fit: cover;
}

.profile-details {
  margin-top: 10px;
}

.profile-name {
  font-size: 24px;
  font-weight: bold;
}

.profile-friends {
  font-size: 16px;
  color: #aaa;
}

.profile-actions {
  margin-top: 10px;
}

.profile-actions button {
  background-color: #4267B2;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px;
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
  font-weight: bold;
}

.profile-nav a:hover {
  color: #365899;
}

.profile-content {
  padding: 20px;
  background-color: #18191A;
  border-radius: 8px;
  color: #E4E6EB;
}

.profile-content section {
  margin-bottom: 40px;
}

.profile-content h2 {
  font-size: 20px;
  margin-bottom: 15px;
  color: #E4E6EB;
}
</style>
