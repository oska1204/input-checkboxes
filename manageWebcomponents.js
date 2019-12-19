import api from './apiTemplate.js';
window.addEventListener('DOMContentLoaded', () => {
    const inputCheckboxes = document.querySelector('input-checkboxes');
    const sectionArticles = document.querySelector('section-articles');
    
    const apiDataObj = {};
    
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
        
        
        let waitingForImageApis = bikesArr.length;
        
        const isImageApisDone = function() {
            if (waitingForImageApis === 0) {
                sectionArticles.setData = bikesArr;
                sectionArticles.setCurrentCategories = inputCheckboxes.getTags;
            }
        }
        
        bikesArr.forEach(bikesObj => {
            const imageApiSuccess = function({ data: imageData }) {
                bikesObj.images[bikesObj.featuredImage] = imageData;
                waitingForImageApis -= 1;
                isImageApisDone();
            }
            
            const imageApiError = function(error) {
                console.log(error);
                waitingForImageApis -= 1;
                isImageApisDone();
            }
            
            api(`http://localhost:3000/images/${bikesObj.images[bikesObj.featuredImage]}`, imageApiSuccess, imageApiError);
        });
    }


    let waitingForMainApis = 2;

    const isMainApisDone = function() {
        if (waitingForMainApis === 0) {
            responseHandler(apiDataObj);
        }
        return waitingForMainApis > 0 ? false : true ;
    }

    const apiEazy2Read = function(name) {
        const success = function(apiJson) {
            apiDataObj[name] = apiJson.data;
            waitingForMainApis -= 1;
            isMainApisDone();
        }
        const error = function(error) {
            console.log(error);
            waitingForMainApis -= 1;
            isMainApisDone();
        }
        return {success, error};
    }

    const { success: categoriesApiSuccess, error: categoriesApiError } = apiEazy2Read('categoriesData');

    api('http://localhost:3000/categories', categoriesApiSuccess, categoriesApiError);


    const { success: bikesApiSuccess, error: bikesApiError } = apiEazy2Read('bikesData');
    
    api('http://localhost:3000/bikes', bikesApiSuccess, bikesApiError);


    inputCheckboxes.addEventListener('tags-changed', e => {
        sectionArticles.setCurrentCategories = e.target.getTags;
    });
});