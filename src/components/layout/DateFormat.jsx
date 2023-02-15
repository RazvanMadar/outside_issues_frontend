import classes from "./DateFormat.module.css";

const DateFormat = (props) => {
  //   const [year, month, day] = props.date.split(" ");
  const month = props.date.toLocaleString("en-US", { month: "short" });
  const day = props.date.toLocaleString("en-US", { day: "2-digit" });
  const year = props.date.getFullYear();

  return (
    <div className={classes["date-format"]}>
      <div className={classes["date-month-format"]}>{month}</div>
      <div className={classes["date-year-format"]}>{year}</div>
      <div className={classes["date-day-format"]}>{day}</div>
    </div>
  );
};

export default DateFormat;
