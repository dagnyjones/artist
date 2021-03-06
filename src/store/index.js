import Vue from 'vue'
import Vuex from 'vuex'
import { dbProductAdd } from '../../firebase'
import { dbOrders } from '../../firebase'
import firebase from 'firebase'
import 'firebase/firestore'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    counter: 0,
    basketItems: [
      
    ],
    productItems: [

    ],
    orderItems: [],
    currentUser: null
  },
  mutations: {
    addCheckoutItem: (state, basketItems) => {
      dbOrders.add({
        archive: false,
        storeOrder: false,
        orderNumber: state.conter++,
        status: "incomplete",
        orderLines: state.basketItems

      })      
    },
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

      setOrderItems: state => {
        let orderItems = []
 
      dbOrders.onSnapshot((snapshotItems) => {
        orderItems = []
        snapshotItems.forEach((doc) => {
          var orderItemData = doc.data();
          orderItems.push({ 
            
            ...orderItemData,
            id: doc.id  
          })
        
        })
        state.orderItems = orderItems
      })        
    }
  },

  actions: {
    setCheckoutItem(context) {
      context.commit('addCheckoutItem')

    },
    setUser(context, user) {
      context.commit('userStatus', user)
    },
    setProductItems: context => {
      context.commit('setProductItems')
    },
    setOrderItems: context => {
      context.commit('setOrderItems')
    }

  },
  getters: {
    getBasketItems: state => state.basketItems,
    currentUser: state => state.currentUser,
    getProductItems: state => state.productItems,
    getOrderItems: state => state.orderItems

  },
  modules: {
  }
})
