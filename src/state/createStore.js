import { createStore } from 'redux';
import reducer from './reducer';

function saveToLocalStorage(state) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('stateUS', serializedState);
  } catch (e) {
    console.log('Error when save to local storage: ', e); // eslint-disable-line
  }
}

function loadFromStorage() {
  try {
    const serializedState = localStorage.getItem('stateUS');
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
}

const persistedState = loadFromStorage();

const store = createStore(reducer, persistedState);

store.subscribe(() => {
  saveToLocalStorage({
    checkout: store.getState().checkout,
    currency: store.getState().currency,
    customerAccessTokenObject: store.getState().customerAccessTokenObject,
    customer: store.getState().customer,
    myWishlist: store.getState().myWishlist,
    signedIn: store.getState().signedIn,
    currencyTable: store.getState().currencyTable,
    algoliaUserToken: store.getState().algoliaUserToken,
  });
});

export default () => store;
