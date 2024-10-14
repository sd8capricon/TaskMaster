import { useReducer, useState } from "react";

// Components
import Sidebar from "./components/Sidebar";
import List from "./components/List"
import Navbar from "./components/Navbar";

// Reducers
import taskReducer from "./reducers/taskReducer";

// Context
import TaskDispatchContext from "./context/taskDispatchContext";
import DraggedTaskContext from "./context/draggedTaskContext";

// Hooks
import useBoard from "./hooks/useBoard";


const App: React.FC<{}> = () => {

  // States
  const [draggedTask, setDraggedTask] = useState<Task>({ id: 0, name: "", order: 0, status: "backlog" });
  const [boardOverview, setBoardOverview] = useState<BoardOverview>({ boardName: "", boardStatusLists: [] })
  // Reducer
  const [tasks, taskDispatch] = useReducer(taskReducer, {})

  // Fetch Data from server
  const { boardName, loading, error } = useBoard(1, taskDispatch, setBoardOverview)

  // Function to add new status list
  const addNewStatusList = (e: React.MouseEvent) => {
    e.preventDefault()
    const newBoardOverview = { ...boardOverview }
    newBoardOverview.boardStatusLists.push("Foo")
    setBoardOverview(newBoardOverview)
    taskDispatch({ type: "ADD_STATUS", payload: { status: "Foo" } })
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
          <h1 className="pl-12 bg-white opacity-50 text-4xl">{boardName}</h1>
          <div className="px-10 py-4 flex items-start board">
            <TaskDispatchContext.Provider value={taskDispatch}>
              <DraggedTaskContext.Provider value={{ draggedTask, setDraggedTask }}>
                {
                  <>
                    {boardOverview.boardStatusLists.map((status, key) =>
                      <List
                        key={key}
                        className="mr-10"
                        title={status}
                        tasks={tasks} />
                    )}
                    <button onClick={addNewStatusList}>Create New List</button>
                  </>
                }
              </DraggedTaskContext.Provider >
            </TaskDispatchContext.Provider>
          </div>
        </div>
      </div>
    </div >
  );
}

export default App
