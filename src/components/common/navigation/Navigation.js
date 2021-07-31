import React from "react";

const Navigation = ({ signOut }) => {
  return (
    <nav style={{ display: "flex", justifyContent: "flex-end" }}>
      <p onClick={signOut} className="f3 link dim black underline pa3 pointer">
        Sign Out
      </p>
    </nav>
  );
};

export default Navigation;
