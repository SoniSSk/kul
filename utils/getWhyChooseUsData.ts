import WhyChooseUs from "../dtos/WhyChooseUs.dto";

const getWhyChooseUsData = (categorySlug: string) : WhyChooseUs[] => {
    let whyChooseUs: WhyChooseUs[];
    if (categorySlug == "documentation") {
        whyChooseUs = [
            {
                description: "Every 4 mins someone completes their last will with EzyLegal",
                title: "Trusted",
                icon: {
                    sourceUrl:
                        "https://cms.ezylegal.in/wp-content/uploads/2021/06/verified_user_black_24dp.svg",
                    title: "verified_user_black_24dp",
                    databaseId: 277,
                },
                image: null,
            },
            {
                description:
                    "Get legal contracts drafted from expert corporate lawyers. Agreement drafts are delivered within a maximum of 2 days",
                title: "Fast & Easy",
                icon: {
                    sourceUrl:
                        "https://cms.ezylegal.in/wp-content/uploads/2021/06/directions_run_black_24dp.svg",
                    title: "person_pin_24px",
                    databaseId: 277,
                },
                image: null,
            },
            {
                description:
                    "Documents and information are always kept private. Information shared with the lawyer are 100% confidential",
                title: "Secure & Confidential",
                icon: {
                    sourceUrl:"https://cms.ezylegal.in/wp-content/uploads/2021/06/lock_black_24dp.svg",
                    title: "people_24px",
                    databaseId: 276,
                },
                image: null,
            },
        ];

    } else {
        whyChooseUs = [
            {
                description: "Every 4 mins someone completes their last will with EzyLegal",
                title: "Trusted",
                icon: {
                    sourceUrl:
                        "https://cms.ezylegal.in/wp-content/uploads/2021/06/verified_user_black_24dp.svg",
                    title: "verified_user_black_24dp",
                    databaseId: 277,
                },
                image: null,
            },
            {
                description:
                    "Rely on guidance from highly-rated lawyers that you can choose from our vetted network.",
                title: "Accessible Legal Advice",
                icon: {
                    sourceUrl:
                        "https://cms.ezylegal.in/wp-content/uploads/2021/07/person_pin_24px.png",
                    title: "person_pin_24px",
                    databaseId: 277,
                },
                image: null,
            },
            {
                description:
                    "Rely on guidance from highly-rated lawyers that you can choose from our vetted network.",
                title: "On Time Delivery",
                icon: {
                    sourceUrl:
                        "https://cms.ezylegal.in/wp-content/uploads/2021/06/schedule_black_24dp.svg",
                    title: "people_24px",
                    databaseId: 276,
                },
                image: null,
            },
        ];
    }
    return whyChooseUs;
}

export default getWhyChooseUsData;