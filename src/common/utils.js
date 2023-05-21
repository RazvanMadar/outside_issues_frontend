import roadPlaceholder from "../pages/images/roadPlaceholder.jpg";
import lightningPlaceholder from "../pages/images/lightningPlaceholder.jpg";
import greenSpacePlaceholder from "../pages/images/greenSpacePlaceholder.jpg";
import publicDomainPlaceholder from "../pages/images/publicDomainPlaceholder.jpg";
import transportPlaceholder from "../pages/images/transportPlaceholder.jpg";
import buildingPlaceholder from "../pages/images/buildingPlaceholder.jpg";
import roadSignPlaceholder from "../pages/images/roadSignPlaceholder.jpg";
import animalPlaceholder from "../pages/images/animalPlaceholder.jpg";
import publicOrderPlaceholder from "../pages/images/publicOrderPlaceholder.png";
import noPhoto from "../pages/images/no_photo.png";
import L from "leaflet";

const typesMap = new Map();
typesMap.set("ROAD", "Drumuri");
typesMap.set("LIGHTNING", "Iluminat public");
typesMap.set("GREEN_SPACES", "Spații verzi");
typesMap.set("PUBLIC_DOMAIN", "Domeniu public");
typesMap.set("PUBLIC_DISORDER", "Ordine publică");
typesMap.set("PUBLIC_TRANSPORT", "Transport public");
typesMap.set("BUILDINGS", "Clădiri");
typesMap.set("TRAFFIC_ROAD_SIGNS", "Semne de circulație");
typesMap.set("ANIMALS", "Animale");

const statesMap = new Map();
statesMap.set("REGISTERED", "Înregistrată");
statesMap.set("PLANNED", "Planificată");
statesMap.set("WORKING", "În lucru");
statesMap.set("REDIRECTED", "Redirecționată");
statesMap.set("SOLVED", "Rezolvată");

const sortDataMap = new Map();
sortDataMap.set("reported_date", "Data raportării");
sortDataMap.set("likes_number", "Like-uri");
sortDataMap.set("dislikes_number", "Dislike-uri");

const monthsMap = new Map();
monthsMap.set("01", "Ianuarie");
monthsMap.set("02", "Februarie");
monthsMap.set("03", "Martie");
monthsMap.set("04", "Aprilie");
monthsMap.set("05", "Mai");
monthsMap.set("06", "Iunie");
monthsMap.set("07", "Iulie");
monthsMap.set("08", "August");
monthsMap.set("09", "Septembrie");
monthsMap.set("10", "Octombrie");
monthsMap.set("11", "Noiembrie");
monthsMap.set("12", "Decembrie");

const romanianMonths = new Map();
romanianMonths.set("Jan", "Ian");
romanianMonths.set("Feb", "Feb");
romanianMonths.set("Mar", "Mar");
romanianMonths.set("Apr", "Apr");
romanianMonths.set("May", "Mai");
romanianMonths.set("Jun", "Iun");
romanianMonths.set("Jul", "Iul");
romanianMonths.set("Aug", "Aug");
romanianMonths.set("Sep", "Sep");
romanianMonths.set("Oct", "Oct");
romanianMonths.set("Nov", "Noi");
romanianMonths.set("Dec", "Dec");


const getBackgroundColorForState = (state) => {
    let backgroundColor;
    // return "#7895B2"
    switch (state) {
        case "REGISTERED":
            backgroundColor = "#7895B2";
            break;
        case "PLANNED":
            backgroundColor = "#628E90";
            break;
        case "WORKING":
            backgroundColor = "#917FB3";
            break;
        case "REDIRECTED":
            backgroundColor = "#D5B4B4";
            break;
        default:
            backgroundColor = "#9E7676";
    }
    return backgroundColor;
}

const isCorrectEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

const isCorrectPhoneNumber = (phoneNumber) => {
    const regex = /^\d+$/;
    if (phoneNumber.length < 10)
        return false;
    if (phoneNumber[0] === '0' && phoneNumber[1] === '7' && phoneNumber.length === 10)
        return regex.test(phoneNumber);
    if (phoneNumber[0] === "+" && phoneNumber[1] === "4" && phoneNumber[2] === "0" && phoneNumber[3] === "7" && phoneNumber.length === 12)
        return regex.test(phoneNumber);
    return false;
}

