import React from 'react';
import s from './TodoListTask.module.css'


class TodoListTask extends React.Component {


    onIsDoneChanged = (e) => {
        this.props.changeStatus(this.props.task.id, e.currentTarget.checked);
    };

    onTitleChanged = (e) => {
        this.setState({title:e.currentTarget.value})
        // this.props.changeTitle(this.props.task.id, e.currentTarget.value);
    };

    state = {
        editMode: false,
        title: this.props.task.title
    };

    activateEditMode = () => {
        this.setState({editMode: true});
    }

    deactivateEditMode= () => {
        this.props.changeTitle(this.props.task.id, this.state.title);
        this.setState({editMode: false});
    }

    onDeleteTask=()=> {
        this.props.deleteTask(this.props.task.id)
    };


    render = () => {

        let containerCssClass = this.props.task.isDone ? "todoList-task done" : "todoList-task";

        return (
            <div>
                <div className={containerCssClass}>
                    <input type="checkbox"
                           checked={this.props.task.isDone}
                           onChange={this.onIsDoneChanged}/>
                    { this.state.editMode
                        ? <input onBlur={this.deactivateEditMode}
                                 onChange={this.onTitleChanged}
                                 autoFocus={true}
                                 value={this.state.title} />
                        : <span onClick={this.activateEditMode}>{this.state.title}</span>
                    }, priority: {this.props.task.priority}
                    <button className={s.deleteTasks} onClick={this.onDeleteTask}>X</button>
                </div>
                </div>
        );
    }
}

export default TodoListTask;

