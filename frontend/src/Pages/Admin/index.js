import { useState } from 'react';
import Options from './Options';
import Space from './Space';
import './index.scss';

const options = ["Add FYP", "Edit FYP", "Add User", "Edit User", "View Reservations", "Generate Report"]

function App() {

  const [selectedOption, setSelectedOption] = useState("Add User");

  return (
    <div className="admin">
      <Options 
        selectedOption={selectedOption} 
        options={options}
        setSelectedOption={setSelectedOption}
      ></Options>
      <Space 
        selectedOption={selectedOption}
      ></Space>
    </div>
  );
}

export default App;
