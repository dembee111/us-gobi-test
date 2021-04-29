import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { expressCheckout } from '../../../../components/shared/mutation/mutation';
export default function ProductFrom(props) {
  console.log('ProductFrom -> props', props);
  const [productDetailTabState, setProductDetailTabState] = useState(0);
  const [isNotifyWhenAvailableOpen, setIsNotifyWhenAvailableOpen] = useState(false);
  const [productDesciption, setProductDesciption] = useState();
  const [chosenSizeVariant, setChosenSizeVariant] = useState(0);
  const [openSignInModal, setOpenSignInModal] = useState('');
  const [productPrizeText, setProductPrizeText] = useState();
  const [variant, setVariant] = useState();
  const [vatTextState, setVatTextState] = useState(false);
  const [manOrWoman, setManOrWoman] = useState();
  const [productCode, setProductCode] = useState('');
  const [createExpressCheckout, { loading: createExpressCheckoutLoading }] = useMutation(expressCheckout, {
    errorPolicy: 'all',
  });

  return <div></div>;
}
