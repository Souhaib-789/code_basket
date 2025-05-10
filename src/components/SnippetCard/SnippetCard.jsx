import React, { useState } from 'react';
import TextComponent from '../textComponent/TextComponent';
import { FaSquareArrowUpRight } from 'react-icons/fa6';
import styles from './SnippetCard.module.css';
import { CustomLanguageIcon } from '../CustomLanguageIcon/CustomLanguageIcon';
import { useNavigate } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { SnippetsMiddleware } from '../../Store/Middlewares/SnippetsMiddleware';
import { showAlert } from '../../Store/Actions/GeneralActions';
import ModalComponent from '../modal/ModalComponent';
import SubmitButton from '../submitButton/SubmitButton';

const SnippetCard = ({ del, item, index }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [currItem, setCurrItem] = useState(null)
    const darkTheme = useSelector(state => state.GeneralReducer?.darkTheme);
    const searchedVal = useSelector(state => state.SnippetReducer?.searchedValue);


    const onClickDelSnippet = () => {
        dispatch(SnippetsMiddleware.deleteCodeSnippet({ id: currItem?.id }))
            .then((data) => {
                dispatch(showAlert({ message: 'Snippet Deleted Successfully', type: 'success' }))

            }
            )
            .catch((error) => {
                console.log(error)
            }).finally(() => {
                setOpenDeleteModal(false)
                setCurrItem(null)
            }
            )
    }

    const filteredItem = item?.title?.toLowerCase()?.includes(searchedVal?.toLowerCase()) 

    return (
        <div className={styles.card}>
            <div className={styles.card_sub_view}>

                <img src={require('../../assets/images/snippet.png')} alt="" className={styles.card_image} />
                <div className={styles.card_mini_view}>
                    <div className={styles.heading_row} >
                        <TextComponent text={item?.title} style={{backgroundColor: filteredItem ? 'yellow' :null }} className={styles.prodName} />

                        <div className={styles.row}>
                            <TextComponent text={item?.language} className={styles.language_text} />

                            {
                                del ?
                                    <div className={styles.colored_icon} style={{ cursor: 'pointer' }} onClick={() => { setCurrItem(item); setOpenDeleteModal(true) }}>
                                        <MdDelete color={'var(--secondary-color)'} className={styles.delete_icon} />
                                    </div>
                                    :
                                    <div className={styles.colored_icon}>
                                        <CustomLanguageIcon language={item?.language?.toLowerCase()} />
                                    </div>
                            }


                        </div>
                    </div>
                    {
                        item?.keywords?.length > 0 ?
                            <div className={styles.keywords_view}>
                                {
                                    item?.keywords?.map((item, index) => {
                                        return (
                                            <div className={darkTheme ? styles.keyword_box : styles.keyword_boxx} key={index}>
                                                <TextComponent text={'#' + item?.split(' ')?.join('')} className={styles.keywords} />
                                            </div>
                                        )
                                    })
                                }

                            </div>
                            : null
                    }


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

            <ModalComponent open={openDeleteModal} closable onCancel={() => setOpenDeleteModal(false)} >
                <img src={require('../../assets/images/delete.png')} className={styles.modal_image} />
                <TextComponent text={`Are you sure you want to delete ${currItem?.title} from your basket ?`} className={styles.modal_text} />
                <div className={styles.modal_btn_container}>
                    <SubmitButton title={'Cancel'} secondaryBtn btnClass={styles.cancel_btn} onClick={() => { setOpenDeleteModal(false); setCurrItem(null) }} />
                    <SubmitButton title={'Yes'} primaryBtn btnClass={styles.modal_btn} onClick={onClickDelSnippet} />
                </div>

            </ModalComponent>
        </div>
    );
};

export default SnippetCard;