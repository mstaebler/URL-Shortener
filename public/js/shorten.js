var app = new Vue({
  el: '#app',
  data: {
    message: 'Micro URL shortening service',
    url: 'enter a URL here..'
  },
  methods: {
    shorten: function () {
        axios.post('/api/shorten', {
            'longURL': this.url
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
})
