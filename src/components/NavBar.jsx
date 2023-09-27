// Posts list link (Root path) | link to create new post (post form)

import React from "react";
import { Link } from "react-router-dom";

function navBar() {
  return (
    <nav>
      <Link to="/">Posts List</Link>
      {" | "}
      <Link to="/new">Create New Post</Link>
    </nav>
  );
}

export default navBar;
