import { ImageGalleryItem } from 'components/index';

export const ImageGallery = ({ arrToRender, imageClick }) => {
    return (
        <ul className="ImageGallery">
            {arrToRender.map(obj => {
                return (
                    <ImageGalleryItem
                        key={obj.id}
                        imageItem={obj}
                        clickOnImage={imageClick}
                    />
                );
            })}
        </ul>
    );
};
