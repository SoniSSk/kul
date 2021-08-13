
function getTimeString(date: any){
    if (new Date().toLocaleDateString() === new Date(date).toLocaleDateString()) {
        const currentDateTime = new Date();

        const currentDate = currentDateTime
            .toLocaleDateString("en-GB", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
            })
            .split("/")
            .reverse()
            .join("-")

        console.log(currentDate);

        const currentTime = currentDateTime
            .toLocaleTimeString('en-GB')

        const dateTimeString = `${currentDate}T${currentTime}`;

        return dateTimeString;

    }
    const timestamp = Date.parse(date);
    if(!isNaN(timestamp)) {
        const newDateTimeObject = new Date(date);
        const newDate = newDateTimeObject
            .toLocaleDateString("en-GB", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
            })
            .split("/")
            .reverse()
            .join("-")

        const newDateTimeString = `${newDate}T06:00:00`;
        console.log("Date time string", newDateTimeString);
        return newDateTimeString
    }
    return null;
}

export default getTimeString;