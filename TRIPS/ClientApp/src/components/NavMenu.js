import React from 'react';
import { Container, Navbar, NavbarBrand, NavItem, NavLink, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import { useAuth0 } from '../auth0-wrapper';


const NavMenu = () => {
  const {isAuthenticated, loginWithRedirect, logout} = useAuth0();

  return (
    <header>
      <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
        <Container>
          <NavbarBrand tag={Link} to="/">TRIPS</NavbarBrand>
          { isAuthenticated ? (
              <ul className="navbar-nav flex-grow">
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/create">Create</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/trips">Trips</NavLink>
                </NavItem>
                <NavItem>
                  <Button className="btn btn-danger" onClick={() => logout()}>Log out</Button>
                </NavItem>
                {/* <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/fetch-data">Fetch</NavLink>
                </NavItem> */}
            </ul>
          ) : (
              <ul className="navbar-nav flex-grow">
                <NavItem>
                  <Button className="btn btn-success" onClick={() => loginWithRedirect()}>Log In</Button>
                </NavItem>
              </ul>
          )}
        </Container>
      </Navbar>
    </header>
  );
}


export default NavMenu;



// export class NavMenu extends Component {
//   static displayName = NavMenu.name;

//   constructor (props) {
//     super(props);

//     this.toggleNavbar = this.toggleNavbar.bind(this);
//     this.state = {
//       collapsed: true
//     };
//   }

//   toggleNavbar () {
//     this.setState({
//       collapsed: !this.state.collapsed
//     });
//   }

//   render () {
//     return (
//       <header>
//         <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
//           <Container>
//             <NavbarBrand tag={Link} to="/">TRIPS</NavbarBrand>
//             <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
//             <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
//               <ul className="navbar-nav flex-grow">
//                 <NavItem>
//                   <NavLink tag={Link} className="text-dark" to="/create">Create</NavLink>
//                 </NavItem>
//                 <NavItem>
//                   <NavLink tag={Link} className="text-dark" to="/trips">Trips</NavLink>
//                 </NavItem>
//                 {/* <NavItem>
//                   <NavLink tag={Link} className="text-dark" to="/fetch-data">Fetch</NavLink>
//                 </NavItem> */}
//               </ul>
//             </Collapse>
//           </Container>
//         </Navbar>
//       </header>
//     );
//   }
// }
