import React from 'react'
import ProjectList from 'Pages/Reservation/ProjectList'
// import React, { useState, useEffect } from 'react'
// import api from 'API'
// import { useSelector } from 'react-redux'
// import { ApiRequestType } from 'utils/constant'

export default function Reservation() {
  const projectList = []
  // const [projectList, setProjectList] = useState([])
  // const token = useSelector((state) => state.user.token)

  // useEffect(() => {
  //   let unmounted = false
  //   const source = axios.CancelToken.source()
  //   api(ApiRequestType.GET_PROJECT_LIST, { token })
  //     .then((res) => {
  //       if (unmounted) return
  //       setProjectList(res.data)
  //     })
  //   return function() {
  //     unmounted = true
  //     source.cancel('Cancelling in cleanup')
  //   }
  // }, [token])

  return (
    <React.Fragment>
      Your Reservations
      <ProjectList projectList={projectList}></ProjectList>
    </React.Fragment>
  )
}
