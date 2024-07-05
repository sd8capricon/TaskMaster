const Sidebar: React.FC<{}> = () => {
    return (
        <div className="w-64 text-gray-400 bg-black">
            <div className="px-2.5 py-1 border-y border-y-gray-600 flex items-center">
                <img src="" alt="" className="h-8 w-8 mr-3" />
                <div className="leading-tight">
                    Sid's Team<br />
                    <span className="text-sm">Free</span>
                </div>
            </div>
            <div className="px-4 py-1 flex">
                <img src="" alt="" className="h-5 w-5 mr-3" />
                Project Board
            </div>
        </div>
    )

}
export default Sidebar