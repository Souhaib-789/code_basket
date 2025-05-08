import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "./Dashboard.module.css";
import { Dropdown, InputField, TextComponent } from "../../components";
import { Skeleton, Tabs } from 'antd';
import UIComponents from "./Snippets/UIComponents";
import { SnippetsMiddleware } from "../../Store/Middlewares/SnippetsMiddleware";
import { clearSnippetsList } from "../../Store/Actions/SnippetActions";
import APICallsIntegration from "./Snippets/APICallsIntegration";
import DSA from "./Snippets/DSA";
import ErrorHandling from "./Snippets/ErrorHandling";
import { CiSearch } from "react-icons/ci";
import { TbLayoutSidebarLeftExpand } from "react-icons/tb";
import { RxCross2 } from "react-icons/rx";
import { AnimatePresence, motion } from "framer-motion";

const Dashboard = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [language, setLanguage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeKey, setActiveKey] = useState('1');
  const [expand, setExpand] = useState(false);
  const [search, setSearch] = useState('');

  const timer = useRef(null);

  const DATA = useSelector(state => state.SnippetReducer?.Snippets)


  useEffect(() => {
    fetchSnippets(1)
  }, [])

  const fetchSnippets = (e, lang,search) => {
    setLoading(true);
    dispatch(clearSnippetsList())

    const typeMap = {
      1: 'UI / Frontend Component',
      2: 'API Calls & Integrations',
      3: 'Algorithms & Data Structures',
      4: 'Error Handling & Logging',
      5: 'Utility Functions & Helpers',
      6: 'Configuration & Setup Code',
      7: 'Testing & Debugging Code',
      8: 'Security & Authentication',
      9: 'Performance Optimization',
      10: 'Deployment & CI/CD',
      11: 'Boilerplate & Starter Code'
    };
    const type = typeMap[e] || 'UI / Frontend Component';
    dispatch(SnippetsMiddleware.getCodeSnippets({ snippetType: type, language: lang ? lang : language , search: search }))
      .finally(() => {
        setLoading(false)
      })
  }

  const onApplyLangFilter = (e) => {

    setLanguage(e.value)
    // dispatch(clearSnippetsList())
    clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      setLoading(true);
      fetchSnippets(activeKey, e.value)
    }, 1000)
  }

  const onSearchSnippet = (e) => {
    setSearch(e.target.value)
    setLoading(true);
    clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      fetchSnippets(activeKey, language, e.target.value)
    }, 1500)

  }


  const TYPES = useMemo(() => [
    { key: 1, label: 'UI / Frontend Component', children: <UIComponents loading={loading} data={DATA} /> },
    { key: 2, label: 'API Calls & Integrations', children: <APICallsIntegration loading={loading} data={DATA} /> },
    { key: 3, label: 'Algorithms & Data Structures', children: <DSA loading={loading} data={DATA} /> },
    { key: 4, label: 'Error Handling & Logging', children: <ErrorHandling loading={loading} data={DATA} /> },
  ], [DATA]);

  const LANGUAGES = useMemo(() => [
    { id: 1, value: 'JavaScript' }, { id: 2, value: 'Python' },
    { id: 3, value: 'Java' }, { id: 4, value: 'PHP' },
    { id: 5, value: 'C++' }, { id: 6, value: 'C#' },
    { id: 7, value: 'Go' }, { id: 8, value: 'Rust' },
    { id: 9, value: 'Swift' }, { id: 10, value: 'Kotlin' },
    { id: 11, value: 'Objective C' }, { id: 12, value: 'Ruby' },
    { id: 13, value: 'R' }, { id: 14, value: 'Matlab' },
    { id: 15, value: 'TypeScript' }
  ], []);


  return (
    <div className={styles.mainCont}>
      <div className={styles.container}>
        <div className={styles.wide_row}>

          {
            expand ?

              <AnimatePresence>
                <motion.div
                  className={styles.search_container}
                  initial={{ y: -100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -100, opacity: 0 }}
                  transition={{ duration: 0.4, ease: 'easeIn' }}
                >
                  <InputField
                    placeholder="Search Snippets"
                    className={styles.search}
                    inputClass={styles.inputClass}
                    leftIcon={
                      <CiSearch color={'var(--light-grey'} size={18} />
                    }
                    value={search}
                  onChange={onSearchSnippet}
                  />
                </motion.div>
              </AnimatePresence>

              :

              

              <TextComponent text={"Explore Code Snippets"} className={styles.heading} />
          }

          <div className={styles.row}>

            <div onClick={() => setExpand(!expand)} className={styles.search_icon}>
              {
                expand ?
                  <RxCross2 color={'var(--light-grey)'} size={22} />
                  :
                  <CiSearch color={'var(--light-grey)'} size={22} />
              }
            </div>

            <Dropdown
              placeholder="Sort by language"
              options={LANGUAGES}
              value={language}
              onChange={onApplyLangFilter}
              className={styles.dropdown}
              inputClass={styles.inputClass}
            // color="var(--secondary-color)"
            />
          </div>
        </div>



        <Tabs
          textStyle={{ color: 'var(--secondary-color)', fontFamily: 'var(--font-family)' }}
          style={{ fontFamily: 'var(--font-family)' }}
          defaultActiveKey="1"
          items={TYPES}

          onChange={(key) => {
            setActiveKey(key);
            fetchSnippets(key)
            setSearch('')
            setLanguage(null)
            setExpand(false)
          }
          }
        />

      </div>
    </div>
  );
};

export default Dashboard;
