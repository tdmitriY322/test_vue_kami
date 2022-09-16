<template>
    <div v-if="renderComponent">
        <div class="create">
            <h2>{{page_title}}</h2>
            <div class="create__title">
                <p>Название товара</p>
                <input type="text" v-model="product.title" required>
            </div>
            <div class="devider"></div>
            <div class="create__discripton">
                <p>Описание товара</p>
                <editor v-model="product.discription" width="100%"
                    api-key='5fgnwvgt32ucdvqgzx5npugq29ys07bq4dg3hk4g4b0cd92d'>
                </editor>
            </div>

            <div class="devider"></div>
            <div class="create__media">
                <p>Медиа</p>
                <div class="create__media-input">
                    <form ref="form">
                        <input type="file" id="file" multiple @change="logFiles">
                    </form>
                </div>
                <div class="create__media-show" v-if="images">
                    <div v-for="(image, i) in product.previwImages" :key="i">
                        <img :src="image" alt="">
                        <button class="create__media-btn" @click="deleteFiles(i)">Delete</button>
                    </div>
                </div>
            </div>
            <div class="devider"></div>
            <div class="create__cost">
                <div class="create__cost-checkbox">
                    <p>Одна для всех городов</p>
                    <input type="checkbox" v-model="product.isPriceForAllCities">
                </div>
                <div class="create__cost-input">
                    <input type="number" v-model="samePriceForAllSities">
                </div>
            </div>
            <div class="create__cities" v-show="!product.isPriceForAllCities">
                <span>Города</span>
                <div class="create__city" v-for="item in cities" :key="item.id">
                    <p>{{item.city}}</p>
                    <input type="number" v-model="item.price">
                </div>
            </div>

            <div class="create__status">
                <span>Выберите статус</span>
                <select v-model="product.status">
                    <option value="active">active</option>
                    <option value="archive">archive</option>
                </select>
            </div>
            <div class="create__activity">
                <button class="create__activity-btn" @click="$router.push('/')">
                    Назад
                </button>
                <button v-if="!edit" class="create__activity-btn create__activity-btn-sucsess"
                    @click="postProductData()">
                    Создать
                </button>
                <button v-if="edit" class="create__activity-btn create__activity-btn-sucsess"
                    @click="changeProductData()">
                    Изменить
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Editor from '@tinymce/tinymce-vue'
export default {
    data() {
        return {
            renderComponent: true,
            page_title: 'Создать',
            cities: [
                {
                    id: 0,
                    city: 'Алматы',
                    price: null,
                },
                {
                    id: 1,
                    city: 'Астана',
                    price: null,
                },
                {
                    id: 2,
                    city: 'Шымкент',
                    price: null,
                },
                {
                    id: 3,
                    city: 'Актау',
                    price: null,
                },
            ],
            edit: false,
            images: [],
            url: null,
            samePriceForAllSities: null,
            product: {
                id: Math.floor((1 + Math.random()) * 0x10000),
                title: '',
                discription: '',
                files: [],
                previwImages: [],
                price: [],
                isPriceForAllCities: true,
                status: 'active',
            }
        }
    },
    async created() {
        console.log(this.$route.params.id);
        await this.render()

    },
    watch: {
        $route() {
            console.log('rerender12312', this.$route);
            this.render()
        },
    },
    computed: {
        ...mapGetters([
            'STATE'
        ])
    },
    methods: {
        async render() {
            this.renderComponent = false;
            console.log('this.render', this.renderComponent);
            if (this.$route.params.id) {
                this.edit = true;
                await this.GET_PRODUCT_SINGLE(this.$route.params.id)
                this.setSingleProduct()
                this.changeTitle();
                console.log(this.STATE.single_product, 'single_productsingle_product');
            }
            this.renderComponent = true;
            console.log('this.render2', this.renderComponent);
        },
        async changeProductData() {
            this.CHANGE_PRODUCT_DATA(this.product)
            alert('Ваш товар изменен');
            await this.$router.push('/products')
        },
        setSingleProduct() {
            this.product = this.STATE.single_product
            if (this.product.price.length == 1) {
                this.samePriceForAllSities = this.product.price
            }
        },
        checkCitiesPrice() {
            if (this.product.isPriceForAllCities) {
                this.product.price.push(this.samePriceForAllSities)
            } else {
                for (let i = 0; i < this.cities.length; i++) {
                    this.product.price.push(this.cities[i])
                    console.log('pushwork', this.product.price);
                }
            }
        },
        changeTitle() {
            this.page_title = 'Редактировать'
            this.cities = this.product.price
            console.log('change titles');
        },
        ...mapActions([
            'POST_NEW_PRODUCT',
            'GET_PRODUCT_SINGLE',
            'CHANGE_PRODUCT_DATA',
        ]),
        async postProductData() { // post new product 
            this.checkCitiesPrice();
            this.POST_NEW_PRODUCT(this.product);
            console.log('postProductData', this.product);
            alert('Ваш товар добавлен')
            await this.$router.push('/products')

        },


        previewFiles(event) {
            console.log(event.target.files);
            this.$refs.form.reset()

        },
        logFiles(e) {
            // this.product.files.push(this.$refs.myFiles.files)
            // console.log(this.product.files);
            const file = e.target.files[0];
            this.product.files.push(file)
            this.url = URL.createObjectURL(file);
            this.product.previwImages.push(this.url)
        },
        deleteFiles(id) {
            this.product.previwImages.splice(id, 1)
            this.product.files.splice(id, 1)
        }
    },
    components: {
        'editor': Editor
    }
}
</script>

