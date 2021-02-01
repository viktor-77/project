<template>
    <b-modal v-model="isCartOpened" :on-cancel="closeCart" >
        <div v-if="cart.length">
            <div class="heading">
                Корзина
            </div>
            <div v-for="item in cart " :key="item.id" class="cart-container">
                <div class="product">
                    <img :src="item.imgSrc" alt="product foto" class="product__img">
                    <div>
                        <span class="product__title">{{item.title}}</span>
                        <br>
                        <span v-if="currency==='UAH'" class="product__price">
                                {{item.price | uahPrice}}
                        </span>
                        <span v-if="currency==='USD'" class="product__price">
                                {{item.price | dolPrice}}
                        </span>
                    </div>
                    <i class="fas fa-trash product__delete-icon" @click="productDelete(item._id)"/>
                    <div class="product-manipulators">
                        <i class="fas fa-minus manipulators__icon" @click="decrementElement(item._id)" :class="{disabled_cursor: item.count<=1}"/>
                        <input class="input" v-model="item.count"  type="number" min="1"/>
                        <i class="fas fa-plus manipulators__icon" @click="incrementElement(item._id)"/>
                        <div class="total-products-price">
                            <span v-if="currency==='UAH'" class="product-price">
                                {{item.count*item.price | uahPrice}}
                            </span>
                            <span v-if="currency==='USD'" class="product-price">
                                {{item.count*item.price | dolPrice}}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="total-price">
                <span v-if="currency==='UAH'">
                    Загальна вартість: {{totalPrice | uahPrice}}
                </span>
                <span v-if="currency==='USD'">
                    Загальна вартість: {{totalPrice | dolPrice}}
                </span>
                <b-button class="ordering" type="is-primary">
                    Оформити замовлення
                </b-button>
            </div>
        </div>
        <div v-else class="empty-cart" >
            Корзина пуста
        </div>
    </b-modal>
</template>

<script>
    import dolPrice from "@/filters/dolPrice";
    import uahPrice from "@/filters/uahPrice";
    import { mapGetters, mapActions } from 'vuex'

    export default {
        name: "Cart", 

        filters: {
            dolPrice,
            uahPrice,
        },

        computed: {
            ...mapGetters(['cart','currency','isCartOpen']),

            isCartOpened: {
                get(){
                  return this.isCartOpen
                },
                set(newName){
                  return newName
                } 
            },

            totalPrice() {
                let price = 0;
                this.cart.forEach(el => {
                    if(el.count < 1)el.count = 1  //chek and fix negative value in cart
                    price += el.count * el.price
                });
                return price
            },      
        },

        methods: {
            ...mapActions(['incrementElementInCart','decrementElementInCart','productDeleteFromCart','showCart']),

            incrementElement(itemId) {
                this.incrementElementInCart(itemId)
            },

            decrementElement(itemId) {
                this.decrementElementInCart(itemId)
            },

            productDelete(itemId) {
                this.productDeleteFromCart(itemId)
            },

            closeCart() {
                this.showCart()
            }
        },
    }
</script>

<style lang="scss"> //special style fot buefy component
    .modal-content {
        margin-top: 80px!important;
        margin-bottom: 20px!important;
        border-radius: 8px;
        padding: 0 30px ;
        background-color: #fff;
        max-width: 60% !important;
    }
</style>
<style lang="scss" scoped>
    %button-animation {
        opacity: .65;
        transition-duration: 0.5s;
        cursor: pointer;
    }

    .heading {
        text-align: center;
        font-size: 28px;
        font-weight: 500;
        border-bottom: 1px solid #bbb;
        padding: 10px;
    }

    .cart-container {
        border-bottom: 1px solid #bbb;
        padding: 20px;
    }

    .product {
        display: flex;
        align-items: flex-start;
        &__img {
            height: 120px;
            margin-right:6px;
        }
        &__title {
            font-weight: 500;
        }
        &__delete-icon {
            font-size: 20px;
            margin-left: auto;
            &:hover {
                @extend %button-animation
            }
        }
        &__price {
            font-size: 20px;
        }
    }

    .product-manipulators {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        margin-top: -40px;
            input {
        width: 50px;
        margin: 0 8px;
        }
        .total-products-price {
            margin-left: 30px;
            font-weight: 500;
            font-size: 20px;
            width: 130px;
        }
        .manipulators__icon {
            color: #7957d5;
            font-size: 28px;
            font-weight: 400;
            &:hover {
                color: #6745c3;
                transition-duration: 0.5s
            }
        }
    }

    .total-price {
        text-align: center;
        font-size: 20px;
        font-weight: 500;
        margin: 20px auto;
        padding: 14px;
        border: 1px solid #c5e2ff;
        background-color: rgba(197,226,255,.14);
        color: #4a4a4a;
        width: 60%;
        border-radius: 4px;
    } 

    .ordering {
        margin-top: 20px;
        font-weight: 500;
    }

    .empty-cart {
        font-size: 30px;
        font-weight: 500;
        text-align: center;
        padding: 30px 0;
    }

    .disabled_cursor {
        color: #444 !important;
        cursor: not-allowed;
    }
</style>
