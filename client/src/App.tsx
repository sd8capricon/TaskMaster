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
import { getAllBoards, postData, postAndDeleteData } from "./utils/api"


const App: React.FC<{}> = () => {

  // States
  const [allBoards, setAllBoards] = useState<BoardWithoutTasks[]>([])
  const [boardId, setBoardId] = useState(0)

  // Reducer
  const [board, boardDispatch] = useReducer(boardReducer, { id: 0, name: "", tasks: {}, updateTasks: null, deleteTasks: null })

  // Fetch Data from server
  const { loading, error } = useBoard(boardId, boardDispatch)

  useEffect(() => {
    const fetchBoards = async () => {
      if (boardId === 0) {
        const boards = await getAllBoards(); // Await the async call
        setAllBoards(boards)
        setBoardId(boards[0].id)
      }
    };

    fetchBoards();

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
    <>
      {/* Navbar */}
      <Navbar />
      <div className="grid grid-cols-6 h-full">
        <Sidebar boards={allBoards} setBoardId={setBoardId} setAllBoards={setAllBoards} />
        <div className="col-span-5 bg-emerald-700">
          {
            error ? error :
              <BoardDispatchContext.Provider value={boardDispatch}>
                <Board board={board} />
              </BoardDispatchContext.Provider>
          }
        </div>
      </div>
    </>
  );
}

export default App