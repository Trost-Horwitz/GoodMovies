import React from "react";
import { Link } from "react-router-dom";
import firebase from "firebase";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import MovieCardRow from "../MovieCardRow";
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import movieFetch from "../../adapters/movieFetch";

class UserPage extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      genres:[]
    }
  }

  componentDidMount(){
    // const genres = movieFetch.genres.map(genre=>genre.name)
    // this.setState({...this.state,genres:genres})
  }

  componentDidUpdate(){
    if (!this.state.userMovies){
      const userMovies = Object.values(this.props.reducer.toWatch)
      const genres = this.updateAvalibleGenres(userMovies)
      this.setState({...this.state,userMovies,genres})
    }
  }

  updateAvalibleGenres(movieList){
    let genres = []
     movieList.forEach(movie => movie.genre_ids.forEach(id=> genres.includes(id)? null : genres.push(id)))
     return genres
  }

  handleText = (e) =>{
    const userMovies = Object.values(this.props.reducer.toWatch)
    if (e.target.value !== "" && this.state.userMovies){

      const filteredMovies =  userMovies.filter(movie => movie.title.toLowerCase().includes(`${e.target.value.toLowerCase()}`))
      const genres = this.updateAvalibleGenres(filteredMovies)
      this.setState({...this.state, userMovies:filteredMovies, genres})

    } else {
      const genres = this.updateAvalibleGenres(userMovies)
      this.setState({...this.state,userMovies, genres})
    }
  }




  render(){
    console.log(this.state)
    return (
      <div>
    {firebase.auth().currentUser ?
      <div>
      <h2>Hello {firebase.auth().currentUser.displayName}!</h2>
      <h3>Your Movies To Watch:</h3>
      {Object.keys(this.props.reducer.toWatch).length !== 0 ?
        <React.Fragment>
          <TextField autoFocus id="full-width" label="Search Your Movies By Title" InputLabelProps={{ shrink: true, }} onKeyUp={this.handleText} placeholder="Search..." fullWidth margin="normal"/>

          {this.state.genres.map(genre=>
            <React.Fragment>
              <Checkbox
                checked={null}
                onChange={null}
                value={genre}
                name={genre}
              />
              <label for={genre}>{movieFetch.genres[genre]}</label>
            </React.Fragment>
          )}

          <FormGroup row>
            <FormControlLabel
            control={
              <Checkbox
                checked={null}
                onChange={null}
                value="null"
              />
            }
            label="null"/>
          </FormGroup>

         <MovieCardRow movies={this.state.userMovies} />

       </React.Fragment>
        : <p>Add Movies To Your List!</p>

      }
      </div>


     : <Redirect to='/signin'/>}
    </div>
    );
  }
};


const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(UserPage);
