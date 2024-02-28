import React from 'react'

const GroupColorButton = ({color,setGroupColor}) => {
  return (
    <button
    aria-label="Select purple color"
    style={{
        background:color
    }}
    className="w-6 h-6 rounded-full"
    type="button"
    onClick={(e) => setGroupColor(color)}
  />
  )
}

export default GroupColorButton