import PieChart, {Connector, Label, Legend, Series} from "devextreme-react/pie-chart";
import {data} from "../chart/data";
import CenterTemplate from "../chart/CenterTemplate";

const UserProfileChart = () => {
    const states = [
        { state: 'Inregistrata', total: 413278 },
        { state: 'Rezolvata', total: 21033 },
        { state: 'Planificata', total: 58228 },
        { state: 'In lucru', total: 618 },
    ]


    const customizeLabel = (e) => {
        return `${e.argumentText}\n${e.valueText}`;
    }

    return (
        <div>
            <div className="long-title"><h3>Energy Production (GWh, 2016)</h3></div>
            <div className="pies-container">
                {states.map((state) => (
                    <PieChart
                        id="pie-chart"
                        key={state.state}
                        dataSource={state}
                        resolveLabelOverlapping="shift"
                        sizeGroup="piesGroup"
                        innerRadius={0.65}
                        centerRender={CenterTemplate}
                        type="doughnut"
                    >
                        <Series
                            argumentField="state"
                            valueField="total"
                        >
                            <Label visible={true}
                                   format="fixedPoint"
                                   customizeText={customizeLabel}
                                   backgroundColor="none">
                            </Label>
                            <Connector visible={true}></Connector>
                            <Legend visible={false}></Legend>
                        </Series>
                 </PieChart>
                ))
                }
            </div>
        </div>
    );
}

export default UserProfileChart;