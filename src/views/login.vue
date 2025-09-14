<template>
    <div class="page-login">
        <div class="columns">
            <div class="column is-4 is-offset-4">
                <h1 class="title has-text-dark">Login</h1>
                <form class="" @submit.prevent="submitForm">
                    <div class="field">
                        <label class="has-text-dark" >Username</label>
                        <div class="control">
                            <input type="text" class="input has-background-dark" v-model="username">
                        </div>
                    </div>
                    <div class="field">
                        <label class="has-text-dark" >Password</label>
                        <div class="control">
                            <input type="password" class="input has-background-dark" v-model="password">
                        </div>
                    </div>
                    
                    <div class="field">
                        <div class="control has-text-centered">
                            <button class="button is-success">Log In</button>
                        </div>
                    </div>

                    <hr>
                    <div class="has-text-dark">
                        Or <router-link to="/signup">Click here</router-link> to create an account!
                    </div>

                    <div class="notification is-danger" v-if="errors.length">
                        <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'Login',
    data() {
        return {
            username: '',
            password: '',
            errors: []
        }
    },
    mounted() {
        document.title = 'Login | beats.com'
    },
    methods: {
        async submitForm() {
            axios.defaults.headers.common['Authorization'] = ""

            localStorage.removeItem("token")

            const formData = {
                username: this.username,
                password: this.password
            }

            await axios
                        .post("/api/v1/auth/token/login", formData)
                        .then(response => {
                            const token = response.data.auth_token

                            this.$store.commit('setToken', token)
                            
                            axios.defaults.headers.common["Authorization"] = "Token " + token

                            localStorage.setItem("token", token)

                            const toPath = this.$route.query.to || '/cart'
                            
                            this.$router.push(toPath)
                        })
                        .catch(error => {
                            if (error.response) {
                                for (const property in error.response.data) {
                                    this.errors.push(`${property}: ${error.response.data[property]}`)
                                }
                            } else {
                                this.errors.push('Something went wrong. please reload page')

                                console.log(JSON.stringify(error))
                            }
                        })
        }
    }
}
</script>


<!-- stopped at 1:47:08 -->