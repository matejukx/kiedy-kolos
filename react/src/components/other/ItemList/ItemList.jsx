import ItemAdder from '../ItemAdder/ItemAdder';
import './ItemList.scss';

const ItemList = ({ items, name, renderComponent }) => (
  <div className='itemList'>
    <ItemAdder>Dodaj {name}</ItemAdder>
    <div className='itemList__content'>
      {items.map((item) => renderComponent(item.name))}
    </div>
  </div>
);

export default ItemList;
