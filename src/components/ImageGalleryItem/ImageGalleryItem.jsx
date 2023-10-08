import React, { Component } from 'react';
import css from './ImageGalleryItem.module.css';

export default class ImageGalleryItem extends Component {
  render() {
    const { webformatURL, largeImageURL, tags, onImageItemClick } = this.props;
    return (
      <li
        className={css.ImageGalleryItem}
        onClick={() => onImageItemClick(largeImageURL)}
      >
        <img
          className={css.ImageGalleryItemImage}
          src={webformatURL}
          alt={tags}
        />
      </li>
    );
  }
}
