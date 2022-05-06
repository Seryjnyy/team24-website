import { Balance } from '@mui/icons-material'
import React from 'react'
import { Line } from 'react-chartjs-2'

function BalanceGraph() {
  return (
    <div className="balanceGraph__container">

    <div className="balanceGraph__title">
      <h4 className='title'>
        <span >Your Balance</span>
        <Balance style={{marginLeft:'10px' }}/>
      </h4>
      <h3>$ 1093.12</h3>
    </div>

    <div className="balanceGraph">
      <Line
        data={{
          labels: [
            "Today",
            "This Week",
            "This Month",
            "This Year",
            "All Time",
          ],
          datasets: [
            {
              label: "Days",
              data: [65, 59, 80, 81, 86],
              fill: false,
              borderColor: "rgb(75, 192, 192)",
              tension: 0.1,
            }
          ],
        }}
      />
    </div>
  </div>
  )
}

export default BalanceGraph