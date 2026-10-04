import React, { useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { categoryContent } from '@utils/categoryContent';
import classnames from 'classnames'
import WorksContainer from '@containers/WorksContainer';
import UnlimitedAccess from '@components/shared/UnlimitedAccess';
import Loader from '@components/shared/Loader';

function Category() {
  const { collection } = useParams();
  const content = categoryContent[collection];
  const [loading, setLoading] = useState(true)
  window.document.body.style.overflow = 'hidden';

  setTimeout(() => {
    setLoading(false)
    window.document.body.style.overflow = 'auto';
  }, 1000)

  return (
    <div className="category-page page__main">
      <div className={classnames('loading-overlay', !loading && 'hidden')}>
        <Loader />
      </div>
      <section className="page__section">
        <div className="page__container">
          <h1 className="home-page__title title title--big font-rfdevi title--black">
            {content.title}
          </h1>
          <p className="home-page__description page__text max-w-663px mx-auto">
            {content.text}
          </p>
          <NavLink to="/order" className="home-page__access button button--big button--black" tabIndex="0">
            Custom Order
          </NavLink>
        </div>
      </section>
      <section className="illustrations home-page__section page__section">
        <div className="page__container">
          <WorksContainer collection={collection} limitCount={100} />
        </div>
      </section>
      <section className="home-page__section page__section">
        <div className="page__container">
          <UnlimitedAccess />
        </div>
      </section>
    </div>
  );
}

export default Category;