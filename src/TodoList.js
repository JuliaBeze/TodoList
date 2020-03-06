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
        this.props.setTasksTC(this.props.id)
    };

    state = {
        tasks: [],
        filterValue: "All"
    };

    addTask = (newText) => {
        this.props.addTaskTC(newText,this.props.id)
    };

    deleteTask = (taskId) => {
        this.props.deleteTask(this.props.id, taskId)
    };


    deleteToDoList = () => {
        this.props.deleteToDoListTC(this.props.id)
    };

    changeFilter = (newFilterValue) => {
        this.setState( {
            filterValue: newFilterValue}
        )};

    updateTodoTitle = (newTodoListTitle) => {
        this.props.updateTitleTodoListTC(newTodoListTitle, this.props.id)
    };

    changeTask = (taskId, obj) => {
        let changedTask = this.props.tasks.find(task => {
            return task.id === taskId
        });
        let task = {...changedTask, ...obj};
        this.props.changeTaskTC(taskId,  obj, task, this.props.id);
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



const ConnectedTodoList = connect(null,{setTasksTC,changeTaskTC,updateTitleTodoListTC,deleteToDoListTC,deleteTaskTC,addTaskTC})(TodoList);
export default ConnectedTodoList;

