class SectionArticles extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this._data = [
            {
                "images": [
                    "http://placekitten.com/300/250",
                    "http://placekitten.com/400/250"
                ],
                "featuredImage": 0,
                "discount": 150,
                "categories": [
                    "Foldecycle",
                    "Lorem",
                    "Ipsum"
                ],
                "title": "BIOMEGA AMS",
                "description": "Biomega AMS is a uniquely designed, stylish and  low maintenance electric bike that is well suited to cycling in the city.\n\nSpecial parts to compare when testing:\n\nCarbon belt drive\n\nFront wheel motor\n\n374.4 Wh battery, 45–65 km range",
                "price": 349,
                "id": "5dc001d0a5bf8851702cec2e"
            }, {
                "images": [
                    "http://placekitten.com/300/260",
                    "http://placekitten.com/400/260"
                ],
                "featuredImage": 0,
                "discount": 0,
                "categories": [
                    "El-cycle",
                ],
                "title": "BIOMEGA AMS",
                "description": "Biomega AMS is a uniquely designed, stylish and  low maintenance electric bike that is well suited to cycling in the city.\n\nSpecial parts to compare when testing:\n\nCarbon belt drive\n\nFront wheel motor\n\n374.4 Wh battery, 45–65 km range",
                "price": 100,
                "id": "5dc001d0a5bf8851702cec2e"
            }
        ]
        const style = document.createElement('link');
        style.rel = 'stylesheet';
        style.href = 'sectionArticles.css';
        this.shadowRoot.appendChild(style);
        this.shadowRoot.innerHTML += `
        <h2 class="primary-heading">List of cats</h2>
        <section>
        ${this._data.map(e => {
            return `<article data-categories="${e.categories}">
                <div class="image" style="background-image: url(${e.images[e.featuredImage]})" alt="kitten"></div>
                <h3 class="secondary-heading">${e.title}</h3>
                <div class="description">
                    <p>${e.description}</p>
                </div>
                <ul class="categories">
                ${e.categories.map(f => {
                return `<li>${f}</li>`
            }).join('')}
                </ul>
                <div class="price">
                    <div class="price-tag">Price: <span>${e.price},-</span></div>
                    ${e.discount ? `<div class="discount">${Math.floor((e.price / (e.discount + e.price) - 1)*-100)}%<span>${e.price + e.discount}</span></div>` : ``}
                </div>
            </article>`
        }).join('')}
        </section>
        `;
        // this.shadowRoot.innerHTML += `
        // <h2 class="primary-heading">List of cats</h2>
        // <section>
        //     <article>
        //         <img src="http://placekitten.com/300/200" alt="kitten">
        //         <h3 class="secondary-heading">This is a Cat</h3>
        //         <div class="description">
        //             <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis iste similique eum sequi hic suscipit quibusdam. Voluptas quasi suscipit, dolorum alias soluta totam distinctio autem quam! Alias ratione dolore praesentium animi? Ullam, molestias repellendus natus officiis non consequatur repudiandae temporibus consectetur rem numquam quae quia reiciendis ipsa expedita dolores adipisci.</p>
        //         </div>
        //         <ul class="categories"><li>Kitten</li><li>Lorem</li><li>Ipsum</li></ul>
        //         <div class="price"><div class="price-tag">Price: <span>350$</span></div><div class="discount">-30%<span>(500$)</span></div></div>
        //     </article>
        // </section>
        // `;
        this._articles = this.shadowRoot.querySelectorAll('article');
    }
    set setCurrentCategories(arr) {
        this._updateUi(arr);
    }
    _updateUi(arr) {
        let hasArticle = false;
        this._articles.forEach(article => {
            const articleCategories = article.dataset.categories.split(',');
            let setBool = true;
            arr.forEach(g => {
                if (articleCategories.includes(g) && setBool) {
                    setBool = true;
                } else {
                    setBool = false;
                }
            });
            setBool ? article.style.display = 'block' : article.style.display = 'none';
            if (!hasArticle && setBool) {
                hasArticle = true;
            }
        });
        const errorDiv = this.shadowRoot.querySelector('.error')
        if (!hasArticle && !errorDiv) {
            const section = this.shadowRoot.querySelector('section');
            const errorDiv = document.createElement('div');
            errorDiv.setAttribute('class', 'error');
            errorDiv.innerHTML = '<h3>No articles selected.</h3>'
            section.appendChild(errorDiv)
        } else if (hasArticle && errorDiv) {
            errorDiv.parentNode.removeChild(errorDiv);
        }
    }
}
customElements.define('section-articles', SectionArticles)
