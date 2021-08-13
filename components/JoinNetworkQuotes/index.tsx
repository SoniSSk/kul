import React from "react";
import { FC } from "react";
import Text from "../../styled/Text";

import { QuoteContainer } from "./JoinNetworkQuotes.styled";

interface JoinNetworkQuotesProps {
  quotes: Array<Quote>;
  isMobile?: boolean;
}
interface Quote {
  title: string;
  description: string;
}

const JoinNetworkQuotes: FC<JoinNetworkQuotesProps> = ({ quotes, isMobile = false }) => {
  return (
    <div className="row container m-auto">
      {quotes.map((quote) => (
        <div className="col-md-4">
          <QuoteContainer className={isMobile ? 'inheritmw':''}>
            <Text fontSize="lg" color="white" weight="bold" className="mt-3 mb-1">
              {quote.title}
            </Text>
            <Text fontSize="base" weight="normal" color="white">
              {quote.description}
            </Text>
          </QuoteContainer>
        </div>
      ))}
    </div>
  );
};

export default JoinNetworkQuotes;
