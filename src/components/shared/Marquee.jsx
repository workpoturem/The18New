import React from 'react';
import Marquee from 'react-fast-marquee';
import classNames from 'classnames';

const MarqueeStroke = (props) => {
  const { speed, gradient, children, className } = props;
  return (
    <div className={classNames(['marque', className])}>
      <Marquee speed={speed} gradient={gradient}>
        <p className="marque__text">
          {children}
        </p>
      </Marquee>
    </div>
  );
};

export default MarqueeStroke;
