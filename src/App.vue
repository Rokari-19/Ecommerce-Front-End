<template>
  <div id="wrapper">
    <nav class="navbar is-fixed-top is-dark">
      <div class="navbar-brand">
        <router-link to="/" class="navbar-item"><strong>Beats</strong></router-link>

        <a class="navbar-burger" role="button" aria-label="menu" @click="showMobileMenu = !showMobileMenu"
          aria-expanded="false">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>

      </div>
      <div class="navbar-menu" id="navbar-menu" v-bind:class="{ 'is-active': showMobileMenu }">
        <div class="navbar-start">
          <div class="navbar-item">
            <form method="get" action="/search">
              <div class="field has-addons">
                <div class="control">
                  <input type="text" class="input has-background-dark" placeholder="search beats.com" name="query">
                </div>
                <div class="control">
                  <button class="button is-success">
                    <span class="icon">
                      <i class="fas fa-search"></i>
                    </span>
                  </button>
                </div>
              </div>

            </form>
          </div>
        </div>

        <div class="navbar-end">
          <router-link to="/over-ear" class="navbar-item">Over Ear</router-link>
          <router-link to="/earbuds" class="navbar-item">Earbuds</router-link>
          <router-link to="/on-ear" class="navbar-item">On Ear</router-link>

          <div class="navbar-item">
            <div class="buttons">

              <template v-if="$store.state.isAuthenticated">
                <router-link to="/account" class="button has-background-success has-text-black">Account</router-link>
              </template>

              <template v-else>
                <router-link to="/login" class="button has-background-success has-text-black">Log In</router-link>
              </template>

              <router-link to="/cart" class="button is-success">
                <span class="icon mx-auto"><i class="fas fa-shopping-cart"></i></span>
                My Cart ({{ cartTotalLength }})
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- <div class="is-loading-bar has-text-centered" v-bind:class="{ 'is-loading':$store.state.isLoading }">
      <div class="lds-dual-ring"></div>
    </div>  -->

    <section class="section mt-6">
      <router-view />
    </section>

    <footer class="footer has-background-dark is fixed-bottom">
      <!-- <div class="pt-5" style="border-top: 1px solid #dee2e6;"></div> -->
      <div class="container pb-3 has-text-centered">
        <a class="mx-auto has-text-base mb-4 is-inline-block" href="/">
          <!-- <img class="image" src="bulma-plain-assets/logos/plainb-logo.svg" alt="" width="96px"> -->
          beats.com
        </a>
        <ul class="mb-2 is-flex is-flex-wrap-wrap is-justify-content-center is-align-items-center">
          <li><a class="button is-dark mx-6" href="/about">About</a></li>
          <li><a class="button is-dark mx-6" href="#">Company</a></li>
          <li><a class="button is-dark mx-6" href="/stores">Stores</a></li>
          <li><a class="button is-dark mx-6" href="#">Reviews</a></li>
        </ul>
      </div>
      <div class="pt-5" style="border-top: 1px solid #dee2e6;"></div>
      <div class="container">
        <p class="has-text-centered">All rights reserved © RokariBuilds 2024</p>
      </div>
    </footer>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      showMobileMenu: false,
      cart: {
        items: []
      }
    }
  },
  // initializing the store for the user, calling the initializeStore function in ../store/index.js
  beforeCreate() {
    this.$store.commit('initializeStore')

    const token = this.$store.state.token

    if (token) {
      axios.defaults.headers.common['Authorization'] = "Token " + token
    } else {
      axios.defaults.headers.common['Authorization'] = ""
    }
  },
  mounted() {
    this.cart = this.$store.state.cart
  },
  computed: {
    cartTotalLength() {
          let totalLength = 0

          for (let i = 0; i < this.cart.items.length; i++) {
              totalLength += this.cart.items[i].quantity
          }

          return totalLength
      }
  }
}
</script>

<style lang="scss">
@import '../node_modules/bulma';

body {
  background-color:aliceblue;
}

.lds-dual-ring {
  display: inline-block;
  width: 80px;
  height: 80px;
}

.lds-dual-ring::after {
  content: " ";
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid #ccc;
  border-color: #ccc transparent #ccc transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}

@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.is-loaing-bar {
  height: 0;
  overflow: hidden;

  -webkit-transition: all 0.3s;
  transition: all 0.3s;

  &.is-loading {
    height: 80px;
  }
}
</style>



<!-- stopped video at 1:06:43 -->