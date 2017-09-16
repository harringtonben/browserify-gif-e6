"use strict";

let gifArray = [];
const loadCategories = require("./categories");
const loadGifs = require("./gifs");
const printToDom = require("./dom");

const errorFunction = () => {
	console.log("You broke everything. Thanks.");
};

//when GIF loads
const whenGifLoads = function() {
	gifArray = JSON.parse(this.responseText).gifs;
	//load categories
	loadCategories(whenCategoriesLoad, errorFunction);
};

const whenCategoriesLoad = function() {
	let categoryArray = JSON.parse(this.responseText).categories;
	//combine arrays
	combineArrays(categoryArray);
};

const combineArrays = (categories) => {
	categories.forEach((category) => {
		gifArray.forEach((gif) => {
			if (gif.category === category.id) {
				gif.categoryname = category.name;
				gif.categorydataname = category.dataname;
			}
		});
	});
	// call print to dom
	printToDom(gifArray);
};

//TODO: setup 'initializer' - load GIFs
const initializer = () => {
	loadGifs(whenGifLoads, errorFunction);
};

module.exports = initializer;