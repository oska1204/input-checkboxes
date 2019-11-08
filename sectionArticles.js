class SectionArticles extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this._data = [
            {
                "images": [
                    "http://placekitten.com/300/200",
                    "http://placekitten.com/400/200"
                ],
                "featuredImage": 1,
                "discount": 0,
                "categories": [
                    "5dc001caa5bf8851702cebde"
                ],
                "title": "BIOMEGA AMS",
                "description": "Biomega AMS is a uniquely designed, stylish and  low maintenance electric bike that is well suited to cycling in the city.\n\nSpecial parts to compare when testing:\n\nCarbon belt drive\n\nFront wheel motor\n\n374.4 Wh battery, 45–65 km range",
                "price": 0,
                "id": "5dc001d0a5bf8851702cec2e"
            },            {
                "images": [
                    "http://placekitten.com/300/200",
                    "http://placekitten.com/400/200"
                ],
                "featuredImage": 1,
                "discount": 0,
                "categories": [
                    "5dc001caa5bf8851702cebde"
                ],
                "title": "BIOMEGA AMS",
                "description": "Biomega AMS is a uniquely designed, stylish and  low maintenance electric bike that is well suited to cycling in the city.\n\nSpecial parts to compare when testing:\n\nCarbon belt drive\n\nFront wheel motor\n\n374.4 Wh battery, 45–65 km range",
                "price": 0,
                "id": "5dc001d0a5bf8851702cec2e"
            }
        ]
        const style = document.createElement('link');
        style.rel = 'stylesheet';
        style.href = 'sectionArticles.css';
        this.shadowRoot.appendChild(style);
        this.shadowRoot.innerHTML = `
        <h2 class="primary-heading">List of cats</h2>
        <section>
        ${this._data.map(e => {
            return `<article>
                <img src="http://placekitten.com/300/200" alt="kitten">
                <h3 class="secondary-heading">This is a Cat</h3>
                <div class="description">
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis iste similique eum sequi hic suscipit
                        quibusdam. Voluptas quasi suscipit, dolorum alias soluta totam distinctio autem quam! Alias ratione
                        dolore praesentium animi? Ullam, molestias repellendus natus officiis non consequatur repudiandae
                        temporibus consectetur rem numquam quae quia reiciendis ipsa expedita dolores adipisci.</p>
                </div>
                <ul class="categories">
                    <li>Kitten</li>
                    <li>Lorem</li>
                    <li>Ipsum</li>
                </ul>
                <div class="price">
                    <div class="price-tag">Price: <span>350$</span></div>
                    <div class="discount">-30%<span>(500$)</span></div>
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
    }
}
customElements.define('section-articles', SectionArticles)