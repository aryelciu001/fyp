import React, { useState } from 'react'
import Options from 'Pages/Admin/Options'
import Space from 'Pages/Admin/Space'
import { AdminOptions } from 'utils/constant'
import './index.scss'

export default function Admin() {
  const [selectedOption, setSelectedOption] = useState(AdminOptions.addFyp)

  return (
    <div className="admin">
      <Options
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
      ></Options>
      <Space
        selectedOption={selectedOption}
      ></Space>
    </div>
  )
}

