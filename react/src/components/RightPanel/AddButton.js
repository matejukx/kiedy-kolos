import { useDispatch } from 'react-redux';
import { setAddEventPopup } from '../../actions';

const AddButton = () => {
    const dispatch = useDispatch();
    const openAddEventPopup = () => {
        dispatch(setAddEventPopup(true));
    };

    return (
        <div className='event--adder'>
            <button className='extension__button' onClick={openAddEventPopup}>
                Dodaj Wydarzenie
            </button>
        </div>
    );
};

export default AddButton;
