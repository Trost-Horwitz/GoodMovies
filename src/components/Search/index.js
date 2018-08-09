import React from "react";
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import movieFetch from '../../adapters/movieFetch';
import MovieCardRow from "../MovieCardRow";


const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  menu: {
    width: 200,
  },
});

class Search extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      searchTerm:"",
      searchResults:[]
    }
  }

  componentDidMount(){
    movieFetch.popularMovies().then(resp=>this.setState({...this.state, searchResults:resp}));
  }

  handleText = (e) =>{
    if (e.target.value !== ""){
      movieFetch.moviesBySearch(e.target.value).then(resp=>this.setState({...this.state, searchResults:resp}));
    } else {
      movieFetch.popularMovies().then(resp=>this.setState({...this.state, searchResults:resp}));
    }
    this.setState({...this.state, searchTerm:e.target.value});
  }

  render(){
  return(
    <div>
        <TextField
      autoFocus
      id="full-width"
      label="Find Movies By Title"
      InputLabelProps={{
        shrink: true,
      }}
      onKeyUp={this.handleText}
      placeholder="Search..."
      // helperText="Full width!"
      fullWidth
      margin="normal"/>
      <MovieCardRow movies={this.state.searchResults} />
    </div>
    )}

}


export default withStyles(styles)(Search)
