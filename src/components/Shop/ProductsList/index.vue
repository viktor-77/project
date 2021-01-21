<template>
    <div class="ProductsList">
        <product v-for="(item) in filteredProducts" :key="item._id"
            :imgSrc = "item.imgSrc"
            :price = "item.price"
            :title = "item.title"
            :isElInCart = isElInCart(item._id)
            @to-cart="toCart(item)"
        />
    </div>
</template>

<script>
    import { mapActions , mapGetters} from 'vuex'
    import Product from "./Product";
    
    export default {
        name: "ProductsList",

        components: {
            Product,
        },

        computed: {
            ...mapGetters(['filteredProducts', 'cart'])
        },

        methods: {
            ...mapActions(['addToCart']),

            isElInCart(itemId) {
                let isElInCart =this.cart.find(item => item._id === itemId)
                if(!isElInCart) return 'В корзину'
                return 'Додано'
            },

            toCart(item) {
                this.addToCart(item)
            }
        },

    }
</script>

<style lang="css" scoped>
    .ProductsList {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(3, 30%);
        grid-gap: 30px;
        justify-content: center;
        text-align: center;
        padding: 0 15px 40px;
        margin: 0 auto;
    }
    @media(max-width: 900px) {
        .ProductsList {
        grid-template-columns: repeat(2, 40%);
        grid-gap: 20px;
    }
        
    }
</style>