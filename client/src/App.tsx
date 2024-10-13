import { useEffect, useReducer, useState } from "react";
import Sidebar from "./components/Sidebar";
// import List from "./components/List";
import NewList from "./components/NewList"
import TaskContext from "./context/context";
import Navbar from "./components/Navbar";

import taskReducer from "./reducers/taskReducer";

const b: Board = {
  id: 1,
  name: "yello",
  tasks: [
    {
      id: 3,
      name: "Get eggs",
      order: 1,
      status: "todo"
    },
    {
      id: 15,
      name: "Boo",
      order: 0,
      status: "todo"
    },
    {
      id: 4,
      name: "run",
      order: 0,
      status: "completed"
    }
  ]
}

const sortTaskAscending = (a: Task, b: Task) => a.order - b.order



const App: React.FC<{}> = () => {

  const initialTask: TaskLayout = { backlog: [], todo: [], in_progress: [], completed: [] }

  const [draggedTask, setDraggedTask] = useState<Task>({ id: 0, name: "", order: 0, status: "backlog" });
  // const [tasks, setTasks] = useState<TaskLayout>({ backlog: [], todo: [], in_progress: [], completed: [] })
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
                  <NewList
                    className="mr-10"
                    title="backlog"
                    tasks={tasks}
                    taskDispatch={taskDispatch}
                  />
                  <NewList
                    className="mr-10"
                    title="todo"
                    tasks={tasks}
                    taskDispatch={taskDispatch}
                  />
                  <NewList
                    className="mr-10"
                    title="in_progress"
                    tasks={tasks}
                    taskDispatch={taskDispatch}
                  />
                  <NewList
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
