import { Navigate, Route } from "react-router-dom";
import Transection from "../pages/add_update/addUpdate";
import ViewData from "../pages/viewData/ViewData";
import Pdata from "../pages/viewData/User";




export const Auth = [
    <Route key={1} path='/transection' Component={Transection} />,
    <Route key={2} path='/transection/:id' Component={Transection} />,
    <Route key={3} path='/view-data' Component={ViewData} />,
    <Route key={4} path='/view-data/:id' Component={Pdata} />,
    <Route key={5} path="/*" element={<Navigate to="/view-data" />}
    />,
];  