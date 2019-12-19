import api from './apiTemplate.js';
window.addEventListener('DOMContentLoaded', () => {
    const inputCheckboxes = document.querySelector('input-checkboxes');
    const sectionArticles = document.querySelector('section-articles');
    
    const apiDataObj = {};
        
    const createDeducter = function(amount, handler, passHandler = undefined) {
        return () => amount === 1 ? passHandler ? handler(passHandler) : handler() : amount-- ;
    }

    const apiHandler = function(name, path, deducter) {
        const success = function(apiJson) {
            path[name] = apiJson.data;
            deducter();
        }
        const error = function(error) {
            console.log(error);
            deducter();
        }
        return {success, error};
    }

    const responseHandler = function({ categoriesData, bikesData }) {
        inputCheckboxes.setData = categoriesData.map(categoryObj => {
            return {
                name: categoryObj.title,
                description: categoryObj.description
            }
        });
        const bikesArr = bikesData.map(bikeObj => {
            bikeObj.categories = bikeObj.categories.map(bikeCategory => {
                categoriesData.forEach(categoryObj => {
                    if (bikeCategory === categoryObj.id) {
                        bikeCategory = {
                            "title": categoryObj.title,
                            "description": categoryObj.description
                        }
                    }
                });
                return bikeCategory;
            });
            return bikeObj;
        });

        const imageHandler = function() {
            sectionArticles.setData = bikesArr;
            sectionArticles.setCurrentCategories = inputCheckboxes.getTags;
        }
        
        const imageApiDeducter = createDeducter(bikesArr.length, imageHandler);
        
        bikesArr.forEach(bikesObj => {
            const { success: imageApiSuccess, error: imageApiError } = apiHandler(bikesObj.featuredImage, bikesObj.images, imageApiDeducter);
            
            api(`http://localhost:3000/images/${bikesObj.images[bikesObj.featuredImage]}`, imageApiSuccess, imageApiError);
        });
    }
    
    const mainApiDeducter = createDeducter(2, responseHandler, apiDataObj);
    
    const { success: categoriesApiSuccess, error: categoriesApiError } = apiHandler('categoriesData', apiDataObj, mainApiDeducter);

    api('http://localhost:3000/categories', categoriesApiSuccess, categoriesApiError);
    
    
    const { success: bikesApiSuccess, error: bikesApiError } = apiHandler('bikesData', apiDataObj, mainApiDeducter);
    
    api('http://localhost:3000/bikes', bikesApiSuccess, bikesApiError);
    
    
    inputCheckboxes.addEventListener('tags-changed', e => {
        sectionArticles.setCurrentCategories = e.target.getTags;
    });
});
