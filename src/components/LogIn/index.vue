<template>
    <div class="wrapper">
        <form action="apiEndpoints.users.login" enctype='multipart/form-data' method="POST">
            <b-field label="Email" custom-class="is-medium">
                <b-input type="email" class="b-input" name="email" icon="fas fa-unlock-alt"/>
            </b-field>
            <b-field label="Password" custom-class="is-medium">
                <b-input type="password" class="b-input" name="password" password-reveal/>
            </b-field>
            <b-field class="remember-input">
                <b-checkbox :value="!true">
                    Запам'ятати
                </b-checkbox>
            </b-field>
            <br>
            <b-button type="submit" class="is-primary">Увійти</b-button>
        </form>
    </div>
</template>

<script>
    export default {
        name: 'LogIn',
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
        width: 300px;
    }

    .remember-input {
        margin-right: auto;
    }

    button {
        margin-top: -10px;
    }
</style>