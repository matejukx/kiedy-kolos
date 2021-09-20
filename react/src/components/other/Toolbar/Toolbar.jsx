import { useDispatch } from 'react-redux';
import { setSettingsPopup } from '../../../redux/slices/settingsPopup';
import Button from '../Button/Button';
import LoginButton from '../LoginButton/LoginButton';
import './Toolbar.scss';

const Toolbar = () => {
  const dispatch = useDispatch();

  const settingsClicked = () => {
    dispatch(setSettingsPopup(true));
  };

  return (
    <div className='toolbar'>
      <Button handleClick={() => settingsClicked()}>
        <span title='Ustawienia' className='material-icons'>
          settings
        </span>
      </Button>
      <Button>
        <span title='Powiadomienia' className='material-icons'>
          notifications
        </span>
      </Button>
      {/* <LoginButton /> */}
    </div>
  );
};

export default Toolbar;
