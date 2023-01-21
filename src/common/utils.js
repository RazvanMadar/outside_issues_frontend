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
    return type.split(' ').length < 2 ? type.toUpperCase() : type.replaceAll(' ', '_').toUpperCase();
}

const convertToPascalCase = (string) => {
    return string.replace(/(\w)(\w*)/g,
        function (g0, g1, g2) {
            return g1.toUpperCase() + g2.toLowerCase();
        })
}

const replaceAt = (str, index, newCharacter) => {
    const replacer = (originalCharacter, strIndex) => {
        return strIndex === index ? newCharacter : originalCharacter;
    }
    return str.replace(/./g, replacer);
}

const convertAPITypesToUI = (type) => {
    type = type.toLowerCase();
    let convertedType = type.replace('_', ' ');
    const firstLetter = convertedType.charAt(0);
    convertedType = replaceAt(convertedType, 0, firstLetter.toUpperCase());
    return convertedType;
}

const convertUIStatesToAPI = (state) => {
    return state.toUpperCase();
}

const cutFromDescription = (description) => {
    return description.length > 81 ? description.substring(0, 81) + "..." : description;
}

export {getCurrentDate, convertUITypesToAPI, convertUIStatesToAPI, convertAPITypesToUI, cutFromDescription}