import React, { useRef } from 'react';
import Icon from '@components/shared/Icon';
import Breadcrumbs from '@components/Breadcrumbs';
import WorkDetailMain from './WorkDetailMain';
import WorkDetailSide from './WorkDetailSide';
import WorksContainer from '@containers/WorksContainer';
import UnlimitedAccess from '@components/shared/UnlimitedAccess';
import icons from '@icons/';

function WorkDetail({ currentWork, crumbs, slug, doubleCheck }) {
  const buyTitleRef = useRef()

  return (
    <div className="work-detail">
      <div className="work-detail__top">
        <Breadcrumbs crumbs={crumbs} />
        <div className="work-detail__top-box">
          <h1 className="work-detail__title title title--big title--black font-rfdevi">
            {currentWork.name}
          </h1>
          <p className="work-detail__text page__text">
            {currentWork.description}
          </p>
        </div>
        <div className="work-detail__sup">
          {currentWork.presentationLink && (
            <a href={currentWork.presentationLink} target="_blank" className="work-detail__presentation button button--iconed button--outline">
              Presentation
              <Icon
                wrapperClassName="work-detail__presentation-icon button__icon"
                icon={icons.pres}
              />
            </a>
          )}
        </div>
      </div>
      <div className="work-detail__row">
        <div className="work-detail__col work-detail__col--main">
          <WorkDetailMain 
            detailImages={currentWork.detailImages}
            highlights={currentWork.highlights}
            overview={currentWork.overview}
            buyTitleRef={buyTitleRef} 
          />
        </div>
        <div className='work-detail__col work-detail__col--side'>
          <WorkDetailSide 
            buyId={currentWork.buyId}
            buyTitleRef={buyTitleRef} 
            checkoutDescrList={currentWork.checkoutDescrList}
            demoLink={currentWork.demoLink}
            formats={currentWork.formats} 
            price={currentWork.price} 
            oldPrice={currentWork.oldPrice}
          />
        </div>
      </div>
      {}
      <WorksContainer 
        collection={currentWork.topic} 
        title={'Other works'} 
        doubleCheck={slug} 
      />
      <UnlimitedAccess className="work-detail__access" />
    </div>
  ); 
}

export default WorkDetail;