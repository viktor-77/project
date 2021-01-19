<template>
    <div class="footer-container">
        <footer>
            <div class="info">
                © Інтернет-магазин «Techno store™» <br>
                2020 – 2021
            </div>
            <div class="icons">
                <i class="fab fa-facebook"></i>
                <i class="fab fa-twitter"></i>
                <i class="fab fa-instagram"></i>
                <i class="fab fa-tripadvisor"></i>
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
    .footer-container {
        width: 100%;
        background-color: #262626;
        padding: 14px 0;
    }
    
    footer {
        height: 100%;
        max-width: 80%;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .info {
        color: white;
        font-weight: normal;
        font-size: 12px;
    }

    .icons {
        display: grid;
        grid-template-columns: repeat(4,auto);
        grid-column-gap: 20px;
        font-size: 26px;
        color: white;
        i:hover {
            opacity: .6;
            transform: scale(1.1);
            transition-delay: .1;
        }
    }
</style>