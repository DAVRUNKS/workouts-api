const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    reps: {
      type: Number,
      required: true,
    },
    load: {
      type: Number,
      required: true,
    },
    user_id: {  // ✅ Correct placement inside schema object
      type: String,
      required: true,
    },
  },
  { timestamps: true } // ✅ Moved to the correct position
);

module.exports = mongoose.model("Workout", WorkoutSchema);
