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
import {createIcon} from "./converter-util";
import REGISTERED_ROAD from "../pages/images/REGISTERED_ROAD.png";
import REGISTERED_LIGHTNING from "../pages/images/REGISTERED_LIGHTNING.png";
import REGISTERED_PUBLIC_DISORDER from "../pages/images/REGISTERED_PUBLIC_DISORDER.png";
import REGISTERED_PUBLIC_DOMAIN from "../pages/images/REGISTERED_PUBLIC_DOMAIN.png";
import REGISTERED_GREEN_SPACES from "../pages/images/REGISTERED_GREEN_SPACES.png";
import REGISTERED_BUILDINGS from "../pages/images/REGISTERED_BUILDINGS.png";
import REGISTERED_PUBLIC_TRANSPORT from "../pages/images/REGISTERED_PUBLIC_TRANSPORT.png";
import REGISTERED_ROAD_SIGNS from "../pages/images/REGISTERED_ROAD_SIGNS.png";
import REGISTERED_ANIMALS from "../pages/images/REGISTERED_ANIMALS.png";
import PLANNED_ROAD from "../pages/images/PLANNED_ROAD2.png";
import PLANNED_LIGHTNING from "../pages/images/PLANNED_LIGHTNING2.png";
import PLANNED_PUBLIC_DISORDER from "../pages/images/PLANNED_PUBLIC_DISORDER2.png";
import PLANNED_PUBLIC_DOMAIN from "../pages/images/PLANNED_PUBLIC_DOMAIN2.png";
import PLANNED_GREEN_SPACES from "../pages/images/PLANNED_GREEN_SPACES.png";
import PLANNED_BUILDINGS from "../pages/images/PLANNED_BUILDINGS.png";
import PLANNED_PUBLIC_TRANSPORT from "../pages/images/PLANNED_PUBLIC_TRANSPORT.png";
import PLANNED_ROAD_SIGNS from "../pages/images/PLANNED_ROAD_SIGNS2.png";
import PLANNED_ANIMALS from "../pages/images/PLANNED_ANIMALS2.png";
import WORKING_ROAD from "../pages/images/WORKING_ROAD.png";
import WORKING_LIGHTNING from "../pages/images/WORKING_LIGHTNING.png";
import WORKING_PUBLIC_DISORDER from "../pages/images/WORKING_PUBLIC_DISORDER.png";
import WORKING_PUBLIC_DOMAIN from "../pages/images/WORKING_PUBLIC_DOMAIN.png";
import WORKING_GREEN_SPACES from "../pages/images/WORKING_GREEN_SPACES.png";
import WORKING_BUILDINGS from "../pages/images/WORKING_BUILDINGS.png";
import WORKING_PUBLIC_TRANSPORT from "../pages/images/WORKING_PUBLIC_TRANSPORT.png";
import WORKING_ROAD_SIGNS from "../pages/images/WORKING_ROAD_SIGNS.png";
import WORKING_ANIMALS from "../pages/images/WORKING_ANIMALS.png";
import SOLVED_PUBLIC_DISORDER from "../pages/images/SOLVED_PUBLIC_DISORDER2.png";
import SOLVED_ROAD from "../pages/images/SOLVED_ROAD2.png";
import SOLVED_LIGHTNING from "../pages/images/SOLVED_LIGHTNING2.png";
import SOLVED_PUBLIC_DOMAIN from "../pages/images/SOLVED_PUBLIC_DOMAIN2.png";
import SOLVED_GREEN_SPACES from "../pages/images/SOLVED_GREEN_SPACES2.png";
import SOLVED_BUILDINGS from "../pages/images/SOLVED_BUILDINGS2.png";
import SOLVED_PUBLIC_TRANSPORT from "../pages/images/SOLVED_PUBLIC_TRANSPORT2.png";
import SOLVED_ROAD_SIGNS from "../pages/images/SOLVED_ROAD_SIGNS2.png";
import SOLVED_ANIMALS from "../pages/images/SOLVED_ANIMALS2.png";

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
    return value;
}

const cutFromDescription = (description) => {
    return description.length > 45 ? description.substring(0, 45) + "..." : description;
}

const getElapsedTime = (date, latestMessage) => {
    if (latestMessage == null) {
        return "";
    }
    const past = new Date(date);
    const now = new Date();
    let elapsedTime = Math.floor((now - past) / 60000);
    let type = 0;
    let time = "minute";
    if (elapsedTime > 59) {
        elapsedTime /= 60;
        time = "ore";
        type = 1;
    }
    if (elapsedTime > 23 && type == 1) {
        elapsedTime /= 24;
        time = "zile";
        type = 2;
    }
    if (elapsedTime > 29 && type == 2) {
        elapsedTime /= 30;
        time = "luni";
        type = 3;
    }
    if (elapsedTime > 11 && type == 3) {
        elapsedTime /= 12;
        time = "ani";
    }
    return Math.floor(elapsedTime) + " " + time;
}

const getNumberFromIndex = (index) => {
    if (index === 0)
        return "FIRST";
    if (index === 1)
        return "SECOND";
    return "THIRD";
}

