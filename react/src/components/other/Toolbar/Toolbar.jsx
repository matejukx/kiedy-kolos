import Button from '../Button/Button';
import LoginButton from '../LoginButton/LoginButton';
import './Toolbar.scss';

const Toolbar = () => {
  return (
    <div className='toolbar'>
      <Button>
        <span title='Ustawienia' className='material-icons'>
          settings
        </span>
      </Button>
      <Button>
        <span title='Powiadomienia' className='material-icons'>
          notifications
        </span>
      </Button>
      <LoginButton />
    </div>
  );
};

export default Toolbar;
