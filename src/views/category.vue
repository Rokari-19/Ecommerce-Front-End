<template>
    <div class="page-category">
        <div class="columns is-multiline">
            <div class="column is-12">
                <h2 class="is-size-2 has-text-centered has-text-dark">{{ category.name }}</h2>
            </div>
            <div class="column is-12"><p class="is-size-4 has-text-centered has-text-dark">{{ category.description }}</p></div> 

            <ProductBox v-for="product in category.products" v-bind:key="product.id" v-bind:product="product"/>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { toast } from 'bulma-toast'
import ProductBox from '@/components/ProductBox'
export default {
    name: 'Category',
    data() {
        return {
            category: {
                products: []
            }
        }
    },
    components: {
        ProductBox
    },
    mounted() {
        this.getCategory()
    },
    watch: {
        $route(to, from) {
            if (to.name === 'category') {
                this.getCategory()
            }
        }
    },
    methods: {
        async getCategory() {
            const categorySlug = this.$route.params.category_slug
            this.$store.commit('setIsLoading', true)


            await axios.get(`/api/v1/products/${categorySlug}/`)
                .then(response => {
                    this.category = response.data

                    document.title = this.category.name + ' | beats.com'
                })
                .catch(error => {
                    console.log(error)  //for handling and serving errors if any

                    toast({
                        message: 'Something went wrong. Please reload page',
                        type: 'is-danger',
                        dismissible: true,
                        pauseOnHover: true,
                        duration: 2000,
                        position: 'top-center',
                    })
                })
            this.$store.commit('setIsLoading', false)
        }
    }

}
</script>


<!-- stopped video at 1:24:27 -->