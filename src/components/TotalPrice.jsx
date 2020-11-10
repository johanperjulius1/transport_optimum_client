import React from 'react'

const TotalPrice  = ({distanceInMeters}) => {
  return (
    <div data-cy="total-price">
      Our price estimate for this routes is SEK {distanceInMeters}
    </div>
  )
}

export default TotalPrice
