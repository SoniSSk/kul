import Link from 'next/link';
import { FC, useState, useEffect } from 'react';
import backendApi from '../../api/backendApi';
import Category from '../../dtos/Category.dto';
import Button from '../../styled/Button';
import Text from '../../styled/Text';
import CheckBox from '../../components/CheckBox';
import { Row, Col, Tabs, Tab, Nav, Badge } from 'react-bootstrap';
import { Get_Signed_Url } from '../../redux/cart/cart.actions';
import {
  DashTabs,
  SubDashTabs,
  Subtabcontent,
} from './DashboardBusinessTabs.styled';
import UploadDocs from '../UploadDocs';
import Spacer from '../../styled/Spacer';
import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from "../../redux/store";

const customspan: any = {
  display: 'inline-flex',
  fontSize: '14px',
  fontWeight: 'normal',
};

interface DashboardBusinessTabsProps {
  categories: Category[] | null;
}

const DashboardBusinessTabs: FC<DashboardBusinessTabsProps> = ({
  categories,
}) => {
  const dispatch = useDispatch();
  // const orderData = useSelector((store: RootState) => store.currentOrders);

  const [files, setFiles] = useState<Array<any>>([]);

  const [url, setUrl] = useState<any>([]);

  useEffect(() => {
    files.map((el) => {
      dispatch(
        Get_Signed_Url(el.file.path, setUrl, url, () => {
          console.log('Routing = ', url);
        })
      );
    });
  }, [files.length]);

  //   const newdata = url.map((el,i) => {
  //     return {
  //       document_url:url[i],
  //       document_name: files[i]?.inputName,
  //       _id:1
  //     }
  //   })

  //   const CallbackData = {
  //     assignedUser: 'loggedInUserData',
  //     time_slot: 'timeSlotdata',
  //     _id: 1
  //   }

  // const submitForm = () => {
  //       dispatch(Upload_docs_Url(newdata,CallbackData,'',() => {
  //         console.log("data uploaded");

  //       }))
  // }

  if (!categories || !categories.length) return null;
  return (
    <DashTabs>
      <Tab.Container id="dashtabs" defaultActiveKey={categories[0].id}>
        <Row>
          <Col md={12} style={{ padding: '0px' }}>
            <Nav variant="pills" justify className="flex-row">
              {categories.map((category) => (
                <Nav.Item>
                  <Nav.Link eventKey={category.id}>
                    <Text color="black" fontSize="lg">
                      {category.name}
                    </Text>
                    <Text color="secondary" fontSize="sm">
                      Legal Consultation
                    </Text>
                  </Nav.Link>
                </Nav.Item>
              ))}
            </Nav>
          </Col>
          <Col md={12} style={{ padding: '0px' }}>
            <Tab.Content>
              {categories.map((category) => (
                <Tab.Pane eventKey={category.id}>
                  <SubDashTabs>
                    <Tab.Container id="subtabs" defaultActiveKey="one">
                      <Row>
                        <Col md={12} style={{ padding: '0px 30px' }}>
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
                              <Subtabcontent>
                                <Row>
                                  <Col md={6}>
                                    <div className="align_cont">
                                      <Text fontSize="md" color="black">
                                        Order Id:
                                        <span style={customspan}>9876543</span>
                                      </Text>
                                    </div>
                                    <div className="othercont">
                                      <Text fontSize="sm" color="black">
                                        Purchased on: 12 Mar 20, 2 Product
                                        purchased
                                      </Text>
                                      <Text fontSize="xs" color="black">
                                        Case Assigned to
                                      </Text>
                                      <Text fontSize="md" color="black">
                                        Amit Singh, Business Expert
                                      </Text>
                                    </div>
                                  </Col>
                                  <Col md={6}>
                                    <div className="dottedbox">
                                      <div className="align_cont flex-row">
                                        <UploadDocs
                                          setFiles={setFiles}
                                          files={files}
                                        />
                                        <Spacer
                                          direction="vertical"
                                          size={20}
                                        />
                                      </div>
                                      <Spacer direction="vertical" size={15} />
                                      <Button
                                        size="md"
                                        rounded
                                        outline
                                        style={{ color: '#396AE8' }}
                                      >
                                        Upload Documents
                                        <img
                                          src="/icons/Upload-Documents.svg"
                                          alt="upload document"
                                          width="20"
                                        />
                                      </Button>
                                    </div>
                                  </Col>
                                </Row>

                                <Row className="white_bg">
                                  <Col md={6}>
                                    <div className="compny_det float-none">
                                      <Text fontSize="md" color="black">
                                        private limited company
                                      </Text>
                                      <Badge variant="warning">
                                        Awaiting Documents
                                      </Badge>
                                      <Spacer direction="vertical" size={12} />
                                      <div className="docs_download">
                                        <Text
                                          fontSize="md"
                                          color="primary"
                                          className="dropdown"
                                        >
                                          <img
                                            src="/icons/plus-cicle.svg"
                                            alt="download"
                                            width="20"
                                          />
                                          4 Documents uploaded by User
                                        </Text>
                                        <div className="dropdown_content">
                                          <ul>
                                            <li>
                                              <a href="#">
                                                <img
                                                  src="/icons/download_icon.svg"
                                                  alt="Continue"
                                                  width="25"
                                                />
                                                &nbsp; Download
                                              </a>
                                              <Spacer
                                                direction="vertical"
                                                size={12}
                                              />
                                            </li>
                                            <li>
                                              <CheckBox name="Name Approval Certificate">
                                                <Text inline>
                                                  Name Approval Certificate
                                                </Text>
                                              </CheckBox>
                                            </li>
                                            <li>
                                              <CheckBox name="Name Approval Certificate">
                                                <Text inline>
                                                  Name Approval Certificate
                                                </Text>
                                              </CheckBox>
                                            </li>
                                            <li>
                                              <CheckBox name="Name Approval Certificate">
                                                <Text inline>
                                                  Name Approval Certificate
                                                </Text>
                                              </CheckBox>
                                            </li>
                                          </ul>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="compny_det float-none">
                                      <Text fontSize="md" color="black">
                                        One person company
                                      </Text>
                                      <Badge variant="secondary">Pending</Badge>
                                    </div>
                                    <div className="w100 d-flex">
                                      <Link href="#">
                                        <a>
                                          <Button
                                            size="lg"
                                            rounded
                                            className="arrow_btn"
                                          >
                                            <img
                                              src="/icons/call_icon.svg"
                                              alt="call"
                                              width="20"
                                            />
                                            Call
                                          </Button>
                                        </a>
                                      </Link>
                                    </div>
                                  </Col>
                                  <Col md={6}>
                                    <div>
                                      <div className="docs_download">
                                        <div className="dropdown_content">
                                          <ul className="docs_list">
                                            <li>
                                              <a href="#">
                                                <img
                                                  src="/icons/download_icon.svg"
                                                  alt="Continue"
                                                  width="25"
                                                />
                                                &nbsp; Download
                                              </a>
                                              <Spacer
                                                direction="vertical"
                                                size={12}
                                              />
                                            </li>
                                            <li>
                                              <CheckBox name="Name Approval Certificate">
                                                <Text inline>
                                                  <a href={url}>File Url</a>
                                                </Text>
                                              </CheckBox>
                                            </li>
                                          </ul>
                                        </div>
                                      </div>
                                    </div>
                                  </Col>
                                </Row>
                              </Subtabcontent>
                            </Tab.Pane>
                            <Tab.Pane eventKey="two">kumar</Tab.Pane>
                          </Tab.Content>
                        </Col>
                      </Row>
                    </Tab.Container>
                  </SubDashTabs>
                </Tab.Pane>
              ))}
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </DashTabs>
  );
};

export default DashboardBusinessTabs;
