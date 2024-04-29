<template>
    <div class="page-product">
        <div class="columns is-multiline">
            <div class="column is-4">
                <!-- <div class="card-image has-text-centered"> -->
                <figure class="image is-256x256  mb-6 graaa">
                    <img class="pic" v-bind:src="product.get_image">
                </figure>
                <!-- </div> -->



                <p>{{ product.desription }}</p>
            </div>

            <div class="column is-8 mx-auto">
                <h1 class="title has-text-start has-text-dark mb-4 mt-6">{{ product.name }}</h1>
                <h2 class="subtitle has-text-dark">Product details:</h2>
                <p class="has-text-dark">{{ product.description }}</p>

                <p class="has-text-dark">Price: NGN{{ product.price }}</p>

                <div class="field has-addons mt-6">
                    <div class="control">
                        <input type="number" class="input" min="1" v-model="quantity">
                    </div>

                    <div class="control">
                        <button class="button is-success" @click="addToCart">Add To Cart</button>
                    </div>
                </div> <br>
                <!-- <div class="control has-text-centered">
                    <button class="button is-success">Buy Now</button>
                </div> -->
            </div>

            <div class="column is-12 mx-auto">
                <h2 class="title has-text-centered has-text-dark">Key Features</h2>
            </div>
            <div class="column is-4" v-for="key_feature in product.key_features">
                
                <div class="box has-background-dark">
                    <p class="has-text-base is-size-4 mx-auto has-text-centered" >{{ key_feature.name }}</p>
                </div>
                
            </div>
        </div>
    </div>
</template>
<style>
.graaa {
    max-width: 450px;
    max-height: 400px;
}

.pic {
    border-radius: 14px;
}
</style>

<script>
import axios from 'axios';
import { toast } from 'bulma-toast';
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
        async getProduct() {
            this.$store.commit('setIsLoading', true)

            const category_slug = this.$route.params.category_slug
            const product_slug = this.$route.params.product_slug

            await axios
                .get(`/api/v1/products/${category_slug}/${product_slug}`)
                .then(response => {
                    this.product = response.data
                    

                    document.title = this.product.name + ' | beats.com'
                })
                .catch(error => {
                    console.log(error)
                })

            this.$store.commit('setIsLoading', false)
        },
        addToCart() {
            // console.log('adding')
            if (isNaN(this.quantity) || this.quantity < 1) {
                this.quantity = 1
            } if (!this.product.id) {
                console.warn("Product data not yet fetched. Cannot add to cart.")
                return;
            }


            const item = {
                product: this.product,
                quantity: this.quantity
            }
            // console.log(item.product)
            this.$store.commit('addToCart', item)

            toast({
                message: 'Successfully added to cart',
                type: 'is-success',
                dismissible: true,
                pauseOnHover: true,
                duration: 2000,
                position: 'top-center',
            })
        }
    }
}
</script>




<!-- stopped at 1:08:42 -->