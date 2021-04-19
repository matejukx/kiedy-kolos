import Button from '../Button/Button';
import './ItemBar.scss';

const ItemBar = ({ children }) => (
  <div className='itemBar'>
    <h3 className='itemBar__title'>{children}</h3>
    <div className='itemBar__buttons'>
      <Button
        modifier='button--transparent button--edit'
        handleClick={console.log('T')}
      >
        <span className='material-icons'>edit</span>
      </Button>
      <Button
        modifier='button--transparent button--delete'
        handleClick={console.log('T')}
      >
        <span className='material-icons'>delete</span>
      </Button>
    </div>
  </div>
);

export default ItemBar;
