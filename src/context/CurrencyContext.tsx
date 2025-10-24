import React, { createContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";

interface CurrencyContextType {
  currency: string;
  rate: number;
}

export const CurrencyContext = createContext<CurrencyContextType>({
  currency: "INR",
  rate: 1,
});

export const CurrencyProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [currency, setCurrency] = useState("INR");
  const [rate, setRate] = useState(1);

  useEffect(() => {
    const fetchCurrency = async () => {
      try {
        // Get user's country by IP
        const locationRes = await axios.get("https://ipapi.co/json/");
        const countryCode = locationRes.data.country_code;

        console.log("Country code", countryCode);

        // Determine user's currency from the country
        const currencyRes = await axios.get(
          `https://restcountries.com/v3.1/alpha/${countryCode}`
        );
        const userCurrency = currencyRes.data[0].currencies
          ? Object.keys(currencyRes.data[0].currencies)[0]
          : "INR";

        console.log("userCurrency", userCurrency);

        // 3️⃣ Get conversion rate from INR to user currency using Frankfurter
        let conversionRate = 1;
        if (userCurrency !== "INR") {
            const rateRes = await axios.get(
            `https://api.frankfurter.app/latest?from=INR&to=${userCurrency}`
            );
            conversionRate = rateRes.data.rates[userCurrency] || 1;
        }

        console.log("conversion Rate", conversionRate);

            setCurrency(userCurrency);
            setRate(conversionRate);
        } catch (err) {
            console.error("Currency fetch failed:", err);
        }
        };

    fetchCurrency();
  }, []);

  return (
    <CurrencyContext.Provider value={{ currency, rate }}>
      {children}
    </CurrencyContext.Provider>
  );
};
