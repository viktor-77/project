<template>
    <div class="wrapper">
        <form action="/signup" enctype='multipart/form-data' method="POST">
            <b-field label="Email" custom-class="is-medium">
                <b-input type="email" class="b-input" name="email"/>
            </b-field>
            <b-field label="Nick-Name" custom-class="is-medium">
                <b-input type="text" class="b-input" name="nick"/>
            </b-field>
            <b-field label="Password" custom-class="is-medium">
                <b-input type="password" class="b-input" name="password" password-reveal/>
            </b-field>
            <b-button type="submit" class="is-primary">Зареєструватися</b-button>
        </form>
    </div>
</template>

<script>
    export default {
        name: 'SighnUp',
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