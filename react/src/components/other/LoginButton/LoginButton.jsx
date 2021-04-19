import Button from '../Button/Button';

const LoginButton = ({ isAdmin }) => {
  const showLoginPanel = () => {
    console.log('Showing Login Panel');
  };

  if (!isAdmin) {
    return (
      <Button
        handleClick={showLoginPanel}
        modifier='button--transparent button--verified'
      >
        <span title='Zalogowano jako Administrator' className='material-icons'>
          check_circle_outline
        </span>
      </Button>
    );
  }

  return (
    <Button>
      <span className='material-icons'>person</span>
    </Button>
  );
};

export default LoginButton;
