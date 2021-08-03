import { useDispatch } from 'react-redux';
import Button from '../Button/Button';
import './ItemBar.scss';

const ItemBar = ({ children, handleEdit, handleDelete }) => {
  const editPressed = () => {
    handleEdit();
  };

  const deletePressed = () => {
    handleDelete();
  };

  return (
    <div className='itemBar'>
      <h3 className='itemBar__title'>{children}</h3>
      <div className='itemBar__buttons'>
        <Button modifier='button--transparent button--edit' handleClick={() => editPressed()}>
          <span className='material-icons'>edit</span>
        </Button>
        <Button modifier='button--transparent button--delete' handleClick={() => deletePressed()}>
          <span className='material-icons'>delete</span>
        </Button>
      </div>
    </div>
  );
};

export default ItemBar;
