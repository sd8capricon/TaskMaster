import { useState } from "react";
import List from "./components/List";
import TaskContext, { draggedTaskInterface } from "./context/context";

export interface boardInterface {
  lists: {
    title: string,
    tasks: string[]
  }[]
}

const b: boardInterface = {
  lists: [
    {
      title: "To Do",
      tasks: ["Helo", "Test", "Man"]
    },
    {
      title: "Doing",
      tasks: ["Bye", "Hehehe"]
    }
  ]
}

const App = () => {

  const [draggedTask, setDraggedTask] = useState<draggedTaskInterface>({ task: "", list: "", dragOverItem: { task: "", list: "" } });
  // const [arr1, setArr1] = useState<string[]>(["Helo", "Test"])
  // const [arr2, setArr2] = useState<string[]>([])

  const [board, setBoard] = useState<boardInterface>(b)

  return (
    <TaskContext.Provider value={{ draggedTask, setDraggedTask }}>
      <div className="p-10 flex board">
        {
          board.lists.map((list, i) => <List key={i} title={list.title} tasks={list.tasks} board={board} setBoard={setBoard} />)
        }
      </div>
    </TaskContext.Provider>
  );
}

export default App
