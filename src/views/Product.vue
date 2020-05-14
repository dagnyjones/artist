<template>
    <v-container fluid>
        <v-row align="center" justify="center">

            <v-col offset-md="0" md="10">
                <div id="headline"><h1>POSTER SELECTION</h1></div>
                <div class="pa-2" id="info" >
                  <v-container class="image_height" fluid>
                  <v-row no-gutters >
                    <v-col cols="12" sm="4" v-for="item in productItems" :key="item.name">
                      <v-card class="pa-1">
                        <v-img style=" height:400px" class="image_height" v-bind:src="item.image" ></v-img>
                        <v-divider></v-divider>
                        <p><span id="td_name"  > {{ item.name }} </span></p> <br>
                        <span id="product_item_description" class="pa-1" > {{ item.description }} </span> 
                        <v-divider></v-divider>
                        <p id="price_text" class="pa-2">{{ item.price }} DKK</p>
                          <v-btn class="add_to_cart" small text @click="addToBasket(item)" color="pink" dark>
                            ADD TO CART    
                              <v-icon color="pink">
                                  add_shopping_cart
                              </v-icon>
                          </v-btn>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-container>
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
      this.$store.dispatch('setProductItems')
    },
    methods: {
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
      productItems() {
        return this.$store.getters.getProductItems

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

#info {
    background-color: white;
}
tr th {
  font-weight: 300;
}
#td_name {
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-content: center;
  padding: 5px;
  margin: 0;
  font-size: 20px;
  color: map-get($colorz, pink);
  
}

#product_item_description {
  display: flex;
  justify-content: center;
  font-style: italic;
  font-weight: 300;
  color: map-get($colorz, pink);
  font-size: 15px;
  
}

#price_text {
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-content: center;
  padding: 10px;
  font-size: 20px;
  color: map-get($colorz, dark);
}

.add_to_cart {
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-content: center;
  padding: 5px;
  margin: 0;
  font-size: 20px;
  color: map-get($colorz, pink);
}

#td_productitem_img {
  
  max-width: 40px;
  max-height: 40px;
  padding: 0;

}

.image_height {
  
}

#headline {
  display: flex;
  justify-content: center;
  color: map-get($colorz, pink);
  font-size: 30px;
  padding: 20px;
}

  






  


</style>