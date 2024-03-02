// function loadScript(src: string): Promise<boolean> {
//     return new Promise((resolve) => {
//       const script = document.createElement("script");
//       script.src = src;
//       script.onload = () => {
//         resolve(true);
//       };
//       script.onerror = () => {
//         resolve(false);
//       };
//       document.body.appendChild(script);
//     });
//   }

// async function displayRazorpay(booking: any) {
//     const res = await loadScript(
//       "https://checkout.razorpay.com/v1/checkout.js"
//     );

//     if (!res) {
//       alert("Razorpay SDK failed to load. Are you online?");
//       return;
//     }

//     try {
//       const result = await axios.post<RazorpayResponse>(`${import.meta.env.VITE_BASE_URL}/payments/orders`, booking);

//       if (!result) {
//         alert("Server error. Are you online?");
//         return;
//       }

//       const { amount, id: order_id, currency } = result.data;

//       const options: RazorpayOptions = {
//         key: import.meta.env.VITE_KEY_ID,
//         amount: amount.toString(),
//         currency: currency,
//         name: "Bombay Taxi Co.",
//         description: "Test Transaction For Payment",
//         image: { logo: Logo }, // Replace with your logo URL
//         order_id: order_id,
//         handler: async function (response: RazorpayHandlerResponse) {
//           const data = {
//             orderCreationId: order_id,
//             razorpayPaymentId: response.razorpay_payment_id,
//             razorpayOrderId: response.razorpay_order_id,
//             razorpaySignature: response.razorpay_signature,
//             booking
//           };

//           const result = await axios.post(
//             `${import.meta.env.VITE_BASE_URL}/payments/success`,
//             data
//           );

//           if (result.data.msg === 'success') {
//             message.success("Booking created successfully")
//             navigate('/profile')
//           }
//         },
//         prefill: {
//           name: "Soumya Dey",
//           email: "SoumyaDey@example.com",
//           contact: "9999999999",
//         },
//         notes: {
//           address: "Soumya Dey Corporate Office",
//         },
//         theme: {
//           color: "#eab308",
//         },
//       };

//       const paymentObject = new (window as any).Razorpay(options);
//       paymentObject.open();
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   }

//   const handlePayNow = () => {

//     if (!userAuthenticated) {
//       setOpenAuthModal(true)
//       return
//     }

//     form
//       .validateFields()
//       .then(() => {
//         const formValues = form.getFieldsValue();

//         console.log(formValues)

//         const booking = {
//           "route_id": route?._id ?? null,
//           "trip_type": tripType,
//           "pick_up_date": pickupDate?.format("YYYY-MM-DD"),
//           "return_date": returnDate?.format("YYYY-MM-DD"),
//           "pick_up_time": pickupTime,
//           "pickup_address": formValues.pickupAddress,
//           "drop_address": formValues.dropoffAddress,
//           "requested_taxi_type": taxiRate.taxiType._id,
//           "payment": paymentType,
//           "pickup_city": pickupCityId,
//           "hourly_package": hourlyPackage,
//           "coupon_id": couponId,
//           "base_fare": couponDiscountedAmount || taxiRate.discountedPrice,
//           "numberOfPassengers": formValues.numberOfPassengers,
//           "numberOfSmallBags": formValues.numberOfSmallBags,
//           "numberOfLargeBags": formValues.numberOfLargeBags,
//           "seniorCitizen": formValues.seniorCitizen,
//           "womenTraveling": formValues.womenTraveling,
//           "kidsOnBoard": formValues.kidsOnBoard,
//           "englishSpeakingDriver": formValues.englishSpeakingDriver,
//           "carryingPet": formValues.carryingPet,
//           "need7Plus1Seater": formValues.need7Plus1Seater,
//           "carrierOverTop": formValues.carrierOverTop,
//           "bookingForSomeoneElse": formValues.bookingForSomeoneElse,
//           "otherDetails": formValues.otherDetails
//         }

//         console.log(booking)

//         displayRazorpay(booking)
//       })
//       .catch((error) => {
//         console.error('Form validation failed:', error);
//       });
//   };