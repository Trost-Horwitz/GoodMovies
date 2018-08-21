import React from "react";
import firebase from "firebase";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import MovieCardRow from "../MovieCardRow";
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import movieFetch from "../../adapters/movieFetch";
import DragAndDropList from "../DragAndDropList"



class UserPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }


// depending on these lifecyclemethods I don't get content after login or when I change pages

  componentDidMount(){
  //   if (!this.state){
  //   const userMovies = Object.values(this.props.reducer.toWatch)
  //   const genres = this.updateAvalibleGenres(userMovies)
  //   this.setState({...this.state,userMovies,genres})
  // }
  }

  componentDidUpdate(){
    if (!this.state.userMovies){
      const userMovies = Object.values(this.props.reducer.toWatch)
      const genres = this.updateAvalibleGenres(userMovies)
      this.setState({...this.state,userMovies,genres})
    }
  }

  updateAvalibleGenres(movieList){
    let genres = {}
     movieList.forEach(movie => movie.genre_ids.forEach(id=> Object.keys(genres).includes(id)? null : genres[id] = true))
     return genres
  }

  handleText = (e) =>{
    this.setState({searchTerm:`${e.target.value}`})
  }

  checkBoxChange = (e) =>{
    const newGenres = {...this.state.genres}
    newGenres[e.target.value] = !newGenres[e.target.value]
    this.setState({...this.state, genres:newGenres})
  }


  getFilteredMovies(){
    let filteredMovies = Object.values(this.props.reducer.toWatch)

    if (this.state.genres){
      filteredMovies =  filteredMovies.filter(movie =>{
      for (let genreID of movie.genre_ids){
        if (this.state.genres[genreID]){
          return true
        }
      }})
    }

    if (this.state.searchTerm && this.state.userMovies){
      filteredMovies =  filteredMovies.filter(movie => movie.title.toLowerCase().includes(`${this.state.searchTerm.toLowerCase()}`))
    }

    return filteredMovies
  }



  render(){
    console.log("STATE USER PAGE", this.state)
    console.log("PROPS USER PAGE", this.props)
    return (
      <div>
    {firebase.auth().currentUser ?
      <div>
      <h2>Hello {firebase.auth().currentUser.displayName}!</h2>
      <h3>Your Movies To Watch:</h3>
      {this.state.genres?
        <React.Fragment>
          <TextField autoFocus id="full-width" label="Search Your Movies By Title" InputLabelProps={{ shrink: true, }} onKeyUp={this.handleText} placeholder="Search..." fullWidth margin="normal"/>

          {Object.keys(this.state.genres).map(genre=>
            <React.Fragment>
              <Checkbox
                checked={this.state.genres[genre]}
                onChange={this.checkBoxChange}
                value={genre}
                name={genre}
              />
              <label htmlFor={genre}>{movieFetch.genres[genre]}</label>
            </React.Fragment>
          )}

         <MovieCardRow movies={this.getFilteredMovies()} />
         <DragAndDropList />
       </React.Fragment>
        : <p>Add Movies To Your List!</p>

        }
          </div>
         : (
          <Redirect to="/signin" />
        )}

      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(UserPage);
