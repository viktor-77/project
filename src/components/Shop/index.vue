<template>
    <div class="Shop">
        <header-shop class="HeaderShop"/>
        <filter-tab class="FilterTab"/>
        <search v-if="$route.fullPath === '/' " class="Search"/>
        <router-view></router-view>
    </div>
</template>

<script>
    import HeaderShop from "./HeaderShop";
    import FilterTab from "./FilterTab";
    import Search from "./Search";

    export default {
        name: "Shop",

        components: {
            HeaderShop,
            FilterTab,
            Search,
        },
    }
</script>

<style lang="scss" scoped>
    .Shop {
        display: grid;
        grid-auto-columns: 300px 1fr;
        grid-template-rows: 80px 120px 1fr;
        grid-template-areas: "HeaderShop HeaderShop"
                             "FilterTab  Search"         
                             "FilterTab  ProductList";
    }

    .HeaderShop {
        grid-area: HeaderShop;
    }

    .FilterTab {
        grid-area: FilterTab;
    }

    .Search {
        grid-area: Search;
    }

    .ProductList {
        grid-area: ProductList;
    }
</style>