const loadCategory = () => {
    const url = 'https://openapi.programming-hero.com/api/news/categories';
    fetch(url)
        .then(res => res.json())
        .then(data => showCategory(data.data.news_category))

}

const showCategory = (categories) => {
    console.log(categories)
    const categoryContainer = document.getElementById('categoryList');
    categories.forEach(category => {
        const categoriesDiv = document.createElement('div');
        categoriesDiv.classList.add('categories');
        categoriesDiv.innerHTML = `
        <button onclick="getNews('${category.category_id}')" class="px-3 py-1" id='newsButton${category.category_id}'>${category.category_name}</button>
        `;
        categoryContainer.appendChild(categoriesDiv);
    });
    // const buttonstyle = document.getElementById('newsButton' + id);
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
    const newsCardDiv = document.getElementById('newsCardList');
    newsCardDiv.innerHTML = '';
    newslist.forEach(news => {
        console.log(news);
        const eachNewsDiv = document.createElement('div');
        eachNewsDiv.innerHTML = `
        <div class="card lg:card-side bg-base-100 shadow-xl my-10 h-5/6 shadow-green-200 border-2 border-red-500">
                    <figure><img class="h-full w-96 place-items-center" src="${news ? news.image_url : 'no data found'}" alt="Album" /></figure>
                    <div class="card-body w-3/6">
                        <h2 class="card-title">${news.title ? news.title : "no data"}</h2>
                        <p>${news == '' ? console.log('no data found') : news.details}</p>
                        <div class="card-actions justify-end">
                           <span class="text-2xl font-light text-red-500">Read More</span><i onclick="" class="text-5xl text-rose-600 fa-solid fa-play"></i>
                        </div>
                    </div>
                </div>
    `;
        newsCardDiv.appendChild(eachNewsDiv);
    });
}

loadCategory();
