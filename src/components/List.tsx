import React, { useContext, useState } from "react";
import TaskCard from "./TaskCard"
import TaskContext, { draggedTaskInterface } from "../context/context";
import { boardInterface } from "../App";

interface CustomElements extends HTMLFormControlsCollection {
    task: HTMLInputElement
}

interface CustomForm extends HTMLFormElement {
    elements: CustomElements
}

interface Props {
    children?: React.ReactNode,
    title: string,
    className?: string,
    board: boardInterface,
    tasks: string[],
    setBoard: React.Dispatch<React.SetStateAction<boardInterface>>
}

const List: React.FC<Props> =
    ({ className, title, tasks, board, setBoard }) => {
        const [listTitle, setListTitle] = useState<string>(title)
        const [addingTask, setAddingTask] = useState<boolean>(false);
        const { draggedTask } = useContext(TaskContext)

        const taskAdder = (board: boardInterface, newTask: string) => {
            const lists = board.lists
            lists.forEach(l => l.title === title ? l.tasks = [...l.tasks, newTask] : {})
            return { ...board, lists }
        }

        const taskAdderNew = (board: boardInterface, draggedTask: draggedTaskInterface) => {
            const lists = board.lists
            lists.forEach(l => {
                if (l.title === title) {
                    const dragOverItemIndex = l.tasks.indexOf(draggedTask.dragOverItem.task)
                    if (draggedTask.list === draggedTask.dragOverItem.list) {
                        const currentItemIndex = l.tasks.indexOf(draggedTask.task)
                        l.tasks.splice(currentItemIndex, 1)
                    }
                    l.tasks.splice(dragOverItemIndex, 0, draggedTask.task)
                }
            })
            return { ...board, lists }
        }

        const handleClick = () => setAddingTask(true)

        const handleTaskAdd = (e: React.FormEvent<CustomForm>) => {
            e.preventDefault()
            const newTask = e.currentTarget.task.value;
            if (newTask) setBoard(taskAdder(board, newTask))
            setAddingTask(false)
        }

        const handleDragOver = (e: React.DragEvent) => {
            e.preventDefault()
        }

        const handleDrop = (e: React.DragEvent) => {
            e.preventDefault()
            if (draggedTask)
                if (draggedTask.list !== title) {
                    if (draggedTask.list !== draggedTask.dragOverItem.list)
                        setBoard(taskAdderNew(board, draggedTask))
                }
                else
                    setBoard(taskAdderNew(board, draggedTask))
        }

        const handleFormDrop = (e: React.DragEvent) => {
            e.preventDefault()

            if (draggedTask) {
                setBoard(taskAdder(board, draggedTask.task))
            }
        }

        const handleDragEnd = () => {
            // Remove Task from old list
            if (draggedTask && draggedTask.list !== draggedTask.dragOverItem.list)
                setBoard(prevBoard => {
                    const lists = prevBoard.lists
                    lists.forEach(l => l.title === title ? l.tasks = l.tasks.filter(t => t != draggedTask.task) : {})
                    return { ...prevBoard, lists }
                })
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
                    {tasks.map((t, i) => <TaskCard key={i} task={t} list={title} />)}
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
                        onDrop={handleFormDrop}
                        className="px-3 py-1 mb-3 w-full text-left rounded-lg hover:bg-gray-800"
                    >
                        <span className="mr-1">+</span> Add a card
                    </button>
                }
            </div>
        );
    }

export default List