import React, {FC, useState} from "react";
import Text from "../../styled/Text";
import StarRating from "../StarRating";
import StarRatingComponent from "react-star-rating-component";
import Button from "../../styled/Button";
import {errorToast} from "../../utils/toasts";
import axios from "axios";
import {SubmitFeedback} from "../../constants/queries/order";
import backendApi from "../../api/backendApi";

interface OrderReviewProps{
    orderId: string | undefined;
}

const OrderReview: FC<OrderReviewProps> = React.memo(({ orderId }) => {

    console.log("Rendered");

    const [showReviewText, setShowReviewText] = useState(false);
    const [ratings, setRatings] = useState(0);
    const [feedbackText, setFeedbackText] = useState('');
    const [doneRatings, setDoneRatings] = useState(false);


    const handleSubmit = async () => {
        try{
            await backendApi.post('/', {
                query: SubmitFeedback,
                variables:{
                    feedback_text: feedbackText,
                    order_id: orderId,
                    star_rating: ratings.toString()
                }
            });

            setDoneRatings(true);

        }catch (e) {
            errorToast(e.message);
        }
    }

    const DoneRatings = () => {
        return(
            <Text fontSize="md"> Thank you for your feedback </Text>
        )
    }

    const NotDoneRatings = () => {
        return(
            <div className="row">
                <div className="col-6 col-md-6">
                    <Text fontSize="md" style={{
                        wordBreak: 'break-word'
                    }}> Rate your Experience to Give Feedback</Text>
                </div>

                <div className="col-6 col-md-6">
                    <Text fontSize="xl">
                        <StarRatingComponent
                            name="rate1"
                            starCount={5}
                            value={ratings}
                            starColor="#396AE8"
                            emptyStarColor="gray"
                            onStarClick={(number) => {
                                setRatings(number);
                                setShowReviewText(true);
                            }}
                            onStarHoverOut={(number) => {
                                setRatings(number);
                            }}
                        />
                    </Text>

                    {showReviewText? <>
                    <textarea className="form-control mt-2 mb-5"
                              placeholder="Write your review here"
                              value={feedbackText}
                              onChange={(event) => {
                                  setFeedbackText(event.target.value);
                              }}/>
                        <Button size={"sm"} rounded={true} backgroundColor={"primary"} onClick={handleSubmit}>
                            Submit Feedback
                        </Button>
                    </> : null}

                </div>
            </div>
        )
    }

    return doneRatings ? <DoneRatings /> : <NotDoneRatings />;
});

export default OrderReview;