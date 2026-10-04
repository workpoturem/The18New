import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux'
import { getTopWorks } from '@/store/actions/works';
import SectionTitle from '@components/shared/SectionTitle';
import Card from '@components/Card';

const mapStateToProps = ({ works }) => {
  const { topics, error } = works;

  return {
    topics,
    error,
  };
};

const TopSellersContainer = ({ topics, limitCount }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const fetchWorks = async() => {
    setLoading(true)
    await dispatch(getTopWorks(limitCount));
    setLoading(false)
  }

  useEffect(() => {
    fetchWorks();
  }, []);

  return (
    <>
    {topics['top_sellers']?.length > 0 && (
      <>
        <SectionTitle text="Top Sellers 🔥" />
          <div className="page__section-row">
            {topics['top_sellers'].map((work, idx) => {
              let className = 'page__section-col';
              let defaultType = 'simple';

              if (idx === 1) {
                className += ' page__section-col--1-2';
              } else {
                className += ' page__section-col--1-4';
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
                    type={[!work.type ? defaultType : work.type]}
                    loading={loading}
                    collection={work.topic}
                  />
                </div>
              );
            })}
          </div>
      </>
    )}
    </>
  );
}
export default (connect(
  mapStateToProps,
)(TopSellersContainer));


