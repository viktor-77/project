<template>
    <div class="container-wraper">
        <div class="container">            
            <div class="logo">
                <router-link to="/">
                    <i class="fad fa-atom-alt"/>
                    <div class="logo-title">Techno Store</div>
                </router-link>
            </div>
            <div class="menu">             
                <b-select v-model="currency" class="select" v-if="this.$route.path==='/'">
                    <option value="UAH">UAH</option>
                    <option value="USD">USD</option>
                </b-select>
                <div class="cart" @click="onCart" v-if="this.$route.path==='/'">
                    <i class="fal fa-shopping-cart"></i>
                    <span v-if="cart.length" class="product-count">
                        {{cart.length}}
                    </span>
                </div>          
                <div class="login-signup">
                    <router-link to="/login">
                        LogIn
                    </router-link>
                    <span>/</span>
                    <router-link to="/signup">
                        signup
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from "vuex";

    export default {
        name: "HeaderShop",

        data() {
            return {
                language: "UA",
                currency: "UAH",
            }
        },

        watch: {
            currency(val) {
                this.changeCurrency(val)
            }
        },

        computed: {
            ...mapGetters(['cart'])
        },

        methods: {
            ...mapActions(['changeCurrency','showCart']),

            onCart() {
                this.showCart()
            }
        },
    }
</script>

<style lang="scss" scoped>
.container-wraper {
    background-color: #333;
    width: 100%;
    position: sticky;
    top: -6px;
    z-index: 999;
}

.container {
    max-width: 90%;
    margin: 0 auto;
    height: 70px;
    color: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px;
}

.logo {
    transition-duration: 0.5s;
    a:active, 
    a:hover, 
    a {
        text-decoration: none;
        color: white; 
        display: flex;
        align-items: center;
    }
    i { 
        font-size: 42px;
    }
    .logo-title {
        margin-left: 15px;
        font-size: 36px;
        font-weight: 600;
    }
    &:hover {
        opacity: .8;
        transform: scale(1.01);
    }
}

.menu {
    display: flex;
    align-items: center;
    font-size: 22px;
    div {
        margin: 0 20px;
    }
}

option {
    font-size: 16px;
    font-weight: 500 !important; 
}

.cart {
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
        opacity: .8;
        transition-delay: 0.03s;
        transform: scale(1.1);
    }
    i {
        margin: 0 6px;
        font-size: 28px;
    }
}

.product-count {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background-color: #7957D5;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    font-size: 15px;
    font-weight: 500;
}

.login-signup {
    display: flex;
    align-items: center;
    a:active, 
    a:hover, 
    a {
        text-decoration: none;
        color: white; 
    }
    a:hover{
        opacity: .7;
        transition-delay: 0.05s;
        transform: scale(1.01);
    }     
    span {
        margin: 0 6px;
    }
    font-size: 18px;
    border: 1px solid white;
    border-radius: 10px;
    padding: 3px 10px;
}
</style>