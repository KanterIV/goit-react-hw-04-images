import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({
  webformatURL,
  largeImageURL,
  tags,
  onImageItemClick,
}) => {
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
};
