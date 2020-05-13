<template>
    <v-container>
        <v-row>
            <v-col offset-md="1" md="5">
                
                <div class="pa-2" id="info">
                <h1>NEW ITEM</h1>

                <v-text-field 
                label="PRODUCT NAME"
                required
                v-model="name">
                </v-text-field>

                <v-text-field 
                label="DESCRIPTION"
                required
                v-model="description">
                </v-text-field>

                <v-text-field 
                label="PRICE"
                required
                v-model="price">
                </v-text-field>

                <v-file-input label="File input" @change="uploadImage"></v-file-input>

            





                <v-btn color="complete"
                @click="addNewProductItem()"
                :disabled="btnDisable">
                    ADD ITEM    
                </v-btn>

                <v-btn color="incomplete">
                    CANCEL    
                </v-btn>

                </div>
            </v-col>
          
            <v-col offset-md="1" md="5">
                <div class="pa-2" id="info">
                  <h1>PREVIEW</h1>

                  <v-simple-table id="product-table">
                    <thead>
                        <tr>
                            <th class="text-left" style="width:70%">
                                NAME
                            </th>
                            <th class="text-left" style="width:100px">
                                PRICE
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td>
                                <span id="td_name"> {{ name }} </span><br>
                                <span id="product_item_description"> {{ description }} </span>
                            </td>

                            <td id="preview_productitem_price">
                                {{ price }}
                            </td>
                        </tr>
                    </tbody>
                </v-simple-table>
                  
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { dbProductAdd, fb } from '../../../firebase'

export default {
    data () {
        return {
            name: '',
            description: '',
            price: '',
            image: null,
            btnDisable: true
        }
    },
    methods: {
        uploadImage(e) {
            let file = e;
            console.log(e);
            var storageRef = fb.storage().ref('products/'+ file.name);

            let uploadTask = storageRef.put(file);

                uploadTask.on('state_changed', (snapshot) => {
                
                }, (error) => {
                // Handle unsuccessful uploads
                }, () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    this.image = downloadURL;
                    this.btnDisable = false;
                    console.log('File available at', downloadURL);
                });
                });








        },
        addNewProductItem() {
            dbProductAdd.add({
                name: this.name,
                description: this.description,
                price: this.price,
                image: this.image
            })
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