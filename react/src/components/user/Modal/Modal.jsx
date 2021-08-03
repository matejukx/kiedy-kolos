import ReactDOM from 'react-dom';
import './Modal.scss';

const Modal = ({ children }) => {
  return ReactDOM.createPortal(
    <div className='modal__background'>
      <div className='modal__body'>{children}</div>
    </div>,
    document.querySelector('#modal')
  );
};

export default Modal;
