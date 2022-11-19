const loadCategory = () => {
    const url = 'https://openapi.programming-hero.com/api/news/categories';
    fetch(url)
        .then(res => res.json())
        .then(data => showCategory(data.data.news_category))

}

const showCategory = (categories) => {
    console.log('inside category', categories)
    const categoryContainer = document.getElementById('categoryList');
    categories.forEach(category => {
        const categoriesDiv = document.createElement('div');
        categoriesDiv.classList.add('categories');
        categoriesDiv.innerHTML = `
        <button onclick="getNews('${category.category_id}')" class="px-3 py-1" id='newsButton${category.category_id}'>${category.category_name}</button>
        `;
        categoryContainer.appendChild(categoriesDiv);
    });
    getNews(categories[Math.floor(Math.random() * 7)].category_id);
}

const getNews = (id) => {

    // buttonstyle.style.color = 'white';
    // buttonstyle.style.backgroundColor = 'green';
    // buttonstyle.style.padding = '4px 12px';
    // buttonstyle.style.border = '0px';
    const buttonstyle = document.getElementById('newsButton' + id);
    buttonstyle.style.color = 'white';
    buttonstyle.style.backgroundColor = 'rgb(219, 42, 42)';
    buttonstyle.style.padding = '4px 12px';
    buttonstyle.style.border = '2px solid black';
    const newsUrl = `https://openapi.programming-hero.com/api/news/category/${id}`;
    fetch(newsUrl)
        .then(res => res.json())
        .then(data => showNews(data.data))
}



const showNews = (newslist) => {
    console.log('inside newslist', newslist)
    const newsCardDiv = document.getElementById('newsCardList');
    newsCardDiv.innerHTML = '';
    if (newslist.length === 0) {
        const emptyDiv = document.createElement('div');
        emptyDiv.classList.add('emptyDivStyle');
        emptyDiv.innerText = "CURRENTLY NO DATA AVAILABLE";
        newsCardDiv.appendChild(emptyDiv);
    }
    else {

        newslist.forEach(news => {
            const eachNewsDiv = document.createElement('div');
            eachNewsDiv.innerHTML = `
        <div
                    class="card lg:card-side bg-base-100 shadow-xl my-10 h-5/6 shadow-green-200 border-2 border-black">
                    <figure><img class="h-full w-96" src="${news.image_url ? news.image_url : 'no data found'}" alt="Album" />
                    </figure>
                    <div class="card-body w-3/6 bg-gray-200 rounded-tr-2xl rounded-br-2xl">
                        <h2 class="card-title">${news.title ? news.title : "no data"}</h2>
                        <p>${news.details ? news.details : 'no data found'}</p>
                        <div class=" h-12 flex justify-between gap-24 items-center">
                            <div class="h-full flex w-68 flex-column gap-2">
                                <img class="h-full rounded-full" src="${news.author.img ? news.author.img : "no image found"}">
                                <div class=" w-full h-full">
                                    <h5>${news.author.name ? news.author.name : "no data found"}</h5>
                                    <h5 class="text-gray-500">${news.author.published_date ? news.author.published_date.slice(0, 10) : "no data found"}</h5>
                                </div>
                            </div>
                            <div>
                                <i class="fa-regular fa-eye mr-2"></i>${news.total_view ? news.total_view : "No data Found"}
                            </div>
                            <div class="">
                                <i class="fa-solid fa-star-half-stroke"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star mr-2"></i>${news.rating.number ? news.rating.number : "No data Found"}
                            </div>
                            <div class="flex flex-column gap-2 ">
                                <span class="text-2xl mt-1 font-light text-black">Read More</span>
                                <label for="my-modal-3" onclick="getmodaldata('${news._id}')" class="border-2 btn bg-gray-200 hover:bg-green-500"><i class=" text-3xl text-red-600 fa-solid fa-play hover:cursor-pointer"></i></label>
                                
                            </div>
                        </div>
                    </div>
                </div>
    `;
            newsCardDiv.appendChild(eachNewsDiv);
        });
    }
}
const getmodaldata = (newsId) => {
    const modalurl = `https://openapi.programming-hero.com/api/news/${newsId}`;
    fetch(modalurl)
        .then(res => res.json())
        .then(data => showmodaldata(data.data[0]))
}

const showmodaldata = (data) => {

    const modalidDiv = document.getElementById('modalId');
    const getmodaltitle = document.getElementById('modaltitle');
    const getmodaldetails = document.getElementById('modaldetails');
    const getmodalauthor = document.getElementById('modalauthor');
    // modalidDiv.innerHTML = '';
    // const modalidDivtry = document.createElement('div');
    getmodalauthor.innerText = data.author.name ? data.author.name : 'no data found';
    getmodaltitle.innerText = data.title ? data.title : 'no data found';
    getmodaldetails.innerText = data.details ? data.details.slice(0, 150) : 'no data found';
    // modalidDiv.innerHTML = `
    // <input type="checkbox" id="my-modal-3" class="modal-toggle" />
    //     <div class="modal">
    //         <div class="modal-box relative">
    //             <label for="my-modal-3" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
    //             <h3 class="text-lg font-bold">Title: ${data.title ? data.title : "no data found"}</h3>
    //             <p class="py-4">details: ${data.details ? data.details.slice(0, 20) : "no data found"}
    //             </p>
    //             <h5>Written by: ${data.author.name ? data.author.name : "no data found"}</h5>
    //         </div>
    //     </div>
    // `;
    // modalidDiv.appendChild(modalidDivtry);
    console.log(modalidDiv);
}

loadCategory();
