<template>
    <div class="wrapper">
        <form @submit.prevent="submit">
            <b-field label="Email" custom-class="is-medium"  
              :type="{ 'is-danger': emailError }"
              :message="{ 'Неправильний формат вводу, Email повинен містити символ «‎@»': emailError }">
                <b-input type="email" v-model="email" class="b-input"/>
            </b-field>
            <b-field label="Nick-Name" custom-class="is-medium"
              :type="{ 'is-danger': nickError }"
              :message="{ 'Nick-Name повинен містити мінімун 4 символи': nickError }">
                <b-input type="text" v-model="nick" class="b-input" maxlength="25"/>
            </b-field>
            <b-field label="Password" custom-class="is-medium"
              :type="{ 'is-danger': passwordError }"
              :message="{ 'Пароль повинен містити мінімун 8 символів': passwordError }">
                <b-input type="password" v-model="password" class="b-input" maxlength="25" password-reveal/>
            </b-field>
            <div class="error-message" v-if="message">
                {{message}}
            </div>
            <b-button native-type="submit" class="is-primary" :disabled="isInputDisabled">
                Sign Up
            </b-button>
        </form>
    </div>
</template>

<script>
    import { mapActions } from "vuex";

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
            ...mapActions('auth',['signup']),

            async submit() {
                this.message = '';
                try {
                    const user = {
                        nick: this.nick,
                        email: this.email,
                        password: this.password
                    };
                    await this.signup(user);
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

<style lang="scss" scoped>
    .wrapper {
        background: url('https://images.wallpaperscraft.ru/image/chernyy_siniy_abstrakciya_polosy_513_1920x1080.jpg')
            center no-repeat;
        background-size: cover;
        height: calc(100vh - 130px);
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    form {
        text-align: center;
        width: 40%;
        background-color: whitesmoke;
        margin: 0 auto;
        padding: 30px;
        border-radius: 6px;
        max-width: 360px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .b-input {
        margin: 0 auto;
        margin-bottom: 6px;
        width: 300px;
    }

    button {
        font-weight: 500;
    }

    .error-message {
        margin-bottom: 10px;
        color: red;
        font-weight: 500;
    }
</style>