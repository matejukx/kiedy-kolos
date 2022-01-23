import ReactDOM from 'react-dom';
import './Modal.scss';
import { motion } from 'framer-motion';
import React, { useState } from 'react';

const Modal = ({ children, errorMessage }) => {
  return ReactDOM.createPortal(
    <>
      <motion.div
        className='modal__background'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ ease: [0.17, 0.67, 0.4, 0.88] }}
      >
        <motion.div
          className='modal__body'
          initial={{ y: 30, scale: 0.9 }}
          animate={{ y: 0, scale: 1 }}
          exit={{ y: 30, scale: 0.9 }}
          transition={{ ease: [0.17, 0.67, 0.4, 0.88] }}
        >
          {children}
          {errorMessage}
        </motion.div>
      </motion.div>
    </>,

    document.querySelector('#modal')
  );
};

export default Modal;
