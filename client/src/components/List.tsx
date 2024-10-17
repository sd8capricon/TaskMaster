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
    const boardDispatch = useContext(BoardDispatchContext)
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
        const newTask = { id: null, name: task_value, order: board.tasks[title].length, status: title, board: board.id }
        if (newTask) boardDispatch!({ type: "ADD_TASK", payload: { task: newTask } })
        setAddingTask(false)
    }

    const handleDrop = (droppedTask: Task | null, newStatus: Status) => {

        if (!draggedTask) return

        // Dispatch action to the reducer
        boardDispatch!({
            type: 'DROP_TASK',
            payload: { draggedTask, droppedTask, newStatus }
        });
    }

    return (
        <div className={"list shrink-0 w-64 px-3.5 py-3 bg-black text-gray-300 rounded-xl h-fit" + ` ${className}`}>
            <div className="mb-3">{title}</div>
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
                        className="card py-1.5 px-3 bg-gray-800 rounded-lg mb-2 flex justify-between">
                        {t.name}
                        <button onClick={() => boardDispatch!({ type: "REMOVE_TASK", payload: { taskId: t.id!, status: title } })} className="">
                            <svg className="size-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                        </button>
                    </li>
                )}

                {board.tasks[title].length === 0 && (
                    <li
                        className="empty-dropzone p-3 mb-2 border-2 border-gray-600"
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