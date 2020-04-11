const mongoose = require('mongoose');

const FoodDiarySchema = mongoose.Schema({
	username: {
		type: String,
		required: true
	},
	date: {
        type: Date,
        default: Date.now,
        required: true
    },
    meals: [{
        breakfast: Array,
        lunch: Array,
        dinner: Array
    }]
}, {
    collection: 'food-diaries'
});

const FoodDiary = mongoose.model('FoodDiary', FoodDiarySchema);
module.exports = FoodDiary;
