import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    basketItems: [
      {
        name: 'GREEN',
        description: 'this is green',
        price: 500,
        quantity: 1
      },
    ]
  },
  mutations: {
    addBasketItems: (state, basketItems) => {
      if(basketItems instanceof Array) {
        basketItems.forEach(item => {
          if(state.basketItems.find(itemInArray => item.name === itemInArray.name)) {
            item = state.basketItems.find(itemInArray => item.name);
            item.quantity++
          }
          else {
            state.basketItems.push({
            name: item.name,
            price: item.price,
            quantity: 1
            })
          }
      })
    }
    }
  },
  actions: {
  },
  getters: {
    getBasketItems: state => state.basketItems
  },
  modules: {
  }
})
