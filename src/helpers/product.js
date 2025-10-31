import api from "../constants/api";

// get products
export const getProducts = (products, category, type, limit) => {
  const finalProducts = category
    ? products.filter(
        product => product.category.filter(single => single === category)[0]
      )
    : products;

  if (type && type === "new") {
    const newProducts = finalProducts.filter(single => single.new);
    return newProducts.slice(0, limit ? limit : newProducts.length);
  }
  if (type && type === "bestSeller") {
    return finalProducts
      .sort((a, b) => {
        return b.saleCount - a.saleCount;
      })
      .slice(0, limit ? limit : finalProducts.length);
  }
  if (type && type === "mostpopular") {
    const saleItems = finalProducts.filter(
      single => single.discount && single.discount > 0
    );
    return saleItems.slice(0, limit ? limit : saleItems.length);
  }
  return finalProducts.slice(0, limit ? limit : finalProducts.length);
};

// get product discount price
export const getDiscountPrice = (price, discount_amount) => {
  return discount_amount && discount_amount > 0 ? price - price * (discount_amount / 100) : null;
};

// get product cart quantity
export const getProductCartQuantity = (cartItems, product, color, size) => {
  let productInCart = cartItems.filter(
    single =>
      single.product_id === product.product_id &&
      (single.selectedProductColor
        ? single.selectedProductColor === color
        : true) &&
      (single.selectedProductSize ? single.selectedProductSize === size : true)
  )[0];
  if (cartItems.length >= 1 && productInCart) {
    if (product.variation) {
      return cartItems.filter(
        single =>
          single.product_id === product.product_id &&
          single.selectedProductColor === color &&
          single.selectedProductSize === size
      )[0].quantity;
    } else {
      return cartItems.filter(single => product.product_id === single.product_id)[0].quantity;
    }
  } else {
    return 0;
  }
};

//get products based on category
// export const getSortedProducts = (products, user,sortType, sortValue) => {
//   if (sortType && sortValue) {
//     if (sortType === "category") {
//       // return products.filter(
//       //   product => product.category.filter(single => single === sortValue)[0]
//       // );
//       // console.log('category',sortValue)
//      const getvalues=async()=>{

     
//      const sorted= await api.post('/category/getProductByCategory',{category_id:sortValue})
   
//      .then((res)=>{
//       console.log(res.data.data)
//         return res.data.data
        
//       }).then((result)=>{
//         console.log(result)
//           return result
          
//         }).catch((err)=>{
//         console.log(err)
//       })
   
//         return sorted
//     }
//     const pro=getvalues();
//     return pro
//     }
//     if (sortType === "status") {
//       // return products.filter(
//       //   product => product.category.filter(single => single === sortValue)[0]
//       // );
//      const getvalues=async()=>{

     
//      const sorted= await api.post('/orders/getOrderHistoryByStatus',{status:sortValue,contact_id:user.contact_id})
   
//      .then((res)=>{
//       console.log(res.data.data)
//         return res.data.data
        
//       }).then((result)=>{
//         console.log(result)
//           return result
          
//         }).catch((err)=>{
//         console.log(err)
//       })
   
//         return sorted
//     }
//     const pro=getvalues();
//     return pro
//     }
//     if (sortType === "tag") {
//       return products.filter(
//         product => product.tag.filter(single => single === sortValue)[0]
//       );
//     }
//     if (sortType === "color") {
//       return products.filter(
//         product =>
//           product.variation &&
//           product.variation.filter(single => single.color === sortValue)[0]
//       );
//     }
//     if (sortType === "size") {
//       return products.filter(
//         product =>
//           product.variation &&
//           product.variation.filter(
//             single => single.size.filter(single => single.name === sortValue)[0]
//           )[0]
//       );
//     }
//     if (sortType === "filterSort") {
//       let sortProducts = [...products];
//       if (sortValue === "default") {
//         return sortProducts;
//       }
//       if (sortValue === "priceHighToLow") {
//         return sortProducts.sort((a, b) => {
//           return b.price - a.price;
//         });
//       }
//       if (sortValue === "priceLowToHigh") {
//         return sortProducts.sort((a, b) => {
//           return a.price - b.price;
//         });
//       }
//     }
//   }
//   return products;
// };

