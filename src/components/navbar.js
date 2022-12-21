import React from 'react';
import {
Nav,
NavLink,
// Bars,
NavMenu,
NavBtn,
NavBtnLink,
} from './navbarElements';

const Navbar = () => {
const onClick = () =>{
	localStorage.removeItem("user")
	window.location.href = "./ ";
}
const role= JSON.parse(window.localStorage.getItem("user"))?.role;
return (
	<>
	<Nav>
		<NavMenu>
		<NavLink to={role == "Student" ? "/student-dashboard":"/alumini-dashboard"} activeStyle>
			Dashboard
		</NavLink>
		<NavLink to='/profile' activeStyle>
			Profile
		</NavLink>
		</NavMenu>
		<NavBtn>
		<NavBtnLink to='' onClick={onClick}>Logout</NavBtnLink>
		</NavBtn>
	</Nav>
	<img src="./img9.jpg" width="1600"height="300"  />
	</>
);
};

export default Navbar;
