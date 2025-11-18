import React from "react";
import { IoDownloadOutline, IoMail, IoPersonAdd, IoCart, IoTrendingUp } from "react-icons/io5";
// import Header from "./Header";
// import StatBox from "./StatBox";
// import LineChart from "./LineChart";
// import BarChart from "./BarChart";
// import GeographyChart from "./GeographyChart";
// import ProgressCircle from "./ProgressCircle";
// import { mockTransactions } from "../data/mockData";

function CemindoDashboardBulma() {
  return (
    <section className="section">
      <div className="container">
        
        {/* HEADER & BUTTON */}
        <div className="is-flex is-justify-content-space-between is-align-items-center mb-4">
            <h1 className='title'>Sensors Cemindo</h1>
          <div title="DASHBOARD" subtitle="Welcome to your dashboard" />
          <button className="button is-link is-medium">
            <span className="icon">
              <IoDownloadOutline />
            </span>
            <span>Download Reports</span>
          </button>
        </div>

        {/* STAT CARDS */}
        <div className="columns is-multiline">
          <div className="column is-one-quarter">
            <div
              title="12,361"
              subtitle="Emails Sent"
              progress="0.75"
              increase="+14%"
              icon={<IoMail className="has-text-success" size={26} />}
            />
          </div>
          <div className="column is-one-quarter">
            <div
              title="431,225"
              subtitle="Sales Obtained"
              progress="0.50"
              increase="+21%"
              icon={<IoCart className="has-text-success" size={26} />}
            />
          </div>
          <div className="column is-one-quarter">
            <div
              title="32,441"
              subtitle="New Clients"
              progress="0.30"
              increase="+5%"
              icon={<IoPersonAdd className="has-text-success" size={26} />}
            />
          </div>
          <div className="column is-one-quarter">
            <div
              title="1,325,134"
              subtitle="Traffic Received"
              progress="0.80"
              increase="+43%"
              icon={<IoTrendingUp className="has-text-success" size={26} />}
            />
          </div>
        </div>

        {/* CHARTS & TRANSACTIONS */}
        <div className="columns">
          <div className="column is-two-thirds">
            <div className="box">
              <div className="is-flex is-justify-content-space-between is-align-items-center mb-3">
                <div>
                  <h5 className="title is-5">Revenue Generated</h5>
                  <h3 className="title is-3 has-text-success">$59,342.32</h3>
                </div>
                <button className="button is-small">
                  <IoDownloadOutline size={20} />
                </button>
              </div>
              <div style={{ height: "250px" }}>
                <div isDashboard={true} />
              </div>
            </div>
          </div>

          <div className="column is-one-third">
            <div className="box" style={{ overflowY: "auto", maxHeight: "400px" }}>
              <h5 className="title is-5 mb-4">Recent Transactions</h5>
              
            </div>
          </div>
        </div>

        {/* CHARTS BOTTOM */}
        <div className="columns">
          <div className="column is-one-third">
            <div className="box has-text-centered">
              <h5 className="title is-5">Campaign</h5>
              <div size="125" />
              <p className="mt-3 has-text-success">$48,352 revenue generated</p>
              <p>Includes extra misc expenditures and costs</p>
            </div>
          </div>

          <div className="column is-one-third">
            <div className="box">
              <h5 className="title is-5 mb-3">Sales Quantity</h5>
              <div style={{ height: "250px" }}>
                <div isDashboard={true} />
              </div>
            </div>
          </div>

          <div className="column is-one-third">
            <div className="box">
              <h5 className="title is-5 mb-3">Geography Based Traffic</h5>
              <div style={{ height: "200px" }}>
                <div isDashboard={true} />
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default CemindoDashboardBulma;

// versi lengkapnya dibawah ini, jangan lupa download depedensi seperti link berikut https://www.youtube.com/watch?v=wYpCWwD1oz0&t=183s :

// import React from "react";
// import { IoDownloadOutline, IoMail, IoPersonAdd, IoCart, IoTrendingUp } from "react-icons/io5";
// import Header from "./Header";
// import StatBox from "./StatBox";
// import LineChart from "./LineChart";
// import BarChart from "./BarChart";
// import GeographyChart from "./GeographyChart";
// import ProgressCircle from "./ProgressCircle";
// import { mockTransactions } from "../data/mockData";

// function CemindoDashboardBulma() {
//   return (
//     <section className="section">
//       <div className="container">

//         {/* HEADER & BUTTON */}
//         <div className="is-flex is-justify-content-space-between is-align-items-center mb-4">
//           <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
//           <button className="button is-link is-medium">
//             <span className="icon">
//               <IoDownloadOutline />
//             </span>
//             <span>Download Reports</span>
//           </button>
//         </div>

//         {/* STAT CARDS */}
//         <div className="columns is-multiline">
//           <div className="column is-one-quarter">
//             <StatBox
//               title="12,361"
//               subtitle="Emails Sent"
//               progress="0.75"
//               increase="+14%"
//               icon={<IoMail className="has-text-success" size={26} />}
//             />
//           </div>
//           <div className="column is-one-quarter">
//             <StatBox
//               title="431,225"
//               subtitle="Sales Obtained"
//               progress="0.50"
//               increase="+21%"
//               icon={<IoCart className="has-text-success" size={26} />}
//             />
//           </div>
//           <div className="column is-one-quarter">
//             <StatBox
//               title="32,441"
//               subtitle="New Clients"
//               progress="0.30"
//               increase="+5%"
//               icon={<IoPersonAdd className="has-text-success" size={26} />}
//             />
//           </div>
//           <div className="column is-one-quarter">
//             <StatBox
//               title="1,325,134"
//               subtitle="Traffic Received"
//               progress="0.80"
//               increase="+43%"
//               icon={<IoTrendingUp className="has-text-success" size={26} />}
//             />
//           </div>
//         </div>

//         {/* CHARTS & TRANSACTIONS */}
//         <div className="columns">
//           <div className="column is-two-thirds">
//             <div className="box">
//               <div className="is-flex is-justify-content-space-between is-align-items-center mb-3">
//                 <div>
//                   <h5 className="title is-5">Revenue Generated</h5>
//                   <h3 className="title is-3 has-text-success">$59,342.32</h3>
//                 </div>
//                 <button className="button is-small">
//                   <IoDownloadOutline size={20} />
//                 </button>
//               </div>
//               <div style={{ height: "250px" }}>
//                 <LineChart isDashboard={true} />
//               </div>
//             </div>
//           </div>

//           <div className="column is-one-third">
//             <div className="box" style={{ overflowY: "auto", maxHeight: "400px" }}>
//               <h5 className="title is-5 mb-4">Recent Transactions</h5>
//               {mockTransactions.map((tx, i) => (
//                 <div key={`${tx.txId}-${i}`} className="mb-3">
//                   <strong className="has-text-success">{tx.txId}</strong>
//                   <p>{tx.user}</p>
//                   <small>{tx.date}</small>
//                   <div className="tag is-success mt-1">${tx.cost}</div>
//                   <hr />
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* CHARTS BOTTOM */}
//         <div className="columns">
//           <div className="column is-one-third">
//             <div className="box has-text-centered">
//               <h5 className="title is-5">Campaign</h5>
//               <ProgressCircle size="125" />
//               <p className="mt-3 has-text-success">$48,352 revenue generated</p>
//               <p>Includes extra misc expenditures and costs</p>
//             </div>
//           </div>

//           <div className="column is-one-third">
//             <div className="box">
//               <h5 className="title is-5 mb-3">Sales Quantity</h5>
//               <div style={{ height: "250px" }}>
//                 <BarChart isDashboard={true} />
//               </div>
//             </div>
//           </div>

//           <div className="column is-one-third">
//             <div className="box">
//               <h5 className="title is-5 mb-3">Geography Based Traffic</h5>
//               <div style={{ height: "200px" }}>
//                 <GeographyChart isDashboard={true} />
//               </div>
//             </div>
//           </div>
//         </div>

//       </div>
//     </section>
//   );
// }

// export default CemindoDashboardBulma;
