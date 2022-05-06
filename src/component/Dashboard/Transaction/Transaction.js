import React from 'react'

function Transaction(props) {
  return (
    <tr key = {props.id}>
    <td>{props.userID}</td>
    <td>{props.chargeAmount}</td>
    <td>{props.startTime}</td>
    <td>{props.transactionType}</td>
  </tr>
  )
}

export default Transaction