import { useState } from "react"
// components
import PrimaryBtn from "./PrimaryBtn"
// utils
import { createBoard } from "../utils/api"

interface Props {
    setAllBoards: React.Dispatch<React.SetStateAction<BoardWithoutTasks[]>>
}

const Navbar: React.FC<Props> = ({ setAllBoards }) => {

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
        setAddingBoard(false)
    }

    return (
        <div className="py-2.5 text-gray-300 bg-black">
            <nav className="flex justify-between px-2.5 items-center">
                <div className="flex items-center">
                    <div className="brand mr-16 text-xl">TaskMaster</div>
                    <ul className="flex items-center">
                        <li className="mr-16">Starred</li>
                        <li>
                            {addingBoard ?
                                <form onSubmit={handleAddBoard}>
                                    <input
                                        type="text"
                                        placeholder="Enter New Board Name"
                                        name="boardName"
                                        id="boardName"
                                        className="mr-4 px-4 py-1 bg-transparent border border-gray-300"
                                    />
                                    <PrimaryBtn className="mr-4" type="submit">Create</PrimaryBtn>
                                    <button onClick={() => setAddingBoard(false)}>x</button>
                                </form> :
                                <PrimaryBtn onClick={_ => setAddingBoard(true)}>Create</PrimaryBtn>
                            }
                        </li>
                    </ul>
                </div>
                <input className="mr-24 px-4 py-1 bg-transparent border border-gray-300" placeholder="Search" type="text" />
            </nav>
        </div>
    )
}

export default Navbar