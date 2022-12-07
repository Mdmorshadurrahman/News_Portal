const loadCategory = () => {
    document.getElementById('spinner').classList.remove('hidden');
    const url = 'https://openapi.programming-hero.com/api/news/categories';
    fetch(url)
        .then(res => res.json())
        .then(data => showCategory(data.data.news_category))

}
let tempID = 0;
const showCategory = (categories) => {
    console.log('inside category', categories)
    const categoryContainer = document.getElementById('categoryList');
    const hiddenMenuCategories = document.getElementById('hidden_menu_list');
    document.getElementById('spinner').classList.add('hidden');
    categories.forEach(category => {
        const categoriesDiv = document.createElement('div');
        const hiddenMenuCategoriesli = document.createElement('li');
        categoriesDiv.classList.add('categories');
        categoriesDiv.innerHTML = `
        <button onclick="temporary('${category.category_id}')" class="max-lg:hidden btn btn-outline hover:bg-red-600 px-3 py-1" id='newsButton${category.category_id}'>${category.category_name}</button>
        `;
        hiddenMenuCategoriesli.innerHTML = `
        <button onclick="temporary('${category.category_id}')" class="lg:hidden btn btn-outline hover:bg-red-600 px-3 py-1" id='newsButton${category.category_id}'>${category.category_name}</button>
        `;
        categoryContainer.appendChild(categoriesDiv);
        hiddenMenuCategories.appendChild(hiddenMenuCategoriesli);

    });
    // tempID = category.category_id;
    getNews(categories[Math.floor(Math.random() * 7)].category_id, tempID);
    //  

}
const temporary = (data) => {
    console.log('tempid in temp', tempID);
    const previousstyle = document.getElementById('newsButton' + tempID);
    previousstyle.style.color = 'hsl(var(--bc)/var(--tw-text-opacity))';
    previousstyle.style.opacity = '1';
    previousstyle.style.backgroundColor = '#0000';
    previousstyle.style.borderRadius = 'var(--rounded-btn,.5rem);';
    previousstyle.style.borderColor = 'currentcolor';
    previousstyle.style.borderWidth = 'var(--border-btn,1px)';
    getNews(data);
}
const getNews = (id) => {
    tempID = id;
    console.log('tempID id inside function', tempID);
    console.log('current id inside function', id);

    const buttonstyle = document.getElementById('newsButton' + id);
    buttonstyle.classList.add("btn-active");
    buttonstyle.style.backgroundColor = 'rgb(219, 42, 42)';
    buttonstyle.style.padding = '4px 12px';
    buttonstyle.style.border = '2px solid black';
    const newsUrl = `https://openapi.programming-hero.com/api/news/category/${id}`;
    fetch(newsUrl)
        .then(res => res.json())
        .then(data => sortData(data.data))
}

const sortData = (data) => {
    const selectData = document.getElementById('select');
    console.log(selectData.innerText);
    document.getElementById('views').addEventListener('click', function () {
        const selectData = document.getElementById('select');
        selectData.innerText = 'Views';
        sortData(data);
    });

    document.getElementById('ratings').addEventListener('click', function () {
        const selectData = document.getElementById('select');
        selectData.innerText = 'Ratings';
        sortData(data);
    });

    document.getElementById('trending').addEventListener('click', function () {
        var temparray = [];
        data.map(x => {
            if (x.others_info.is_trending.toString() === "true") {
                temparray.push(x)
            }
        });
        showNews(temparray);
    });

    document.getElementById('todayPick').addEventListener('click', function () {
        var temparray = [];
        data.map(x => {
            if (x.others_info.is_todays_pick.toString() === "true") {
                temparray.push(x);
            }
        });
        showNews(temparray);
    });

    if (selectData.innerText === 'VIEWS') {
        data.sort((a, b) => b.total_view - a.total_view);
    }
    else if (selectData.innerText === 'RATINGS') {
        data.sort((a, b) => b.rating.number - a.rating.number);
    }
    else {
        console.log(data);
    }
    showNews(data);
}

const showNews = (newslist) => {
    console.log('entered', newslist[0])
    const newsCardDiv = document.getElementById('newsCardList');
    const itemnumberDivs = document.getElementById('itemnumber');
    itemnumberDivs.innerHTML = '';
    newsCardDiv.innerHTML = '';
    itemnumberDivs.innerHTML = `
        <div class="card w-auto border-2 border-black my-10 mx-20 bg-base-100  max-[400px]:hidden shadow-xl">
            <div class="card-body mx-auto">
                <h2 class="card-title"> <span class="text-red-500 text-2xl "> ${newslist.length} </span> News available in this section</h2>
            </div>
        </div>
        `;
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
        <div class="card xl:card-side bg-base-100 shadow-xl my-10 h-5/6 shadow-green-200 border-2 border-black">
                    <figure><img class="xl:h-full h-76 w-full xl:w-80" src="${news.image_url ? news.image_url : 'no data found'}" alt="Album" />
                    </figure>
                    <div class="card-body xl:w-3/6 w-full bg-white rounded-tr-2xl rounded-br-2xl max-xl:rounded-bl-2xl ">
                        <h2 class="card-title">${news.title ? news.title : "no data"}</h2>
                        <p>${news.details ? news.details : 'no data found'}</p>
                        <div class=" h-12 flex justify-between gap-24 items-center">
                            <div class="h-full flex w-68 flex-column gap-2 max-sm:hidden">
                                <img class="h-full rounded-full" src="${news.author.img ? news.author.img : "no image found"}">
                                <div class=" w-full h-full">
                                    <h5>${news.author.name ? news.author.name : "no data found"}</h5>
                                    <h5 class="text-gray-500">${news.author.published_date ? news.author.published_date.slice(0, 10) : "no data found"}</h5>
                                </div>
                            </div>
                            <div class="max-xl:hidden">
                                <i class="fa-regular fa-eye mr-2"></i>${news.total_view ? news.total_view : "No data Found"}
                            </div>
                            <div class="max-xl:hidden">
                                <i class="fa-solid fa-star-half-stroke"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star mr-2"></i>${news.rating.number ? news.rating.number : "No data Found"}
                            </div>
                            <div class="flex flex-column gap-2 ">
                                <span class="text-2xl mt-1 font-light text-black">Read More</span>
                                <label for="my-modal-3" onclick="getmodaldata('${news._id}')" class="border-2 btn bg-red-500 hover:bg-green-400"><i class=" text-3xl text-white fa-solid fa-play hover:cursor-pointer"></i></label>
                                
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
    getmodalauthor.innerText = data.author.name ? data.author.name : 'no data found';
    getmodaltitle.innerText = data.title ? data.title : 'no data found';
    getmodaldetails.innerText = data.details ? data.details.slice(0, 150) : 'no data found';
    console.log(modalidDiv);
}


loadCategory();
