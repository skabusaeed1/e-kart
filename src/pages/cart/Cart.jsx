import React, { useContext, useEffect, useState } from "react";
import MyContext from "../../context/data/MyContext";
import Layout from "../../components/layout/Layout";
import Modal from "../../components/modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { deleteFromCart, emptyCart } from "../../redux/cartSlice";
import { Link } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";

function Cart() {
  const context = useContext(MyContext);
  const { mode } = context;
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  
  const deleteCartItem = (item) => {
    dispatch(deleteFromCart(item));
    toast.success("Item deleted");
  };

  const [totalAmount, setTotalAmount] = useState(0);

  const shipping = parseInt(100);
  const grandTotal = shipping + totalAmount;
  // console.log('grandTotal : ', grandTotal); //

  // buy now section
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [phoneNum, setPhoneNum] = useState("");

  const buyNow = async () => {
    if (name === "" || address === "" || pincode === "" || phoneNum === " ") {
      return toast.error("All Fields Are Required.", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    }

    const addressInfo = {
      name,
      address,
      pincode,
      phoneNum,
      date: new Date().toLocaleString("en-us", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
    };

    // modification : move these things to .env 
    // key --->    rzp_test_ManJyQWOqACNYS
    // key secrete  ---->    ykXCvyWJpKsJLru1nv0yKnan
    let options = {
      key: "rzp_test_ManJyQWOqACNYS",
      key_secrete: "ykXCvyWJpKsJLru1nv0yKnan",
      amount: parseInt(grandTotal * 100),
      currency: "INR",
      order_receipt: "order_rcptid_" + name,
      name: "E-Kart",
      description: "for testing purpose",
      handler: function (response) {
        console.log("response : ", response);
        toast.success("Payment Successful.");

        const paymentId = response.razorpay_payment_id;
        const orderInfo = {
          cartItems,
          addressInfo,
          date: new Date().toLocaleString("en-us", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          }),
          email:
            JSON.parse(localStorage.getItem("user"))?.email ||
            JSON.parse(localStorage.getItem("user"))?.user?.email,
          userId:
            JSON.parse(localStorage.getItem("user"))?.uid ||
            JSON.parse(localStorage.getItem("user"))?.user?.uid,
          paymentId,
        };

        try {
          const result = addDoc(collection(fireDB, "orders"), orderInfo);
          dispatch(emptyCart());
        } catch (error) {
          console.log("Error : cart.jsx/buyNow : ", error.message);
        }
      },

      theme: {
        color: "#3399cc",
      },
    };

    var pay = new window.Razorpay(options);
    pay.open();
    // console.log(pay);
  };

  useEffect(() => {
    let items = JSON.stringify(cartItems);
    localStorage.setItem("cart", items);

    let countTotal = 0;
    cartItems.forEach((ele) => {
      countTotal += Number(ele.price);
    });
    setTotalAmount(countTotal);
    // console.log(cartItems,'tyope of cartItem' , typeof cartItems, cartItems.length);

    
  }, [cartItems]);




  return (
    <Layout>
      {cartItems.length > 0 ? (
        <div
          className="h-screen bg-gray-100 pt-5 mb-[100%] "
          style={{
            backgroundColor: mode === "dark" ? "#282c34" : "",
            color: mode === "dark" ? "white" : "",
          }}
        >
          <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
          <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0 ">
            <div className="rounded-lg md:w-2/3">
              {cartItems.map((item, i) => (
                <div
                  key={i + 1}
                  className="justify-between mb-6 rounded-lg border  drop-shadow-xl bg-white p-6  sm:flex  sm:justify-start"
                  style={{
                    backgroundColor: mode === "dark" ? "rgb(32 33 34)" : "",
                    color: mode === "dark" ? "white" : "",
                  }}
                >
                  <img
                    src={item?.imageUrl}
                    alt="product-image"
                    className="w-full rounded-lg sm:w-40"
                  />
                  <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                    <div className="mt-5 sm:mt-0">
                      <h2
                        className="text-lg font-bold text-gray-900"
                        style={{ color: mode === "dark" ? "white" : "" }}
                      >
                        {item.title || "Title"}
                      </h2>
                      <h2
                        className="text-sm  text-gray-900"
                        style={{ color: mode === "dark" ? "white" : "" }}
                      >
                        {item.description || "description ..."}
                      </h2>
                      <p
                        className="mt-1 text-xs font-semibold text-gray-700"
                        style={{ color: mode === "dark" ? "white" : "" }}
                      >
                        ₹ {item.price}
                      </p>
                    </div>
                    <div
                      onClick={() => deleteCartItem(i)}
                      className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
              {/* <div className="justify-between mb-6 rounded-lg border  drop-shadow-xl bg-white p-6  sm:flex  sm:justify-start" style={{ backgroundColor: mode === 'dark' ? 'rgb(32 33 34)' : '', color: mode === 'dark' ? 'white' : '', }}>
              <img src="https://dummyimage.com/400x400" alt="product-image" className="w-full rounded-lg sm:w-40" />
              <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                <div className="mt-5 sm:mt-0">
                  <h2 className="text-lg font-bold text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>This is title</h2>
                  <h2 className="text-sm  text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>desc</h2>
                  <p className="mt-1 text-xs font-semibold text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>₹100</p>
                </div>
                <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>

                </div>
              </div>
            </div> */}
            </div>

            <div
              className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3"
              style={{
                backgroundColor: mode === "dark" ? "rgb(32 33 34)" : "",
                color: mode === "dark" ? "white" : "",
              }}
            >
              <div className="mb-2 flex justify-between">
                <p
                  className="text-gray-700"
                  style={{ color: mode === "dark" ? "white" : "" }}
                >
                  Subtotal
                </p>
                <p
                  className="text-gray-700"
                  style={{ color: mode === "dark" ? "white" : "" }}
                >
                  ₹ {totalAmount}
                </p>
              </div>
              <div className="flex justify-between">
                <p
                  className="text-gray-700"
                  style={{ color: mode === "dark" ? "white" : "" }}
                >
                  Shipping
                </p>
                <p
                  className="text-gray-700"
                  style={{ color: mode === "dark" ? "white" : "" }}
                >
                  ₹ {totalAmount > 0 ? shipping : 0}
                </p>
              </div>
              <hr className="my-4" />
              <div className="flex justify-between mb-3">
                <p
                  className="text-lg font-bold"
                  style={{ color: mode === "dark" ? "white" : "" }}
                >
                  Total
                </p>
                <div className>
                  <p
                    className="mb-1 text-lg font-bold"
                    style={{ color: mode === "dark" ? "white" : "" }}
                  >
                    ₹ {totalAmount > 0 ? grandTotal : 0}
                  </p>
                </div>
              </div>
              {/* <Modal  /> */}
              <Modal
                name={name}
                setName={setName}
                address={address}
                setAddress={setAddress}
                pincode={pincode}
                setPincode={setPincode}
                phoneNum={phoneNum}
                setPhoneNum={setPhoneNum}
                buyNow={buyNow}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center w-full flex justify-center flex-column p-8 m-4 bg-gray-400 ">
          <h2 className="text-xl mx-4 ">Your cart is empty !</h2>
          <div>
            <Link
              to={"/"}
              className="text-center w-full flex justify-center text-xl  text-green-800 bg-white p-2 rounded-lg hover:bg-green-700 hover:text-white "
            >
              Shop here
            </Link>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default Cart;
