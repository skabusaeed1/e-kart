import React, { useContext, useEffect } from 'react'
import Layout from '../../components/layout/Layout'
import MyContext from '../../context/data/MyContext';
import HeroSection from '../../components/heroSection/HeroSection';
import Filter from '../../components/filter/Filter';
import ProductCard from '../../components/productCard/ProductCard';
import Testimonial from '../../components/testimonial/Testimonial';
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, deleteFromCart } from '../../redux/cartSlice'
import { Link } from 'react-router-dom';





const Home = () => {


    const dispatch = useDispatch();
    const cartItem = useSelector((state) => state.cart );
    // console.log('cartItem',cartItem) //

    const addCart = ()=>{
        // dispatch(addToCart('shirt'))
    }

    const deleteCart = () => {
        // dispatch(deleteFromCart("shirt"));
    }

    useEffect(()=>{
        // addCart(); 
        // deleteCart()
    }, [])

    const context = useContext(MyContext);
    // console.log("context",context);

  return (
    <Layout>
      <HeroSection/>
      <Filter/>
      <ProductCard/>
      <div className="flex justify-center -mt-10 mb-4">
        <Link to={'/allproducts'}>
          <button className='bg-gray-300 px-5 py-2 rounded-xl'>See More</button>
        </Link>
      </div>
      <Testimonial/>
    </Layout>
  )
}

export default Home
