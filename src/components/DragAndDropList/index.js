import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import MovieCardItem from "../MovieCardItem";
import { connect } from "react-redux";
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
const reorder = (list, startIndex, endIndex) => {
  console.log("REORDER FUNCTION", list, startIndex, endIndex)
  // if the selected movie is moved down, subtract one from the rank of all the movies it passed

  // if the selected movie is moved up, add one to the rank of all the movies it passed
  list.map((movie,index)=>{
    if (index > startIndex && index <= endIndex){
      debugger
    }

    if (index < startIndex && index >= endIndex){
      debugger
    }
  })
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? 'lightgreen' : 'grey',

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  padding: grid,
  width: 250,
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
      result.destination.index
    )

    this.setState({
      items,
    })

  }

  render() {
    return(
      <div>THIS IS DRAG AND DROP LIST
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
                          provided.draggableProps.style
                        )}
                      >
                      <MovieCardItem movie={item}/>
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
