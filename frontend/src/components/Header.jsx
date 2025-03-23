import { Link } from "react-router-dom";


export function Header(){
    return(
        <header>
            <div class='header-container'>
                <Link className='link' to='/'>Home</Link>
                <Link className='link' to='/login'>Login</Link>
            </div>
        </header>
    )
}