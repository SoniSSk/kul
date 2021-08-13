export const MENU_QUERY = `query {
    menus (first: 100) {
      nodes {
        id
        name
        slug
        menuItems (first: 100) {
          nodes {
            id
            title
            url
            target
            label
            parentId
            linkRelationship
          }
        }
      }
    }
  }`;

export const STILL_HAVE_A_QUESTION_QUERY = `
query{
    page( id:"still-have-a-question",idType:URI){ 
  	title
    stillHaveAQuestion{
      
      content{
        heading
        leftBox{
          heading
          content
          image{
            sourceUrl
            title
            databaseId
          }
          button{
            text
            link
          }
        }
        rightBox{
          heading
          timing{
            availableSlot
          }
        }
      }
    }
  }
}
`;

export const Home = `
query MyQuery {

  page( id:"home",idType:URI){  	 
       
 			home_page{
        banner{
          content{
            title
            summary
            image{
              sourceUrl
            }
          }
          highlightedCategories{
            name
            link
            type
          }
        }
        smallBanner{
          title
          linkUrl
          summary
          buttonText
          image{
              sourceUrl
            }
        }
       whyChooseUs{
        title
        description
        
      } 
       businessMatrix{
        counter
        heading
        content
      } 
      cardlist{
        direction
        heading
        content
        image {
          title
          sourceUrl
        }
        links {
          link
          fieldGroupName
          title
        }
        button{
          title
          link
        }
        subCard{
          title
          content
          button{
            title
            link
          }
        }
        
      }  
        testimonialData{
        testimonialHeading
        testimonialSubHeading
        testimonials{
          name
          designation
          summary
          profileImage{
            sourceUrl
          }
        }
      }
        
      }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    }
  
  productCategories(first: 10,where:{search:"business"}) {
    pageInfo{
          startCursor
          hasNextPage
          hasPreviousPage
          endCursor
        }  
    edges {
        cursor
      node {
        count
        id
        name
        description
        slug
        link
        image{
          databaseId
          sourceUrl
          title
          
        }
        products{
    edges {
      cursor
      node {
         
        id
        name
        sku
        slug
        link
        shortDescription
         
        dateOnSaleTo
        dateOnSaleFrom
        onSale
        reviewCount
        productTypes {
          edges {
            node {
              id
              name
            }
          }
        }
        ... on SimpleProduct {
          regularPrice(format: RAW)
          salePrice(format: RAW) 
          dateOnSaleFrom
          dateOnSaleTo
        }
        ... on VariableProduct {
          variations {
            edges {
              node {
                
                id
                databaseId
                name
                sku
                price(format: RAW)
                regularPrice(format: RAW)
                salePrice(format: RAW)
               	dateOnSaleFrom
          			dateOnSaleTo
                
              }
            }
          }
        }
        otherRegularPrice 
        otherSalePrice
        image {
          sourceUrl
          title
          comments {
            edges {
              node {
                id
              }
            }
          }
        }
        promotionText
         
      }
    }
  }
  
        children {
          edges {
            cursor
            node {
                count
                id
                name
                description
                slug
                link
                image{
                  databaseId
                  sourceUrl
                  title
                }
                products{
    edges {
      cursor
      node {
         
        id
        name
        sku
        slug
        link
        shortDescription
        description
        dateOnSaleTo
        dateOnSaleFrom
        onSale
        reviewCount
        productTypes {
          edges {
            node {
              id
              name
            }
          }
        }
        ... on SimpleProduct {
          regularPrice(format: RAW)
          salePrice(format: RAW) 
          dateOnSaleFrom
          dateOnSaleTo
        }
        ... on VariableProduct {
          variations {
            edges {
              node {
                
                id
                databaseId
                name
                sku
                price(format: RAW)
                regularPrice(format: RAW)
                salePrice(format: RAW)
                 dateOnSaleFrom
          			dateOnSaleTo
                
              }
            }
          }
        }
        otherRegularPrice 
        otherSalePrice
        image {
          sourceUrl
          title
          comments {
            edges {
              node {
                id
              }
            }
          }
        }
       	promotionText
         
      }
    }
  }
              	children {
                    edges {
                       cursor 
                      node {
                          count
                          id
                          name
                          description
                          slug
                          link
                        image{
                          databaseId
                          sourceUrl
                          title
                        }
                        products{
    edges {
      cursor
      node {
         
        id
        name
        sku
        slug
        link
        shortDescription
        description
        dateOnSaleTo
        dateOnSaleFrom
        onSale
        reviewCount
        productTypes {
          edges {
            node {
              id
              name
            }
          }
        }
        ... on SimpleProduct {
          regularPrice(format: RAW)
          salePrice(format: RAW) 
          dateOnSaleFrom
          dateOnSaleTo
        }
        ... on VariableProduct {
          variations {
            edges {
              node {
                
                id
                databaseId
                name
                sku
                price(format: RAW)
                regularPrice(format: RAW)
                salePrice(format: RAW)
                 dateOnSaleFrom
          			dateOnSaleTo
                
              }
            }
          }
        }
        
        otherRegularPrice 
        otherSalePrice
        image {
          sourceUrl
          title
          comments {
            edges {
              node {
                id
              }
            }
          }
        }
        promotionText
         
      }
    }
  }
                      }
                    }
                  }
            	}
          }
        }
      }
    }
  } 
  
}

    
`
// export const Home = `
//     query MyQuery {
//         page( id:"home",idType:URI){
//             home_page{        
//               banner{          content{            title            summary            image{              sourceUrl            }          }          highlightedCategories{            name            link            type          }        }        smallBanner{          title          linkUrl          summary          buttonText          image{              sourceUrl            }        }       whyChooseUs{        title        description              }        businessMatrix{        counter        heading        content      }       cardlist{        direction        heading        content        button{          title          link        }        subCard{          title          content          button{            title            link          }        }              }          testimonialData{        testimonialHeading        testimonialSubHeading        testimonials{          name          designation          summary          profileImage{            sourceUrl          }        }      }              }                                                                                        }
//                 productCategories(first: 10,where:{search:"business"}) {    pageInfo{          startCursor          hasNextPage          hasPreviousPage          endCursor        }      edges {        cursor      node {        count        id        name        description        slug        link        image{          databaseId          sourceUrl          title                  }        products{    edges {      cursor      node {                 id        name        sku        slug        link        shortDescription                 dateOnSaleTo        dateOnSaleFrom        onSale        reviewCount        productTypes {          edges {            node {              id              name            }          }        }        ... on SimpleProduct {          regularPrice(format: RAW)          salePrice(format: RAW)           dateOnSaleFrom          dateOnSaleTo        }        ... on VariableProduct {          variations {            edges {              node {                                id                databaseId                name                sku                price(format: RAW)                regularPrice(format: RAW)                salePrice(format: RAW)               dateOnSaleFrom          dateOnSaleTo                              }            }          }        }        otherRegularPrice         otherSalePrice        image {          sourceUrl          title          comments {            edges {              node {                id              }            }          }        }        promotionText               }    }  }          children {          edges {            cursor            node {                count                id                name                description                slug                link                image{                  databaseId                  sourceUrl                  title                }                products{    edges {      cursor      node {                 id        name        sku        slug        link        shortDescription        description        dateOnSaleTo        dateOnSaleFrom        onSale        reviewCount        productTypes {          edges {            node {              id              name            }          }        }        ... on SimpleProduct {          regularPrice(format: RAW)          salePrice(format: RAW)           dateOnSaleFrom          dateOnSaleTo        }        ... on VariableProduct {          variations {            edges {              node {                                id                databaseId                name                sku                price(format: RAW)                regularPrice(format: RAW)                salePrice(format: RAW)                 dateOnSaleFrom          dateOnSaleTo                              }            }          }        }        otherRegularPrice         otherSalePrice        image {          sourceUrl          title          comments {            edges {              node {                id              }            }          }        }       promotionText               }    }  }              children {                    edges {                       cursor                       node {                          count                          id                          name                          description                          slug                          link                        image{                          databaseId                          sourceUrl                          title                        }                        products{    edges {      cursor      node {                 id        name        sku        slug        link        shortDescription        description        dateOnSaleTo        dateOnSaleFrom        onSale        reviewCount        productTypes {          edges {            node {              id              name            }          }        }        ... on SimpleProduct {          regularPrice(format: RAW)          salePrice(format: RAW)           dateOnSaleFrom          dateOnSaleTo        }        ... on VariableProduct {          variations {            edges {              node {                                id                databaseId                name                sku                price(format: RAW)                regularPrice(format: RAW)                salePrice(format: RAW)                dateOnSaleFrom
//                           dateOnSaleTo                              }            }          }        }                otherRegularPrice         otherSalePrice        image {          sourceUrl          title          comments {            edges {              node {                id              }            }          }        }        promotionText              }    }  }                      }                    }                  }            }          }        }      }    }  }   }

