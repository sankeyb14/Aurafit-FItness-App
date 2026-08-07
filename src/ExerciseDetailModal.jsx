import React, { useState, Component } from 'react';
import { X, CheckCircle, ShieldAlert, AlertTriangle, ArrowUpRight, ArrowDownRight, Layers, Sparkles } from 'lucide-react';

// Error Boundary to prevent silent React white-screen crashes
class ModalErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ExerciseDetailModal rendering error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center space-y-4 shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-500 mx-auto flex items-center justify-center text-xl font-bold">⚠️</div>
            <h3 className="text-lg font-black text-gray-900">Exercise Details Unavailable</h3>
            <p className="text-xs text-gray-500 font-medium">Some exercise fields are missing. Please close and regenerate your plan if issues persist.</p>
            <button
              onClick={this.props.onClose}
              className="w-full py-3 bg-gray-900 text-white font-bold rounded-2xl text-xs"
            >
              Close
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export function normalizeExerciseVariant(variant, fallbackName = 'Exercise') {
  if (!variant) return null;
  if (typeof variant === 'string') {
    return {
      name: variant,
      sets: 3,
      reps: '10',
      restSeconds: 90,
      muscleGroup: 'Full Body',
      why: 'Target exercise for strength & muscle development.',
      formTips: ['Maintain good posture', 'Control the movement tempo', 'Breathe out on exertion'],
      commonMistakes: ['Rushing reps', 'Improper joint alignment'],
      injuryPrevention: 'Brace core and move with control.'
    };
  }

  return {
    name: variant.name || variant.exerciseName || variant.title || variant.exercise || fallbackName,
    sets: variant.sets || variant.set_count || 3,
    reps: String(variant.reps || variant.rep_count || '10'),
    restSeconds: variant.restSeconds || variant.rest_seconds || 90,
    muscleGroup: variant.muscleGroup || variant.target_muscle || 'Full Body',
    why: variant.why || variant.description || 'Target exercise for strength & muscle development.',
    formTips: Array.isArray(variant.formTips) && variant.formTips.length > 0
      ? variant.formTips
      : (typeof variant.formTips === 'string' ? [variant.formTips] : ['Maintain controlled tempo', 'Breathe out on exertion']),
    commonMistakes: Array.isArray(variant.commonMistakes) && variant.commonMistakes.length > 0
      ? variant.commonMistakes
      : (typeof variant.commonMistakes === 'string' ? [variant.commonMistakes] : ['Rushing through reps', 'Improper joint alignment']),
    injuryPrevention: variant.injuryPrevention || 'Control the eccentric phase and stop before sharp joint pain.'
  };
}

export function normalizeExerciseItem(item) {
  if (!item) return null;

  const selectedKey = item.userSelectedVariant || 'primary';
  const primaryRaw = item.primary || (item.name ? item : null) || item;
  const altARaw = item.altA || item.alternativeA || item.easierVariant;
  const altBRaw = item.altB || item.alternativeB || item.harderVariant;

  const primary = normalizeExerciseVariant(primaryRaw, 'Target Exercise');
  const altA = normalizeExerciseVariant(altARaw, 'Incline Push-up (Easier Variant)');
  const altB = normalizeExerciseVariant(altBRaw, 'Weighted Progression (Harder Variant)');

  const currentVariant = selectedKey === 'altA' ? altA : (selectedKey === 'altB' ? altB : primary);

  return {
    exerciseId: item.exerciseId || item.id || `ex_${Date.now()}`,
    userSelectedVariant: selectedKey,
    primary,
    altA,
    altB,
    currentVariant
  };
}

