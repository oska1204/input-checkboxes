class SectionArticles extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        const style = document.createElement('link');
        style.rel = 'stylesheet';
        style.href = 'sectionArticles.css';
        this.shadowRoot.appendChild(style);
        this.shadowRoot.innerHTML += `
        <section>
            <h2 class="primary-heading">List of cats</h2>
            <article>
                <img src="http://placekitten.com/400/300" alt="kitten">
                <h3 class="secondary-heading">This is a Cat</h3>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis iste similique eum sequi hic suscipit quibusdam. Voluptas quasi suscipit, dolorum alias soluta totam distinctio autem quam! Alias ratione dolore praesentium animi? Ullam, molestias repellendus natus officiis non consequatur repudiandae temporibus consectetur rem numquam quae quia reiciendis ipsa expedita dolores adipisci.</p>
            </article>
        </section>
        `;
    }
}
customElements.define('section-articles', SectionArticles)