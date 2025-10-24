export const convertPrice = (priceInINR: number, rate: number, currency: string) => {
    const converted = priceInINR * rate;
    return `${currency} ${converted.toFixed(2)}`;
  };
  