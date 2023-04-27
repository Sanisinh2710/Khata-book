import { useState } from "react";
import "./css/form.css";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();

    let date = new Date();
    let year = date.getFullYear();


    const values = {
        tdate: "",
        monthYear: "",
        amount: "",
        fromAccount: "",
        toAccount: "",
        receipt: "",
        remarks: "",
    };
    const [foValues, setfoValues] = useState(values);
    const [foerror, setfoerror] = useState({});
    const [issubmit, setIssubmit] = useState(false);



    console.log(foValues);
    const getvalues = (e) => {
        const { name, value } = e.target;
        if (e.target.type === "file") {
            if (e.target.files[0].size > "100000") {
                alert("File size is too large");
            } else {
                let freader = new FileReader();
                freader.readAsDataURL(e.target.files[0]);
                console.log(freader)
                freader.addEventListener('load', function () {

                    let val = this.result
                    setfoValues({ ...foValues, receipt: val })
                })
            }
        }
        else {

            console.log(e.target.type);
            setfoValues({ ...foValues, [name]: value });
        }
    };

    const validation = (values) => {
        const errors = {};
        if (!values.tdate) {
            errors.tdate = "Enter your transaction date";
        }
        if (!values.monthYear) {
            errors.monthYear = "Select a month and year";
        }
        if (!values.amount) {
            errors.amount = "Enter your Amount";
        }
        if (!values.fromAccount) {
            errors.fromAccount = "Please select Acoount";
        }
        if (!values.toAccount) {
            errors.toAccount = "Please select Acoount";
        }
        if ((values.fromAccount === values.toAccount) && (values.fromAccount.length > 0) && (values.toAccount.length > 0)) {
            errors.same = "From Account and to Account must be different ";
        }

        if (!values.remarks) {
            errors.remarks = "Write a remarks";
        } else if (values.remarks.length > 250) {
            errors.remarks = " remarks  too long";
        }

        return errors;
    };

    const submit = (e) => {
        e.preventDefault();

        setfoerror(validation(foValues));
        setIssubmit(true)

        console.log(Object.keys(foerror).length)
        if (Object.keys(foerror).length === 0 && issubmit) {
            if (localStorage.getItem('fovalues') !== null) {

                const retrivedata = JSON.parse(localStorage.getItem('fovalues'))

                retrivedata.push(foValues)

                localStorage.setItem('fovalues', JSON.stringify(retrivedata))

            } else {

                localStorage.setItem('fovalues', JSON.stringify([foValues]))

            }
            navigate('/view-data');
        }


    };



    return (
        <>
            <div class="container">
                <h2>Khata-book</h2>
                <form class="form" onSubmit={submit}>
                    <div>
                        <label>Date of your transaction</label>
                        <input
                            type="date"
                            name="tdate"
                            value={foValues.tdate}
                            onChange={getvalues}
                        />
                        <p className="error">{foerror.tdate}</p>
                    </div>
                    <div>
                        <label>Month year</label>
                        <select name="monthYear" onChange={getvalues}>
                            <option value={""}>Select Month & Year</option>
                            <option value={`Jan ${year}`}>Jan {year}</option>
                            <option value={`Feb ${year}`}>Feb {year}</option>
                            <option value={`Mar ${year}`}>Mar {year}</option>
                            <option value={`Apr ${year}`}>Apr {year}</option>
                            <option value={`May ${year}`}>May {year}</option>
                            <option value={`Jun ${year}`}>Jun {year}</option>
                            <option value={`Jul ${year}`}>Jul {year}</option>
                            <option value={`Aug ${year}`}>Aug {year}</option>
                            <option value={`Sep ${year}`}>Sep {year}</option>
                            <option value={`Oct ${year}`}>Oct {year}</option>
                            <option value={`Nov ${year}`}>Nov {year}</option>
                            <option value={`Dec ${year}`}>Dec {year}</option>
                        </select>
                        <p className="error">{foerror.monthYear}</p>
                    </div>
                    <div>
                        <label>Amount</label>
                        <input
                            type="number"
                            name="amount"
                            placeholder="Enter your amount"
                            value={foValues.amount.toLocaleString("en-US")}
                            onChange={getvalues}
                        />
                        <p className="error">{foerror.amount}</p>
                    </div>
                    <div>
                        <label>From Acoount</label>.
                        <select name="fromAccount" onChange={getvalues}>
                            <option value={""}>Select Acoount</option>
                            <option value={"Personal Account"}>Personal Account</option>
                            <option value={"Real Living"}>Real Living</option>
                            <option value={"My Dream Home"}>My Dream Home</option>
                            <option value={"Full Circle"}>Full Circle</option>
                            <option value={"Core Realtors"}>Core Realtors</option>
                            <option value={"Big Block"}>Big Block</option>
                        </select>
                        <p className="error">{foerror.fromAccount}</p>
                    </div>
                    <div>
                        <label>To Acoount</label>
                        <select name="toAccount" onChange={getvalues}>
                            <option value={""}>Select Acoount</option>
                            <option value={"Personal Account"}>Personal Account</option>
                            <option value={"Real Living"}>Real Living</option>
                            <option value={"My Dream Home"}>My Dream Home</option>
                            <option value={"Full Circle"}>Full Circle</option>
                            <option value={"Core Realtors"}>Core Realtors</option>
                            <option value={"Big Block"}>Big Block</option>
                        </select>
                        <p className="error">{foerror.toAccount}</p>

                        {foerror.same ? <p className="error">{foerror.same}</p> : null}
                    </div>
                    <div>
                        <div>
                            <label>Receipt</label>
                        </div>
                        <div>
                            <input
                                type="file"
                                name="receipt"
                                accept="image/*"
                                onChange={getvalues}
                            />
                        </div>
                    </div>
                    <div>
                        <div>
                            <label>Remarks:</label>
                        </div>
                        <div>
                            <textarea
                                name="remarks"
                                value={foValues.remarks}
                                onChange={getvalues}
                            ></textarea>
                            <p className="error">{foerror.remarks}</p>
                        </div>
                    </div>
                    <div>
                        <input type="submit" value={"submit"} />
                    </div>
                </form>

                <div>
                    <Link class="button-30" to={'/view-data'}>View Transection</Link>
                </div>
            </div>
        </>
    );
};

export default Register;
