import React from 'react'
import Navbar from '../components/User/NavbarUser'
import foto from '../components/images/notFound.png'

function NotFound() {
    return (
        <div className='text-light'>
            <Navbar />
            <div className="d-flex mt-5 justify-content-center">
                <img src={foto} className='img-fluid' alt="" />
            </div>
        </div>
    )
}

export default NotFound
