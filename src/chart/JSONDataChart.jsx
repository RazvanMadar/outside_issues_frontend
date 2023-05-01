import React from 'react';

import Chart, {
    ArgumentAxis,
    Legend,
    Series,
    ValueAxis,
    Label,
    Export,
    Tick,
} from 'devextreme-react/chart';

const JSONDataChart = ({data, desktopScreen}) => {
    const customizeText = (e) => {
        return `${e.value}`;
    }

    return (
        <div style={{width: desktopScreen ? "50%" : "100%"}}>
            <Chart
                title="Grafic sesizari respinse"
                dataSource={data}
                rotated={true}
                id="chart"
            >

                <ArgumentAxis>
                    <Label customizeText={customizeText}/>
                </ArgumentAxis>

                <ValueAxis>
                    <Tick visible={false}/>
                    <Label visible={false}/>
                </ValueAxis>

                <Series
                    valueField="val"
                    argumentField="state"
                    type="bar"
                    color="#17C8EC"
                >
                    <Label visible={true} backgroundColor="#17C8EC"/>
                </Series>
                <Series
                    valueField="val2"
                    argumentField="state"
                    type="bar"
                    color="#34B39A"
                >
                    <Label visible={true} backgroundColor="#34B39A"/>
                </Series>

                <Legend visible={false}/>

                <Export enabled={true}/>

            </Chart>
        </div>
    );
}

export default JSONDataChart;