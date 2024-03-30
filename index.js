// import the modules

const express = require('express');
const request = require('request-promise');
// const axios = require('axios');
const env = require('dotenv');
env.config();
 

const generateScraperUrl = (api_key)=>{
    // const apiKey = process.env.APIKEY;
    return `http://api.scraperapi.com?api_key=${api_key}&autoparse=true`;
}


// initialize the app
const app = express();
const PORT = process.env.PORT || 5000;

// allow application to parse json inputs
app.use(express.json());

// creating app route
app.get('/',(request,response)=>{
    response.send("Welcome to our API")
})

// get request 

// :" symbol is used to indicate a placeholder or a parameter
app.get(`/product/:productID`,async(req,res)=>{
    // get the product id from the parameters
    const { productID } = req.params;
    const { api_key } = req.query;

    try {
        // get the response from scrapper api from amazon website
        // dp is product details
        const response = await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.in/dp/${productID}`);

        // return the response
        res.json(JSON.parse(response))
    } catch (error) {
        res.json(error)
    }
})

// product reviews
app.get(`/product/:productID/reviews`,async(req,res)=>{
    // get the product id from the parameters
    const {productID} = req.params;
    const {api_key} = req.query;

    try {
        // get the response from scrapper api from amazon website
        // dp is product details
        const response = await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.in/product-reviews/${productID}`);

        // return the response
        res.json(JSON.parse(response))
    } catch (error) {
        res.json(error)
    }
})

// offers
app.get(`/product/:productID/offers`,async(req,res)=>{
    // get the product id from the parameters
    const {productID} = req.params;
    const {api_key} = req.query;

    try {
        // get the response from scrapper api from amazon website
        // dp is product details
        const response = await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.in/gp/offer-listing/${productID}`);

        // return the response
        res.json(JSON.parse(response))
    } catch (error) {
        res.json(error)
    }
})

// serach results
app.get(`/search/:searchQuery`,async(req,res)=>{
    // get the product id from the parameters
    const {searchQuery} = req.params;
    const {api_key} = req.query;

    try {
        // get the response from scrapper api from amazon website
        // dp is product details
        const response = await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.in/s?k=${searchQuery}`);

        // return the response
        res.json(JSON.parse(response))
    } catch (error) {
        res.json(error)
    }
})

app.listen(PORT, ()=>{
      console.log("Successfully listening",`http://localhost:${PORT}`)
})
