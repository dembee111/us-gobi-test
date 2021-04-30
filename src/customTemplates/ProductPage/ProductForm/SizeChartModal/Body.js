import React, { Component } from 'react';

export default class Body extends Component {
  render() {
    if (this.props.partHeaders && this.props.chartData && this.props.chartData.length > 0) {
      return this.props.partHeaders.map((partHeader, index) => [
        <tr key={index * 2} className="newRowMobile">
          <th colSpan={this.props.numSizes}>{partHeader}</th>
        </tr>,
        <tr key={index * 2 + 1} className="rowSizeChartInch">
          <th className="partName">{partHeader}</th>
          {this.props.chartData[index].map((data, dataIndex) => (
            <td key={dataIndex}>{data}</td>
          ))}
        </tr>,
      ]);
    }
    return null;
  }
}
