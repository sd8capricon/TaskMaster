import { createContext } from "react";

const BoardDispatchContext = createContext<React.Dispatch<TaskAction> | null>(null)

export default BoardDispatchContext