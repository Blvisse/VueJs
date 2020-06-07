var app = new Vue({
  el: '#app',
  data: {
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