// `

export const TAX_QUERY = `{
  taxRates (first: 100) {
    nodes {
      country
      databaseId
      id
      name
      rate
    }
  }
}`;

export const BLOG_QUERY = `
{
  posts(first: 1000, where: { orderby: { field: DATE, order: DESC} }) {
    nodes {
      slug
      featuredImage {
        node {
          title
          databaseId
          sourceUrl
        }
      }
      tags {
        nodes {
          id
          slug
          name
        }
      }
      seo {
        description
        keywords
        robot
      }
      date
      content
      id
      author {
        node {
          id
          name
          avatar {
            url
          }
        }
      }
      title
      excerpt
      categories {
        nodes {
          id
          slug
          name
        }
      }
    }
  }
}
`;

export const BLOG_CATEGORY_QUERY = `query {
  categories {
    nodes {
      name
      id
      slug
    }
  }
}
`;

export const BLOG_POSTS_BY_CATEGORY = `query ($slug:ID!) {
  category(id: $slug, idType: SLUG) {
    count
    posts(first: 20, after: "") {
      pageInfo {
        startCursor
        hasNextPage
        hasPreviousPage
        endCursor
      }
      edges {
        cursor
        node {
          id
          title
          date
          slug
          excerpt
          tags{
              edges{
                  node{
                      id
                      name
                  }
              }
          }
          minimum_read_minute{
            minimumReadMinute
          }
          categories{
            edges{
              node{
                id
                slug
                name
              }
            }
          }
          author {
            node {
              id
              name
              slug
              lastName
            }
          }
          featuredImage {
            node {
              sourceUrl
              title
              databaseId
            }
          }
        }
      }
    }
  }
}
`

