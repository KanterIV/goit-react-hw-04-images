import React, { Component } from 'react';
import Button from 'components/Button/Button';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Loader from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';
import Searchbar from 'components/Searchbar/Searchbar';
import { searchService } from 'components/services/api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class App extends Component {
  state = {
    pictureСards: [],
    isLoading: false,
    error: null,
    searchValue: null,
    currentPage: 1,
    loadMore: false,
    modal: {
      isOpen: false,
      data: null,
    },
  };

  handleSearchSubmit = event => {
    event.preventDefault();

    const searchValue = event.currentTarget.elements.searchFormInput.value;
    if (searchValue.trim() === '') {
      this.setState({
        error: toast.warning(
          `Sorry, the query can't be empty, enter some value.`,
          {
            theme: 'dark',
          }
        ),
      });
      event.currentTarget.reset();
      return;
    }
    this.setState({
      searchValue: searchValue,
      pictureСards: [],
      currentPage: 1,
    });

    event.currentTarget.reset();
  };

  fetchPicturesOnRequest = async () => {
    try {
      this.setState({ isLoading: true });
      const data = await searchService(
        this.state.searchValue,
        this.state.currentPage
      );
      const pictureСards = data.hits;

      if (pictureСards.length === 0) {
        this.setState({
          loadMore: false,
          error: toast.warning(
            `Sorry, there are no images matching your search query. Please try again.`,
            {
              theme: 'dark',
            }
          ),
        });
        return;
      }
      this.setState(prevState => ({
        pictureСards: [...prevState.pictureСards, ...pictureСards],
        loadMore: this.state.currentPage < Math.ceil(data.totalHits / 12),
      }));
      if (this.state.currentPage === Math.ceil(data.totalHits / 12)) {
        this.setState({
          error: toast.info(
            "We're sorry, but you've reached the end of search results.",
            {
              theme: 'dark',
            }
          ),
        });
      }
    } catch (error) {
      this.setState({
        error: toast.error('Sorry, something went wrong. Try again!', {
          theme: 'colored',
        }),
      });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.currentPage !== prevState.currentPage ||
      this.state.searchValue !== prevState.searchValue
    ) {
      this.fetchPicturesOnRequest();
    }
  }

  onOpenModal = modalData => {
    this.setState({
      modal: {
        isOpen: true,
        data: modalData,
      },
    });
  };

  onCloseModal = () => {
    this.setState({
      modal: {
        isOpen: false,
        data: null,
      },
    });
  };

  loadMoreImages = () => {
    this.setState(prevState => {
      return { currentPage: prevState.currentPage + 1 };
    });
  };

  render() {
    const { pictureСards, loadMore, error, isLoading } = this.state;
    const { isOpen, data } = this.state.modal;
    return (
      <>
        <Searchbar onSubmit={this.handleSearchSubmit} />
        <ImageGallery imagesArr={pictureСards} onOpenModal={this.onOpenModal} />
        {loadMore && <Button onClick={this.loadMoreImages} />}
        {error && <ToastContainer />}
        {isLoading && <Loader />}
        {isOpen && <Modal onCloseModal={this.onCloseModal} data={data} />}
      </>
    );
  }
}
