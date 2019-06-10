import React from 'react';

import './User.css';


const User = (props) => {

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
            <p className="user-info">{user.Username}</p>
            <p className="user-info">{user.Saldo + " €"}</p>
            <p className="user-info">{user.Nome}</p>
            <p className="user-info">{user.Email}</p>
            <p className="user-info">{user.Premium}</p>
        </div>
        </div>
    );
}

export default User;