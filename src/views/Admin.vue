<template>
    <v-container>
        <v-row>
            <v-col offset-md="1" md="5">
                <div class="pa-2" id="info">
                  <h1>PRODUCT ITEM</h1>
                    <v-simple-table id="product_table">
                        <thead>
                            <tr>
                                <th class="text-left" style="width:100%">
                                    <v-btn color="pink" small text to="/addNew">
                                    <v-icon>add</v-icon>
                                    <span style="padding:0 10px;">
                                        ADD ITEM
                                    </span>
                                    </v-btn>
                                    </th>
                                <th class="text-left" style="width:100%">PRICE</th>
                                <th class="text-left" style="width:100%">EDIT</th>
                                <th class="text-left" style="width:100%">REMOVE</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in productItems" :key="item.name">
                            <td>
                                <span id="td_name">{{ item.name }}</span><br>
                                <span id="product_item_description">{{ item.description }}</span>
                            </td>
                            <td>{{ item.price }}</td>
                            <td>
                                <v-btn small text>
                                    <v-icon color="pink">edit</v-icon>
                                </v-btn>
                            </td>
                             <td>
                                <v-btn small text @click="deleteItem(item.id)">
                                    <v-icon color="incomplete">delete</v-icon>
                                </v-btn>
                            </td>
                            <td>
                              <v-btn small text>
                              <v-icon color="pink" @click="addToBasket(item)">add_box</v-icon>
                              </v-btn>
                                </td>
                            </tr>
                        </tbody>
                    </v-simple-table>
                </div>
            </v-col>
          
            <v-col offset-md="1" md="5">
                <div class="pa-2" id="info">
                  <h1>BASKET</h1>
                  <v-simple-table id="product_table" v-if="basket.length > 0">
                        <thead>
                            <tr>
                                <th class="text-left" style="width:30%">QUANTITY</th>
                                <th class="text-left" style="width:50%">NAME OF ITEM</th>
                                <th class="text-left" style="width:20%">PRICE</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in basket" :key="item.name">
                                <td>
                                    <v-icon color="pink" @click="increaseQtn(item)">add_box</v-icon>
                                    {{ item.quantity }}
                                  
                                    <v-icon color="pink" @click="decreaseQtn(item)">indeterminate_check_box</v-icon>
                                </td>
                                <td>{{ item.name }}</td>
                                <td>{{ item.price }}</td>
                            </tr>
                        </tbody>
                    </v-simple-table>

                    <v-simple-table v-else>
                      <p>THE BASKET IS EMPTY</p>
                    </v-simple-table>


                    <v-divider></v-divider> 
                    <v-row id="basket_checkout" class="mt-4" style="margin:0">
                      <v-col>
                        <p>SUBTOTAL: </p>
                        <p>DELIVERY: </p>
                        <p><b>TOTAL AMOUNT: </b></p>
                      </v-col>
                      <v-col class="text-right">
                        <p> {{ subTotal }} DKK</p>
                        <p>10 DKK</p>
                        <p><b> {{ total }} DKK</b></p>
                      </v-col>
                    </v-row>
                    <v-row style="margin:0">
                        <v-spacer></v-spacer>
                        <v-btn color="pink">
                          CHECKOUT
                        </v-btn>
                    </v-row>
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
        basket: [],
        productItems: [
          
        ],
      }
    },
    created() {
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
    },
    methods: {
        deleteItem(id) {
            dbProductAdd.doc(id).delete().then(function() {
            
            // }).catch(function(error) {
            
            });

        },
      addToBasket(item) {
        if(this.basket.find(itemInArray => item.name === itemInArray.name)) {
          item = this.basket.find(itemInArray => item.name);
          this.increaseQtn(item);
        }
        else {
        this.basket.push({
          name: item.name,
          price: item.price,
          quantity: 1
          })
        }
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

#info {
    background-color: white;
}
tr th {
  font-weight: 300;
}
#td_name {
  font-weight: bold;
}
tr td {
  padding: 10px 10px 10px 20px;
}
#product_item_description {
  font-style: italic;
  font-weight: 300;
  color: map-get($colorz, pink);
  font-size: 15px;
}

#basket_checkout {
  font-size: 15px;
}

#basket_checkout p:first-child {
  line-height: 2px;
}




</style>