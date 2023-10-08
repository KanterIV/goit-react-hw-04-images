import css from './Button.module.css';
import React, { Component } from 'react';

export default class Button extends Component {
  render() {
    return (
      <button onClick={this.props.onClick} type="button" className={css.Button}>
        Load more
      </button>
    );
  }
}
