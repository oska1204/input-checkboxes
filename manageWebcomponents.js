import api from './apiTemplate.js';
window.addEventListener('DOMContentLoaded', () => {
    const inputCheckboxes = document.querySelector('input-checkboxes');
    const sectionArticles = document.querySelector('section-articles');

    const inputCheckboxesApiSuccess = function(parsedDataInputCheckboxes) {
        inputCheckboxes.setData = parsedDataInputCheckboxes.data.map(obj => {
            return { 
                name: obj.title,
                description: obj.description
            }
        });
        
        const sectionArticlesApiSuccess = function(parsedDataSectionArticles) {
            const theData = parsedDataSectionArticles.data;            
            theData.forEach(dataElement => {
                dataElement.categories = dataElement.categories.map(categorie => {
                    parsedDataInputCheckboxes.data.forEach(e => {
                        if (categorie === e.id) {
                            categorie = e.title
                        }
                    })
                    return categorie
                });
                console.log(dataElement.categories)
            });
            sectionArticles.setData = theData;
            sectionArticles.setCurrentCategories = inputCheckboxes.getTags;
        }
    
        const sectionArticlesApiError = function(error) {
            console.log(error);
        };

        api('http://localhost:3000/bikes', sectionArticlesApiSuccess, sectionArticlesApiError);
    }

    const inputCheckboxesApiError = function(error) {
        console.log(error);
    };

    api('http://localhost:3000/categories', inputCheckboxesApiSuccess, inputCheckboxesApiError);

    inputCheckboxes.addEventListener('tags-changed', e => {
        sectionArticles.setCurrentCategories = e.target.getTags;
    });
});