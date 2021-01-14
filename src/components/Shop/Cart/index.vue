<template>
    <div class="container">
        <div class="cart">
            <div class="cart-amount">Кількість елементів у корзині: {{cart.length}}</div>
            <ul  v-for="item in cart " :key="item.id">
                <li>
                    {{item.title}} - {{item.price}} кількість у корзині: {{item.count}} |
                    вартість: {{item.price*item.count}}
                    <button @click="incrementElement(item.id)">+</button> 
                    <button @click="decrementElement(item.id)">-</button>
                </li>
            </ul>
            <div>
                Загальна вартість: {{endPrice}}
            </div>
            <button @click="clearCart">Очистити корзину</button>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'

    export default {
        name: "Cart", 
        
        computed: {
            ...mapGetters(['cart']),

            endPrice() {
                let price = 0;
                this.cart.forEach(el => {
                    price += el.count * el.price
                });
                return price
            }
        },

        methods: {
            ...mapActions(['clearCart','incrementElementInCart','decrementElementInCart']),

            incrementElement(itemId) {
                this.incrementElementInCart(itemId)
            },

            decrementElement(itemId) {
                this.decrementElementInCart(itemId)
            },
        },

    }
</script>

<style lang="scss" scoped>
    .container {
        padding: 30px 0;
    }
</style>