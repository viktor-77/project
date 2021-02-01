<template>
    <div class="header-wraper">
        <div class="header">            
            <div class="logo">
                <router-link to="/">
                    <i class="fad fa-atom-alt logo__icon"/>
                    <div class="logo__title">Techno Store</div>
                </router-link>
            </div>
            <nav class="menu">             
                <b-select v-model="currency" v-if="this.$route.path==='/'">
                    <option value="UAH">UAH</option>
                    <option value="USD">USD</option>
                </b-select>
                <div class="cart" @click="onCart" v-if="this.$route.path==='/'">
                    <i class="fal fa-shopping-cart cart__icon"></i>
                    <span v-if="cart.length" class="product-count">
                        {{cart.length}}
                    </span>
                </div>          
                <div class="login-signup" v-if="authData===null">
                    <router-link to="/login">
                        LogIn
                    </router-link>
                    <span class="login-signup__slash">/</span>
                    <router-link to="/signup">
                        signup
                    </router-link>
                </div>
                <div class="user" v-if="authData!==null" >
                    <div class="user__page">
                        <router-link to="/user-page">
                            <i class="fas fa-user user__icon"/>
                        </router-link>
                    </div>
                    <div class="user__logout" @click="logout()">
                        <!-- <i class="fas fa-sign-out-alt user__icon"/> -->
                        вихід
                    </div>
                </div>
            </nav>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from "vuex";

    export default {
        name: "HeaderShop",

        data() {
            return {
                currency: "UAH",
            }
        },

        watch: {
            currency(val) {
                this.changeCurrency(val)
            }
        },

        computed: {
            ...mapGetters(['cart','authData'])
        },

        methods: {
            ...mapActions(['changeCurrency','showCart','clearAuthData']),

            logout() {
                this.clearAuthData();
                if(this.$router.path !== '/') this.$router.push({path: "/"})
            },

            onCart() {
                this.showCart()
            }
        },
    }
</script>

<style lang="scss">
    select,option {
        font-size: 16px !important;
        font-weight: 500 !important;
    }
</style>
<style lang="scss" scoped>
    %button-animation {
        opacity: .6;
        transition-duration: 0.5s;
        // transform: scale(1.1);
        cursor: pointer;
    }

    .header-wraper {
        background-color: #333;
        width: 100%;
        position: sticky;
        top: -6px;
        z-index: 888;
    }

    .header {
        max-width: 85%;
        margin: 0 auto;
        height: 70px;
        color: white;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .logo {
        a:active, 
        a:hover, 
        a {
            display: flex;
            align-items: center;
        }
        .logo__icon { 
            font-size: 42px;
        }
        .logo__title {
            margin-left: 15px;
            font-size: 36px;
            font-weight: 600;
        }
        &:hover {
            @extend %button-animation
        }
    }

    .menu {
        display: flex;
        align-items: center;
        font-size: 22px;
        column-gap: 30px;
    }

    .cart {
        display: flex;
        align-items: center;
        justify-content: center;
        &:hover {
            @extend %button-animation
        }
        .cart__icon {
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
        font-size: 18px;
        border: 1px solid white;
        border-radius: 10px;
        padding: 3px 10px;
        a:hover{
            @extend %button-animation
        }     
        .login-signup__slash {
            margin: 0 6px;
        }
    }

    .user {
        display: flex;
        column-gap: 30px;
        .user__icon {
            font-size: 28px;
        }
        &__page:hover,
        &__logout:hover {
            @extend %button-animation
        }
        &__logout {
            color: #ddd;
            border: 1px solid #7957D5;
            border-radius: 10px;
            padding: 0 8px;
        }

    }
</style>