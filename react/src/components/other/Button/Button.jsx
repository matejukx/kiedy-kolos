import './Button.scss';

const Button = ({ handleClick, children, modifier = '' }) => {
    return (
        <button className={`button ${modifier}`} onClick={handleClick}>
            {children}
        </button>
    );
};

export default Button;
