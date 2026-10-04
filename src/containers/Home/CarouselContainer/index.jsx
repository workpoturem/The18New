import React, { useState, useEffect } from 'react';
import Api from '@/api';
import Carousel from '@components/Carousel';

const CarouselContainer = () => {
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchWorks = Api.fetchWorks;

  const getWorks = async () => {
    await setLoading(true);
    const works = await fetchWorks('Slider');
    await setWorks(works);
    await setLoading(false);
  };

  useEffect(() => {
    getWorks();
  }, []);

  return (
    <Carousel works={works} loading={loading} />
  );
};

export default CarouselContainer;
