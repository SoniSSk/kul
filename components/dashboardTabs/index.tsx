import React, {FC, useEffect, useState} from "react";
import {Subtabcontent} from "../../styled/StyledTabs";
import {Col, Row} from "react-bootstrap";
import Text from "../../styled/Text";
import UploadModal from "../UploadModal";
import Button from "../../styled/Button";
import Link from "next/link";
import ScheduleCall from "../ScheduleCall/ScheduleCall";
import DocumentDropdown from "../DocumentDropdown/DocumentDropdown";
import OrderReview from "../OrderReview/OrderReview";
import backendApi from "../../api/backendApi";
import {MarkAsCompleted} from "../../constants/queries/order";
import {errorToast, successToast} from "../../utils/toasts";
import {isEqual} from "lodash";
import Invoice from "../Invoice";
import useResponsiveDevice from "../useResponsiveDevice";
import openWhatsapp from "../../utils/openWhatsapp";
import {DeviceTypes} from "../../constants/deviceTypes";

const comparator = (prevProps: any, nextProps: any) => {
  return isEqual(prevProps, nextProps);
};

function getProductStatusColor(status: string) {
  switch (status) {
    case "COMPLETED":
      return "#06AFB0";
    case "DOCS_AWAITED":
      return "#2723A7";
    case "IN_PROGRESS":
      return "#FF971A";
    case "PLACED":
      return "gray";
    case "TASK_ABORTED":
      return "#E50000";
    default:
      return "gray";
  }
}

