var app = new Vue({
    el: '#app',
    data: {
        message: 'Micro URL shortening service',
        url: 'enter a URL here..',
        shortURL: 'short url will be here'
    },
    methods: {
        shorten: function() {
            axios.post('/api/shorten', {
                'longURL': this.url
            })
            .bind(this)
            .then(function(response) {
                console.log(response.data.shortURL);
                this.shortURL = response.data.shortURL;
            })
            .catch(function(error) {
                console.log(error);
            });
        }
    }
});
