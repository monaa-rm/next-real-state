import { Schema, model, models } from "mongoose";
import User from "./User";

const profileSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    earnest: {
      type: Number,
      required: true,
    },
    rentMoney: {
      type: Number,
      required: true,
      default: 0
    },
    realState: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    constructionDate: {
      type: Date,
      required: true,
    },
    category: {
      type: String,
      enum: ["villa", "apartment", "store", "office"],
      required: true,
    },
    rentorsale: {
      type: String,
      enum: ["rent","sale"],
      required: true,
    },
    rules: {
      type: [String],
      default: [],
    },
    amenities: {
      type: [String],
      default: [],
    },
    images: {
      type: [String],
      default: [],
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: User,
    },
    published: {
      type : Boolean,
      default : false
    }
  },
  { timeseries: true }
);

const Profile = models.Profile || model("Profile", profileSchema);
export default Profile;
