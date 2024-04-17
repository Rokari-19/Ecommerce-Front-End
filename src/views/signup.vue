<template>
    <div class="page-signup">
        <div class="columns">
            <div class="column is-4 is-offset-4">
                <h1 class="title has-text-dark">Sign Up for an Account</h1>
                <form class="" @submit.prevent="submitForm">
                    <div class="field">
                        <label class="has-text-dark" >Username</label>
                        <div class="control">
                            <input type="text" class="input has-background-dark" v-model="username">
                        </div>
                    </div>
                    <div class="field">
                        <label class="has-text-dark" >Email</label>
                        <div class="control">
                            <input type="text" class="input has-background-dark" v-model="email">
                        </div>
                    </div>
                    <div class="field">
                        <label class="has-text-dark" >Password</label>
                        <div class="control">
                            <input type="password" class="input has-background-dark" v-model="password">
                        </div>
                    </div>
                    <div class="field">
                        <label class="has-text-dark" >Repeat Password</label>
                        <div class="control">
                            <input type="password" class="input has-background-dark" v-model="password2">
                        </div>
                    </div>
                    <div class="field">
                        <div class="control has-text-centered">
                            <button class="button is-success">Sign Up</button>
                        </div>
                    </div>

                    <hr>
                    <div class="has-text-dark">
                        Or <router-link to="/login">Click here</router-link> to log in!
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
import { toast } from 'bulma-toast'
export default {
    name: 'Signup',
    data () {
        return{
            username: '',
            email: '',
            password: '',
            password2: '',
            errors: []
        }
    },
    methods: {
        submitForm() {
            this.errors = []
            if (this.username === '') {
                this.errors.push('You need a Username to create an account')
            }

            if (this.password === '') {
                this.errors.push('Password is too short')
            }

            if (this.password !== this.password2) {
                this.errors.push('passwords don\'t match')
            }

            if (!this.errors.length) {
                const formData = {
                    username: this.username,
                    email: this.email,
                    password: this.password,
                }

                axios
                    .post("/api/v1/users/", formData)
                    .then(response => {
                        toast({
                            message: 'Account created successfuly',
                            type: 'is-success',
                            dismissible: true,
                            pauseOnHover: true,
                            duration: 2000,
                            position:'top-center',
                        })

                        this.$router.push('/login')
                    })
                    .catch(error => {
                        if (error.response) {
                            for (const property in error.response.data) {
                                this.errors.push(`${property}:${error.response.data[property]}`)
                            }

                            console.log(JSON.stringify(error.response.data))
                        } else if (error.message) {
                            this.errors.push('something went wrong. please reload page')

                            console.log(JSON.stringify(error))
                        }
                    })
            }
        }
    },
    mounted() {
        document.title = 'Sign Up | beats.com'
    }
}
</script>