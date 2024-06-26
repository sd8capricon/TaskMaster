import { useReducer, useState } from "react";
import List from "./components/List";
import TaskContext from "./context/context";
import boardReducer from "./reducers/boardReducer";
import boards from "./fakeDB";


const App: React.FC<{}> = () => {

  const [draggedTask, setDraggedTask] = useState<draggedTask>({ task: "", list: "", dragOverItem: { task: "", list: "" } });
  const [board, dispatch] = useReducer(boardReducer, boards[0])

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
