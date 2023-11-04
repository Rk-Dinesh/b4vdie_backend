const TransportServices = require('../services/transport_services');

exports.transport = async(req,res,next) => {
    try {
        const {tripid,mode_of_transport,from,to} = req.body;

        const Data = TransportServices.createtransport(tripid,mode_of_transport,from,to);
        let transportData = {tripid,mode_of_transport : mode_of_transport,from : from,to : to};

        res.status(200).json(transportData);

    } catch (error) {
        next(error)
    }
}

exports.update = async (req,res,next) => {
    try {
        const {tripid,mode_of_transport,from,to} = req.body;

        const updateData = await TransportServices.updatetransport(tripid,mode_of_transport,from,to);

        res.status(200).json(updateData);
    } catch (error) {
        next(error)
    }
}

exports.delete = async (req,res,next) => {
    try {
        const {tripid} = req.body;

        const deleteData = await TransportServices.deletetransport(tripid);
        res.status(200).json(deleteData);

    } catch (error) {
       next(error) 
    }
}

exports.get = async (req,res,next) => {
    try {
        const {tripid} = req.body;
        const getData = await TransportServices.gettransport(tripid);
        res.status(200).json(getData)
    } catch (error) {
        next(error)
    }
}