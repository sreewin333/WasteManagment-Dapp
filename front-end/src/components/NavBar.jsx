import "./Navbar.css"
function Navigationbar(){
    return(
        <nav className="navbar">
    <ul>
       <li><a href="">Home</a></li>
       <li><a href="">Search</a></li>
       <li><a href="">About</a></li>
       <li><a href="">Contact</a></li>
       <li><a href="">Help</a></li>
       <li className="log"><a href="">Log in/Sign up</a></li>
       
    </ul>
  
  </nav>)

}
export default Navigationbar;