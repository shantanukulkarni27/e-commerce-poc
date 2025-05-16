import React from 'react';
import styles from './Loader.module.css';

const Loader = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.textWrapper}>
        <p className={styles.text}>Loading...</p>
        <div className={styles.invertbox} />
      </div>
    </div>
  );
};

export default Loader;
