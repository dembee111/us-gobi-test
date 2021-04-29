import React, { Component } from 'react';
import './SizeChartModal.scss';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Header from './Header';
import Body from './Body';

export default class SizeChartModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCm: true,
      sizes: [],
      partHeaders: [],
      chartDataCm: [],
      chartDataInch: [],
      isOneSize: false,
    };
    this.changeUnit = this.changeUnit.bind(this);

    const sizes = [];
    const partHeaders = [];
    const chartDataCm = [];
    const chartDataInch = [];
    const parts = this.props.result.parts.mapValue.fields;
    const orderedParts = {};
    Object.keys(parts)
      .sort()
      .forEach((key) => {
        orderedParts[key] = parts[key];
      });

    const sizeOrder = ['2XS', 'XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL', 'One size', 'Free size'];
    let i = 0;

    for (const partNum in orderedParts) {
      const part = orderedParts[partNum].mapValue.fields;
      const partName = Object.keys(part)[0];

      partHeaders.push(`${i + 1}. ${this.convertText(partName)}`);

      // Sort sizes
      const sizesMap = part[partName].mapValue.fields;
      const sizesArray = Object.keys(sizesMap).map((key) => [key, sizesMap[key]]);
      sizesArray.sort((a, b) => sizeOrder.indexOf(a[0]) - sizeOrder.indexOf(b[0]));

      chartDataCm.push([]);
      chartDataInch.push([]);

      let j = 0;
      for (const index in sizesArray) {
        const size = this.convertText(sizesArray[index][0]);

        if (size === 'ONE-SIZE' || size === 'FREE-SIZE') {
          this.state.isOneSize = true;
        }
        // Make the header cells (labels for parts)
        if (i === 0) {
          sizes.push(size);
        }
        // Setting cm values
        const { valueType } = sizesArray[index][1];
        chartDataCm[i].push(sizesArray[index][1][valueType]);
        // Setting inch values
        chartDataInch[i].push(this.cmToInch(sizesArray[index][1][valueType]));
        j++;
      }
      i++;
    }

    this.state.sizes = sizes;
    this.state.partHeaders = partHeaders;
    this.state.chartDataCm = chartDataCm;
    this.state.chartDataInch = chartDataInch;
  }

  changeUnit(event) {
    const { target } = event;
    const selectedUnit = target.value;
    if (selectedUnit === 'CM') {
      this.setState({
        isCm: true,
      });
    } else if (selectedUnit === 'INCH') {
      this.setState({
        isCm: false,
      });
    }
  }

  cmToInch(cm) {
    const cmsInOneInch = 2.54;
    return (cm / cmsInOneInch).toFixed(1);
  }

  convertText(text) {
    const conversions = {
      'FREE-SIZE': 'ONE-SIZE',
    };
    let conversion = conversions[text];
    if (conversion === undefined) {
      return text;
    } else {
      return conversion;
    }
  }

  render() {
    return this.props.isOpen ? (
      <div className="modal-size-chart">
        <div onClick={this.props.closeModal} id="size-chart-background" />
        <div className="modal-content-size-chart">
          <div className="modal-header-size-chart">
            <span onClick={this.props.closeModal} className="close-size-chart">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M15.7656 0.234597C15.4528 -0.078199 14.9472 -0.078199 14.6344 0.234597L8.0001 6.86892L1.36578 0.234597C1.05299 -0.078199 0.547393 -0.078199 0.234597 0.234597C-0.078199 0.547393 -0.078199 1.05299 0.234597 1.36578L6.86892 8.0001L0.234597 14.6344C-0.078199 14.9472 -0.078199 15.4528 0.234597 15.7656C0.390595 15.9216 0.595393 16 0.800191 16C1.00499 16 1.20979 15.9216 1.36578 15.7656L8.0001 9.13129L14.6344 15.7656C14.7904 15.9216 14.9952 16 15.2 16C15.4048 16 15.6096 15.9216 15.7656 15.7656C16.0784 15.4528 16.0784 14.9472 15.7656 14.6344L9.13129 8.0001L15.7656 1.36578C16.0784 1.05299 16.0784 0.547393 15.7656 0.234597Z"
                  fill="black"
                />
              </svg>
            </span>
            <fieldset className="fieldset-size-chart" name="measurement-unit" id="size-chart-fieldset">
              <div className="variant-input" data-value="CM" id="size-chart-cm-div">
                <input
                  type="radio"
                  value="CM"
                  defaultChecked
                  id="size-chart-cm-input"
                  name="measurement-unit"
                  onChange={this.changeUnit}
                />
                <label htmlFor="size-chart-cm-input" className="variant__button-label" value="cm">
                  CM
                </label>
              </div>
              <div className="variant-input" data-value="INCH" id="size-chart-inch-div">
                <input
                  type="radio"
                  value="INCH"
                  id="size-chart-inch-input"
                  name="measurement-unit"
                  onChange={this.changeUnit}
                />
                <label htmlFor="size-chart-inch-input" className="variant__button-label" value="inch">
                  INCH
                </label>
              </div>
            </fieldset>
          </div>
          <LazyLoadImage
            src={this.props.result.imageUrl.stringValue}
            onError={(e) => (e.target.src = '')}
            id="size-image"
          />
          <LazyLoadImage
            src={this.props.result.imageUrlMobile.stringValue}
            onError={(e) => (e.target.src = '')}
            id="size-image-mobile"
          />
          <div className="modal-body-size-chart">
            <table id="table-size-chart-inch">
              <colgroup>
                <col style={{ width: '160px' }} />
              </colgroup>
              <Header
                sizes={this.state.sizes}
                manOrWoman={this.props.manOrWoman}
                isOneSize={this.state.isOneSize}
                numSizes={this.state.sizes.length}
              />
              <tbody id="tBodySizeChartInch">
                <Body
                  numSizes={this.state.sizes.length}
                  partHeaders={this.state.partHeaders}
                  chartData={this.state.isCm ? this.state.chartDataCm : this.state.chartDataInch}
                />
              </tbody>
            </table>
            <table id="table-size-chart-cm">
              <colgroup>
                <col style={{ width: '160px' }} />
              </colgroup>
            </table>
          </div>
        </div>
      </div>
    ) : null;
  }
}
