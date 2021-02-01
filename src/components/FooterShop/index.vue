<template>
    <div class="footer-wraper">
        <footer class="footer-container">
            <div class="footer__info">
                © Інтернет-магазин «Techno store™» <br>
                2020 – 2021
            </div>
            <div class="footer__icons">
                <i class="fab fa-facebook footer__icon"></i>
                <i class="fab fa-twitter footer__icon"></i>
                <i class="fab fa-instagram footer__icon"></i>
                <i class="fab fa-tripadvisor footer__icon"></i>
            </div>
        </footer>
    </div>
</template>

<script>
    export default {
        name: 'FooterShop',
    }
</script>

<style lang="scss" scoped>
    %button-animation {
        opacity: .65;
        transition-duration: 0.3s;
        transform: scale(1.1);
        cursor: pointer;
    }

    .footer-wraper {
        width: 100%;
        background-color: #262626;
        padding: 14px 0;
    }
    
    .footer-container {
        height: 100%;
        max-width: 85%;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .footer__info {
        color: white;
        font-weight: normal;
        font-size: 12px;
    }

    .footer__icons {
        display: flex;
        column-gap: 20px;
        font-size: 28px;
        color: white;
        .footer__icon:hover {
            @extend  %button-animation
        }
    }
</style>