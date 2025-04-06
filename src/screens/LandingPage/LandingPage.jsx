import React, { useEffect, useState } from "react";
import styles from "./LandingPage.module.css";
import TextComponent from "../../components/textComponent/TextComponent";
import SubmitButton from "../../components/submitButton/SubmitButton";
import { useNavigate } from "react-router-dom";
import { BiBasket, BiSolidPointer } from "react-icons/bi";
import { IoCloudUploadOutline } from "react-icons/io5";
import { VscSparkle } from "react-icons/vsc";
import { AiOutlineFileSearch } from "react-icons/ai";
import { PiRankingThin, PiUserListLight } from "react-icons/pi";
import { BsShieldLock } from "react-icons/bs";
import { TbBrandFeedly, TbPhotoSpark } from "react-icons/tb";
import { AnimatePresence, motion } from "framer-motion";
import { RxCrossCircled } from "react-icons/rx";
import { MdOutlineOpenInFull } from "react-icons/md";
import { FaBars, FaTimes } from "react-icons/fa";


const LandingPage = () => {

    const navigate = useNavigate()
    const [openIndex, setOpenIndex] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };


    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768 && menuOpen) {
                setMenuOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, [menuOpen]);

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


    const faqsData = [
        {
            question: 'Is CodeBasket free to use?',
            answer: 'Yes! You can explore snippets, save your own, and connect with other devs — all for free. We may introduce premium features later, but core access will always stay free.',
        },
        {
            question: 'What languages and frameworks are supported?',
            answer: 'CodeBasket supports all major programming languages and frameworks — from JavaScript, Python, and Java to React, Flutter, and Node.js. More support is added regularly.',
        },
        {
            question: 'How does the snippet categorization work?',
            answer: 'Once you upload a snippet, we automatically detect the language and suggest a category.',
        },
        {
            question: 'How is this different from GitHub Gists or Notion?',
            answer: 'CodeBasket is built specifically for developers to save, categorize, and reuse small code snippets. Unlike Gists or docs, it offers usage examples, search by tech category, and a community-driven vibe.',
        },
        {
            question: "Can I copy and use someone else's snippet in my project?",
            answer: "Yes — that's the point! All public snippets are meant to be reused and modified. Just be kind and give credit if you’re using someone’s original work in a public project.",
        },
        {
            question: "I guess maybe some features are missing?",
            answer: "You're right — and we hear you! CodeBasket is currently in version 1.0, focused on solving the core pain: saving and exploring code snippets efficiently. Features like dark mode, snippet sharing, password recovery, and more personalization options are already in the roadmap. We’re building this with the community, and your feedback directly shapes what’s next. ____ Hey, Rome wasn’t built in a sprint either 😉"
        }, {
            question: "Why should I use CodeBasket instead of just searching GitHub or asking friends?",
            answer: "Great question! While GitHub is great for full projects, it’s not designed for quickly finding small, reusable code snippets. With CodeBasket, everything is cleanly organized, searchable by language and use-case, and ready to copy-paste. No more digging through messy repos, asking friends for old code, or spending hours cleaning someone else’s logic. It's faster, simpler, and built just for devs who value their time.",
        }
    ];


    const bulletPoints = [
        {
            text: "Save your code snippets once — access them anywhere, anytime",
        },
        {
            text: "Let us auto-detect the language, type, and category for you",
        },
        {
            text: "Discover real-world code used by the dev community",
        },
        {
            text: "Copy usable examples instead of figuring things out from mess",
        },
        {
            text: "Explore profiles, follow devs, and build your coding circle",
        },
        {
            text: "No more “send me that code” — just share your snippet basket",
        }
    ]



    return (
        <div className={styles.container}>

            <div className={styles.navbar}>
                <img src={require('../../assets/images/wordLogo.png')} alt="Logo" className={styles.logo} />

                <div className={styles.menuIcon} onClick={() => setMenuOpen(!menuOpen)}>
                    {menuOpen ? <FaTimes size={24} color="var(--light-grey)" /> : <FaBars size={24} color="var(--light-grey)" />}
                </div>

                <div className={styles.navRight}>
                    <a href="#about" className={styles.link}>
                        <TextComponent text="About" />
                    </a>
                    <a href="#features" className={styles.link}>
                        <TextComponent text="Features" />
                    </a>
                    <a href="#faqs" className={styles.link}>
                        <TextComponent text="FAQs" />
                    </a>
                    <SubmitButton onClick={() => navigate('/login')} title="Login" btnClass={styles.loginButton} />
                </div>

                <AnimatePresence>
                    {menuOpen && (
                        <motion.div
                            className={styles.mobileMenu}
                            initial={{ y: -200, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -200, opacity: 0 }}
                            transition={{ duration: 0.4, ease: 'easeInOut' }}
                        >
                            <a href="#about" onClick={() => setMenuOpen(false)}>
                                <TextComponent text="About" />
                            </a>
                            <a href="#features" onClick={() => setMenuOpen(false)}>
                                <TextComponent text="Features" />
                            </a>
                            <a href="#faqs" onClick={() => setMenuOpen(false)}>
                                <TextComponent text="FAQs" />
                            </a>

                            <SubmitButton onClick={() => { setMenuOpen(false); navigate('/login') }} title="Login" btnClass={styles.loginButton} />

                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* <div className={styles.navbar}>
                <img src={require('../../assets/images/wordLogo.png')} alt="Logo" className={styles.logo} />

                <div className={styles.navRight}>
                    <a href="#about" className={styles.link}>
                        <TextComponent text="About" />
                    </a>
                    <a href="#features" className={styles.link}>
                        <TextComponent text="Features" />
                    </a>
                    <a href="#faqs" className={styles.link}>
                        <TextComponent text="FAQs" />
                    </a>
                    <SubmitButton onClick={() => navigate('/login')} title="Login" btnClass={styles.loginButton} />
                </div>
            </div> */}

            <section className={styles.hero}>
                <div className={styles.heroText} >

                    <h1 className={styles.heroTitle}>
                        Where <text style={{ color: "var(--secondary-color)" }}>Smart Developers </text> Save Their Best Work
                    </h1>
                    <p className={styles.heroSubtitle}>
                        <TextComponent text="A snippet-saving platform that stores, organizes, and tags your code and makes reuse effortless. " />
                    </p>
                    <button className={styles.heroButton} onClick={() => navigate('/login')}>
                        <TextComponent text="Get Started" />
                    </button>
                </div>



                <motion.div
                    className={styles.heroImageView}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 80, delay: 0.7 }}
                >

                    <img src={require('../../assets/images/shade.png')} className={styles.shade} alt="Code Basket" />
                    <img src={require('../../assets/images/basket.png')} className={styles.heroImage} alt="Code Basket" />

                </motion.div>
            </section>

            <section id="about" className={styles.aboutSection}>

                <div className={styles.aboutImageView}>
                    <img src={require('../../assets/images/meme.png')} className={styles.aboutImage} alt="Code Basket" />
                </div>
                <div className={styles.contentSection}>
                    <TextComponent text="Why CodeBasket?" className={styles.contentTitle} />
                    <div className={styles.bulletPointView}>
                        {
                            bulletPoints.map((item, index) => (
                                <motion.div
                                    key={index}
                                    className={styles.bulletPoint}
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    <BiSolidPointer color={'var(--secondary-color)'} className={styles.small_icon} />
                                    <TextComponent text={item?.text} />
                                </motion.div>
                            ))
                        }
                    </div>
                </div>
            </section>

            <section id="features" className={styles.featuresSection}>
                <h2 className={styles.sectionTitle}>
                    <TextComponent text="What's in it ?" />
                </h2>
                <div className={styles.featuresGrid}>
                    {FEATURES.map((item, i) => (
                        <motion.div
                            key={i}
                            className={styles.featureCard}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                        >
                            {item.icon}
                            <h3 className={styles.featureTitle}>
                                <TextComponent text={item?.title} />
                            </h3>
                            <p className={styles.featureDescription}>
                                <TextComponent text={item?.description} />
                            </p>
                            {item.comingSoon &&
                                <TextComponent text="Coming Soon" className={styles.comingSoon} />}
                        </motion.div>
                    ))}
                </div>
            </section>

            <section id="faqs" className={styles.faqSection}>
                <h2 className={styles.sectionTitle}>
                    <TextComponent text="Frequently Asked Questions" />
                </h2>
                <div className={styles.faqList}>
                    {faqsData.map((item, index) => (
                        <div
                            key={index}
                            className={`${styles.faqItem} `}
                        >
                            <div className={styles.question} onClick={() => toggleFAQ(index)}>
                                <TextComponent text={item.question} className={styles.question_text} />
                                {openIndex === index ?
                                    <RxCrossCircled color="var(--secondary-color)" className={styles.small_icon} />
                                    :
                                    <MdOutlineOpenInFull color="var(--primary-color)" className={styles.small_icon} />
                                }
                            </div>
                            <AnimatePresence initial={false}>
                                {openIndex === index && (
                                    <motion.div
                                        className={styles.answerMotion}
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.4, ease: 'easeInOut' }}
                                    >
                                        <TextComponent text={item.answer} className={styles.answerText} />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </section>



            <footer className={styles.footer}>
                <TextComponent text="© 2025 CodeBasket. All rights reserved." />
            </footer>
        </div>
    );
};

export default LandingPage;
