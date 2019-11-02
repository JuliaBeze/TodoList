import React from 'react';
import './App.css';
import s from './TodoListTitle.module.css'


class TodoListTitle extends React.Component {

    state = {
        editMode:false,
        todoListTitle:this.props.title
    };

    onTodoListClick = ()=> {
        this.setState({editMode:true})
    }

    onTodoTitleChange = (e)=> {
        this.setState({todoListTitle:e.currentTarget.value})
    };

    onUpdateTodoListTitle = ()=>{
        this.setState({editMode:false})
        this.props.updateTodoTitle(this.state.todoListTitle)
    }
    render = () => {

        return (
            <div className={s.todoTitle}>
                {this.state.editMode
                    ? <input type="text" value={this.state.todoListTitle}
                             onChange={this.onTodoTitleChange}
                             onBlur={this.onUpdateTodoListTitle}/>
                    : <h3 className={s.todoList}
                          onClick={this.onTodoListClick}>{this.state.todoListTitle}</h3>}

            </div>
        );
    }
}

export default TodoListTitle;

