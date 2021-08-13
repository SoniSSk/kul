import { promises as fs } from 'fs';
import { flatMap } from 'lodash';

import api from "./api";
import {
  BLOGS_FILE,
  BLOG_CATEGORIES_FILE,
  CATEGORIES_FILE,
  MENUS_FILE,
  PRODUCTS_FILE,
  Home_File,
  Product_Catagory_List,
  JSON_PATH,
  Privacy_File,
  Terms_File,
  STILL_HAVE_A_QUESTION_FILE,
  FOOTER_FILE,
  LEGAL_CONSULTATION_FILE, BLOG_POST_BY_CATEGORIES_FILE
} from "./constants/file-paths";
import {
  BLOG_CATEGORY_QUERY,
  BLOG_QUERY,
  MENU_QUERY,
  PRODUCT_CATEGORY_QUERY,
  Home,
  Product_Catagory_Lists,
  PRODUCT_DETAILS_QUERY,
  Privacy_Query,
  Terms_Condition, STILL_HAVE_A_QUESTION_QUERY, FOOTER_QUERY, BLOG_POSTS_BY_CATEGORY
} from './constants/graphql';
import hierarchicalBuilder from './utils/hierarchicalBuilder';
import homepageLinkMapper from "./utils/homepageLinkMapper";
import priceToInteger from "./utils/priceToInteger";
import productDataPreProcess, {legalConsultationCategory} from "./utils/productDataPreProcess";
import BlogCategory from "./dtos/BlogCategory.dto";

