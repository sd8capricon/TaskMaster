export const postData = async (updateTasks: Task[]) => {
    console.log("Tasks to update\n", updateTasks)
    const reqBody = { tasks: updateTasks }
    let res = await fetch("http://localhost:3000/task", {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reqBody)
    })
    res = await res.json()
    console.log(res)

}

export const postAndDeleteData = (updateTasks: Task[], deleteTasks: Task[]) => {
    console.log("Tasks to delete\n", deleteTasks)
    console.log("Tasks to update\n", updateTasks)
}