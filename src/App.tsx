import { useState } from "react";
import List from "./components/List";
import TaskContext from "./context/context";

const App = () => {

  const [draggedTask, setDraggedTask] = useState<string>("");
  const [arr1, setArr1] = useState<string[]>(["Helo", "Test"])
  const [arr2, setArr2] = useState<string[]>([])

  return (
    <TaskContext.Provider value={{ draggedTask, setDraggedTask }}>
      <div className="p-10 flex">
        <List className="mr-10" tasks={arr1} setTasks={setArr1} />
        <List tasks={arr2} setTasks={setArr2} />
      </div>
    </TaskContext.Provider>
  );
}

export default App
