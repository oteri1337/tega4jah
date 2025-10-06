export default (amount, currency = "NGN") => {
  if (amount === null) {
    return "";
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
};
