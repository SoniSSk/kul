export const CREATE_ORDER_QUERY = `
mutation createOrder(
   $user: String!,
   $category_id: String!,
   $total_amount: Float!,
   $tax: Float!,
   $subtotal: Float!,
   $discount: Float!,
   $currency: String!,
   $products: [ProductInput!]!,
   )
  {
        createOrder(createOrderInput: {
          user: $user,
          category_id: $category_id,
          total_amount: $total_amount,
          tax: $tax,
          subtotal: $subtotal,
          discount: $discount,
          currency: $currency,
          products: $products
        }){
          _id
            call_schedule{
              _id
              time_slot
            }
            category_id
            currency
            deliverables{
              _id
              deliverable_url
              deliverable_name
            }
            discount
            payment_method
            payment_status
            paytm_order_id
            paytm_transaction_token
            products{
              _id
              product_id
              product_name
              amount
              status
            }
            razorpay_order_id
            razorpay_payment_id
            razorpay_signature
            razorpay_transaction_id
             requirement_info
            required_documents{
              _id
              document_url
              document_status
              document_name
            }
             requirement_info
            subtotal
            tax
            total_amount
        }
  }`;



export const Get_Signed_URL = `
  query signedUrl(
    $docType: String!
  ){
    getSignedUrl(docType:$docType){
      url
    }
  }
`;


export const Get_Time_Slotes = `
query TimeSlote(
  $time: String!
){
  getTimeSlot(currentTime: $time)
}
`;
export const Uploard_Document_Url = `
mutation(
  $_id: String!
  $document_name: String!
  $document_url: String!
){
  uploadDocument(uploadDocumentInput:{
    _id:$_id
  	document_name:$document_name
    document_url:$document_url
  }){
    _id
    required_documents{
      document_name
      _id
      document_status
      document_url
    }
  }
}
`;

export const SheduleForCall = `
mutation reuestforCall(
  $_id: String!
  $assignedUser: String!
  $time_slot: String!
){
  requestForCallBack(callBackInput:{
    _id:$_id
    assigned_user:$assignedUser
    time_slot:$time_slot
  }){
    _id
    call_schedule{
      _id
      comment
      time_slot
    }
  }
}
`
export const requirmentInfo = `
mutation requirmentInfo(
  $_id: String!
  $requirmentInfo: String!
){
  updateOrder(updateOrderInput:{
    requirement_info:$requirmentInfo
    _id:$_id
  }){
    _id
    requirement_info
  }
}
`

export const ProductStatusCount =`
query (
  $catagoryid: String!
  $user: String!
){
  getProductStatusCount(getOrderInput:{
    category_id:$catagoryid
    user:$user
  }){
    complete
    incomplete
  }
}
`
export const PurchaseProductDetails = `
query (
  $category_id: String!
  $user: String!
){
	getOrderByCategory(getOrderInput:{
    category_id:$category_id
    user:$user
  }){
    _id
    category_id
    call_schedule{
      _id
      status
      time_slot
    }
    deliverables{
      _id
      deliverable_name
      deliverable_status
      deliverable_url
    }
    created_at
    currency
    discount
    products{
      _id
      amount
      deliverables{
        _id
        deliverable_name
        deliverable_status
        deliverable_url
      }
      product_id
      product_name
      status
    }
    required_documents{
      _id
      document_name
      document_status
      document_url
    }
    payment_method
    requirement_info
    status
    subtotal
    tax
    total_amount
    user{
      _id
      city
      status
    }
  }
}
`

export const MarkAsCompleted = `
mutation query(
  $order_id: String!
  $status: OrderAllowedStatus!
){
  updateOrderStatus(orderStatusInput: {
    order_id: $order_id,
    status: $status
  }){
    _id
  }
  
}
`;

export const SubmitFeedback = `
    mutation feedbackRating(
  $feedback_text: String!
  $order_id: String!
  $star_rating: String!
    ){
      giveFeedbackRating(feedbackInput: {
        feedback_text: $feedback_text,
        order_id: $order_id,
        star_rating: $star_rating
      }){
        _id,
        star_rating,
        feedback_text
  }
}
`;

export const UPDATE_PAYMENT_STATUS = `
    mutation updateOrderPaymentStatus(
  $order_id: String!
  $payment_status: PaymentAllowedStatus!
  $paytm_order_id: String
  $paytm_transaction_token: String
  $razorpay_order_id: String
  $razorpay_payment_id: String
  $razorpay_signature: String
){
  updateOrderPaymentStatus(orderPaymentStatusInput: {
    order_id: $order_id,
    payment_status: $payment_status,
    paytm_order_id: $paytm_order_id,
    paytm_transaction_token: $paytm_transaction_token,
    razorpay_order_id: $razorpay_order_id,
    razorpay_payment_id: $razorpay_payment_id,
    razorpay_signature: $razorpay_signature
  }){
    _id,
    payment_status,
    payment_method,
    status
  }
}
`

export const REMOVE_DOCUMENT = `
   mutation removeDocument($id: String, !$order_id: String!){
  removeDocument(removeDocumentInput: {
    _id: $id,
    order_id: $order_id
  }){
    _id
  }
} 
`;