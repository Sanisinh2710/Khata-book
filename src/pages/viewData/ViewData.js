import { Link } from "react-router-dom";
import './viewdata.css'
import { useState } from "react";
const ViewData = () => {

    let date = new Date();
    let year = date.getFullYear();
    const months = [`Jan ${year}`, `Feb ${year}`, `Mar ${year}`, `Apr ${year}`, `May ${year}`, `Jun ${year}`, `Jul ${year}`, `Aug ${year}`, `Sep ${year}`, `Oct ${year}`, `Nov ${year}`, `Dec ${year}`]

    let retrivedata = JSON.parse(localStorage.getItem('fovalues'))

    const [sortedField, setSortedField] = useState({});
    let sortedData = [...retrivedata]
    console.log(sortedField);

    if (sortedField.direction === "normal") {
        sortedData = [...retrivedata];
    }
    else if (sortedField.key === "amount") {
        if (sortedField.direction === 'ascending') {
            sortedData.sort((a, b) => {

                return (a[sortedField.key] - b[sortedField.key])

            })
        } else if (sortedField.direction === 'descending') {
            sortedData.sort((a, b) => {

                return (b[sortedField.key] - a[sortedField.key])

            })
        }
    } else if (sortedField.key === "tdate") {
        if (sortedField.direction === 'ascending') {
            sortedData.sort((a, b) => {

                return new Date(a[sortedField.key]) - new Date(b[sortedField.key])

            })
        } else if (sortedField.direction === 'descending') {
            sortedData.sort((a, b) => {

                return new Date(b[sortedField.key]) - new Date(a[sortedField.key])

            })
        }
    } else if (sortedField.key === "monthYear") {

        if (sortedField.direction === 'ascending') {
            console.log(months.indexOf('Jan 2023'));
            sortedData.sort((a, b) => {

                return months.indexOf(a[sortedField.key]) - months.indexOf(b[sortedField.key])
            })
        } else if (sortedField.direction === 'descending') {
            sortedData.sort((a, b) => {

                return months.indexOf(b[sortedField.key]) - months.indexOf(a[sortedField.key])
            })
        }
    }
    else {
        sortedData.sort((a, b) => {
            if (a[sortedField.key] < b[sortedField.key]) {

                return sortedField.direction === 'ascending' ? -1 : 1;
            }

            if (a[sortedField.key] > b[sortedField.key]) {
                return sortedField.direction === 'ascending' ? 1 : -1;
            }
            return 0
        });

    }

    const sort = key => {

        let direction = 'ascending';

        if (sortedField.key === key && sortedField.direction === 'ascending') {
            direction = 'descending';

        }
        else if (sortedField.key === key && sortedField.direction === 'descending') {
            direction = "normal";
        }
        setSortedField({ key, direction });
    }




    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th onClick={() => sort('tdate')}>Transection-date</th>
                        <th onClick={() => sort('monthYear')}>Month-Year</th>
                        <th onClick={() => sort('amount')}>Amount</th>
                        <th onClick={() => sort('fromAccount')}>From-Account</th>
                        <th onClick={() => sort('toAccount')}>To-Account</th>
                        <th onClick={() => sort('remarks')}>Remarks</th>
                        <th>Receipt</th>
                        <th>Action</th>
                    </tr>
                </thead>
                {
                    sortedData.map((data, index) =>
                        <tbody>
                            <tr key={index}>
                                <td>{data.tdate}</td>
                                <td>{data.monthYear}</td>
                                <td>{Intl.NumberFormat("en-US", {
                                    style: "currency",
                                    currency: "INR",
                                }).format(data.amount)}</td>
                                <td>{data.fromAccount}</td>
                                <td>{data.toAccount}</td>
                                <td>{data.remarks}</td>
                                <td><img src={data.receipt} width={50} height={50} alt="" /></td>
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