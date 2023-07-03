import React from 'react';

import Chart, {ArgumentAxis, Legend, Series, ValueAxis, Label, Tick} from 'devextreme-react/chart';

const JSONDataChart = ({data, desktopScreen}) => {
    return (
        <div style={{width: desktopScreen ? "50%" : "100%"}}>
            <Chart title="Grafic sesizari respinse" dataSource={data} rotated={true} id="chart">
                <ArgumentAxis>
                    <Label/>
                </ArgumentAxis>

                <ValueAxis>
                    <Tick visible={false}/>
                    <Label visible={false}/>
                </ValueAxis>

                <Series valueField="val" argumentField="state" type="bar" color="#4E6E81">
                    <Label visible={true} backgroundColor="#4E6E81"/>
                </Series>
                <Series valueField="val2" argumentField="state" type="bar" color="#19A7CE">
                    <Label visible={true} backgroundColor="#19A7CE"/>
                </Series>

                <Legend visible={false}/>
            </Chart>
        </div>
    );
}

export default JSONDataChart;