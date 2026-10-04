import React from 'react';
import { NavLink } from 'react-router-dom';

const UnlimitedAccess = ({ className }) => {
  return (
    <div className={`${className} unlimited-success`}>
      <h2 className="unlimited-success__title title title--average-big font-rfdevi">
      illustrations order
        <span className="font-black block">for your project</span>
      </h2>
      <p className="unlimited-success__description page__text">
        We create original, client oriented custom illustrations for your business.
        We have more than 10 years experience in website design, and desktop & mobile apps. 
      </p>
      <NavLink
        className="unlimited-success__button button button--big button--black"
        tabIndex="0"
        to='/order'
      >
        Custom Order
      </NavLink>
    </div>
  );
};

export default UnlimitedAccess;
