export const CREATE_USER_QUERY = `mutation createUser(
  $email: String!,
  $name: String!,
  $mobile: Float!,
  $countryCode: Int!
  $type: UserType!
  ) {
    createUser(createUserInput: {
      email: $email,
      name: $name,
      mobile: $mobile,
      country_code: $countryCode
      user_type: $type
    }) {
    _id
    address
    city
    company
    country_code
    email
    mobile
    name
    pincode
    professional_details{
      bar_council_id_no
      bar_council_id_image
      degree
      passing_year
      practice_courts{
        state
        city
        court
      }
      practice_year
      specialization
      university
    }
    profile_image
    state
    status
    user_type
    jwt_token
    status
    gender
    }
  }`;
  export const Update_USER_Mutation = `
  mutation Update_User(
    $_id: String!
    $city: String!
    $country_code: Int!
    $email: String!
    $mobile: Float!
    $name: String!
    $state: String!
  ){
    updateUser(updateUserInput:{
      _id:$_id
      city:$city
      country_code: $country_code
      email:$email
      mobile:$mobile
      name:$name
      state:$state
    }){
    _id
    address
    city
    company
    country_code
    email
    mobile
    name
    pincode
    professional_details{
      bar_council_id_no
      bar_council_id_image
      degree
      passing_year
      practice_courts{
        state
        city
        court
      }
      practice_year
      specialization
      university
    }
    profile_image
    state
    status
    user_type
    jwt_token
    status
    gender
    }
  }
  `;


export const LOGIN_QUERY = `mutation loginUser($mobile: Float!, $countryCode: Int!) {
  loginUser(loginUserInput: {
    country_code: $countryCode
    mobile: $mobile
  }) {
    _id
    name
    country_code
    company
    email
    mobile
    status
  }
}`;

export const OTP_VERIFY_QUERY = `mutation verifyOtp($mobile: Float!, $otp: Float!) {
  verifyOtp(verifyOtpInput: {
    mobile: $mobile
    otp: $otp
  }) {
      _id
    city
    company
    country_code
    email
    mobile
    name
    pincode
    professional_details{
      bar_council_id_no
      bar_council_id_image
      degree
      passing_year
      practice_courts{
        state
        city
        court
      }
      practice_year
      specialization
      university
    }
    profile_image
    state
    status
    user_type
    jwt_token
    status
    gender
  }
}`;

export const SUBSCRIBE_TO_NEWSLETER = `
mutation subscribeToNewsletter($email: String!){
  subscribeNewLetter(newsLetterInput: {
    email: $email
  }){
    _id,
    email
  }
}
`;