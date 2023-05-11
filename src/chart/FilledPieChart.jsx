import React from 'react';

import PieChart, {
    Series,
    Label,
    Legend,
} from 'devextreme-react/pie-chart';

const FilledPieChart = ({desktopScreen, data, title}) => {
    return (
        <div style={{width: desktopScreen ? "50%" : "100%"}}>
            <PieChart
                className="pie"
                title={title}
                palette="Soft"
                sizeGroup="piesGroup"
                dataSource={data}
            >
                <Series argumentField="state" valueField="val">
                    <Label visible={true} format="percent"/>
                </Series>
                <Legend
                    verticalAlignment="bottom"
                    horizontalAlignment="center"
                    itemTextPosition="right"
                    rowCount={2}
                />
            </PieChart>
        </div>
    );
}

export default FilledPieChart;