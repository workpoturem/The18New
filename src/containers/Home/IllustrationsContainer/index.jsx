import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux'
import { getWorks } from '@/store/actions/works';
import SectionTitle from '@components/shared/SectionTitle';
import Card from '@components/Card';

const mapStateToProps = ({ works }) => {
  const { illustrations, error } = works;
  return {
    illustrations,
    error,
  };
};

const IllustrationContainer = ({ illustrations, error }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const collection = 'illustrations';

  const fetchWorks = async() => {
    setLoading(true)
    await dispatch(getWorks(collection));
    setLoading(false)
  }

  useEffect(() => {
    fetchWorks();
  }, []);

  return (
    <>
      <SectionTitle text="Illustrations" link={`/${collection}`} />
      <div className="page__section-row">
        {illustrations.map((work, idx) => {
          let className = 'page__section-col';
          let defaultType = 'simple';

          if (idx === 0) {
            className += ' page__section-col--new';
          }

          if (work.size) {
            className += ` page__section-col--${work.size}`;
          }

          if (idx !== 0 && !work.size) {
            className += ' page__section-col--1-4';
          }

          return (
            <div className={className} key={`illustrations_card_${idx}`}>
              <Card
                slug={work.slug}
                name={work.name}
                description={work.description}
                image={work.image}
                price={work.price}
                color={work.color}
                type={[!work.type ? defaultType : work.type]}
                loading={loading}
                collection={collection}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default (connect(
  mapStateToProps,
)(IllustrationContainer));
