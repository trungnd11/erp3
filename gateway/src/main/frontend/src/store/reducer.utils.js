/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
import { createSlice } from '@reduxjs/toolkit';

/**
 * Check if the async action type is rejected
 */
export function isRejectedAction(action) {
  return action.type.endsWith('/rejected');
}

/**
 * Check if the async action type is pending
 */
export function isPendingAction(action) {
  return action.type.endsWith('/pending');
}

/**
 * Check if the async action type is completed
 */
export function isFulfilledAction(action) {
  return action.type.endsWith('/fulfilled');
}

const commonErrorProperties = ['name', 'message', 'stack', 'code'];

/**
 * serialize function used for async action errors,
 * since the default function from Redux Toolkit strips useful info from axios errors
 */
export const serializeAxiosError = (value) => {
  if (typeof value === 'object' && value !== null) {
    if (value.isAxiosError) {
      return value;
    }
    const simpleError = {};
    for (const property of commonErrorProperties) {
      if (typeof value[property] === 'string') {
        simpleError[property] = value[property];
      }
    }

    return simpleError;
  }
  return { message: String(value) };
};

/**
 * A wrapper on top of createSlice from Redux Toolkit to extract
 * common reducers and matchers used by entities
 */
export const createEntitySlice = ({
  name = '',
  initialState,
  reducers,
  extraReducers,
  skipRejectionHandling,
}) => createSlice({
  name,
  initialState,
  reducers: {
    /**
       * Reset the entity state to initial state
       */
    reset() {
      return initialState;
    },
    ...reducers,
  },
  extraReducers(builder) {
    extraReducers(builder);
    /*
       * Common rejection logic is handled here.
       * If you want to add your own rejcetion logic, pass `skipRejectionHandling: true`
       * while calling `createEntitySlice`
       * */
    if (!skipRejectionHandling) {
      builder.addMatcher(isRejectedAction, (state, action) => {
        state.loading = false;
        state.updating = false;
        state.updateSuccess = false;
        state.errorMessage = action.error.message;
      });
    }
  },
});
