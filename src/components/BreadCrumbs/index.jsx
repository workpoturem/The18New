import React from 'react';
import { NavLink } from 'react-router-dom';

function Breadcrumbs({crumbs}) {
  return (
    <div className="breadcrumbs">
      {crumbs.map((item, index) => {
        let title = item.name

        if (title === 'uiux') {
          title = 'UX/UI Kits'
        }
        
        return (
          <NavLink 
            key={`breadrumbs_${index}`}
            to={item.path} 
            className="breadcrumbs__item">
              {title}
          </NavLink>
        )
      })}
    </div>
  );
}

export default Breadcrumbs;
