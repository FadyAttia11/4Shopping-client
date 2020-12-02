import React from 'react'
import './Admin.css'

import AddNewProduct from './AddNewProduct'
import EditExistingProduct from './EditExistingProduct'
import EditExclusiveProduct from './EditExclusiveProduct'
import EditTestimonials from './EditTestimonials'
import EditLogos from './EditLogos'
import MakeUserAdmin from './MakeUserAdmin'

const AdminPanel = () => {
    
    return (
        <div className="admin-panel">
            <h1 className="admin-title">Admin Panel</h1>

            <div className="admin-grid">
                <AddNewProduct />
                <EditExistingProduct />

                <div className="admin-form test">
                    <EditExclusiveProduct />
                    <EditLogos />
                </div>    

                <div className="admin-form test">
                    <EditTestimonials />
                    <MakeUserAdmin /> 
                </div>
            </div>       
        </div>
    )
}

export default AdminPanel