export const getSortedProducts = async (products, sortType, sortValue,sortarray) => {
  if (sortType && sortValue) {
    console.log('Selected filter:', sortType, sortValue);

    try {
      if (sortType === "category" && sortValue !== '') {
        const response = await api.post('/category/getProductByCategory', { category_id: sortValue });
        return response.data.data;
      }

      if (sortType === "subcategory" && sortValue !== '' && sortarray.length>0) {
        const response = await api.post('/category/getProductBySubcategory', { sub_category_ids: sortarray });
        return response.data.data;
      }

      if (sortType === "subcategorytype" && sortValue !== '' && sortarray.length>0) {
        const response = await api.post('/category/getProductBySubCategoryType', { sub_category_type_ids: sortarray });
        return response.data.data;
      }

      if (sortType === "tag") {
        return products.filter(product =>
          product.tag.some(single => single === sortValue)
        );
      }

      if (sortType === "color") {
        return products.filter(product =>
          product.variation &&
          product.variation.some(single => single.color === sortValue)
        );
      }

      if (sortType === "size") {
        return products.filter(product =>
          product.variation &&
          product.variation.some(single =>
            single.size.some(size => size.name === sortValue)
          )
        );
      }

      if (sortType === "filterSort") {
        let sortedProducts = [...products];
        if (sortValue === "priceHighToLow") {
          return sortedProducts.sort((a, b) => b.price - a.price);
        }
        if (sortValue === "priceLowToHigh") {
          return sortedProducts.sort((a, b) => a.price - b.price);
        }
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  } 
  else if (sortType && !sortValue) {
    if (sortType === "tag") {
      try {
        const response = await api.get('/product/getAllProducts');
        return response.data.data;
      } catch (error) {
        console.error("Error fetching all products:", error);
        return [];
      }
    }
  }

  return products;
};


export const getSortedOrders = (orders, user,sortType, sortValue) => {
  if (sortType && sortValue) {
    console.log("sortType",sortType,sortValue)
    if (sortType === "status") {
     
            const getvalues=async()=>{
      
           
            const sorted= await api.post('/orders/getOrderHistoryByStatus',{status:sortValue,contact_id:user.contact_id})
         
            .then((res)=>{
             console.log(res.data.data)
               return res.data.data
              
             }).then((result)=>{
              console.log(result)
                 return result
                
               }).catch((err)=>{
             console.log(err)
             })
         
              return sorted
         }
           const pro=getvalues();
           return pro
           }
           if (sortType === "period") {
            function subtractMonths(date, months) {
              date.setMonth(date.getMonth() - months);
            
              return date;
            }
             
            if(sortValue === 'Last 30 days'){
              const filterDate = {
                start_date:subtractMonths(new Date(), 1),
                end_date: new Date(),
              };
               
            return orders.filter(
              product => new Date(product.order_date) >= new Date(filterDate.start_date) && new Date(product.order_date) <= new Date(filterDate.end_date))
            }
            
            if(sortValue === 'Last 60 days'){
              const filterDate = {
                start_date:subtractMonths(new Date(), 2),
                end_date: new Date(),
              };
              console.log("dates",filterDate)
              return orders.filter(
                product => new Date(product.order_date) >= new Date(filterDate.start_date) && new Date(product.order_date) <= new Date(filterDate.end_date))
            }
            
            if(sortValue === 'Last 3 months'){
              const filterDate = {
                start_date:subtractMonths(new Date(), 3),
                end_date: new Date(),
              };
              
              return orders.filter(
                product => new Date(product.order_date) >= new Date(filterDate.start_date) && new Date(product.order_date) <= new Date(filterDate.end_date))
            }
            
            if(sortValue === 'Last 6 months'){
              const filterDate = {
                start_date:subtractMonths(new Date(), 6),
                end_date: new Date(),
              };
               
              return orders.filter(
                product => new Date(product.order_date) >= new Date(filterDate.start_date) && new Date(product.order_date) <= new Date(filterDate.end_date))
            }
             
            if(sortValue === 'This Year'){
              const currentYear = new Date().getFullYear();
console.log(currentYear); 
const firstDay = new Date(currentYear, 0, 1);
console.log(firstDay);

const lastDay = new Date(currentYear, 11, 31);
console.log(lastDay);
              const filterDate = {
                start_date:firstDay,
                end_date:lastDay,
              };
               
              return orders.filter(
                product => new Date(product.order_date) >= new Date(filterDate.start_date) && new Date(product.order_date) <= new Date(filterDate.end_date))
            }
            
             
            if(sortValue === 'Last Year'){
              const lastYear = new Date().getFullYear();
              console.log(lastYear); 
              const firstDay = new Date(lastYear, 0, 1);
              console.log(firstDay);
              
              const lastDay = new Date(lastYear, 11, 31);
              console.log(lastDay);
                            const filterDate = {
                              start_date:firstDay,
                              end_date:lastDay,
                            };
              
               
                            return orders.filter(
                              product => new Date(product.order_date) >= new Date(filterDate.start_date) && new Date(product.order_date) <= new Date(filterDate.end_date))
            }
            
           
            
           }
    if (sortType === "tag") {
      return orders.filter(
        product => product.tag.filter(single => single === sortValue)[0]
      );
    }
    if (sortType === "color") {
      return orders.filter(
        product =>
          product.variation &&
          product.variation.filter(single => single.color === sortValue)[0]
      );
    }
    if (sortType === "size") {
      return orders.filter(
        product =>
          product.variation &&
          product.variation.filter(
            single => single.size.filter(single => single.name === sortValue)[0]
          )[0]
      );
    }
    if (sortType === "filterSort") {
      let sortProducts = [...orders];
      if (sortValue === "default") {
        return sortProducts;
      }
      if (sortValue === "priceHighToLow") {
        return sortProducts.sort((a, b) => {
          return b.price - a.price;
        });
      }
      if (sortValue === "priceLowToHigh") {
        return sortProducts.sort((a, b) => {
          return a.price - b.price;
        });
      }
    }
  }
  return orders;
};

export const getSortedOffersProducts = (products, sortType, sortValue) => {
  if (sortType && sortValue) {
    if (sortType === "category") {
      // return products.filter(
      //   product => product.category.filter(single => single === sortValue)[0]
      // );
     const getvalues=async()=>{

     
     const sorted= await api.post('/category/getOfferProductByCategory',{category_id:sortValue})
   
     .then((res)=>{
      console.log(res.data.data)
        return res.data.data
        
      }).then((result)=>{
        console.log(result)
          return result
          
        }).catch((err)=>{
        console.log(err)
      })
   
        return sorted
    }
    const pro=getvalues();
    return pro
    }
    if (sortType === "tag") {
      return products.filter(
        product => product.tag.filter(single => single === sortValue)[0]
      );
    }
    if (sortType === "color") {
      return products.filter(
        product =>
          product.variation &&
          product.variation.filter(single => single.color === sortValue)[0]
      );
    }
    if (sortType === "size") {
      return products.filter(
        product =>
          product.variation &&
          product.variation.filter(
            single => single.size.filter(single => single.name === sortValue)[0]
          )[0]
      );
    }
    if (sortType === "filterSort") {
      let sortProducts = [...products];
      if (sortValue === "default") {
        return sortProducts;
      }
      if (sortValue === "priceHighToLow") {
        return sortProducts.sort((a, b) => {
          return b.price - a.price;
        });
      }
      if (sortValue === "priceLowToHigh") {
        return sortProducts.sort((a, b) => {
          return a.price - b.price;
        });
      }
    }
  }
  return products;
};


export const getSortedCategories = (products, sortType, sortValue) => {
  if (sortType && sortValue) {
    if (sortType === "category") {
      // return products.filter(
      //   product => product.category.filter(single => single === sortValue)[0]
      // );
     const getvalues=async()=>{

     
     const sorted= await api.post('/category/getBlogByCategory',{category_id:sortValue})
   
     .then((res)=>{
      console.log(res.data.data)
        return res.data.data
        
      }).then((result)=>{
        console.log(result)
          return result
          
        }).catch((err)=>{
        console.log(err)
      })
   
        return sorted
    }
    const pro=getvalues();
    return pro
    }
    if (sortType === "tag") {
      return products.filter(
        product => product.tag.filter(single => single === sortValue)[0]
      );
    }
    if (sortType === "color") {
      return products.filter(
        product =>
          product.variation &&
          product.variation.filter(single => single.color === sortValue)[0]
      );
    }
    if (sortType === "size") {
      return products.filter(
        product =>
          product.variation &&
          product.variation.filter(
            single => single.size.filter(single => single.name === sortValue)[0]
          )[0]
      );
    }
    if (sortType === "filterSort") {
      let sortProducts = [...products];
      if (sortValue === "default") {
        return sortProducts;
      }
      if (sortValue === "priceHighToLow") {
        return sortProducts.sort((a, b) => {
          return b.price - a.price;
        });
      }
      if (sortValue === "priceLowToHigh") {
        return sortProducts.sort((a, b) => {
          return a.price - b.price;
        });
      }
    }
  }
  return products;
};

// get individual element
const getIndividualItemArray = array => {
  let individualItemArray = array.filter(function(v, i, self) {
    return i === self.indexOf(v);
  });
  return individualItemArray;
};


// get individual categories
export const getIndividualCategories = products => {
  let productCategories = [];
  products &&
    products.map(product => {
      return (
        product.category &&
        product.category.map(single => {
          return productCategories.push(single);
        })
      );
    });
  const individualProductCategories = getIndividualItemArray(productCategories);
  return individualProductCategories;
};

// get individual tags
export const getIndividualTags = products => {
  let productTags = [];
  products &&
    products.map(product => {
      return (
        product.tag &&
        product.tag.filter(el=>{return el !=='null' && el!=='undefined'}).map(single => {
          return productTags.push(single);
        })
      );
    });
    console.log('producttags',productTags);
  const individualProductTags = getIndividualItemArray(productTags);
  return individualProductTags;
};

// get individual colors
export const getIndividualColors = products => {
  let productColors = [];
  products &&
    products.map(product => {
      return (
        product.variation &&
        product.variation.map(single => {
          return productColors.push(single.color);
        })
      );
    });
  const individualProductColors = getIndividualItemArray(productColors);
  return individualProductColors;
};

// get individual sizes
export const getProductsIndividualSizes = products => {
  let productSizes = [];
  products &&
    products.map(product => {
      return (
        product.variation &&
        product.variation.map(single => {
          return single.size.map(single => {
            return productSizes.push(single.name);
          });
        })
      );
    });
  const individualProductSizes = getIndividualItemArray(productSizes);
  return individualProductSizes;
};

// get product individual sizes
export const getIndividualSizes = product => {
  let productSizes = [];
  product.variation &&
    product.variation.map(singleVariation => {
      return (
        singleVariation.size &&
        singleVariation.size.map(singleSize => {
          return productSizes.push(singleSize.name);
        })
      );
    });
  const individualSizes = getIndividualItemArray(productSizes);
  return individualSizes;
};

export const setActiveSort = e => {
  const filterButtons = document.querySelectorAll(
    ".sidebar-widget-list-left button, .sidebar-widget-tag button, .product-filter button"
  );
  filterButtons.forEach(item => {
    item.classList.remove("active");
  });
  e.currentTarget.classList.add("active");
};
export const setInactiveSort = e => {
  // const filterButtons = document.querySelectorAll(
  //   ".sidebar-widget-list-left button, .sidebar-widget-tag button, .product-filter button"
  // );
  // filterButtons.forEach(item => {
  //   item.classList.remove("active");
  // });
  e.currentTarget.classList.remove("active");
};

export const setActiveSorts = e => {
  const filterButtons = document.querySelectorAll(
    ".sidebar-widget-list-left button, .sidebar-widget-tag button, .product-filter button"
  );
  filterButtons.forEach(item => {
    item.classList.remove("active");
  });
  e.currentTarget.classList.add("active");
};


export const setActiveLayout = e => {
  const gridSwitchBtn = document.querySelectorAll(".shop-tab button");
  gridSwitchBtn.forEach(item => {
    item.classList.remove("active");
  });
  e.currentTarget.classList.add("active");
};

export const toggleShopTopFilter = e => {
  const shopTopFilterWrapper = document.querySelector(
    "#product-filter-wrapper"
  );
  shopTopFilterWrapper.classList.toggle("active");
  if (shopTopFilterWrapper.style.height) {
    shopTopFilterWrapper.style.height = null;
  } else {
    shopTopFilterWrapper.style.height =
      shopTopFilterWrapper.scrollHeight + "px";
  }
  e.currentTarget.classList.toggle("active");
};
