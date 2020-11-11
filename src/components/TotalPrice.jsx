import React from 'react'

const TotalPrice  = ({price}) => {
  return (
    <div data-cy="total-price">
      Our price estimate for this routes is SEK {price}
    </div>
  )
}

export default TotalPrice
