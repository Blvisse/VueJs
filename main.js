var eventBus = new Vue()

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
                  <product-tabs :reviews='reviews'></product-tabs>
               
                </div>
  
  </div>
  
  
  
  `,
  data () {
    return {
      brand: 'Blain Tech',
      product: 'Socks',
      description: 'This is the description of the product',
      image: './socks.jpg',
      google: 'https://google.com',
      Inventory: 10,
      InStock: true,
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
      cart: 0,
      reviews: []
    }
  },
  methods: {
    addToCart: function () {
      this.$emit('add-to-cart')
    },
    changePic: function (variantImage) {
      this.image = variantImage
    },
    removeFromCart: function () {
      this.$emit('remove-from-cart')
    }

  },
  mounted () {
    eventBus.$on('review-submitted', productReview => {
      this.reviews.push(productReview)
    })
  },

  computed:
  {
    title () {
      return this.brand + ' ' + this.product
    }
  }

})
Vue.component('product-review', {
  template:
  `
  <form class='review-form' @submit.prevent='onSubmit'>
  <p v-if='errors.length'>
    <b>Please correct the following:</b>
    
    <ul>
      <li v-for='error in errors'>
      <p>{{ errors }}</p>
      </li>
    </ul>
  </p>
  <p>
    <label for='name'>Name:</label>  
    <input id='name' v-model='name'>
  </p>

  <p>
  <label for='review'>Review:</label>
  <textarea id='review' v-model='review'></textarea>
  </p>

  <p>
    <label for='rating'>Rating:</label>
    <select id='rating'v-model.number='rating'>
    <option>5</option>
    <option>4</option>
    <option>3</option>
    <option>2</option>
    <option>1</option>
    
    
    </select>
  </p>
  <p>
  <input type='submit' value='submit'>
  </p>


  </form>
  
  `,
  data () {
    return {

      name: null,
      review: null,
      rating: null,
      errors: []

    }
  },

  methods: {
    onSubmit () {
      if (this.name && this.review && this.rating) {
        const productReview = {
          name: this.name,
          review: this.review,
          rating: this.rating
        }
        eventBus.$emit('review-submitted', productReview)
        this.name = null
        this.review = null
        this.rating = null
      } else {
        if (!this.name) this.errors.push('Name Required.')
        if (!this.review) this.errors.push('Review is required')
        if (!this.rating) this.errors.push('Rating required')
      }
    }
  }

})

Vue.component('product-tabs', {

  props:
  {
    reviews: {
      type: Array,
      required: true
    }
  },

  template: `
  <div>
    <span class='tab'
    :class='{activeTab: selectedTab === tab}'
      v-for='(tab, index) in tabs' :key='index' @click='selectedTab = tab '>
      {{ tab }}

    </span>
  
    <div v-show='selectedTab === "Reviews"'>

      <p v-if='!reviews.length'>There are no reviews yet</p>
      <ul v-else>
      <li v-for='review in reviews' :key='index'>
      <p>{{ review.name }}</p>
      <p>{{ review.review }}</p>
      <p>{{ review.rating }}</p>
      </li>
    
      </ul>
    
    </div>
     <product-review v-show='selectedTab === "Make a Review"'>
      
      </product-review>
    
  </div>


  
  `,
  data () {
    return {
      tabs: ['Reviews', 'Make a Review'],
      selectedTab: 'Reviews'
    }
  }

})

var app = new Vue({
  el: '#app',
  data: {
    premium: false,
    cart: 0
  },
  methods:
  {
    updatecart () {
      this.cart += 1
    },

    removefromcart () {
      this.cart--
    }
  }
})
