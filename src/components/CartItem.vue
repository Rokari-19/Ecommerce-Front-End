<template>
    <tr>
        <td class="mx-auto" >
            <router-link :to="item.product.get_absolute_url">{{ item.product.name }}</router-link>
        </td>
        <td class="mx-auto" >
            {{ item.quantity }}
            <a @click="decrementQuantity(item)">- </a>
            <a @click="incrementQuantity(item)">+</a>
        </td>
        <td class="mx-auto" >
            ${{ item.product.price }}
        </td>
        <td class="mx-auto" >
            ${{ getItemTotal(item).toFixed(2) }}
        </td>
        <td class="mx-auto" ><button class="delete" @click="removeFromCart(item)" ></button></td>
        <!-- stopped video at 1:32:06 -->
    </tr>
</template>

<script>
export default {
    name: 'CartItem',
    props: {
        initialItem: Object

    },
    data() {
        return {
            item: this.initialItem
        }
    },
    methods: {
        getItemTotal(item) {
            return item.quantity * item.product.price
        },
        incrementQuantity(item) {
            item.quantity += 1
            this.updateCart()
        },
        decrementQuantity(item) {
            item.quantity -= 1

            if (item.quantity === 0){
                this.$emit('removeFromCart', item)
            }
            this.updateCart()
        },

        updateCart() {
            localStorage.setItem('cart', JSON.stringify(this.$store.state.cart))
        },

        removeFromCart(item) {
            this.$emit('removeFromCart', item)

            this.updateCart()
        }
    }
}
</script>