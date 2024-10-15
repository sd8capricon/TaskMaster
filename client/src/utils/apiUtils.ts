export const postData = (updateTasks: Task[]) => {
    console.log("Tasks to update\n", updateTasks)
}

export const postAndDeleteData = (updateTasks: Task[], deleteTasks: Task[]) => {
    console.log("Tasks to delete\n", deleteTasks)
    console.log("Tasks to update\n", updateTasks)
}