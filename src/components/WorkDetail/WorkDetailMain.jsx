import React from 'react';
import classnames from 'classnames';
import Icon from '@components/shared/Icon';
import icons from '@icons/';

function WorkDetailMain({ detailImages, highlights, overview, buyTitleRef }) {

  const handleBackClick = () => {
    buyTitleRef.current.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="work-detail-main">
      <button 
        onClick={handleBackClick} 
        className={classnames('work-detail__buy')}
      >
        BUY NOW
      </button>
      {detailImages && detailImages?.map((item, itemIndex) => {
        const type = item?.type
        if (type === 'banner') {
          return (
            <div 
              key={`work_image_${itemIndex}`} 
              className="work-detail-main__row"
            >
              <img src={item?.image} alt="" className="work-detail-main__image" />
            </div>
          )
        }

        if (type === 'descr') {
          return (
            <div 
              key={`work_image_${itemIndex}`} 
              className="work-detail-main__row work-detail-main__row--text"
            >
              {item?.image?.length > 1 && item?.image.split(',').map((pic, index) => {
                return <img key={`work_image_descr_${itemIndex}_${index}`}  src={pic} alt="" className="work-detail-main__image" />
              })}
            </div>
          )
        }

        if (type === 'twin') {
          return (
            <div 
              key={`work_image_${itemIndex}`} 
              className="work-detail-main__row work-detail-main__row--twin"
            >
              {item && item?.image.split(',').map((pic, index) => {
                return <img key={`work_image_twin_${itemIndex}_${index}`} src={pic} alt="" className="work-detail-main__image" />
              })}
            </div>
          )
        } 
      })}
      <div className="work-detail-main__description">
        <h2 className="work-detail-main__description-title title title--small uppercase font-rfdevi">Overview</h2>
        <div className="work-detail-main__description-box">
          {overview?.map((item, index) => {
            return (
              <p
                key={`work_descr_${index}`} 
                className="work-detail-main__description-text"
              >
                {item}
              </p>
            )
          })}
        </div>
        <div className="work-detail-main__highlights">
          <h2 className="work-detail-main__description-title title title--small uppercase font-rfdevi">Highlights</h2>
          <ul className="work-detail-main__highlights-list">
            {highlights?.map((item, index) => {
              return (
                <li
                  key={`work_highlight_${index}`} 
                  className="work-detail-main__highlights-item"
                >
                  <Icon
                    wrapperClassName="work-detail-main__highlights-icon"
                    icon={icons.check_2}
                  />
                  <p className="work-detail-main__highlights-text">{item}</p>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default WorkDetailMain;