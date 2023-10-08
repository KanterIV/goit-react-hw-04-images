import css from './ImageGallery.module.css';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ imagesArr, onOpenModal }) => {
  return (
    <ul className={css.ImageGallery}>
      {imagesArr &&
        imagesArr.map(card => {
          const { id, webformatURL, largeImageURL } = card;
          return (
            <ImageGalleryItem
              key={id}
              id={id}
              webformatURL={webformatURL}
              largeImageURL={largeImageURL}
              onImageItemClick={onOpenModal}
            />
          );
        })}
    </ul>
  );
};
