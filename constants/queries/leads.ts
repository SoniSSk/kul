export const CREATE_LEAD_QUERY = `
    mutation createLead(
        $address: String!
        $concerned_area: String!
        $country_code: Int!
        $mobile: Float!
        $name: String!
        $requirement: String!
    )
    {
        createLead(createLeadInput: {
            address: $address
            concerned_area: $concerned_area
            country_code: $country_code
            mobile: $mobile
            name: $name
            requirement: $requirement
        }){
            _id
            address
            concerned_area
            country_code
            created_at
            mobile
            name
            requirement
            updated_at
        }
    }
`