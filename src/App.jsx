import { Link } from "react-router-dom";
import Routes from "./routes";


export default function App() {
  return (
    <>
    <div>
      <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
        <div className="container">
          <Link to="/" className="navbar narbar-brand mx-auto">
          HOME
          </Link>
          <button className="navbar-toggler" type="button">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse id" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 me-5 gap-2" role="search">
              <li className="nav-item">
                <Link to="/posts" className="nav-link active">
                  POSTS
                </Link>
              </li>
              <a href="#" target="_blank" className="btn btn-warning">Login</a>
            </ul>
          </div> 
        </div>
      </nav>
      </div>
      <Routes />
    </>
  )
}

