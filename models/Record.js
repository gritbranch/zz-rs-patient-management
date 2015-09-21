var mongoose = require('mongoose');

var RecordSchema = new mongoose.Schema({
  date: String,
  nameOfLab: String,
  weight: String,
  bp: String,
  hr: String,
  hemoglobin: String,
  hematocrift: String,
  rbc: String,
  wbc: String,
  neutrophils: String,
  lymphocytesMonocytes: String,
  basophils: String,
  eosinophils: String,
  fbs: String,
  rbs: String,
  hba1c: String,
  bun: String,
  creatinine: String,
  oneScr: String,
  egfr: String,
  na: String,
  k: String,
  cl: String,
  albumin: String,
  globulin: String,
  uricAcid: String,
  totalCholesterolTriglyceride: String,
  hdl: String,
  ldl: String,
  psa: String,
  sgot: String,
  personnel: { type: mongoose.Schema.Types.ObjectId, ref: 'Personnel' }
});

mongoose.model('Record', RecordSchema);