import {
  GET_GEARS_BEGIN,
  GET_GEARS_SUCCESS,
  GET_GEARS_ERROR,
  GET_SINGLE_GEAR_BEGIN,
  GET_SINGLE_GEAR_SUCCESS,
  GET_SINGLE_GEAR_ERROR,
} from '../actions';

const gearsReducer = (state, action) => {
  if (action.type === GET_GEARS_BEGIN) {
    return { ...state, gearsLoading: true, gearsError: false };
  }

  if (action.type === GET_GEARS_SUCCESS) {
    const featuredGears = action.payload.filter(
      (gear) => gear.featured === true
    );
    return {
      ...state,
      gearsLoading: false,
      gears: action.payload,
      featuredGears,
    };
  }

  if (action.type === GET_GEARS_ERROR) {
    return { ...state, gearsLoading: false, gearsError: true };
  }

  if (action.type === GET_SINGLE_GEAR_BEGIN) {
    return { ...state, singleGearLoading: true, singleGearError: false };
  }

  if (action.type === GET_SINGLE_GEAR_SUCCESS) {
    return { ...state, singleGearLoading: false, singleGear: action.payload };
  }

  if (action.type === GET_SINGLE_GEAR_ERROR) {
    return { ...state, singleGearLoading: false, singleGearError: true };
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default gearsReducer;
