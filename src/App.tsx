import { useReducer, useState } from "react";
import List from "./components/List";
import TaskContext, { draggedTaskInterface } from "./context/context";
import boardReducer from "./reducers/boardReducer";

export interface boardInterface {
  title: string,
  lists: {
    title: string,
    tasks: string[]
  }[]
}

const b1: boardInterface = {
  title: "B1",
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

const b2: boardInterface = {
  title: "B2",
  lists: [
    {
      title: "Yello",
      tasks: ["Get", "Some", "Milk"]
    },
    {
      title: "Tello",
      tasks: ["how", "are"]
    },
    {
      title: "Bello",
      tasks: ["I'm", "boy"]
    }
  ]
}

const boards = [b1, b2]

const App = () => {

  const [draggedTask, setDraggedTask] = useState<draggedTaskInterface>({ task: "", list: "", dragOverItem: { task: "", list: "" } });
  const [board, dispatch] = useReducer(boardReducer, b1)

  return (
    <div>
      <h1>Selec Board</h1>
      {boards.map((b, i) =>
        <button
          key={i}
          onClick={() =>
            dispatch({ type: "changeBoard", payload: { board: b } })}>{b.title}
        </button>
      )}
      <TaskContext.Provider value={{ draggedTask, setDraggedTask }}>
        <div className="p-10 flex board">
          {
            board.lists.map((list, i) =>
              <List
                key={i}
                title={list.title}
                tasks={list.tasks}
                boardDispatch={dispatch}
              />)
          }
        </div>
      </TaskContext.Provider>
    </div>
  );
}

export default App