export const fetchData = async () => {
  try {
    // fetch menu
    console.log("Entered here");
    const menuRes = await api.post('/', { query: MENU_QUERY });

    const menuData = menuRes.data.data.menus.nodes.reduce((res: any, menu: any) => {
      res[menu.slug] = hierarchicalBuilder(menu.menuItems.nodes);
      return res;
    }, {});

    await fs.writeFile(MENUS_FILE, JSON.stringify(menuData));

    console.log("Completed menus");

    const menuRes2 = await api.post('/', { query: Home });

    const homepageData = homepageLinkMapper(menuRes2.data.data);
    await fs.writeFile(Home_File, JSON.stringify(homepageData));

    console.log("Completed homepage");

    const ProductCatagory = await api.post('/', { query: Product_Catagory_Lists });
    await fs.writeFile(Product_Catagory_List, JSON.stringify(ProductCatagory.data.data));

    // Terms and Condition data fetched

    const termsdata = await api.post('/', { query: Terms_Condition });
    await fs.writeFile(Terms_File, JSON.stringify(termsdata.data.data));

    //Footer data fetched
    const footer = await api.post('/', {query: FOOTER_QUERY});
    const footerData = footer.data.data.page;
    footerData.footer_rightcontainer = {
      sections: footerData.footer_rightcontainer.sections.sections,
      secondSections: footerData.footer_rightcontainer.sections.secondSections
    }
    await fs.writeFile(FOOTER_FILE, JSON.stringify(footer.data.data.page));


    // Privacy Policy data fetched

    const privacy = await api.post('/', { query: Privacy_Query });
    await fs.writeFile(Privacy_File, JSON.stringify(privacy.data.data));

    let still_have_a_question = await api.post('/', {query: STILL_HAVE_A_QUESTION_QUERY});
    still_have_a_question = still_have_a_question.data.data.page.stillHaveAQuestion.content;
    await fs.writeFile(STILL_HAVE_A_QUESTION_FILE, JSON.stringify(still_have_a_question));

    //legal consultation
    const legalConsultationData = await api.post('/', {
      query: PRODUCT_DETAILS_QUERY,
      variables: {
        slug: "legal-consultation"
      }
    });
    console.log("Brought legal consultation data");
    let legalConsultation = legalConsultationData.data.data.product;
    legalConsultation = productDataPreProcess(legalConsultation);
    legalConsultation.category = legalConsultationCategory(legalConsultation);
    console.log("Completed legal consultation data");
    await fs.writeFile(LEGAL_CONSULTATION_FILE, JSON.stringify(legalConsultation));


    // product and categories
    const productsCategoriesRes = await api.post('/', { query: PRODUCT_CATEGORY_QUERY });

    const productsCategoriesData = productsCategoriesRes.data.data.productCategories.nodes
        .filter((productsCategory: any) => productsCategory.slug !== "uncategorized")
        .map((productsCategory: any) => {
          productsCategory.products = productsCategory.products.nodes;
          productsCategory.products = productsCategory.products.map((product: any) => {
            // productTypes mapping
            if(product.regularPrice) product.regularPrice = `${priceToInteger(product.regularPrice)}`;
            if(product.salePrice) product.salePrice = `${priceToInteger(product.salePrice)}`;
            product.productTypes = product.productTypes.nodes.length && product.productTypes.nodes[0].name;

            // variations mapping
            product.variations = product.variations && product.variations.nodes.map((item: any) => {
              item.regularPrice = `${priceToInteger(item.regularPrice)}`;
              item.salePrice = `${priceToInteger(item.salePrice)}`;
              item.description = item.description && item.description.split(/\r?\n/);
              return item;
            });

            if(product.variations && product.variations?.length){
              product.regularPrice = product.variations[0].regularPrice;
              product.salePrice = product.variations[0].salePrice;
            }

            // Upsell product mapping
            product.upsell = product.upsell && product.upsell.nodes;
            product.upsell = product.upsell.map((upsell: any) => {
              if(upsell.otherRegularPrice) upsell.otherRegularPrice = `${priceToInteger(upsell.otherRegularPrice)}`;
              if(upsell.otherSalePrice) upsell.otherSalePrice = `${priceToInteger(upsell.otherSalePrice)}`;

              upsell.regularPrice = `${priceToInteger(upsell.regularPrice)}`;
              upsell.salePrice = `${priceToInteger(upsell.salePrice)}`;
              return upsell;
            })

            return product;
          });
          return productsCategory;
        });

    await fs.writeFile(CATEGORIES_FILE, JSON.stringify(productsCategoriesData));
    //
    console.log("Completed Categories files");

    const generateProductData = async (productCategory: any, product: any) => {
      try{
        const productId = product.slug;
        console.log("Generating for product ", productId);
        const productsDetails = await api.post('/', {
          query: PRODUCT_DETAILS_QUERY,
          variables: {
            slug: productId
          }
        });

        let productsData = productsDetails.data.data.product;
        productsData.category = {
          ...productCategory,
          products: []
        };
        // productTypes mapping
        productsData = productDataPreProcess(productsData);
        await fs.writeFile(`${JSON_PATH}/products/${productId}.json`, JSON.stringify(productsData));
        console.log("Fetched data for product ", productId);
      }catch (error) {
        console.log(error);
      }
    }

    for(const productCategory of productsCategoriesData){
      for(const product of productCategory.products){
        await generateProductData(productCategory, product);
      }
    }

    const products = flatMap(productsCategoriesData, ({ products, ...value }) =>
        products.map((product: any) => ({ ...product, category: value }))
    );

    await fs.writeFile(PRODUCTS_FILE, JSON.stringify(products));

    // fetch blog categories
    const blogsCatRes = await api.post('/', { query: BLOG_CATEGORY_QUERY });
    const blogsCat: Array<BlogCategory> = blogsCatRes.data.data.categories.nodes;
    await fs.writeFile(BLOG_CATEGORIES_FILE, JSON.stringify(blogsCat));

    for(const blogCategory of blogsCat){
      const slug = blogCategory.slug;
      const blogCatData = await api.post("/", {
        query: BLOG_POSTS_BY_CATEGORY,
        variables: {
          slug: slug
        }
      });
      const blogPosts = blogCatData.data.data.category.posts.edges.map((blogPost: any) => {
        return{
          ...blogPost.node,
          categories: blogPost.node.categories.edges.map((category: any) => category.node),
          author: blogPost.node.author.node,
          featuredImage: blogPost.node.featuredImage.node,
          tags: blogPost.node.tags.edges.map((tag: any) => tag.node)
        }
      });

      await fs.writeFile(`${BLOG_POST_BY_CATEGORIES_FILE}/${slug}.json`, JSON.stringify(blogPosts));
    }

    // fetch blogs
    const blogRes = await api.post('/', { query: BLOG_QUERY });
    const blogs = blogRes.data.data.posts.nodes.map((blog: any) => {
      blog.tags = blog.tags.nodes;
      blog.categories = blog.categories.nodes;
      blog.author = blog.author && blog.author.node;
      blog.featuredImage = blog.featuredImage && blog.featuredImage.node;
      return blog;
    });
    await fs.writeFile(BLOGS_FILE, JSON.stringify(blogs));

    return "Data fetched";
  } catch (error) {
    throw error;
  }
};

console.log("Staring fetch data");

fetchData()
    .then(console.log)
    .catch(console.log);
