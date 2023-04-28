import { useParams } from "react-router-dom"
import { Link } from "react-router-dom";


const Pdata = () => {

    const {id}= useParams();
    console.log(id);

    const retrivedata = JSON.parse(localStorage.getItem('fovalues'))
    return <>
        <div className="container-fluid">

        <div class="container">
            {   

                [retrivedata[id]].map((d,index)=> (
                <>
                 <h2>Transection</h2>
                <div>
                    <div>
                        <label>Date of your transaction:</label>
                        <label>{d.tdate}</label>
                    </div>
                    <div>
                        <label>Month year:</label>
                        <label>{d.monthYear }</label>
                        
                    </div>
                    <div>
                        <label>Amount</label>
                        <label>{d.amount}</label>
                        
                    </div>
                    <div>
                        <label>From Acoount</label>
                        <label>{d.fromAccont}</label>
                        
                    </div>
                    <div>
                        <label>To Acoount</label>
                        <label>{d.toAccont}</label>
                       
                    </div>
                    <div>
                        <div>
                            <label>Receipt</label>
                            <img src={d.receipt} width={100} height={100} alt="" />
                        </div>
                       
                    </div>
                    <div>
                        <div>
                            <label>Remarks:</label>
                            <label>{d.remarks}</label>
                        </div>
                        <div>
                          
                        </div>
                    </div>
                  
                </div>
                </>
                
               

            ))}  
                <div>
                    <Link class="button-30" to={`/view-data`}>View Transection</Link>
                </div>
            </div>
        </div>
    </>


}

export default Pdata