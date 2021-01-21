<template>
    <div class="wrapper">
        <form @submit.prevent="submit">
            <b-field label="Email" custom-class="is-medium">
                <b-input type="email" v-model="email" class="b-input" name="email"/>
            </b-field>
            <b-field label="Nick-Name" custom-class="is-medium">
                <b-input type="text" v-model="nick" class="b-input" name="nick"/>
            </b-field>
            <b-field label="Password" custom-class="is-medium">
                <b-input type="password" v-model="password" class="b-input" name="password" password-reveal/>
            </b-field>
            <b-button native-type="submit" class="is-primary">Sign Up</b-button>
        </form>
    </div>
</template>

<script>
    export default {
        name: 'SignUp',

        data() {
            return {
                email: '',
                nack: '',
                password: ''
            }
        },

    //     methods: {
    //     ...mapActions('auth',['signup']),

    //     async submit() {
    //         try {
    //             const user = {
    //                 nick: this.nick,
    //                 email: this.email,
    //                 password: this.password
    //             };
    //             const result = await this.signup(user);
    //             if (result === true) {
    //                 this.message = "";
    //                 this.$router.push({path: "/login"});
    //             } else {
    //                 this.message = result; //'SignUp error!';
    //             }
    //         } catch (err) {
    //             this.message = err.message;
    //         }
    //     }
    // },
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
</style>