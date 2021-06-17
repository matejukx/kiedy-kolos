import { useDispatch } from 'react-redux';
import { setAddEventPopup } from '../../../redux/slices/addEventPopup';
import ItemAdder from '../ItemAdder/ItemAdder';
import './ItemList.scss';

const ItemList = ({ items, name, renderComponent }) => {
  const dispatch = useDispatch();
  return (
    <div className='itemList'>
      <ItemAdder handleClick={() => dispatch(setAddEventPopup(true))}>Dodaj {name}</ItemAdder>
      <div className='itemList__content'>{items.length > 0 && items.map((item) => renderComponent(item))}</div>
    </div>
  );
};

export default ItemList;
