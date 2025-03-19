import React from "react";
import UserSidebar from "../../Components/SidebarUser";  // Import the sidebar component
import "../../Styles/Portal.scss"

const UserPortal = () => {
  return (
    <div className="portal-container">
      <UserSidebar />
      <div className="content">
        {/* Content of your owner portal page */}
        <h5>Welcome to the User Portal</h5>
        {/* You can include specific components for Registering Owners, Admins, etc., here */}
      </div>
    </div>
  );
};

export default UserPortal;
