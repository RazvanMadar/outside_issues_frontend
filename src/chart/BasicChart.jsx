import React from 'react';

import PieChart, {Connector, Export, Format, Label, Legend, Series, Tooltip,} from 'devextreme-react/pie-chart';

// COPY PASTE DEVEXPRESS DOUGHNUT
const BasicChart = ({data}) => {
    const customizeTooltip = (arg) => {
        return {
            text: `${arg.valueText} - ${(arg.percent * 100).toFixed(2)}%`,
        };
    }

    return (
        <PieChart
            id="pie"
            type="doughnut"
            title="Graficul sesizărilor"
            palette="Soft Pastel"
            dataSource={data}
        >
            <Series argumentField="state">
                <Label visible={true}>
                    <Connector visible={true}/>
                </Label>
            </Series>
            {/*<Export enabled={true}/>*/}
            <Legend
                margin={0}
                horizontalAlignment="right"
                verticalAlignment="top"
            />
            <Tooltip enabled={true} customizeTooltip={customizeTooltip}>
                <Format/>
            </Tooltip>
        </PieChart>
    );
}

export default BasicChart;