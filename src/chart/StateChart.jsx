import React, {useEffect} from 'react';

import PieChart, {
    Series,
    Legend,
    Label,
    Connector,
} from 'devextreme-react/pie-chart';

import {data} from './data.js';
import CenterTemplate from './CenterTemplate.jsx';

const countries = Array.from(new Set(data.map((item) => item.country)));

const StateChart = () => {
    const customizeLabel = (e) => {
        return `${e.argumentText}\n${e.valueText}`;
    }

    return (
        <div>
            <div className="long-title"><h3>Energy Production (GWh, 2016)</h3></div>
            <div className="pies-container">
                {countries.map((country) => (
                    <PieChart
                        id="pie-chart"
                        key={country}
                        dataSource={data.filter((i) => i.country === country)}
                        resolveLabelOverlapping="shift"
                        sizeGroup="piesGroup"
                        innerRadius={0.65}
                        centerRender={CenterTemplate}
                        type="doughnut"
                    >
                        <Series
                            argumentField="commodity"
                            valueField="total"
                        >
                            <Label visible={true}
                                   format="fixedPoint"
                                   customizeText={customizeLabel}
                                   backgroundColor="none">
                                <Connector visible={true}></Connector>
                            </Label>
                        </Series>
                        <Legend visible={false}></Legend>
                    </PieChart>
                ))
                }
            </div>
        </div>
    );
}

export default StateChart;
