import { useEffect } from 'react';
import store from '../state/createStore';
import { navigate } from 'gatsby';

export default function useLoginHook() {
  useEffect(() => {
    if (!store().getState().customerAccessTokenObject.accessToken) {
      navigate('/');
    }

    window.scrollTo(0, 0);
  }, []);
}