const getCurrentDate = () => {
    const currentDate = new Date();
    let day = currentDate.getDate();
    let month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    if (day.toString().length < 2)
        day = "0" + day;
    if (month.toString().length < 2)
        month = "0" + month;
    return `${year}-${month}-${day}`;
}

const getChatMessageFormat = (date) => {
    const parts = date.split("T");
    const times = parts[1].split(":");
    const time = times[0] + ":" + times[1];
    return time + " | " + computeDateForPopup(parts[0]);
}

const convertUITypesToAPI = (type) => {
    // return type.split(' ').length < 2 ? type.toUpperCase() : type.replaceAll(' ', '_').toUpperCase();
    for (const [key, value] of typesMap) {
        if (type === value) {
            return key;
        }
    }
    if (type === "Toate categoriile") {
        return null;
    }
}

const getRomanianMonth = (month) => {
    for (const [key, value] of romanianMonths) {
        if (month === key) {
            return value;
        }
    }
}

const replaceAt = (str, index, newCharacter) => {
    const replacer = (originalCharacter, strIndex) => {
        return strIndex === index ? newCharacter : originalCharacter;
    }
    return str.replace(/./g, replacer);
}

const convertAPITypesToUI = (type) => {
    return typesMap.get(type);
}

const convertUIStatesToAPI = (state) => {
    for (const [key, value] of statesMap) {
        if (state === value) {
            return key;
        }
    }
    if (state === "Toate stările") {
        return null;
    }
}

const convertUISortDataToAPI = (data) => {
    for (const [key, value] of sortDataMap) {
        if (data === value) {
            return key;
        }
    }
}

const getMonthFromIndex = (index) => {
    for (const [key, value] of monthsMap) {
        if (index == key) {
            return value;
        }
    }
}

const getMonthFromIndexes = (array) => {
    for (const [key, value] of monthsMap) {
        for (const [key2, value2] of array) {
            let newKey = key2.length == 1 ? "0" + key2 : key2;
            if (newKey == key) {
                return value;
            }
        }
    }
}

const computeDateForPopup = (date) => {
    const parts = date.split("-");
    const month = getMonthFromIndex(parts[1]);
    return parts[2] + " " + month + " " + parts[0];
}

const computeDescriptionForPopup = (description) => {
    if (description.length == 0)
        return "Nu are descriere"
    return description.length > 25 ? description.substring(0, 26) + "..." : description;
}

const getImageRegardingIssueType = (type) => {
    let photo;
    switch (type) {
        case "ROAD":
            photo = roadPlaceholder;
            break;
        case "LIGHTNING":
            photo = lightningPlaceholder;
            break;
        case "GREEN_SPACES":
            photo = greenSpacePlaceholder;
            break;
        case "PUBLIC_DOMAIN":
            photo = publicDomainPlaceholder;
            break;
        case "PUBLIC_DISORDER":
            photo = publicOrderPlaceholder;
            break;
        case "PUBLIC_TRANSPORT":
            photo = transportPlaceholder;
            break;
        case "BUILDINGS":
            photo = buildingPlaceholder;
            break;
        case "TRAFFIC_ROAD_SIGNS":
            photo = roadSignPlaceholder;
            break;
        case "ANIMALS":
            photo = animalPlaceholder;
            break;
        default:
            photo = noPhoto;
    }
    return photo;
}

const convertAPIStatesToUI = (state) => {
    let value = statesMap.get(state);
    // const firstLetter = value.charAt(0);
    // value = replaceAt(value, 0, firstLetter.toLowerCase());
    return value;
}

const cutFromDescription = (description) => {
    return description.length > 45 ? description.substring(0, 45) + "..." : description;
}

export {
    getCurrentDate,
    convertUITypesToAPI,
    convertUIStatesToAPI,
    convertAPITypesToUI,
    convertAPIStatesToUI,
    cutFromDescription,
    getBackgroundColorForState,
    convertUISortDataToAPI,
    getChatMessageFormat,
    getImageRegardingIssueType,
    computeDateForPopup,
    computeDescriptionForPopup,
    getMonthFromIndex,
    getMonthFromIndexes,
    getRomanianMonth,
    isCorrectEmail,
    isCorrectPhoneNumber,
}