import { useState } from "react"
// components
import PrimaryBtn from "./PrimaryBtn"
// utils
import { createBoard } from "../utils/api"

interface Props {
    setAllBoards: React.Dispatch<React.SetStateAction<BoardWithoutTasks[]>>
    setBoardId: React.Dispatch<React.SetStateAction<number>>
}

const Navbar: React.FC<Props> = ({ setAllBoards, setBoardId }) => {

    const [addingBoard, setAddingBoard] = useState<boolean>(false)

    const handleAddBoard = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const target = e.target as HTMLFormElement
        const value = target.boardName.value

        const board = await createBoard(value)
        setAllBoards(b => {
            let newB = [...b, board]
            return newB
        })
        setBoardId(board.id)
        setAddingBoard(false)
    }

    return (
        <nav className="flex justify-between px-2.5 py-3 items-center text-gray-300 bg-black">
            <h1 className="brand mr-16 text-3xl">TaskMaster</h1>
            <div className="mr-6">
                {addingBoard ?
                    <form onSubmit={handleAddBoard} className="flex">
                        <input
                            type="text"
                            placeholder="Enter New Board Name"
                            name="boardName"
                            id="boardName"
                            className="mr-4 px-4 py-1 bg-transparent border border-gray-300"
                        />
                        <div className="flex items-center">
                            <PrimaryBtn className="mr-4" type="submit">Create</PrimaryBtn>
                            <button onClick={() => setAddingBoard(false)}>
                                <svg className="size-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </form> :
                    <PrimaryBtn onClick={_ => setAddingBoard(true)}>Create</PrimaryBtn>
                }
            </div>
        </nav>
    )
}

export default Navbar