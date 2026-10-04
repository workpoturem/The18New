import React from 'react';
import { useParams } from 'react-router-dom';
import WorkContainer from '@containers/WorkContainer';

function Work() {
  const { collection, slug } = useParams();

  return (
  <div className="work-page page__main">
    <section className="page__section">
      <div className="page__container">
        <WorkContainer collection={collection} slug={slug} />
      </div>
    </section>
  </div>
  );
}

export default Work;