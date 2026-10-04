import React, { useState } from 'react';
import Icon from '@components/shared/Icon';
import icons from '@icons/';
import { NavLink } from 'react-router-dom';

function WorkDetailSide({buyId, checkoutDescrList, demoLink, formats, price, oldPrice, buyTitleRef }) {
  const [checkoutError, setCheckoutError] = useState('');
  const hasDemo = typeof demoLink === 'string' ? demoLink.trim() !== '' : demoLink != null;
  const formatsList = formats?.split(',').map((format) => {
    return format.trim();
  });

  const openCheckout = (productRef) => {
    const checkout = typeof window !== 'undefined' && window.The18Checkout;
    if (!checkout || typeof checkout.open !== 'function') {
      setCheckoutError('Checkout is currently unavailable. Please reload the page and try again.');
      return;
    }
    setCheckoutError('');
    // The adapter displays SDK/checkout errors for both this UI and the old bundle.
    checkout.open(productRef);
  }

  const handleBuy = () => {
    openCheckout(buyId);
  }

  const handleDemo = () => {
    openCheckout(demoLink);
  }

  return (
    <div ref={buyTitleRef} className='work-detail-side'>
      <div className="work-detail-side__box">
        <div className="work-detail-side__formats">
          {formatsList?.map((format) => {
            return (
              <img
                src={icons[format.toLowerCase()]}
                alt="format"
                key={`work_detail_format_${format}`}
                className="work-detail-side__format"
              />
            );
          })}
        </div>
        <div className="work-detail-side__title title title--small font-rfdevi">
          Features
        </div>
        <ul className="work-detail-side__list">
          {checkoutDescrList?.map((item, index) => {
            return (
              <li 
              key={`work_checkout_descr_${index}`} 
                className="work-detail-side__item"
              >
                <Icon
                  wrapperClassName="work-detail-side__item-icon"
                  icon={icons.check}
                />
                <div className="work-detail-side__item-text">{ item }</div>
              </li>
            )
          })}
        </ul>
      </div>
      <div className="work-detail-side__box">
        <div className="work-detail-side__price">
          <div className="work-detail-side__price-current">{price === 0 ? 'Free' : `$${price}`}</div>
          {price !== 0 && oldPrice ? (
              <div className="work-detail-side__price-old">${oldPrice}</div>
            ) : null
          }
        </div>
        <p className="work-detail-side__description">
          The VAT may be includedin the total 
          price of the product.
        </p>
        <div className="work-detail-side__buttons">
          <button type="button" onClick={handleBuy} className="work-detail-side__button button button--big">{price === 0 ? 'Download' : 'Buy'}</button>
          {price !== 0 && hasDemo && (
            <button type="button" onClick={handleDemo} className="work-detail-side__button button button--big button--gray">
              Demo
            </button>
          )}
        </div>
        {checkoutError && (
          <p className="work-detail-side__description" role="alert">{checkoutError}</p>
        )}
      </div>
      <div className="work-detail-side__box work-detail-side__box--small">
        <NavLink className="work-detail-side__unlock button" tabIndex="0" to="/order">
          <Icon
            wrapperClassName="work-detail-side__unlock-icon"
            icon={icons.buy}
          />
          <div className="work-detail-side__unlock-text">
            <div className="work-detail-side__unlock-text__main">
              Order unique design
            </div>
            <div className="work-detail-side__unlock-text__sub">
              from $70 per illustration
            </div>
          </div>
        </NavLink>
      </div>
    </div>
  );
}

export default WorkDetailSide;
