import { useEffect, useState } from 'react';
import Button from 'components/Button/Button';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import Loader from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';
import Searchbar from 'components/Searchbar/Searchbar';
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

  // state = {
  //   pictureСards: [],
  //   isLoading: false,
  //   error: null,
  //   searchValue: null,
  //   currentPage: 1,
  //   loadMore: false,
  //   modal: {
  //     isOpen: false,
  //     data: null,
  //   },
  // };

  const handleSearchSubmit = event => {
    event.preventDefault();

    const searchValue = event.currentTarget.elements.searchFormInput.value;
    if (searchValue.trim() === '') {
      setError(
        toast.warning(`Sorry, the query can't be empty, enter some value.`, {
          theme: 'dark',
        })
      );
      // this.setState({
      //   error: toast.warning(
      //     `Sorry, the query can't be empty, enter some value.`,
      //     {
      //       theme: 'dark',
      //     }
      //   ),
      // });
      // event.currentTarget.reset();
      return;
    }
    setSearchValue(searchValue);
    setPictureCards([]);
    setCurrentPage(1);
    // this.setState({
    //   searchValue: searchValue,
    //   pictureСards: [],
    //   currentPage: 1,
    // });

    // event.currentTarget.reset();
  };

  useEffect(() => {
    const fetchPicturesOnRequest = async () => {
      try {
        setIsLoading(true);
        // this.setState({ isLoading: true });
        const data = await searchService(searchValue, currentPage);
        const pictureСardsArray = data.hits;
        console.log(data.hits);

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
          // this.setState({
          //   loadMore: false,
          //   error: toast.warning(
          //     `Sorry, there are no images matching your search query. Please try again.`,
          //     {
          //       theme: 'dark',
          //     }
          //   ),
          // });
          return;
        }
        setPictureCards(prevState => [...prevState, ...pictureСardsArray]);
        setLoadMore(currentPage < Math.ceil(data.totalHits / 12));
        // this.setState(prevState => ({
        //   pictureСards: [...prevState.pictureСards, ...pictureСards],
        //   loadMore: this.state.currentPage < Math.ceil(data.totalHits / 12),
        // }));
        if (currentPage === Math.ceil(data.totalHits / 12)) {
          setError(
            toast.info(
              "We're sorry, but you've reached the end of search results.",
              {
                theme: 'dark',
              }
            )
          );
          // this.setState({
          //   error: toast.info(
          //     "We're sorry, but you've reached the end of search results.",
          //     {
          //       theme: 'dark',
          //     }
          //   ),
          // });
        }
      } catch (error) {
        setError(
          toast.error('Sorry, something went wrong. Try again!', {
            theme: 'colored',
          })
        );
        // this.setState({
        //   error: toast.error('Sorry, something went wrong. Try again!', {
        //     theme: 'colored',
        //   }),
        // });
      } finally {
        setIsLoading(false);
        // this.setState({ isLoading: false });
      }
    };

    if (!searchValue) {
      return;
    }

    fetchPicturesOnRequest();
  }, [currentPage, searchValue]);

  // componentDidUpdate(prevProps, prevState) {
  //   if (
  //     this.state.currentPage !== prevState.currentPage ||
  //     this.state.searchValue !== prevState.searchValue
  //   ) {
  //     this.fetchPicturesOnRequest();
  //   }
  // }

  const onOpenModal = modalData => {
    setModal({
      isOpen: true,
      data: modalData,
    });
    // this.setState({
    //   modal: {
    //     isOpen: true,
    //     data: modalData,
    //   },
    // });
  };

  const onCloseModal = () => {
    setModal({
      isOpen: false,
      data: null,
    });
    // this.setState({
    //   modal: {
    //     isOpen: false,
    //     data: null,
    //   },
    // });
  };

  const loadMoreImages = () => {
    setCurrentPage(prevState => prevState + 1);
    // this.setState(prevState => {
    //   return { currentPage: prevState.currentPage + 1 };
    // });
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
