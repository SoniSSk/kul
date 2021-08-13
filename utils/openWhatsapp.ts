import {contactNumber} from "../constants/contactInformation";
import {DeviceTypes} from "../constants/deviceTypes";

function getInternationalFormattedNum(): string{
    return contactNumber
        .replace("+", "")
        .replace("-", "")
        .split(" ")
        .join("");
}

export default function openWhatsapp(device: DeviceTypes){
    const internationalFormattedNum = getInternationalFormattedNum();

    console.log(contactNumber, internationalFormattedNum);
    if(device === DeviceTypes.DESKTOP)
        window.open("https://web.whatsapp.com/send?phone=" + internationalFormattedNum);
    else
        window.open("https://api.whatsapp.com/send?phone=" + internationalFormattedNum);
}

export function getWhatsappLink(){
    const internationalFormattedNum = getInternationalFormattedNum();
    return "https://web.whatsapp.com/send?phone=" + internationalFormattedNum;
}