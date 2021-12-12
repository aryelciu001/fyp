import { useState, useEffect } from 'react';
import ProjectList from './ProjectList'
import axios from 'axios';
const API = process.env.REACT_APP_API

function App() {
  const [projectList, setProjectList] = useState([])

  useEffect(() => {
    const url = `${API}/project`
    axios.get(url)
      .then(res => setProjectList(res.data))
  }, [])

  return (
    <>
      <ProjectList projectList={projectList}/>
    </>
  );
}

export default App;
