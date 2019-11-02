import axios from "axios";

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.0/todo-lists",
    withCredentials: true,
    headers: {"API-KEY": "4824721a-afe7-4f97-9cc2-8e438feb3998"}
});

export const api={
    createTask (newTaskTitle,todolistId){
        return instance.post(`/${todolistId}/tasks/`,
            {title: newTaskTitle}
        )
    },
    deleteTask(taskId){
        debugger
        return instance.delete(`/tasks/${taskId}`
        ).then((response)=> {
            debugger
        }).catch()
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
        return instance.get("/")

    },
    getTasks(id) {
        return instance.get(`/${id}/tasks/`)
    },
    updateTask(task){
        return instance.put(`/tasks/`, task,)
    },

    updateTitleTodoList(newTodoListTitle, id) {
        debugger
        return instance.put(
            `/${id}`,
            {title: newTodoListTitle})
    }
};
