/**
 Hey, it's me yana :)
 thanks for this oppertunity.I got confused and wasted a lot of time trying to set up a mongoDB cluster, connecting it with a MONGO_URI, creating schemas for the mongoDB collections, and its just got me confused even know i did it before. 
 I hope what i produced is enough. I would really love to get an oppertuity to showcase my skills to you :)
 */

const express = require("express");
const app = express();

//data - movies screenings and tickets data
const moviesData = require("./data/movie");
const screeningData = require("./data/screening");
const ticketsData = require("./data/tickets");

//middelware
const notFoundMiddelware = require("./middelwares/not-found");

//section 1: get theaters by movie name and date. expecting two query params, name and date. endpoint is /gettheaters
app.get("/gettheaters", (req, res) => {
  const movieName = req.query.name;
  const date = req.query.date;
  const res_movies = [];
  console.log(movieName, date);
  screeningData.forEach((movie) => {
    if (movie.movie === movieName && movie.date === date) {
      res_movies.push(movie.theater);
    }
  });
  res.send(res_movies);
});

// section 2: get movies by complex and date. expecting two query params, name and date. endpoint is /getmovies
app.get("/getmovies", (req, res) => {
  //could use diconstractig object :  {name, date = req.query} instead
  const complexName = req.query.name;
  const date = req.query.date;
  const res_movies = [];
  console.log(complexName, date);
  screeningData.forEach((movie) => {
    if (movie.complex === complexName && movie.date === date) {
      res_movies.push(movie.movie);
    }
  });
  res.send(res_movies);
});

//section 3: adding a new ticket to the system/data
app.post("/buyticket", (req, res) => {
  try {
    const newTicket = ({ movie, date, theater, complex } = req.query);
    newTicket.id = ticketsData.length + 1;
    ticketsData.push(newTicket);
    //   res.send(ticketsData, newTicket.id);
    console.log(newTicket.id);
    res.sendStatus(200).send(newTicket.id);
  } catch (error) {
    res.status(500).send("failed adding the ticket");
  }
});

app.get("/validateTicket", (req, res) => {
  const ticketID = req.query.id;
  ticketsData.forEach((ticket) => {
    if (ticketID == ticket.id) {
      res.sendStatus(200).send("ticket is valid");
    }
  });
});

const startServer = () => {
  try {
    app.listen(3000, () => {
      console.log("server is listning");
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
