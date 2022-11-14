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
        <button onclick="getNews('${category.category_id}')">${category.category_name}</button>
        `;
        categoryContainer.appendChild(categoriesDiv);
    });
}

const getNews = (id) => {
    const newsUrl = `https://openapi.programming-hero.com/api/news/category/${id}`;
    fetch(newsUrl)
        .then(res => res.json())
        .then(data => showNews(data.data))
}

const showNews = (newslist) => {
    const newsCardDiv = document.getElementById('newsCardList');
    newsCardDiv.innerHTML = '';
    newslist.forEach(news => {
        const eachNewsDiv = document.createElement('div');
        eachNewsDiv.innerHTML = `
        <div class="card lg:card-side bg-base-100 shadow-xl shadow-green-200">
                    <figure><img src="${news.image_url}" alt="Album" /></figure>
                    <div class="card-body">
                        <h2 class="card-title">${news.title}</h2>
                        <p>${news.details}</p>
                        <div class="card-actions justify-end">
                            <i onclick="" class="text-5xl text-rose-600 fa-solid fa-play"></i>
                        </div>
                    </div>
                </div>
    `;
        newsCardDiv.appendChild(eachNewsDiv);
    });
}

loadCategory();
