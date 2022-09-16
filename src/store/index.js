import productData from "@/data/products.json";
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    searchValue: "",
    newProduct: {},
    editPage: [],
    single_product: {},
    product_list: [], // here all product json
  },
  mutations: {
    ADD_NEW_PRODUCT(state, data) {
      state.product_list.push(data)
    },
    SET_PRODUCT_LIST(state) {
      state.product_list = productData
    },
    SET_SINGLE_PRODUCT(state, product) {
      state.single_product = product
    },
    SET_SEARCH_VALUE(state, value) {
      state.searchValue = value
    }
  },
  actions: {
    SET_SEARCH_VALUE_TO_VUEX(context, value) {
      context.commit('SET_SEARCH_VALUE', value)
    },
    CHANGE_PRODUCT_DATA(context, data) {
      for (let i = 0; i < productData.length; i++) {
        if (productData[i].id == data.id) {
          productData[i] = data;
        }
      }
    },
    async POST_NEW_PRODUCT(context, data) {
      context.commit('ADD_NEW_PRODUCT', data);
      console.log('muatatin ', data);
    },
    async GET_PRODUCT_LIST(context) {
      context.commit('SET_PRODUCT_LIST')
    },
    async GET_PRODUCT_SINGLE(context, payload) {
      try {
        for (let i = 0; i < productData.length; i++) {
          if (productData[i].id == payload) {
            context.commit('SET_SINGLE_PRODUCT', productData[i]);
          }
        }
        return [];
      } catch (error) {
        console.error(error);
      }
    },
  },
  getters: {
    SEARCH_VALUE(state) {
      return state.searchValue;
    },
    STATE(state) {
      return state
    }
  }
})