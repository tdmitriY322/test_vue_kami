<template>
    <div>
        <div class="products">
            <div class="products__search">
                <div class="products__search-input">
                    <input type="text" v-model="search">
                </div>
                <button class="products__search-btn" @click="searchResult(search)">
                    Поиск товара
                </button>
            </div>
            <button class="products__add" @click="$router.push('/product/create')">
                Добавить
            </button>
            <div class="products__items">
                <ProductVue @delete-item="deleteItem(i)" v-for="(item, i) in products" :key="i" :id="item.id"
                    :isChecked="item.isChecked" :image="item.image" :price="item.price[0].price" :status="item.status"
                    :title="item.title"></ProductVue>
            </div>
            <div class="products__pagination">
                <p @click="prevPage">prev</p>
                {{page}}
                <p @click="nextPage">next</p>
            </div>
        </div>
    </div>
</template>

<script>
import ProductVue from '../components/ProductCard.vue';
import { mapActions, mapGetters } from 'vuex';
export default {
    data() {
        return {
            search: null,
            page: 1,
            selectAll: false,
            products: [],
        }
    },
    created() {
        this.GET_PRODUCT_LIST()
        this.setProducts()
    },
    watch: {
        search() {
            this.searchProductsBySearchValue(this.search)
        }
    },
    methods: {
        searchProductsBySearchValue(value) {
            if (value) {
                this.products = this.products.filter(function (item) {
                    return item.title.toLowerCase().includes(value)
                })
            } else {
                this.setProducts()
            }
        },
        searchResult(value) {
            this.SET_SEARCH_VALUE_TO_VUEX(value)
            console.log(this.SEARCH_VALUE, 'SEARCH_VALUE');
        },
        setProducts() {
            this.$set(this, 'products', this.STATE.product_list)
            console.log(this.STATE.product_list, 'asdasd  products');
        },
        ...mapActions([
            'GET_PRODUCT_LIST',
            'SET_SEARCH_VALUE_TO_VUEX'
        ]),
        deleteItem(id) {
            this.products.splice(id, 1)
        },
        prevPage() {
            if (this.page == 1) {
                return
            } else {
                this.page -= 1
            }
        },
        nextPage() {
            if (this.page == this.products.length) {
                return
            } else {
                this.page += 1
            }
        }
    },
    computed: {
        ...mapGetters([
            'STATE',
            'SEARCH_VALUE'
        ]),
    },
    components: {
        ProductVue
    }
}
</script>

<style lang="scss">
.products {
    padding: 50px;

    &__selectall {
        display: flex;
        align-items: center;
        gap: 20px;
        padding: 10px;
    }

    &__add {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 50px;
        width: 100px;
        background-color: green;
        color: #fff;
    }

    &__search {
        width: 300px;
        margin: 0 auto;

        input {
            width: 100%;
            height: 30px;
            padding: 0 10px;
            border: 1px solid #c3c3c3;
        }

        &-btn {
            height: 30px;
            width: 100px;
            border: 1px solid black;
            margin-top: 20px;
            font-size: 12px;
        }
    }

    &__items {
        margin-top: 30px;
    }

    &__pagination {
        display: flex;
        align-items: center;
        gap: 20px;

        p {
            cursor: pointer;
        }
    }
}
</style>