import api from './apiTemplate.js';
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
    }
    set setData(arr) {
        this._data = arr;
        /*test*/this._data.forEach(e=>{e.discount = Math.round(Math.random() - .25) ? Math.floor(Math.random() * 10) * 10 : 0;e.price = Math.floor(Math.random() * 10) * 10})
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
        const dataSetCategories = function(categories) {
            return categories.map(category=>category.title).join(',');
        }

        const categoriesListItems = function(categories) {
            const listItems = categories.map(category => {
                return `<li title="${category.description}">${category.title}</li>`
            });
            return listItems.join('')
        }

        const calcDiscount = function(discount, price) {
            let discountElement = '';
            if (discount) {
                discountElement = `<div class="discount">
                    -${Math.round((price / (discount + price) - 1)*-100)}%<span>${price + discount}</span>
                </div>`
            }
            return discountElement;
        }

        this._data.forEach(({ categories, description, discount, featuredImage, images, price, title }) => {
            const articleTemplate = document.createElement('template');
            articleTemplate.innerHTML = `<article data-categories="${dataSetCategories(categories)}">
                <img class="image" src="http://localhost:3000/images/${images[featuredImage].id}/large" alt="${images[featuredImage].alt}">
                <div class="content">
                    <h3 class="secondary-heading">${title}</h3>
                    <div class="description">
                        <p title="${description}">${description}</p>
                    </div>
                    <ul class="categories">
                        ${categoriesListItems(categories)}
                    </ul>
                    <div class="price">
                        <div class="price-tag">Price: <span>${price},-</span></div>
                        ${calcDiscount(discount, price)}
                    </div>
                </div>
            </article>`;
            section.appendChild(articleTemplate.content);
        })
    }
}
customElements.define('section-articles', SectionArticles);