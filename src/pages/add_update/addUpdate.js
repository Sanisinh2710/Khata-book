import { useEffect, useState } from "react";
import "./css/form.css";
import { Link, useNavigate, useParams } from "react-router-dom";

const Transection = () => {

    const navigate = useNavigate();


    const { id } = useParams();

    const getdata = JSON.parse(localStorage.getItem('fovalues'))





    let date = new Date();
    let year = date.getFullYear();
    const values = {
        tdate: "",
        monthYear: "",
        ttype: "",
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
            if (e.target.files[0]) {
                if (e.target.files[0].size >= "100000") {
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
        if (!values.ttype) {
            errors.ttype = "Select Transection type";
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

        if (!values.receipt) {
            errors.receipt = "Please choose a transaction Receipt and a transaction Receipt must be less than or equal to 1 mb";
        }

        if (values.remarks.trim() === "") {
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


    };

    const remove = () => {
        
        setfoValues({...foValues,receipt:""})
    }


    useEffect(() => {
        for (const key in getdata) {
            if (parseInt(getdata[key].id) === parseInt(id)) {
                setfoValues(getdata[key])
                break;
            }
        }
        //eslint-disable-next-line
    }, [])

    

    useEffect(() => {

        if (Object.keys(foerror).length === 0 && issubmit) {
            if (localStorage.getItem('fovalues') !== null) {


                const retrivedata = JSON.parse(localStorage.getItem('fovalues'))

                if (id) {
                    for (const e in retrivedata) {

                        if (parseInt(retrivedata[e].id) === parseInt(id)) {
                            console.log(e.id, "kehFWEghwe")
                            foValues['id'] = id;
                            retrivedata[e] = foValues;
                        }
                    }
                } else {
                    let previd = retrivedata[retrivedata.length - 1].id;

                    foValues['id'] = previd + 1;
                    retrivedata.push(foValues)
                }



                localStorage.setItem('fovalues', JSON.stringify(retrivedata))

            } else {

                foValues['id'] = 1;

                localStorage.setItem('fovalues', JSON.stringify([foValues]))

            }
            navigate('/view-data');
        }
        //eslint-disable-next-line
    }, [foerror])


    return (
        <>
            <div className="container">
                <h2>Khata-book</h2>
                <form className="form" onSubmit={submit}>
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
                        <select name="monthYear" onChange={getvalues} value={foValues.monthYear}>
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
                        <label>Transection Type</label>
                        <select name="ttype" onChange={getvalues} value={foValues.ttype}>
                            <option value={""}>Select Type</option>
                            <option value={`Home Expense`}>Home Expense</option>
                            <option value={`Personal  Expense`}>Personal  Expense</option>
                            <option value={`Income`}>Income</option>

                        </select>
                        <p className="error">{foerror.ttype}</p>
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
                        <select name="fromAccount" onChange={getvalues} value={foValues.fromAccount}>
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
                        <select name="toAccount" onChange={getvalues} value={foValues.toAccount}>
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
                            {
                                foValues.receipt ? <><img src={foValues.receipt} width={100} height={100} alt="" /><i className="fa fa-close" style={{fontSize:40,color:"red"}} onClick={remove}></i> </> : 
                                <input
                                    type="file"
                                    name="receipt"
                                    accept="image/*"
                                    onChange={getvalues}

                                />
                            }

                            <p className="error">{foerror.receipt}</p>
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
                    <Link className="button-30" to={`/view-data`}>View Transection</Link>
                </div>
            </div>
        </>
    );
};

export default Transection;
