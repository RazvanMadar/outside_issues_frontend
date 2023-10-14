import classes from "./DateFormat.module.css";
import {getRomanianMonth} from "../../common/utils";

const DateFormat = (props) => {
    const reportedDateDay = props.date.toLocaleString("en-US", {day: "2-digit"});
    const reportedDateMonth = props.date.toLocaleString("en-US", {month: "short"});
    const reportedDateYear = props.date.getFullYear();

    return (
        <div className={classes.bigDate}>
            <div className={classes.monthDate}>{getRomanianMonth(reportedDateMonth)}</div>
            <div className={classes.dayDate}>{reportedDateDay}</div>
            <div className={classes.yearDate}>{reportedDateYear}</div>
        </div>
    );
};

export default DateFormat;
