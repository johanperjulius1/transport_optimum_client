import React from "react";
import { Header, Menu } from "semantic-ui-react";

const Navbar = () => {
  return (
    <div>
        <Header className="navigation-bar" data-cy="navigation-bar">
          <Menu id="menu">
          <Menu.Item data-cy="transport-optimum" name="transport-optimum">
              Transport Optimum
            </Menu.Item>
          </Menu>
        </Header>
    </div>
  );
};

export default Navbar;
