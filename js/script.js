new Vue({
    el:'#root',
    data: {
        key: 'beb26a5871cd03140d2c6b0bb0463b7e',
        genres: [],
        combined: [],
        movies: [],
        tvSeries: [],
        actors: [],
        searchProduct: '',
        type: 'Totale',
        flags: ['it','cn','de','en','es','fr','ja','ko','ru','pt','nl']
    },
    mounted() {
        const self = this; 
        axios
            .all([
                axios.get('https://api.themoviedb.org/3/genre/movie/list', {
                    params:{
                        api_key : self.key,
                        language: 'it-IT'
                     }
                }),
                axios.get('https://api.themoviedb.org/3/genre/tv/list', {
                    params:{
                        api_key : self.key,
                        language: 'it-IT'
                     }
                })
            ])
            .then(axios.spread((respMovie, respTv) => {
                    let genresMovie = respMovie.data.genres;
                    let genresTv = respTv.data.genres;
                    self.genres = [...genresMovie, ...genresTv]
                }))
    },
    methods: {
        createProductsList: function() {
            const self = this;
            self.combined = [];
            self.movieActors = [];
            self.type = 'Totale';
            axios
                .all([
                    axios.get('https://api.themoviedb.org/3/search/movie', {
                        params: {
                            api_key: self.key,
                            query: self.searchProduct,
                            language: 'it-IT'
                        }
                    }),
                    axios.get('https://api.themoviedb.org/3/search/tv', {
                        params: {
                            api_key: self.key,
                            query: self.searchProduct,
                            language: 'it-IT'
                        }
                    })
                ])
                .then(axios.spread((respMovies, respSeries) => {
                    self.movies = respMovies.data.results
                    self.tvSeries = respSeries.data.results
                    self.combined = [...self.movies,...self.tvSeries]
                }))
        },
        voteTo5: function(element) {
            return Math.round(element/2)
        },
        exist: function(e) {
            return e.length > 0
        },
        sameTitle: function(e) {
            return e.title !== e.original_title
        },
        loadPoster: function(e) {
            return `https://image.tmdb.org/t/p/w342${e.poster_path}`
        },
        loadFlag: function(e) {
            return `img/${e.original_language}.png`
        },
        typeOfSearch: function() {
            if (this.type === 'Totale') {
                return this.combined
            }
            if (this.type === 'Film') {
                return this.movies
            }
            if (this.type === 'Serie TV') {
                return this.tvSeries
            }
        },
        truncateString: function(string, n) {
            if(string.length > n) {
                return string.substring(0, n) + '...'
            } else {
                return string
            }
        },
        printGenres: function(e) {
            this.genres.forEach(element => {
                if(e === element.id) {
                    console.log(element.name)
                    return element.name
                }
            })
        },
        searchActor: function(e) {
            const self = this;
            if (e.title) {
                axios 
                    .get(`https://api.themoviedb.org/3/movie/${e.id}/credits`, {
                        params: {
                            api_key: self.key,
                            language: 'it-IT'
                        }
                    })
                    .then(function(resp) {
                            let array = [];
                            resp.data.cast.forEach(element => {
                                array.push(element.name);
                            });
                            array = array.splice(0,5)
                            self.actors = array
                            
                        })
            }
            if (e.name) {
                axios 
                    .get(`https://api.themoviedb.org/3/tv/${e.id}/credits`, {
                        params: {
                            api_key: self.key,
                            language: 'it-IT'
                        }
                    })
                    .then(function(resp) {
                            let array = [];
                            resp.data.cast.forEach(element => {
                                array.push(element.name);
                            });
                            array = array.splice(0,5)
                            self.actors = array
                        })
            }
        }
    }
}) 
Vue.config.devtools = true;

