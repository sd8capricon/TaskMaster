import { useReducer, useState } from "react";
import Sidebar from "./components/Sidebar";
import List from "./components/List";
import TaskContext from "./context/context";
import boardReducer from "./reducers/boardReducer";
import boards from "./fakeDB"
import Navbar from "./components/Navbar";


const App: React.FC<{}> = () => {

  const [draggedTask, setDraggedTask] = useState<draggedTask>({ task: "", list: "", dragOverItem: { task: "", list: "" } });
  const [board, dispatch] = useReducer(boardReducer, boards[0])

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
                board.lists.map((list, i) =>
                  <List
                    className="mr-10"
                    key={i}
                    title={list.title}
                    tasks={list.tasks}
                    boardDispatch={dispatch}
                  />
                )
              }
              <button onClick={() => dispatch({ type: "newList", payload: { currentListTitle: "Hello" } })}> Add New List</button>
            </TaskContext.Provider >
          </div>
        </div>
      </div>
    </div>
  );
}

export default App
