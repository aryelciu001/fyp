import { ApiRequestType } from 'utils/constant'
import { useSelector } from 'react-redux'
import * as Auth from './Auth'
import * as User from './User'
import * as Fyp from './Fyp'
import * as Reservation from './Reservation'
import * as SelectionInfo from './SelectionInfo'

export default function useAxios() {
  const token = useSelector((s) => s.user.token)

  const request = (action, payload = {}) => {
    if (token) payload.token = token
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
      case ApiRequestType.POST_RESERVATION:
        return Reservation.postReservation(payload)
      case ApiRequestType.DELETE_RESERVATION:
        return Reservation.deleteReservation(payload)
      case ApiRequestType.GET_RESERVATION:
        return Reservation.getReservation(payload)
      case ApiRequestType.UPDATE_SELECTION:
        return SelectionInfo.updateSelection(payload)
      default:
        return
    }
  }

  return request
}
