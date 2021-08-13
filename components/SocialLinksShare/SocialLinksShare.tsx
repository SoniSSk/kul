import { FC } from 'react';
import Text from '../../styled/Text';
import Link from 'next/link';

interface SocialLinksShareProps {
  name: string;
  isLastChild: boolean;
}

const getIconFromName = (name: string): string => {
  switch (name) {
    case 'whatsapp':
      return '/icons/whatsapp.svg';
    case 'twitter':
      return '/icons/twitter.svg';
    case 'facebook':
      return '/icons/facebook.svg';
    case 'email':
      return '/icons/email_24px.svg';
    case 'linkedin':
      return '/icons/linkedin.svg';
  }

  return '';
};

const IconLinks: FC<SocialLinksShareProps> = ({ name, isLastChild }) => {
  return (
    <>
      <Link href={'#'}>
        <a className="mb-2">
          <img
            src={getIconFromName(name)}
            style={{
              filter: 'invert(50%)',
            }}
            width={30}
            height={30}
            alt={name}
          />
        </a>
      </Link>
      {isLastChild ? null : (
        <hr
          style={{
            width: '100%',
          }}
        />
      )}
    </>
  );
};

const SocialLinkShare = ({}) => {
  const shareList = ['facebook', 'email', 'whatsapp', 'linkedin', 'twitter'];
  return (
    <div
      style={{
        position: 'absolute',
        right: '0',
        top: '200',
        width: '60px',
        border: '.5px solid #d4cece',
        height: 'auto',
        padding: '1rem .75rem',
      }}
      className="d-flex flex-column justify-content-center align-items-center"
    >
      <Text
        style={{
          transform: 'rotate(270deg)',
          marginTop: '20px',
        }}
        fontSize="lg"
        weight="midbold"
        color="secondary"
        className="mb-2"
      >
        Share
      </Text>
      <hr
        style={{
          width: '100%',
        }}
      />
      {shareList.map((socialName: string, index) => (
        <IconLinks
          name={socialName}
          isLastChild={index === shareList.length - 1}
        />
      ))}
    </div>
  );
};

export default SocialLinkShare;
