<template>
    <div class="page-myaccount">
        <div class="columns is-multiline">
            <div class="column is-12">
                <h1 class="title has-text-dark">
                    My Account
                </h1>
            </div>

            <div class="column is-12">
                <button @click="logOut()" class="button is-danger">Log Out</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Account',
    methods: {
        logOut() {
            axios.defaults.headers.common["Authorization"] = ""
            console.log(JSON.stringify(localStorage))
            localStorage.removeItem["cart"]
            localStorage.removeItem["token"]
            localStorage.removeItem["username"]
            localStorage.removeItem["userid"]
            

            this.$store.commit('removeToken')

            this.$router.push('/')
        }
    },
    data() {
        return {

        }
    },
    mounted() {
        document.title = 'Account | beats.com'
    }
}
</script>