export const sortTaskAscending = (a: Task, b: Task) => a.order - b.order

export const resetOrder = (t: Task, i: number) => ({ ...t, order: i })