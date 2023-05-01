import { useState } from 'react';

export function SearchBar({ onSubmit }) {
    const [searchInput, setSearchInput] = useState('');

    const handleInputChange = event => {
        const { value } = event.currentTarget;
        return setSearchInput(value);
    };

    const handleSubmit = event => {
        event.preventDefault();
        onSubmit(searchInput);
        return setSearchInput('');
    };

    return (
        <header className="Searchbar">
            <form className="SearchForm" onSubmit={handleSubmit}>
                <button type="submit" className="SearchForm-button">
                    <span className="SearchForm-button-label">Search</span>
                </button>

                <input
                    className="SearchForm-input"
                    type="text"
                    autoComplete="off"
                    autoFocus
                    value={searchInput}
                    placeholder="Search images and photos"
                    onChange={handleInputChange}
                />
            </form>
        </header>
    );
}
