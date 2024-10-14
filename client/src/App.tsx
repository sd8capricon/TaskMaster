import { useReducer, useState } from "react";

// Components
import Sidebar from "./components/Sidebar";
import List from "./components/List"
import TaskContext from "./context/context";
import Navbar from "./components/Navbar";

// Reducers
import taskReducer from "./reducers/taskReducer";
import boardReducer from "./reducers/boardReducer";

// Hooks
import useBoard from "./hooks/useBoard";


const App: React.FC<{}> = () => {

  // State
  const [draggedTask, setDraggedTask] = useState<Task>({ id: 0, name: "", order: 0, status: "backlog" });
  // Reducers
  // This reducer could have been state as well but to learn reducer patterns its a reducer
  const [boardOverview, boardOverviewDispatch] = useReducer(boardReducer, { boardName: "", boardStatusLists: ["backlog", "todo", "in_progress", "completed"] })
  const [tasks, taskDispatch] = useReducer(taskReducer, { backlog: [], todo: [], in_progress: [], completed: [] })

  // Fetch Data from server
  const { boardName, loading, error } = useBoard(1, taskDispatch, boardOverviewDispatch)

  // Function to add new status list
  const addNewStatusList = (e: React.MouseEvent) => {
    e.preventDefault()
    boardOverviewDispatch({ type: "ADD_STATUS", paylod: "Foo" })
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
            <TaskContext.Provider value={{ draggedTask, setDraggedTask }}>
              {
                <>
                  {boardOverview.boardStatusLists.map((status, key) =>
                    <List
                      key={key}
                      className="mr-10"
                      title={status}
                      tasks={tasks}
                      taskDispatch={taskDispatch} />
                  )}
                  <button onClick={addNewStatusList}>Create New List</button>
                </>
              }
            </TaskContext.Provider >
          </div>
        </div>
      </div>
    </div >
  );
}

export default App
