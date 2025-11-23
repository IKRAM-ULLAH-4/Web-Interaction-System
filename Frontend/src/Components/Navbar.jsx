import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg sticky-top ">
        <div className="container-fluid">
          <a className="navbar-brand ms-5" href="#">
            KWIS
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <Link
                  className="nav-link active "
                  aria-current="page"
                  path="/"
                  style={{}}
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#feature">
                  Features
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#howitworks">
                  How It works
                </a>
              </li>
            </ul>
            <Link to="/login">
              <button className=" btn btn-primary ">Get Started</button>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
export default Navbar;
