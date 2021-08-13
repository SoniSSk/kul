import React, { FC, useState, useEffect } from "react";
import { GetStaticProps } from "next";
import { promises as fs } from "fs";
import Link from "next/link";
import Head from "next/head";
import Dashbox from "../components/DashBox";
import { DashTabs, SubDashTabs, Subtabcontent } from "../styled/StyledTabs";
import {
  CATEGORIES_FILE,
  MENUS_FILE,
  Product_Catagory_List,
} from "../constants/file-paths";
import Menus from "../dtos/Menus.dto";
import DashboardLayout from "../components/DashboardLayout";
import CorneredBox from "../components/CorneredBox";
import Text from "../styled/Text";
import Category from "../dtos/Category.dto";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import { Container, Row, Col, Tabs, Tab, Nav, Badge } from "react-bootstrap";
import backendApi from "../api/backendApi";
import {
  ProductStatusCount,
  PurchaseProductDetails,
} from "../constants/queries/order";
import DashboardTabs from "../components/dashboardTabs";
import Invoice from "../components/Invoice";
import { useRouter } from "next/router";
import { infoToast } from "../utils/toasts";
interface DashBoardProps {
  menus: Menus;
  categories: Category[];
}
const customspan: any = {
  display: "inline-flex",
  fontSize: "14px",
  fontWeight: "normal",
};

