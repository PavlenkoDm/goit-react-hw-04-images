export const Button = ({ onClick }) => {
    return (
        <div className="Button-container">
            <button
                className="Button"
                type="button"
                onClick={onClick}
            >
                Load more
            </button>
        </div>
    );
};
