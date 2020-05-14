<template>
    <v-container fluid>
        <v-row>
            <v-col offset-md="1" md="6">
                <h1>ORDERS</h1>

                <div class="pa-2" id="info">
                    <v-row class="ma-0">
                        <v-col cols="12" md="1" class="pa-2">
                            <p class="font-weight-bold body-1 pl-1 dark--text">
                                INFO:
                            </p>
                        </v-col>
                        

                        <v-col cols="12" md="5" class="pa-2 pl-5">
                           
                               <v-row align="center">
                                   <div id="status_box" class="complete">COMPLETED</div>
                                   <span class="font-weight-light caption pl-1">DONE</span>
                               </v-row>

                               <v-row align="center">
                                   <div id="status_box" class="inprogress">IN PROGRESS</div>
                                   <span class="font-weight-light caption pl-1">SOMEBODY IS WORKING ON IT</span>
                               </v-row>

                               <v-row align="center">
                                   <div id="status_box" class="incomplete">NOT STARTED</div>
                                   <span class="font-weight-light caption pl-1">NOT STARTED</span>
                               </v-row>
                           
                        </v-col>

                        <v-col cols="12" md="6" class="pa-2">
                            <v-row>
                                <div id="status_box" class="complete">completed</div>
                                <div id="status_box" class="inprogress">in progress</div>
                                <div id="status_box" class="incomplete">not started</div>
                            </v-row>

                            <v-row>
                                <p class="font-weight-light pl-1 caption">
                                    <b>Single Click</b> to stop : complete => in progess => <b>Double click</b> the box to reset to "not started"
                                </p>
                                <span class="font-weight-light caption pl-1">
                                    <v-icon color="dark">archive</v-icon>
                                    click this to archive
                                </span>
                            </v-row>
                           


                        </v-col>
                    </v-row>





                </div>




<!-- order list area -->
                <div class="pa-2 mt-1" id="info">

                    <p class="font-weight-bold body-1 pa-3 dark--text">ORDERS:</p>
                  
                    <v-simple-table id="product_table">
                        <thead>
                            <tr>
                                <th class="text-left" style="width:10%">Order Number</th>
                                <th class="text-left" style="width:10%">Qty</th>
                                <th class="text-left" style="width:40%">Item</th>
                                <th class="text-left" style="width:10%">Price</th>
                                <th class="text-left" style="width:10%">Status</th>
                                <th class="text-left" style="width:10%">Archive</th>
                                <th class="text-left" style="width:10%">Remove</th>
                            </tr>
                        </thead>
                        <tbody class="font-weight-light">
                            <tr v-for="item in orderItems" :key="item.name" v-if="item.storeOrder == false">
                                <td>
                                    {{ item.orderNumber }}
                                </td>
                                <td class="py-3"><p v-for="subItem in item.orderLines" :key="subItem.id" style="margin:0">
                                    {{ subItem.quantity }}</p></td>

                                <td v-for="subItem in item.orderLines" :key="subItem.id"><p v-for="subItem in item.orderLines" :key="subItem.id" style="margin:0">
                                    {{ subItem.name }}</p></td>

                                <td v-for="subItem in item.orderLines" :key="subItem.id"><p v-for="subItem in item.orderLines" :key="subItem.id" style="margin:0">
                                    {{ subItem.price }}</p></td>

                                <td>
                                    <div id="status_box" v-bind:class="item.status" @click="switchStage(item.id)">
                                        {{ item.status }}
                                    </div>
                                </td>

                                <td>
                                    <v-btn small text @click="archiveOrderItem(item.id)">
                                        <v-icon color="dark">archive</v-icon>
                                    </v-btn>
                                </td>

                                <td>
                                    <v-btn small text @click="deleteOrderItem(item.id)">
                                        <v-icon color="incomplete">delete</v-icon>
                                    </v-btn>
                                </td>                               
                            </tr>
                        </tbody>
                    </v-simple-table>
                </div>


            </v-col>
          
            <v-col offset-md="0" md="4">
                <h1>REVENUE</h1>
                <div class="pa-2" id="info"> 
                    <p class="font-weight-bold body-1 dark--text">Completed orders:</p>  
                    <div>
                        <p id="totalOrders">
                            Total Orders:
                            <span class="incomplete--text font-weight-bold"> {{ orderItems.length }} </span>
                        </p>
                    </div> 
                    <div id="revenueList" v-for="item in orderItems" :key="item.name" v-if="item.archive === true">
                    <p>Order Number:
                        {{ item.orderNumber }}
                        <v-btn small text @click="deleteOrderItem(item.id)">
                            <v-icon color="incomplete">delete</v-icon>
                        </v-btn>
                        </p>    
                    </div> 
                </div>

                <div class="pa-2 mt-1" id="info">   
                    <div id="totalRevenue">
                        <p id="totalRevenueText">
                            Total Revenue: <span id="totalRevenueTextTotal">
                                {{ revenueTotal }}
                            </span>
                        </p>
                    </div> 
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>

import { dbOrders } from '../../firebase'

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

        switchStage(id) {
            let selectedOrderItem = this.orderItems
            .filter(item => item.id === id)[0];

            if(selectedOrderItem.status === "inprogress")  {
                dbOrders.doc(id).update({status:"complete"})
                .then(() => {

                 })
            }

             else if(selectedOrderItem.status === "incomplete")  {
                dbOrders.doc(id).update({status:"inprogress"})
                .then(() => {

                 })
            }

             else if(selectedOrderItem.status === "complete")  {
                dbOrders.doc(id).update({status:"incomplete"})
                .then(() => {

                 })
            }
        },

        archiveOrderItem(id) {
            dbOrders.doc(id).update({archive: true, storeOrder: true})
            .then(() => {})
        },

        deleteOrderItem(id) {
            dbOrders.doc(id).delete().then(() => {
                console.log("stuff is deleted");
                
            }).catch((error) => {

            })


        },


      addCheckoutItem() {
        this.$store.dispatch('setCheckoutItem')
        
      },
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
      orderItems() {
        return this.$store.getters.getOrderItems

      },
     revenueTotal() {
         var revenueIncome = 0;

         this.orderItems.forEach(element => {
             if(element.archive == true) {
                 element.orderLines.forEach(elem => {
                     revenueIncome += elem.price * elem.quantity
                 })
             }

         });
         return revenueIncome

     },
    }
  }
</script>

<style lang="scss" scoped>

#status_box {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 35px;
    width:90px;
    font-size: 12px;
    border-radius: 2px;
    margin: 0;
    color: black; 
}

#totalRevenue {
    padding: 20px 10px 20px 0;
    display: flex;
}

#totalRevenueText {
    display: flex;
    margin: 0;    
    justify-content: space-between;
    font-style: italic;
    width: 100%;
}

#totalRevenueTextTotal {
    text-decoration: underline;
    border-bottom: 1px solid black;
    font-weight: bold;
    font-style: normal;
}


</style>