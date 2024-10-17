import PrimaryBtn from "./PrimaryBtn"

const Navbar: React.FC<{}> = () => {
    return (
        <div className="py-2.5 text-gray-300 bg-black">
            <nav className="flex justify-between px-2.5 items-center">
                <div className="flex items-center">
                    <div className="brand mr-16 text-xl">TaskMaster</div>
                    <ul className="flex items-center">
                        <li className="mr-16">Starred</li>
                        <li>
                            <PrimaryBtn>
                                Create
                            </PrimaryBtn>
                        </li>
                    </ul>
                </div>
                <input className="mr-24 px-4 py-1 bg-transparent border border-gray-300" placeholder="Search" type="text" />
            </nav>
        </div>
    )
}

export default Navbar