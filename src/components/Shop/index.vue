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

    import { mapGetters } from "vuex";

    export default {
        name: "Shop",

        components: {
            FilterTab,
            Search,
            ProductsList,
            Cart,
        },

        computed: {
            ...mapGetters(['filteredProducts']),   
            maxPrice() {
                let max = 0;
                this.filteredProducts.forEach(el => {
                  if(max < el.price) max = el.price
                });
                return max
            },
            minPrice() {
                let min = 9999999999;
                this.filteredProducts.forEach(el => {
                  if(min > el.price) min = el.price
                });
                return min
            }
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