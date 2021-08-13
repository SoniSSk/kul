import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-size: 14px;
    scroll-behavior: smooth;
  }

  img {
    max-width: 100%;
  }
  
  a {
    color: #4c95d3;
  }

  a:hover {
    color: #396ae8;
    text-decoration: none;
    cursor: pointer;
  }
  
  .circle {
    border-radius: 50% !important;
  }

  @media (min-width: 1200px) {
    .container, .container-lg, .container-md, .container-sm, .container-xl {
      max-width: 1180px;
    }
  }

  @media (min-width: 1300px) {
    .container, .container-lg, .container-md, .container-sm, .container-xl {
      max-width: 1290px;
    }
  }
  .py-md-6 {
    @media (min-width: 768px) {
      padding-top: 80px !important;
      padding-bottom: 80px !important;
    }
  }
  /* *{
    border: 2px solid red;
  } */
  .image-gray{
    filter: contrast(0);
  }
  .banner_img_s1{
    background: url('/images/image_mask.png') no-repeat center;
    background-size: contain;
    img{
      display: block;
      box-shadow: 0px 4px 44px rgba(0, 0, 0, 0.25);
      width: 100%;
      max-width: 421px;
      border-radius: 18px;
      margin: auto;
      object-fit: cover;
      object-position: center;
    }
    @media (max-width: 767px){
      background-size: cover;
      margin-bottom: 40px;
      img{
        transform: skew(4deg, 1deg) rotate(7deg); 
        width: 80%;
        height: 250px;
      }
    }
    @media (min-width: 768px) {
      img{
        height: 463px;
      }
    }
  }
  .img_circle_150{
    width: 150px;
    height: 150px;
    border-radius: 50%;
    object-fit: cover;
  }
  .testimonial_card_img{
    width: 65px;
    height: 65px;
    border-radius: 50%;
    object-fit: cover;
  }
  .mh-auto{
    max-height:inherit!important;
  }
  .text-bg-tinted{
    background:#DAEFFD;
    padding: 5px 10px;
    border-radius: 20px;
    @media (max-width: 767px){
      padding: 2px 7px;
    }
  }
  .text-bg-tinted2{
    background:#DAEFFD;
    padding: 5px 10px;
    border-radius: 4px;
  }
  @media (max-width: 767px){
    .ao-form-check{
      .form-check{
        width: 100%;
      }
      label{
        width: 100%;
      }
    }

  }
  .inheritmw{
    max-width: inherit!important;
  }
  .borderedSelection{
    border: 1px solid #DBDDE6!important;
  }
  /* .loginFrom */
  .jntpills{
    padding: 7px 10px!important;
  }
  .jon_abtns{
    border-bottom: 1px solid #E1E1E1;
    cursor: pointer;
    padding: 15px;
    height: 60px;
    padding-left: 30px;
    display: flex;
    align-items: center;
    p{
      margin-bottom:0;
    }
  }
  .home_testimonials{
    .keen-slider{
      .keen-slider__slide{
        height:100%!important;
      }
    }
  }
  .header_top{
    box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.25);
  }
  .home_matrix_customBg{
    background: #FCFDFF;
  }
  .pb40{
    padding-bottom: 40px;
  }
  .mb40{
    margin-bottom: 40px;
  }
  .pb60{
    padding-bottom: 60px;
  }
  /* .heading-color{
    color:#091E42;
  } */
  .color-inherit{
    color: inherit!important;
  }
  .blog-content{
    font-size: 16px;
  }
  .breadcrumb-item a{
    color: inherit;
  }
`;

export default GlobalStyle;
