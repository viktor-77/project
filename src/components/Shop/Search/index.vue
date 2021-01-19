<template>
    <div class="container">
        <span>Пошук</span>  
        <b-input v-model="textFilter" class="search-input" placeholder=". . ." icon="magnify" type="search"/>
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
<style lang="scss">
    .search-input {
        
        input {
            text-align: left;
            border-radius: 20px;
            font-size: 17px;
            padding-left: 4px;
            margin-right: 10px;
        } 
    }
</style>
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
 
</style>