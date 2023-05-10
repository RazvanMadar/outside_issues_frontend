import {useEffect, useState} from "react";
import BasicChart from "../chart/BasicChart";
import {getBasicStatistics, getTypeStatistics, getYearStatistics} from "../api/issue-api";
import SliderComponent from "../slider/SliderComponent";
import SimpleArray from "../chart/SimpleArray";
import {convertAPIStatesToUI, convertAPITypesToUI, getMonthFromIndex} from "../common/utils";
import FilledPieChart from "../chart/FilledPieChart";
import Typical from 'react-typical'

// react-typical FROM https://www.youtube.com/watch?v=t7ePHIsKnnI

const Home = () => {
    const [data, setData] = useState();
    const [data2, setData2] = useState();
    const [data3, setData3] = useState();
    const [desktopScreen, setDesktopScreen] = useState(window.innerWidth > 878);

    const token = localStorage.getItem("token");

    const getStatistics = () => {
        return getBasicStatistics(token, null, (result, status, err) => {
            if (status === 200 && result !== null) {
                result.forEach(res => {
                    res.state = convertAPIStatesToUI(res.state);
                })
                setData(result);
                console.log(result);
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
        return getTypeStatistics(token, (result, status, err) => {
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
    }, []);

    return (
        <div>
            <h1 style={{textAlign: "center", marginTop: "1rem", marginBottom: "3rem"}}>Sesizări municipiul Oradea</h1>
            <h5 style={{padding: '0 1rem'}}>
                <span style={{ padding: '0 2rem' }}>Aceasta este o aplicaţie pentru telefonul mobil sau tabletă</span>
                gratuită, simplă şi intuitivă, care permite cetăţenilor
                cu spirit civic să transmită diverse sesizări şi incidente către Primăria Oradea şi operatorii
                serviciilor publice locale (Compania de Apă Oradea, Oradea Transport Local, Termoficare Oradea, Poliţia
                Locală Oradea, Luxten Lighting Company, RER Ecologic Service).{'\nBeneficiile pe care le ai'}
                {/*<Typical loop={Infinity} wrapper="b" steps={[*/}
                {/*    'comunitate mai frumoasa👻', 5000, 'feedback🏌️', 5000*/}
                {/*]}/>*/}
            </h5>
            <div style={{
                display: desktopScreen && "flex",
                flexDirection: desktopScreen && "row",
                justifyContent: desktopScreen && "center",
                marginBottom: "1rem"
            }}>
                <FilledPieChart data={data3} desktopScreen={desktopScreen}/>
                <BasicChart title={'Grafic sesizări pe status'} data={data} desktopScreen={desktopScreen}/>
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
        </div>
    );
};

export default Home;
