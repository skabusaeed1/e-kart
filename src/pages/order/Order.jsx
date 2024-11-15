import React, { useContext } from 'react';
import MyState from '../../context/MyState';
import MyContext from '../../context/data/MyContext';
import Layout from '../../components/layout/Layout';
import Loader from '../../components/loader/Loader';


const Order = () => {

  const context = useContext(MyContext);
  const { orders, loading, mode } = context;

  const userId = JSON.parse(localStorage.getItem("user"))?.uid || JSON.parse(localStorage.getItem("user"))?.user?.uid ;
  
  return (
    <Layout>
      { loading && <Loader/> }
      {
        orders?.length > 0 ? (
        <div className='h-full pt-10'>
          {
            orders.filter((obj) => obj.userId === userId).map((order, i) => (
              <div className='mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0' key={i+1}>
                
                {
                  order.cartItems.map((item, i) => (
                    <div className="rounded-lg md:w-2/3" key={i+1}>
                      <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start " style={{ backgroundColor: mode === 'dark' ? '#282c34' : "", color: mode === 'dark' ? "white" : "", }}>

                        <img src={item.imageUrl}  alt="product-image" className='w-full rounded-lg sm:w-40' />

                        <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                          <div className="mt-5 sm:mt-0">
                            <h2 className="text-lg font-bold text-gray-900" style={{ color: mode === 'dark'? 'white' : "" }}>{item.title}</h2>

                            <p className="mt-1 text-xs text-gray-700" style={{ color: mode === 'dark'? "white" : "" }}>{ item.description }</p>
                            <p className="mt-1 text-xs text-gray-700" style={{ color: mode === 'dark'? "white" : "" }}>{ item.price }</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                }
              </div>
            ))
          }

        </div>
        
        ) : (
          <h2 className="text-center text-2xl text-white"> No Order Found </h2>
        )
      }
      
    </Layout>
  )
}

export default Order
