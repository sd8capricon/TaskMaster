import { useEffect, useReducer, useState } from "react"

// Components
import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"
import Board from "./components/Board"

// Reducers
import boardReducer from "./reducers/board"

// Context
import BoardDispatchContext from "./context/boardDispatch"

// Hooks
import useBoard from "./hooks/useBoard"

// Utils
import { postData, postAndDeleteData } from "./utils/api"


const App: React.FC<{}> = () => {

  // States
  const [boardId, setBoarId] = useState(1)
  // const [draggedTask, setDraggedTask] = useState<Task>({ id: 0, name: "", order: 0, status: "backlog", board: 0 });

  // Reducer
  const [board, boardDispatch] = useReducer(boardReducer, { id: 0, name: "", tasks: {}, updateTasks: null, deleteTasks: null })

  // Fetch Data from server
  const { loading, error } = useBoard(boardId, boardDispatch)

  useEffect(() => {
    if (board.updateTasks !== null) {
      if (board.deleteTasks !== null) {
        console.log("Make Request to delete and update as well")
        postAndDeleteData(board.updateTasks, board.deleteTasks)
      }
      else {
        console.log("Make Request to only update")
        postData(board.updateTasks)
      }
    }
  }, [board])

  // TODO: Hanlde Error and Loading
  if (loading) return <>Loading</>


  return (
    <div className="h-full">
      {/* Navbar */}
      <Navbar />
      <div className="flex h-full">
        <Sidebar />
        <div className="bg-emerald-700 flex-grow">
          {
            error ? error :
              <BoardDispatchContext.Provider value={boardDispatch}>
                <Board board={board} />
              </BoardDispatchContext.Provider>
          }
          {/* Check Changing Boards */}
          <button onClick={() => setBoarId(boardId + 1)}>try change Board</button>
        </div>
      </div>
    </div >
  );
}

export default App