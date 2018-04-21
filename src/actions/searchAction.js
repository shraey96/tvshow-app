import {SEARCH_OPTIONS, PAGE_CHANGE} from './types';
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

export function changePage(page){
  return function(dispatch){

    dispatch({
      type: PAGE_CHANGE,
      payload: page
    })

  }
}
