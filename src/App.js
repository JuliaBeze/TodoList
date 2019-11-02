
import React from 'react';
import './App.css';
import TodoList from "./TodoList";
import AddNewItemForm from "./AddNewItemForm";
import {connect} from "react-redux";
import {ADD_TODOLIST, AddTodoListAC, AddTodolistAC, addTodoListTC, setTodoListAC, setTodoListTC} from "./reducer";
import {api} from "./api";
class App extends React.Component {


    state = {
        toDoLists: [],
    };

    addTodoList = (title) => {
        this.props.addTodoList(title)
    };

    componentDidMount() {
        this.restoreState();
    }

    restoreState = () => {
        debugger
        this.props.setTodoList()
    };

    render = () => {
        const toDoLists = this.props.toDoLists.map(tl => <TodoList key={tl.id} id={tl.id} title={tl.title}
                                                                   tasks={tl.tasks}/>)
        return (
            <>
                <div className="page">
                    <h1 className="header">TodoList</h1>
                    <div className="description">
                        <h1>Welcome to my todoList applications</h1>
                        <AddNewItemForm
                            addItem={this.addTodoList}/>
                    </div>
                </div>
                <div className="App">
                    {toDoLists}
                </div>
            </>
        );
    }
}

const mapStateToProps = (state)=>{
    return {
        toDoLists: state.toDoLists
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        addTodoList(newTodoList) {
            dispatch(addTodoListTC(newTodoList))
        },
        setTodoList(toDoLists){
            dispatch(setTodoListTC(toDoLists))
        }
    }
}

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App)


export default ConnectedApp;

