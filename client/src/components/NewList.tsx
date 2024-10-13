import { useContext } from "react"
import TaskContext from "../context/context"

interface TaskLayout {
    [key: string]: Task[],
    backlog: Task[],
    todo: Task[]
    in_progress: Task[]
    completed: Task[]
}

interface Props {
    title: Status,
    className?: string,
    tasks: TaskLayout,
    setTasks: React.Dispatch<React.SetStateAction<TaskLayout>>
}

// Reset List Order
const resetOrder = (t: Task, i: number) => ({ ...t, order: i })

const List: React.FC<Props> = ({ className, title, tasks, setTasks }) => {
    const { draggedTask, setDraggedTask } = useContext(TaskContext)

    const handleDragStart = (task: Task) => {
        if (setDraggedTask) {
            setDraggedTask(task)
        }
    }

    const handleDrop = (droppedTask: Task | null, newStatus: Status) => {

        if (!draggedTask) return

        // Move Task
        const newTasks = { ...tasks }

        // Remove element from old status list and Reset 
        const oldStatus = draggedTask.status
        newTasks[oldStatus] = newTasks[draggedTask.status]
            .filter(t => t.id != draggedTask.id)
            .map(resetOrder)

        // Add element in new status list

        // Determine where to insert the dragged task in the new status list
        const droppedTaskIndex = droppedTask
            ? newTasks[newStatus].findIndex(t => t.id === droppedTask.id)
            : newTasks[newStatus].length;  // If droppedTask is null, the list is empty

        newTasks[newStatus]
            .splice(droppedTaskIndex + 1, 0, { ...draggedTask, status: newStatus })
            .map(resetOrder)

        setTasks(newTasks)
    }

    return (
        <div className={"list shrink-0 w-64 px-3 py-1 bg-black text-gray-300 rounded-xl h-fit" + ` ${className}`}>
            <div>{title}</div>
            <ul
                className="card-list list-none"
                onDragOver={(e) => e.preventDefault()}
            >
                {tasks[title].map(t =>
                    <li
                        key={t.id}
                        draggable
                        onDragStart={() => handleDragStart(t)}
                        onDrop={() => handleDrop(t, title)}
                        className="card py-1.5 px-3 bg-gray-800 rounded-lg mb-2">
                        {t.name}
                    </li>
                )}

                {tasks[title].length === 0 && (
                    <li
                        className="empty-dropzone"
                        onDrop={() => handleDrop(null, title)}
                        onDragOver={(e) => e.preventDefault()}
                    >
                        Drop here
                    </li>
                )}
            </ul>
        </div>
    )
}

export default List