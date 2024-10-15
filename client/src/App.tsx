import { useEffect, useReducer, useState } from "react";

// Components
import Sidebar from "./components/Sidebar";
import List from "./components/List"
import Navbar from "./components/Navbar";

// Reducers
import taskReducer from "./reducers/boardReducer";

// Context
import BoardDispatchContext from "./context/boardDispatchContext";
import DraggedTaskContext from "./context/draggedTaskContext";

// Hooks
import useBoard from "./hooks/useBoard";


const App: React.FC<{}> = () => {

  // States
  const [boardId, setBoarId] = useState(1)
  const [draggedTask, setDraggedTask] = useState<Task>({ id: 0, name: "", order: 0, status: "backlog" });

  // Reducer
  const [board, boardDispatch] = useReducer(taskReducer, { name: "", tasks: {}, updateTasks: null, deleteTasks: null })

  // Fetch Data from server
  const { loading, error } = useBoard(boardId, boardDispatch)

  useEffect(() => {
    console.log(board.updateTasks);
  }, [board])

  // Function to add new status list
  const addNewStatusList = (e: React.MouseEvent) => {
    e.preventDefault()
    boardDispatch({ type: "ADD_STATUS", payload: { status: "Foo" } })
  }

  // TODO: Hanlde Error and Loading
  if (loading) return <>Loading</>
  if (error) return <>Some Error</>


  return (
    <div className="h-full">
      {/* Navbar */}
      <Navbar />
      <div className="flex h-full">
        <Sidebar />
        <div className="bg-emerald-700 flex-grow">
          <h1 className="pl-12 bg-white opacity-50 text-4xl">{board.name}</h1>
          <div className="px-10 py-4 flex items-start board">
            <BoardDispatchContext.Provider value={boardDispatch}>
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
            </BoardDispatchContext.Provider>
          </div>
          {/* Check Changing Boards */}
          <button onClick={() => setBoarId(boardId + 1)}>try change Board</button>
        </div>
      </div>
    </div >
  );
}

export default App
