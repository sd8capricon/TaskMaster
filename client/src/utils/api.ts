export const postData = async (updateTasks: Task[]) => {
    const reqBody = { tasks: updateTasks }
    let res = await fetch("http://localhost:3000/task", {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reqBody)
    })
    res = await res.json()
}

export const postAndDeleteData = async (updateTasks: Task[], deleteTasks: Task[]) => {
    const reqBody = { deleteTasks, updateTasks }
    let res = await fetch("http://localhost:3000/task/update-and-delete", {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reqBody)
    })
    res = await res.json()
    console.log(res);

}