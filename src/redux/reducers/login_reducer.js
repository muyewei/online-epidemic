const initLoginState = {username: "visitor", identify: "visitor", useraccount: "0"}
export default function loginReducer(preState = initLoginState, action) {
    // console.log(action)
    const { type, data } = action
    switch (type) {
        case "login":
            return data
        case "cancel":
            return data
        default:
            return preState
    }
}