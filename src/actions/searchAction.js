import {SEARCH_OPTIONS} from './types';
import urlToUse from '../config';

export function searchAlter(options){
  options.options.rating = options.options.rating.replace("+", "");

  return function(dispatch){

    dispatch({
      type: SEARCH_OPTIONS,
      payload: options.options
    })

  }
}
