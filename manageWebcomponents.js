import api from './apiTemplate.js';
window.addEventListener('DOMContentLoaded', () => {
    const inputCheckboxes = document.querySelector('input-checkboxes');
    const sectionArticles = document.querySelector('section-articles');

    const inputCheckboxesApiSuccess = function(categoriesData) {
        inputCheckboxes.setData = categoriesData.data.map(obj => {
            return { 
                name: obj.title,
                description: obj.description
            }
        });
        
        const sectionArticlesApiSuccess = function(bikesData) {
            const theData = bikesData.data.map(bikeObj => {
                bikeObj.categories = bikeObj.categories.map(bikeCategory => {
                    categoriesData.data.forEach(categoryObj => {
                        if (bikeCategory === categoryObj.id) {
                            bikeCategory = { "title": categoryObj.title, "description": categoryObj.description }
                        }
                    })
                    return bikeCategory
                });
                return bikeObj;
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