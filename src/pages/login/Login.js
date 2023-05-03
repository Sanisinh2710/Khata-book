import { Link, useNavigate } from 'react-router-dom';
import './login.css'
import { useEffect, useState } from 'react';

const Login = () => {
    const navigate = useNavigate();
    const values = {
        email: "",
        password: ""
    }

    const data = JSON.parse(localStorage.getItem('userdata'))
    console.log(data);

    const [foValues, setfoValues] = useState(values);
    const [foerror, setfoerror] = useState({});
    const [issubmit, setIssubmit] = useState(false);

    const getvalues = (e) => {

        const { name, value } = e.target
        setfoValues({ ...foValues, [name]: value });


    }
    console.log(foValues);

    const validation = (values) => {
        const errors = {};


        if (!values.email) {
            errors.email = "Enter a valid email address";
        }
        if (!values.password) {
            errors.password = "Enter a password";
        }

        // for (const key in data) {
            
        //     if ((data[key].email !== foValues.email) && (data[key].password !== foValues.password)) {
        //         errors.nexist = "Please type  your email address and password correctly"
        //     }

        // }



        return errors;
    }

    const submit = (e) => {
        e.preventDefault();
        setfoerror(validation(foValues));
        setIssubmit(true)
    }

    console.log(Object.keys(foerror).length);
    console.log(issubmit);

    useEffect(() => {
        if (Object.keys(foerror).length === 0 && issubmit) {
            let flag = false
            for (const key in data) {
                if ((data[key].email === foValues.email) && (data[key].password === foValues.password)) {

                    flag = true
                    break;

                }else{
                    alert("Please type your email address and password correctly")
                }
            }
            if (flag === true) {
                let result = '';
                const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                const charactersLength = characters.length;
                let counter = 0;
                while (counter < 17) {
                    result += characters.charAt(Math.floor(Math.random() * charactersLength));
                    counter += 1;
                }

                foValues['token'] = result;

                localStorage.setItem('tempdata', JSON.stringify(foValues))

                navigate('/view-data')
            }
        }
        //eslint-disable-next-line
    }, [foerror])



    return <>
        <div className="login-form">
            <form onSubmit={submit}>
                <h1>Login</h1>
                <div className="content">
                    <div className="input-field">
                        <input type="email" placeholder="Email" name='email' onChange={getvalues} />
                        <p>{foerror.email}</p>
                    </div>
                    <div className="input-field">
                        <input type="password" placeholder="Password" name='password' onChange={getvalues} />
                        <p>{foerror.password}</p>
                    </div>

                    <p>{foerror.nexist}</p>
                </div>
                <div className="action">
                    <Link to={'/public/register'} className="but">Register</Link>
                    <input type="submit" value={"Sign in"} className="but" />
                </div>
            </form>
        </div>
    </>

}


export default Login;