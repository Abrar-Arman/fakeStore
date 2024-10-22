const getProduct=async ()=>{
    const params=new URLSearchParams(window.location.search).get('category')
    const {data}=await axios.get(`https://dummyjson.com/products/category/${params}`);
 return data.products;
}
const displayProduct=async ()=>{
    const data=await getProduct()
    const content=data.map((product)=>`<div class='product-content'>
    <img src='${product.thumbnail}' alt='${product.title}'>
    <h3>${product.title}</h3>
    </div>`).join('')
    document.querySelector('.product .row').innerHTML=content;
    }
    displayProduct()
