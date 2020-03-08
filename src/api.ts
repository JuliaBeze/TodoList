import axios from "axios";
import {TaskType, TodoType} from "./types/entities";


type CreateTodoResponseType = {
    data:{
        item: TodoType
    }
    messages:string
    resultCode:number
}

type CreateTaskResponseType = {
    data:{
        item: TaskType
    }
    messages:string
    resultCode:number
}




const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.0/todo-lists",
    withCredentials: true,
    headers: {"API-KEY": "33b08604-f7c7-406c-9da3-f5d36527b14f"}
});




export const api={
    createTask (newTaskTitle:string,todolistId:string){
        return instance.post<CreateTaskResponseType>(`/${todolistId}/tasks/`,
            {title: newTaskTitle}
        )
    },
    createTodoList(title:string){
        return  instance.post<CreateTodoResponseType>("",
            {title: title}
        )
    },
    getTodoLists(){
        return instance.get<TodoType[]>("")

    },


    getTasks(id:string) {
        return instance.get(`/${id}/tasks/`)
    },

    deleteTask(id:string){
        return instance.delete(`/tasks/${id}`
        )
    },

    deleteToDoList (todoListId:string){
        return instance.delete(`/${todoListId}`)
    },

    updateTask(task:TaskType){
        return instance.put<CreateTaskResponseType>(`/tasks`, task)
    },
    updateTitleTodoList(newTodoListTitle:string, id:string) {
        return instance.put(
            `/${id}`,
            {title: newTodoListTitle})
    }
};







