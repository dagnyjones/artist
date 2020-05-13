<template>
    <v-container fluid>
        <v-row>
            <v-col offset-md="1" md="6">
                <div class="pa-2" id="info">
                    <h1>ORDERS</h1>
                    <v-row>
                        <v-col cols="12" md="1" class="pa-2">
                            <p class="font-weight-bold body-1 pl-1">
                                INFO
                            </p>
                        </v-col>
                        <v-col cols="12" md="5" class="pa-2 pl-5" >
                            <v-row align="center">
                                <div id="status_box" class="complete">
                                    COMPLETED
                                </div>
                                <span class="font-weight-light caption pl-1">DONE</span>
                            </v-row>

                            <v-row align="center">
                                <div id="status_box" class="purple">
                                    IN PROGRESS
                                </div>
                                <span class="font-weight-light caption pl-1">BEING WORKED ON</span>
                            </v-row>

                            <v-row align="center">
                                <div id="status_box" class="incomplete">
                                    NOT STARTED
                                </div>
                                <span class="font-weight-light caption pl-1">NOT STARTED</span>
                            </v-row>
                        </v-col>

                        <v-col cols="12" md="6" class="pa-2">
                            <v-row>
                                <div id="status_box" class="complete">
                                    COMPLETED
                                </div>
                                <div id="status_box" class="purple">
                                    IN PROGRESS
                                </div>
                                <div id="status_box" class="incomplete">
                                    NOT STARTED
                                </div>

                            </v-row>
                            <v-row>
                            <p class="font-weight-light caption pl-1">
                                <b>Single-click </b>to switch stage: complete => in progress =>
                                <b>Double-click </b>the box to reset to "not started"
                            </p>
                            <span class="font-weight-light caption pl-1">
                                <v-icon color="pink">archive</v-icon>
                                Archive to "hide" it from orders list.
                            </span>
                            </v-row>
                        </v-col>
                    </v-row>





                </div>

                <!-- order list area -->
                <div class="pa-2 mt-1" id="info">

                    <p class="font-weight-bold body-1 pl-1">
                                ORDERS:
                    </p>
                  
                    <v-simple-table id="product_table">
                        
                        <thead>
                            <tr>
                              
                                <th class="text-left" style="width:10%">ORDER NUMBER</th>
                                <th class="text-left" style="width:10%">QUANTITY</th>
                                <th class="text-left" style="width:40%">ITEM</th>
                                <th class="text-left" style="width:10%">PRICE</th>
                                <th class="text-left" style="width:10%">STATUS</th>
                                <th class="text-left" style="width:10%">ARHCIVED ITEM</th>
                                <th class="text-left" style="width:10%">REMOVE</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in orderItems" :key="item.name">

                            <td>{{ item.orderNumber }}</td>

                            <td v-for="subItem in item.orderLines" :key="subItem.id" >{{ subItem.quantity }}</td>

                            <td v-for="subItem in item.orderLines" :key="subItem.id">{{ subItem.name }}</td>

                            <td v-for="subItem in item.orderLines" :key="subItem.id">{{ subItem.price }}</td>

                            <td><div id="status_box" class="purple">
                                    {{ status }}
                                </div></td>
                            <td><v-btn small text @click="addToBasket(item)">
                                <v-icon color="dark">archive</v-icon></v-btn></td>
                            <td><v-btn small text @click="addToBasket(item)">
                                <v-icon color="incomplete">delete</v-icon></v-btn></td>
                            
                            </tr>
                        </tbody>
                    </v-simple-table>
                </div>
            </v-col>
          
            <v-col offset-md="1" md="5">
                <div class="pa-2" id="info">
                <h1>REVENUE</h1>
                    
                   revenue
                </div>
                <div class="pa-2 mt-1" id="info">
                
                    
                   completed orders
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>

import { dbProductAdd } from '../../firebase'

     export default {
    data () {
      return {
        basketDump: [],
       
      }
    },
     beforeCreate() {
      this.$store.dispatch('setOrderItems')
    },
    methods: {
      addToBasket(item) {
        /* if(this.basket.find(itemInArray => item.name === itemInArray.name)) {
          item = this.basket.find(itemInArray => item.name);
          this.increaseQtn(item);
        }
        else {
        this.basket.push({
          name: item.name,
          price: item.price,
          quantity: 1
          })
        } */
        this.basketDump.push({
          name: item.name,
          price: item.price,
          quantity: 1
          });
          this.$store.commit('addBasketItems', this.basketDump);
          this.basketDump = [];
          
      },
      increaseQtn(item) {
        item.quantity++
      },
      decreaseQtn(item) {
        item.quantity--;

        if(item.quantity === 0) {
          this.basket.splice(this.basket.indexOf(item), 1)
        }
      }
    },
    computed: {
      
      basket() {
        // return this.$store.state.basketItems
        return this.$store.getters.getBasketItems
      },
      OrderItems() {
        return this.$store.getters.getOrderItems

      },
      subTotal () {
        var subCost = 0;
        for(var items in this.basket) {
          var individualItem = this.basket[items];
          subCost += individualItem.quantity * individualItem.price;
        }
        return subCost
      },
      total () {
        var deliveryPrice = 10;
        var totalCost = this.subTotal
        return totalCost + deliveryPrice
      }
    }
  }
</script>

<style lang="scss" scoped>

#status_box {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 35px;
    width: 90px;
    font-size: 12px;
    border-radius: 2px;
    margin: 5px 0;
    color: white;
}


</style>