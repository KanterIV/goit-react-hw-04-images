import React, { Component } from 'react';
import css from './Modal.module.css';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.onKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyDown);
  }
  onOverlayClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onCloseModal();
    }
  };
  onKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onCloseModal();
    }
  };
  render() {
    return (
      <div className={css.Overlay} onClick={this.onOverlayClick}>
        <div className={css.Modal}>
          <img src={this.props.data} alt="bigSizePicture" width="900" />
        </div>
      </div>
    );
  }
}
