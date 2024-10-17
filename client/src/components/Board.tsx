import { useContext, useState } from "react"

// Context
import BoardDispatchContext from "../context/boardDispatch"
import DraggedTaskContext from "../context/draggedTask"

// Components
import List from "../components/List"
import PrimaryBtn from "./PrimaryBtn"

interface Props {
    board: BoardState
}

const Board: React.FC<Props> = ({ board }) => {

    // State
    const [draggedTask, setDraggedTask] = useState<Task>({ id: 0, name: "", order: 0, status: "backlog", board: 0 });
    const [addingStatusList, setAddingStatusList] = useState<boolean>(false)
    // Context
    const boardDispatch = useContext(BoardDispatchContext)

    // Function to add new status list
    const addNewStatusList = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const target = e.target as HTMLFormElement
        const value = target.list.value
        boardDispatch!({ type: "ADD_STATUS", payload: { status: value } })
        setAddingStatusList(false)
    }

    return (
        <>
            <h1 className="pl-12 py-1.5 bg-white opacity-50 text-4xl">{board.name}</h1>
            <div className="px-10 py-4 flex items-start board overflow-x-scroll no-scrollbar">
                <DraggedTaskContext.Provider value={{ draggedTask, setDraggedTask }}>
                    {Object.keys(board.tasks).map((status, key) =>
                        <List
                            key={key}
                            className="mr-10"
                            title={status}
                            board={board} />
                    )}
                    {
                        addingStatusList ?
                            <form onSubmit={addNewStatusList} className="shrink-0 w-64 px-4 py-5 bg-black text-gray-300 rounded-xl h-fitk mb-3">
                                <input
                                    className="px-3 pt-1.5 pb-6 mb-3 w-full bg-gray-800 rounded-lg"
                                    type="text"
                                    name="list"
                                    placeholder="Enter a title for this List"
                                />
                                <div className="flex">
                                    <PrimaryBtn type="submit" className="mr-4">Add</PrimaryBtn>
                                    <button onClick={() => setAddingStatusList(false)}>x</button>
                                </div>
                            </form> :
                            <PrimaryBtn onClick={(_) => setAddingStatusList(true)}>Create New List</PrimaryBtn>
                    }
                </DraggedTaskContext.Provider >
            </div>
        </>
    )
}

export default Board