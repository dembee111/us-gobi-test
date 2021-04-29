// initial state
const initState = {
  checkout: {
    lineItems: [],
    id: '',
    webUrl: '',
    totalTax: '0',
    subtotalPriceV2: { amount: 0 },
    totalPriceV2: { amount: 0 },
  },
  currency: {
    currencyCode: 'USD',
    chosenShippingCountry: 'USD',
    currencySymbol: '$',
  },
  customerAccessTokenObject: {
    accessToken: '',
    expiresAt: '',
  },
  customer: {
    id: '',
    displayName: '',
    defaultAddress: {
      address1: '',
      address2: '',
    },
    addresses: [],
    orders: [],
  },
  myWishlist: null,
  signedIn: false,
  algoliaUserToken: null,
  currencyTable: null,
};

// actions
const CHECKOUTINIT = 'CHECKOUT-INIT';
const UPDATE_QUANTITY_IN_CART = 'UPDATE_QUANTITY_IN_CART';
const REMOVE_LINE_ITEM_IN_CART = 'REMOVE_LINE_ITEM_IN_CART';
const CURRENCYINIT = 'CURRENCY-INIT';
const CUSTOMERTOKEN_UPDATE = 'CUSTOMERTOKEN_UPDATE';
const UPDATE_CUSTOMER = 'UPDATE_CUSTOMER';
const INSERT_ADDRESS = 'INSERT_ADDRESS';
const ADD_TO_WISHLIST = 'ADD_TO_WISHLIST';
const SET_WISHLIST = 'SET_WISHLIST';
const REMOVE_FROM_WISHLIST = 'REMOVE_FROM_WISHLIST';
const SIGN_IN = 'SIGN_IN';
const SIGN_OUT = 'SIGN_OUT';
const ALGOLIA_USER_TOKEN = 'ALGOLIA_USER_TOKEN';
const ADD_TO_CART = 'ADD_TO_CART';
const DISABLE_JUSTADDED = 'DISABLE_JUSTADDED';
const CURRENY_CONVERTER_INIT = 'CURRENY_CONVERTER_INIT';
const CHECKOUT_LINEITEMS_REPLACE_MUTATION_INIT = 'CHECKOUT_LINEITEMS_REPLACE_MUTATION_INIT';
const CLIENT_INIT = 'CLIENT_INIT';
const INSERT_ADDRESS_AND_DEFAULT = 'INSERT_ADDRESS_AND_DEFAULT';

// reducers
export default (state = initState, action) => {
  switch (action.type) {
    case CHECKOUTINIT:
      return { ...state, checkout: action.payload.checkout };
    case UPDATE_QUANTITY_IN_CART:
      return { ...state, checkout: action.payload.checkout };
    case REMOVE_LINE_ITEM_IN_CART:
      return { ...state, checkout: action.payload.checkout };
    case CURRENCYINIT:
      return { ...state, currency: action.payload.currency };
    case CUSTOMERTOKEN_UPDATE:
      return {
        ...state,
        customerAccessTokenObject: action.payload.customerAccessTokenObject,
      };
    case UPDATE_CUSTOMER:
      return { ...state, customer: action.payload.customer };
    case CURRENY_CONVERTER_INIT: {
      return { ...state, currencyTable: action.payload.currencyTable };
    }
    case INSERT_ADDRESS: {
      const prevState = state;
      prevState.customer.addresses.push(action.payload.address);
      return prevState;
    }
    case INSERT_ADDRESS_AND_DEFAULT: {
      const prevState = state;
      prevState.customer.addresses.push(action.payload.address);
      prevState.customer.defaultAddress = action.payload.address;
      return prevState;
    }
    case ADD_TO_WISHLIST:
      if (Array.isArray(state.myWishlist)) {
        return {
          ...state,
          myWishlist: [...state.myWishlist, action.payload.wishlistItem],
        };
      } else {
        return { ...state, myWishlist: [action.payload.wishlistItem] };
      }
    case SET_WISHLIST:
      return { ...state, myWishlist: action.payload.wishlist };
    case REMOVE_FROM_WISHLIST:
      let myWishlist = [];
      if (state.myWishlist && Array.isArray(state.myWishlist)) {
        state.myWishlist.map((item) => {
          if (item !== action.payload.wishlistItem) {
            myWishlist.push(item);
          }
        });
      }
      return { ...state, myWishlist };
    case SIGN_IN:
      return { ...state, signedIn: true };
    case SIGN_OUT:
      return { ...state, signedIn: false };
    case ALGOLIA_USER_TOKEN: {
      return { ...state, algoliaUserToken: action.payload.algoliaUserToken };
    }
    case ADD_TO_CART: {
      return { ...state, justAdded: action.payload.justAdded };
    }
    case DISABLE_JUSTADDED: {
      return { ...state, justAdded: null };
    }
    case CHECKOUT_LINEITEMS_REPLACE_MUTATION_INIT: {
      return {
        ...state,
        checkoutLineItemsReplaceMutation: action.payload.checkoutLineItemsReplaceMutation,
        checkoutLineItemsReplaceLoading: action.payload.checkoutLineItemsReplaceLoading,
      };
    }
    case CLIENT_INIT: {
      return { ...state, client: action.payload.client };
    }
    default:
      return state;
  }
};