const getMarkerImage = (type, state) => {
    if (state === "REGISTERED") {
        switch (type) {
            case "ROAD":
                return createIcon(REGISTERED_ROAD, false);
            case "LIGHTNING":
                return createIcon(REGISTERED_LIGHTNING, false);
            case "PUBLIC_DISORDER":
                return createIcon(REGISTERED_PUBLIC_DISORDER, false);
            case "PUBLIC_DOMAIN":
                return createIcon(REGISTERED_PUBLIC_DOMAIN, false);
            case "GREEN_SPACES":
                return createIcon(REGISTERED_GREEN_SPACES, false);
            case "BUILDINGS":
                return createIcon(REGISTERED_BUILDINGS, false);
            case "PUBLIC_TRANSPORT":
                return createIcon(REGISTERED_PUBLIC_TRANSPORT, false);
            case "TRAFFIC_ROAD_SIGNS":
                return createIcon(REGISTERED_ROAD_SIGNS, false);
            case "ANIMALS":
                return createIcon(REGISTERED_ANIMALS, false);
        }
    } else if (state === "PLANNED") {
        switch (type) {
            case "ROAD":
                return createIcon(PLANNED_ROAD, false);
            case "LIGHTNING":
                return createIcon(PLANNED_LIGHTNING, false);
            case "PUBLIC_DISORDER":
                return createIcon(PLANNED_PUBLIC_DISORDER, false);
            case "PUBLIC_DOMAIN":
                return createIcon(PLANNED_PUBLIC_DOMAIN, false);
            case "GREEN_SPACES":
                return createIcon(PLANNED_GREEN_SPACES, false);
            case "BUILDINGS":
                return createIcon(PLANNED_BUILDINGS, false);
            case "PUBLIC_TRANSPORT":
                return createIcon(PLANNED_PUBLIC_TRANSPORT, false);
            case "TRAFFIC_ROAD_SIGNS":
                return createIcon(PLANNED_ROAD_SIGNS, false);
            case "ANIMALS":
                return createIcon(PLANNED_ANIMALS, false);
        }
    } else if (state === "WORKING") {
        switch (type) {
            case "ROAD":
                return createIcon(WORKING_ROAD, false, true);
            case "LIGHTNING":
                return createIcon(WORKING_LIGHTNING, false, true);
            case "PUBLIC_DISORDER":
                return createIcon(WORKING_PUBLIC_DISORDER, false, true);
            case "PUBLIC_DOMAIN":
                return createIcon(WORKING_PUBLIC_DOMAIN, false, true);
            case "GREEN_SPACES":
                return createIcon(WORKING_GREEN_SPACES, false, true);
            case "BUILDINGS":
                return createIcon(WORKING_BUILDINGS, false, true);
            case "PUBLIC_TRANSPORT":
                return createIcon(WORKING_PUBLIC_TRANSPORT, false, true);
            case "TRAFFIC_ROAD_SIGNS":
                return createIcon(WORKING_ROAD_SIGNS, false, true);
            case "ANIMALS":
                return createIcon(WORKING_ANIMALS, false, true);
        }
    } else if (state === "REDIRECTED") {
        switch (type) {
            case "ROAD":
                return createIcon(SOLVED_PUBLIC_DISORDER, false);
            case "LIGHTNING":
                return createIcon(SOLVED_PUBLIC_DISORDER, false);
            case "PUBLIC_DISORDER":
                return createIcon(SOLVED_PUBLIC_DISORDER, false);
            case "PUBLIC_DOMAIN":
                return createIcon(SOLVED_PUBLIC_DISORDER, false);
            case "GREEN_SPACES":
                return createIcon(SOLVED_PUBLIC_DISORDER, false);
            case "BUILDINGS":
                return createIcon(SOLVED_PUBLIC_DISORDER, false);
            case "PUBLIC_TRANSPORT":
                return createIcon(SOLVED_PUBLIC_DISORDER, false);
            case "TRAFFIC_ROAD_SIGNS":
                return createIcon(SOLVED_PUBLIC_DISORDER, false);
            case "ANIMALS":
                return createIcon(SOLVED_PUBLIC_DISORDER, false);
        }
    } else if (state === "SOLVED") {
        switch (type) {
            case "ROAD":
                return createIcon(SOLVED_ROAD, false);
            case "LIGHTNING":
                return createIcon(SOLVED_LIGHTNING, false);
            case "PUBLIC_DISORDER":
                return createIcon(SOLVED_PUBLIC_DISORDER, false);
            case "PUBLIC_DOMAIN":
                return createIcon(SOLVED_PUBLIC_DOMAIN, false);
            case "GREEN_SPACES":
                return createIcon(SOLVED_GREEN_SPACES, false);
            case "BUILDINGS":
                return createIcon(SOLVED_BUILDINGS, false);
            case "PUBLIC_TRANSPORT":
                return createIcon(SOLVED_PUBLIC_TRANSPORT, false);
            case "TRAFFIC_ROAD_SIGNS":
                return createIcon(SOLVED_ROAD_SIGNS, false);
            case "ANIMALS":
                return createIcon(SOLVED_ANIMALS, false);
        }
    }
    return null;
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
    getElapsedTime,
    getNumberFromIndex,
    getMarkerImage
}