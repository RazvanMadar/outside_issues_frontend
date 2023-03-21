import React from 'react';

const formatNumber = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
}).format;

function calculateTotal(pieChart) {
    return formatNumber(pieChart
        .getAllSeries()[0]
        .getVisiblePoints()
        .reduce((s, p) => s + p.originalValue, 0));
}

function getImagePath() {
    console.log("da")
    return 'D:\\LICENSE\\frontend\\license_frontend\\src\\chart\\gs.svg';
}

// COPY PASTE DE PE DEVEXPRESS - CUSTOM LABEL IN THE CENTER - DOUGHNUT CHARTS
const TooltipTemplate = (pieChart) => {
    // const {country} = pieChart.getAllSeries()[0].getVisiblePoints()[0].data;
    return (
        // <svg>
        //     <circle cx="100" cy="100" r={pieChart.getInnerRadius() - 6} fill="#eee"></circle>
        //     <img src={getImagePath(country)} x="70" y="58" width="60" height="40" />
        //     <text textAnchor="middle" x="100" y="120" style={{ fontSize: 18, fill: '#494949' }}>
        //         <tspan x="100">{country}</tspan>
        //         <tspan x="100" dy="20px" style={{ fontWeight: 600 }}>{
        //             calculateTotal(pieChart)
        //         }</tspan>
        //     </text>
        // </svg>
        <svg>
            <img src={getImagePath()}/>
        </svg>
    );
}

export default TooltipTemplate;