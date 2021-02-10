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
                .then(function (resp) {
                        self.movies = resp.data.results;
                        self.voteTo5()
                        self.searchMovie = '';
                    })
        },
        voteTo5: function() {
            this.movies.forEach((item) => {
                item.vote_average = Math.round(item.vote_average / 2)
                })
        }
    }
}) 
Vue.config.devtools = true;