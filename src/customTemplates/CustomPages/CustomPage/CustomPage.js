import React, { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { getPageFromHandle } from '../../../components/shared/query/query.js';
import './CustomPage.scss';

export default function CustomPage(props) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [pageData, setPageData] = useState();
  const [getPageFromHandleQuery, { data: getPageFromHandleData }] = useLazyQuery(getPageFromHandle, {
    variables: { handle: props.match.params.handle },
  });

  useEffect(() => {
    getPageFromHandleQuery();
  }, []);

  useEffect(() => {
    if (getPageFromHandleData) {
      if (getPageFromHandleData.pageByHandle) {
        setPageData(getPageFromHandleData.pageByHandle);
      }
    }
  }, [getPageFromHandleData]);
  return (
    <div>
      <div className="CustomPageBody">
        <div className="title">{pageData && pageData.title}</div>
        <div className="body">{pageData && <div dangerouslySetInnerHTML={{ __html: pageData.body }} />}</div>
      </div>
    </div>
  );
}
