import React from "react";
import styles from "./Snippets.module.css";
import SnippetCard from "../../../components/SnippetCard/SnippetCard";
import { Skeleton } from "antd";
import ListEmptyComponent from "../../../components/ListEmptyComponent/ListEmptyComponent";


const UIComponents = (props) => {

    const { loading, data } = props;

    return (
        <div className={styles.mainCont}>
            {
                loading ?
                    [1, 2, 3, 4]?.map((item, index) => 
                        <Skeleton.Button active={true} style={{width: 510, height: 170, marginTop: 20, borderRadius: 10 }}  /> 
                          )
                    :
                    (
                        data?.length === 0 ?
                            <ListEmptyComponent text={'No snippet found'} image={'../../../assets/images/nodata.png'} />
                            :
                            data?.map((item, index) => <SnippetCard item={item} index={index} />)
                    )
            }
        </div>
    );
};

export default UIComponents;