function ExerciseDetailModalContent({ exerciseItem, onClose, onSelectVariant }) {
  const [activeTab, setActiveTab] = useState('form');

  if (!exerciseItem) return null;

  const normalized = normalizeExerciseItem(exerciseItem);
  if (!normalized || !normalized.currentVariant) {
    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center space-y-4">
          <p className="text-xs text-gray-500 font-bold">Exercise data unavailable.</p>
          <button onClick={onClose} className="px-4 py-2 bg-gray-900 text-white text-xs font-bold rounded-xl">Close</button>
        </div>
      </div>
    );
  }

  const { currentVariant, primary, altA, altB } = normalized;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-sm sm:max-w-md w-full p-6 space-y-4 shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex justify-between items-start">
          <div>
            <span className="text-[10px] font-black uppercase text-[#7C3AED] bg-purple-50 px-3 py-1 rounded-full tracking-wider">
              {currentVariant.muscleGroup} • {currentVariant.sets} Sets × {currentVariant.reps} Reps
            </span>
            <h2 className="text-xl font-black text-gray-900 mt-1.5 leading-tight">{currentVariant.name}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 font-bold transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 3 Tabs Header */}
        <div className="flex bg-gray-100 p-1 rounded-2xl text-xs font-extrabold text-gray-500">
          <button
            onClick={() => setActiveTab('form')}
            className={`flex-1 py-2 rounded-xl transition ${activeTab === 'form' ? 'bg-white text-[#7C3AED] shadow-sm' : 'hover:text-gray-900'}`}
          >
            Form Guide
          </button>
          <button
            onClick={() => setActiveTab('alternatives')}
            className={`flex-1 py-2 rounded-xl transition ${activeTab === 'alternatives' ? 'bg-white text-[#7C3AED] shadow-sm' : 'hover:text-gray-900'}`}
          >
            Alternatives
          </button>
          <button
            onClick={() => setActiveTab('progressions')}
            className={`flex-1 py-2 rounded-xl transition ${activeTab === 'progressions' ? 'bg-white text-[#7C3AED] shadow-sm' : 'hover:text-gray-900'}`}
          >
            Progressions
          </button>
        </div>

        {/* TAB 1: FORM GUIDE */}
        {activeTab === 'form' && (
          <div className="space-y-4 text-xs">
            <div className="bg-purple-50/60 p-3.5 rounded-2xl border border-purple-100">
              <span className="font-extrabold text-[#7C3AED] block mb-1">Target Purpose:</span>
              <p className="text-gray-600 leading-relaxed font-medium">{currentVariant.why}</p>
            </div>

            <div>
              <h3 className="font-black text-gray-900 mb-2 flex items-center gap-1">
                <CheckCircle className="w-4 h-4 text-emerald-500" /> Step-by-Step Execution
              </h3>
              <ol className="space-y-1.5 pl-1">
                {currentVariant.formTips.map((tip, idx) => (
                  <li key={idx} className="flex gap-2 text-gray-700 font-medium">
                    <span className="font-black text-[#7C3AED]">{idx + 1}.</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <h3 className="font-black text-gray-900 mb-2 flex items-center gap-1">
                <AlertTriangle className="w-4 h-4 text-amber-500" /> Common Mistakes to Avoid
              </h3>
              <ul className="space-y-1 pl-1">
                {currentVariant.commonMistakes.map((m, idx) => (
                  <li key={idx} className="text-gray-600 font-medium flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-amber-50/50 p-3 rounded-2xl border border-amber-100">
              <h3 className="font-black text-amber-900 flex items-center gap-1 mb-1">
                <ShieldAlert className="w-3.5 h-3.5 text-amber-600" /> Injury Prevention Tip
              </h3>
              <p className="text-amber-800 text-[11px] font-medium">{currentVariant.injuryPrevention}</p>
            </div>
          </div>
        )}

        {/* TAB 2: ALTERNATIVES */}
        {activeTab === 'alternatives' && (
          <div className="space-y-3 text-xs">
            <p className="text-gray-500 font-medium">Switch to a variant matching your exact energy or available gear:</p>
            
            {/* Alt A */}
            {altA && (
              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-black text-gray-900 text-sm">{altA.name}</span>
                  <span className="bg-emerald-100 text-emerald-700 px-2.5 py-0.5 rounded-full text-[10px] font-bold">Easier / Bodyweight</span>
                </div>
                <p className="text-gray-600 font-medium text-[11px]">{altA.why}</p>
                <div className="text-gray-500 font-bold">{altA.sets} Sets × {altA.reps} Reps • {altA.restSeconds}s rest</div>
                
                {onSelectVariant && (
                  <button
                    onClick={() => { onSelectVariant('altA'); onClose(); }}
                    className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow-sm transition"
                  >
                    Use Alt A (Easier Variant) Today
                  </button>
                )}
              </div>
            )}

            {/* Alt B */}
            {altB && (
              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-black text-gray-900 text-sm">{altB.name}</span>
                  <span className="bg-purple-100 text-[#7C3AED] px-2.5 py-0.5 rounded-full text-[10px] font-bold">Progression / Harder</span>
                </div>
                <p className="text-gray-600 font-medium text-[11px]">{altB.why}</p>
                <div className="text-gray-500 font-bold">{altB.sets} Sets × {altB.reps} Reps • {altB.restSeconds}s rest</div>

                {onSelectVariant && (
                  <button
                    onClick={() => { onSelectVariant('altB'); onClose(); }}
                    className="w-full py-2 bg-[#7C3AED] hover:bg-purple-700 text-white font-bold rounded-xl text-xs shadow-sm transition"
                  >
                    Use Alt B (Harder Progression) Today
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: PROGRESSIONS */}
        {activeTab === 'progressions' && (
          <div className="space-y-3 text-xs">
            <p className="text-gray-500 font-medium">Difficulty progression ladder for this muscle group:</p>

            <div className="space-y-2">
              {altA && (
                <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-emerald-600 uppercase flex items-center gap-0.5"><ArrowDownRight className="w-3 h-3" /> Easier Ladder</span>
                    <div className="font-bold text-gray-900 text-xs">{altA.name}</div>
                  </div>
                  <span className="text-xs text-gray-500 font-semibold">{altA.sets}x{altA.reps}</span>
                </div>
              )}

              <div className="p-3 bg-purple-50 rounded-2xl border-2 border-[#7C3AED] flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-[#7C3AED] uppercase flex items-center gap-0.5"><Layers className="w-3 h-3" /> Current Selection ✓</span>
                  <div className="font-black text-gray-900 text-xs">{currentVariant.name}</div>
                </div>
                <span className="text-xs text-[#7C3AED] font-black">{currentVariant.sets}x{currentVariant.reps}</span>
              </div>

              {altB && (
                <div className="p-3 bg-orange-50 rounded-2xl border border-orange-200 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-[#FF5E3A] uppercase flex items-center gap-0.5"><ArrowUpRight className="w-3 h-3" /> Next Harder Ladder</span>
                    <div className="font-bold text-gray-900 text-xs">{altB.name}</div>
                  </div>
                  <span className="text-xs text-gray-500 font-semibold">{altB.sets}x{altB.reps}</span>
                </div>
              )}
            </div>
          </div>
        )}

        <button
          onClick={onClose}
          className="w-full py-3 bg-gray-900 text-white font-black rounded-2xl text-xs mt-2 hover:bg-black transition"
        >
          Close Modal
        </button>
      </div>
    </div>
  );
}

export function ExerciseDetailModal(props) {
  return (
    <ModalErrorBoundary onClose={props.onClose}>
      <ExerciseDetailModalContent {...props} />
    </ModalErrorBoundary>
  );
}

export default ExerciseDetailModal;
