import {createStore} from "redux";
import {api} from "./api";

export const ADD_TODOLIST = "App/reducer/ADD-TODOLIST";
export const ADD_TASK = "TodoList/Reducer/ADD-TASK";
export const CHANGE_TASK = "TodoList/Reducer/CHANGE-TASK";
export const DELETE_TASK = "TodoList/Reducer/ DELETE-TASK";
export const DELETE_TODOLIST = "TodoList/Reducer/DELETE-TODOLIST";
export const SET_TODOLIST="App/reducer/SET-TODOLIST";
export const SET_TASKS = "TodoList/Reducer/SET-TASKS";
export const CHANGE_TODOLIST = "TodoList/Reducer/CHANGE-TODOLIST";
export const UPDATE_TODOLIST_TITLE = "TodoList/Reducer/UPDATE_TODOLIST_TITLE";


const initialState = {
    toDoLists: [
        // {"id": 0, "title": "Everyday", tasks: []},
        // {"id": 1, "title": "Tomorrow", tasks: []},
        // {"id": 2, "title": "Every week", tasks: []},
        // {"id": 3, "title": "Every year", tasks: []},
    ]
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TASKS:{
            return {
                ...state,
                toDoLists:state.toDoLists.map(tl=>{
                    if (tl.id === action.toDoListId) {
                        return {...tl,tasks:action.tasks}
                    }else {
                        return tl;
                    }
                })
            }
        }
        case SET_TODOLIST:{
            return {
                ...state,
                toDoLists:action.toDoLists.map(tl=>({...tl,tasks:[]}))
            }
        }
        case ADD_TODOLIST:

            return {
                ...state,
                toDoLists: [...state.toDoLists, action.newTodoList]
            }
        case ADD_TASK:
            return {
                ...state,
                toDoLists: state.toDoLists.map(tl => {
                    if (tl.id === action.todoListId) {
                        return {...tl, tasks: [action.newTask,...tl.tasks]}
                    } else {
                        return tl
                    }
                })

            }
        case CHANGE_TASK :
            return {
                ...state,
                toDoLists: state.toDoLists.map(tl => {
                    if (tl.id === action.todoListId) {
                        return {
                            ...tl,
                            tasks: tl.tasks.map(task => {
                                if (task.id === action.newTask.id) {
                                    return action.newTask
                                } else {
                                    return task
                                }
                            })
                        }
                    } else {
                        return tl
                    }
                })
            }
        case CHANGE_TODOLIST :
            return {
                ...state,
                toDoLists: state.toDoLists.map(tl => {
                    if (tl.id === action.todoListId) {
                        return {
                            ...tl,
                            toDoLists: [...state.toDoLists,action.newTodoList]
                        }
                    } else {
                        return tl
                    }
                })
            }
        case UPDATE_TODOLIST_TITLE:
            return {
                ...state,
                toDoLists: state.toDoLists.map(tl => {
                    if (tl.id === action.todolistId) {
                        return {
                            ...tl, title: action.todolistId
                        }
                    } else {
                        return tl
                    }
                })
            }
        case DELETE_TASK :
            return {
                ...state,
                toDoLists: state.toDoLists.map(tl => {
                    if (tl.id === action.toDoListId) {
                        return {...tl, tasks: tl.tasks.filter(t => t.id !== action.taskId)}
                    }
                    return tl
                })
            }
        case DELETE_TODOLIST:
            return {
                ...state,
                toDoLists: state.toDoLists.filter(tl => tl.id !== action.id)
            }
        default:
            return state
    }
}
createStore(reducer);

export const AddTodoListAC = (newTodoList) => ({type: ADD_TODOLIST,newTodoList})
export const AddTaskAC = (newTask, todoListId) =>({type: ADD_TASK, newTask, todoListId})
export const changeTaskAC = (newTask, todoListId) => ({type: CHANGE_TASK, newTask, todoListId});
export const DeleteTaskAC = (toDoListId, taskId) => ({type: DELETE_TASK, toDoListId, taskId});
export const DeleteTodoListAC = (id) => ({type: DELETE_TODOLIST, id});
export const setTodoListAC = (toDoLists) => ({type: SET_TODOLIST,toDoLists});
export const SetTasksAC = (tasks,toDoListId) => ({type: SET_TASKS,tasks,toDoListId});
export const updateTodoListAC = (todolistId) => ({type: UPDATE_TODOLIST_TITLE, todolistId});




export const setTasksTC = (todoListId)=> {
    return(dispatch) => {
        api.getTasks(todoListId)
            .then(res=>{
                dispatch(SetTasksAC(res.data.items,todoListId))
            })
    }
};
export const addTaskTC = (newText, todoListId)=> {
    return(dispatch)=>{
        api.createTask(newText, todoListId).then(res=> {
                let newTask = res.data.data.item;
                dispatch(AddTaskAC(newTask,todoListId))
            })
    }
};

export const deleteTaskTC = (toDoListId, taskId)=> {
    return(dispatch)=> {
        api.deleteTask(taskId)
            .then(dispatch(DeleteTaskAC(toDoListId, taskId))
            );
    }
};







export const deleteToDoListTC =(todoListId)=>{
    return(dispatch)=> {
        api.deleteToDoList(todoListId)
            .then(res => {
                dispatch(DeleteTodoListAC(todoListId))
            });
    }
};
export const updateTitleTodoListTC = (newTodoListTitle,todolistId)=> {
    debugger
    return(dispatch)=> {
        api.updateTitleTodoList(newTodoListTitle,todolistId)
            .then(res => {
                dispatch(updateTodoListAC( newTodoListTitle,todolistId));
            });
    }
};
export const addTodoListTC = (toDoLists) => {
    return(dispatch)=>{
        api.createTodoList(toDoLists)
            .then(res => {
                let toDoLists = res.data.data.item;
                dispatch(AddTodoListAC(toDoLists))
            })
    }
};

export const setTodoListTC =(toDoLists)=> {
    debugger
    return(dispatch)=> {
        api.getTodoLists()
            .then(res=>{
                dispatch(setTodoListAC(res.data,toDoLists))
            })
    }
};

export const  changeTaskTC = (taskId,obj,todoListId)=> {
    return(dispatch,getState)=> {
        getState()
            .toDoLists.find(tl => tl.id === todoListId)
            .tasks.forEach(t=>{
                if (t.id=== taskId){
                    let newTask = {...t, ...obj}
                    api.updateTask(newTask)
                        .then(res => {
                            dispatch(changeTaskAC(res.data.data.item,todoListId))
                        });
                }
            }
        );
    }
};
export default reducer;

