<template>
    <div class="page-myaccount">
        <div class="columns is-multiline">
            <div class="column is-12">
                <h1 class="title has-text-dark">
                    My Account
                </h1>
            </div>

            <hr>

            <div class="column is-12">
                <h2 class="subtitle has-text-dark has-text-centered">
                    Pending Orders
                </h2>


                
                <OrderSummary
                    v-for="order in orders"
                    v-bind:key="order.id"
                    v-bind:order="order" />
            </div>

            <div class="column is-12">
                <button @click="logOut()" class="button is-danger">Log Out</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

import OrderSummary from '@/components/OrderSummary.vue'

export default {
    name: 'Account',
    components: {
        OrderSummary
    },
    data() {
        return {
            orders: []
        }
    },
    mounted() {
        document.title = 'My account | beats.com'

        this.getMyOrders()
    },
    methods: {
        logout() {
            axios.defaults.headers.common["Authorization"] = ""

            localStorage.removeItem("token")
            localStorage.removeItem("username")
            localStorage.removeItem("userid")

            this.$store.commit('removeToken')

            this.$router.push('/')
        },
        getMyOrders() {
            this.$store.commit('setIsLoading', true)

            axios
                .get('/api/v1/orders/')
                .then(response => {
                    this.orders = response.data
                })
                .catch(error => {
                    console.log(error)
                })

            this.$store.commit('setIsLoading', false)
        }
    }
}
</script>