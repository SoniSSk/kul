export const LEGAL_CONSULTATION_PRICES = [
    {
        minutes: 15,
        rate: 33,
        amount: 495,
        amountWas: 599,
        discount: '21%',
        save: 104
    },
    {
        minutes: 20,
        rate: 30,
        amount: 600,
        amountWas: 739,
        discount: '23%',
        save: 139
    },
    {
        minutes: 25,
        rate: 27,
        amount: 675,
        amountWas: 848,
        discount: '26%',
        save: 173
    },
    {
        minutes: 30,
        rate: 23,
        amount: 690,
        amountWas: 990,
        discount: '43%',
        save: 300
    },
    {
        minutes: 35,
        rate: 22,
        amount: 770,
        amountWas: 1120,
        discount: '45%',
        save: 350
    }
];

export function getLegalConsultationData(time: number): any{
    const data = LEGAL_CONSULTATION_PRICES.filter((val: any) => val.minutes ===  time);
    if(data.length) return data[0];
    return [];
}