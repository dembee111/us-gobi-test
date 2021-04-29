import React, { useState, useEffect } from 'react';
import SizeChartModal from './SizeChartModal';

export default function SizeChart(props) {
  const [isSizeChartOpen, setIsSizeChartOpen] = useState(false);
  const [sizeChartRes, setSizeChartRes] = useState({});

  useEffect(() => {
    if (props.productCode) {
      const Http = new XMLHttpRequest();
      const url = `https://europe-west1-gobicashmere-sizechart.cloudfunctions.net/getSizeChart?onlineCode=${props.productCode}`;
      Http.open('GET', url);
      Http.send();

      Http.onreadystatechange = (e) => {
        if (Http.readyState === 4) {
          if (Http.status === 200 && Http.status < 300) {
            setSizeChartRes(JSON.parse(Http.responseText));
          }
        }
      };
    }
  }, [props.productCode]);

  function closeModal() {
    setIsSizeChartOpen(false);
  }

  function openModal() {
    setIsSizeChartOpen(true);
  }

  if (sizeChartRes && !sizeChartRes.error && sizeChartRes.result) {
    return (
      <span style={{ marginBottom: '5px' }}>
        <button
          aria-label="Size guide"
          type="button"
          className="sizeChartBtn"
          onClick={() => openModal()}
          id="{{ uniqueTag.last }}"
        >
          <span> Size guide </span>
        </button>
        <SizeChartModal
          result={sizeChartRes.result}
          isOpen={isSizeChartOpen}
          manOrWoman={props.manOrWoman}
          closeModal={closeModal}
        />
      </span>
    );
  }
  return null;
}
