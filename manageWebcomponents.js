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


    const categoriesApiSuccess = function({ data: categoriesData }) {
        apiDataObj.categoriesData = categoriesData;
        waitingForMainApis -= 1;
        isMainApisDone();
    }

    const categoriesApiError = function(error) {
        console.log(error);
        waitingForMainApis -= 1;
        isMainApisDone();
    };

    api('http://localhost:3000/categories', categoriesApiSuccess, categoriesApiError);


    const bikesApiSuccess = function({ data: bikesData }) {
        apiDataObj.bikesData = bikesData;
        waitingForMainApis -= 1;
        isMainApisDone();
    }
    
    const bikesApiError = function(error) {
        console.log(error);
        waitingForMainApis -= 1;
        isMainApisDone();
    };
    
    api('http://localhost:3000/bikes', bikesApiSuccess, bikesApiError);


    inputCheckboxes.addEventListener('tags-changed', e => {
        sectionArticles.setCurrentCategories = e.target.getTags;
    });
});