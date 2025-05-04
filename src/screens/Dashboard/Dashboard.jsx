import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "./Dashboard.module.css";
import { Dropdown, TextComponent } from "../../components";
import { Skeleton, Tabs } from 'antd';
import UIComponents from "./Snippets/UIComponents";
import { SnippetsMiddleware } from "../../Store/Middlewares/SnippetsMiddleware";
import { clearSnippetsList } from "../../Store/Actions/SnippetActions";
import APICallsIntegration from "./Snippets/APICallsIntegration";
import DSA from "./Snippets/DSA";

const Dashboard = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [language, setLanguage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeKey, setActiveKey] = useState('1');

  const timer = useRef(null);

  const DATA = useSelector(state => state.SnippetReducer?.Snippets)


  useEffect(() => {
    fetchSnippets(1)
  }, [])

  const fetchSnippets = (e, lang) => {
    setLoading(true);
    dispatch(clearSnippetsList())

    const typeMap = {
      1: 'UI / Frontend Component',
      2: 'API Calls & Integrations',
      3: 'Algorithms & Data Structures',
      4: 'Database Queries & ORM Code',
      5: 'Utility Functions & Helpers',
      6: 'Configuration & Setup Code',
      7: 'Testing & Debugging Code',
      8: 'Error Handling & Logging',
      9: 'Security & Authentication',
      10: 'Performance Optimization',
      11: 'Deployment & CI/CD',
      12: 'Boilerplate & Starter Code'
    };
    const type = typeMap[e] || 'UI / Frontend Component';
    dispatch(SnippetsMiddleware.getCodeSnippets({ snippetType: type, language: lang ? lang : language }))
      .finally(() => {
        setLoading(false)
      })
  }

  const onApplyFilter = (e) => {
    setLanguage(e.value)
    // dispatch(clearSnippetsList())
    clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      setLoading(true);
      fetchSnippets(activeKey, e.value)
    }, 1000)
  }


  const TYPES = useMemo(() => [
    { key: 1, label: 'UI / Frontend Component', children: <UIComponents loading={loading} data={DATA} /> },
    { key: 2, label: 'API Calls & Integrations', children: <APICallsIntegration loading={loading} data={DATA} /> },
    { key: 3, label: 'Algorithms & Data Structures', children: <DSA loading={loading} data={DATA} /> }
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
          <TextComponent text={"Explore Code Snippets"} className={styles.heading} />

          <Dropdown
            placeholder="Sort by language"
            options={LANGUAGES}
            value={language}
            onChange={onApplyFilter}
            className={styles.dropdown}
            inputClass={styles.inputClass}
            // color="var(--secondary-color)"
          />
        </div>

        <Tabs
          textStyle={{ color: 'var(--secondary-color)', fontFamily: 'var(--font-family)' }}
          style={{ fontFamily: 'var(--font-family)' }}
          defaultActiveKey="1"
          items={TYPES}
          
          onChange={(key) => {
            setActiveKey(key);
            fetchSnippets(key)
          }
          }
        />

      </div>
    </div>
  );
};

export default Dashboard;
