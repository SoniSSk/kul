function convert24To12Hours(time: string){
    let [hours, minutes] = time.split(":").map((val: string) => parseInt(val));
    let suffix = "";

    if(hours >= 12 ){
        suffix = "PM";
        if(hours > 12) hours -= 12;
    }
    else{
        suffix = "AM";
        if(hours === 0) hours = 12;
    }

    let hourString = `${hours}`;
    if(hours < 10){
        hourString = "0" + hourString;
    }

    let minuteString = `${minutes}`;
    if(minutes < 10){
        minuteString = "0" + minuteString;
    }

    return `${hourString}:${minuteString} ${suffix}`;

}

function timeSlotParser(time: string){
    return convert24To12Hours(time
        .split("T")[1]
        .split(".")[0]
        .split(":")
        .slice(0, 2)
        .join(":"));
}

export default timeSlotParser;