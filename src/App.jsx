import { useEffect, useState } from 'react';
import { Button } from 'components/Button/Button';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import Loader from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { searchService } from 'components/services/api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  const [pictureCards, setPictureCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchValue, setSearchValue] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loadMore, setLoadMore] = useState(false);
  const [modal, setModal] = useState({
    isOpen: false,
    data: null,
  });

  const handleSearchSubmit = event => {
    event.preventDefault();
    setLoadMore(false);

    const searchValue = event.currentTarget.elements.searchFormInput.value;
    if (searchValue.trim() === '') {
      setError(
        toast.warning(`Sorry, the query can't be empty, enter some value.`, {
          theme: 'dark',
        })
      );

      event.currentTarget.reset();
      return;
    }

    setSearchValue(searchValue);
    setPictureCards([]);
    setCurrentPage(1);

    event.currentTarget.reset();
  };

  useEffect(() => {
    const fetchPicturesOnRequest = async () => {
      try {
        setIsLoading(true);
        const data = await searchService(searchValue, currentPage);
        const pictureСardsArray = data.hits;

        if (pictureСardsArray.length === 0) {
          setLoadMore(false);
          setError(
            toast.warning(
              `Sorry, there are no images matching your search query. Please try again.`,
              {
                theme: 'dark',
              }
            )
          );
          return;
        }

        setPictureCards(prevState => [...prevState, ...pictureСardsArray]);
        setLoadMore(currentPage < Math.ceil(data.totalHits / 12));

        if (currentPage === Math.ceil(data.totalHits / 12)) {
          setError(
            toast.info(
              "We're sorry, but you've reached the end of search results.",
              {
                theme: 'dark',
              }
            )
          );
        }
      } catch (error) {
        setError(
          toast.error('Sorry, something went wrong. Try again!', {
            theme: 'colored',
          })
        );
      } finally {
        setIsLoading(false);
      }
    };

    if (!searchValue) {
      return;
    }

    fetchPicturesOnRequest();
  }, [currentPage, searchValue]);

  const onOpenModal = modalData => {
    setModal({
      isOpen: true,
      data: modalData,
    });
  };

  const onCloseModal = () => {
    setModal({
      isOpen: false,
      data: null,
    });
  };

  const loadMoreImages = () => {
    setCurrentPage(prevState => prevState + 1);
  };

  const { isOpen, data } = modal;

  return (
    <>
      <Searchbar onSubmit={handleSearchSubmit} />
      <ImageGallery imagesArr={pictureCards} onOpenModal={onOpenModal} />
      {loadMore && <Button onClick={loadMoreImages} />}
      {error && <ToastContainer />}
      {isLoading && <Loader />}
      {isOpen && <Modal onCloseModal={onCloseModal} data={data} />}
    </>
  );
};
