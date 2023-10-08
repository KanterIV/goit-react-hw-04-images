import css from './Searchbar.module.css';
import { IconContext } from 'react-icons';
import { AiOutlineSearch } from 'react-icons/ai';

export const Searchbar = ({ onSubmit }) => {
  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={onSubmit}>
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
};
