import { GetUserInfo } from "@zuri/control"
import { getOrgDetails } from "./getOrgDetails"
import { ACTIONS } from "../App"

export const fetchUser = async dispatch => {
  try {
    const user = await GetUserInfo()

    //Get wrokspace info
    let currentWorkspace = localStorage.getItem("currentWorkspace")

    //Check if user id is valid and get user organization
    if (user._id !== "") {
      //Set user details
      dispatch({ type: ACTIONS.ADD_USER_INFO, payload: user })

      //set organization details
      getOrgDetails(dispatch, currentWorkspace, user.email, user._id)
    }
  } catch (err) {
    console.warn(err)
  }
}
