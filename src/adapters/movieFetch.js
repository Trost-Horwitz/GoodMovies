// All fetches for movie DB - returns array of objects or single object
const movieFetch = {
  baseURL: "https://api.themoviedb.org/3/",
  key: `?api_key=${process.env.REACT_APP_APIKEY}`,

  parseJson: function(response) {
    return response.json();
  },

  // movieFetch.movieById(15) -> {title:"Citizen Kane", ...}
  movieById: function(id) {
    return fetch(this.baseURL + `movie/${id}` + this.key).then(this.parseJson);
  },

  // movieFetch.recommendedMoviesById(15) -> [{title:"A great movie", ...}, {title:"Another great movie", ...}]
  recommendedMoviesById: function(id, page = 1) {
    return fetch(
      this.baseURL + `movie/${id}/recommendations` + this.key + `&page=${page}`
    )
      .then(this.parseJson)
      .then(json => json.results);
  },

  // movieFetch.nowPlayingMovies() -> [{title:"A current movie", ...}, {title:"Another current movie", ...}]
  nowPlayingMovies: function(page = 1) {
    return fetch(
      this.baseURL + `movie/now_playing` + this.key + `&page=${page}`
    )
      .then(this.parseJson)
      .then(json => json.results);
  },

  // movieFetch.popularMovies() -> [{title:"A popular movie", ...}, {title:"Another popular movie", ...}]
  popularMovies: function(page = 1) {
    return fetch(this.baseURL + `movie/popular` + this.key + `&page=${page}`)
      .then(this.parseJson)
      .then(json => json.results);
  },

  // movieFetch.actorDetailByID(150) -> {name:"RZA", ...}
  actorDetailByID: function(id) {
    return fetch(this.baseURL + `person/${id}` + this.key).then(this.parseJson);
  },

  // movieFetch.castByMovieId(15) -> [{name:"Orson Wells", ...}, {name:"Joseph Cotten", ...}]
  castByMovieId: function(id) {
    return fetch(this.baseURL + `movie/${id}/credits` + this.key)
      .then(this.parseJson)
      .then(json => json.cast);
  },

  // movieFetch.moviesByActorID(150) -> [{character:"Samurai", title: "Ghost Dog: The Way of the Samurai", ...}, {character:"Moses Jones", title: "American Gangster", ...}]
  moviesByActorID: function(id) {
    return fetch(this.baseURL + `person/${id}/movie_credits` + this.key)
      .then(this.parseJson)
      .then(json => json.cast);
  },

  // movieFetch.moviesBySearch("Fast and Furious") -> [{title:"Furious 7", ...}, {title:"The Fast and the Furious", ...}]
  moviesBySearch: function(queryStr, page = 1) {
    return fetch(
      this.baseURL +
        `search/movie` +
        this.key +
        `&query=${encodeURIComponent(queryStr)}&page=${page}`
    )
      .then(this.parseJson)
      .then(json => json.results);
  }
};

export default movieFetch;
