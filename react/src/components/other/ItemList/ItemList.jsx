import ItemAdder from '../ItemAdder/ItemAdder';
import './ItemList.scss';

const ItemList = ({ items, name, renderComponent }) => (
    <div className='itemList'>
        <ItemAdder>Dodaj {name}</ItemAdder>
        <div className='itemList__content'>{items.length > 0 && items.map((item) => renderComponent(item))}</div>
    </div>
);

export default ItemList;
