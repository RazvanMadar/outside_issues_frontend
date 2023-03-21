import {useEffect, useState} from "react";
import BasicChart from "../chart/BasicChart";
import {getBasicStatistics} from "../api/issue-api";
import StateChart from "../chart/StateChart";

const Home = () => {
    const [data, setData] = useState();

    const getStatistics = () => {
        return getBasicStatistics(null, (result, status, err) => {
            if (status === 200 && result !== null) {
               setData(result);
               console.log(result);
            } else {
                console.log(err);
            }
        });
    };

    useEffect(() => {
        getStatistics();
    }, []);

    return (
        <div>
            <BasicChart data={data}/>
            <StateChart />
        </div>
    );
};

export default Home;
