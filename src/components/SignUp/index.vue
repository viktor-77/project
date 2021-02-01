<template>
    <div class="signup-wrapper">
        <form @submit.prevent="submit" class="form">
            <h1 class="form__heading">SighUp</h1>
            <b-field label="Email" custom-class="form__label"  
              :type="{ 'is-danger': emailError }"
              :message="{ 'Неправильний формат вводу, Email повинен містити символ «‎@»': emailError }">
                <b-input type="email" v-model="email" class="form__input"/>
            </b-field>
            <b-field label="Nick-Name" custom-class="form__label"
              :type="{ 'is-danger': nickError }"
              :message="{ 'Nick-Name повинен містити мінімун 4 символи': nickError }">
                <b-input type="text" v-model="nick" class="form__input" maxlength="25"/>
            </b-field>
            <b-field label="Password" custom-class="form__label"
              :type="{ 'is-danger': passwordError }"
              :message="{ 'Пароль повинен містити мінімун 8 символів': passwordError }">
                <b-input type="password" v-model="password" class="form__input" maxlength="25" password-reveal/>
            </b-field>
            <div class="form__error-message" v-if="message">
                {{message}}
            </div>
            <b-button native-type="form__submit-button" class="is-primary" :disabled="isInputDisabled">
                Sign Up
            </b-button>
        </form>
    </div>
</template>

<script>
    import axios from "axios";
    import apiEndpoints from "../../constants/apiEndpoints";

    export default {
        name: 'SignUp',

        data() {
            return {
                email: '',
                nick: '',
                password: '',
                message: '',

                emailError: false,
                nickError: false,
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

            nick() {
                clearTimeout(this.nickErrorTimer)
                if( this.nick.length && (this.nick.length < 4) ) {
                    this.nickErrorTimer = setTimeout(() => {
                        this.nickError = true
                    }, 1500)
                }
                else this.nickError = false
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
                    (this.nick.length >= 4) &&
                    (this.password.length >= 8)
                ) return false
                return true
            }
        },

        methods: {
            async submit() {
                this.message = '';
                try {
                    const user = {
                        nick: this.nick,
                        email: this.email,
                        password: this.password
                    };
                    await new Promise((resolve, reject) => {
                      axios
                        .post(apiEndpoints.user.signup, user)
                        .then(function() {
                          resolve();
                        })
                        .catch((err) => {
                          reject(err)
                        });
                    });
                    this.$router.push({path: "/login"});
                } catch(err) {
                    let errMsg = err.response.data
                    if(errMsg === 'emailSignedUp') {
                        document.querySelectorAll("input")[0].focus()
                        this.message = 'За цією поштою уже здійснювалася реєстрація'
                    }
                    if(errMsg === 'nickSignedUp') {
                        document.querySelectorAll("input")[1].focus()
                        this.message = 'Такий Nick-Name уже використовується'
                    }
                }       
            }
        }
    }
</script>

<style lang="scss">   //special style fot buefy components
    .label {
        color: #4a4a4a !important;
        font-size: 18px !important;
    }
</style>
<style lang="scss" scoped>
    .signup-wrapper {
        background: url('https://images.wallpaperscraft.ru/image/chernyy_siniy_abstrakciya_polosy_513_1920x1080.jpg')
            center no-repeat;
        background-size: cover;
        min-height: calc(100vh - 130px);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .form {
        text-align: center;
        width: 40%;
        background-color: whitesmoke;
        margin: 0 auto;
        padding: 30px;
        border-radius: 6px;
        max-width: 360px;
        display: inline-flex;
        flex-direction: column;
        align-items: center;
        margin: 10px;
    }

    .form__heading {
        font-size: 28px;
        font-weight: 600;
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
        margin: 0 auto;
        margin-bottom: 6px;
        width: 300px;
    }

    .form__error-message {
        margin-bottom: 10px;
        color: red;
        font-weight: 500;
    }

    .form__submit-button {
        font-weight: 500;
    }
</style>