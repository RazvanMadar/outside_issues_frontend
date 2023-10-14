import React from 'react';

import PieChart, {Connector, Format, Label, Legend, Series, Tooltip} from 'devextreme-react/pie-chart';

const BasicChart = ({data, title, desktopScreen}) => {
    return (
        <div style={{width: desktopScreen ? "50%" : "100%"}}>
            <PieChart id="pie" type="doughnut" title={title} dataSource={data}>
                <Series argumentField="state">
                    <Label visible={true}>
                        <Connector visible={true}/>
                    </Label>
                </Series>
                <Legend margin={0} horizontalAlignment="right" verticalAlignment="top"/>
                <Tooltip enabled={true}>
                    <Format/>
                </Tooltip>
            </PieChart>
        </div>
    );
}

export default BasicChart;