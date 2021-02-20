const initUserState = "nullOperation"
export default function userReducer(preState = initUserState, action) {
    // console.log(action)
    const { type, data } = action
    switch (type) {
        case "information":
            return data
        default:
            return preState
    }
}