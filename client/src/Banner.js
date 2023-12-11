import React from "react";
// import Image from "../assets/img/house-banner.png";
// import Search from "../components/Search";

const Banner = () => {
return (
<section className="h-full max-h-[640px] mb-8 xl:mb-24">
  <div className="flex flex-col lg:flex-row">
    <div className="lg:ml-8 xl:ml-[135px] flex flex-col items-center lg:items-start
                        text-center lg:text-left justify-center flex-1 px-4 lg:px-0">
      <h1 className="text-4xl lg:text=[58px] font-semibold leading-none mb-6">
        {/* <span className="text-violet-700">Rent</span> Your Dream Home.{" "} */}
      </h1>
      <p className="max-w-[480px] mb-8">
  
      Users can find their suitable houses/properties easily through this website.
      On the other side, Owners can find suitable renters and buyers for their properties.
      {/* <span>
      <p>
        <p>
          {/* <span>
          This platform plays a significant role in modern real estate by making the buying/rental process more efficient, transparent, and accessible for both property owners and users.
          </span> 
        </p>
      </p>
</span> */}
      </p>
    </div>
    <div className="hidden flex-1 lg:flex justify-end items-end">
      {/* <img src={Image} ale="img1" /> */}
    </div>
  </div>
  {/* <Search/> */}
</section>
);
};

export default Banner;