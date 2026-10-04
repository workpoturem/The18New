import { buildReducer } from '@utils/buildReducer';
import { ACTIONS } from '@/store/actions/works';

const initialState = {
  topics: {
    illustrations: [],
    uiux: [],
    bundles: [],
    top_sellers: [],
    mockups: [],
    coded: [],
    '3d_assets': [],
    freebies: [],
    error: null,
  },
  currentWork: {
    error: null,
    loading: true,
  },
};

const reducers = {
  [ACTIONS.SET_WORKS](state, { payload, meta }) {
    const type = meta.toLowerCase();
    return {
      ...state,
      topics: {
        ...state.topics,
        [type]: payload,
      },
    };
  },
  [ACTIONS.SET_WORKS_LOADING](state, { payload, meta }) {
    const type = meta.toLowerCase();
    return {
      ...state,
      topics: {
        ...state.topics,
        [type]: {
          ...state.topics[type],
          loading: payload,
        },
      },
    };
  },
  [ACTIONS.SET_CAROUSEL_WORKS](state, {payload}) {
    return {
      ...state,
      topics: {
        ...state.topics,
        carousel: payload,
      },
    };
  },
  [ACTIONS.SET_TOP_WORKS](state, {payload}) {
    return {
      ...state,
      topics: {
        ...state.topics,
        top_sellers: payload,
      },
    };
  },
  [ACTIONS.SET_FREE_WORKS](state, {payload}) {
    return {
      ...state,
      topics: {
        ...state.topics,
        freebies: payload,
      },
    };
  },
  [ACTIONS.SET_WORKS_ERROR](state, { payload }) {
    return {
      ...state,
      topics: {
        ...state.topics,
        error: payload,
      }
    };
  },
  [ACTIONS.SET_WORK_LOADING](state, { payload }) {
    return {
      ...state,
      currentWork: {
        ...state.currentWork,
        loading: payload,
      },
    };
  },
  [ACTIONS.SET_WORK](state, { payload }) {
    return {
      ...state,
      currentWork: {
        ...state.currentWork,
        ...payload,
      },
    };
  },
  [ACTIONS.RESET_WORK](state) {
    return {
      ...state,
      currentWork: {},
    };
  },
  [ACTIONS.SET_WORK_ERROR](state, { payload }) {
    return {
      ...state,
      currentWork: {
        ...state.currentWork,
        error: payload,
      },
    };
  },
};

export default buildReducer(reducers, initialState);
