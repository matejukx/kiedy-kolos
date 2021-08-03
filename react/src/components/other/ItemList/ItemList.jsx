import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { setAddEventPopup } from '../../../redux/slices/addEventPopup';
import { setAddSubjectPopup } from '../../../redux/slices/addSubjectPopup';
import ItemAdder from '../ItemAdder/ItemAdder';
import './ItemList.scss';

const ItemList = ({ items, name, renderComponent, addFunction }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.07,
      },
    },
  };
  return (
    <div className='itemList'>
      <ItemAdder handleClick={() => addFunction()}>Dodaj {name}</ItemAdder>
      <motion.div
        className='itemList__content'
        variants={containerVariants}
        initial='hidden'
        animate={items && items.length > 0 && 'show'}
      >
        {items && items.length > 0 && items.map((item) => renderComponent(item))}
      </motion.div>
    </div>
  );
};

export default ItemList;
