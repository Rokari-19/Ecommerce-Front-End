import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Product from '../views/product.vue'
import category from '@/views/category.vue'
import Search from '@/views/search.vue'
import Cart from '@/views/cart.vue'
import Stores from '@/views/stores.vue'
import Signup from '@/views/signup.vue'
import Login from '@/views/login.vue'
import Account from '@/views/myaccount.vue'
import store from '@/store'
import Checkout from '@/views/checkout.vue'
import Success from '@/views/success.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/:category_slug/:product_slug',
    name: 'product',
    component: Product
  },
  {
    path: '/:category_slug',
    name: 'category',
    component: category
  },
  {
    path: '/search',
    name: 'search',
    component: Search
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  },
  {
    path: '/stores',
    name: 'Stores',
    component: Stores
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/account',
    name: 'Account',
    component: Account,
    meta: {
      requireLogin: true
    }
  },
  {
    path: '/cart/checkout',
    name: 'Checkout',
    component: Checkout,
    meta: {
      requireLogin: true
    }
  },
  {
    path: '/cart/success',
    name: 'Success',
    component: Success
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireLogin) && !store.state.isAuthenticated) {
    next({
      name: 'Login',
      query: {
        to: to.path
      }
    });
  } else {
    next()
  }
})

export default router
