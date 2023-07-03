import React from 'react';

import Chart, {CommonSeriesSettings, Label, Legend, Series} from 'devextreme-react/chart';
import {Format} from "devextreme-react/pie-chart";

const SimpleArray = ({data, desktopScreen, title}) => {
    return (
        <div style={{width: desktopScreen ? "45%" : "98%"}}>
            <Chart id="chart" title={title} dataSource={data}>
                <CommonSeriesSettings argumentField="state" type="bar" hoverMode="allArgumentPoints" selectionMode="allArgumentPoints">
                    <Label visible={true}>
                        <Format type="fixedPoint" precision={0}/>
                    </Label>
                </CommonSeriesSettings>
                <Series valueField="val" name="Toate"/>
                <Legend verticalAlignment="bottom" horizontalAlignment="center"></Legend>
            </Chart>
        </div>
    )
}

export default SimpleArray;