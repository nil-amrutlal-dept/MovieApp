var MovieService = require("../services/movies.service");

class MovieController {

    static movieService = new MovieService();

    static searchMovieByKeyword = async (req, res) => {

        if(req.params.search === undefined){
            res.status(400).send({ error: true, message: "Missing Inputs"})
            return;
        }

        if(req.query.sortBy && req.query.sortBy !== "id"  && req.query.sortBy !== "title" ) {
            res.status(400).send({ error: true, message: "Invalid sort"});
            return;
        }


        const data = await this.movieService.searchByKeyword(req.params.search, req.query.sortBy, req.query.lang, req.query.page);
        res.status(200).send({error : false, data});
    }


    static searchMovieById = async (req, res) => {
        
        if(req.params.id === null || !Number(req.params.id)?true:false) {
            res.status(400).send({error: true, message: "Incorrect ID format"});
        }

        const data = await this.movieService.searchById(req.params.id);
        return res.status(200).send(data);
    }

}

module.exports = MovieController;