export const Product_Catagory_Lists = `query{
  productCategories(first: 200, after: "") {
    edges {
        cursor
      node {
        id
        name
      }
    }
  }
}

`
export const Terms_Condition = `
query MyQuery {
  page( id:"terms-and-conditions",idType:URI){  	 
       title
    	 content
    	 addition_field{
        subHeading
        subSubHeading
      }
    }
  }
     
`
export const Privacy_Query = `
query MyQuery {
  page( id:"privacy-policy",idType:URI){  	 
       title
    	 content
    	 addition_field{
        subHeading
        subSubHeading
      }
 			 
    }
  }
`
export const PRODUCT_CATEGORY_QUERY = `{
  productCategories(first: 1000) {
    nodes {
      count
      id
      name
      description
      slug
      link
      image {
        databaseId
        sourceUrl
        title
      }
      products(first: 1000) {
        nodes {
          id
          name
          sku
          slug
          link
          shortDescription
          description
          dateOnSaleTo
          dateOnSaleFrom
          onSale
          reviewCount
          averageRating
          productTypes {
            nodes {
              id
              name
            }
          }
          ... on SimpleProduct {
            regularPrice
            salePrice
            dateOnSaleFrom
            dateOnSaleTo
          }
          ... on VariableProduct {
            variations {
              nodes {
                id
                databaseId
                name
                sku
                price
                regularPrice
                salePrice
                dateOnSaleFrom
                dateOnSaleTo
                description
              }
            }
          }
          upsell {
            nodes {
              id
              otherRegularPrice
              otherSalePrice
              name
              ... on SimpleProduct {
                regularPrice
                salePrice
                dateOnSaleFrom
                dateOnSaleTo
              }
            }
          }
          otherRegularPrice
          otherSalePrice
          image {
            sourceUrl
            title
            databaseId
          }
          promotionText
          seo {
            robot
            keywords
            description
          }
          product_addition {
            benefits {
              heading
              content {
                description
                title
                icon {
                  sourceUrl
                  title
                  databaseId
                }
              }
            }
            contents {
              content {
                description
                title
                icon {
                  sourceUrl
                  title
                  databaseId
                }
              }
              heading
            }
            deliverables {
              heading
              content {
                title
                description
                icon {
                  sourceUrl
                  title
                  databaseId
                }
              }
            }
            faqs {
              answer
              question
            }
            prerequisites {
              content {
                description
                title
                icon {
                  sourceUrl
                  title
                  databaseId
                }
              }
              heading
            }
            whyChooseUs {
              description
              title
              icon {
                sourceUrl
                title
                databaseId
              }
              image {
                sourceUrl
                title
                databaseId
              }
            }
            processSteps {
              order
              step
            }
          }
        }
      }
    }
  }
}
`;

