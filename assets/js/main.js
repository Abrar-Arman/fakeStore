let productRes;
const getCategory = async () => {
  const { data } = await axios.get(
    "https://dummyjson.com/products/category-list"
  );
  return data;
};
const displayCategory = async () => {
  const loader = document.querySelector(".loader");
  try {
    loader.classList.remove("hidden");
    const data = await getCategory();
    const content = data
      .map(
        (category) => `<div class='category-content'>
    <h3>${category}</h3>
    <a href='category.html?category=${category}'>show details</a>
    </div>`
      )
      .join("");
    document.querySelector(".category .row").innerHTML = content;
  } catch (e) {
    document.querySelector(".category .row").innerHTML =
      "<p>somthing wrong</p>";
  } finally {
    document.querySelector(".loader").classList.add("hidden");
  }
};
displayCategory();
const getProduct = async (numPage) => {
  const skip = (numPage - 1) * 20;
  console.log(skip);
  const { data } = await axios.get(
    `https://dummyjson.com/products?limit=20&skip=${skip}`
  );
  productRes = data.products;
  return data;
};
let pre;
const displayProduct = async (page, ele) => {
  const loader = document.querySelector(".loader");
  if (ele == "button" && page == pre) return;
  try {
    loader.classList.remove("hidden");
    const data = await getProduct(page);
    const numberogPage = Math.ceil(data.total / 20);
    const content = data.products
      .map(
        (product) => `<div class='product-content'>
      <img onclick='displayModal(${product.id})'  src="${product.thumbnail}" alt="${product.title} " class='img'>
      <h3 onclick="display('${product.title}')">${product.title}</h3>
      <div class="product-details">
       <div class="icon">
       <i class="fa-regular fa-heart"></i>
       <i class="fa-solid fa-cart-shopping"></i>
       </div>
      </div>
      </div>`
      )
      .join("");
    document.querySelector(".product .row").innerHTML = content;
    //paginaton  logic
    let number = "";
    if (page > 1)
      number = `<button onclick="displayProduct(${page - 1})">&laquo;</button>`;
    for (let i = 1; i <= numberogPage; i++)
      number += `<button class="${
        page == i ? "active" : ""
      }" onclick="displayProduct(${i},'button')">${i}</button>`;
    if (page != numberogPage)
      number += `<button onclick="displayProduct(${
        page + 1
      })">&raquo;</button>`;
    document.querySelector(".pagination-content").innerHTML = number;
    //prevent make request
    pre = page;
    //modal logic
    // const img=document.querySelectorAll('.img')
    // displayModal(img)
  } catch (e) {
    document.querySelector(".category .row").innerHTML =
      "<p>somthing wrong</p>";
  } finally {
    loader.classList.add("hidden");
  }
};
displayProduct(1);
//Modal logic
function displayModal(productId) {
  const closeBtn = document.querySelector(".close-btn");
  const leftArrow = document.querySelector(".m-left");
  const rightArrow = document.querySelector(".m-right");
  const modal = document.querySelector(".modal-product");
  const imgContent = document.querySelector(".modal-product img");
  const description = document.querySelector(".product-detail p");
  const oldPrice = document.querySelector(".product-info .old-price");
  const newPrice = document.querySelector(".product-info .new-price");
  let index = 0;
  //find product
  const product = productRes.find((product) => product.id == productId);
  const percentegeOfDiscount = Math.round(
    product.price - (product.discountPercentage * product.price) / 100
  );
  //find index
  index = productRes.findIndex((product) => product.id == productId);
  // console.log(percentegeOfDiscount)
  //always when call function
  modal.classList.add("d-flex");

  imgContent.setAttribute("src", product.thumbnail);
  description.textContent = product.description;
  oldPrice.textContent = `$${product.price}`;
  newPrice.textContent = `$${percentegeOfDiscount}`;
  //close btn
  closeBtn.addEventListener("click", () => {
    modal.classList.remove("d-flex");
  });
  //left button
  leftArrow.addEventListener("click", () => {
   
    if (index == 0) {
      index= productRes.length - 1;
      imgContent.setAttribute("src", productRes[index].thumbnail);
      description.textContent = productRes[index].description;
      oldPrice.textContent = `$${productRes[index].price}`;
      newPrice.textContent = `$${Math.round(
        productRes[index].price - ( productRes[index].discountPercentage *  productRes[index].price) / 100
      )}`;
    } else {
      index--;
      imgContent.setAttribute("src", productRes[index].thumbnail);
      description.textContent = productRes[index].description;
      oldPrice.textContent = `$${productRes[index].price}`;
      newPrice.textContent = `$${Math.round(
        productRes[index].price - ( productRes[index].discountPercentage *  productRes[index].price) / 100
      )}`;
    }
  });
  //right button
  rightArrow.addEventListener("click", () => {
   
    if (index == productRes.length - 1) {
      index= 0;
      imgContent.setAttribute("src", productRes[index].thumbnail);
      description.textContent = productRes[index].description;
      oldPrice.textContent = `$${productRes[index].price}`;
      newPrice.textContent = `$${Math.round(
        productRes[index].price - ( productRes[index].discountPercentage *  productRes[index].price) / 100
      )}`;
    } else {
      index++;
      imgContent.setAttribute("src", productRes[index].thumbnail);
      description.textContent = productRes[index].description;
      oldPrice.textContent = `$${productRes[index].price}`;
      newPrice.textContent = `$${Math.round(
        productRes[index].price - ( productRes[index].discountPercentage *  productRes[index].price) / 100
      )}`;
    }
  });
  //   imges.forEach((img)=>{
  //    img.addEventListener('click',(e)=>{
  //      modal.classList.add('d-flex')
  //      imgContent.setAttribute('src',e.target.src)
  //      currentInd=Array.from(imges).indexOf(e.target)

  //    })
  //   })
  //   //left button
  //   leftArrow.addEventListener('click',()=>{
  //     if(currentInd==0){
  //       currentInd=imges.length-1;
  //        imgContent.setAttribute('src', imges[currentInd].src)
  //     }
  //   else{
  //     currentInd--;
  //     imgContent.setAttribute('src', imges[currentInd].src)
  //   }

  //   })
  //   //right button
  //   rightArrow.addEventListener('click',()=>{
  //    if(currentInd==imges.length-1){
  //      currentInd=0;
  //      imgContent.setAttribute('src', imges[currentInd].src)
  //    }
  //   else{
  //     currentInd++;
  //     imgContent.setAttribute('src', imges[currentInd].src)
  //   }
  //   })
  //  document.addEventListener('keydown',(e)=>{
  //  if(e.key=='Enter')
  //   modal.classList.remove('d-flex')
  //  })
}
