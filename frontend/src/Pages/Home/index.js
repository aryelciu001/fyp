import { useState, useEffect } from 'react';
import ProjectList from './ProjectList'
import api from '../../API'
import { useSelector } from 'react-redux';
import axios from 'axios'

function Home() {
  const [projectList, setProjectList] = useState([])
  const token = useSelector(state => state.user.token)

  useEffect(() => {
    let unmounted = false;
    let source = axios.CancelToken.source();
    api('GET_PROJECT_LIST', { token })
      .then(res => {
        if (unmounted) return
        setProjectList(res.data)
      })
    return function () {
      unmounted = true;
      source.cancel("Cancelling in cleanup");
    };
  }, [])

  return (
    <>
      <ProjectList projectList={projectList}/>
    </>
  );
}

export default Home;
