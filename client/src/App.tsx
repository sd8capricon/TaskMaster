import { useEffect, useReducer, useState } from "react";

// Components
import Sidebar from "./components/Sidebar";
import List from "./components/List"
import TaskContext from "./context/context";
import Navbar from "./components/Navbar";

// Reducers
import taskReducer from "./reducers/taskReducer";

// utils
import { sortTaskAscending } from "./utils/taskUtils";

// fakeDB
import { b } from "./fakeDB"


const App: React.FC<{}> = () => {

  const initialTask: TaskLayout = { backlog: [], todo: [], in_progress: [], completed: [] }

  const [draggedTask, setDraggedTask] = useState<Task>({ id: 0, name: "", order: 0, status: "backlog" });
  const [tasks, taskDispatch] = useReducer(taskReducer, initialTask)

  useEffect(() => {
    const newTasks: TaskLayout = { backlog: [], todo: [], in_progress: [], completed: [] }
    // get task list from server
    for (let status in newTasks) {
      newTasks[status].push(
        ...b.tasks.filter(t => t.status === status)
          .sort(sortTaskAscending)
      )
    }
    taskDispatch({ type: "SET_TASKS", payload: newTasks })
  }, [])


  return (
    <div className="h-full">
      {/* Navbar */}
      <Navbar />
      <div className="flex h-full">
        <Sidebar />
        <div className="bg-emerald-700 flex-grow">
          <h1 className="pl-12 bg-white opacity-50 text-4xl">Test</h1>
          <div className="px-10 py-4 flex items-start board">
            <TaskContext.Provider value={{ draggedTask, setDraggedTask }}>
              {
                <>
                  <List
                    className="mr-10"
                    title="backlog"
                    tasks={tasks}
                    taskDispatch={taskDispatch}
                  />
                  <List
                    className="mr-10"
                    title="todo"
                    tasks={tasks}
                    taskDispatch={taskDispatch}
                  />
                  <List
                    className="mr-10"
                    title="in_progress"
                    tasks={tasks}
                    taskDispatch={taskDispatch}
                  />
                  <List
                    className="mr-10"
                    title="completed"
                    tasks={tasks}
                    taskDispatch={taskDispatch}
                  />
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
