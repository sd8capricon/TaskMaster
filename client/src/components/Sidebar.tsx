// utils
import { deleteBoard } from "../utils/api"

interface Props {
    boards: BoardWithoutTasks[],
    setBoardId: React.Dispatch<React.SetStateAction<number>>
    setAllBoards: React.Dispatch<React.SetStateAction<BoardWithoutTasks[]>>
}

const Sidebar: React.FC<Props> = ({ boards, setBoardId, setAllBoards }) => {

    const handleBoardChange = (boardIndex: number) => {
        setBoardId(boardIndex)
    }

    const handleDeleteBoard = (boardId: number) => {
        const newBoards = boards.filter(b => b.id != boardId)
        setAllBoards(newBoards)
        deleteBoard(boardId)
    }

    return (
        <div className="col-span-1 text-gray-400 bg-black">
            <div className="px-2.5 py-1 border-y border-y-gray-600 flex items-center">
                <img src="" alt="" className="h-8 w-8 mr-3" />
                <div className="leading-tight">
                    Sid's Team<br />
                    <span className="text-sm">Free</span>
                </div>
            </div>
            <ul>
                {
                    boards.map((b, i) =>
                        <li key={i} className="flex justify-between my-3 py-1 px-4">
                            <button onClick={(_) => handleBoardChange(b.id)} className=" flex">
                                <img src="" alt="" className="h-5 w-5 mr-3" />
                                {b.name}
                            </button>
                            <button onClick={_ => handleDeleteBoard(b.id)} className="">
                                <svg className="size-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>
                            </button>
                        </li>
                    )
                }
            </ul>
        </div>
    )

}
export default Sidebar