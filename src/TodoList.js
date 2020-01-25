import React from 'react';
import './App.css';
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";
import TodoListTitle from "./TodoListTitle";
import AddNewItemForm from "./AddNewItemForm";
import {connect} from "react-redux";
import {
    addTaskTC, changeTaskTC, deleteTaskTC,
    deleteToDoListTC, setTasksTC, updateTitleTodoListTC,

} from "./reducer";
import s from './TodoList.module.css'

class TodoList extends React.Component {

    constructor(props) {
        super(props);
        this.newTasksTitileRef = React.createRef();

    }

    componentDidMount() {
        this.restoreState();
    }



    restoreState = () => {
        this.props.setTasks(this.props.id)
    };

    state = {
        tasks: [],
        filterValue: "All"
    };

    addTask = (newText) => {
        this.props.addTask(newText,this.props.id)
    };

    deleteTask = (taskId) => {
        this.props.deleteTask(this.props.id, taskId)
    };


    deleteToDoList = () => {
        this.props.deleteToDoList(this.props.id)
    };

    changeFilter = (newFilterValue) => {
        this.setState( {
            filterValue: newFilterValue}
        )};

    updateTodoTitle = (newTodoListTitle) => {
        this.props.updateTodoTitle(newTodoListTitle, this.props.id)
    };

    changeTask = (taskId,obj) => {
        this.props.changeTask(taskId,obj,this.props.id)
    };

    changeStatus = (taskId, isDone) => {
        this.changeTask(taskId, {isDone: isDone});
    }
    changeTitle = (taskId, title) => {
        this.changeTask(taskId, {title: title});
    }


    render = () => {
        let {tasks=[]} = this.props;

        return (

            <div className={s.todoList}>
                <div className={s.todoTitle}>
                    <TodoListTitle updateTodoTitle={this.updateTodoTitle}
                                   title={this.props.title}
                                   id={this.props.id}/></div>
                <button className={s.deleteTodoList} onClick={this.deleteToDoList}>X</button>
                <div className={s.addForm}>
                    <AddNewItemForm addItem={this.addTask}/>
                </div>



                <TodoListTasks
                    deleteTask={this.deleteTask}
                    toDoListId={this.props.toDoListId}
                    changeStatus={this.changeStatus}
                    changeTitle={this.changeTitle}
                    tasks={tasks.filter(t => {
                        if (this.state.filterValue === "All") {
                            return true;
                        }
                        if (this.state.filterValue === "Active") {
                            return t.isDone === false;
                        }
                        if (this.state.filterValue === "Completed") {
                            return t.isDone === true;
                        }
                    })}/>
                <div className="footer">
                    <TodoListFooter changeFilter={this.changeFilter} filterValue={this.state.filterValue}/>
                </div>



            </div>

        );
    }
}

const mapDispatchToProps = (dispatch)=> {
    return {
        addTask(newText, todoListId) {
            dispatch(addTaskTC(newText, todoListId));

        },
        changeTask(taskId,obj,todoListId) {
            dispatch(changeTaskTC(taskId,obj,todoListId))
        },
        deleteTask(toDoListId, taskId) {
            dispatch(deleteTaskTC(toDoListId, taskId))
        },
        deleteToDoList (id){
            dispatch(deleteToDoListTC(id))
        },
        setTasks(todoListId){
            let thunk = setTasksTC(todoListId);
            dispatch(thunk);
        },
        updateTodoTitle(newTodoListTitle, todolistId) {
            dispatch(updateTitleTodoListTC(newTodoListTitle, todolistId));
        }
    }
}

const ConnectedTodoList = connect(null,mapDispatchToProps)(TodoList)
export default ConnectedTodoList;

