import api from './apiTemplate.js';
window.addEventListener('DOMContentLoaded', () => {
    const inputCheckboxes = document.querySelector('input-checkboxes');
    const sectionArticles = document.querySelector('section-articles');

    const categoriesApiSuccess = function(categoriesData) {
        inputCheckboxes.setData = categoriesData.data.map(obj => {
            return { 
                name: obj.title,
                description: obj.description
            }
        });
        
        const bikesApiSuccess = function(bikesData) {
            const theData = bikesData.data.map(bikeObj => {
                bikeObj.categories = bikeObj.categories.map(bikeCategory => {
                    categoriesData.data.forEach(categoryObj => {
                        if (bikeCategory === categoryObj.id) {
                            bikeCategory = { "title": categoryObj.title, "description": categoryObj.description }
                        }
                    });
                    return bikeCategory
                });
                return bikeObj;
            });
            const howManyPendingArr = theData.map(e=>false);
            theData.forEach(e => {
                const imagesApiSuccess = function(bikesData) {
                    howManyPendingArr.pop();
                    e.images[e.featuredImage] = bikesData.data;
                    checkIfDone();
                }
                
                const checkIfDone = function() {
                    if (!howManyPendingArr.includes(false)) {
                        sectionArticles.setData = theData;
                        sectionArticles.setCurrentCategories = inputCheckboxes.getTags;
                    }
                }
                const imagesApiError = function(bikesData) {
                    console.log(error);
                }

                api(`http://localhost:3000/images/${e.images[e.featuredImage]}`, imagesApiSuccess, imagesApiError);
            });
        }
    
        const bikesApiError = function(error) {
            console.log(error);
        };

        api('http://localhost:3000/bikes', bikesApiSuccess, bikesApiError);
    }

    const categoriesApiError = function(error) {
        console.log(error);
    };

    api('http://localhost:3000/categories', categoriesApiSuccess, categoriesApiError);

    inputCheckboxes.addEventListener('tags-changed', e => {
        sectionArticles.setCurrentCategories = e.target.getTags;
    });
});