import React from 'react';
import axios from 'axios';
import Immutable from 'seamless-immutable';

const prefix = 'app';

// загрузка картинки
const LOADING_IMAGE_START = `${prefix}/LOADING_IMAGE_START`;
const LOADING_IMAGE_SUCCEED = `${prefix}/LOADING_IMAGE_SUCCEED`;
const LOADING_IMAGE_FAILED = `${prefix}/LOADING_IMAGE_FAILED`;

const loadImageStart = () => ({
  type: LOADING_IMAGE_START
});

const loadImageSucceed = image => ({
  type: LOADING_IMAGE_SUCCEED,
  image,
  fetchedAt: Date.now()
});

const loadImageFailed = error => ({
  type: LOADING_IMAGE_FAILED,
  error
});

export const loadImage = file => (dispatch, getState) => {
  dispatch(loadImageStart());
  const formData = new FormData();
  formData.append('bigPic', file, file.name);
  return axios
    .post('/api/uploads', formData)
    .then(response => {
      dispatch(loadImageSucceed());
      return response.data.image;
    })
    .catch(error => {
      dispatch(loadImageFailed(error.message));
    });
};

const initialState = Immutable({
  imageLoadingInProgress: false,
  imageLoadingError: ''
});

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOADING_IMAGE_START:
      return Immutable.merge(state, {
        imageLoadingInProgress: true
      });
    case LOADING_IMAGE_SUCCEED:
      return Immutable.merge(state, {
        imageLoadingInProgress: false
      });
    case LOADING_IMAGE_FAILED:
      return Immutable.merge(state, {
        imageLoadingInProgress: false,
        imageLoadingError: action.error
      });
    default:
      return state;
  }
}
