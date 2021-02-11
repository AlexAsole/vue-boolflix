new Vue({
    el:'#root',
    data: {
        movies: [],
        tvSeries: [],
        searchProduct: '',
        flags: ['it','cn','de','en','es','fr','ja','ko','ru','pt','nl']
    },
    methods: {
        createProductsList: function() {
            const self = this;
            axios
                .get('https://api.themoviedb.org/3/search/movie' ,{
                    params:{
                        api_key : 'beb26a5871cd03140d2c6b0bb0463b7e',
                        query : self.searchProduct,
                        language: 'it'
                    }
                })
                .then(function (resp) {
                        self.movies = resp.data.results;
                        self.searchProduct = '';
                    })
            axios
                .get('https://api.themoviedb.org/3/search/tv', {
                    params: {
                        api_key: 'beb26a5871cd03140d2c6b0bb0463b7e',
                        query: self.searchProduct,
                        language: 'it'
                    }
                })
                .then(function (resp) {
                        self.tvSeries = resp.data.results;
                        self.searchProduct = '';
                    })
        },
        voteTo5: function(element) {
            return Math.round(element/2)
        },
        exist: function(e) {
            return e.length > 0
        }
    }
}) 
Vue.config.devtools = true;

