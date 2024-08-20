import { useEffect, useReducer, useState } from "react";
import Sidebar from "./components/Sidebar";
// import List from "./components/List";
import NewList from "./components/NewList"
import TaskContext from "./context/context";
import boardReducer from "./reducers/boardReducer";
import boards from "./fakeDB"
import Navbar from "./components/Navbar";

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

interface TaskLayout {
  [key: string]: Task[],
  backlog: Task[],
  todo: Task[]
  in_progress: Task[]
  completed: Task[]
}

const App: React.FC<{}> = () => {

  // const [draggedTask, setDraggedTask] = useState<draggedTask>({ task: "", list: "", dragOverItem: { task: "", list: "" } });
  const [draggedTask, setDraggedTask] = useState<Task>({ id: 0, name: "", order: 0, status: "backlog" });
  const [board, dispatch] = useReducer(boardReducer, boards[0])
  const [tasks, setTasks] = useState<TaskLayout>({ backlog: [], todo: [], in_progress: [], completed: [] })

  useEffect(() => {
    const newTasks: TaskLayout = { backlog: [], todo: [], in_progress: [], completed: [] }
    // get task list from server
    for (let status in newTasks) {
      newTasks[status].push(
        ...b.tasks.filter(t => t.status === status)
          .sort(sortTaskAscending)
      )
    }
    setTasks(newTasks)
  }, [])


  return (
    <div className="h-full">
      {/* Navbar */}
      <Navbar />
      <div className="flex h-full">
        <Sidebar />
        <div className="bg-emerald-700 flex-grow">
          <h1 className="pl-12 bg-white opacity-50 text-4xl">{board.title}</h1>
          <div className="px-10 py-4 flex items-start board">
            <TaskContext.Provider value={{ draggedTask, setDraggedTask }}>
              {
                <>
                  <NewList
                    className="mr-10"
                    title="backlog"
                    tasks={tasks}
                    setTasks={setTasks}
                  />
                  <NewList
                    className="mr-10"
                    title="todo"
                    tasks={tasks}
                    setTasks={setTasks}
                  />
                  <NewList
                    className="mr-10"
                    title="in_progress"
                    tasks={tasks}
                    setTasks={setTasks}
                  />
                  <NewList
                    className="mr-10"
                    title="completed"
                    tasks={tasks}
                    setTasks={setTasks}
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
