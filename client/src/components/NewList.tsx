import { useContext } from "react"
import TaskContext from "../context/context"


interface Props {
    title: Status,
    className?: string,
    tasks: TaskLayout,
    taskDispatch: React.Dispatch<taskAction>
}


const List: React.FC<Props> = ({ className, title, tasks, taskDispatch }) => {
    const { draggedTask, setDraggedTask } = useContext(TaskContext)

    const handleDragStart = (task: Task) => {
        if (setDraggedTask) {
            setDraggedTask(task)
        }
    }

    const handleDrop = (droppedTask: Task | null, newStatus: Status) => {

        if (!draggedTask) return

        // Dispatch action to the reducer
        taskDispatch({
            type: 'DROP_TASK',
            payload: { draggedTask, droppedTask, newStatus }
        });
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