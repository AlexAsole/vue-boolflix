new Vue({
    el:'#root',
    data: {
        movies: [],
        searchMovie: ''
    },
    methods: {
        createMoviesList: function() {
            const self = this;
            axios
                .get(`https://api.themoviedb.org/3/search/movie?api_key=beb26a5871cd03140d2c6b0bb0463b7e&query=${self.searchMovie}`)
                .then(function(resp) {
                    self.movies = resp.data.results
                    self.searchMovie = ''
                })
        }
    }
}) 
Vue.config.devtools = true;