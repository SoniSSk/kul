import {FC, Fragment, useEffect, useState} from 'react';

import MenuItem from '../../dtos/MenuItem.dto';
import Spacer from '../../styled/Spacer';
import Text from '../../styled/Text';
import ActiveLink from '../ActiveLink';

interface DropDownContainerProps {
  menu: MenuItem;
  handleClose: Function;
}

const DropdownItem: FC<DropDownContainerProps> = ({ menu, handleClose }) => {

    const [showMore, setShowMore] = useState(false);
    const [menuItems, setMenuItems] = useState<Array<MenuItem>>([]);

    useEffect(function (){
        if(!showMore){
            setMenuItems(menu.children.filter((_, index) => (index < 4)))
        } else{
            setMenuItems(menu.children);
        }
    }, [showMore]);

    return(
        <ul className="list-unstyled">
            {menuItems.map((menu: MenuItem) => (
                <li className="mb-2" key={menu.id} onClick={() => handleClose()}>
                    <ActiveLink key={menu.id} href={menu.url}>
                        <a style={{color: '#000'}}>
                            <Text fontSize="base" weight="normal">{menu.label}</Text>
                        </a>
                    </ActiveLink>
                </li>
            ))}
            {menu.children.length > 4 ?<li className="mb-2" key="show">
                {showMore ?
                    <a onClick={() => setShowMore(false)}> <Text fontSize="md" color="primary"> Show Less </Text> </a> :
                    <a onClick={() => setShowMore(true)}> <Text fontSize="md" color="primary"> Show More</Text> </a>}
            </li> : null}
        </ul>
    );
}

const DropDownContainer: FC<DropDownContainerProps> = ({ menu, handleClose }) => {
  return (
    <div className="container d-block py-4" >
      <div className="row">
        {menu.children.map((menu: MenuItem) => (
          <Fragment key={menu.id}>
            {menu.children.length ? (
              <div className="col-12 col-md-3">
                <Text fontSize="base" fontFamily="manrope" weight="bold">
                  {menu.label}
                </Text>
                <Spacer direction="vertical" size={10} />
                <DropdownItem menu={menu} handleClose={handleClose}/>
              </div>
            ) : null}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default DropDownContainer;
