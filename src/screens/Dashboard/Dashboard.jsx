import React, { useEffect, useRef, useState } from "react";
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
import { showLoading } from "../../Store/Actions/GeneralActions";

const Dashboard = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [language, setLanguage] = useState(null);
  const [loading , setLoading] = useState(true);

  const timer = useRef(null);

  const DATA = useSelector(state => state.SnippetReducer?.Snippets)


  useEffect(() => {
    fetchSnippets()
  }, [])

  const fetchSnippets = (e) => {
    setLoading(true);
    dispatch(clearSnippetsList())
    const type = e == 1 ? 'UI / Frontend Component' : e == 2 ? 'API Calls & Integrations' : e == 3 ? 'Algorithms & Data Structures' : e == 4 ? 'Database Queries & ORM Code' : e == 5 ? 'Utility Functions & Helpers' : e == 6 ? 'Configuration & Setup Code' : e == 7 ? 'Testing & Debugging Code' : e == 8 ? 'Error Handling & Logging' : e == 9 ? 'Security & Authentication' : e == 10 ? 'Performance Optimization' : e == 11 ? 'Deployment & CI/CD' : e == 12 ? 'Boilerplate & Starter Code' : 'UI / Frontend Component';
    dispatch(SnippetsMiddleware.getCodeSnippets({ snippetType: type }))
      .then((data) => { setLoading(false) })
      .catch((error) => { setLoading(false) })
  }

  const onApplyFilter = (e) => {
    setLanguage(e.value)
    dispatch(clearSnippetsList())
    clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      setLoading(true);
      dispatch(clearSnippetsList())
      const type = e == 1 ? 'UI / Frontend Component' : e == 2 ? 'API Calls & Integrations' : e == 3 ? 'Algorithms & Data Structures' : e == 4 ? 'Database Queries & ORM Code' : e == 5 ? 'Utility Functions & Helpers' : e == 6 ? 'Configuration & Setup Code' : e == 7 ? 'Testing & Debugging Code' : e == 8 ? 'Error Handling & Logging' : e == 9 ? 'Security & Authentication' : e == 10 ? 'Performance Optimization' : e == 11 ? 'Deployment & CI/CD' : e == 12 ? 'Boilerplate & Starter Code' : 'UI / Frontend Component';
      dispatch(SnippetsMiddleware.getCodeSnippets({ snippetType: type , language: e.value }))
        .then((data) => { setLoading(false) })
        .catch((error) => { setLoading(false) })
    }, 1000)
  }


  const TYPES = [
    {
      key: 1,
      label: 'UI / Frontend Component',
      children: <UIComponents loading={loading} data={DATA} />,
    }, {
      key: 2,
      label: 'API Calls & Integrations',
      children: <APICallsIntegration loading={loading} data={DATA} />,
    }, {
      key: 3,
      label: 'Algorithms & Data Structures',
      children: <DSA loading={loading} data={DATA} />,
    },
    // {
    //   key: 4,
    //   label: 'Database Queries & ORM Code',
    //   // children: ,
    // },
    // {
    //   key: 5,
    //   label: 'Utility Functions & Helpers',
    //   // children: ,
    // },
    // {
    //   key: 6,
    //   label: 'Configuration & Setup Code',
    //   // children: ,
    // },
    // {
    //   key: 7,
    //   label: 'Testing & Debugging Code',
    //   // children: ,
    // },
    // {
    //   key: 8,
    //   label: 'Error Handling & Logging',
    //   // children: ,
    // },
    // {
    //   key: 9,
    //   label: 'Security & Authentication',
    //   // children: ,
    // },
    // {
    //   key: 10,
    //   label: 'Performance Optimization',
    //   // children: ,
    // },
    // {
    //   key: 11,
    //   label: 'Deployment & CI/CD',
    //   // children: ,
    // }, {
    //   key: 12,
    //   label: 'Boilerplate & Starter Code',
    //   // children: ,
    // }
  ]

  const LANGUAGES = [
    {
      id: 1,
      value: 'JavaScript'
    }, {
      id: 2,
      value: 'Python'
    }, {
      id: 3,
      value: 'Java'
    }, {
      id: 4,
      value: 'PHP'
    }, {
      id: 5,
      value: 'C++'
    }, {
      id: 6,
      value: 'C#'
    }, {
      id: 7,
      value: 'Go'
    }, {
      id: 8,
      value: 'Rust'
    }, {
      id: 9,
      value: 'Swift'
    }, {
      id: 10,
      value: 'Kotlin'
    }, {
      id: 11,
      value: 'Objective C'
    },  {
      id: 12,
      value: 'Ruby'
    }, {
      id: 13,
      value: 'R'
    }, {
      id: 14,
      value: 'Matlab'
    }, {
      id: 15,
      value: 'TypeScript'
    }
  ]


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
          />
        </div>

        <Tabs
        // tabBarStyle={{color: 'var(--secondary-color)', fontFamily: 'var(--font-family)'}}
        textStyle={{color: 'var(--secondary-color)', fontFamily: 'var(--font-family)'}}
        style={{fontFamily: 'var(--font-family)' }}
          defaultActiveKey="1"
          items={TYPES}
          onChange={(e) => fetchSnippets(e)}
        />

      </div>
    </div>
  );
};

export default Dashboard;
