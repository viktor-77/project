<template>
    <div class="login-wrapper">
        <form @submit.prevent="submit" class="form">
            <h1 class="form__heading">login</h1>
            <b-field label="Email" custom-class="is-medium" 
              :type="{ 'is-danger': emailError }"
              :message="{ 'Неправильний формат вводу, Email повинен містити символ «‎@»': emailError }">
                <b-input type="email" v-model="email" class="form__input" name="email"/>
            </b-field>
            <b-field label="Password" custom-class="is-medium"
              :type="{ 'is-danger': passwordError }"
              :message="{ 'Пароль повинен містити мінімун 8 символів': passwordError }">
                <b-input type="password" v-model="password" class="form__input" name="password" maxlength="25" password-reveal/>
            </b-field>
            <b-field class="form__remember-input">
                <b-checkbox :value="!true">
                    Запам'ятати
                </b-checkbox>
            </b-field>
            <div v-if="message" class="form__error-message">
                {{message}}
            </div>
            <b-button native-type="submit" class="is-primary form__submit-button" :disabled="isInputDisabled">
                Login
            </b-button>
        </form>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';

    export default {
        name: 'LogIn',

        data() {
            return {
                email: '',
                password: '',
                message: '',

                emailError: false,
                passwordError: false,
            }
        },

        watch: {
            email() {
                clearTimeout(this.emailErrorTimer)
                if( this.email.length && (!this.email.includes('@')) ) {
                    this.emailErrorTimer = setTimeout(() => {
                        this.emailError = true
                    }, 1500)
                }
                else this.emailError = false
            },

            password() {
                clearTimeout(this.passwordErrorTimer)
                if( this.password.length && (this.password.length < 8) ) {
                    this.passwordErrorTimer = setTimeout(() => {
                        this.passwordError = true
                    }, 1500)
                }
                else this.passwordError = false
            },
        },

        computed: {
            isInputDisabled() {
                if( 
                    this.email.length && this.email.includes('@') &&
                    (this.password.length >= 8)
                ) return false
                return true
            }
        },

        methods: {
            ...mapActions(['login']),
             
            async submit() {
                this.message = ''
                try{
                    const user = {
                        email: this.email,
                        password: this.password
                    }
                    await this.login(user)
                    this.$router.push({path: "/"});
                } catch (err) {
                    let errMsg = err
                    if(errMsg === 'emailError') {
                        document.querySelectorAll("input")[0].focus()
                        this.message = 'Невірно введено пошту'
                    }
                    if(errMsg === 'passwordError') {
                        document.querySelectorAll("input")[1].focus()
                        this.message = 'Невірно введено пароль'
                    }
                }
            }
        },
    }
</script>

<style lang="scss"> //special style fot buefy components
    .is-danger {
        margin-bottom: 14px;
    }
    .label {
        color: #4a4a4a !important;
        font-size: 18px !important;
    }
</style>
<style lang="scss" scoped>
    .login-wrapper {
        background: url('https://images.wallpaperscraft.ru/image/chernyy_siniy_abstrakciya_polosy_513_1920x1080.jpg')
            center no-repeat;
        background-size: cover;
        height: calc(100vh - 130px);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .form {
        text-align: center;
        width: 40%;
        background-color: whitesmoke;
        margin: 10px;
        padding: 30px;
        border-radius: 6px;
        max-width: 360px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .form__heading {
        font-size: 28px;
        font-weight: 500;
        width: 100%;
        &:after {
            content: '';
            display: block;
            border-bottom: 1px solid #bbb;
            margin-top: 10px;
            margin-bottom: 20px;
        }
    }

    .form__input {
        width: 300px;
    }

    .form__remember-input {
        margin-right: auto;
        margin-top: -20px;
        margin-bottom: 30px !important;
    }

    .form__error-message {
        margin-top: -10px;
        margin-bottom: 20px;
        color: red;
        font-weight: 500;
    }

    .form__submit-button {
        margin-top: -10px;
    }
</style>