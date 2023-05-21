import classes from "./DateFormat.module.css";
import {getRomanianMonth} from "../../common/utils";

const DateFormat = (props) => {
    const month = props.date.toLocaleString("en-US", {month: "short"});
    const day = props.date.toLocaleString("en-US", {day: "2-digit"});
    const year = props.date.getFullYear();

    return (
        <div className={classes["date-format"]}>
            <div className={classes["date-month-format"]}>{getRomanianMonth(month)}</div>
            <div className={classes["date-day-format"]}>{day}</div>
            <div className={classes["date-year-format"]}>{year}</div>
        </div>
    );
};

export default DateFormat;
