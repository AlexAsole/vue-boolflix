new Vue({
    el:'#root',
    data: {
        combined: [],
        movies: [],
        tvSeries: [],
        searchProduct: '',
        type: 'Totale',
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
                        self.combined = [...self.combined, ...self.movies]
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
                        self.combined = [...self.combined, ...self.tvSeries]
                        self.searchProduct = '';
                    })
        },
        voteTo5: function(element) {
            return Math.round(element/2)
        },
        exist: function(e) {
            return e.length > 0
        },
        sameTitle: function(e) {
            return e.title !== e.original_title
        }
    }
}) 
Vue.config.devtools = true;

