import mongoose from "mongoose";

interface Contacts {
    company: String;
    country_code: String;
    mobile_number : Number;
    email : String;
    created_at: Date;
    modified_at: Date;
  }

const Schema = mongoose.Schema;

const contactSchema = new Schema({
    company : {type: String},
    country_code : {type: String},
    mobile_number: { type: Number },
    email: { type: String },
    created_at: { type: Date, default: Date() },
    modified_at: { type: Date, default: Date() },
});

export interface IContactSchema extends Contacts, mongoose.Document { }
export default mongoose.model<IContactSchema>("contacts", contactSchema);