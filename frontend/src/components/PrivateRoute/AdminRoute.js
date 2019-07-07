import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import UserHandler from '../utils/userHandler';

//Editar para admin
//Fazer função para verificar se é admin??
const AdminRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        UserHandler.get()!=null && UserHandler.isAdmin()
            ? <Component {...props} />
            : <Redirect to={{
                pathname: '/events',
                state: { from: props.location }
            }} />
    )} />
)

export default AdminRoute;