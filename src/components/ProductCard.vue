<template>
    <div>
        <div class="product">
            <div class="product__wrapper" @click.self="routerTo(id)">
                <div class="product__img" >
                    <img :src="image" :alt="title">
                </div>
                <div class="product__name" >
                    {{title}}
                </div>
                <div class="product__status" :class="{green: status == 'active'}">
                    {{status}}
                </div>
                <div class="product__cost">
                    {{price}} тг
                </div>
                <button class="product__delete" @click="deleteItem(id)">
                    Удалить
                </button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
        }
    },
    props: {
        id: Number,
        title: String,
        image: String,
        status: String,
        price: Object,
    },
    methods: {
        deleteItem(id) {
            console.log('log from card', id);
            this.$emit('delete-item', id)
        },
        routerTo(id) {
            this.$router.push({name: 'ProductEdit', params: {id: id}})
        }
    },
}
</script>
<style lang="scss" scoped>
.product {
    padding: 10px 10px;

    &__wrapper {
        display: flex;
        align-items: center;
        gap: 30px;
        border: 1px solid;
    }

    &__name {
        width: 200px;
        font-weight: 500;
    }

    &__img {
        width: 30px;

        img {
            width: 100%;
        }
    }

    &__cost {
        width: 100px;
    }

    &__status {
        font-size: 18px;
        width: 100px;
        color: #fff;
        border: 1px solid black;
        border-radius: 10px;
        background-color: red;
        opacity: 0.7;

    }

    .green {
        background-color: green;
    }

    &__delete {
        height: 30px;
        width: 70px;
        background-color: red;
        opacity: 0.8;
        color: #fff;
        font-size: 12px;
    }
}
</style>

