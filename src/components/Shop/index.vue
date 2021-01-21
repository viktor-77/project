<template>
    <div class="Shop"> 
        <filter-tab class="FilterTab"/>
        <search class="Search"/>
        <products-list class="ProductList"/>
        <cart/>
    </div>
</template>

<script>
    import Cart from "./Cart";
    import Search from "./Search";
    import FilterTab from "./FilterTab";
    import ProductsList from "./ProductsList";

    export default {
        name: "Shop",

        components: {
            FilterTab,
            Search,
            ProductsList,
            Cart,
        },
    }
</script>

<style lang="scss" scoped>
    .Shop {
        display: grid;
        grid-auto-columns: 300px 1fr;
        grid-template-rows: 120px 1fr;
        grid-template-areas: "FilterTab  Search"         
                             "FilterTab  ProductList";
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