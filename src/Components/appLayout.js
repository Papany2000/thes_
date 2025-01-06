import { Outlet } from 'react-router-dom'
import Navigation from './header.jsx'

const AppLayout = () => {
    return (
        <>
            <Navigation />
            <main className="container">
                <Outlet />
            </main>
            <footer>Copyright 2021</footer>
        </>
    )
}
export default AppLayout