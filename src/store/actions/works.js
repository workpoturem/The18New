import { fetchWorks, fetchWork, fetchCarouselWorks, fetchTopWorks, fetchFreeWorks } from '@/api';
import { keyMirror } from '@utils/keyMirror';
import { buildAction } from '@utils/buildAction';

const prefix = '[WORKS]';

export const ACTIONS = keyMirror(
  ['SET_WORKS', 'SET_WORKS_LOADING', 'SET_CAROUSEL_WORKS', 'SET_TOP_WORKS', 'SET_FREE_WORKS', 'SET_WORKS_ERROR', 'SET_WORK', 'SET_WORK_LOADING', 'RESET_WORK', 'SET_WORK_ERROR'],
  prefix
);

export const setWorks = buildAction(ACTIONS.SET_WORKS);
export const setWorksLoading = buildAction(ACTIONS.SET_WORKS_LOADING);
export const setCarouselWorks = buildAction(ACTIONS.SET_CAROUSEL_WORKS);
export const setTopWorks = buildAction(ACTIONS.SET_TOP_WORKS);
export const setFreeWorks = buildAction(ACTIONS.SET_FREE_WORKS);
export const setWorksError = buildAction(ACTIONS.SET_WORKS_ERROR);
export const setWork = buildAction(ACTIONS.SET_WORK);
export const setWorkLoading = buildAction(ACTIONS.SET_WORK_LOADING);
export const resetWork = buildAction(ACTIONS.RESET_WORK)
export const setWorkError = buildAction(ACTIONS.SET_WORK_ERROR);

export const getWorks = (type, limitCount) => async (dispatch) => {
  try {
    const works = await fetchWorks(type, limitCount);
    const worksSorted = works.sort((a, b) => {
      return b.serial - a.serial;
    });
    dispatch(setWorks(worksSorted, type));
  } catch (error) {
    dispatch(setWorksError(error));
  }
};

export const getCarouselWorks  = () => async (dispatch) => {
  try {
    const works = await fetchCarouselWorks();
    const worksSorted = works.sort((a, b) => {
      return b.serial - a.serial;
    });
    dispatch(setCarouselWorks(worksSorted));
  } catch (error) {
    console.log(error)
  }
}

export const getTopWorks = () => async (dispatch) => {
  try {
    const works = await fetchTopWorks();
    const worksSorted = works.sort((a, b) => {
      return b.serial - a.serial;
    });
    dispatch(setTopWorks(worksSorted));
  } catch (error) {
    console.log(error)
  }
}

export const getFreeWorks = (limitCount) => async (dispatch) => {
  try {
    const works = await fetchFreeWorks(limitCount);
    const worksSorted = works.sort((a, b) => {
      return b.serial - a.serial;
    });
    dispatch(setFreeWorks(worksSorted));
  } catch (error) {
    console.log(error)
  }
}

export const getWork = (slug) => async (dispatch) => {
  try {
    dispatch(setWorkLoading(true));
    const work = await fetchWork(slug);
    dispatch(setWork(work));
    dispatch(setWorkLoading(false));
  } catch (error) {
    dispatch(setWorkError(error));
    dispatch(setWorkLoading(false));
  }
};
