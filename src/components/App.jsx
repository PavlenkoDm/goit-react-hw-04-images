import { useState, useEffect } from 'react';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { SearchBar } from 'components/index';
import { getImagesFromApi, createUrlParameters } from 'components/index';
import { ImageGallery } from 'components/index';
import { Button } from 'components/index';
import { Modal } from 'components/index';

export function App() {
    const [searchInputSubmit, setSearchInputSubmit] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [minimizedResponse, setMinimizedResponse] = useState([]);
    const [openModalData, setOpenModalData] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        if (searchInputSubmit === '') return;
        const urlOptions = createUrlParameters(searchInputSubmit, currentPage);

        async function fetchFromApi() {
            try {
                Loading.arrows();
                setIsLoading(true);

                const { total, hits } = await getImagesFromApi(urlOptions);

                if (total === 0) {
                    Report.failure(
                        'Ooops',
                        'We found nothing. Change your request <br/><br/>',
                        'Okay',
                        { svgSize: '200px' }
                    );
                    Loading.remove();
                    return;
                }

                const minimizedHits = hits.map(item => {
                    const { id, largeImageURL, webformatURL, tags } = item;
                    return {
                        id,
                        webformatURL: webformatURL,
                        largeImageURL: largeImageURL,
                        tags,
                    };
                });

                setTotalItems(total);
                setMinimizedResponse(prevResponse => {
                    return [...prevResponse, ...minimizedHits];
                });

            } catch (error) {
                setError(error.massage);
                
            } finally {
                setIsLoading(false);
                Loading.remove();
            }
        }

        fetchFromApi();
    }, [searchInputSubmit, currentPage]);

    const handleSearchSubmit = searchValue => {
        setSearchInputSubmit(searchValue.trim().toLowerCase());
        setCurrentPage(1);
        setIsLoading(false);
        setTotalItems(0);
        setMinimizedResponse([]);
        setOpenModalData(null);
        setError('');
    };

    const handleLoadMoreBtnClick = () => {
        return setCurrentPage(prevPage => prevPage + 1);
    };

    const handleImageClick = data => {
        if (!data) return;
        return setOpenModalData(data);
    };

    const handleModalClose = () => {
        return setOpenModalData(null);
    };

    const isButtonVisible = !isLoading && minimizedResponse.length < totalItems;

    return (
        <div>
            <SearchBar onSubmit={handleSearchSubmit} />
            <ImageGallery
                arrToRender={minimizedResponse}
                imageClick={handleImageClick}
            />
            {isButtonVisible && <Button onClick={handleLoadMoreBtnClick} />}
            {error && <p>{error}</p>}
            {openModalData && (
                <Modal
                    modalImageData={openModalData}
                    closeModal={handleModalClose}
                />
            )}
        </div>
    );
}
