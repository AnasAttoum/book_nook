import { Link, Outlet, useLocation } from 'react-router-dom'

import styles from '../styles/Header.module.css'
import { links } from '../CONSTANTS/data'
import Footer from './Footer'

export default function Header() {

    let location = useLocation()
    let pathname = location.pathname

    return (
        <>
            <div className={`p-5 flex justify-between ${styles.header}`}>

                <Link to={'/'}>
                    <div className='flex items-center gap-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 36 36"><path fill="#333" d="M32 7H4a4 4 0 0 0-4 4v15a4 4 0 0 0 4 4h11.416c.52.596 1.477 1 2.584 1s2.065-.404 2.584-1H32a4 4 0 0 0 4-4V11a4 4 0 0 0-4-4" /><path fill="#292f33" d="M20 27a2 2 0 0 1-4 0V9a2 2 0 0 1 4 0z" /><path fill="#99aab5" d="M18 26a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2z" /><path fill="#e1e8ed" d="M18 26c-.999-1.998-3.657-2-4-2c-2 0-5 2-8 2c-1 0-2-.896-2-2V8c0-1.104 1-2 2-2c3.255 0 6-2 8-2c3 0 4 1.896 4 3z" /><path fill="#99aab5" d="M34 26a2 2 0 0 1-2 2H20a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2z" /><path fill="#ccd6dd" d="M18 26c.999-1.998 3.657-2 4-2c2 0 5 2 8 2c1 0 2-.896 2-2V8c0-1.104-1-2-2-2c-3.256 0-6-2-8-2c-3 0-4 1.896-4 3z" /></svg>
                        <div className='font-semibold'>Book Nook</div>
                    </div>
                </Link>

                <div className='flex items-center gap-5'>
                    {links.map((link, index) => {
                        const isActive = pathname.slice(1).includes(link.name.toLowerCase()) || (pathname.slice(1) === '' && link.name === 'Home')
                        return <Link key={index} to={link.url} style={isActive ? { fontWeight: '700' } : {}}>{link.name}</Link>
                    })}
                    
                </div>

            </div>

            <Outlet />
            <Footer />
        </>

    )
}