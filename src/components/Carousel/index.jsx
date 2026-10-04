import React, { useRef, useState, useEffect } from 'react';
import { A11y, Mousewheel, Keyboard } from 'swiper';
import { useSwiper, Swiper, SwiperSlide } from 'swiper/react';
import Card from '@components/Card';
import Icon from '@components/shared/Icon';
import icons from '@icons/';

import 'swiper/css';

const Carousel = ({ works, loading }) => {
  const carousel = useRef(null);
  const [swiperInit, setSwiperInit] = useState(false);
  const [autoplay, setAutoplay] = useState({
    instance: null,
    transform: 0,
  });
  const limit = -3500;
  let transformCounter = autoplay.transform;
  let carouselAutoPlayTimer = null;

  const start = () => {
    if (works.length >= 5) {
      const carouselWrapper = carousel.current.swiper.wrapperEl;
      if (swiperInit) {
        carouselAutoPlayTimer = setInterval(() => {
          if (transformCounter <= limit) {
            transformCounter = 0;
          }
          transformCounter--
          carouselWrapper.style.transform = `translate3d(-${Math.abs(transformCounter)}px, 0, 0)`;
          setAutoplay({
            instance: carouselAutoPlayTimer,
            transform: transformCounter,
          });
        }, 30);
      }
    }
  }

  const stop = () => {
    swiperInit && clearInterval(autoplay.instance);
  };

  const slideNext = () => {
    carousel.current.swiper.slideNext();
  }

  const slidePrev = () => {
    carousel.current.swiper.slidePrev();
  }

  const onInit = () => {
    setSwiperInit(true);
  }

  useEffect(() => {
    swiperInit && start();
  }, [swiperInit])

  return (
    <div className="carousel" onMouseMove={stop} onMouseLeave={stop}>
      <Swiper
        ref={carousel}
        modules={[ A11y, Mousewheel, Keyboard]}
        onInit={onInit}
        onSlideChange = {(swiper) => {
          setAutoplay({
            instance: null,
            transform: Math.round(swiper.translate),
          })
          stop()
        }}
        touchRatio={1.5}
        loop={works.length >= 5 && true}
        mousewheel
        keyboard
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 24,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 24,
          },
          860: {
            slidesPerView: 3,
            spaceBetween: 24,
          },
          1440: {
            slidesPerView: 4,
            spaceBetween: 24,
          },
          1700: {
            slidesPerView: 4.2,
            spaceBetween: 32,
          },
        }}
      >
        {works.map((work, idx) => {
          return (
            <SwiperSlide key={`slider_card_${idx}`}>
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
                type={['slider']}
                color={work.color}
                loading={loading}
                collection={work.topic}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div className="carousel__controls">
        <button 
          className="carousel__controls-button" 
          tabIndex={0}
          onClick={slidePrev}
         >
          <Icon 
            wrapperClassName="carousel__controls-arrow"
            icon={icons.arrow}
          />
        </button>
        <button 
          className="carousel__controls-button" 
          tabIndex={0}
          onClick={slideNext}
         >
          <Icon 
            wrapperClassName="carousel__controls-arrow"
            icon={icons.arrow}
          />
        </button>
      </div>
    </div>
  );
};

export default Carousel;
