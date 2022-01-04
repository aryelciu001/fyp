import { ApiRequestType } from 'utils/constant'
import * as Auth from './Auth'
import * as User from './User'
import * as Fyp from './Fyp'

export default function api(action, payload = null) {
  switch (action) {
    case ApiRequestType.LOGIN:
      return Auth.login(payload)
    case ApiRequestType.GET_USER_INFO:
      return User.getUserInfo(payload)
    case ApiRequestType.GET_PROJECT_LIST:
      return Fyp.getProjectList(payload)
    case ApiRequestType.POST_FYP:
      return Fyp.postFyp(payload)
    case ApiRequestType.POST_FYP_MANY:
      return Fyp.postFypMany(payload)
    case ApiRequestType.PUT_FYP:
      return Fyp.putFyp(payload)
    case ApiRequestType.DELETE_FYP:
      return Fyp.deleteFyp(payload)
    case ApiRequestType.POST_USER:
      return User.postUser(payload)
    case ApiRequestType.PUT_USER:
      return User.putUser(payload)
    case ApiRequestType.POST_USER_MANY:
      return User.postUserMany(payload)
    case ApiRequestType.GET_USER:
      return User.getUser(payload)
    case ApiRequestType.DELETE_USER:
      return User.deleteUser(payload)
    default:
      return
  }
}
