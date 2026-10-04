import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames'
import WorksContainer from '@containers/WorksContainer';
import CarouselContainer from '@containers/CarouselContainer';
import TopSellersContainer from '@containers/TopSellersContainer';
import FreebiesContainer from '@containers/FreebiesContainer';
import UnlimitedAccess from '@components/shared/UnlimitedAccess';
import Loader from '@components/shared/Loader';

const Home = () => {
  const [loading, setLoading] = useState(true)
  window.document.body.style.overflow = 'hidden';

  setTimeout(() => {
    setLoading(false)
    window.document.body.style.overflow = 'auto';
  }, 1000)

  return (
    <>
      <div className={classnames('loading-overlay', !loading && 'hidden')}>
        <Loader />
      </div>
      <main className="home-page page__main">
        <section className="page__section">
          <div className="page__container">
            <h1 className="home-page__title title title--big font-rfdevi">
              Design tools for a faster and
              <span className="font-black block">more effective workflow</span>
            </h1>
            <p className="home-page__description page__text">
              Collection of elements that will make your workflow faster and more
              productive.
            </p>
            <NavLink to="/order" className="home-page__access button button--big button--black" tabIndex="0">
              Custom Order
            </NavLink>
          </div>
        </section>
        <div className="home-page__section home-page__carousel page__section">
           <CarouselContainer />
        </div>
        <section className="illustrations home-page__section page__section">
          <div className="page__container">
            <WorksContainer collection={'illustrations'} title={'Illustrations'} showLink={true} limitCount={11} />
          </div>
        </section>
        <section className="illustrations home-page__section page__section">
          <div className="page__container">
            <WorksContainer collection={'uiux'} title={'UX/UI Kits'} showLink={true} limitCount={7} />
          </div>
        </section>
        <section className="illustrations home-page__section page__section">
          <div className="page__container">
            <WorksContainer collection={'bundles'} title={'Bundles'} limitCount={2} />
          </div>
        </section>
        <section className="illustrations home-page__section page__section">
          <div className="page__container">
            <TopSellersContainer limitCount={3} />
          </div>
        </section>
        <section className="illustrations home-page__section page__section">
          <div className="page__container">
            <WorksContainer collection={'mockups'} title={'Mockups'} showLink={true} limitCount={2} />
          </div>
        </section>
        <section className="illustrations home-page__section page__section">
          <div className="page__container">
            <WorksContainer collection={'coded'} title={'Coded'} showLink={true} limitCount={1} />
          </div>
        </section>
        <section className="illustrations home-page__section page__section">
          <div className="page__container">
            <WorksContainer collection={'3d_assets'} title={'3D Assets'} showLink={true} limitCount={2} />
          </div>
        </section>
        <section className="illustrations home-page__section page__section">
          <div className="page__container">
            <FreebiesContainer limitCount={3} />
          </div>
        </section>
        <section className="home-page__section page__section">
          <div className="page__container">
            <UnlimitedAccess />
          </div>
        </section>
      </main>
    </>

  );
};

export default Home;
