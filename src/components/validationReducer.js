export const initialState = {
  username: {
    valid: true,
    value: "",
    helperText: "Username must be available"
  },
  email: {
    valid: true,
    value: "",
    helperText: "Enter a valid email address"
  },
  password: {
    valid: true,
    value: "",
    helperText: ""
  }
}

/**
 * @typedef {typeof initialState} TState
 * @typedef {'VALIDATE'|'INPUT'} ActionType
 */

/**
 * @param {TState} state
 * @param {{field: string, payload: Partial<TState['username']>}} action
 * @returns {TState}
 */
const validationReducer = (state = initialState, action) => {
  return {
    ...state,
    [action.field]: { ...state[action.field], ...action.payload }
  }
}

export default validationReducer
