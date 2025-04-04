import React from "react";
import styles from "./About.module.css";
import { FaGithub } from "react-icons/fa";
import { SubmitButton, TextComponent } from "../../components";
import { TbBrandFeedly, TbPhotoSpark, TbStarFilled } from "react-icons/tb";
import { AiFillSetting, AiOutlineFileSearch } from "react-icons/ai";
import { IoCloudUploadOutline, IoPeople } from "react-icons/io5";
import { PiLaptopDuotone, PiRankingThin, PiUserListLight } from "react-icons/pi";
import { VscSparkle } from "react-icons/vsc";
import { BsShieldLock } from "react-icons/bs";
import { BiBasket } from "react-icons/bi";


const AboutUs = () => {

    const tools = [
        {
            title: "Javascript",
            logo: require("../../assets/images/JavaScript-logo.png")
        },
        {
            title: "React",
            logo: require("../../assets/images/React.png")
        },
        {
            title: "Ant Design",
            logo: require("../../assets/images/ant.png")
        },
        {
            title: "Supabase",
            logo: require("../../assets/images/supabase.png")
        },
        {
            title: "Gemini",
            logo: require("../../assets/images/gemini.png")
        }
    ]

    const FEATURES = [
        {
            icon: <IoCloudUploadOutline className={styles.feature_icon} />,
            title: "Upload Your Code Snippet",
            description: "Easily upload your code with syntax highlighting and save it to your basket.",
        },
        {
            icon: <VscSparkle className={styles.feature_icon} />,
            title: "AI-based Categorization",
            description: "Our system smartly categorizes snippets by language and type using AI.",
        },
        {
            icon: <AiOutlineFileSearch className={styles.feature_icon} />
            ,
            title: "Explore Snippets",
            description: "Browse through code snippets by category and language with powerful filters.",
        },
        {
            icon: <BiBasket className={styles.feature_icon} />,
            title: "Your Personal Basket",
            description: "Access and manage all your uploaded snippets in one place.",
        },
        {
            icon: <PiUserListLight className={styles.feature_icon} />,
            title: "Developer Profiles",
            description: "View uploader's profile and connect with other developers.",
        },
        {
            icon: <BsShieldLock className={styles.feature_icon} />,
            title: "Secure Authentication",
            description: "Sign in securely and start uploading with your developer identity.",
        },
        {
            icon: <PiRankingThin className={styles.feature_icon} />,
            title: "Top Contributors",
            description: "A leaderboard to highlight most active developers.",
            comingSoon: true,
        },
        {
            icon: <TbBrandFeedly className={styles.feature_icon} />,
            title: "Snippet Feed",
            description: "A social-media like snippet feed to stay updated.",
            comingSoon: true,
        },
        {
            icon: <TbPhotoSpark className={styles.feature_icon} />,
            title: "Visual Output Preview",
            description: "Preview the expected output of snippets as thumbnails.",
            comingSoon: true,
        },
    ];



    return (
        <div className={styles.container}>
            <div className={styles.hero}>
                <h1>Empowering Developers, One Snippet at a Time 🚀</h1>
                <p>Code, Collaborate, and Contribute to a growing developer community.</p>
            </div>

            <div className={styles.section}>
                <div className={styles.row} >
                    <div className={styles.icon}>
                        <TbStarFilled size={18} color="var(--secondary-color)" />
                    </div>
                    <TextComponent text="Our Mission" className={styles.heading} />
                </div>
                <TextComponent text="To provide developers with high-quality, reusable code snippets and resources to speed up development." className={styles.text} />
            </div>

            <div className={styles.section}>
                <div className={styles.row} >
                    <div className={styles.icon}>
                        <TbStarFilled size={18} color="var(--secondary-color)" />
                    </div>
                    <TextComponent text="Features" className={styles.heading} />
                </div>
                <div className={styles.grid}>
                    {FEATURES.map((item, index) => (
                        <div key={index} className={styles.feature_card}>
                            {item.icon}
                            {/* <img src={item.icon} alt={item.title} className={styles.feature_icon} /> */}
                            <TextComponent text={item.title} className={styles.feature_title} />
                            <TextComponent text={item.description} className={styles.feature_description} />
                            {item.comingSoon &&
                                <TextComponent text="Coming Soon" className={styles.comingSoon} />}
                        </div>
                    ))}
                </div>
            </div>

            <div className={styles.section}>
                <div className={styles.row}>
                    <div className={styles.icon}>
                        <AiFillSetting size={18} color="var(--secondary-color)" />
                    </div>
                    <TextComponent text="Built With" className={styles.heading} />
                </div>

                <div className={styles.toolsGrid}>
                    {
                        tools.map((item, index) => {
                            return (
                                <div className={styles.teamGrid}>
                                    <div className={styles.stackCard}>
                                        <img src={item?.logo} className={styles.stack_avatar} />
                                        <TextComponent text={item?.title} className={styles.teamRole} />
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>


            <div className={styles.section}>
                <div className={styles.row} >
                    <div className={styles.icon}>
                        <IoPeople size={18} color="var(--secondary-color)" />
                    </div>
                    <TextComponent text="Meet the team" className={styles.heading} />
                </div>
                <div className={styles.teamGrid}>
                    <div className={styles.teamCard}>
                        <img src={require('../../assets/images/souhaibb.jpeg')} className={styles.avatar} />
                        <a href="https://github.com/Souhaib-789">
                            <TextComponent text="Muhammad Souhaib " className={styles.teamName} />
                        </a>
                        <TextComponent text="Founder" />
                    </div>
                </div>
            </div>

            <div className={styles.section}>
                <div className={styles.row}>
                    <div className={styles.icon}>
                        <PiLaptopDuotone size={18} color="var(--secondary-color)" />
                    </div>
                    <TextComponent text="Open Source & Community" className={styles.heading} />
                </div>
                <TextComponent text="We believe in open-source development. Want to contribute? Check out our repository." className={styles.text} />

                <SubmitButton
                    leftIcon={
                        <FaGithub size={18} color="var(--white)" />
                    }
                    onClick={
                        () => {
                            window.open("https://github.com/Souhaib-789/code_basket", "_blank");
                        }
                    } title={'Contribute on Github'} secondaryBtn btnClass={styles.contribute_button} />
            </div>
        </div>
    );
};

export default AboutUs;
