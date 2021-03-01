import { useDispatch } from 'react-redux';
import { setAddEventPopup } from '../../actions';
import { motion } from 'framer-motion';

const AddButton = () => {
    const dispatch = useDispatch();
    const openAddEventPopup = () => {
        dispatch(setAddEventPopup(true));
    };

    return (
        <motion.div className='event--adder' whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <button className='extension__button' onClick={openAddEventPopup}>
                Dodaj Wydarzenie
            </button>
        </motion.div>
    );
};

export default AddButton;
