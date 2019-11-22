class InputCheckboxes extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        const style = document.createElement('link');
        style.rel = 'stylesheet';
        style.href = 'inputCheckboxes.css';
        this.shadowRoot.appendChild(style);
        // this._objTags = [{ name: 'Tag 1', isSelected: false, description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.' }, { name: 'Tag 2', isSelected: false, description: 'Molestias, blanditiis, iste eaque officia tempore temporibus.' }, { name: 'Tag 3', isSelected: true, description: 'Pariatur ipsam eum consequuntur reiciendis veniam doloremque laboriosam earum.' }];
        // this._updateUi(this._objTags);
    }
    _createCheckboxes(_objTags) {
        const ul = document.createElement('ul');
        _objTags.forEach(e => {
            const li = document.createElement('li');
            const checkbox = document.createElement('input');
            const textNode = document.createTextNode(e.name);
            li.appendChild(checkbox);
            li.appendChild(textNode);
            if (e.description) li.setAttribute('title', e.description);
            checkbox.setAttribute('type', 'checkbox');
            checkbox.checked = e.isSelected;
            checkbox.addEventListener('change', this._changeCheckbox.bind(this));
            checkbox.setAttribute('data-name', e.name);
            ul.appendChild(li);
        })
        return ul;
    }
    _changeCheckbox(e) {
        const checkbox = e.target;
        this._objTags.forEach(objE => {
            if (checkbox.dataset.name === objE.name) objE.isSelected = checkbox.checked
        });
        this._updateState(this._objTags);
    }
    get getData() {
        return this._objTags;
    }
    set setData(arr) {
        this._updateUi(arr);
        this._updateState(arr);
    }
    get getTags() {
        return this.tagsArr;
    }
    _updateState(arr) {
        // if ('URLSearchParams' in window) {
        // const tagsArr = arr.filter(tagObj => tagObj.isSelected).map(tagObj => tagObj.name);
        //     const searchParams = new URLSearchParams(window.location.search);
        //     searchParams.set('tags', tagsArr);
        //     const newRelativePathQuery = window.location.pathname + '?' + searchParams.toString();
        //     history.pushState(null, '', newRelativePathQuery);
        // }
        this.tagsArr = arr.filter(tagObj => tagObj.isSelected).map(tagObj => tagObj.name);
        localStorage.tagsArr = JSON.stringify(this.tagsArr);
        this._objTags = arr;
        this._tagsChanged();
    }
    _updateUi(arr) {
        // if ('URLSearchParams' in window) {
        //     const searchParams = new URLSearchParams(window.location.search)
        //     if (searchParams.get('tags')) {
        //         const tagsInUrl = searchParams.get('tags').split(',');
        //         arr.forEach(e => {
        //             tagsInUrl.forEach(f => {
        //                 if (e.name === f) {
        //                     e.isSelected = true;
        //                 }
        //             });
        //             return e;
        //         });
        //     }
        //     console.log(arr)
        // }
        if (localStorage.tagsArr) {
            const tagsInLocalstorage = JSON.parse(localStorage.tagsArr);
            arr.forEach(e => {
                tagsInLocalstorage.forEach(f => {
                    if (e.name === f) {
                        e.isSelected = true;
                    }
                });
                return e;
            });
        }
        const ul = this.shadowRoot.querySelector('ul');
        if (ul) this.shadowRoot.removeChild(ul);
        this.shadowRoot.appendChild(this._createCheckboxes(arr));
    }
    _tagsChanged() {
        const tagsChanged = new Event('tags-changed');
        this.dispatchEvent(tagsChanged);
    }
}

customElements.define('input-checkboxes', InputCheckboxes);