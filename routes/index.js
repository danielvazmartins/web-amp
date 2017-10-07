var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');

/* GET home page. */
router.get('/', function(req, res, next) {

	request('http://lfmorau.com/', function(error, response, body) {

		if ( response.statusCode == 200 ) {

			var $ = cheerio.load(body);

			var newsList = [];
			$('.news-page-builder-wrap .ag-news-block').each(function() {
				var news = {};
				news.title = $('.ag-news-block-title', this).text();
				news.subTitle = $('.entry-title a', this).text();
				news.resumo = $('.news-list-excerpt').html();
				newsList.push(news);
			});

			res.render('index', { 
				newsList: newsList
			});
		}
	});
  	
});

module.exports = router;
