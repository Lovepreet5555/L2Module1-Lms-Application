import React, { useEffect, useState } from "react";
import OwnerSidebar from "../../Components/SidebarOwner";  // Sidebar for the owner portal
import "../../Styles/Owner/Owner.scss";  // SCSS file for styling

function OwnerListLibraries() {
  const [libraries, setLibraries] = useState([]);

  useEffect(() => {
    // Fetch libraries from the backend
    fetch("http://localhost:8080/libraries") 
      .then(response => response.json())
      .then(data => {
        setLibraries(data.libraries); 
      })
      .catch(error => {
        console.error("Error fetching libraries:", error);
      });
  }, []);

  return (
    <div className="owner-container">
      <OwnerSidebar />
      <div className="content">
        <h2>Library List</h2>
        {libraries.length === 0 ? (
          <p>No libraries found.</p>
        ) : (
          <div className="library-list">
            {libraries.map((library) => (
              <div className="library-card" key={library.ID}>
                <h3>{library.Name}</h3> 
                <p>Library ID: {library.ID}</p> 
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default OwnerListLibraries;