import React from 'react';
import TextComponent from '../textComponent/TextComponent';
import { FaSquareArrowUpRight } from 'react-icons/fa6';
import styles from './SnippetCard.module.css';
import { CustomLanguageIcon } from '../CustomLanguageIcon/CustomLanguageIcon';
import { useNavigate } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { SnippetsMiddleware } from '../../Store/Middlewares/SnippetsMiddleware';
import { showAlert } from '../../Store/Actions/GeneralActions';

const SnippetCard = ({ del, item, index }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onClickDelSnippet = (id) => {
        dispatch(SnippetsMiddleware.deleteCodeSnippet({ id: id }))
            .then((data) => {
                dispatch(showAlert({ message: 'Snippet Deleted Successfully', type: 'success' }))
            }
            )
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <div className={styles.card}>
            <div className={styles.card_sub_view}>

                <img src={require('../../assets/images/snippet.png')} alt="" className={styles.card_image} />
                <div className={styles.card_mini_view}>
                    <div className={styles.heading_row} >
                        <TextComponent max={20} text={item?.title} className={styles.prodName} />


                        <div className={styles.row}>
                            <TextComponent text={item?.language} className={styles.language_text} />

                            {
                                del ?
                                    <div className={styles.colored_icon} style={{ cursor: 'pointer' }} onClick={() => { onClickDelSnippet(item?.id) }}>
                                        <MdDelete color={'var(--secondary-color)'} className={styles.delete_icon} />
                                    </div>
                                    :
                                    <div className={styles.colored_icon}>
                                        <CustomLanguageIcon language={item?.language?.toLowerCase()} />
                                    </div>
                            }


                        </div>
                    </div>
                    <div className={styles.statusCont}>
                        <TextComponent text={'Created by : '} className={styles.span} />
                        <div className={styles.row} >
                            <img src={item?.created_by?.image ? item?.created_by?.image : require('../../assets/images/dummy.png')} alt="" className={styles.avatar} />
                            <TextComponent text={item?.created_by?.name ? item?.created_by?.name : '--'} className={styles.text} />
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.wide_row}>
                <TextComponent max={50} text={item?.description} className={styles.desc} />
                <div onClick={() => navigate('/snippetDetail', { state: { item } })}>
                    <FaSquareArrowUpRight color="var(--secondary-color)" size={30} />
                </div>
            </div>

        </div>
    );
};

export default SnippetCard;