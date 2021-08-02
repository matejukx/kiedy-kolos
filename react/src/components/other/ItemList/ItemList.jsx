import { useDispatch } from 'react-redux';
import { setAddEventPopup } from '../../../redux/slices/addEventPopup';
import { setAddSubjectPopup } from '../../../redux/slices/addSubjectPopup';
import ItemAdder from '../ItemAdder/ItemAdder';
import './ItemList.scss';

const ItemList = ({ items, name, renderComponent, addFunction }) => {
  return (
    <div className='itemList'>
      <ItemAdder handleClick={() => addFunction()}>Dodaj {name}</ItemAdder>
      <div className='itemList__content'>{items.length > 0 && items.map((item) => renderComponent(item))}</div>
    </div>
  );
};

export default ItemList;
