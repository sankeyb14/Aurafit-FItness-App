import React from 'react';
import { X, CheckCircle2, AlertTriangle, ShieldCheck, Dumbbell, PlayCircle } from 'lucide-react';
import { EXERCISE_DATABASE } from '../data/exerciseSeedData';

export function ExerciseDetailModal({ exercise, isOpen, onClose }) {
  if (!isOpen || !exercise) return null;

  // Search full details from seed database or fallback to exercise object
  const fullDetail = EXERCISE_DATABASE.find(
    (ex) => ex.name.toLowerCase() === exercise.name.toLowerCase() || ex.id === exercise.id
  ) || exercise;

  const formGuide = fullDetail.form_guide || {
    steps: [exercise.form_tips || "Perform with controlled tempo."],
    common_mistakes: ["Using momentum", "Rounding lower back", "Rushing tempo"],
    injury_prevention: "Keep core tight and breathe naturally through reps."
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl p-6 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 bg-gray-100 p-2 rounded-full transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Video / Visual Header Placeholder */}
        <div className="w-full h-40 gradient-header rounded-2xl flex flex-col items-center justify-center text-white p-4 mb-5 relative overflow-hidden shadow-inner">
          <div className="absolute top-3 left-3 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
            {fullDetail.category || 'Compound'} • {fullDetail.difficulty || 'All Levels'}
          </div>
          <PlayCircle className="w-12 h-12 text-white/90 drop-shadow-md my-1 animate-pulse cursor-pointer" />
          <p className="text-xs text-white/80 font-medium">Interactive Visual Form Guide</p>
        </div>

        {/* Exercise Header Info */}
        <div className="mb-4">
          <h2 className="text-2xl font-extrabold text-textDark flex items-center gap-2">
            {fullDetail.name}
          </h2>
          {fullDetail.targetMuscles && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {fullDetail.targetMuscles.map((muscle, i) => (
                <span key={i} className="text-xs font-semibold px-2.5 py-1 bg-indigo-50 text-primary rounded-lg">
                  🎯 {muscle}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Why this exercise */}
        {exercise.why && (
          <div className="p-3.5 bg-orange-50/80 border border-orange-100 rounded-xl mb-4 text-xs text-amber-900 font-medium leading-relaxed">
            <strong className="text-secondary font-bold">Trainer Recommendation:</strong> {exercise.why}
          </div>
        )}

        {/* Step-by-Step Form Instructions */}
        <div className="space-y-4 text-sm">
          <div>
            <h3 className="font-bold text-gray-800 flex items-center gap-1.5 mb-2">
              <CheckCircle2 className="w-4 h-4 text-success" />
              Step-by-Step Execution
            </h3>
            <ol className="space-y-2 pl-2">
              {(formGuide.steps || []).map((step, idx) => (
                <li key={idx} className="flex gap-2.5 text-gray-600 text-xs leading-relaxed">
                  <span className="w-5 h-5 rounded-full bg-indigo-100 text-primary font-bold text-xs flex items-center justify-center flex-shrink-0">
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Common Mistakes to Avoid */}
          <div className="p-4 bg-red-50/70 border border-red-100 rounded-2xl">
            <h3 className="font-bold text-danger text-xs flex items-center gap-1.5 mb-2 uppercase tracking-wide">
              <AlertTriangle className="w-4 h-4 text-danger" />
              Common Mistakes to Avoid
            </h3>
            <ul className="space-y-1.5 pl-1">
              {(formGuide.common_mistakes || []).map((mistake, idx) => (
                <li key={idx} className="text-xs text-gray-700 flex items-start gap-2">
                  <span className="text-danger font-bold">•</span>
                  <span>{mistake}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* How to Know You're Doing It Wrong / Injury Prevention */}
          {formGuide.injury_prevention && (
            <div className="p-3.5 bg-emerald-50 border border-emerald-100 rounded-xl text-xs text-emerald-900">
              <h4 className="font-bold flex items-center gap-1 mb-1 text-success">
                <ShieldCheck className="w-4 h-4 text-success" /> Injury Prevention Tip
              </h4>
              <p>{formGuide.injury_prevention}</p>
            </div>
          )}

          {/* Exercise Variations */}
          {fullDetail.variations && fullDetail.variations.length > 0 && (
            <div className="pt-2">
              <h3 className="font-bold text-xs text-gray-700 uppercase tracking-wider mb-2 flex items-center gap-1">
                <Dumbbell className="w-3.5 h-3.5 text-primary" /> Alternate Variations
              </h3>
              <div className="space-y-2">
                {fullDetail.variations.map((v, i) => (
                  <div key={i} className="p-2.5 bg-gray-50 border border-gray-100 rounded-xl text-xs">
                    <span className="font-bold text-gray-800">{v.name}: </span>
                    <span className="text-gray-600">{v.description}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <button
          onClick={onClose}
          className="w-full mt-6 py-3 bg-primary hover:bg-primary-hover text-white font-bold rounded-2xl transition shadow-md"
        >
          Got It, Back to Workout
        </button>
      </div>
    </div>
  );
}

export default ExerciseDetailModal;
