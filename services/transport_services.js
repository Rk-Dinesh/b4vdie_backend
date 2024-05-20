const TransportModel = require('../model/transport_model');
const idcode_services = require('./idcode_services');

class TransportServices {
        static async createtransport(transportid,tripid,mode_of_transport,from,to,orgin_lat,orgin_lon,des_lat,des_lon){
            try {
                var transportid = await idcode_services.generateCode('TransportId');
                const transport = new TransportModel({transportid,tripid,mode_of_transport,from,to,orgin_lat,orgin_lon,des_lat,des_lon});
                return await transport.save();
            } catch (error) {
                throw error;
            }
        }

        static async updatetransport(transportid,tripid,mode_of_transport,from,to,orgin_lat,orgin_lon,des_lat,des_lon){
            try {
                const query = {transportid : transportid};
                const values = {$set : {tripid,mode_of_transport : mode_of_transport, from : from, to : to,orgin_lat:orgin_lat,orgin_lon:orgin_lon,des_lat:des_lat,des_lon:des_lon}};
                
                return await TransportModel.updateOne(query,values)

            } catch (error) {
                throw error;
            }
        }

        static async deletetransport(transportid){
            try {
                const query = {transportid : transportid};
                return await TransportModel.findOneAndDelete(query);

            } catch (error) {
                throw error
            }
        }

        static async delete(tripid){
            try{
                var query = {tripid : tripid};
                return await TransportModel.deleteMany(query);
    
            }catch(error){
                throw error;
            }
        }

        static async gettransport(tripid){
            try {
                
                return await TransportModel.find({tripid})
            } catch (error) {
                throw error;
            }
        }
};

module.exports = TransportServices;