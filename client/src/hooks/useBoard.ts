import { useEffect, useState } from "react"

const useBoard = (id: number, boardDispatch: React.Dispatch<BoardAction>) => {

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
                // No board
                if (board === null)
                    throw new Error("Board id not found")
                boardDispatch({ type: "SET_BOARD", payload: board })
                // clear the error state
                setError(null)
            } catch (err) {
                const error = err as Error
                setError(error.message);
            } finally {
                setLoading(false)
            }
        }
        fetchBoard()
    }, [id])

    return { loading, error }
}

export default useBoard