export const PRODUCT_DETAILS_QUERY = `
query ( $slug:  ID!) {
     
    product(id: $slug,idType: SLUG) {
       	 id
          name
          sku
          slug
          link
          shortDescription
          description
          dateOnSaleTo
          dateOnSaleFrom
          onSale
      	  averageRating
         getTalkTime{
            heading
            subHeading
            contentBox{
              leftBox{
                price{
                  minutes
                  inrRatePerMin
                  usdRatePerMin
                  inrNowAmount
                  usdNowAmount
                  inrWasAmount
                  inrUsdAmount
                }
              }
              rightBox{
                title
                image{
                  sourceUrl
                  title
                }
                descriptionContent{
                  description
                }
                termsConditions{
                  termsConditions
                }
                
              }
            }
          }
    
          
          productTypes {
            edges {
              node {
                id
                name
              }
            }
          }
    			
          ... on SimpleProduct {
            regularPrice
            salePrice 
            price
            dateOnSaleFrom
            dateOnSaleTo
            crossSell{
        edges{
          node{
             id
          name
          sku
          slug
          link
          shortDescription

          dateOnSaleTo
          dateOnSaleFrom
          onSale
          reviewCount
          productTypes {
            edges {
              node {
                id
                name
              }
            }
          }
          ... on SimpleProduct {
            regularPrice
            salePrice 
            price
            dateOnSaleFrom
            dateOnSaleTo
          }
          ... on VariableProduct {
            variations {
              edges {
                node {

                  id
                  databaseId
                  name
                  sku
                  price
                  regularPrice
                  salePrice
                  description
					dateOnSaleTo
				dateOnSaleFrom	
                }
              }
            }
          }
           otherRegularPrice 
           otherSalePrice
          image {
            sourceUrl
            title
            databaseId
            comments {
              edges {
                node {
                  id
                }
              }
            }
          }
          promotionText
          

          }
        }
      }
            
          }
          ... on VariableProduct {
            variations {
              edges {
                node {

                  id
                  databaseId
                  name
                  sku
                  description
                  price
                  regularPrice
                  salePrice
					dateOnSaleTo
					dateOnSaleFrom
                }
              }
            }
            crossSell{
        edges{
          node{
             id
          name
          sku
          slug
          link
          shortDescription

          dateOnSaleTo
          dateOnSaleFrom
          onSale
          reviewCount
          productTypes {
            edges {
              node {
                id
                name
              }
            }
          }
          ... on SimpleProduct {
            regularPrice
            salePrice 
            price
            dateOnSaleFrom
            dateOnSaleTo
          }
          ... on VariableProduct {
            variations {
              edges {
                node {

                  id
                  databaseId
                  name
                  sku
                  price
                  regularPrice
                  salePrice
                  description
					dateOnSaleTo
				dateOnSaleFrom	
                }
              }
            }
          }
           otherRegularPrice 
           otherSalePrice
          image {
            sourceUrl
            title
            comments {
              edges {
                node {
                  id
                }
              }
            }
          }
          promotionText
          

          }
        }
      }
          }
          otherRegularPrice 
           otherSalePrice
          image {
            sourceUrl
            title
            comments {
              edges {
                node {
                  id
                }
              }
            }
          }

                product_addition {
        howWeWork{
          heading
          content{
            title
            description
            icon{
              databaseId
              sourceUrl
              title
            }
          }
        }

        deliverables{
            heading
            content{
                title
                icon{
                    databaseId
                    sourceUrl
                    title
                }
                description
            }
        }

        contents{
            heading
            content{
                title
                icon{
                    databaseId
                    sourceUrl
                    title
                }
                description
            }
        }


        benefits{
            heading
            content{
                title
                icon{
                    databaseId
                    sourceUrl
                    title
                }
                description
            }
        }
        displayname
        productCharacteristics{
          label
          icon{
            databaseId
            sourceUrl
            title
          }
        }
        productBanner{
          bannerTitle1
          bannerTitle2
          bannerTitle3
          image{
            databaseId
            sourceUrl
            title
          }
        }
        howWeWork{
          heading
          content{
            title
            description
            icon{
              databaseId
              sourceUrl
              title
            }
          }
        }
        productFeature{
          icon{
            databaseId
            sourceUrl
            title
          }
          description
        }
        verifiedexpertsection{
          number
          label
          text
        }
        
        whyChooseUs {
          title
          description
          icon{
              databaseId
              sourceUrl
              title
          }
        }
        processSteps {
          order
          step
        }
        prerequisites{
            heading
          content{
            title
            description
            icon{
              databaseId
              sourceUrl
              title
            }
            
          }
        } 
        faqs {
          question
          answer
        }
      }
          
    
      reviewCount
      reviews {
          
        edges {
          node {
            id
            content
            date 
            rating



            author {
              node {
                id
                name
              }
            }
            replies {
              edges {
                node {
                  id
                  content
                   date 
                  rating
                  author {
                    node {
                      id
                      name
                    }
                  }
                }
              }
            }

          }
        }

      }
    	upsell{
        
        edges{
          node{
             id
          name
          sku
          slug
          link
          shortDescription

          dateOnSaleTo
          dateOnSaleFrom
          onSale
          reviewCount
          productTypes {
            edges {
              node {
                id
                name
              }
            }
          }
          ... on SimpleProduct {
            regularPrice
            salePrice 
            price
            dateOnSaleFrom
            dateOnSaleTo
          }
          ... on VariableProduct {
            variations {
              edges {
                node {

                  id
                  databaseId
                  name
                  sku
                  price
                  regularPrice
                  salePrice
					dateOnSaleTo
					dateOnSaleFrom
                }
              }
            }
          }
           otherRegularPrice 
           otherSalePrice
          image {
            sourceUrl
            title
            comments {
              edges {
                node {
                  id
                }
              }
            }
          }
          promotionText
          promotionType

          }
        }
      }
    
      

    }
  }

`;

export const FOOTER_QUERY = `
    {
  page( id:"footer",idType:URI){  	 
       
        footer_leftcontainer{
          about{
            heading
            description
          }
          contact{
            heading
            address
            phone
            email
          }
          social{
            name
            link
            alttext
            imagesrc{
                sourceUrl
                databaseId
                title
            }
          }
        }
        footer_rightcontainer{
        sections{
          heading
          
        }
          sections{
            sections{
              heading
              sectionlinks{
                name
                link
                target
              }
            }
            secondSections{
              	heading
              sectionlinks{
                name
                link
                target
              }
            }
          }
        }
  			footer_buttom{
            copyright
            whatsupScript
            buttomContent
        }
         
      }
    }
 
`;