<template>
    <div class="page-cart">
        <div class="columns is-multiline">
            <div class="column is-12">
                <h2 class="title has-text-centered has-text-dark">
                    My Cart
                </h2>
            </div>
            <div class="column is-12 box has-background-dark" >
                <table class="table is-fullwidth has-background-dark" v-if="cartTotalLength">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Total</th>
                            <th></th>
                        </tr>
                    </thead>         
                    
                    <tbody>
                        <CartItem
                            v-for="item in cart.items"
                            v-bind:key="item.product.id"
                            v-bind:initialItem="item"
                            v-on:removeFromCart="removeFromCart"
                        />
                    </tbody>
                </table>

                <p v-else>You don't have items in your cart. <a href="/" class>Add one </a></p>
            </div>
            <div class="column is-12 box has-background-dark">
                <h2 class="subtitle has-text-centered">Summary</h2>

                <strong>${{ cartTotalPrice.toFixed(2) }}</strong>, {{ cartTotalLength }} items

                <hr class="is-dark">
                <router-link to="/cart/checkout" class="button is-success">Proceed to checkout</router-link>
            </div>
        </div>
    </div>
</template>

<script>
import CartItem from '@/components/CartItem.vue'
import axios from 'axios';
export default{
    name: 'Cart',
    components: {
        CartItem
    },
    data() {
        return {
            cart: {
                items: []
            }
        }
    },
    mounted() {
        document.title = 'My Cart | beats.com'
        this.cart = this.$store.state.cart
    },
    methods: {
        removeFromCart(item) {
            this.cart.items = this.cart.items.filter(i => i.product.id !== item.product.id)
        }
    },
    computed: {
        // computes te total length of the cart
        cartTotalLength() {
            return this.cart.items.reduce((acc, curVal) => {
                return acc += curVal.quantity
            }, 0)
        },
        cartTotalPrice() {
            return this.cart.items.reduce((acc, curVal) => {
                return acc += curVal.product.price * curVal.quantity
            }, 0)
        }
    }

}
</script>