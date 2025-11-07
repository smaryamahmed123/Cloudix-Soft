// import mongoose from 'mongoose';

// const privacyPolicySchema = new mongoose.Schema({
//   content: {
//     type: String,
//     required: true,
//   },
//   updatedAt: {
//     type: Date,
//     default: Date.now,
//   }
// });

// const PrivacyPolicy = mongoose.model('PrivacyPolicy', privacyPolicySchema);
// export default PrivacyPolicy;



import mongoose from 'mongoose';

const sectionSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const privacyPolicySchema = new mongoose.Schema({
  sections: [sectionSchema],
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const PrivacyPolicy = mongoose.model('PrivacyPolicy', privacyPolicySchema);
export default PrivacyPolicy;
