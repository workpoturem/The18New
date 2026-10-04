import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { getWork, resetWork } from '@/store/actions/works';
import WorkDetail from '@components/WorkDetail';
import Loader from '@components/shared/Loader';

const mapStateToProps = ({ works }) => {
  const { currentWork } = works;
  return {
    currentWork,
    error: currentWork?.error,
    loading: currentWork?.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    resetWork: () => {
      dispatch(resetWork())
    },
    getWork: (slug) => {
      dispatch(getWork(slug))
    },
  }
}

const WorkContainer = ({ 
  currentWork,
  error, 
  loading,
  collection, 
  slug, 
  resetWork, 
  getWork,
  doubleCheck, 
}) => {
  const crumbs = [
    {
      name: 'Main',
      path: '/',
    },
    {
      name: collection,
      path: `/${collection.toLowerCase()}`,
    },
  ];

  const fetchWork = async () => {
    await getWork(slug);
  };

  useEffect(() => {
    resetWork();
    fetchWork();
  }, []);

  return (
    <>
      <Helmet>
        <meta property="og:description" content={currentWork?.ogDescription} />
        <meta property="og:image" content={currentWork.imageLg} />
      </Helmet>
      <div className="work-container">
        {!loading ? (
          <WorkDetail
            currentWork={currentWork}
            crumbs={crumbs}
            slug={slug}
            doubleCheck={doubleCheck}
          />
        ) : (
          <Loader />
        )
      }
      </div>  
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(WorkContainer);
