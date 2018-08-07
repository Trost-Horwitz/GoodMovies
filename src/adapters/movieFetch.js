// All fetches for movie DB
const movieFetch = {
  baseURL: "https://api.themoviedb.org/3/",
  key: `?api_key=${process.env.REACT_APP_APIKEY}`,

  parseJson: function(response){
    return response.json()
  },

  // movieFetch.movieById(551)
  movieById: function(id){
    return fetch(this.baseURL + `movie/${id}` + this.key)
    .then(this.parseJson)
  },

  recommendedById: function(id, page=1){
    return fetch(this.baseURL + `movie/${id}/recommendations` + this.key)
    .then(this.parseJson)
  },

  nowPlaying: function(page=1){
    return fetch(this.baseURL + `movie/now_playing` + this.key + `&page=${page}`)
    .then(this.parseJson)
  }

}

export default movieFetch
