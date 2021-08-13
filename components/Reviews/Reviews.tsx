import { FC, useState } from "react";
import { Image, Pagination } from "react-bootstrap";
import Review from "../../dtos/Review.dto";
import Text from "../../styled/Text";
import Spacer from "../../styled/Spacer";
import StarRating from "../StarRating";
import Divider from "../../styled/Divider";
import StillHaveQuestion from "../StillHaveQuestions/StillHaveQuestions";
import Button from "../../styled/Button";
import { RatingModal } from "../RatingAndReview/RatingAndReview";
import StyledPagination from "../../styled/StyledPagination";
import StarRatingComponent from "react-star-rating-component";
import { set } from "react-hook-form";
import useResponsiveDevice from "../useResponsiveDevice";

interface DataType {
  averageRating: number;
  reviews: Review[];
  slug: string;
}

interface ReviewsProps {
  data: DataType;
}

const Reviews: FC<ReviewsProps> = ({ data }) => {
  const [showRatingModal, setShowRatingModal] = useState<boolean>(false);
  const [pageNumber, setPageNumber] = useState(0);
  const { isMobile } = useResponsiveDevice();
  return (
    <div className="container">
      <RatingModal
        show={showRatingModal}
        setShow={setShowRatingModal}
        slug={data.slug}
      />
      <div
        className={isMobile ? "text-center" : "d-flex justify-content-between"}
      >
        <div>
          <Text
            fontFamily="montserrat"
            fontSize="xxxl"
            weight="bold"
            className={isMobile ? "mb-0" : ""}
          >
            Reviews
          </Text>
          {!isMobile ? <Spacer direction="vertical" size={5} /> : null}

          <div className={isMobile ? "" : "d-flex align-items-center"}>
            {/* <StarRating readonly initialRating={data.averageRating} /> */}
            {/* <Spacer direction="horizontal" size={8} />
            <Text inline fontSize="sm" color="gray" className="mb-0">
              {data.reviews.length} reviews
            </Text> */}
          </div>
        </div>

        <div className={isMobile ? "mt-2" : ""}>
          <Button
            size={"md"}
            backgroundColor={"primary"}
            rounded={true}
            onClick={() => {
              setShowRatingModal(true);
            }}
            style={{ fontWeight: 600, fontSize: "1rem" }}
          >
            Write a Review
          </Button>
        </div>
      </div>

      {/* <Spacer direction="vertical" size={10} /> */}
      <Divider color="black" margin="13px" />
      <ul className="list-unstyled">
        {data.reviews
          .filter((_, index) => Math.floor(index / 5) === pageNumber)
          .map((review: Review, index: number) => {
            return (
              <li className="mb-4" key={index}>
                <div className="d-flex">
                  <Text weight="midbold" fontSize="base">
                    {review.author.name}
                  </Text>
                  <Spacer direction="horizontal" size={8} />
                </div>
                {/* <StarRatingComponent
                  name={"star-review"}
                  value={parseInt(review.rating)}
                /> */}
                <Text
                  fontSize="base"
                  weight="normal"
                  as="div"
                  dangerouslySetInnerHTML={{ __html: review.content || "" }}
                  color="black"
                ></Text>
              </li>
            );
          })}
      </ul>

      {/* <StyledPagination>
        <Pagination.Prev disabled={pageNumber === 0} onClick={() => setPageNumber(pageNumber - 1)}>
          <Image src="/icons/caretl.svg" />
        </Pagination.Prev>
          {Array.from(Array(Math.ceil(data.reviews.length/5)).keys()).map((el: number) => {
              return <Pagination.Item onClick={() => setPageNumber(el)} active={pageNumber === el}>
                  {el + 1}
              </Pagination.Item>
          })}
        <Pagination.Next disabled={pageNumber === Math.ceil(data.reviews.length/5)-1} onClick={() => setPageNumber(pageNumber + 1)}>
          <Image src="/icons/caretr.svg" />
        </Pagination.Next>
      </StyledPagination> */}
    </div>
  );
};

export default Reviews;
