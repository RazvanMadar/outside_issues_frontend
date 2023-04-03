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

const JSONDataChart = ({rejected, desktopScreen}) => {
    const customizeText = (e) => {
        return `${e.value}`;
    }

    return (
        <div style={{width: desktopScreen ? "50%" : "100%"}}>
            <Chart
                title="Grafic sesizari respinse"
                dataSource={rejected}
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
                    color="#79cac4"
                >
                    <Label visible={true} backgroundColor="#c18e92"/>
                </Series>
                <Series
                    valueField="val2"
                    argumentField="state"
                    type="bar"
                    color="blue"
                >
                    <Label visible={true} backgroundColor="blue"/>
                </Series>

                <Legend visible={false}/>

                <Export enabled={true}/>

            </Chart>
        </div>
    );
}

export default JSONDataChart;