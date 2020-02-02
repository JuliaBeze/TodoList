import axios from "axios";

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.0/todo-lists",
    withCredentials: true,
    headers: {"API-KEY": "33b08604-f7c7-406c-9da3-f5d36527b14f"}
});




export const api={
    createTask (newTaskTitle,todolistId){
        return instance.post(`/${todolistId}/tasks/`,
            {title: newTaskTitle}
        )
    },
    deleteTask(id){
        return instance.delete(`/tasks/${id}`
        )
    },

    deleteToDoList (todoListId){
        return instance.delete(`/${todoListId}`)
    },
    createTodoList(title){
        return  instance.post("",
            {title: title}
        )
    },
    getTodoLists(){
        return instance.get("")

    },
    getTasks(id) {
        return instance.get(`/${id}/tasks/`)
    },
    updateTask(task){
        return instance.put(`/tasks`, task)
    },
    updateTitleTodoList(newTodoListTitle, id) {
        return instance.put(
            `/${id}`,
            {title: newTodoListTitle})
    }
};







