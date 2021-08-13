import { FC } from 'react';
import Rating, { RatingComponentProps } from 'react-rating';

const SvgFullIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z"
      fill="#1F8BEF"
    />
  </svg>
);

const SvgEmptyIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14.81 8.62L22 9.24L16.55 13.97L18.18 21L12 17.27L5.82 21L7.46 13.97L2 9.24L9.19 8.63L12 2L14.81 8.62ZM12 6.1V15.4L15.77 17.68L14.77 13.4L18.09 10.52L13.71 10.14L12 6.1Z"
      fill="#1F8BEF"
    />
  </svg>
);

const StarRating: FC<RatingComponentProps> = ({ ...props }) => {
  console.log(props);
  return (
    <Rating
      emptySymbol={<SvgEmptyIcon />}
      fullSymbol={<SvgFullIcon />}
      fractions={2}
      {...props}
    />
  );
};

export default StarRating;
