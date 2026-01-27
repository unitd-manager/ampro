import React, { Fragment, useState, useEffect } from "react";
import MetaTags from "react-meta-tags";
import Layout from "../../layouts/Layout";
import TabProductTwo from "../../wrappers/product/TabProduct";
import TabProductThree from "../../wrappers/product/BestSeller";
import TabProductFour from "../../wrappers/product/MostPopular";
// import FeatureIconTwo from "../../wrappers/feature-icon/FeatureIcon";
import FeatureIcon from "../../wrappers/feature-icon/FeatureIcon";

// import BlogFeatured from "../../wrappers/blog-featured/BlogFeatured";
import DealProductSlider from "../../components/DealSlider";
// import HeroSlider from "../../wrappers/hero-slider/HeroSlider";
import api from "../../constants/api";
import HeroSliderNine from "../../wrappers/hero-slider/HeroSliderNine";
// import TopBrands from "../../components/TopBrands";
import FeaturesSection from "../../components/FeaturesSection";
// import DiscountModal from "../../components/DiscountModal";
import USPSection from "../../components/USPSection";

import "../../assets/scss/_home-redesign.scss";

const Home = () => {
  const slideInterval = 3000;

  const [sliderData, setSliderData] = useState([]);

  const [offerProducts, setOfferProducts] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  const [bestSellingProducts, setBestSellingProducts] = useState([]);
  const [mostPopularProducts, setMostPopularProducts] = useState([]);

  // const getSliderDatas = () => {
  //   api
  //     .post("/file/getListOfFiles", { record_id: 31, room_name: "menu" })
  //     .then((res) => {
  //       setSliderData(res.data);
  //       console.log("sliderData", res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  const getBanner = () => {
    api
      .get('/content/getBanners')
      .then(res => {
        // Assuming res.data.data is an array
        const banners = res.data.data;
  
        // Use forEach to iterate through the array of banners
        banners.forEach((banner, index) => {
          console.log(`Banner ${index + 1}:`, banner);  // Logs each banner's data
        });
  
        // Now set the state with the fetched data
        setSliderData(banners);
  
        // Logging the entire response data for debugging
        console.log("sliderData", res.data);
      })
      .catch(error => {
        console.log("error", error);
      });
  };
  

  const getBestSellingProducts = () => {
    api
      .get("/product/getBestSellingProducts")
      .then((res) => {
        setBestSellingProducts(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getNewProducts = () => {
    api
      .get("/product/getNewProducts")
      .then((res) => {
        setNewProducts(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getMostPopularProducts = () => {
    api
      .get("/product/getMostPopularProducts")
      .then((res) => {
        setMostPopularProducts(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getOfferProducts = () => {
    api
      .get("/product/getTopOfferProducts")
      .then((res) => {
        res.data.data.forEach((element) => {
          element.images = String(element.images).split(",");
        });
        setOfferProducts(res.data.data);
      })
      .catch(() => {
        console.log("error");
      });
  };

  useEffect(() => {
    const getAllData = async () => {
      await getBestSellingProducts();
      await getMostPopularProducts();
      await getNewProducts();
      await getOfferProducts();
      // await getSliderDatas();
      await getBanner();
    };
    getAllData();
    // getDataFromApi()
  }, []);
  return (
    <Fragment>
      <MetaTags>
        <title>Ampro | Home</title>
        <meta
          name="description"
          content="Home of Ampro eCommerce template."
        />
      </MetaTags>
      <Layout headerTop="visible" className="home-page">
        <HeroSliderNine
          interval={slideInterval}
          sliderData={sliderData}
          className="hero-slider"
        />
        <br />
        <br />
        {/* <HeroSlider /> */}
        <FeatureIcon spaceTopClass="pt-100" spaceBottomClass="pb-60" className="feature-icons" />


        {/* tab product */}
        <TabProductTwo
          spaceBottomClass="pb-100"
          category="furniture"
          newProducts={newProducts}
          bestSellingProducts={bestSellingProducts}
          mostPopularProducts={mostPopularProducts}
          className="product-tabs"
        />
        {/* <TopBrands/> */}
        <TabProductThree
          spaceBottomClass="pb-100"
          category="furniture"
          bestSellingProducts={bestSellingProducts}
          mostPopularProducts={mostPopularProducts}
          className="product-tabs"
        />
 <FeaturesSection spaceBottomClass="pb-100"/>
       <USPSection />

        <section
          style={{
            width: "100%",
            backgroundImage: `url("https://demoapus2.com/ogami/wp-content/uploads/2019/01/bg-countdown.jpg")`,
            backgroundSize: "cover", // Optional: Makes sure the image covers the entire section
            backgroundPosition: "center", // Optional: Centers the image
            backgroundRepeat: "no-repeat", // Optional: Prevents image repetition
            marginBottom:100,
          }}
        >
          <div className=" row">
              <div className="col-md-6 col-lg-6" style={{textAlign: 'center', marginTop:120}}>
                <h2 className="title">Deal Of The Week</h2>
                <div className="des" style={{marginTop:20, marginBottom:40}}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elitt <br />
                    incididunt ut labore{" "}
                </div>
                <div className="url-bottom">
                  <a href="/#/shop" className="btn btn-success btn-outline">
                    Shop Now
                  </a>
                </div>
              </div>
              <div className="col-md-6 col-lg-6">
                <img
                      loading="lazy"
                      decoding="async"
                      width={491}
                      height={420}
                      src="https://demoapus2.com/ogami/wp-content/uploads/2019/01/countdow-1.png"
                      className="attachment-full size-full wp-image-250"
                      alt=""
                      srcSet="https://demoapus2.com/ogami/wp-content/uploads/2019/01/countdow-1.png 491w, https://demoapus2.com/ogami/wp-content/uploads/2019/01/countdow-1-300x257.png 300w"
                      sizes="(max-width: 491px) 100vw, 491px"
                />{" "}
              </div>
            </div>
        </section>

        


        <TabProductFour
          spaceBottomClass="pb-100"
          category="furniture"
          bestSellingProducts={bestSellingProducts}
          mostPopularProducts={mostPopularProducts}
          className="product-tabs"
        />

        {/* Top Deals */}
        {offerProducts.length > 0 && (
          <DealProductSlider
            spaceTopClass="pt-55"
            spaceBottomClass="pb-55"
            products={offerProducts}
          />
        )}
      {/* <DiscountModal/> */}
   
        {/* blog featured */}
        {/* <BlogFeatured spaceBottomClass="pb-55" /> */}
      </Layout>
    </Fragment>
  );
};

export default Home;
