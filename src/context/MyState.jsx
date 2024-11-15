import React, { useEffect, useState } from 'react'
import MyContext from './data/MyContext'
import { query, QuerySnapshot, Timestamp, addDoc, collection, onSnapshot, orderBy, setDoc, doc, deleteDoc, getDocs } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { fireDB } from '../firebase/FirebaseConfig';
// import { useNavigate } from 'react-router-dom';




const MyState = (props) => {

    const [mode, setMode ] = useState("light");

    const [ loading, setLoading ] = useState(false);
    // const navigate = useNavigate();

    const toggleMode = ()=>{
        if(mode === "light"){
            setMode("dark");
            document.body.style.backgroundColor = 'rgb(17, 24, 39)';
        }
        else{
            setMode("light");
            document.body.style.backgroundColor = '#fff';
        }
    }


    const [ product, setProduct ] = useState({
      title : null,
      price : null,
      imageUrl : null,
      category : null,
      description : null,
      time : Timestamp.now(),
      date : new Date().toLocaleString(
        "en-us",
        {
          month : "short",
          day : "2-digit",
          year : "numeric",

        }
      )
    })
    
    const [ products, setProducts ] = useState([]);

// Get product function --->
    const getProductData = async() =>{

      setLoading(true);

      try {
        const q = query(
          collection(fireDB, "products"),
          orderBy("time"),
          // limit(5)
        );
  
        const data = onSnapshot(q, (QuerySnapshot)=>{
          let productArray = [];
          QuerySnapshot.forEach(doc => {
            productArray.push({ ...doc.data(), id: doc.id })
          });
          setProducts(productArray);
          setLoading(false);
        });

        return () => data
      }
      catch(error){
        console.log('Error : MyState/getProductData : ', error.message );
        setLoading(false)
      }
    }


// Add product function --->
    const addProduct = async() =>{

      setLoading(true);
      if(product.title === null || product.price === null || product.imageUrl === null || product.category === null || product.description === null ){
        return toast.error("All Fields Are Mandatory !")
      }

      try{

        const productRef = collection( fireDB, "products");
        await addDoc( productRef, product );
        toast.success("Product Added Successfully.");
        // navigate("/dashboard")
        setTimeout(() => {
          window.location.href = '/dashboard'
        }, 1000);
        getProductData();
        setProduct({
          title : null,
          price : null,
          imageUrl : null,
          category : null,
          description : null,
          time : Timestamp.now(),
          date : new Date().toLocaleString(
            "en-us",
            {
              month : "short",
              day : "2-digit",
              year : "numeric",
    
            }
          )
        })
        setLoading(false);
        console.log(products); // remove all clg before hosting.
      }
      catch(error){
        console.log("Error : MyState/ Adding Product : ", error.message);
        setLoading(false)
      }
    }

    // Edit handle 
    const editHandle = (item) =>{
      setProduct(item);
    }

    // Update product function

    const updateProduct = async() =>{
      setLoading(true);
      
      try{
        
        await setDoc( doc(fireDB, 'products', product.id), product );
        toast.success('Product Updated Successfully.');
        setLoading(false);
        getProductData();
        setTimeout(()=>{

          window.location.href = '/dashboard'
        },800)
      }
      catch(error){
        console.log( 'Error : MyState.jsx/updateProduct : ', error.message );
        setLoading(false);
      }
    }

    // Delete Product 
    const deleteProduct = async(item) =>{
      setLoading(true);
      try{
        // setProduct(item);
        await deleteDoc(doc(fireDB, 'products', item.id));
        setLoading(false);
        toast.success("Product Deleted Successfully.");
        // window.location.href = '/dashboard';
        getProductData();
      }
      catch(error){
        console.log( 'Error : MyState.jsx/deleteProduct : ', error.message );
        setLoading(false);
      }
    }

    // Order Section 
    const [ orders, setOrders ] = useState([]);

    const getOrderData = async()=>{
      setLoading(true);

      try{
        const result = await getDocs(collection(fireDB, 'orders'));
        // console.log('result', result) //
        const ordersArray = [];
        result.forEach((doc)=>{
          ordersArray.push(doc.data());
          setLoading(false);
        });
        setOrders(ordersArray);
        // console.log('ordersArray : ', ordersArray ); //
        setLoading(false);
      }
      catch(error){
        console.log('Error : MyState.jsx/getOrderData : ',error.message );
        setLoading(false);
      }
    }


    // Users Section 
    const [ users, setUsers ] = useState([]);

    const getUsersData = async()=>{

      setLoading(true);
      try{
        const result = await getDocs(collection(fireDB, 'users'));
        const usersArray = [];
        result.forEach(doc => {
          usersArray.push(doc.data());
          setLoading(false);
        });
        setUsers(usersArray)
        // console.log('usersArray : ', usersArray );
        setLoading(false);
      }catch(error){
        console.log('Error : MyState.jsx/getUsersData : ',error.message );
        setLoading(false);
      }
    }

    useEffect(()=>{
      getProductData();
      getOrderData();
      getUsersData();
    }, [])


    const [ searchKey, setSearchKey ] = useState("");
    const [ filterType, setFilterType ] = useState("");
    const [ filterPrice, setFilterPrice ] = useState(""); 

  return (
    <MyContext.Provider value={{ mode, toggleMode, loading, setLoading, product, setProduct, products, addProduct, deleteProduct, updateProduct, editHandle, orders, users, searchKey, setSearchKey, filterType, setFilterType, filterPrice, setFilterPrice  }} >
      { props.children }
    </MyContext.Provider>
  )
}

export default MyState
