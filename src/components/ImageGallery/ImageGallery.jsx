import React, { Component } from 'react';
import css from './ImageGallery.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

export default class ImageGallery extends Component {
  render() {
    const cardsArr = this.props.imagesArr;
    return (
      <ul className={css.ImageGallery}>
        {cardsArr &&
          cardsArr.map(card => {
            const { id, webformatURL, largeImageURL } = card;
            return (
              <ImageGalleryItem
                key={id}
                id={id}
                webformatURL={webformatURL}
                largeImageURL={largeImageURL}
                onImageItemClick={this.props.onOpenModal}
              />
            );
          })}
      </ul>
    );
  }
}
