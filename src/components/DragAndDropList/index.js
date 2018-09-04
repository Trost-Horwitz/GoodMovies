import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import MovieCardItem from "../MovieCardItem";
import { connect } from "react-redux";
import firebase from "firebase";
import {
  startAddMovieToList,
  startRemoveMovieFromList
} from "../../actions/actions";


const getItems = count =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `item-${k}`,
    content: `item ${k}`,
  }));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex, props) => {
  // console.log("REORDER FUNCTION", list, startIndex, endIndex)

  const uid = firebase.auth().currentUser.uid;

  // if the selected movie is moved down, subtract one from the rank of all the movies it passed

  // if the selected movie is moved up, add one to the rank of all the movies it passed
  list.map((movie,index)=>{

    if (index > startIndex && index <= endIndex){
      // console.log("Movie moved down", parseInt(movie.rank)-1,movie.rank, movie.title, movie.id, movie, {...movie, rank:parseInt(movie.rank)-1})

      props.startAddMovieToList(uid, {...movie, rank:parseInt(movie.rank)-1})
    }

    if (index < startIndex && index >= endIndex){
      // console.log("Movie moved UP", movie.rank, movie.title)
      props.startAddMovieToList(uid, {...movie, rank:parseInt(movie.rank)+1})
    }
  })
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle, item) => {
  return {
  // some basic styles to make the items look a bit nice
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  // displayInside: 'table',
  // gridTemplateColumns: '1fr 2fr',
  // gridTemplateRows:'1fr auto',
  // gridRowGap: '1em',


  // change background colour if dragging
  background: `#eee url(https://image.tmdb.org/t/p/w500/${item.backdrop_path})`,
  backgroundSize: 'cover',

  border: isDragging ? '10px solid lightgreen' : 'none',
  // styles we need to apply on draggables
  ...draggableStyle,
}};

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  padding: grid,
  width: window.width,
});

class DragAndDropList extends Component {
  constructor(props){
    super(props)
    this.state = {
      items: getItems(10)
    }
    this.onDragEnd = this.onDragEnd.bind(this)
  }

  onDragEnd(result){

    if(!result.destination){
      return;
    }


    const items = reorder(
      this.props.movies,
      result.source.index,
      result.destination.index,
      this.props
    )

    this.setState({
      items,
    })

  }

  render() {
    return(
      <div>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                {this.props.movies.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style,
                          item
                        )}
                      >

                      <MovieCardItem movie={item}/>
                      <div style={{background: 'rgba(255,255,255,.8)', padding: '2px'}}>
                        <strong>{item.title} | Rank: {item.rank+1}</strong>
                        <div>{item.overview}</div>
                      </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>

    )
  }

}

const mapStateToProps = state => {
  return { ...state, toWatch: state.reducer.toWatch };
};

const mapDispatchToProps = dispatch => {
  return {
    startAddMovieToList: (id, movie) =>
      dispatch(startAddMovieToList(id, movie)),
    startRemoveMovieFromList: (id, movie) =>
      dispatch(startRemoveMovieFromList(id, movie))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DragAndDropList);
