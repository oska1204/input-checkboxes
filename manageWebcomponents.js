window.addEventListener('DOMContentLoaded', () => {
    const inputCheckboxes = document.querySelector('input-checkboxes');
    const sectionArticles = document.querySelector('section-articles');

    const sectionArticlesApiSuccess = function(parsedData) {
        sectionArticles.setData = parsedData.data;
        sectionArticles.setCurrentCategories = inputCheckboxes.getTags;
    }
    const sectionArticlesApiError = function(error) {
        console.log(error);
    };
    sectionArticles.api('http://localhost:3000/bikes', sectionArticlesApiSuccess, sectionArticlesApiError);
    
    const inputCheckboxesApiSuccess = function(parsedData) {
        inputCheckboxes.setData = parsedData.data.map(obj => {
            return { 
                name: obj.title,
                description: obj.description
            }
        });
    }
    const inputCheckboxesApiError = function(error) {
        console.log(error);
    };
    sectionArticles.api('http://localhost:3000/categories', inputCheckboxesApiSuccess, inputCheckboxesApiError);

    inputCheckboxes.addEventListener('tags-changed', e => {
        sectionArticles.setCurrentCategories = e.target.getTags;
    });
});