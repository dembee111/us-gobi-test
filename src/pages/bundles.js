import React, { useState, useEffect } from 'react';
import Bundles from '../customTemplates/CustomPages/Bundle/Bundles';
import Bundle from '../customTemplates/CustomPages/Bundle/Bundle';
import Layout from '../components/layout';
import { useLocation } from '@reach/router';

const BundlesPage = () => {
  const { pathname } = useLocation();
  const [handle, setHandle] = useState();

  useEffect(() => {
    if (pathname) {
      let strArray = pathname.split('/bundles/');
      if (strArray && strArray.length === 2) {
        setHandle(strArray[1]);
      } else {
        setHandle();
      }
    }
  }, [pathname]);

  if (handle) {
    return (
      <div>
        <Bundle
          pageContext={{
            handle,
          }}
        />
      </div>
    );
  } else {
    return (
      <Layout>
        <Bundles />
      </Layout>
    );
  }
};

export default BundlesPage;
