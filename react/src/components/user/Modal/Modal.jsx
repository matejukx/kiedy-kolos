import ReactDOM from 'react-dom';
import './Modal.scss';
import { motion, AnimatePresence } from 'framer-motion';

const Modal = ({ isVisible, children }) => {
  return ReactDOM.createPortal(
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className='modal__background'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ ease: [0.05, 0.75, 0.25, 0.95] }}
        >
          <motion.div
            className='modal__body'
            initial={{ y: 30, scale: 0.9 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: 0, scale: 0.9 }}
            transition={{ ease: [0.05, 0.75, 0.25, 0.95] }}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,

    document.querySelector('#modal')
  );
};

export default Modal;
