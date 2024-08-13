<template>
  <div class="config-page">
    <h1>Configuração do Site</h1>
    <form @submit.prevent="saveSettings">
      <div class="form-group">
        <label for="site-title">Título do Site:</label>
        <input type="text" id="site-title" v-model="settings.siteTitle" placeholder="Digite o título do site">
      </div>
      <div class="form-group">
        <label for="site-theme">Tema do Site:</label>
        <select id="site-theme" v-model="settings.theme">
          <option value="light">Claro</option>
          <option value="dark">Escuro</option>
        </select>
      </div>
      <button type="submit">Salvar Configurações</button>
    </form>
    <p v-if="saved">Configurações salvas com sucesso!</p>
  </div>
</template>

<script>
export default {
  name: 'ConfigPage',
  data() {
    return {
      settings: {
        siteTitle: '',
        theme: 'light'
      },
      saved: false
    };
  },
  methods: {
    saveSettings() {
      // Simular o salvamento das configurações
      console.log('Configurações salvas:', this.settings);
      this.saved = true;
      setTimeout(() => {
        this.saved = false;
      }, 3000);
    }
  }
};
</script>

<style scoped>
.config-page {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}
.form-group {
  margin-bottom: 15px;
}
.form-group label {
  display: block;
  margin-bottom: 5px;
}
.form-group input, .form-group select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
button {
  background-color: #36E4DA;
  border: none;
  color: white;
  padding: 10px 15px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 4px;
}
</style>
