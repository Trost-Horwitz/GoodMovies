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
      let genres = []
       userMovies.forEach(movie => movie.genre_ids.forEach(id=> genres.includes(id)? null : genres.push(id)))
      this.setState({...this.state,userMovies,genres})
    }
  }

  handleText = (e) =>{
    if (e.target.value !== "" && this.state.userMovies){

      const filteredMovies =  Object.values(this.props.reducer.toWatch).filter(movie => movie.title.toLowerCase().includes(`${e.target.value.toLowerCase()}`))

      const genres = []
      for (let movie of filteredMovies){
      }

      this.setState({...this.state, userMovies:filteredMovies})

    } else {

      this.setState({...this.state,userMovies:Object.values(this.props.reducer.toWatch)})

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
