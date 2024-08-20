import { createContext } from "react";


interface draggedTaskContextInterface {
    draggedTask?: DraggedTask
    setDraggedTask?: React.Dispatch<React.SetStateAction<DraggedTask>>
}
const TaskContext = createContext<draggedTaskContextInterface>({})

export default TaskContext