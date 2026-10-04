import React from 'react';

const SectionTitle = ({ text, link, showLink }) => {

  return (
    <div className="section-title">
      <h2 className="section-title__text title title--medium-big">{text}</h2>
      {showLink && (
        <a  
          href={link} 
          className="section-title__button button button--black"
        >
          Show more
        </a>
      )}
    </div>
  );
};

export default SectionTitle;
