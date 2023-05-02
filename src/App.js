import {
    BrowserRouter as Router,
    Routes

} from 'react-router-dom';

import { Auth } from './routes/auth';
import { Unauth } from './routes/unauth';

const App = () => {

    const token = JSON.parse(localStorage.getItem('tempdata'))
    return (

        <Router>
            <Routes>
                {/* <Route path='/transection' Component={Transection} />
                <Route path='/transection/:id' Component={Transection} />
                <Route path='/view-data' Component={ViewData} />
                <Route path='/view-data/:id' Component={Pdata} />
                <Route path='/login' Component={Login} />
                <Route path='/register' Component={Register} /> */}

                {
                    token ? Auth : Unauth
                }
            </Routes>
        </Router>


    )

}


export default App;