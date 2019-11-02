import React from 'react';
import './App.css';

import s from './AddNewItemForm.module.css'

class AddNewItemForm extends React.Component {
    state = {
        error: false,
        title:""
    };


    onAddItemClick = () => {
        let newText = this.state.title;
        this.setState({title: ""});

        if (newText === "") {
            this.setState({error: true});
        } else {
            this.setState({error: false});
            this.props.addItem(newText);
        }
    }

    onTitleChanged = (e) => {
        this.setState({
            error: false,
            title: e.currentTarget.value,

        });
    }

    onKeyPress = (e) => {
        if (e.key === "Enter") {
            this.onAddItemClick();
        }
    };


    render = () => {
        let classNameForInput = this.state.error ? "error" : "";

        return (

            <div className={s.newTaskForm}>
                <input className={classNameForInput} type="text" placeholder="New item name"
                       onChange={this.onTitleChanged}
                       onKeyPress={this.onKeyPress}
                       value={this.state.title}/>
                <button className={s.addNewForm} onClick={this.onAddItemClick}>Add</button>

            </div>

        );
    }
}

export default AddNewItemForm;

