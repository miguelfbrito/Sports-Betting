import React from 'react';

import './EditUser.css';


const EditUser = (props) => {

    const { user } = props;
    return (
        <div className="row">
        <div className="col-sm-6">
            <p className="user-titles">Username:</p>
            <p className="user-titles">Saldo:</p>
            <p className="user-titles">Nome:</p>
            <p className="user-titles">Email:</p>
            <p className="user-titles">Premium:</p>
        </div>
        <div className="col-sm-6">
            {/* Ver se usamos o form ou o formik */}
        </div>
        </div>
    );
}

export default EditUser;