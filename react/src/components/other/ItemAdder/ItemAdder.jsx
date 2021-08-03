import './ItemAdder.scss';

const ItemAdder = ({ children, handleClick }) => (
  <div className='itemAdder' onClick={handleClick}>
    <span className='material-icons'>add</span>
    <span className='itemAdder__text'>{children}</span>
  </div>
);

export default ItemAdder;
