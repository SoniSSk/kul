import { FC } from 'react';

import WhyChooseUs from '../../dtos/WhyChooseUs.dto';
import Spacer from '../../styled/Spacer';
import Text from '../../styled/Text';

interface WhyChooseUsBoxProps {
  data: WhyChooseUs[] | null;
}

const WhyChooseUsBox: FC<WhyChooseUsBoxProps> = ({ data }) => {
  if (!data || !data.length) return null;

  // console.log('Why choose us', data);
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <Text fontFamily="montserrat" fontSize="xxxl" weight="bold">
            Why Choose Us
          </Text>
        </div>
      </div>
      <div className="row mt-5">
        {data.map((item, i) => (
          <div className="col-12 col-md-4 mb-3 mb-md-0" key={i}>
            <div className="row">
              <div className="col col-md-12">
                <div className="row">
                  <div className="col-12">
                    {item.icon ? (
                      <img
                        src={item.icon?.sourceUrl}
                        alt={item.icon?.title}
                        width={64}
                        className="image-gray mb-md-3"
                      />
                    ) : (
                      <img
                        src={
                          'https://cms.ezylegal.in/wp-content/uploads/2021/06/person_outline_black_24dp.svg'
                        }
                        alt={'hello'}
                        width={64}
                        className="image-gray"
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className="col-10 col-md-12">
                <div className="row media-body">
                  <div className="col-12">
                    <Text fontSize="lg" weight="midbold">
                      {item.title}
                    </Text>
                    <Text fontSize="base">
                      {item.description}
                    </Text>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyChooseUsBox;
