<template>
    <div class="container-wraper">
        <div class="container">
            <div class="logo">
                <router-link :to="{ name: 'ProductsList'}">
                    <i class="fad fa-atom-alt"/>
                    <div class="logo-title">Techno Store</div>
                </router-link>  
            </div>
            <div class="menu">             
                <b-select v-model="currency" class="select">
                    <option value="UAH">UAH</option>
                    <option value="USD">USD</option>
                </b-select>
                <div class="cart">
                    <router-link :to="{ name: 'Cart'}">
                        <span>Корзина</span>
                        <i class="fal fa-shopping-cart"></i>
                    </router-link>
                </div>          
                <div class="login">
                    LogIn
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapActions } from "vuex";

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

        methods: {
            ...mapActions(['changeCurrency']),
        },
    }
</script>

<style lang="scss" scoped>
.container-wraper {
     background-color: #333;
}

.container {
    max-width: 90%;
    margin: 0 auto;
    height: 80px;
    color: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px;
}

.logo {
    a:active, 
    a:hover, 
    a {
        text-decoration: none;
        color: white;
        display: flex;
        align-items: center;
    }
    i { 
        font-size: 40px;
    }
    .logo-title {
        margin-left: 15px;
        font-size: 36px;
        font-weight: 600;
    }
    &:hover {
        opacity: .8;
        transition-delay: 0.1s
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

.select,option {
    font-size: 16px;
    font-weight: 500; 
}

.cart {
    a:active, 
    a:hover, 
    a {
    text-decoration: none;
    color: white;
}
    &:hover {
        opacity: .8;
        transition-delay: 0.1s;
    }
    i {
        margin-left: 4px;
    }
}

.login {
    font-size: 18px;
    cursor: pointer;
    border: 2px solid white;
    border-radius: 10px;
    padding: 2px 10px;
    &:hover {
        opacity: .8;
        transition-delay: 0.1s
    }
}
</style>