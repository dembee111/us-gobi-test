import React, { Component } from 'react';
import HeaderRow from './HeaderRow';

export default class Header extends Component {
  render() {
    return (
      <thead>
        <HeaderRow
          key="Size"
          sizes={this.props.sizes}
          manOrWoman={this.props.manOrWoman}
          numSizes={this.props.numSizes}
          region="Size"
          white={false}
        />
        {!this.props.isOneSize && this.props.manOrWoman
          ? [
              <HeaderRow
                key="US"
                sizes={this.props.sizes}
                manOrWoman={this.props.manOrWoman}
                numSizes={this.props.numSizes}
                region="US"
                white={false}
              />,
              <HeaderRow
                key="EU/IT"
                sizes={this.props.sizes}
                manOrWoman={this.props.manOrWoman}
                numSizes={this.props.numSizes}
                region="EU/IT"
                white={true}
              />,
              <HeaderRow
                key="UK"
                sizes={this.props.sizes}
                manOrWoman={this.props.manOrWoman}
                numSizes={this.props.numSizes}
                region="UK"
                white={true}
              />,
            ]
          : null}
      </thead>
    );
  }
}
