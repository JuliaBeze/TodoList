import {createStore} from "redux";
import {api} from "./api";
import {TaskType, TodoType} from "./types/entities";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AppStateType} from "./store";

export const ADD_TODOLIST = "App/reducer/ADD-TODOLIST";
export const ADD_TASK = "TodoList/Reducer/ADD-TASK";
export const CHANGE_TASK = "TodoList/Reducer/CHANGE-TASK";
export const DELETE_TASK = "TodoList/Reducer/ DELETE-TASK";
export const DELETE_TODOLIST = "TodoList/Reducer/DELETE-TODOLIST";
export const SET_TODOLIST="App/reducer/SET-TODOLIST";
export const SET_TASKS = "TodoList/Reducer/SET-TASKS";
export const UPDATE_TODOLIST_TITLE = "TodoList/Reducer/UPDATE_TODOLIST_TITLE";


type InitialStateType = {
    toDoLists:TodoType[]
}

const initialState:InitialStateType = {
    toDoLists: []
}
const reducer = (state:InitialStateType = initialState, action: AppActionType) => {
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
            };
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

            };
        case CHANGE_TASK :
            return {
                ...state,
                toDoLists: state.toDoLists.map(tl => {
                    if (tl.id === action.todolistId) {
                        return {
                            ...tl,
                            tasks: tl.tasks.map(t => {
                                if (t.id !== action.taskId) {
                                    return t;
                                } else {
                                    return {...t, ...action.obj};
                                }
                            })
                        }
                    } else {
                        return tl
                    }
                })
            };

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
};
createStore(reducer);

export const AddTodoListAC = (newTodoList:TodoType):AddTodoListActionType => ({type: ADD_TODOLIST,newTodoList});
export const AddTaskAC = (newTask:TaskType, todoListId:string):AddTaskActionType =>({type: ADD_TASK, newTask, todoListId});
export const changeTaskAC = (taskId:string, obj:any, todolistId:string):changeTaskActionType => ({type: CHANGE_TASK,taskId, obj, todolistId});
export const DeleteTaskAC = (toDoListId:string, taskId:string):DeleteTaskActionType => ({type: DELETE_TASK, toDoListId, taskId});
export const DeleteTodoListAC = (id:string):DeleteTodoListActionType => ({type: DELETE_TODOLIST, id});
export const setTodoListAC = (toDoLists: TodoType[], todoType: TodoType):SetTodoListActionType => ({type: SET_TODOLIST,toDoLists});
export const SetTasksAC = (tasks:TaskType[],toDoListId:string):SetTasksActionType => ({type: SET_TASKS,tasks,toDoListId});
export const updateTodoListAC = (todolistId: string, s: string):UpdateTodoListActionType => ({type: UPDATE_TODOLIST_TITLE, todolistId});

//ACTION CREATORS TYPES

type AddTodoListActionType = {
    type: typeof ADD_TODOLIST,
    newTodoList:TodoType
};
type AddTaskActionType = {
    type: typeof ADD_TASK,
    todoListId:string,
    newTask:TaskType
};
type changeTaskActionType = {
    type:typeof CHANGE_TASK,
    taskId:string,
    obj:any,
    todolistId:string
}
type DeleteTaskActionType = {
    type:typeof DELETE_TASK,
    toDoListId:string,
    taskId:string
}
type DeleteTodoListActionType = {
    type:typeof DELETE_TODOLIST,
    id:string
}
type SetTodoListActionType = {
    type: typeof SET_TODOLIST,
    toDoLists:TodoType[]

}
type SetTasksActionType = {
    type:typeof SET_TASKS,
    tasks:TaskType[],
     toDoListId:string
}
type UpdateTodoListActionType = {
    type:typeof UPDATE_TODOLIST_TITLE,
    todolistId:string
}


type TodoActionTypes = AddTodoListActionType | AddTaskActionType | changeTaskActionType |
    DeleteTaskActionType | DeleteTodoListActionType | SetTodoListActionType |
    SetTasksActionType | UpdateTodoListActionType;

type AppActionType = TodoActionTypes;

type ThunkType = ThunkAction <void, AppStateType, unknown, AppActionType>;

type ThunkDispatchType = ThunkDispatch <AppStateType, unknown, AppActionType>;

export const setTasksTC = (todoListId:string): ThunkType => {
    return(dispatch:ThunkDispatchType) => {
        api.getTasks(todoListId)
            .then(res=>{
                dispatch(SetTasksAC(res.data.items,todoListId))
            })
    }
};
export const addTaskTC = (newText:string, todoListId:string): ThunkType=> {
    return(dispatch:ThunkDispatchType)=>{
        api.createTask(newText, todoListId).then(res=> {
                let newTask = res.data.data.item;
                dispatch(AddTaskAC(newTask,todoListId))
            })
    }
};

export const deleteTaskTC = (toDoListId:string, taskId:string):ThunkType=> {
    return(dispatch:ThunkDispatchType)=> {
        api.deleteTask(taskId)
            .then(res =>{
                dispatch(DeleteTaskAC(toDoListId, taskId))
                }
            );
    }
};


export const deleteToDoListTC =(todoListId:string):ThunkType=>{
    return(dispatch:ThunkDispatchType)=> {
        api.deleteToDoList(todoListId)
            .then(res => {
                dispatch(DeleteTodoListAC(todoListId))
            });
    }
};
export const updateTitleTodoListTC = (newTodoListTitle:string,todolistId:string):ThunkType=> {

    return(dispatch:ThunkDispatchType)=> {
        api.updateTitleTodoList(newTodoListTitle,todolistId)
            .then(res => {
                dispatch(updateTodoListAC( newTodoListTitle,todolistId));
            });
    }
};
export const addTodoListTC = (toDoLists:string):ThunkType => {
    return(dispatch:ThunkDispatchType)=>{
        api.createTodoList(toDoLists)
            .then(res => {
                let todoLists = res.data.data.item;
                dispatch(AddTodoListAC(todoLists))
            })
    }
};

export const setTodoListTC =(toDoLists:TodoType):ThunkType=> {
    return(dispatch:ThunkDispatchType)=> {
        api.getTodoLists()
            .then(res=>{
                dispatch(setTodoListAC(res.data,toDoLists))
            })
    }
};

export const  changeTaskTC = (taskId:string, todoId:string, task:TaskType, obj:any):ThunkType => (dispatch:ThunkDispatchType) => {
    api.updateTask(task)
        .then(res => {
            dispatch(changeTaskAC(taskId, obj, todoId))
        })
};
export default reducer;

