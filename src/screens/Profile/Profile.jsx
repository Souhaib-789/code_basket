import React, { useEffect, useRef, useState } from 'react';
import styles from './Profile.module.css';
import AVATAR from '../../assets/images/dummy.png'
import { InputField, SubmitButton, TextComponent } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { IoChevronBack, IoMail } from 'react-icons/io5';
import { AuthMiddleware } from '../../Store/Middlewares/AuthMiddleware';
import RightModal from '../../components/RightModal/RightModal';

import { clearMySnippets } from '../../Store/Actions/SnippetActions';
import { SnippetsMiddleware } from '../../Store/Middlewares/SnippetsMiddleware';
import ListEmptyComponent from '../../components/ListEmptyComponent/ListEmptyComponent';
import { Skeleton } from 'antd';
import SnippetCard from '../../components/SnippetCard/SnippetCard';

const Profile = () => {

    const USER = useSelector(state => state.AuthReducer?.user);

    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const screenType = location?.state?.screenType
    const routeData = location?.state?.data
    const DEVELOPER_SNIPPETS = useSelector(state => state.SnippetReducer?.mySnippets);

    

    const [name, setname] = useState(screenType == 'detail' ? (routeData?.name || '--') : USER?.name);
    const [email, setemail] = useState(screenType == 'detail' ? (routeData?.email || '--') : USER?.email);
    const [bio, setbio] = useState(screenType == 'detail' ? (routeData?.bio || '--') : USER?.bio);
    const [selectedImage, setSelectedImage] = useState();
    const hiddenFileInput = useRef(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);



    useEffect(() => {
        if (screenType == 'detail') {
        fetchDeveloperSnippets()
        }
    }, [])

    const fetchDeveloperSnippets = () => {
        setLoading(true);
        dispatch(clearMySnippets())
        dispatch(SnippetsMiddleware.getMyCodeSnippets({ id: routeData?.id }))
            .then((data) => { setLoading(false) })
            .catch((error) => { setLoading(false) })
    }



    const handleFileChange = (event) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedImage(file);
        }
    };

    const onSaveChanges = () => {
        const data = {
            name: name,
            bio: bio,
            image: selectedImage ? selectedImage : undefined,
            user_id: USER?.id
        }
        console.log(data);
        

        dispatch(AuthMiddleware.updateProfile(data))
            .then((data) => { navigate('/dashboard') })
            .catch((error) => { console.log(error) })
            .finally(() => {
                setIsModalOpen(false)
            })
    }

    const handleFileHandler = () => {
        hiddenFileInput.current.click();
    };


    return (
        <div className={styles.container}>
            <div className={styles.backIcon} onClick={() => window.history.back()}>
                <IoChevronBack />
            </div>
            <div className={styles.gradient_bar}>

                <div className={styles.row}>
                    <div className={styles.formRow}>

                        <div className={styles.profileWrapper}>
                            <img src={screenType == 'detail' ? (routeData?.image) : USER?.image ? USER?.image : AVATAR} className={styles.avatar} />
                        </div>

                        <div className={styles.profileDetails}>
                            <TextComponent text={name} className={styles.name} />
                            <TextComponent text={bio} className={styles.bio}/>
                            <SubmitButton title={screenType == 'detail' ? 'Get in touch' : 'Edit Profile'} secondaryBtn textClass={styles.btn_text} btnClass={styles.top_button}
                                onClick={screenType == 'detail' ? () => {
                                    window.open(`mailto:${email}`, '_blank');
                                } : () => {
                                    setIsModalOpen(true)
                                }} />
                        </div>
                    </div>

                    <div className={styles.no_Details}>
                        <TextComponent text={'No of snippets uploaded'} />
                        <TextComponent text={DEVELOPER_SNIPPETS?.length} className={styles.no_of_snippet} />
                    </div>
                </div>
            </div>


            {
                screenType == 'detail' &&

                <div className={styles.sub_view}>
                    <TextComponent text={`In ${name}'s basket,`} className={styles.label} />

                    <div className={styles.listView}>
                        {
                            loading ?
                                [1, 2]?.map((item, index) =>
                                    <Skeleton.Button active={true} className={styles.skeleton} />
                                )
                                :
                                (
                                    DEVELOPER_SNIPPETS?.length === 0 ?
                                        <ListEmptyComponent text={'No snippet uploaded'} image={'../../../assets/images/nodata.png'} />
                                        :
                                        DEVELOPER_SNIPPETS?.map((item, index) => <SnippetCard item={item} index={index} />)
                                )
                        }
                    </div>
                </div>

            }


            <RightModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div className={styles.avatarWrapper}>
                    <img
                        onClick={handleFileHandler}

                        src={selectedImage ? URL.createObjectURL(selectedImage) : USER?.image ? USER?.image : AVATAR} className={styles.avatar} />
                    <input
                        // disabled={screenType == 'detail' ? true : false}
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                        ref={hiddenFileInput}

                    />
                </div>

                <InputField
                    // disabled={screenType == 'detail' ? true : false}
                    value={name}
                    onChange={e => setname(e.target.value)}
                    label="Name"
                    placeholder="Enter your name here"
                    inputClass={styles.input}
                    className={styles.input_container}
                />

                <InputField
                    // disabled={screenType == 'detail' ? true : false}
                    value={bio}
                    onChange={e => setbio(e.target.value)}
                    label="Bio"
                    placeholder="Enter your bio here"
                    inputClass={styles.input}
                    className={styles.input_container}
                />

                <SubmitButton title="Save Changes" onClick={onSaveChanges} textClass={styles.btn_text} btnClass={styles.saveBtn} />
            </RightModal>
        </div>
    );
};

export default Profile;
