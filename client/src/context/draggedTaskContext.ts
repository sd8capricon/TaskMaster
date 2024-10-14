import { createContext } from "react";


interface draggedTaskContextInterface {
    draggedTask?: Task
    setDraggedTask?: React.Dispatch<React.SetStateAction<Task>>
}
const DraggedTaskContext = createContext<draggedTaskContextInterface>({})

export default DraggedTaskContext