<template>
  <nav class="navbar is-flex is-justify-content-center backgroundDefault" role="navigation" aria-label="dropdown navigation">
    <div class="navbar-item">
    <a class="navbar-link is-arrowless" href="/">
      Home
    </a>
  </div>
    <div class="navbar-item has-dropdown is-hoverable">
      <a class="navbar-link">
        Eventos
      </a>

    <div class="navbar-dropdown">
      <router-link class="navbar-item" to="/event/create">Novo Evento</router-link>
      <router-link class="navbar-item" to="/event/manage">Gerenciar Eventos</router-link>
      <router-link class="navbar-item" to="/event/accredit">Credenciar Evento</router-link>
      <router-link class="navbar-item" to="/event/sell-ticket">Vender Ingresso</router-link>
    </div>
  </div>

  <div class="navbar-item has-dropdown is-hoverable">
    <a class="navbar-link">
      Alunos
    </a>

    <div class="navbar-dropdown">
      <router-link class="navbar-item" to="/person/create">Novo Aluno</router-link>
      <router-link class="navbar-item" to="/person/manage">Gerenciar Alunos</router-link>
    </div>
  </div>

  <div class="navbar-item has-dropdown is-hoverable">
    <a class="navbar-link">
      Pessoas Externas
    </a>

    <div class="navbar-dropdown">
      <router-link class="navbar-item" to="/external-person/create">Nova Pessoa Externa</router-link>
      <router-link class="navbar-item" to="/external-person/manage">Gerenciar Pessoas Externas</router-link>
    </div>
  </div>
  <div class="navbar-item">
    <a class="navbar-link is-arrowless" href="/logout">
    Bem-vindo
      {{username}}
      <img src="@/assets/logout.png" class="ml-3" alt="logout" width="20" height="20">
    </a>
  </div>
</nav>
</template>

<script>
export default {
    name: 'navbarComponent',

    data() {
        return {
            username: '',
            exp: '',
            currentTime: ''
        }
    },

    created: function() {
        this.username = localStorage.getItem('username')
        this.exp = localStorage.getItem('exp')
        this.currentTime = Date.now() / 1000;
        if (this.currentTime > this.exp) {
            localStorage.clear()
            this.$router.push({ name: 'login' })
        }
    }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}


.backgroundDefault{
  background-color: #f5f5f5 !important;
  color: #fff;
}
</style>