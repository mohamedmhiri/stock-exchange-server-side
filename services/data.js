'use strict'
let cheerio = require('cheerio')
const request = require('request')
const fs = require('fs')
const scrapeIt = require('scrape-it')
// url of the ilboursa website
const ilboursa = 'https://lolprofile.net/index.php?page=summoner&ajaxr=1&region=euw&name=Sarbon19&fbclid=IwAR1doHgTrGGS_aWwopGW8n6la2NYBXUFLuqKrLG0YdHE3jEw0g9wGPcS7dI'
const conv = 'https://api.fixer.io/latest'
module.exports = {

  // scrape palmares data from ilboursa website
  getPalmares: function (req, res) {
    // make an HTTP request for the page to be scraped
    request(`${ilboursa}`, (error, response, responseHtml) => {
      // write the entire scraped page to the local file system
      let tunindex = {}
      let $ = cheerio.load(responseHtml)
      let topFive = []
      $('.a3 tr td a img').each((key, value) => {
        // console.log(value)
        topFive[key] = {}
        topFive[key].img = value.attribs.src
        topFive[key].name = value.attribs.title
      })
      var i=0;
      $('.a3 tr td span').each((key, value) => {
      //   console.log(value.children[0],"fin",i)
      // i++
      // console.log(object.size( value.children[0]))
      if(typeof(value.children[0])!="undefined"){
        console.log(value.children[0].data,"fin",i)
        i++
        key++
        topFive[key].img = value.children[0].data
        // for (const [index, element] of Object.entries(value.children[0].data)) {
        //   console.log(`${index}: ${element}`);
        //   console.log("------------------------------------------",index)
        // }
      }
     
    
        // for (const property in value.children[0]) {
        //   console.log(`${property}: ${value.children[property]}`);
        //   console.log("------------------------------------------",i)
        //   i++
        // }
      })
      // $('tr img').each((key, value) => {
      //   console.log(value)
      //   topFive[key].dernier = value.children[0].data
      // })
      // $('tr td').each((key, value) => {
      //   if (value.children[0].data && !value.children[0].next) {
      //     if (key % 7 == 1)
      //       topFive[Math.trunc(key / 7)].haut = value.children[0].data
      //     if (key % 7 == 2)
      //       topFive[Math.trunc(key / 7)].bas = value.children[0].data
      //     if (key % 7 == 4)
      //       topFive[Math.trunc(key / 7)].volume = value.children[0].data
      //     if (key % 7 == 5)
      //       topFive[Math.trunc(key / 7)].variation = value.children[0].data
      //   }
      // })
      /*function Max(item) {
        return Math.max(item.haut)
      }
      let top = []
      top = topFive.filter(Max)
      console.log(topFive)*/
      /*fs.writeFile('./HTML/entire-page.html', JSON.stringify(topFive), (err) => {
        console.log('entire-page.html successfully written to HTML folder')
      })*/
      res.json(topFive)
    })

  },

  // scrape market data from ilboursa website
  // getMarket: function (req, res) {
  //   // make an HTTP request for the page to be scraped
  //   request(`${ilboursa}`, (error, response, responseHtml) => {
  //     // write the entire scraped page to the local file system
  //     let tunindex = {}
  //     let $ = cheerio.load(responseHtml)
  //     let market = []

  //     $('tr a').each((key, value) => {
  //       market[key] = {}
  //       market[key].name = value.children[0].data
  //     })
  //     $('tr b').each((key, value) => {
  //       market[key].dernier = value.children[0].data
  //     })
  //     $('tr td').each((key, value) => {
  //       if (value.children[0].data && !value.children[0].next) {
  //         if (key % 8 == 1)
  //           market[Math.trunc(key / 8)].ouv = value.children[0].data
  //         if (key % 8 == 2)
  //           market[Math.trunc(key / 8)].haut = value.children[0].data
  //         if (key % 8 == 3)
  //           market[Math.trunc(key / 8)].bas = value.children[0].data
  //         if (key % 8 == 4)
  //           market[Math.trunc(key / 8)].volumeTitle = value.children[0].data
  //         if (key % 8 == 5)
  //           market[Math.trunc(key / 8)].volumeDT = value.children[0].data
  //       } else if (value.children[0].name == 'span') {
  //         market[Math.trunc(key / 8)].variation = value.children[0].children[0].data
  //       }
  //     })
  //     /*$('tr td span').each((key, value) => {
  //       market[Math.trunc(key/7)].var = value.children[0].data
  //     })  */
  //     /*function Max(item) {
  //       return Math.max(item.haut)
  //     }
  //     let top = []
  //     top = market.filter(Max)
  //     console.log(market)*/
  //     /*fs.writeFile('./HTML/entire-page.html', JSON.stringify(market), (err) => {
  //       console.log('entire-page.html successfully written to HTML folder')
  //     })*/
  //     res.json(market)
  //   })
  // },
  // convert money
  // convert: function (req, res) {
  //   /*let demo = function (data) {
  //     fx.rates = data.rates
  //     let rate = fx(req.body.value)
  //     .from(req.body.from)
  //     .to(req.body.to)
  //     //alert("£1 = $" + rate.toFixed(4))
  //   }*/

  //   //$.getJSON("", demo)
  //   request(`${conv}?base=${req.body.base}`, (error, response, responseHtml) => {
  //     //console.log(`${response}`)
  //     res.json(JSON.parse(response.body))
  //   })
  // },
  // news
  // getNews: function (req, res) {
  //   request(`${ilboursa}actualites_bourse_tunis.aspx`, (error, response, responseHtml) => {
  //     // write the entire scraped page to the local file system
  //     let tunindex = {}
  //     let $ = cheerio.load(responseHtml)
  //     let news = []

  //     $('tr a').each((key, value) => {
  //       news[key] = {}
  //       news[key].info = value.children[0].data.replace(/\t/g, '').replace(/\n/g, '').replace(/\r/g, '')
  //     })
  //     $('tr .sp1').each((key, value) => {
  //       news[key].date = value.children[0].data
  //     })
  //     res.json(news)
  //   })
  // }

}
