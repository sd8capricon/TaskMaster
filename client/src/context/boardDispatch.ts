import { createContext } from "react";

const BoardDispatchContext = createContext<React.Dispatch<BoardAction> | null>(null)

export default BoardDispatchContext