import { createContext } from "react";

const TaskDispatchContext = createContext<React.Dispatch<TaskAction> | null>(null)

export default TaskDispatchContext