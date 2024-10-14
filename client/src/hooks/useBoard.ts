import { useEffect, useState } from "react"

// utils
import { sortTaskAscending } from "../utils/taskUtils";

const useBoard = (id: number, taskDispatch: React.Dispatch<TaskAction>, setBoardOverview: React.Dispatch<React.SetStateAction<BoardOverview>>) => {
    // const board = await (await fetch(`http://localhost:3000/board/${id}`)).json()

    const [boardName, setBoardName] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBoard = async () => {
            try {
                setLoading(true);
                const res = await fetch(`http://localhost:3000/board/${id}`)
                if (!res.ok) {
                    throw new Error("Failed to fetch board data")
                }
                const board = await res.json() as Board

                const statuses = Array.from(new Set(board.tasks.map(task => task.status)));
                const sortedTasks: TaskLayout = { backlog: [], todo: [], in_progress: [], completed: [] }

                for (let status of statuses) {
                    // create status key if it doesn't exist
                    if (!sortedTasks[status]) {
                        sortedTasks[status] = [];
                    }
                    sortedTasks[status].push(
                        ...board.tasks.filter(t => t.status === status)
                            .sort(sortTaskAscending)
                    )
                }
                setBoardName(board.name)

                setBoardOverview({ boardName: board.name, boardStatusLists: statuses })
                taskDispatch({ type: "SET_TASKS", payload: sortedTasks })

            } catch (err) {
                const error = err as Error
                setError(error.message);
            } finally {
                setLoading(false)
            }
        }
        fetchBoard()
    }, [id])

    return { boardName, loading, error }
}

export default useBoard