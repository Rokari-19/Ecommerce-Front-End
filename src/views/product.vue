<template>
    <div class="page-product">
        <div class="columns is-multiline">
            <div class="column is-6">
                <div class="card-image has-text-centered">
                    <figure class="image is-256x256 is-inline-block mb-6 graaa">
                        <img v-bind:src="product.get_image">
                    </figure>
                </div>

                <h1 class="title has-text-centered has-text-dark mt-6">{{ product.name }}</h1>

                <p>{{ product.desription }}</p>
            </div>

            <div class="column is-6 mx-auto">
                <h2 class="subtitle has-text-dark">Product details:</h2>
                <p class="has-text-dark">{{ product.description }}</p>

                <p class="has-text-dark">Price: ${{ product.price }}</p>

                <div class="field has-addons mt-6">
                    <div class="control">
                        <input type="number" class="input" min="1" v-model="quantity">
                    </div>

                    <div class="control">
                        <button class="button is-success">Add To Cart</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
.graaa {
    max-width: 300px;
    max-height: 200px;
}
</style>

<script>
import axios from 'axios';
export default {
    name: 'Product',
    data() {
        return {
            product: {},
            quantity: 1,
        }
    },
    mounted() {
        this.getProduct()
    },
    methods: {
        getProduct() {
            const category_slug = this.$route.params.category_slug
            const product_slug = this.$route.params.product_slug

            axios.get(`/api/v1/products/${category_slug}/${product_slug}`).then(response => {
                this.product = response.data
            }).catch(error => {
                console.log(error)
            })
        }
    }
}
</script>