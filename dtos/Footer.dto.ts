import Image from "./Image.dto";

interface SectionLinks{
    name: string;
    link: string;
    target: string;
}

interface Sections{
    heading: string;
    sectionlinks: SectionLinks[];
}

interface Social{
    name: string;
    link: string;
    alttext: string;
    imagesrc: Image;
}

interface Contact{
    heading: string;
    address: string;
    phone: string;
    email: string;
}

interface About{
    heading: string;
    description: string;
}

interface FooterBottom{
    copyright: string;
    whatsupScript: string;
    bottomContent: string;
}

interface FooterRightContainer{
    sections: Sections;
    secondSections: Sections;
}

interface FooterLeftContainer{
    about: About;
    contact: Contact;
    social: Social[];

}

interface FooterDefinition{
    footer_leftcontainer: FooterLeftContainer;
    footer_rightcontainer: FooterRightContainer;
    footer_buttom: FooterBottom;
}

export default FooterDefinition;