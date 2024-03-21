const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  links: { type: [String], required: true },
  binderLink: { type: String }, // Optional field for Binder projects
}, { timestamps: true });

projectSchema.pre('save', function(next) {
  console.log(`Saving project: ${this.title}`);
  next();
});

projectSchema.post('save', function(doc) {
  console.log(`Project saved: ${doc.title}`);
});

projectSchema.pre('save', function(next) {
  if (!this.binderLink) {
    console.log(`No Binder link provided for project: ${this.title}`);
  }
  next();
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;