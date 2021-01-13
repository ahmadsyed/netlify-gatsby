import React from 'react';
import Loader from 'react-loader-spinner';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const PageLoader =()=>{
  return(
    <div>	
    <div className="loaderwrap"></div>
    <div className="loader">
     <Loader 
      type="Bars"
      color="#00BFFF"
      height="50"	
      width="50"
     /> 
     </div>  
     </div>
  );
} 

export default PageLoader;