import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux'
import { getCarouselWorks } from '@/store/actions/works';
import Carousel from '@components/Carousel'

const mapStateToProps = ({ works }) => {
  const { topics, error } = works;

  return {
    topics,
    error,
  };
};

const CarouselContainer = ({ topics }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const fetchWorks = async() => {
    setLoading(true)
    await dispatch(getCarouselWorks());
    setLoading(false)
  }

  useEffect(() => {
    fetchWorks();
  }, []);

  return (
    topics['carousel']?.length > 0 && (
      <Carousel works={topics['carousel']} loading={loading} />
    )
  )
}
export default (connect(
  mapStateToProps,
)(CarouselContainer));


