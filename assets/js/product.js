const getProduct=async ()=>{
    const params=new URLSearchParams(window.location.search).get('id')
    console.log(params)
    const {data}=await axios.get(`https://dummyjson.com/product/${params}`);
    console.log(data)
 return data;
}
const displayProduct=async ()=>{
    const data=await getProduct()
    console.log(data)
    const content=`<div class='product-content'>
    <img src='${data.thumbnail}' alt='${data.title}'>
    <h3>${data.title}</h3>
    </div>`
    document.querySelector('.product .row').innerHTML=content;
    }
    displayProduct()