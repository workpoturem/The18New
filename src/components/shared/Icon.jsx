import React from 'react';
import { ReactSVG } from 'react-svg';
import classNames from 'classnames';

const Icon = ({ wrapperClassName, icon }) => {
  return (
    <ReactSVG
      className={classNames(wrapperClassName)}
      src={icon}
    />
  );
};

export default Icon;
