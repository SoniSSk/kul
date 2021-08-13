import {getWhatsappLink} from "./openWhatsapp";

const homepageLinkMapper = function(homepageData: any) {
    homepageData.page.home_page.cardlist?.forEach((cardItem: any) => {
        // if(cardItem.button.link.toLowerCase().includes("whatsapp")){
        //     cardItem.button.link = getWhatsappLink();
        // }
        cardItem.button.link = "/category/" + cardItem.button.link;
        cardItem.links?.forEach((productItem: any) => {
            productItem.link = cardItem.button.link + "/product/" + productItem.link;
        });
        if(cardItem.subCard){
            if(cardItem.subCard.button.link.toLowerCase().includes("whatsapp")){
                cardItem.subCard.button.link = getWhatsappLink();
            }
            else cardItem.subCard.button.link = "/category/" + cardItem.subCard.button.link;
        }
    });
    return homepageData;
}

export default homepageLinkMapper;