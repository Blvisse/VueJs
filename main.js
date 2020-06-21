Vue.component('product', {

  template: `
  <div class="product">
                <div class="product-image">
                    <img v-bind:src="image">
                </div>
                <div class="product-info">
                    <h1>
                             {{ title }}
                    </h1>
                    <p  > {{ description }}
                       
                    </p>
                    <a :href='google'>Click here to shop</a>
                    <p v-if='Inventory >10'>In stock</p>
                    <p v-else-if='Inventory<=10 && Inventory>0'>Almost outta Stock</p>
                    <p v-else='Inventory==0' :class='{outofstock: !InStock}'>It's Gone fellas</p>
                    <p v-show='Inventory>10'>On Sale</p>
                    <ul>
                    <li v-for='detail in details'>{{detail}}</li>
                    </ul>
                    <div v-for='variant in variants' vi-bind:key='variant.variantId'
                    class="color-box"
                    v-bind:style='{backgroundColor:variant.variantcolor}'
                    v-on:mouseover='changePic(variant.variantImage)'
                    >
                        
                    </div> 
                    <button v-on:click='addToCart' 
                    :disabled='!InStock'
                    :class="{ disabledButton: !InStock}">Add to Cart</button>
                    <button v-on:click='removeFromCart' 
                    :disabled='!InStock'
                    :class='{disabledButton: !InStock}'>Remove from Cart</button>
                    <div class="cart">Cart{{cart}}</div>
                </div>

  
            </div>
  
  
  
  `,
  data() {
    return {
      brand: 'Blain Tech',
      product: 'Socks',
      description: 'This is the description of the product',
      image: './socks.jpg',
      google: 'https://google.com',
      Inventory: 0,
      InStock: false,
      details: ['BadAss', 'Extra Comfy', 'Always Swaggy'],
      variants: [{
        variantId: 23456,
        variantcolor: 'Green',
        variantImage: './socks.jpg'

      },
      {
        variantId: 2789,
        variantcolor: 'Blue',
        variantImage: './socks-blue.jpg'
      }],
      cart: 0
    }
  },
  methods: {
    addToCart: function () {
      this.cart += 1
    },
    changePic: function (variantImage) {
      this.image = variantImage
    },
    removeFromCart: function () {
      this.cart--
    }
  },
  computed:
  {
    title () {
      return this.brand + ' ' + this.product
    }
  }

})

var app = new Vue({
  el: '#app'
})
