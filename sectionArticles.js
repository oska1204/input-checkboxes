class SectionArticles extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this._data = [];
        const style = document.createElement('link');
        style.rel = 'stylesheet';
        style.href = 'sectionArticles.css';
        this.shadowRoot.appendChild(style);
        const template = document.createElement('template');
        template.innerHTML += `
        <h2 class="primary-heading">List of cats</h2>
        <section></section>
        `;
        this.shadowRoot.appendChild(template.content);
        this._section = this.shadowRoot.querySelector('section');
        // this._data = [
        //     {
        //         "images": [
        //             "http://placekitten.com/300/250",
        //             "http://placekitten.com/400/250"
        //         ],
        //         "featuredImage": 0,
        //         "discount": 150,
        //         "categories": [
        //             "Foldecycle",
        //             "Lorem",
        //             "Ipsum"
        //         ],
        //         "title": "BIOMEGA AMS",
        //         "description": "Biomega AMS is a uniquely designed, stylish and  low maintenance electric bike that is well suited to cycling in the city.\n\nSpecial parts to compare when testing:\n\nCarbon belt drive\n\nFront wheel motor\n\n374.4 Wh battery, 45–65 km range",
        //         "price": 349,
        //         "id": "5dc001d0a5bf8851702cec2e"
        //     }, {
        //         "images": [
        //             "http://placekitten.com/300/260",
        //             "http://placekitten.com/400/260"
        //         ],
        //         "featuredImage": 0,
        //         "discount": 0,
        //         "categories": [
        //             "El-cycle",
        //         ],
        //         "title": "BIOMEGA AMS",
        //         "description": "Biomega AMS is a uniquely designed, stylish and  low maintenance electric bike that is well suited to cycling in the city.\n\nSpecial parts to compare when testing:\n\nCarbon belt drive\n\nFront wheel motor\n\n374.4 Wh battery, 45–65 km range",
        //         "price": 100,
        //         "id": "5dc001d0a5bf8851702cec2e"
        //     }
        // ];
        // this._createArticles(this._section);
    }
    set setData(arr) {
        this._data = arr;
        this._createArticles(this._section);
    }
    set setCurrentCategories(arr) {
        this._updateUi(arr);
    }
    _updateUi(arr) {
        let hasArticle = false;
        const articles = this.shadowRoot.querySelectorAll('article');
        articles.forEach(article => {
            const articleCategories = article.dataset.categories.split(',');
            let setBool = true;
            arr.forEach(g => {
                if (articleCategories.includes(g) && setBool) {
                    setBool = true;
                } else {
                    setBool = false;
                }
            });
            setBool ? article.style.display = '' : article.style.display = 'none';
            if (!hasArticle && setBool) {
                hasArticle = true;
            }
        });
        const errorNode = this.shadowRoot.querySelector('.error')
        if (!hasArticle && !errorNode) {
            const section = this.shadowRoot.querySelector('section');
            const errorTemplate = document.createElement('template');
            errorTemplate.innerHTML = `<div class="error">
                <h3 class="error">No articles selected.</h3>
            </div>`;
            section.appendChild(errorTemplate.content)
        } else if (hasArticle && errorNode) {
            errorNode.parentNode.removeChild(errorNode);
        }
    }
    _createArticles(section) {
        this._data.forEach(e => {
            const articleTemplate = document.createElement('template');
            articleTemplate.innerHTML = `<article data-categories="${e.categories}">
                <img class="image" src="${e.images[e.featuredImage]}" alt="kitten">
                <h3 class="secondary-heading">${e.title}</h3>
                <div class="description">
                    <p>${e.description}</p>
                </div>
                <ul class="categories">
                    ${e.categories.map(category => {
                    return `<li>${category}</li>`
                    }).join('')}
                </ul>
                <div class="price">
                    <div class="price-tag">Price: <span>${e.price},-</span></div>
                    ${e.discount ? `<div class="discount">${Math.floor((e.price / (e.discount + e.price) - 1)*-100)}%<span>${e.price + e.discount}</span></div>` : ``}
                </div>
            </article>`
            section.appendChild(articleTemplate.content);
        })
    }
}
customElements.define('section-articles', SectionArticles);