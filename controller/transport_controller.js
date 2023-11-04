const TransportServices = require('../services/transport_services');

exports.transport = async(req,res,next) => {
    try {
        const {tripid,mode_of_transport,from,to} = req.body;
        const Data = TransportServices.createtransport(tripid,mode_of_transport,from,to);
        let transportData = {tripid,mode_of_transport : mode_of_transport,from : from,to : to}
        res.status(200).json(transportData);
    } catch (error) {
        next(error)
    }
}