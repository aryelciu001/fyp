import { useState } from 'react';
import Options from './Options';
import Space from './Space';
import './index.scss';

const options = ["Add FYP", "Edit FYP", "Add User", "Edit User", "View Reservations", "Generate Report"]

function Admin(props) {

  const [selectedOption, setSelectedOption] = useState("Edit FYP");

  return (
    <div className="admin">
      <Options 
        selectedOption={selectedOption} 
        options={options}
        setSelectedOption={setSelectedOption}
      ></Options>
      <Space 
        token={props.token}
        selectedOption={selectedOption}
      ></Space>
    </div>
  );
}

export default Admin;
