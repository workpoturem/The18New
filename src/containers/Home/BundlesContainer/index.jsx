import React, { useState, useEffect } from 'react';
import Api from '@/api';
import SectionTitle from '@components/shared/SectionTitle';
import Card from '@components/Card';
import { getWorks } from '@/store/actions/works';

const BundlesContainer = () => {
  const dispatch = useDispatch()
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchWorks = Api.fetchWorks;

  useEffect(() => {
    getWorks();
  }, []);

  return (
    <>
      <SectionTitle text="Bundles" />
      <div className="page__section-row">
        {works.map((work, idx) => {
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
                title={work.title}
                description={work.description}
                imageLg={work.imageLg}
                imageMd={work.imageMd}
                imageSm={work.imageSm}
                imageTn={work.imageTn}
                formats={work.formats}
                price={work.price}
                color={work.color}
                type={[!work.type ? defaultType : work.type]}
                loading={loading}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default BundlesContainer;
