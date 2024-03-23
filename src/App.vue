<template>
  <div id="wrapper">
    <nav class="navbar is-fixed-top is-dark">
      <div class="navbar-brand">
        <router-link to="/" class="navbar-item"><strong>Beats</strong></router-link>

        <a class="navbar-burger" role="button" aria-label="menu" @click="showMobileMenu = !showMobileMenu" aria-expanded="false">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>

      </div>
      <div class="navbar-menu" id="navbar-menu" v-bind:class="{'is-active': showMobileMenu}">
        <div class="navbar-end">
          <router-link to="/over-ear" class="navbar-item">Over Ear</router-link>
          <router-link to="/earbuds" class="navbar-item">Earbuds</router-link>
          <router-link to="/in-ear" class="navbar-item">In Ear</router-link>

          <div class="navbar-item">
            <div class="buttons">
              <router-link to="/login" class="button has-background-success has-text-black">Log In</router-link>
              <router-link to="/cart" class="button is-success">                
                <span class="icon mx-auto"><i class="fas fa-shopping-cart"></i></span>
                My Cart
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <section class="section mt-6">
      <router-view />
    </section>

    <footer class="footer has-background-dark">
      <p class="has-text-centered">
        <a href="https://github.com/rokari-19">Rokari-Builds&#174;, 2024</a>
      </p>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showMobileMenu: false
    }
  }
}
</script>

<style lang="scss">
@import '../node_modules/bulma';
body {
  background-color: rgb(187, 187, 187);
}
</style>
