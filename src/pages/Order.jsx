import React, { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import classNames from 'classnames';
import { setOrder } from '@/api';

const Order = () => {
  const nameInput = useRef(null);
  const emailInput = useRef(null);
  const descriptionInput = useRef(null);
  const [emailError, setEmailError] = useState(false)

  const notify = (text, type) => toast[type](text, {
    autoClose: 5000,
    hideProgressBar: true,
    draggable: true,
    closeOnClick: true,
    pauseOnHover: true,
  });

  const errorCheck = () => {
    if(emailInput.current.value.length < 6) {
      notify('Please, enter your email', 'error');
      setEmailError(true)
      return true
    }
    else {
      setEmailError(false)
      return false;
    }
  }

  const clearFields = () => {
    nameInput.current.value = '';
    emailInput.current.value = '';
    descriptionInput.current.value = '';
  }

  const handleSubmit = () => {
    const isError = errorCheck();

    if (!isError) {
      setOrder({
        name: nameInput.current.value,
        email: emailInput.current.value,
        description: descriptionInput.current.value,
      });
      clearFields();
      notify('Thanks for your order!', 'success');
    }
  }

  return (
    <main className="order-page page__main">
      <section className="page__section">
        <div className="page__container">
          <h1 className="order-page__title title title--big font-rfdevi mb-4">
            <span className="font-black block">Custom Order</span>
          </h1>
          <p className="order-page__description page__text">
            Order unique design from $70 per illustration.
          </p>
        </div>
      </section>
      <section className="page__section">
        <div className="page__container">
          <div className="order">
            <div className="order__box">
              <h2 className="order__title title font-medium">Hello! 👋</h2>
              <p className="order__subtitle title">Tell us about your project.</p>

              <form className="order__form form">
                <div className="form__field">
                  <input 
                    ref={nameInput} 
                    type="text" 
                    className="form__input" 
                    placeholder="Name" 
                    tab-index="0"
                  />
                </div>
                <div className="form__field">
                  <input 
                    ref={emailInput} 
                    type="email" 
                    className={classNames('form__input', emailError && 'form__input--error')} 
                    placeholder="Email"  
                    tab-index="0"
                  />
                </div>
                <div className="form__field">
                  <textarea 
                    ref={descriptionInput} 
                    className="form__input form__textarea" 
                    placeholder="Describe your order"  
                    tab-index="0"
                  />
                </div>

                <button 
                  onClick={handleSubmit} 
                  type="button" 
                  className="form__submit button" 
                  tab-index="0"
                >
                    Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Order;
