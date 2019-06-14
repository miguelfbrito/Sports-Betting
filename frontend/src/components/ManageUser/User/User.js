import React from 'react';

import './User.css';


const User = (props) => {
    const { user } = props;
    return (
        <div>
            <div className="row">
            <div className="col-sm-3">
            <p className="user-titles">Username:</p>
            </div>
            <div className="col-sm-3">
            <p className="user-info">{user.username}</p>
            </div>
            <div className="col-sm-3">
            <p className="user-titles">Saldo:</p>
            </div>
            <div className="col-sm-3">
            <p className="user-info">{user.balance + ' €'}</p>
            </div>
            <div className="col-sm-3">
            <p className="user-titles">Nome:</p>
            </div>
            <div className="col-sm-3">
            <p className="user-info">{user.name}</p>
            </div>
            <div className="col-sm-3">
            <p className="user-titles">Email:</p>
            </div>
            <div className="col-sm-3">
            <p className="user-info">{user.email}</p>
            </div>
            <div className="col-sm-3">
            <p className="user-titles">Premium:</p>
            </div>
            <div className="col-sm-3">
            <p className="user-info">{String(user.ispremium)}</p>
            </div>
            </div>
        </div>
    );
}

export default User;