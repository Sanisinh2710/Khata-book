import { Link } from "react-router-dom";
import './viewdata.css'
import { useState } from "react";
const ViewData = () => {

    const retrivedata = JSON.parse(localStorage.getItem('fovalues'))

    const [sortedField, setSortedField] = useState(null);

    const sortcolumn = (e,props)=>{
        const column =  e.target.innerText;
        setSortedField(column)

        

    }


    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th onClick={sortcolumn}>Transection-date</th>
                        <th onClick={sortcolumn}>Month-Year</th>
                        <th onClick={sortcolumn}>Amount</th>
                        <th onClick={sortcolumn}>From-Account</th>
                        <th onClick={sortcolumn}>To-Account</th>
                        <th onClick={sortcolumn}>Remarks</th>
                        <th onClick={sortcolumn}>Receipt</th>
                        <th onClick={sortcolumn}>Action</th>
                    </tr>
                </thead>
                {
                    retrivedata.map((data,index) =>
                        <tbody>
                            <tr key={index}>
                                <td>{data.tdate}</td>
                                <td>{data.monthYear}</td>
                                <td>{data.amount}</td>
                                <td>{data.fromAccount}</td>
                                <td>{data.toAccount}</td>
                                <td>{data.remarks}</td>
                                <td><img src={data.receipt} width={50} height={50} alt=""/></td>
                                <td><Link>View</Link></td>
                            </tr>
                        </tbody>
                    )
                }
            </table>
            <div>
                <Link class="button-30" to={'/'}>New Transection</Link>
            </div>
        </>
    )
}

export default ViewData;