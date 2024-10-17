import { useContext, useState } from "react"

// Context
import BoardDispatchContext from "../context/boardDispatch"
import DraggedTaskContext from "../context/draggedTask"

// Components
import List from "../components/List"
import PrimaryBtn from "./PrimaryBtn"

// Utils
import { editBoardName } from "../utils/api"

interface Props {
    board: BoardState
}

const Board: React.FC<Props> = ({ board }) => {

    // State
    const [editingBoardName, setEditingBoardName] = useState<boolean>(false)
    const [draggedTask, setDraggedTask] = useState<Task>({ id: 0, name: "", order: 0, status: "backlog", board: 0 });
    const [addingStatusList, setAddingStatusList] = useState<boolean>(false)
    // Context
    const boardDispatch = useContext(BoardDispatchContext)

    // Function to edit board name
    const handleBoardEdit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const target = e.target as HTMLFormElement
        const value = target.boardName.value
        boardDispatch!({
            type: "EDIT_BOARD_NAME",
            payload: { newBoardName: value }
        })
        editBoardName({ id: board.id, name: value })
        setEditingBoardName(false)
    }

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
            {editingBoardName ?
                <form onSubmit={handleBoardEdit} className="pl-12 py-1.5 bg-white opacity-50 flex items-center">
                    <input
                        className="text-2xl mr-2 p-2"
                        placeholder={board.name}
                        type="text"
                        name="boardName"
                    />
                    <PrimaryBtn className="mr-2">Change</PrimaryBtn>
                    <button onClick={() => setEditingBoardName(false)}>
                        <svg className="size-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </button>
                </form> :
                <h1 className="pl-12 py-1.5 bg-white opacity-50 text-4xl flex items-center">
                    {board.name}
                    <button onClick={() => setEditingBoardName(true)} className="mx-2">
                        <svg className="size-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                        </svg>
                    </button>
                </h1>
            }

            {
                addingStatusList ?
                    <PrimaryBtn className="ml-10 mt-5" onClick={(_) => setAddingStatusList(false)}>Cancel</PrimaryBtn> :
                    <PrimaryBtn className="ml-10 mt-5" onClick={(_) => setAddingStatusList(true)}>Create New List</PrimaryBtn>
            }

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
                        addingStatusList &&
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
                        </form>
                    }
                </DraggedTaskContext.Provider >
            </div>
        </>
    )
}

export default Board