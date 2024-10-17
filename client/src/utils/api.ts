const requestHeader = {
    'Content-Type': 'application/json'
}


export const getAllBoards = async () => {
    let res = await fetch("http://localhost:3000/board")
    let boards = await res.json() as BoardWithoutTasks[]
    return boards
}

export const editBoardName = async (board: BoardWithoutTasks) => {
    const reqBody = { board }
    let res = await fetch("http://localhost:3000/board", {
        method: "PUT",
        headers: requestHeader,
        body: JSON.stringify(reqBody)
    })
    res = await res.json()
    console.log(res);

}

export const createBoard = async (boardName: string) => {
    const reqBody = {
        board: { name: boardName }
    }
    let res = await fetch("http://localhost:3000/board", {
        method: "POST",
        headers: requestHeader,
        body: JSON.stringify(reqBody)
    })
    let board = await res.json() as BoardWithoutTasks

    return board
}

export const deleteBoard = async (boardId: number) => {
    const reqBody = { searchId: boardId }
    let res = await fetch(`http://localhost:3000/board/${boardId}`, {
        method: "DELETE",
        headers: requestHeader,
        body: JSON.stringify(reqBody)
    })
    res = await res.json()
}

export const postData = async (updateTasks: Task[]) => {
    const reqBody = { tasks: updateTasks }
    let res = await fetch("http://localhost:3000/task", {
        method: "PATCH",
        headers: requestHeader,
        body: JSON.stringify(reqBody)
    })
    res = await res.json()
}

export const postAndDeleteData = async (updateTasks: Task[], deleteTasks: Task[]) => {
    const reqBody = { deleteTasks, updateTasks }
    let res = await fetch("http://localhost:3000/task/update-and-delete", {
        method: "PATCH",
        headers: requestHeader,
        body: JSON.stringify(reqBody)
    })
    res = await res.json()
}