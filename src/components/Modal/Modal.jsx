import { useEffect } from 'react';
import css from './Modal.module.css';

export const Modal = ({ data, onCloseModal }) => {
  useEffect(() => {
    const onKeyDown = e => {
      if (e.code === 'Escape') {
        onCloseModal();
      }
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onCloseModal]);
  const onOverlayClick = e => {
    if (e.currentTarget === e.target) {
      onCloseModal();
    }
  };

  return (
    <div className={css.Overlay} onClick={onOverlayClick}>
      <div className={css.Modal}>
        <img src={data} alt="bigSizePicture" width="900" />
      </div>
    </div>
  );
};
