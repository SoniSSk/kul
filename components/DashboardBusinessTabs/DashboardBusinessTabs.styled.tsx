import styled from "styled-components";

export const DashTabs = styled.div`
  width: 100%;
  display: inline-block;
  border-radius: 20px;
  .nav-justified .nav-item,
  .nav-justified > .nav-link {
    text-align: left;
  }
  .nav-pills .nav-link.active,
  .nav-pills .show > .nav-link {
    background: #f1f3f6;
   
    }
    .nav-pills .nav-link {
      border: 1px solid #f0f2f5;
      box-sizing: border-box;
      font-size: 16px;
      margin: 5px;
      margin-bottom: 0;
      border-bottom: 0;
      border-radius: 5px 5px 0px 0px;
    }
    .nav-pills .nav-link:first-child {
      margin-left: 0;
    }
    .tab-content{
      background: linear-gradient(
        180deg,
        #f0f2f5 0%,
        rgba(240, 242, 245, 0) 100%
      );
      min-height:300px;  
    }
  }
`;

export const SubDashTabs = styled.div`
  width: 100%;
  display: inline-block;
  border-radius: 20px;
  .nav-justified .nav-item,
  .nav-justified > .nav-link {
    text-align: left;
  }
  .nav-pills .nav-link.active,
  .nav-pills .show > .nav-link {
    border-bottom: 3px solid #396ae8;
    }
    .nav{
      border-bottom: 1px solid #E3E3E3;
    }
    .nav-pills .nav-link {
      border: 1px solid #f0f2f5;
      box-sizing: border-box;
      font-size: 16px;
      margin: 5px;
      margin-bottom: 0;
    }
  }
`;

export const Subtabcontent = styled.div`
  background: linear-gradient(180deg, #f0f2f5 0%, rgba(240, 242, 245, 0) 100%);
  border: 1px solid #e3e3e3;
  box-sizing: border-box;
  box-shadow: inset 0px 1px 0px #ebecf0;
  border-radius: 20px;
  padding: 20px;
  width: calc(100% - 40px);
  margin: 0 auto;
  margin-top: 28px;
  .left_aligned {
    width: 100%;
    display: inline-flex;
    justify-content: left;
    align-items: center;
    .badge {
      margin-left: 10px;
    }
  }
  .align_cont {
    width: 100%;
    display: inline-flex;
    justify-content: space-between;
    align-items: center;
    a {
      color: inherit;
    }
    p {
      margin: 0;
    }
  }
  .dottedbox {
    border: 1px dashed #bcc4d3;
    box-sizing: border-box;
    border-radius: 9px;
    padding: 20px;
    margin-bottom: 20px;
  }
  .white_bg {
    background: #fff;
    margin: 0px -20px;
    padding: 20px 0px;
    .float-right {
      color: red;
    }
  }
  .othercont {
    p:first-child {
      font-family: Manrope;
      font-style: normal;
      font-weight: 300;
      font-size: 14px;
      color: #8993a4;
    }
    p:nth-child(2) {
      font-size: 10px;
      color: #8993a4;
      margin-top: 10px;
    }
  }
  .docs_list {
    list-style: none;
  }
  .compny_det {
    float: left;
    padding: 10px;
    background: #f1f9fe;
    border-radius: 9px;
    margin-right: 10px;
    margin-bottom: 10px;
    font-size: 16px;
    min-width: 186px;
    min-height: 77px;
    .docs_download {
      position: relative;
      &:hover {
        .dropdown_content {
          display: block;
        }
      }
    }
    .dropdown_content {
      position: absolute;
      background: white;
      display: none;
      left: 0;
      top: 12px;
      right: 0;
      z-index: 999;
      padding: 10px 10px;
      border-radius: 4px;
      box-shadow: 0px 3px 8px rgba(31, 92, 163, 0.2);
      ul {
        margin: 0;
        list-style: none;
        padding: 0;
      }
    }
    p:nth-child(2) {
      font-weight: 600;
      font-size: 14px;
      line-height: 20px;
      color: #2b79d4;
    }
  }
`;
