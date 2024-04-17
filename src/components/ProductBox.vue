<template>
    <div class="column is-3">

        <div class="box has-background-dark op">

            <figure class="image mb-4">
                <img :src="product.get_thumbnail" class="pic">
            </figure>

            <h3 class="is-size-4 has-text-white">{{ product.name }}</h3>

            <p class="is-size-6 has-text-grey-300 ">${{ product.price }}</p>

            <router-link :to="product.get_absolute_url" class="button is-dark has-text-centered mt-4">view
                details</router-link>
        </div>

    </div>
</template>


<script>
export default {
    name: 'ProductBox',
    props: {
        product:Object
    }
}
</script>

<style>
.pic {
    border-radius: 1px;
}

.op {
  opacity: 1;
}
</style>