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

const convertUITypesToAPI = (type) => {
    // return type.split(' ').length < 2 ? type.toUpperCase() : type.replaceAll(' ', '_').toUpperCase();
    for (const [key, value] of typesMap) {
        if (type === value)
            return key;
    }
}

const replaceAt = (str, index, newCharacter) => {
    const replacer = (originalCharacter, strIndex) => {
        return strIndex === index ? newCharacter : originalCharacter;
    }
    return str.replace(/./g, replacer);
}

const convertAPITypesToUI2 = (type) => {
    type = type.toLowerCase();
    let convertedType = type.replaceAll('_', ' ');
    const firstLetter = convertedType.charAt(0);
    convertedType = replaceAt(convertedType, 0, firstLetter.toUpperCase());
    return convertedType;
}

const convertAPITypesToUI = (type) => {
    return typesMap.get(type);
}

const convertUIStatesToAPI = (state) => {
    for (const [key, value] of statesMap) {
        if (state === value)
            return key;
    }
}

const convertAPIStatesToUI = (state) => {
    let value = statesMap.get(state);
    const firstLetter = value.charAt(0);
    value = replaceAt(value, 0, firstLetter.toLowerCase());
    return value;
}

const cutFromDescription = (description) => {
    return description.length > 81 ? description.substring(0, 81) + "..." : description;
}

export {getCurrentDate, convertUITypesToAPI, convertUIStatesToAPI, convertAPITypesToUI, convertAPIStatesToUI, cutFromDescription}