import React, { Component } from 'react';
import css from './Searchbar.module.css';
import { IconContext } from 'react-icons';
import { AiOutlineSearch } from 'react-icons/ai';

export default class Searchbar extends Component {
  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.props.onSubmit}>
          <button type="submit" className={css.SearchFormButton}>
            <IconContext.Provider value={{ size: 23 }}>
              <AiOutlineSearch />
            </IconContext.Provider>
          </button>
          <input
            className={css.SearchFormInput}
            type="text"
            name="searchFormInput"
            // autocomplete="off"
            // autofocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
