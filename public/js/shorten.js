var app = new Vue({
    el: '#app',
    data: {
        message: 'Micro URL shortening service',
        url: 'enter a URL here..',
        shortURL: ''
    },
    methods: {
        shorten: function() {
            var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
            var regex = new RegExp(expression);
            if (this.url.match(regex)) {
                axios.post('/api/shorten', {
                    'longURL': this.url
                })
                .bind(this)
                .then(function(response) {
                    console.log(response.data.shortURL);
                    this.shortURL = `http://${response.data.shortURL}`;
                })
                .catch(function(error) {
                    console.log(error);
                });
            } else {
                alert("invalid url!");
            }

        }
    }
});
