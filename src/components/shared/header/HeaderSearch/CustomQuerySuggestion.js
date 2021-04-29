import React, { Component } from 'react';
import { Highlight, connectAutoComplete } from 'react-instantsearch-dom';
// import AutoSuggest from 'react-autosuggest';
import { Link, navigate } from 'gatsby';

class Autocomplete extends Component {
  state = {
    hover: null,
  };

  render() {
    return (
      <ul>
        {this.props.hits.map((item) => (
          <li key={item.objectID}>
            <div
              onMouseEnter={(event) => {
                event.preventDefault();
                if (item.query) {
                  this.props.onSuggestionSelected(item.query);
                  this.setState({ hover: item.query });
                  // item.hover = true
                }
              }}
            >
              <Link
                to={'/search/' + item.query}
                onClick={() => {
                  this.props.clearBtn();
                }}
              >
                {this.state.hover && this.state.hover === item.query ? (
                  <div style={{ fontWeight: '600' }}>
                    {item.query.includes(this.props.currentRefinement)
                      ? item.query.split(this.props.currentRefinement).map((item, index) => {
                          if (index === 0) {
                            return item;
                          } else if (index === 1) {
                            return (
                              <label key={index}>
                                <label style={{ fontWeight: '800' }}>{this.props.currentRefinement}</label>
                                <label>{item}</label>
                              </label>
                            );
                          }
                        })
                      : item.query}
                  </div>
                ) : (
                  <div>
                    {item.query.includes(this.props.currentRefinement)
                      ? item.query.split(this.props.currentRefinement).map((item, index) => {
                          if (index === 0) {
                            return item;
                          } else if (index === 1) {
                            return (
                              <label key={index}>
                                <label style={{ fontWeight: '800' }}>{this.props.currentRefinement}</label>
                                <label>{item}</label>
                              </label>
                            );
                          }
                        })
                      : item.query}
                  </div>
                )}
              </Link>
            </div>
          </li>
        ))}
      </ul>
    );
  }
}

export default connectAutoComplete(Autocomplete);
