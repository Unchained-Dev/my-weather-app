export const getUVDescription = (value) => {
    // Function that returns the description of the UV index
    const aproxValue = Math.round(value * 10) / 10;
    switch (true) {
        case (value >= 0 && value < 2.5):
            return aproxValue + " Low";
        case (value >= 2.5 && value < 5.5):
            return aproxValue + " Moderate";
        case (value >= 5.5 && value < 7.5):
            return aproxValue + " High";
        case (value >= 7.5 && value < 10.5):
            return aproxValue + " Very High";
        case (value >= 10.5):
            return aproxValue + " Extreme";
        default:
            return "Unknown index";
    }
}

export const getWindDesc = (degrees, speed) => {
// Function that converts degrees to compass direction
    const directions = [
        "N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE",
        "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"
    ];

    degrees = (degrees + 360) % 360;

    const index = Math.round(degrees / 22.5) % 16;

    return directions[index] + " " + Math.round(speed) + " km/h";
}

export const getNextTenDays = (today) => {
    const daysArray = [];

    for (let i = 0; i < 10; i++) {
        const nextDay = new Date(today);
        nextDay.setDate(today.getUTCDate() + i);
        daysArray.push(nextDay);
    }

    return daysArray;
}