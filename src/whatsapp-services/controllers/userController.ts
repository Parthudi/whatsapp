// import { FastifyReply, FastifyRequest } from "fastify";
// import _ from "lodash";

// import UserOperator from "../schema/user";
// // import config from "../../config/appConfig";

// export default class UserController {
//     static async create(req: FastifyRequest, reply: FastifyReply) {
//         try {
//             const body = req.body || {};
//             const user = await new UserOperator(body);
//             const result = _.isEmpty(body) ? function () { throw { error: { message: "Invalid Request", code: 400 } }; }() : await user.save();
//             reply.send(result);
//         } catch (error) {
//             reply.send(error);
//         }
//     }

//     static async read(req: FastifyRequest, reply: FastifyReply) {
//         try {
//             const body = req.body || {};
//             const user = await UserController.findingUser(body);
          
//             const result = _.isEmpty(body) ? function () { throw { error: { message: "Invalid Request", code: 400 } }; }() : user;
//             reply.send(result);
//         } catch (error) {
//             reply.send(error);
//         }
//     }

//     static async update(req: FastifyRequest, reply: FastifyReply){
//             try {
//                 const params = req.params || {};
//                 const id = params["id"] || "";
//                 const updateQuery = req.body || {};
//                 const user = await UserOperator.findById({ _id: id });
//                 const updateResult = await UserOperator.findOneAndUpdate({ _id: id }, { $set: updateQuery }, { upsert: false, new: true }).lean().exec();
//                 if( updateResult ) {
//                     user.modified_at = new Date();
//                     await user.save();
//                 }
//                 reply.send({updateResult});
//             } catch (error) {
//                 reply.send({ error: { message: error.toString(), code: 500 } });
//             }
//         }

//     static async findingUser(req:any): Promise<any> {
//         return new Promise(async(resolve,reject) => {
//         try {
//             const email = req.email;
//             const password = req.password;
//             const user = await UserOperator.findOne({email});
//                 if(!user) {
//                     throw new Error ("Username Invalid");
//                   }
//                 if(user.password !== password) {
//                     throw new Error ("Password Invalid");
//                   }
//                 resolve({user});
//               } catch(error){
//                   reject({
//                       error:error
//                   });
//               }
//             });
//     }

//     static async listById(req: FastifyRequest, reply: FastifyReply) {
//         try {
//             const id = req.params.id || "";
//             const result = await UserOperator.list({ _id: id });
//             reply.send(result && result.length > 0 && result[0] || {});
//         } catch (error) {
//             reply.send(error);
//         }
//     }

//     static async list(req: FastifyRequest, reply: FastifyReply) {
//         try {
//             const query = req.query || {};
//             const result = await UserOperator.list(query);
//             reply.send(result);
//         } catch (error) {
//             reply.send(error);
//         }
//     }

//     static async update(req: FastifyRequest, reply: FastifyReply) {
//         try {
//             const id = req.params.id || "";
//             const updateQuery = req.body || {};
//             const updateResult = _.isEmpty(id) && _.isEmpty(updateQuery) ? function () { throw { error: { message: "Invalid Request", code: 400 } }; }() : await UserOperator.update(id, updateQuery);
//             reply.send(updateResult);
//         } catch (error) {
//             reply.send(error);
//         }
    // }

//     static async delete(req: FastifyRequest, reply: FastifyReply) {
//         try {
//             const id = req.params.id || "";
//             const deletedResult = _.isEmpty(id) ? function () { throw { error: { message: "Invalid Request", code: 400 } }; }() : await UserOperator.delete(id);
//             reply.send(deletedResult);
//         } catch (error) {
//             reply.send(error);
//         }
//     }
// }
