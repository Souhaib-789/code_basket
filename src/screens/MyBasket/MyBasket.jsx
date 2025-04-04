import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "./MyBasket.module.css";
import { Dropdown, InputField, SubmitButton, TextComponent } from "../../components";
import { SnippetsMiddleware } from "../../Store/Middlewares/SnippetsMiddleware";
import { showAlert, showLoading, showUploadingLoading } from "../../Store/Actions/GeneralActions";
import RightModal from "../../components/RightModal/RightModal";
import SnippetCard from "../../components/SnippetCard/SnippetCard";
import { clearMySnippets } from "../../Store/Actions/SnippetActions";
import { Skeleton } from "antd";
import { VscAdd } from "react-icons/vsc";
import ListEmptyComponent from "../../components/ListEmptyComponent/ListEmptyComponent";

const MyBasket = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const USER = useSelector(state => state.AuthReducer.user);
    const SNIPPETS_LIST = useSelector(state => state.SnippetReducer?.mySnippets);


    const [title, setTitle] = useState('');
    const [type, setType] = useState('');
    const [description, setDescription] = useState('');
    const [codeSnippet, setCodeSnippet] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [loading, setLoading] = useState(true);


    useEffect(() => {
        fetchMySnippets()
    }, [])

    const fetchMySnippets = () => {
        setLoading(true);
        dispatch(clearMySnippets())
        dispatch(SnippetsMiddleware.getMyCodeSnippets({ id: USER?.id }))
            .then((data) => { setLoading(false) })
            .catch((error) => { setLoading(false) })
    }


    const TYPES = [
        {
            id: 1,
            value: 'UI / Frontend Component',
            span: 'React components, UI elements, layout code, CSS snippets, etc'
        }, {
            id: 2,
            value: 'API Calls & Integrations',
            span: 'Code for making HTTP requests, API endpoint interactions, OAuth integrations, etc'
        }, {
            id: 3,
            value: 'Algorithms & Data Structures',
            span: 'Sorting, searching, recursion, graph algorithms, and various data structure implementations'
        },
        // {
        //     id: 4,
        //     value: 'Database Queries & ORM Code',
        //     span: 'SQL queries, NoSQL queries, ORM methods.'
        // },
        // {
        //     id: 5,
        //     value: 'Utility Functions & Helpers',
        //     span: 'Common helper functions, formatting utilities, and reusable utility snippets'
        // },
        // {
        //     id: 6,
        //     value: 'Configuration & Setup Code',
        //     span: 'Environment configurations, initialization scripts, build configurations, etc'
        // },
        // {
        //     id: 7,
        //     value: 'Testing & Debugging Code',
        //     span: 'Unit tests, integration tests, debugging code snippets, etc'
        // },
        // {
        //     id: 8,
        //     value: 'Error Handling & Logging',
        //     span: 'Exception management, error handling routines, logging utilities'
        // },
        // {
        //     id: 9,
        //     value: 'Security & Authentication',
        //     span: 'Code snippets for authentication, authorization, encryption, and security protocols'
        // },
        // {
        //     id: 10,
        //     value: 'Performance Optimization',
        //     span: 'Code snippets for performance optimization, caching, lazy loading, etc'
        // },
        // {
        //     id: 11,
        //     value: 'Deployment & CI/CD',
        //     span: 'Deployment scripts, CI/CD pipelines, Docker configurations, etc'
        // }, {
        //     id: 12,
        //     value: 'Boilerplate & Starter Code',
        //     span: 'Templates or common patterns that kickstart new projects or modules'
        // }
    ]


    const onUploadSnippet = () => {
        if (!title) {
            dispatch(showAlert({ message: 'Please enter title of your code snippet', type: 'Warning' }))
        }
        else if (!type) {
            dispatch(showAlert({ message: 'Please select type of your code snippet', type: 'Warning' }))
        }
        else if (!codeSnippet) {
            dispatch(showAlert({ message: 'Please enter code snippet', type: 'Warning' }))
        } else if (codeSnippet.length < 20) {
            dispatch(showAlert({ message: 'Code snippet should be atleast 10 characters long', type: 'Warning' }))
        }
        else {
            const data = {
                user_id: USER?.id,
                created_by: USER,
                title: title,
                type: type,
                description: description ? description.trim() : null,
                snippet: codeSnippet,
                thumbnail: null
            }

            // console.log("Data to upload: ", data);
            dispatch(SnippetsMiddleware.uploadCodeSnippet(data))
                .then((res) => {
                    dispatch(showAlert({ message: 'Code snippet uploaded successfully', type: 'Success' }))
                    navigate("/dashboard");
                    setTitle(null);
                    setDescription(null);
                    setCodeSnippet(null);
                    setType(null);
                    setIsModalOpen(false);
                })
                .catch(error => {
                    setIsModalOpen(false);
                    console.log("Error in uploading snippet: ", error);
                });
        }
    }

    return (
        <div className={styles.mainCont}>
            <div className={styles.container}>
                <div className={styles.widest_row}>
                    <TextComponent text={"My Code Snippets"} className={styles.heading} />

                    <SubmitButton
                    textClass={styles.btn_txt}
                    leftIcon={<VscAdd color="white" size={18} />}
                    title="Add Snippet" onClick={() => {
                        setIsModalOpen(true)
                    }} btnClass={styles.addBtn} style={{ marginTop: 0 }} />
                </div>



                <div className={styles.list_view}>
                    {
                        loading ?
                            [1, 2, 3, 4]?.map((item, index) => (
                                <Skeleton.Button active={true} className={styles.skeleton} />

                            ))
                            :
                            (

                                SNIPPETS_LIST?.length === 0 ?
                                <ListEmptyComponent text={'Your code basket is empty !'} snippet />
                                :
                                    SNIPPETS_LIST?.map((item, index) => <SnippetCard del item={item} index={index} />)
                            )
                    }
                </div>
            </div>

            <RightModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>

                <TextComponent text={"Add Snippet"} className={styles.heading} style={{ marginTop: '8%' }} />
                <div className={styles.wide_row} style={{ marginTop: '5%' }}>

                    <InputField
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        label="Title"
                        placeholder="Enter title"
                        inputClass={styles.input}
                        className={styles.half_input}
                        maxLength={40}
                    />
                    <Dropdown
                        label="Snippet type"
                        placeholder="Select Snippet type"
                        options={TYPES}
                        selectedValue={type}
                        onChange={value => setType(value?.value)}
                        className={styles.half_input}
                    />

                </div>

                <InputField
                    value={codeSnippet}
                    onChange={e => setCodeSnippet(e.target.value)}
                    label="Code Snippet"
                    placeholder="Enter your code snippet here"
                    inputClass={styles.input}
                    textArea
                    rows={10}
                />

                <InputField
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    label="Description"
                    placeholder="Enter description (optional)"
                    inputClass={styles.input}
                />

                <SubmitButton title="Upload" onClick={onUploadSnippet}  btnClass={styles.uploadBtn} />
            </RightModal>
        </div>
    );
};

export default MyBasket;
