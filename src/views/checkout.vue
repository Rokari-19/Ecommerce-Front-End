<template>
    <div class="page-checkout">
        <div class="columns is-multiline">
            <div class="column is-12">
                <h1 class="title has-text-dark has-text-centered">Checkout</h1>
            </div>

            <div class="column is-12 box has-background-dark">
                <table class="table is-fullwidth has-background-dark">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Total</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="item in cart.items" v-bind:key="item.product.id">
                            <td>{{ item.product.name }}</td>
                            <td>{{ item.quantity }}</td>
                            <td>{{ item.product.price }}</td>
                            <td>NGN{{ getItemTotal(item).toFixed(2) }}</td>
                        </tr>
                    </tbody>

                    <tfoot>
                        <tr>
                            <td colspan="1">Total</td>
                            <td>{{ cartTotalLength }}</td>
                            <td></td>
                            <td>NGN{{ cartTotalPrice.toFixed(2) }}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>

            <div class="column is-12">
                <h2 class="subtitle has-text-dark">Shipping Details</h2>

                <p class="has-text-grey mb-4">* All fields are Required</p>

                <div class="columns is-multiline">
                    <div class="column is-6">
                        <div class="field">
                            <label for="name" class="has-text-dark">First Name*</label>
                            <div class="control">
                                <input type="text" class="input has-background-dark" v-model="first_name">
                            </div>
                        </div>

                        <div class="field">
                            <label for="name" class="has-text-dark">Last Name*</label>
                            <div class="control">
                                <input type="text" class="input has-background-dark" v-model="last_name">
                            </div>
                        </div>

                        <div class="field">
                            <label class="has-text-dark">Email*</label>
                            <div class="control">
                                <input type="text" class="input has-background-dark" v-model="email">
                            </div>
                        </div>

                        <div class="field">
                            <label class="has-text-dark">Phone*</label>
                            <div class="control">
                                <input type="text" class="input has-background-dark" v-model="phone">
                            </div>
                        </div>
                    </div>

                    <div class="column is-6">
                        <div class="field">
                            <label class="has-text-dark">Address*</label>
                            <div class="control">
                                <input type="text" class="input has-background-dark" v-model="address">
                            </div>
                        </div>

                        <div class="field">
                            <label class="has-text-dark">Zipcode*</label>
                            <div class="control">
                                <input type="text" class="input has-background-dark" v-model="zipcode">
                            </div>
                        </div>

                        <div class="field">
                            <label class="has-text-dark">Place*</label>
                            <div class="control">
                                <input type="text" class="input has-background-dark" v-model="place">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="notification is-danger" v-if="errors.length">
                    <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
                </div>

                <hr>

                <div id="card-element" class="mb-5"></div>

                <template v-if="cartTotalLength">
                    <hr>

                    <button class="button is-success" @click="submitForm">Pay With Stripe</button>
                </template>
            </div>
        </div>
    </div>
</template>



<script>
import axios from 'axios'

export default {
    name: 'Checkout',
    data() {
        return {
            cart: {
                items: []
            },
            stripe: {},
            card: {},
            first_name: '',
            last_name: '',
            email: '',
            phone: '',
            address: '',
            zipcode: '',
            place: '',
            errors: []
        }
    },
    mounted() {
        document.title = 'Checkout | Djackets'

        this.cart = this.$store.state.cart

        if (this.cartTotalLength > 0) {
            this.stripe = Stripe('pk_test_51P3nTd2NBH2pEt2KJlWmdZu5gnpeVupmodHRFdmF3MFjhefANXkWIlOrQUBR2SucvZrCoyUwpMeT5Q8uX7uy4Y3f00lkFBQl3w')
            const elements = this.stripe.elements();
            this.card = elements.create('card', { hidePostalCode: true })

            this.card.mount('#card-element')
        }
    },
    methods: {
        getItemTotal(item) {
            return item.quantity * item.product.price
        },
        submitForm() {
            this.errors = []

            if (this.first_name === '') {
                this.errors.push('The first name field is missing!')
            }

            if (this.last_name === '') {
                this.errors.push('The last name field is missing!')
            }

            if (this.email === '') {
                this.errors.push('The email field is missing!')
            }

            if (this.phone === '') {
                this.errors.push('The phone field is missing!')
            }

            if (this.address === '') {
                this.errors.push('The address field is missing!')
            }

            if (this.zipcode === '') {
                this.errors.push('The zip code field is missing!')
            }

            if (this.place === '') {
                this.errors.push('The place field is missing!')
            }

            if (!this.errors.length) {
                this.$store.commit('setIsLoading', true)

                this.stripe.createToken(this.card).then(result => {                    
                    if (result.error) {
                        this.$store.commit('setIsLoading', false)

                        this.errors.push('Something went wrong with Stripe. Please try again')

                        console.log(result.error.message)
                    } else {
                        this.stripeTokenHandler(result.token)
                    }
                })
            }
        },
        stripeTokenHandler(token) {
            const items = []

            for (let i = 0; i < this.cart.items.length; i++) {
                const item = this.cart.items[i]
                const obj = {
                    product: item.product.id,
                    quantity: item.quantity,
                    price: item.product.price * item.quantity
                }

                items.push(obj)
            }

            const data = {
                'first_name': this.first_name,
                'last_name': this.last_name,
                'email': this.email,
                'address': this.address,
                'zipcode': this.zipcode,
                'place': this.place,
                'phone': this.phone,
                'items': items,
                'stripe_token': token.id
            }
            console.log(data)
            axios
                .post('/api/v1/order/checkout/', data)
                .then(response => {
                    this.$store.commit('clearCart')
                    this.$router.push('/cart/success')
                    console.log(data)
                })
                .catch(error => {
                    this.errors.push(`Something went wrong. Please try again ${error}`)

                    // console.log(error)
                    console.log(data)
                })

                // this.$store.commit('setIsLoading', false)
        }
    },
    computed: {
        cartTotalPrice() {
            return this.cart.items.reduce((acc, curVal) => {
                return acc += curVal.product.price * curVal.quantity
            }, 0)
        },
        cartTotalLength() {
            return this.cart.items.reduce((acc, curVal) => {
                return acc += curVal.quantity
            }, 0)
        }
    }
}
</script>