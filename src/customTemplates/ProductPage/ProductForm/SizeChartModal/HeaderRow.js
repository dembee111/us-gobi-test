import React, { Component } from 'react';

export default class HeaderRow extends Component {
  euWomenConversions = {
    '2XS': '32',
    '2XS-XS': '32-34',
    XS: '34',
    'XS-S': '34-36',
    S: '36',
    'S-M': '36-38',
    M: '38',
    'M-L': '38-40',
    L: '40',
    'L-XL': '40-42',
    XL: '42',
    'XL-2XL': '42-44',
    '2XL': '44',
    '3XL': '46',
    '4XL': '48',
  };
  euMenConversions = {
    '2XS': '44',
    '2XS-XS': '44-46',
    XS: '46',
    'XS-S': '46-48',
    S: '48',
    'S-M': '48-50',
    M: '50',
    'M-L': '50-52',
    L: '52',
    'L-XL': '52-54',
    XL: '54',
    'XL-2XL': '54-56',
    '2XL': '56',
    '3XL': '58',
    '4XL': '60',
  };
  usWomenConversions = {
    '2XS': '0',
    '2XS-XS': '0-2',
    XS: '0-2',
    'XS-S': '0-4',
    S: '2-4',
    'S-M': '2-6',
    M: '4-6',
    'M-L': '4-8',
    L: '8',
    'L-XL': '8-10',
    XL: '10',
    'XL-2XL': '10-12',
    '2XL': '12',
    '3XL': '14',
    '4XL': '16',
  };
  usMenConversions = {
    '2XS': '34',
    '2XS-XS': '34-36',
    XS: '36',
    'XS-S': '36-38',
    S: '38',
    'S-M': '38-40',
    M: '40',
    'M-L': '40-42',
    L: '42',
    'L-XL': '42-44',
    XL: '44',
    'XL-2XL': '44-46',
    '2XL': '46',
    '3XL': '48',
    '4XL': '50',
  };
  ukWomenConversions = {
    '2XS': '4',
    '2XS-XS': '4-6',
    XS: '6',
    'XS-S': '6-8',
    S: '8',
    'S-M': '8-10',
    M: '10',
    'M-L': '10-12',
    L: '12',
    'L-XL': '12-14',
    XL: '14',
    'XL-2XL': '14-16',
    '2XL': '16',
    '3XL': '18',
    '4XL': '20',
  };
  ukMenConversions = {
    '2XS': '34',
    '2XS-XS': '34-36',
    XS: '36',
    'XS-S': '36-38',
    S: '38',
    'S-M': '38-40',
    M: '40',
    'M-L': '40-42',
    L: '42',
    'L-XL': '42-44',
    XL: '44',
    'XL-2XL': '44-46',
    '2XL': '46',
    '3XL': '48',
    '4XL': '50',
  };

  convert(gender, region, text) {
    let convertedText = '';
    if (gender === 'woman') {
      switch (region) {
        case 'EU/IT':
          convertedText = this.euWomenConversions[text];
          break;
        case 'US':
          convertedText = this.usWomenConversions[text];
          break;
        case 'UK':
          convertedText = this.ukWomenConversions[text];
          break;
        default:
          convertedText = '';
      }
    } else if (gender === 'man') {
      switch (region) {
        case 'EU/IT':
          convertedText = this.euMenConversions[text];
          break;
        case 'US':
          convertedText = this.usMenConversions[text];
          break;
        case 'UK':
          convertedText = this.ukMenConversions[text];
          break;
        default:
          convertedText = '';
      }
    }
    return convertedText ? convertedText : '';
  }

  render() {
    return [
      <tr key="0" className="newRowMobile">
        <th className="header" colSpan={this.props.numSizes}>
          {this.props.region}
        </th>
      </tr>,
      <tr key="1">
        <th key="region" className={this.props.white ? 'background-white header region' : 'header region'}>
          {this.props.region}
        </th>
        {this.props.sizes &&
          this.props.sizes.map((size, index) => {
            return (
              <th key={index} className={this.props.white ? 'background-white size' : 'size'}>
                {this.props.region !== 'Size' ? this.convert(this.props.manOrWoman, this.props.region, size) : size}
              </th>
            );
          })}
      </tr>,
    ];
  }
}
