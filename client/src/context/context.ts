import { createContext } from "react";


interface draggedTaskContextInterface {
    draggedTask?: Task
    setDraggedTask?: React.Dispatch<React.SetStateAction<Task>>
}
const TaskContext = createContext<draggedTaskContextInterface>({})

export default TaskContext