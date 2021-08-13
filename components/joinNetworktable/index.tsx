import React, { useState } from "react";
import Text from "../../styled/Text";
import Button from "../../styled/Button";
import Spacer from "../../styled/Spacer";
import useResponsiveDevice from "../useResponsiveDevice";
import { PillTabNav } from "./joinNetworkTable.styled";

const CONSULTATION_DATA = [
  {
    title: "Personal Consultation",
    data: [
      "Divorce & Child Custody",
      "Family & Matrimonial",
      "Property & Real Estate",
      "Will",
      "Criminal",
      "Consumer Protection",
      "Cheque Bonus & Money Recovery",
      "Cyber Crime",
      "Labour & Employment",
      "Legal Notice",
    ],
  },
  {
    title: "Business Consultation",
    data: [
      "Law & Regulation",
      "Business Setup & Registrations",
      "Intellectual Property",
      "Startup Investments",
      "Contracts & Agreements",
    ],
  },
];

const LEGAL_DOCUMENTS_DATA = [
  {
    title: "HR & Labour Compliance",
    data: [
      "Employment Contract",
      "Consultancy Agreement",
      "Employment Bond",
      "ESOP Policy",
      "POSH Policy",
      "Maternity Policy",
      "Whistle Blower Policy",
    ],
  },
  {
    title: "Business Contracts",
    data: [
      "Non-Disclosure Agreement",
      "Non-Complete Agreement",
      "Service Agreement",
      "Vendor Agreement",
      "Franchise Agreement",
      "Distributor Agreement",
      "Memorandum of Understanding",
      "Joint Venture Agreement",
    ],
  },
  {
    title: "Property & Real Estate",
    data: [
      "Lease Deed / Rent Agreement",
      "Termination Notice for Lease Deed / Rent Agreement",
      "Tenant Eviction Notice",
      "Power of Attorney",
      "Sale Deed",
      "Will",
      "Gift Deed",
      "Partition Deed",
      "Relinquishment Deed",
      "Succession Certificate",
    ],
  },
  {
    title: "Website & Digital Policies",
    data: [
      "Terms of Use",
      "Privacy Policy",
      "Disclaimer",
      "Commercial Terms & Refund Policy",
    ],
  },
  {
    title: "Startup & Entrepreneurship",
    data: [
      "Term Sheet",
      "Founders Agreement",
      "Partnership Deed",
      "Share Holders Agreement",
      "Join Venture Agreement",
      "Valuation Report",
    ],
  },
  {
    title: "Money Recovery",
    data: ["Legal Notice for Recovery", "Cheque Bounce Notice"],
  },
];

const BUSINESS_REGISTRATION_DATA = [
  {
    title: "Registration & Licenses",
    data: [
      "Startup India Registration",
      "GST Registration",
      "ESI Registration",
      "Professional Tax Registration",
      "Provident Fund (PF) Registration",
      "MMSE/SSI Registration",
      "Trade License",
    ],
  },
  {
    title: "Company Incorporation",
    data: [
      "Private Limited Company",
      "One Person Company",
      "Limited Liability Partnership",
      "Partnership Firm",
    ],
  },
  {
    title: "ROC Compliance",
    data: [
      "Appointment of Director",
      "Removal of Director",
      "Increase in Authorized Capital",
      "Allotment of Shares",
      "Closing of Pvt. Ltd. Company",
      "Changing of Object Clause/Activity",
      "Shifting of Registered office",
      "Change of Name of Company",
      "Closing of Limited Liability",
      "Partnership",
    ],
  },
  {
    title: "Trademark & Copyrights",
    data: [
      "Trademark Registration",
      "Trademark Search",
      "Trademark Renewal",
      "Trademark Assignment",
      "Respond to TM Objection",
      "Copyright Registration",
      "Patent Search",
      "Provisional Application",
      "Permanent Patent",
    ],
  },
];

const SectionData = ({ data }: { data: Array<any> }) => {
  const { isMobile } = useResponsiveDevice();
  return (
    <div className={`p-md-3 py-2`}>
      {data.map((dataItem: any, index: number) => (
        <div>
          <Text color="lebel2" weight="bold" className={index > 0 ? "mt-3" :""} >
            {dataItem.title}
          </Text>
          <Spacer direction="vertical" size={10} />
          {dataItem.data.map((label: string) => (
            <Button
              color="black"
              backgroundColor="lightGray"
              size="md"
              className={`mb-3 mr-3 borderedSelection jntpills`}
              rounded
              style={{
                cursor: "unset"
              }}
              // outline
            >
              {label}
            </Button>
          ))}
        </div>
      ))}
    </div>
  );
};

const JoinOurNetworkTable = () => {
  const { isMobile } = useResponsiveDevice();
  const [data, setData] = useState<number>(0);

  return (
    <>
      <div className="container">
        <div style={{ textAlign: "center" }}>
          <Text fontSize="xxyl" weight="bold">
            Choose your areas of expertise and Join ezyLegal’s professional network
          </Text>
        </div>
      </div>
      <Spacer direction="vertical" size={60} />
      {isMobile && (
        <PillTabNav>
          <div className={data == 0 ? "active" : ""} onClick={() => setData(0)}>
            <Text>Legal Consultation</Text>
          </div>
          <div className={data == 1 ? "active" : ""} onClick={() => setData(1)}>
            <Text>Legal Documents</Text>
          </div>
          <div className={data == 2 ? "active" : ""} onClick={() => setData(2)}>
            <Text>Business Registration</Text>
          </div>
        </PillTabNav>
      )}
      <div className="container">
        <div
          className={isMobile ? "flex-column mt-4" : ""}
          style={{
            display: "flex",
            boxShadow: "0px 0px 12px rgba(31, 92, 163, 0.2)",
            borderRadius: isMobile ? "10px" : "inherit",
          }}
        >
          {!isMobile && (
            <div
              className="col-md-3"
              style={{
                borderRadius: "12px 0 0px 12px",
                borderRight: "1px solid #E1E1E1",
                padding: "0px",
              }}
            >
              <div
                style={{
                  background: data == 0 ? "#303765" : "",
                }}
                onClick={() => setData(0)}
                className="jon_abtns"
              >
                <Text color={data == 0 ? "white" : "black"}>
                  Legal Consultation
                </Text>
              </div>
              <div
                style={{
                  background: data == 1 ? "#303765" : "",
                }}
                className="jon_abtns"
                onClick={() => setData(1)}
              >
                <Text color={data == 1 ? "white" : "black"}>
                  Legal Documents
                </Text>
              </div>
              <div
                style={{
                  background: data == 2 ? "#303765" : "",
                }}
                className="jon_abtns"
                onClick={() => setData(2)}
              >
                <Text color={data == 2 ? "white" : "black"}>
                  Business Registration
                </Text>
              </div>
            </div>
          )}

          <div
            className="col-md-9"
            style={{ borderRadius: "0px 12px 12px 0px" }}
          >
            {data == 0 && <SectionData data={CONSULTATION_DATA} />}
            {data == 1 && <SectionData data={LEGAL_DOCUMENTS_DATA} />}
            {data == 2 && <SectionData data={BUSINESS_REGISTRATION_DATA} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default JoinOurNetworkTable;