<style lang="scss">
.create {
    padding: 50px;

    &__title {
        display: flex;
        flex-direction: column;
        align-items: start;
        gap: 10px;
        margin-top: 30px;

        input {
            width: 300px;
            height: 40px;
            padding: 0 10px;
            border: 1px solid black;
        }
    }

    &__discripton {
        display: flex;
        flex-direction: column;
        align-items: start;
        gap: 10px;
        margin-top: 30px;
        width: 500px;
    }

    &__media {
        margin-top: 30px;
        display: flex;
        align-items: start;
        flex-direction: column;

        &-btn {
            height: 20px;
            width: 80px;
            background-color: red;
            color: #fff;
            margin-top: 5px;
            font-size: 12px;
        }

        &-input {
            margin-top: 20px;
        }

        &-show {
            margin-top: 30px;
        }
    }

    &__cost {
        margin-top: 30px;
        display: flex;
        align-items: center;
        gap: 20px;

        &-input {
            input {
                height: 30px;
                width: 200px;
                border: 1px solid black;
            }
        }

        &-checkbox {
            display: flex;
            align-items: center;
            gap: 5px;
        }

    }

    &__cities {
        margin-top: 30px;
        display: flex;
        flex-direction: column;
        align-items: start;

        span {
            font-weight: 500;
            font-size: 20px;
        }
    }

    &__city {
        margin-top: 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 350px;

        input {
            height: 30px;
            width: 200px;
            border: 1px solid black;
        }
    }

    &__status {
        display: flex;
        align-items: start;
        flex-direction: column;
        gap: 10px;
        margin-top: 30px;

        select {
            height: 30px;
            width: 200px;
            padding: 0 10px;
            border: 1px solid black;
        }
    }

    &__activity {
        margin-top: 30px;
        display: flex;
        align-items: center;
        gap: 30px;

        &-btn {
            height: 40px;
            width: 100px;
            background-color: black;
            color: #fff;
            font-size: 12px;

            &-sucsess {
                background-color: green;
            }
        }
    }
}

.devider {
    width: 600px;
    height: 2px;
    background-color: #c4c4c4;
    margin: 20px 0;
}
</style>