import React, {useEffect, useState} from "react";
import {getBasicStatistics, getTypeStatistics, getYearStatistics} from "../api/issue-api";
import SliderComponent from "../components/slider/SliderComponent";
import SimpleArray from "../components/chart/SimpleArray";
import {convertAPIStatesToUI, convertAPITypesToUI, getMonthFromIndex} from "../common/utils";
import FilledPieChart from "../components/chart/FilledPieChart";
import {Navigate} from "react-router-dom";

const Home = ({isAdded, isUpdated, isDeleted}) => {
    const [data, setData] = useState();
    const [data2, setData2] = useState();
    const [data3, setData3] = useState();
    const [desktopScreen, setDesktopScreen] = useState(window.innerWidth > 878);
    const isBlocked = localStorage.getItem("isBlocked") !== null ? true : false;
    const token = localStorage.getItem("token");

    const getStatistics = () => {
        return getBasicStatistics(token, null, (result, status, err) => {
            if (status === 200 && result !== null) {
                const sum = result.reduce((accumulator, currentValue) => accumulator + currentValue.val, 0);
                const updatedArray = result.map((obj) => {
                    return {state: convertAPIStatesToUI(obj.state), val: (obj.val / 1.0) / sum};
                })
                setData(updatedArray);
            } else {
                console.log(err);
            }
        });
    };

    const getCurrentYearStatistics = () => {
        return getYearStatistics(token, (result, status, err) => {
            if (status === 200 && result !== null) {
                const updatedArray = result.map((obj) => {
                    return {...obj, state: getMonthFromIndex(obj.state)};
                })
                setData2(updatedArray);
            } else {
                console.log(err);
            }
        });
    };

    const getAllTypesStatistics = () => {
        return getTypeStatistics(token, null,(result, status, err) => {
            if (status === 200 && result !== null) {
                const sum = result.reduce((accumulator, currentValue) => accumulator + currentValue.val, 0);
                const updatedArray = result.map((obj) => {
                    return {state: convertAPITypesToUI(obj.state), val: (obj.val / 1.0) / sum};
                })
                setData3(updatedArray);
            } else {
                console.log(err);
            }
        });
    };

    useEffect(() => {
        getStatistics();
        getCurrentYearStatistics();
        getAllTypesStatistics();

        const handleResize = () => {
            setDesktopScreen(window.innerWidth > 878);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [isAdded, isUpdated, isDeleted]);

    return (
        <div style={{paddingTop: "55px"}}>
            {
                !isBlocked ?
                <div>
                    <h1 style={{textAlign: "center", marginTop: "1rem", marginBottom: "3rem"}}>Problemele de afară</h1>
                    <h5 style={{padding: "0 1rem", textAlign: "center"}}>
                        <span>Bine ați venit! Această aplicaţie are ca scop rezolvarea problemelor din Oradea într-un mod cât mai eficient și plăcut pentru cetățeni.</span>
                    </h5>
                    <h6 style={{padding: "0 1rem 0.5rem 0", textAlign: "center"}}>
                        <span>Vă mulțumim pentru contribuție, doar împreună putem face acest oraș mai frumos!</span>
                    </h6>
                    <div style={{
                        display: desktopScreen && "flex",
                        flexDirection: desktopScreen && "row",
                        justifyContent: desktopScreen && "center",
                        marginBottom: "1rem"
                    }}>
                        <FilledPieChart data={data3} desktopScreen={desktopScreen}
                                        title={'Grafic sesizări pe categorii'}/>
                        <FilledPieChart data={data} desktopScreen={desktopScreen} title={'Grafic sesizări pe status'}/>
                    </div>
                    <div style={{
                        display: desktopScreen && "flex",
                        flexDirection: desktopScreen && "row",
                        justifyContent: desktopScreen && "center",
                        marginBottom: "1rem"
                    }}>
                        <SimpleArray title={'Grafic sesizări pe luni (2023)'} data={data2}/>
                    </div>
                    <SliderComponent/>
                </div> : <Navigate to={"/blocked"} replace/>
            }
        </div>
    );
};

export default Home;
