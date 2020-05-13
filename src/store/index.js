import Vue from 'vue'
import Vuex from 'vuex'
import { dbProductAdd } from '../../firebase'

import firebase from 'firebase'
import 'firebase/firestore'

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
    ],
    productItems: [

    ],
    currentUser: null
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
    },
    userStatus (state, user) {
      if(user) {
        state.currentUser = user
      }
      else {
        state.currentUser = null
      }
    },

    setProductItems: state => {
      let productItems = []
      dbProductAdd.onSnapshot((snapshotItems) => {
        productItems = []
        snapshotItems.forEach((doc) => {
          var productItemData = doc.data();
          productItems.push({
            ...productItemData,
            id: doc.id
          })
        })
        state.productItems = productItems
      })
    },

    /* created() {
      dbProductAdd.get().then((querySnapshot) => {
          querySnapshot.forEach((doc =>{
              console.log(doc.id, " => ", doc.data());
              var productItemData = doc.data();
              this.productItems.push({
                  id: doc.id,
                  name: productItemData.name,
                  description: productItemData.description,
                  price: productItemData.price
              })
          }))
      }

      )
  }, */








  },
  actions: {
    setUser(context, user) {
      context.commit('userStatus', user)
    },
    setProductItems: context => {
      context.commit('setProductItems')
    }
  },
  getters: {
    getBasketItems: state => state.basketItems,
    currentUser: state => state.currentUser,
    getProductItems: state => state.productItems
  },
  modules: {
  }
})
