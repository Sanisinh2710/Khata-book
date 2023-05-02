import { Navigate, Route } from "react-router-dom";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";




export const Unauth = [
    <Route path='/login' Component={Login} />,
    <Route path='/register' Component={Register} />,
    <Route path='/*'  element={<Navigate to="/login" replace />}/>
]; 