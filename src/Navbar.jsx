function Navbar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg ">
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
                <a className="nav-link active" aria-current="page" href="#">
                  Home
                </a>
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
            <button className="btn btn-primary ms-lg-3 ">Get Started</button>
          </div>
        </div>
      </nav>
    </>
  );
}
export default Navbar;
