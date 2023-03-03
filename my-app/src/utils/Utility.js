// takes in a Painting size and returns the correct Estimated price
export const checkPrice = (paintingSize) => {
  switch (paintingSize) {
    case "8 x 8":
      return `$${parseFloat(50.0).toFixed(2)}`;

    case "10 x 10":
      return `$${parseFloat(100.0).toFixed(2)}`;

    case "12 x 12":
      return `$${parseFloat(150.0).toFixed(2)}`;

    case "14 x 14":
      return `$${parseFloat(200.0).toFixed(2)}`;

    case "16 x 16":
      return `$${parseFloat(250.0).toFixed(2)}`;
    default:
      return `$${parseFloat(0).toFixed(2)}`;
  }
};
