import api from './apiTemplate.js';
class SectionArticles extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this._data = [];
        this.api = api;
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
    }
    set setData(arr) {
        this._data = arr;
        /*test*/this._data.forEach(e=>{e.discount = Math.round(Math.random() - .25) ? Math.floor(Math.random() * 10) * 10 : 0;e.price = Math.floor(Math.random() * 10) * 10})
        this._createArticles(this._section);
        /*test*/this._section.querySelectorAll('img').forEach(e=>e.src = `https://placekitten.com/${Math.floor(Math.random() * 5) + 400}/${Math.floor(Math.random() * 3)+ 200}`)
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
        const section = this.shadowRoot.querySelector('section');
        if (!hasArticle && !errorNode) {
            section.style.display = 'none';
            const errorTemplate = document.createElement('template');
            errorTemplate.innerHTML = `<div class="error">
                <h3>No articles selected.</h3>
            </div>`;
            this.shadowRoot.appendChild(errorTemplate.content)
        } else if (hasArticle && errorNode) {
            section.style.display = '';
            errorNode.parentNode.removeChild(errorNode);
        }
    }
    _createArticles(section) {
        this._data.forEach(e => {
            const articleTemplate = document.createElement('template');
            articleTemplate.innerHTML = `<article data-categories="${e.categories}">
                <img class="image" src="${e.images[e.featuredImage]}" alt="${e.images[e.featuredImage]}">
                <div class="content">
                    <h3 class="secondary-heading">${e.title}</h3>
                    <div class="description">
                        <p title="${e.description}">${e.description}</p>
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
                </div>
            </article>`
            section.appendChild(articleTemplate.content);
        })
    }
}
customElements.define('section-articles', SectionArticles);