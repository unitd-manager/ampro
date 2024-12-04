import React, { Fragment, useState, useEffect } from "react";
import MetaTags from "react-meta-tags";
import Layout from "../../layouts/Layout";
import TabProductTwo from "../../wrappers/product/TabProduct";
import FeatureIconTwo from "../../wrappers/feature-icon/FeatureIcon";
import BlogFeatured from "../../wrappers/blog-featured/BlogFeatured";
import DealProductSlider from "../../components/DealSlider";
// import HeroSlider from "../../wrappers/hero-slider/HeroSlider";
import api from "../../constants/api";
import HeroSliderNine from "../../wrappers/hero-slider/HeroSliderNine";

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
        <title>Pearl | Home</title>
        <meta
          name="description"
          content="Home of Pearl Food eCommerce template."
        />
      </MetaTags>
      <Layout headerTop="visible">
        <HeroSliderNine
          spaceLeftClass="ml-70"
          spaceRightClass="mr-70"
          interval={slideInterval}
          sliderData={sliderData}
        />
        <br />
        <br />
        {/* <HeroSlider /> */}
        

        {/* tab product */}
        <TabProductTwo
          spaceBottomClass="pb-100"
          category="furniture"
          newProducts={newProducts}
          bestSellingProducts={bestSellingProducts}
          mostPopularProducts={mostPopularProducts}
        />

        {/* Top Deals */}
        {offerProducts.length > 0 && (
          <DealProductSlider
            spaceTopClass="pt-55"
            spaceBottomClass="pb-55"
            products={offerProducts}
          />
        )}
       
        {/* feature icon */}
        <FeatureIconTwo spaceTopClass="pt-100" spaceBottomClass="pb-60" />

        {/* blog featured */}
        {/* <BlogFeatured spaceBottomClass="pb-55" /> */}
      </Layout>
    </Fragment>
  );
};

export default Home;
