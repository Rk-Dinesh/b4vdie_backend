const TransportModel = require('../model/transport_model');

class TransportServices {
        static async createtransport(tripid,mode_of_transport,from,to){
            try {
                const transport = new TransportModel({tripid,mode_of_transport,from,to});
                return await transport.save();
            } catch (error) {
                throw error;
            }
        }
};

module.exports = TransportServices;