import {FC, useState} from "react";
import Slider, { SliderTooltip } from 'rc-slider';
import 'rc-slider/assets/index.css';
import Text from "../../styled/Text";
import {getLegalConsultationData, LEGAL_CONSULTATION_PRICES} from "../../constants/LegalConsultationPrices";;
import CrossedText from "../../styled/CrossedText";
import Button from "../../styled/Button";
import {addItems} from "../../redux/cart/cart.actions";
import {useDispatch} from "react-redux";
import Product from "../../dtos/Product.dto";


interface SliderInputProps{
    data: Product
}

interface ConsultationPricesType{
    minutes: number;
    rate: number;
    amount: number;
    amountWas: number;
    discount: string;
    save: number;
}



const SliderInput: FC<SliderInputProps> = ({data}) => {

    const minTime: number = LEGAL_CONSULTATION_PRICES[0].minutes;
    const maxTime: number = LEGAL_CONSULTATION_PRICES[LEGAL_CONSULTATION_PRICES.length - 1].minutes;

    const [value, setValue] = useState(minTime);

    const dispatch = useDispatch();

    const Label = ({ data } : {data: any}) => {
        return(
            <div className="d-flex flex-column">
                <Text fontSize="xxs" weight="bold" color={value === data.minutes? "primary": "gray"}> {data.minutes} </Text>
                <Text fontSize="xxs" weight="bold" color={value === data.minutes? "primary": "gray"}> min </Text>
            </div>
        )
    }


    const marks = LEGAL_CONSULTATION_PRICES.reduce((acc, data: ConsultationPricesType) => {
        Object.assign(acc, {[data.minutes]: <Label data={data} /> });
        return acc;
    }, {});

    console.log("Marks is", marks);


    const purchaseTalktime = async () => {
        dispatch(addItems([{
            ...data,
            otherRegularPrice: null,
            otherSalePrice: null,
            regularPrice: getLegalConsultationData(value).amountWas,
            salePrice: getLegalConsultationData(value).amount,
        }]));
    }

    return(
        <div className="row w-75 d-flex flex-column justify-content-center mt-5">
            <Slider min={minTime}
                    value={value}
                    onChange={(newVal: any) => setValue(newVal)}
                    max={maxTime}
                    marks={marks}
                    className="mb-5"
                    step={5}/>

            <div className="mt-5 w-75 d-flex justify-content-between" style={{
                backgroundColor: "white",
                padding: "20px"
            }}>
                <div>
                    <Text fontSize="md" weight="bold"> {value} min Talktime </Text>
                    <Text fontSize="sm" color="gray"> &#8377; {getLegalConsultationData(value).rate} per min </Text>
                </div>

                <div>
                    <div className="d-flex">
                        <Text className="mr-2" fontSize={"md"} weight={"bold"}>  &#8377; {getLegalConsultationData(value).amount}/- </Text>
                        <CrossedText fontSize={"md"} color="gray"> &#8377; {getLegalConsultationData(value).amountWas}/- </CrossedText>
                    </div>
                    <Text fontSize="sm" color="gray"> Save Rs {getLegalConsultationData(value).save} </Text>
                </div>
            </div>

            <Button className={"mt-5 w-50"} size={"md"} rounded={true} backgroundColor={"primary"} onClick={purchaseTalktime}>
                <div className="d-flex w-100 justify-content-center align-items-center">
                    <Text fontSize="md" weight={"bold"} color={"white"}>  Buy Talktime </Text>
                    <Text className="ml-2" fontSize="lg" weight="bold" color={"white"}> {"->"} </Text>
                </div>

            </Button>
        </div>

    )
}

export default SliderInput;