import { Link } from "react-router-dom";
import './viewdata.css'
import { useState } from "react";


const ViewData = () => {

    let date = new Date();
    let year = date.getFullYear();
    const months = [`Jan ${year}`, `Feb ${year}`, `Mar ${year}`, `Apr ${year}`, `May ${year}`, `Jun ${year}`, `Jul ${year}`, `Aug ${year}`, `Sep ${year}`, `Oct ${year}`, `Nov ${year}`, `Dec ${year}`]

    const retrivedata = JSON.parse(localStorage.getItem('fovalues'))
    const [sortedField, setSortedField] = useState({});
    const [groupBy, setgroupBy] = useState([]);
    let sortedData = [...retrivedata]

    const [currentPage, setCurrentPage] = useState(1);
    let recordsPerPage = 3;
    let lastIndex = currentPage * recordsPerPage;
    let firstIndex = lastIndex - recordsPerPage;
    const records = sortedData.slice(firstIndex, lastIndex);
    const totalPages = Math.ceil(sortedData.length / recordsPerPage)
    const numbers = [...Array(totalPages + 1).keys()].slice(1);


    sortedData = records

    if (sortedField.direction === "normal") {
        sortedData = records;
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

   


    function prePage() {

        if (currentPage !== firstIndex) {
            setCurrentPage(currentPage - 1)

        }
    }

    function changeCurrentPage(id) {

        setCurrentPage(id)


    }
    function NextPage() {

        if (currentPage !== lastIndex) {
            setCurrentPage(currentPage + 1)

        }
    }




    return (
        <>
            <div>
                <label>Group By:</label>
                <select name="groupBy" onChange={(e) => value(e)}>
                    <option value={""}>Select Field Name</option>
                    <option value={"tdate"}>Transection-date</option>
                    <option value={"monthYear"}>Month-Year</option>
                    <option value={"amount"}>Amount</option>
                    <option value={"fromAccount"}>From-Account</option>
                    <option value={"toAccount"}>To-Account</option>
                    <option value={"remarks"}>Remarks</option>
                </select>
            </div>
            <br></br>
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
                                <td><Link to={`/view-data/${index}`}>View</Link></td>
                            </tr>
                        </tbody>
                    )
                }
            </table>
            <nav>
        <ul className="pagination">
          <li className="">
            <span
              className="page-link"
              onClick={prePage}
              style={{ cursor: "pointer" }}
            >
              Prev
            </span>
          </li>
          {numbers.map((n, index) => (
            <li
              className={`page-item ${currentPage === n ? "active" : ""}`}
              key={index}
            >
              <span
                className="page-link"
                onClick={() => changeCurrentPage(n)}
                style={{ cursor: "pointer" }}
              >
                {n}
              </span>
            </li>
          ))}
          <li className="page-item">
            <span
              className="page-link"
              onClick={NextPage}
              style={{ cursor: "pointer" }}
            >
              Next
            </span>
          </li>
        </ul>
      </nav>
            <br></br>
            <div>
                <Link class="button-30" to={'/'}>New Transection</Link>
            </div>
            <br></br>

            {

                Object.keys(groupBy).map((d, i) => (
                    <>
                        {
                            d !== 'undefined' ? <>
                                <h2> GroupBy: {d}</h2>
                                <table key={i}>
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
                                    {groupBy[d].map((data, index) =>


                                        <tbody >
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

                                    )}
                                </table>


                            </> : null
                        }

                    </>
                ))
            }


        </>
    )

}

export default ViewData;