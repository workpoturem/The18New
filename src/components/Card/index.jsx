import React from 'react';
import classnames from 'classnames';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const Card = ({
  slug,
  name,
  description,
  image,
  formats,
  price,
  type,
  color,
  loading,
  collection,
}) => {
  const cardStyles = {
    backgroundColor: color ? color : '#FFFFFF',
  };

  const cardPath = name?.toLowerCase().replace(/\s/g, '');

  const types = type.map((el) => {
    let string = '';
    string += 'card--type-simple ';
    if (type.length > 0) string += `card--type-${el}`;
    return string;
  });

  const { imageLg, imageMd, imageSm, imageTn } = image;

  const downloadAborted = (e) => {
    e.preventDefault();
  };

  return (
    <>
      {loading ? (
        <div className={classnames('card card--skeleton', types)}>
          <div className="card__container">
            <div className="card__header">
              <div className="card__image"></div>
            </div>
            <div className="card__body">
              <div className="card__sub">
                <div className="card__sub-formats"></div>
                <div className="card__sub-price"></div>
              </div>
              <div className="card__title title title--medium"></div> 
              <div className="card__description"></div>
            </div>
          </div>
        </div>
      ) : (
        <a
          href={`/${collection}/${slug}`}
          className={classnames('card', types)}
          style={cardStyles}
          tabIndex="0"
        >
          <div className="card__container">
            <div className="card__header">
              <figure className="card__image">
                <picture>
                  <source srcSet={`${imageLg} 1920w, ${imageMd} 1440w, ${imageSm} 1024w`}  />
                  <img 
                    onDragStart={downloadAborted}
                    onContextMenu={downloadAborted}
                    src={imageTn} 
                    alt={name} 
                    className="card__image-pic" 
                  />
                  {/* <LazyLoadImage
                    onDragStart={downloadAborted}
                    onContextMenu={downloadAborted}
                    wrapperClassName="card__image-wrapper"
                    src={imageTn}
                    srcSet={`${imageLg} 1920w, ${imageMd} 1440w, ${imageSm} 1024w`}
                    alt={name}
                    className="card__image-pic"
                  /> */}
                </picture>
              </figure>
            </div>
            <div className="card__body">
              <div className="card__sub">
                <div className="card__sub-formats">{formats}</div>
                <div className="card__sub-price">
                  {price > 0 ? `$${price}` : 'Free'}
                </div>
              </div>
              <h3 className="card__title title title--medium">{name}</h3>
              <p className="card__description">{description}</p>
            </div>
          </div>
        </a>
      )
    }
    </>
  )
};

export default Card;
