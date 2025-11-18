import React, { useEffect, useState } from 'react';
import "../style/Welcome.css";
import { useSelector } from 'react-redux'; // atau context
import axios from 'axios'; // ✅ Tambahkan axios


const Welcome = () => {

  const [summary, setSummary] = useState({
    total: 0,
    totalBusinessUnit: 0,
    totalSubUnit: 0,
    totalBranch: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await axios.get("http://localhost:5000/sensors/summary", {
          withCredentials: true
        });
        setSummary(res.data);
      } catch (error) {
        console.error("Gagal mengambil data ringkasan sensor:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

   return (
    <div className="fixed-summary ">
      <div className="container is-fluid pl-6 pr-4 pt-4">
        <div className="columns is-multiline">
          <div className="column is-3">
            <div className="box has-text-centered theme-box">
              <h6 className='has-text-success' >Total Sensor</h6>
              <p className='title has-text-success'>{loading ? "Loading..." : summary.total}</p>
            </div>
          </div>
          <div className="column is-3">
            <div className="box has-text-centered theme-box">
              <h6 className='has-text-success' > Bisnis-Unit</h6>
              <p className='title has-text-success' >{loading ? "Loading..." : summary.totalBusinessUnit}</p>
            </div>
          </div>
          <div className="column is-3">
            <div className="box has-text-centered theme-box">
              <h6 className='has-text-success'> Sub-Unit</h6>
              <p className='title has-text-success' >{loading ? "Loading..." : summary.totalSubUnit}</p>
            </div>
          </div>
          <div className="column is-3">
            <div className="box has-text-centered theme-box">
              <h6 className='has-text-success' > Total Branch</h6>
              <p className='title has-text-success' >{loading ? "Loading..." : summary.totalBranch}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};







export default Welcome
