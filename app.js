require('dotenv').config()

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();
const data = require('./data.json');
const e = require('express');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;


//1
// app.get("/companies", (req, res) => {
//     let firstPage = data.companies.splice(0,20)
//     console.log(firstPage.length)
//     res.send(firstPage)
//   });



//GET
app.get("/companies", (req,res) => {
    const page = req.query.page
    const name = req.query.name
    const title = req.query.title
    const city = req.query.city
    const citiesParams = req.query.cities

   

    if (page){
        let companyName = data.companies.splice(page*20-20,page*20)
        console.log(page)
        console.log(companyName.length)
        res.send(companyName)
    }   
    

    if (name){
        let filteredCompanies = [data.companies.filter((c) => c.name==name || c.name==name.toLowerCase)]
        console.log(filteredCompanies.length)
        res.send(filteredCompanies)
    }

    if (title){
        let filteredCompanies = data.jobs.filter((c) => c.title.includes(title || title.toLocaleLowerCase))
        console.log(filteredCompanies.length)

        res.send(filteredCompanies)
    }

    if (city){
        let filteredCompanies = data.jobs.filter((c) => c.city==city || c.city==city.toLowerCase)
        console.log(filteredCompanies.length)

        res.send(filteredCompanies)
    }

    if(citiesParams){
        let cities = citiesParams.split(',')
        let filteredCompanies=[]
        for (companies='',i=0; i< cities.length; i++){
        companies = data.jobs.filter((c) => c.city == cities[i] || c.city == cities[i].toLowerCase)
        filteredCompanies.push(companies)
    }
    
        console.log(filteredCompanies.length)

        res.send(filteredCompanies)
    }


   
})


//PATCH
app.patch("/companies/:id", (req, res) => {
    
    let companies = data.companies.map((c) => {
        if (c.id == req.params.id) {
            c.enterprise = true;
        }
        return c
    })

    res.send(companies);
})


//DELETE
app.delete("/companies/:id", (req,res)=>{
    company = data.companies.reduce((result, c) =>{
        if (c.id == req.params.id){
            result.push(c)
        }
        return result
    }, [])
    res.send(company)
})
