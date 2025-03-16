import React, { useRef, useState } from 'react';
import styles from './Profile.module.css';
import AVATAR from '../../assets/images/dummy.png'
import { InputField, SubmitButton } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { IoChevronBack } from 'react-icons/io5';
import { AuthMiddleware } from '../../Store/Middlewares/AuthMiddleware';

const Profile = () => {

    const USER = useSelector(state => state.AuthReducer?.user);

    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const screenType = location?.state?.screenType
    const routeData = location?.state?.data


    const [name, setname] = useState(screenType == 'detail' ? (routeData?.name || '--') : USER?.name);
    const [email, setemail] = useState(screenType == 'detail' ? (routeData?.email || '--') : USER?.email);
    const [snippets, setsnippets] = useState(screenType == 'detail' ? (routeData?.no_of_snippets || 0) : 0);
    const [bio, setbio] = useState(screenType == 'detail' ? (routeData?.bio || '--') : USER?.bio);
    const [selectedImage, setSelectedImage] = useState();
    const hiddenFileInput = useRef(null);

    console.log('USER', routeData)

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
            user_id: USER?.sub
        }

        dispatch(AuthMiddleware.updateProfile(data))
            .then((data) => { navigate('/dashboard') })
            .catch((error) => { console.log(error) })
    }

    const handleFileHandler = () => {
        hiddenFileInput.current.click();
    };

    return (
        <div className={styles.container}>
            <div className={styles.row}>
                <div className={styles.backIcon} onClick={() => window.history.back()}>
                    <IoChevronBack />
                </div>


                <div style={{ width: '100%' }}>
                    <div className={styles.avatarWrapper}>
                        <img
                            onClick={handleFileHandler}

                            src={selectedImage ? URL.createObjectURL(selectedImage)   : screenType == 'detail' ?  (routeData?.image) : USER?.image ? USER?.image   : AVATAR} className={styles.avatar} />
                        <input
                            disabled={screenType == 'detail' ? true : false}
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            style={{ display: 'none' }}
                            ref={hiddenFileInput}

                        />
                    </div>
                    <div className={styles.formRow}>
                        <InputField
                            disabled={screenType == 'detail' ? true : false}
                            value={name}
                            onChange={e => setname(e.target.value)}
                            label="Name"
                            placeholder="Enter your name here"
                            inputClass={styles.input}
                            className={styles.input_container}
                        />
                        <InputField
                            disabled={true}
                            value={email}
                            onChange={e => setemail(e.target.value)}
                            label="Email"
                            placeholder="Enter your email here"
                            inputClass={styles.input}
                            className={styles.input_container}
                        />
                    </div>

                    <div className={styles.formRow}>
                        <InputField
                            disabled={screenType == 'detail' ? true : false}

                            value={bio}
                            onChange={e => setbio(e.target.value)}
                            label="Bio"
                            placeholder="Enter your bio here"
                            inputClass={styles.input}
                            className={styles.input_container}
                        />
                        <InputField
                            disabled={true}
                            value={snippets}
                            onChange={e => setsnippets(e.target.value)}
                            label="No. of Snippets Uploaded"
                            inputClass={styles.input}
                            className={styles.input_container}
                        />
                    </div>

                    {
                        screenType == 'detail' ? null :


                            <SubmitButton title="Save Changes" onClick={onSaveChanges} btnClass={styles.saveBtn} />}
                </div>
            </div>
        </div>
    );
};

export default Profile;
