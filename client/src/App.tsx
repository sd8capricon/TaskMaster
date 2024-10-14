import { useReducer, useState } from "react";

// Components
import Sidebar from "./components/Sidebar";
import List from "./components/List"
import TaskContext from "./context/context";
import Navbar from "./components/Navbar";

// Reducers
import taskReducer from "./reducers/taskReducer";

// Hooks
import useBoard from "./hooks/useBoard";


const App: React.FC<{}> = () => {

  const [statuses, setStatuses] = useState<Status[]>(["backlog", "todo", "in_progress", "completed"])
  const [tasks, taskDispatch] = useReducer(taskReducer, { backlog: [], todo: [], in_progress: [], completed: [] })
  const [draggedTask, setDraggedTask] = useState<Task>({ id: 0, name: "", order: 0, status: "backlog" });

  const { boardName, loading, error } = useBoard(1, taskDispatch)

  const addNewStatusList = (e: React.MouseEvent) => {
    e.preventDefault()
    setStatuses([...statuses, "Foo"])
    taskDispatch({ type: "ADD_STATUS", payload: { status: "Foo" } })
  }

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
                  {statuses.map((status, key) =>
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
