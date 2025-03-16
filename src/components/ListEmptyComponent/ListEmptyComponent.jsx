import React from 'react';
import styles from './ListEmptyComponent.module.css';
import TextComponent from '../textComponent/TextComponent';

const ListEmptyComponent = ({text, snippet}) => {
  return (
    <div className={styles.emptyContainer}>
      <img
        src={snippet ? require('../../assets/images/empty.png') : require('../../assets/images/nodata.png')}
        alt="List Empty Component"
        className={styles.emptyImage}
      />
      <TextComponent text={text} className={styles.emptyText} />
    </div>
  );
};


export default ListEmptyComponent;