const BusinessTabs: FC<any> = ({
  ProductCatagoriesList,
  currentorder,
  loginuser,
}) => {
  const product_list = ProductCatagoriesList.productCategories.edges;
  const [productStatusData, setProductStatusData] = useState<any>([]);
  const [purchaseProductData, setPurchaseProductData] = useState<any>();


  const getCountForCategory = async (id: any) => {
    const requirmentinfoUrl = await backendApi.post("/", {
      query: ProductStatusCount,
      variables: {
        catagoryid: id,
        user: loginuser._id,
      },
    });
    return requirmentinfoUrl.data.data.getProductStatusCount;
  };

  const PurchaseProduct = async (id: any) => {
    const data = await backendApi.post("/", {
      query: PurchaseProductDetails,
      variables: {
        category_id: id,
        user: loginuser._id,
      },
    });
    if (data.data.data) return data.data.data.getOrderByCategory;
    else return [];
  };
  useEffect(() => {
    console.log(product_list);
    async function populateCounts() {
      try {
        const promises = product_list.map((categoryItemId: any) => {
          return getCountForCategory(categoryItemId.node.id);
        });
        const data = await Promise.all(promises);
        setProductStatusData(data);
      } catch (e) {
        console.log(e);
      }
    }

    populateCounts();
  }, [product_list]);

  const populatePurchaseOrders = async () => {
    try {
      if (product_list && product_list.length) {
        const promises = product_list.map((categoryItem: any) => {
          return PurchaseProduct(categoryItem.node.id);
        });
        const allPurchaseData = await Promise.all(promises);
        setPurchaseProductData(allPurchaseData);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const timer = setInterval(populatePurchaseOrders, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <DashTabs>
      <Tab.Container id="dashtabs" defaultActiveKey={0}>
        <Row>
          <Col md={12} style={{ padding: "0px" }}>
            <Nav variant="pills" justify className="flex-row">
              {product_list.map((list: any, i: number) => {
                return (
                  <>
                    {list.node.name !== "Uncategorized" &&
                    productStatusData[i]?.incomplete ? (
                    // || productStatusData[i]?.complete
                      <Nav.Item key={i} >
                        <Nav.Link eventKey={i} className="m-0">
                          <Text color="black" fontSize="lg">
                            {list.node.name}
                          </Text>
                          <Text color="secondary" fontSize="sm">
                            {productStatusData[i]
                              ? productStatusData[i].incomplete
                              : "0"}{" "}
                            Services in Process
                          </Text>
                        </Nav.Link>
                      </Nav.Item>
                    ) : null}
                  </>
                );
              })}
            </Nav>
          </Col>
          <Col md={12} style={{ padding: "0px" }}>
            <Tab.Content>
              {product_list.map((list: any, index: number) => {
                return (
                  <Tab.Pane eventKey={index}>
                    <SubDashTabs>
                      <Tab.Container
                        id={`subtabs-${index}`}
                        defaultActiveKey="one"
                      >
                        <Row>
                          <Col md={12} style={{ padding: "0px 30px" }}>
                            <Nav variant="pills" className="flex-row">
                              <Nav.Item>
                                <Nav.Link eventKey="one">
                                  <Text color="black" fontSize="lg">
                                    Ongoing Services
                                  </Text>
                                </Nav.Link>
                              </Nav.Item>
                              <Nav.Item>
                                <Nav.Link eventKey="two">
                                  <Text color="black" fontSize="lg">
                                    Completed
                                  </Text>
                                </Nav.Link>
                              </Nav.Item>
                            </Nav>
                          </Col>
                          <Col md={12}>
                            <Tab.Content>
                              <Tab.Pane eventKey="one">
                                {productStatusData[index] &&
                                productStatusData[index].incomplete != 0 &&
                                purchaseProductData?.length &&
                                purchaseProductData[index].length ? (
                                  <Row>
                                    {purchaseProductData[index]
                                      .filter(
                                        (orderPlaced: any) =>
                                          orderPlaced.status !== "COMPLETED"
                                      )
                                      .map((orderPlaced: any) => (
                                        <DashboardTabs
                                          key={`tab-${orderPlaced._id}`}
                                          data={orderPlaced}
                                          loginuser={loginuser}
                                        />
                                      ))}
                                  </Row>
                                ) : (
                                  <DashboardTabs />
                                )}
                              </Tab.Pane>
                              <Tab.Pane eventKey="two">
                                {productStatusData[index] &&
                                productStatusData[index].complete != 0 &&
                                purchaseProductData?.length &&
                                purchaseProductData[index].length ? (
                                  <Row>
                                    {purchaseProductData[index]
                                      .filter(
                                        (orderPlaced: any) =>
                                          orderPlaced.status === "COMPLETED"
                                      )
                                      .map((orderPlaced: any) => (
                                        <DashboardTabs
                                          key={`tab-${orderPlaced._id}`}
                                          data={orderPlaced}
                                          loginuser={loginuser}
                                        />
                                      ))}
                                  </Row>
                                ) : (
                                  <DashboardTabs />
                                )}
                              </Tab.Pane>
                            </Tab.Content>
                          </Col>
                        </Row>
                      </Tab.Container>
                    </SubDashTabs>
                  </Tab.Pane>
                );
              })}
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </DashTabs>
  );
};

const Dashboard: FC<any> = ({ menus, ProductCatagoriesList }) => {
  const [catagorylistID, setCatagoryListID] = useState<any>([]);
  const loginuser = useSelector((store: RootState) => store.loggedInUser);
  const currentorder = useSelector((store: RootState) => store.currentOrders);
  const router = useRouter();
  console.log(ProductCatagoriesList);
  useEffect(() => {
    console.log("Login user is", loginuser);
    if (!loginuser?._id) {
      router
        .push("/")
        .then(() =>
          infoToast("You cannot access the dashboard without logging in.")
        );
    }
    const newstate = ProductCatagoriesList?.productCategories?.edges?.map(
      (el: any, i: number) => {
        return el.node.id;
      }
    );
    setCatagoryListID(newstate);
  }, []);

  return loginuser?._id ? (
    <DashboardLayout menus={menus} headerBgColorBack="skyBlue">
      <Head>
        <title>Dashboard</title>
      </Head>

      <CorneredBox
        bgColor="white"
        bgColorBack="secondary"
        paddingBottom="70px"
        paddingTop="70px"
      >
        <Container>
          <Row>
            <Col className="mb-5">
              <Text fontSize="md" color="black">
                Welcome
              </Text>
              <Text fontSize="xl" color="black">
                <b>{loginuser.name}</b>
              </Text>
            </Col>
          </Row>
          <Row>
            <Col md={9} xs={12}>
              {catagorylistID?.length && (
                <BusinessTabs
                  loginuser={loginuser}
                  currentorder={currentorder}
                  ProductCatagoriesList={ProductCatagoriesList}
                />
              )}
            </Col>
            <Col md={3} xs={12}></Col>
          </Row>
        </Container>
      </CorneredBox>
    </DashboardLayout>
  ) : null;
};

export const getStaticProps: GetStaticProps = async () => {
  // fetch menus
  const menuData = await fs.readFile(MENUS_FILE, { encoding: "utf-8" });
  const menus: Menus = JSON.parse(menuData);

  const productCatagories = await fs.readFile(Product_Catagory_List, {
    encoding: "utf-8",
  });
  const ProductCatagoriesList = JSON.parse(productCatagories);

  // fetch categories
  const categoriesData = await fs.readFile(CATEGORIES_FILE, {
    encoding: "utf-8",
  });
  const categories: Category[] = JSON.parse(categoriesData);

  return {
    props: {
      menus,
      categories,
      ProductCatagoriesList,
    },
  };
};

export default Dashboard;
