import { useContext, useState } from "react"

// contexts
import BoardDispatchContext from "../context/boardDispatch"
import TaskContext from "../context/draggedTask"

interface CustomElements extends HTMLFormControlsCollection {
    task: HTMLInputElement
}

interface CustomForm extends HTMLFormElement {
    elements: CustomElements
}

interface Props {
    title: Status,
    className?: string,
    board: BoardState
}


const List: React.FC<Props> = ({ className, title, board }) => {
    const [addingTask, setAddingTask] = useState<boolean>(false);
    const taskDispatch = useContext(BoardDispatchContext)
    const { draggedTask, setDraggedTask } = useContext(TaskContext)

    const handleDragStart = (task: Task) => {
        if (setDraggedTask) {
            setDraggedTask(task)
        }
    }

    const handleClick = () => setAddingTask(true)

    const handleTaskAdd = (e: React.FormEvent<CustomForm>) => {
        e.preventDefault()
        const task_value = e.currentTarget.task.value;
        const newTask = { id: null, name: task_value, order: board.tasks[title].length, status: title }
        if (newTask) taskDispatch!({ type: "ADD_TASK", payload: { task: newTask } })
        setAddingTask(false)
    }

    const handleDrop = (droppedTask: Task | null, newStatus: Status) => {

        if (!draggedTask) return

        // Dispatch action to the reducer
        taskDispatch!({
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
                {board.tasks[title].map(t =>
                    <li
                        key={t.id}
                        draggable
                        onDragStart={() => handleDragStart(t)}
                        onDrop={() => handleDrop(t, title)}
                        className="card py-1.5 px-3 bg-gray-800 rounded-lg mb-2">
                        {t.name}
                    </li>
                )}

                {board.tasks[title].length === 0 && (
                    <li
                        className="empty-dropzone"
                        onDrop={() => handleDrop(null, title)}
                        onDragOver={(e) => e.preventDefault()}
                    >
                        Drop here
                    </li>
                )}
            </ul>

            {addingTask ?
                <form onSubmit={handleTaskAdd} className="py-1 mb-3 w-full">
                    <input
                        className="px-3 pt-1.5 pb-6 mb-3 w-full bg-gray-800 rounded-lg"
                        type="text"
                        name="task"
                        placeholder="Enter a title for this task"
                    />
                    <div className="flex">
                        <button type="submit" className="px-3 py-1 mr-4 bg-sky-800 text-white rounded-sm">Add</button>
                        <button onClick={() => setAddingTask(false)}>x</button>
                    </div>
                </form>
                :
                <button
                    onClick={handleClick}
                    onDrop={() => handleDrop(null, title)}
                    onDragOver={(e) => e.preventDefault()}
                    className="px-3 py-1 mb-3 w-full text-left rounded-lg hover:bg-gray-800"
                >
                    <span className="mr-1">+</span> Add a card
                </button>
            }
        </div>
    )
}

export default List