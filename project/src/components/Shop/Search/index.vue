<template>
    <div class="container">
        <span>Пошук</span>  <input v-model="textFilter" class="input" placeholder=". . ."/>
    </div>
</template>

<script>
    import { mapActions } from "vuex";

    export default {
        name: "Search",

        data() {
            return {
                textFilter: null,
            }
        },

        watch: {
            textFilter(val) {
                if(val === '') this.setFilterData({title: null})
                else this.setFilterData({title: val.toLowerCase().split(' ').join('')})
            }
        },

        methods: {
            ...mapActions(['setFilterData']),
        },
    }
</script>

<style lang="scss" scoped>
    .container {
        height: 120px;
        display: flex;
        align-items: center;
        text-align: center;
        justify-content: center;
        span {
            font-size: 25px;
            font-weight: 500;
            margin-right: 16px;
        }
    }
    
    .input {
        width: 300px;
        font-size: 17px;
        border-radius: 20px;
        padding-left: 20px;
    }
 
</style>