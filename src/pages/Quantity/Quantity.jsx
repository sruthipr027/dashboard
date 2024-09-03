import React, { useEffect } from 'react';
import Maindashboard from '../Maindashboard/Maindashboard';
import DashboardSam from '../Dashboard/DashboardSam';
import { Chart, registerables } from 'chart.js';
import Hedaer from '../Header/Hedaer';

Chart.register(...registerables);

function Quantity() {
  useEffect(() => {
    const ctx = document.getElementById('quantityChart').getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [
          '06-Jun', '07-Jun', '08-Jun', '09-Jun', '10-Jun',
          '11-Jun', '12-Jun', '13-Jun', '14-Jun', '15-Jun',
          '16-Jun', '17-Jun', '18-Jun', '19-Jun', '20-Jun', '21-Jun'
        ],
        datasets: [
          {
            label: 'FL - Inlet raw sewage, KLD',
            data: [592.3, 492.8, 543.7, 453.5, 682.8, 548.8, 510.5, 494.7, 565.2, 440.0, 559.2, 579.2, 1018.4, 603.4, 525.1, 385.9],
            backgroundColor: '#8ab9c8',
          },
          {
            label: 'FL - Treated Water, KLD',
            data: [565.3, 567.0, 577.4, 373.1, 522.1, 518.4, 496.1, 502.7, 535.1, 424.5, 505.1, 486.3, 916.6, 429.5, 390.0, 344.1],
            backgroundColor: '#236a80',
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            beginAtZero: true,
            grid: {
              display: false,
            }
          },
          y: {
            beginAtZero: true,
            grid: {
              color: '#e0e0e0',
            }
          }
        },
        plugins: {
          legend: {
            display: true,
            position: 'top',
          },
          tooltip: {
            enabled: true,
          }
        }
      }
    });

    return () => {
      const chartInstance = Chart.getChart(ctx);
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, []);

  const tableData = {
    headers: [
      'Parameter', '06-Jun', '07-Jun', '08-Jun', '09-Jun', '10-Jun',
      '11-Jun', '12-Jun', '13-Jun', '14-Jun', '15-Jun',
      '16-Jun', '17-Jun', '18-Jun', '19-Jun', '20-Jun', '21-Jun'
    ],
    rows: [
      ['FL - Inlet raw sewage, KLD', 592.3, 492.8, 543.7, 453.5, 682.8, 548.8, 510.5, 494.7, 565.2, 440.0, 559.2, 579.2, 1018.4, 603.4, 525.1, 385.9],
      ['FL - Treated Water, KLD', 565.3, 567.0, 577.4, 373.1, 522.1, 518.4, 496.1, 502.7, 535.1, 424.5, 505.1, 486.3, 916.6, 429.5, 390.0, 344.1]
    ]
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar (hidden on mobile) */}
        <div className="col-lg-3 d-none d-lg-block">
          <DashboardSam />
        </div>
        {/* Main content */}
        <div className="col-lg-9 col-12">
          <div className="row">
            <div className="col-12">
              <Hedaer />
            </div>
          </div>
          <h2 className='text-center'>Quantity Dashboard</h2>

          
          <div className="row" style={{ overflowX: 'hidden' }}>
            {/* Table Card */}
            <div className="col-12 col-md-12 grid-margin">
              <div className="cardquantity mb-3 mt-5" style={{ padding: '20px',
    background: 'linear-gradient(90deg, #3c798b, #bde3ee)', borderRadius:'10px' }}>
                <div className="card-body " style={{borderRadius:'10px'}}>
                  <h5 className="card-title">Parameter Data</h5>
                  <div style={{ overflowX: 'auto' }}>
                    <table className="table table-bordered" style={{ background: '#f7fafc', margin: '0', padding: '15px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                      <thead style={{ background: 'linear-gradient(-90deg, #8ab9c8,#f2f7f9)' }}>
                        <tr>
                          {tableData.headers.map((header, index) => (
                            <th key={index} style={{ padding: '10px', textAlign: 'center' }}>{header}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {tableData.rows.map((row, index) => (
                          <tr key={index}>
                            {row.map((cell, cellIndex) => (
                              <td key={cellIndex} style={{ padding: '10px', textAlign: 'center', backgroundColor: cellIndex === 0 ? '#eaf4f9' : '#fff' }}>{cell}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Graph Card */}
            <div className="col-12 col-md-12 grid-margin">
              <div className="cardgraph mb-3" style={{ padding: '20px' }}>
                <div className="card-body">
                  <h5 className="card-title">Total FL Sewage Graph</h5>
                  <div className="col-12">
                    <canvas id="quantityChart" width="400" height="200"></canvas>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default Quantity;
