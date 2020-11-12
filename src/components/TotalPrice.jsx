import React from "react";
import { Segment } from "semantic-ui-react";

const TotalPrice = ({ price }) => {
  return (
    <Segment className="total-price" data-cy="total-price">
      Our price estimate for this routes is SEK: {price}
    </Segment>
  );
};

export default TotalPrice;
