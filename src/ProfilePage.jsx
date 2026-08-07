import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { usePlan } from '../context/PlanContext';
import { User, ShieldAlert, Lock, Edit2, Sparkles, RefreshCw } from 'lucide-react';

export function ProfilePage() {
  const { profile, updateProfile } = useUser();
  const { generateNewPlan } = usePlan();

  const [isEditingWeight, setIsEditingWeight] = useState(false);
  const [newWeight, setNewWeight] = useState(profile?.personalInfo?.weight_kg || '58');

  const [isRegenModalOpen, setIsRegenModalOpen] = useState(false);
  const [isEditingEquipment, setIsEditingEquipment] = useState(false);
  const [equipmentType, setEquipmentType] = useState(profile?.equipmentType || 'home');
  const [customGymText, setCustomGymText] = useState((profile?.customGymEquipment || []).join(', '));
  const [homeEquipment, setHomeEquipment] = useState(profile?.homeEquipment || ['dumbbells', 'pullup_bar']);

  const handleSaveWeight = async () => {
    await updateProfile({
      ...profile,
      personalInfo: {
        ...profile.personalInfo,
        weight_kg: Number(newWeight) || profile?.personalInfo?.weight_kg
      }
    });
    setIsEditingWeight(false);
  };

  const handleSaveEquipment = async () => {
    const parsedGym = customGymText.split(/,|\n/).map((s) => s.trim()).filter(Boolean);
    const updated = {
      ...profile,
      equipmentType,
      customGymEquipment: parsedGym,
      homeEquipment
    };

    await updateProfile(updated);
    setIsEditingEquipment(false);
    setIsRegenModalOpen(true); // Ask if user wants to regenerate plan
  };

  const handleRegeneratePlan = async () => {
    setIsRegenModalOpen(false);
    await generateNewPlan(profile);
  };

  return (
    <div className="min-h-screen pb-24 pt-4 px-4 sm:px-6 max-w-md mx-auto sm:max-w-lg md:max-w-xl space-y-5 animate-fadeIn bg-[#F3F4F8]">
      {/* Profile Header */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 text-center space-y-3">
        <div className="w-20 h-20 rounded-full bg-purple-100 border-4 border-[#7C3AED] mx-auto flex items-center justify-center text-4xl shadow-inner">
          👩🏽‍🦱
        </div>
        <div>
          <h2 className="text-xl font-black text-gray-900">{profile?.name || 'Anabelle'}</h2>
          <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mt-0.5">
            {profile?.fitnessLevel} • {profile?.goalPhysique?.replace('_', ' ')}
          </p>
        </div>
      </div>

      {/* Editable vs Locked Profile Fields */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 space-y-4">
        <div className="flex justify-between items-center pb-2 border-b border-gray-100">
          <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Athlete Settings</h3>
          <span className="text-[10px] font-bold text-[#7C3AED] bg-purple-50 px-2.5 py-0.5 rounded-full">
            Smart Blueprint
          </span>
        </div>

        {/* Editable Weight */}
        <div className="flex justify-between items-center text-xs font-bold py-1">
          <span className="text-gray-600">Body Weight:</span>
          {isEditingWeight ? (
            <div className="flex gap-2 items-center">
              <input
                type="number"
                value={newWeight}
                onChange={(e) => setNewWeight(e.target.value)}
                className="w-16 p-1 border rounded-xl text-center bg-gray-50"
              />
              <button onClick={handleSaveWeight} className="px-2.5 py-1 bg-[#7C3AED] text-white text-[10px] rounded-lg">Save</button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-gray-900 font-black">{profile?.personalInfo?.weight_kg || 58} kg</span>
              <button onClick={() => setIsEditingWeight(true)} className="text-gray-400 hover:text-[#7C3AED]">
                <Edit2 className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Editable Equipment */}
        <div className="py-1 space-y-2 text-xs font-bold border-t border-gray-100 pt-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Equipment Setup:</span>
            <button onClick={() => setIsEditingEquipment(!isEditingEquipment)} className="text-[#7C3AED] flex items-center gap-1">
              <Edit2 className="w-3.5 h-3.5" /> Edit Equipment
            </button>
          </div>
          <p className="text-[11px] text-gray-500 font-semibold">
            {profile?.equipmentType === 'gym'
              ? `Gym: ${(profile?.customGymEquipment || []).join(', ')}`
              : `Home: ${(profile?.homeEquipment || []).join(', ')}`}
          </p>

          {isEditingEquipment && (
            <div className="p-4 bg-gray-50 rounded-2xl space-y-3 mt-2 border">
              <div className="flex gap-2">
                <button onClick={() => setEquipmentType('gym')} className={`flex-1 py-1.5 rounded-xl text-[11px] font-bold ${equipmentType === 'gym' ? 'bg-[#7C3AED] text-white' : 'bg-gray-200'}`}>Gym</button>
                <button onClick={() => setEquipmentType('home')} className={`flex-1 py-1.5 rounded-xl text-[11px] font-bold ${equipmentType === 'home' ? 'bg-[#7C3AED] text-white' : 'bg-gray-200'}`}>Home</button>
              </div>

              {equipmentType === 'gym' ? (
                <textarea
                  rows={2}
                  value={customGymText}
                  onChange={(e) => setCustomGymText(e.target.value)}
                  className="w-full p-2 bg-white border rounded-xl text-xs"
                />
              ) : (
                <div className="grid grid-cols-2 gap-1.5 text-[10px]">
                  {['dumbbells', 'barbell', 'pullup_bar', 'bands', 'bodyweight'].map(eq => (
                    <button
                      key={eq}
                      onClick={() => setHomeEquipment(homeEquipment.includes(eq) ? homeEquipment.filter(i => i !== eq) : [...homeEquipment, eq])}
                      className={`p-1.5 rounded-lg border font-bold capitalize ${homeEquipment.includes(eq) ? 'bg-purple-50 border-[#7C3AED] text-[#7C3AED]' : 'bg-white'}`}
                    >
                      {eq}
                    </button>
                  ))}
                </div>
              )}

              <button onClick={handleSaveEquipment} className="w-full py-2 bg-[#7C3AED] text-white font-bold rounded-xl text-xs">
                Save Equipment Changes
              </button>
            </div>
          )}
        </div>

        {/* Non-Editable Fundamental Lock Badge */}
        <div className="border-t border-gray-100 pt-3 space-y-2 text-xs font-bold text-gray-400">
          <p className="flex justify-between items-center">
            <span>Age & Height:</span>
            <span className="flex items-center gap-1 text-gray-700 font-bold"><Lock className="w-3 h-3 text-gray-400" /> {profile?.personalInfo?.age || 25} yrs • {profile?.personalInfo?.height_cm || 168} cm</span>
          </p>
          <p className="flex justify-between items-center">
            <span>Goal Physique:</span>
            <span className="flex items-center gap-1 text-gray-700 font-bold"><Lock className="w-3 h-3 text-gray-400" /> {profile?.goalPhysique?.toUpperCase()}</span>
          </p>
          <p className="text-[10px] text-gray-400 font-normal italic">Changing age/height/goal requires full app reset.</p>
        </div>
      </div>

      <button onClick={() => { localStorage.clear(); location.reload(); }} className="w-full py-3.5 bg-red-50 text-red-500 font-extrabold text-xs rounded-3xl border border-red-100">
        Reset Profile & App Data
      </button>

      {/* Equipment Change Plan Regeneration Modal */}
      {isRegenModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-3xl max-w-sm w-full space-y-4 shadow-2xl">
            <div className="flex items-center gap-2 text-[#7C3AED]">
              <RefreshCw className="w-6 h-6 animate-spin" />
              <h3 className="text-lg font-black text-gray-900">Regenerate Plan?</h3>
            </div>
            <p className="text-xs text-gray-600 font-medium leading-relaxed">
              Your equipment setup has changed. Would you like Gemini AI to regenerate remaining weeks tailored to your new gear?
            </p>

            <div className="space-y-2 text-xs font-bold">
              <button
                onClick={handleRegeneratePlan}
                className="w-full py-3 bg-[#7C3AED] text-white rounded-2xl font-black shadow-md hover:bg-purple-700 transition"
              >
                Regenerate AI Plan
              </button>
              <button
                onClick={() => setIsRegenModalOpen(false)}
                className="w-full py-3 bg-gray-100 text-gray-700 rounded-2xl text-center"
              >
                Keep Current Plan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
