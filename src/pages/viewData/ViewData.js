import { Link } from "react-router-dom";
import './viewdata.css'
import { useState } from "react";
import Table from "./Table";


const ViewData = () => {


    const retrivedata = JSON.parse(localStorage.getItem('fovalues'))


    const [groupBy, setgroupBy] = useState([]);
    const value = (ele) => {
        let data = [...retrivedata];

        let gdata = {};

        data.forEach((items) => {

            let item = items[ele.target.value]
            console.log(items);
            gdata[item] = gdata[item] ?? [];
            gdata[item].push(items);
        })
        setgroupBy(gdata)
        console.log(gdata);
    }

    return (
        <>
            {
                retrivedata ? <>
                    <>
                        <div>
                            <label>Group By:</label>
                            <select name="groupBy" onChange={(e) => value(e)}>
                                <option value={""}>Select Field Name</option>
                                <option value={"tdate"}>Transection-date</option>
                                <option value={"monthYear"}>Month-Year</option>
                                <option value={"ttype"}>Transection Type</option>
                                <option value={"amount"}>Amount</option>
                                <option value={"fromAccount"}>From-Account</option>
                                <option value={"toAccount"}>To-Account</option>
                                <option value={"remarks"}>Remarks</option>
                            </select>
                        </div>
                        <br></br>
                        <Table records={retrivedata} />
                        <br></br>

                        <br></br>

                        {

                            Object.keys(groupBy).map((d, i) => (
                                <>
                                    {
                                        d !== 'undefined' ? <>
                                            <h2> GroupBy: {d}</h2>
                                            <Table records={groupBy[d]} />
                                        </> : null
                                    }

                                </>
                            ))
                        }


                    </>
                </> : <>
                    <h1>No Data Found</h1>
                </>


            }
                    <div>
                        <Link class="button-30" to={'/'}>New Transection</Link>
                    </div>
        </>

    )

}

export default ViewData;