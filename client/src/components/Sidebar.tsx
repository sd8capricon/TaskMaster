interface Props {
    boards: BoardWithoutTasks[],
    setBoardId: React.Dispatch<React.SetStateAction<number>>
}

const Sidebar: React.FC<Props> = ({ boards, setBoardId }) => {

    const handleBoardChange = (boardIndex: number) => {
        setBoardId(boardIndex)
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
                        <li key={i}>
                            <button onClick={(_) => handleBoardChange(boards[i].id)} className="my-3 px-4 py-1 flex">
                                <img src="" alt="" className="h-5 w-5 mr-3" />
                                {b.name}
                            </button>
                        </li>
                    )
                }
            </ul>
        </div>
    )

}
export default Sidebar