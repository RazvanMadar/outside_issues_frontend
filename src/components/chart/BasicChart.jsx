import React from 'react';

import PieChart, {Connector, Format, Label, Legend, Series, Tooltip,} from 'devextreme-react/pie-chart';

// COPY PASTE DEVEXPRESS DOUGHNUT
const BasicChart = ({data, title, desktopScreen}) => {
    const customizeTooltip = (arg) => {
        return {
            text: `${arg.valueText} - ${(arg.percent * 100).toFixed(2)}%`,
        };
    }

    return (
        <div style={{width: desktopScreen ? "50%" : "100%"}}>
            <PieChart
                id="pie"
                type="doughnut"
                title={title}
                palette="Soft Pastel"
                dataSource={data}
            >
                <Series argumentField="state">
                    <Label visible={true}>
                        <Connector visible={true}/>
                    </Label>
                </Series>
                <Legend
                    margin={0}
                    horizontalAlignment="right"
                    verticalAlignment="top"
                />
                <Tooltip enabled={true} customizeTooltip={customizeTooltip}>
                    <Format/>
                </Tooltip>
            </PieChart>
        </div>
    );
}

export default BasicChart;