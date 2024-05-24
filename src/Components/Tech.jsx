import React from 'react';


export default function Tech({name, icon}) {
  return (
    <div className="tech-part">
        {React.createElement(icon, {size:20})}
        <h4>{name}</h4>
    </div>
  )
}
