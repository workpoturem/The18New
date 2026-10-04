import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux'
import { getWorks } from '@/store/actions/works';
import SectionTitle from '@components/shared/SectionTitle';
import Card from '@components/Card';

const mapStateToProps = ({ works }) => {
  const { topics, error } = works;
  return {
    topics,
    error,
  };
};

const IllustrationContainer = ({ topics, collection, title, showLink, doubleCheck, limitCount }) => {
  const dispatch = useDispatch();

  const fetchWorks = async() => {
    await dispatch(getWorks(collection));
  }

  useEffect(() => {
    fetchWorks();
  }, [collection]);

  return (
    <>
    {topics[collection]?.length > 0 && (
        <>
          {false ? (
            <div className='card card--skeleton'>
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
            <>
              <SectionTitle text={title} link={`/${collection}`} showLink={showLink} />
              <div className="page__section-row">
                {topics[collection]?.map((work, idx) => {
                  if (doubleCheck !== work.slug) {
                    let className = 'page__section-col';
                    let defaultType = 'simple';
                    let cardType = defaultType;

                    if (collection === 'illustrations') {
                      if (idx === 0) {
                        className += ' page__section-col--new';
                      }
          
                      if (work.size) {
                        className += ` page__section-col--${work.size}`;
                      }
          
                      if (idx !== 0 && !work.size) {
                        className += ' page__section-col--1-4';
                      }
                    }

                    if (collection === '3d_assets') {
                      className += ' page__section-col--1-2';
                    }

                    if (collection === 'uiux') {
                      className += ' page__section-col--1-2';
                    }

                    if (collection === 'freebies') {
                      className += ' page__section-col--1-2';
                    }

                    if (idx >= limitCount) {
                      return null;
                    }

                    return (
                      <div className={className} key={`illustrations_card_${idx}`}>
                        <Card
                          slug={work.slug}
                          name={work.name}
                          description={work.description}
                          image={{
                            imageLg: work.imageLg,
                            imageMd: work.imageMd,
                            imageSm: work.imageSm,
                            imageTn: work.imageTn,
                          }}
                          formats={work.formats}
                          price={work.price}
                          color={work.color}
                          type={[cardType]}
                          collection={collection}
                        />
                      </div>
                    );
                  }
                })}
              </div>  
            </>          
          )}
        </>
      )}
    </>
  )
};

export default (connect(
  mapStateToProps,
)(IllustrationContainer));
