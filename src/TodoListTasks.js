import React from 'react';
import './App.css';
import TodoListTask from "./TodoListTask";

class TodoListTasks extends React.Component {

    render = () => {

        let tasksElements = this.props.tasks.map(task => <TodoListTask key={task.id} deleteTask={this.props.deleteTask}
                                                                       toDoListId={this.props.toDoListId}
                                                                       task={task}
                                                                       changeStatus={this.props.changeStatus}
                                                                       changeTitle={this.props.changeTitle}
        />);


        return (
            <div className="todoList-tasks">
                {tasksElements}
            </div>
        );
    }
}

export default TodoListTasks;

