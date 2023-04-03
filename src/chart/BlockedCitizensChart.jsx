import React from 'react';

import {Chart, Series} from 'devextreme-react/chart';

const BlockedCitizensChart = ({data}) => {
    const customizeTooltip = (point) => {
        return point.valueText + ' (' + point.total + ')';
    }


    return (
        <Chart id="chart" dataSource={data}>
            <Series
                valueField="val"
                argumentField="state"
                name="My oranges"
                type="bar"
                customizeLabel={customizeTooltip}
                color="#ffaa66"/>
        </Chart>
    );
}

export default BlockedCitizensChart;