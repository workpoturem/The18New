import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames'
import { ToastContainer, toast } from 'react-toastify';
import { sendEmail } from '@/api';
import Icon from '@components/shared/Icon';
import MarqueeStroke from '@components/shared/Marquee';
import images from '@images/';
import icons from '@icons/';

const Footer = () => {
  const notify = (text, type) => toast[type](text, {
    autoClose: 5000,
    hideProgressBar: true,
    draggable: true,
    closeOnClick: true,
    pauseOnHover: true,
  });
  const [inputVal, setInputVal] = useState('');
  const [inputError, setInputError] = useState(false)

  const handleSubmit = () => {
    if (inputVal.length > 6) {
      setInputError(false)
      sendEmail(inputVal)
      notify('Thanks for subscribing!', 'success')
      setInputVal('')
    } else {
      setInputError(true)
      notify('Please enter your email!', 'error')
    }
  }

  const openSupport = () => {
    $crisp.push(['do', 'chat:open'])
  }
  
  return (
    <footer className="footer page__section">
      <div className="footer__container page__container">
        <div className="footer__row">
          <div className="footer__col">
            <div className="footer__logo">
              <img
                src={images.logoLight}
                alt=""
                className="page__logo page__logo--big"
              />
            </div>
            <div className="footer__socials">
              <a href="https://www.behance.net/The18design" target="_blank" className="footer__socials-link">
                <Icon
                  wrapperClassName="footer__socials-icon"
                  icon={icons.socialBe}
                />
              </a>
              <a href="https://dribbble.com/18Design_Co" target="_blank" className="footer__socials-link">
                <Icon
                  wrapperClassName="footer__socials-icon"
                  icon={icons.socialDrib}
                />
              </a>
              <a href="https://www.facebook.com/18designCo" target="_blank" className="footer__socials-link">
                <Icon
                  wrapperClassName="footer__socials-icon"
                  icon={icons.socialFb}
                />
              </a>
              <a href="https://www.instagram.com/the18.design" target="_blank" className="footer__socials-link">
                <Icon
                  wrapperClassName="footer__socials-icon"
                  icon={icons.socialInst}
                />
              </a>
              <a href="https://www.producthunt.com/@oleg_poturemskiy" target="_blank" className="footer__socials-link">
                <Icon
                  wrapperClassName="footer__socials-icon"
                  icon={icons.socialPh}
                />
              </a>
              {/* <a href="https://twitter.com/the18design" target="_blank" className="footer__socials-link">
                <Icon
                  wrapperClassName="footer__socials-icon"
                  icon={icons.socialTw}
                />
              </a> */}
            </div>
            <div className="footer__subs">
              <div className="footer__subs-title">
                Subscribe to our newsletter for insights and updates.
              </div>
              <div className={classnames('footer__subs-form', inputError && 'footer__subs-form--error')}>
                <div className="footer__subs-field">
                  <input
                    type="text"
                    placeholder="Enter your email"
                    className="footer__subs-input"
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                  />
                </div>
                <button
                   className="footer__subs-submit"
                   onClick={handleSubmit}
                 >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          <div className="footer__group">
            <div className="footer__col footer__col--links">
              <div className="footer__col-title">Categories</div>
              <NavLink to="/uiux" className="footer__link">
                UX/UI Kits
              </NavLink>
              <NavLink to="/illustrations" className="footer__link">
                Illustrations
              </NavLink>
              <NavLink to="/3d_assets" className="footer__link">
                3D Assets
              </NavLink>
              <NavLink to="/freebies" className="footer__link">
                Freebies
              </NavLink>
            </div>
            <div className="footer__col footer__col--links">
              <div className="footer__col-title">Product</div>
              <NavLink to="/order" className="footer__link">
                Custom Order
              </NavLink>
              <NavLink to="/license" className="footer__link">
                License
              </NavLink>
              <a href="https://medium.com/@the18.design" target="_blank" className="footer__link">
                Blog
              </a>
            </div>
            <div className="footer__col footer__col--links">
              <div className="footer__col-title">About</div>
              <button onClick={openSupport} className="footer__link">
                Support
              </button>
              <a href="mailto:info@the18.design" className="footer__link">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
      <MarqueeStroke className="footer__marque" speed={80} gradient={false}>
        Collection of elements that will make your{' '}
        <span className="footer__marque-hightlight">
          workflow faster and more productive. 
        </span>
      </MarqueeStroke>
      <ToastContainer />
    </footer>
  );
};

export default Footer;
