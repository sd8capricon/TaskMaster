import { useContext } from "react"
import TaskContext from "../context/context"

interface Props {
    task: string,
    list: string
}

const TaskCard: React.FC<Props> = ({ task, list }) => {
    const { setDraggedTask } = useContext(TaskContext)

    const handleDragStart = (e: React.DragEvent) => {
        e.dataTransfer.setData("task", task)
        if (setDraggedTask) setDraggedTask({ task, list, dragOverItem: { task: "", list: "" } })
    }

    const handleDragEnter = () => {
        if (setDraggedTask)
            setDraggedTask(draggedTask => ({ ...draggedTask, dragOverItem: { task, list } }))
    }

    return (
        <li
            draggable="true"
            onDragEnter={handleDragEnter}
            onDragStart={handleDragStart}
            className="card py-1.5 px-3 bg-gray-800 rounded-lg mb-2">
            {task}
        </li>
    );
}

export default TaskCard