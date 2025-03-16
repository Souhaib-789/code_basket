import React, { useEffect, useState } from 'react';
import styles from './SnippetDetail.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { IoChevronBack } from 'react-icons/io5';
import { SnippetsMiddleware } from '../../../Store/Middlewares/SnippetsMiddleware';
import { useDispatch, useSelector } from 'react-redux';
import Skeleton from 'react-loading-skeleton'
import TextComponent from '../../../components/textComponent/TextComponent';
import { clearSnippetDetail } from '../../../Store/Actions/SnippetActions';
import { MdOutlineContentCopy } from 'react-icons/md';
import { LuCopy, LuCopyCheck } from 'react-icons/lu';


const SnippetDetail = () => {

    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { item } = location.state

    const DATA = useSelector(state => state.SnippetReducer?.snippetDetails)

    const [loading, setLoading] = useState(true);



    useEffect(() => {
        fetchDetails()
        return () => {
            dispatch(clearSnippetDetail())
        }
    }, [])

    const fetchDetails = (e) => {
        setLoading(true);
        dispatch(SnippetsMiddleware.getCodeSnippetsDetail({ id: item?.id }))
            .then((data) => { setLoading(false) })
            .catch((error) => { setLoading(false) })
    }

    console.log(DATA)


    const [copied, setCopied] = useState(false);

    const copyToClipboard = (e) => {
        navigator.clipboard.writeText(e)
            .then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            })
            .catch((err) => {
                console.error("Failed to copy code: ", err);
            });
    };

    return (
        <div className={styles.detail_page_container}>
            <div className={styles.row}>
                <div className={styles.backIcon} onClick={() => window.history.back()}>
                    <IoChevronBack />
                </div>


                <div style={{ width: '100%' }}>
                    {
                        loading ?
                            <div className={styles.skeleton_container}>
                                <Skeleton className={styles.skeleton_heading} />
                                <Skeleton className={styles.skeleton_span} />

                                <Skeleton className={styles.skeleton_text} />
                                <Skeleton className={styles.skeleton_text} />
                                <Skeleton className={styles.skeleton_text} />

                                <Skeleton className={styles.skeleton_span} />

                                <Skeleton className={styles.skeleton_box} />

                                <Skeleton className={styles.skeleton_span} />
                                <Skeleton className={styles.skeleton_text} />
                                <Skeleton className={styles.skeleton_text} />
                            </div>
                            :

                            <>
                                <h1 className={styles.snippet_title}>{DATA?.title}</h1>
                                <div className={styles.snippet_meta}>
                                    {
                                        DATA?.language &&
                                        <span className={styles.snippet_tag}>{DATA?.language}</span>
                                    }
                                    {
                                        (DATA?.framework == 'None' || DATA?.framework == null) ? null :
                                            <span className={styles.snippet_tag}>{DATA?.framework}</span>
                                    }
                                </div>

                                <TextComponent text={DATA?.type} style={{ color: "var(--secondary-color)" }} />
                                <div className={styles.user_info_view}>
                                    <TextComponent text={'Created by,'} />
                                    <div className={styles.pro_row}>
                                        <img src={DATA?.created_by?.image ? DATA?.created_by?.image : require('../../../assets/images/dummy.png')} alt="" className={styles.avatar} />
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            <div onClick={() => navigate('/profile', { state: { screenType: 'detail', data: DATA?.created_by } })}>
                                                <TextComponent text={DATA?.created_by?.name ? DATA?.created_by?.name : '--'} className={styles.text} style={{ textDecorationLine: 'underline', cursor: 'pointer' }} />
                                            </div>
                                            <TextComponent text={DATA?.created_by?.bio ? DATA?.created_by?.bio : '--'} className={styles.span} />
                                        </div>
                                    </div>
                                </div>


                                <p className={styles.snippet_description}>{DATA?.description}</p>

                                <div className={styles.usage_section}>
                                    <h2 className={styles.usage_title}>Code Snippet,</h2>
                                    <div className={styles.code_block}>
                                        <button className={styles.copy_button} onClick={() => copyToClipboard(DATA?.snippet)}>
                                            {copied ? <LuCopyCheck color='white' size={15} />
                                                : <LuCopy color='white' size={15} />
                                            }

                                            {copied ? 'Copied!' : 'Copy'}
                                        </button>
                                        <pre className={styles.usage_code}>
                                            <code>{DATA?.snippet}</code>
                                        </pre>
                                    </div>
                                </div>


                                {
                                    DATA?.usage_example?.code &&

                                    <div className={styles.usage_section}>
                                        <h2 className={styles.usage_title}>Usage Example,</h2>
                                        <p className={styles.usage_description}><b>Input : </b>{DATA?.usage_example?.input}</p>
                                        <p className={styles.usage_description}><b>Expected Output : </b>{DATA?.usage_example?.expected_output}</p>

                                        <div className={styles.code_block}>

                                            <button className={styles.copy_button} onClick={() => copyToClipboard(DATA?.usage_example?.code)}>
                                                {copied ? 'Copied!' : 'Copy'}
                                            </button>

                                            <pre className={styles.usage_code}>
                                                <code>{DATA?.usage_example?.code}</code>
                                            </pre>

                                        </div>
                                    </div>

                                }
                            </>
                    }
                </div>
            </div>
        </div>
    );
};

export default SnippetDetail;
