export const WRITE_REVIEW = `
    mutation productReview(
        $email: String!
        $feedback_text: String!
        $mobile: Float!
        $name: String!
        $star_rating: String!
        $product_slug: String!
    )
    {
        productReview(productReviewInput: {
            email: $email
            feedback_text: $feedback_text
            mobile: $mobile
            name: $name
           	start_rating: $star_rating
           	product_slug: $product_slug
        }){
            _id
            created_at
        		email
        		feedback_text
        		start_rating
        		updated_at
        		mobile
        		name
        }
    }
`;

export const GET_REVIEWS = `
  query($slug: String!){
  getProductReview(slug: $slug){
    _id
    created_at
    email
    feedback_text
    mobile
    name
    product_slug
    start_rating
    updated_at
  }
}
`