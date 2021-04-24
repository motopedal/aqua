import React, { memo , useState} from "react";
import OrderChart from "../../components/Charts/OrderChart";
import TotalUsers from "../../components/Charts/TotalUsers";
import axios from 'axios'

const HomePage = () => {
  const [data,setData] = useState();
  if(!data){
    axios.get("http://localhost:1337/commerce").then(({data}) => {
      setData(data)
    })
  }
  /*
  Bounce Rate: 
  
  Average Session Duration

  Pages Per Session

  Complete Orders
  */
  if(data){
    return( 
    <div style={{display:"flex", gap : "50px"}}>
      <div style={{width:"calc(100% / 3)", height: "600px"}}>
      <TotalUsers data={data.users} />
      </div>
      <div style={{width:"calc(100% / 3)", height: "500px"}}> 
      <OrderChart data={data.orders} />
      </div>
    </div>
    );
  }
};

export default memo(HomePage);