const DashboardTabs: FC<any> = React.memo(({ data, loginuser }) => {
  const { isMobile } = useResponsiveDevice();
  const [isOpen, setisOpen] = useState<Boolean>(false);

  const [uploadedDocuments, setUploadedDocuments] = useState([]);

  const [lawyerDeliverables, setLawyerDeliverables] = useState([]);

  const [showDropdown, setShowDropdown] = useState(false);

  const [showConfirmClosure, setShowConfirmClosure] = useState(false);

  useEffect(
    function () {
      if (data) {
        const completedProducts = data?.products.filter(
          (product: any) => product.status === "COMPLETED"
        );
        if (completedProducts.length === data.products.length) {
          setShowConfirmClosure(true);
        }
      }
    },
    [data]
  );

  useEffect(
    function () {
      if (data) {
        const documentData = data.required_documents.map((doc: any) => {
          return {
            name: doc.document_name,
            url: doc.document_url,
            status: doc.document_status,
            id: doc._id,
          };
        });
        setUploadedDocuments(documentData);

        const lawyerUploadedDocs = data.products.map((product: any) => {
          return product.deliverables.map((deliverable: any) => {
            return {
              name: deliverable.deliverable_name,
              status: deliverable.deliverable_status,
              url: deliverable.deliverable_url,
              id: deliverable._id,
            };
          });
        });

        setLawyerDeliverables(lawyerUploadedDocs);
      }
    },
    [data]
  );

  const completedOrder = async () => {
    try {
      await backendApi.post("/", {
        query: MarkAsCompleted,
        variables: {
          order_id: data._id,
          status: "COMPLETED",
        },
      });
      successToast("Successfully marked as completed");
    } catch (e) {
      errorToast(e.message);
    }
  };

  const NotCompletedButtons = () => {
    return (
      <>
        <Link href="#">
          <a>
            <Button size="md" rounded className="arrow_btn mr-2" onClick={() => {
              openWhatsapp(isMobile ? DeviceTypes.MOBILE : DeviceTypes.DESKTOP);
            }}>
              <img
                src="/icons/mail_icon.svg"
                alt="send message"
                width="20"
                className="mr-2"
              />
              Send Message
            </Button>
          </a>
        </Link>
        <Button
          size="md"
          onClick={() => setisOpen(true)}
          rounded
          className="arrow_btn"
        >
          <img
            src="/icons/call_icon.svg"
            alt="call"
            className="mr-2"
            width="20"
          />
          Call
        </Button>
        {isOpen ? <ScheduleCall setIsOpen={setisOpen} /> : <> </>}
      </>
    );
  };
  console.log("Rendering", data);
  return (
    <>
      {data ? (
        <Subtabcontent>
          <Row>
            <Col md={8} className="pr-md-0">
              <div>
                <div className="d-md-flex">
                  <div className="d-flex flex-wrap">
                    <Text fontSize="md" color="black">
                      Order Id:
                    </Text>
                    <Text fontSize="md" className="ml-1 mr-md-2" color="gray">
                      {data?._id}
                    </Text>
                  </div>
                  <Invoice data={data} loggedInUser={loginuser} />
                </div>
              </div>
              <div className="othercont">
                <Text fontSize="sm" color="black">
                  Purchased on:
                  {new Date(data?.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                  , {data?.products.length} Product purchased
                </Text>
                <Text fontSize="xs" color="black">
                  Case Assigned to
                </Text>
                <Text fontSize="md" color="black">
                  {data && data.assigned_user && data?.assigned_user !== null
                    ? data?.assigned_user
                    : "Not Placed"}
                </Text>
              </div>
            </Col>
            {data && (
              <Col md={4} className="pl-md-0">
                <div className="dottedbox px-1 pb-2">
                  <div className="text-center">
                    <Button
                      size="md"
                      rounded
                      outline={true}
                      backgroundColor={"white"}
                      style={{
                        borderColor: "#396AE8",
                        color: "#396AE8",
                      }}
                      onClick={() => setShowDropdown(true)}
                      className="arrow_btn"
                    >
                      Upload Documents
                    </Button>
                    <div className="text-center mt-2">
                      <DocumentDropdown
                        fontSize={"md"}
                        text={`${uploadedDocuments.length} Documents added`}
                        dropdownItems={uploadedDocuments}
                        orderId={data._id}
                      />
                    </div>
                    <UploadModal
                      orderId={data?._id}
                      show={showDropdown}
                      setShow={setShowDropdown}
                    />
                  </div>
                </div>
              </Col>
            )}
          </Row>
          <hr />
          {data && (
            <Row className="white_bg">
              <Col md={12}>
                <div
                  key={`${data._id}-255}`}
                  className="d-flex justify-content-center flex-wrap"
                >
                  {data.products.map((el: any, index: number) => (
                    <div
                      className="compny_det"
                      style={{
                        maxWidth: "300px",
                        width: "100%",
                      }}
                      key={index * 2000}
                    >
                      <div className="row">
                        <div className="col-7">
                          <Text fontSize="sm" color="black" weight="bold">
                            {el.product_name}
                          </Text>
                        </div>

                        <div className="col-5">
                          <Text
                            fontSize="xxs"
                            style={{
                              background: getProductStatusColor(el.status),
                              color: "white",
                              textAlign: "center",
                            }}
                          >
                            {el.status}
                          </Text>
                        </div>
                      </div>

                      {el.deliverables.length ? (
                        <Text fontSize="sm" color="primary">
                          {el.deliverables.length === 1
                            ? `${el.deliverables.length} document `
                            : `${el.deliverables.length} documents`}
                          uploaded by Lawyer
                        </Text>
                      ) : (
                        <></>
                      )}

                      <DocumentDropdown
                        dropdownItems={lawyerDeliverables[index]}
                        fontSize={"xs"}
                        text={"View Deliverables"}
                        orderId={data._id}
                      />
                    </div>
                  ))}
                </div>
              </Col>
              <Col md={12} className="text-center mt-3">
                {data.status !== "COMPLETED" ? (
                  showConfirmClosure ? (
                    <div className="row" key="completed-btn-container">
                      <div className="col-6 col-md-3">
                        <Button
                          size={"md"}
                          rounded={true}
                          backgroundColor={"primary"}
                          onClick={completedOrder}
                          disabled={data === undefined}
                        >
                          Confirm Closure
                        </Button>
                      </div>
                      <div className="col-12 col-md-6">
                        <OrderReview orderId={data._id} />
                      </div>
                    </div>
                  ) : (
                    <NotCompletedButtons />
                  )
                ) : null}
              </Col>
            </Row>
          )}
        </Subtabcontent>
      ) : (
        <></>
      )}
    </>
  );
}, comparator);

export default DashboardTabs;
