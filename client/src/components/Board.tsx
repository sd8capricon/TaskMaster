import { useContext, useState } from "react"

// Context
import BoardDispatchContext from "../context/boardDispatch"
import DraggedTaskContext from "../context/draggedTask"

// Components
import List from "../components/List"

const Board: React.FC<{
    board: BoardState
}> = ({ board }) => {

    // State
    const [draggedTask, setDraggedTask] = useState<Task>({ id: 0, name: "", order: 0, status: "backlog", board: 0 });
    // Context
    const boardDispatch = useContext(BoardDispatchContext)

    // Function to add new status list
    const addNewStatusList = (e: React.MouseEvent) => {
        e.preventDefault()
        boardDispatch!({ type: "ADD_STATUS", payload: { status: "Foo" } })
    }

    return (
        <>
            <h1 className="pl-12 bg-white opacity-50 text-4xl">{board.name}</h1>
            <div className="px-10 py-4 flex items-start board">
                <DraggedTaskContext.Provider value={{ draggedTask, setDraggedTask }}>
                    {
                        <>
                            {Object.keys(board.tasks).map((status, key) =>
                                <List
                                    key={key}
                                    className="mr-10"
                                    title={status}
                                    board={board} />
                            )}
                            <button onClick={addNewStatusList}>Create New List</button>
                        </>
                    }
                </DraggedTaskContext.Provider >
            </div>
        </>
    )
}

export default Board