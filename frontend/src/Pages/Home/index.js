import { useState } from 'react';
import ProjectList from './ProjectList'
import Data from '../../Data/data'

function App() {
  const [projectList, setProjectList] = useState(Data.projectList)

  return (
    <>
      <ProjectList projectList={projectList}/>
    </>
  );
}

export default App;
