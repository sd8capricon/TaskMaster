

const boardReducer = (state: BoardOverview, action: BoardAction) => {
    const newState = structuredClone(state)
    switch (action.type) {
        case "SET_OVERVIEW": {
            const { name, statuses } = action.payload
            newState.boardName = name
            newState.boardStatusLists = statuses
            return newState
        }

        case "SET_NAME": {
            newState.boardName = action.payload
            return newState
        }
        case "ADD_STATUS": {
            newState.boardStatusLists.push(action.paylod)
            return newState
        }
        default:
            return state
    }
}

export default boardReducer