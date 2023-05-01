import React from 'react';

import Chart, {
    CommonSeriesSettings,
    Label,
    Legend,
    Series,
} from 'devextreme-react/chart';
import {Format} from "devextreme-react/pie-chart";

const SimpleArray = ({data, desktopScreen}) => {
    const onPointClick = (e) => {
        e.target.select();
    }

    return (
        <div style={{width: desktopScreen ? "45%" : "100%"}}>
            <Chart id="chart"
                   title="Grafic probleme raportate"
                   dataSource={data}
                   onPointClick={(e) => onPointClick(e)}
            >
                <CommonSeriesSettings
                    argumentField="state"
                    type="bar"
                    hoverMode="allArgumentPoints"
                    selectionMode="allArgumentPoints"
                >
                    <Label visible={true}>
                        <Format type="fixedPoint" precision={0}/>
                    </Label>
                </CommonSeriesSettings>
                <Series
                    valueField="val"
                    name="Toate"
                />
                <Legend verticalAlignment="bottom" horizontalAlignment="center"></Legend>
            </Chart>
        </div>
    )
}

export default SimpleArray;