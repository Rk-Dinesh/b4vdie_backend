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

        static async updatetransport(tripid,mode_of_transport,from,to){
            try {
                const query = {tripid : tripid};
                const values = {$set : {mode_of_transport : mode_of_transport, from : from, to : to}};
                
                return await TransportModel.updateOne(query,values)

            } catch (error) {
                throw error;
            }
        }

        static async deletetransport(tripid){
            try {
                const query = {tripid : tripid};
                return await TransportModel.findOneAndDelete(query);

            } catch (error) {
                throw error
            }
        }

        static async gettransport(tripid){
            try {
                const query = {tripid : tripid};
                return await TransportModel.find(query)
            } catch (error) {
                throw error;
            }
        }
};

module.exports = TransportServices;