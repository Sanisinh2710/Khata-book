import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();

    const values = {
        uname: "",
        email: "",
        password: "",
    }


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

        if (!values.uname) {
            errors.uname = "Enter your name";
        }
        if (!values.email) {
            errors.email = "Enter a valid email address";
        }
        if (!values.password) {
            errors.password = "Enter a password";
        }

        return errors;
    }

    const submit = (e) => {
        e.preventDefault();
        setfoerror(validation(foValues));
        setIssubmit(true)
    }


    useEffect(() => {
        if (Object.keys(foerror).length === 0 && issubmit) {
            const retrivedata = JSON.parse(localStorage.getItem('userdata'))

            if (localStorage.getItem('userdata') !== null) {
                let previd = retrivedata[retrivedata.length - 1].id;

                    foValues['id'] = previd + 1;
                    retrivedata.push(foValues)
                console.log(retrivedata,">>>>>>>>>")
                    localStorage.setItem('userdata', JSON.stringify(retrivedata))
            }
            else {

                foValues['id'] = 1;

                localStorage.setItem('userdata', JSON.stringify([foValues]))
            }

            navigate('/login')
        }
        //eslint-disable-next-line
    }, [foerror])


    return <>
        <div className="login-form">
            <form onSubmit={submit}>
                <h1>Register</h1>
                <div className="content">
                    <div className="input-field">
                        <input type="text" name="uname" placeholder="Name" value={foValues.uname} onChange={getvalues} />
                        <p>{foerror.name}</p>
                    </div>
                    <div className="input-field">
                        <input type="email" name="email" placeholder="Email" value={foValues.email} onChange={getvalues} />
                        <p>{foerror.email}</p>
                    </div>
                    <div className="input-field">
                        <input type="password" name="password" placeholder="Password" value={foValues.password} onChange={getvalues} />
                        <p>{foerror.password}</p>

                    </div>
                </div>
                <div className="action">
                    <Link to={'/login'} className="but">Login</Link>
                    <input type="submit" value={"Sign in"} className="but" />
                </div>
            </form>
        </div>
    </>
}

export default Register;