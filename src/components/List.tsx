import { useContext, useState } from "react";
import TaskCard from "./TaskCard"
import TaskContext from "../context/context";

interface CustomElements extends HTMLFormControlsCollection {
    task: HTMLInputElement
}

interface CustomForm extends HTMLFormElement {
    elements: CustomElements
}

interface Props {
    children?: React.ReactNode,
    className?: string,
    tasks: string[],
    setTasks: React.Dispatch<React.SetStateAction<string[]>>
}

const List: React.FC<Props> =
    ({ className, tasks, setTasks }) => {
        const [listTitle, setListTitle] = useState<string>("List Title")
        const [addingTask, setAddingTask] = useState<boolean>(false);
        const { draggedTask } = useContext(TaskContext)

        const handleClick = () => setAddingTask(true)

        const handleTaskAdd = (e: React.FormEvent<CustomForm>) => {
            e.preventDefault()
            const target = e.currentTarget;
            if (target.task.value)
                setTasks([...tasks, target.task.value])
            setAddingTask(false)
        }

        const handleDragOver = (e: React.DragEvent) => {
            e.preventDefault()
        }

        const handleDrop = (e: React.DragEvent) => {
            e.preventDefault()
            if (draggedTask) setTasks([...tasks, draggedTask])
            // const newTask = e.dataTransfer.getData("task")
            // setTasks([...tasks, newTask])
        }

        const handleDragEnd = () => {
            // const task = e.dataTransfer.getData("task")
            // setTasks(tasks => tasks.filter(t => t != task))
            setTasks(tasks => tasks.filter(t => t != draggedTask))
        }

        return (
            <div
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onDragEnd={handleDragEnd}
                className={"list shrink-0 w-64 px-3 py-1 bg-black text-gray-300 rounded-xl h-fit " + className}
            >
                <div className="flex px-3 py-3 items-center justify-between">
                    <form onSubmit={(e) => {
                        e.preventDefault()
                    }}>
                        <input
                            className="bg-black hover:cursor-pointer"
                            value={listTitle}
                            onChange={(e) => setListTitle(e.target.value)}
                        />
                        <input type="submit" hidden />
                    </form>
                    <span>...</span>
                </div>
                <ul className="card-list list-none">
                    {tasks.map((num, i) => <TaskCard key={i} task={num} />)}
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
                    <button className="px-3 py-1 mb-3 w-full text-left rounded-lg hover:bg-gray-800" onClick={handleClick}>
                        <span className="mr-1">+</span> Add a card
                    </button>
                }
            </div>
        );
    }

export default List