import { useContext } from "react"
import TaskContext from "../context/context"

interface Props {
    task: string
}

const TaskCard: React.FC<Props> = ({ task }) => {
    const { setDraggedTask } = useContext(TaskContext)
    const drag = (e: React.DragEvent) => {
        e.dataTransfer.setData("task", task)
        if (setDraggedTask) setDraggedTask(task)
    }
    return (
        <li
            draggable="true"
            onDragStart={drag}
            className="card py-1.5 px-3 bg-gray-800 rounded-lg mb-2">
            {task}
        </li>
    );
}

export default TaskCard