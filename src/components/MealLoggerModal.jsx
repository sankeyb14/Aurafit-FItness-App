import React, { useState } from 'react';
import { X, Plus, Utensils, Zap } from 'lucide-react';
import { useLogs } from '../context/LogContext';

const MEAL_SUGGESTIONS = [
  { name: 'Oatmeal & Protein Scoop with Berries', type: 'breakfast', cal: 350, p: 28, c: 45, f: 6 },
  { name: 'Scrambled Eggs (3) & Whole Toast', type: 'breakfast', cal: 320, p: 22, c: 24, f: 16 },
  { name: 'Grilled Chicken Breast Bowl with Quinoa', type: 'lunch', cal: 520, p: 48, c: 42, f: 12 },
  { name: 'Tofu Veggie Stir-fry with Brown Rice', type: 'lunch', cal: 420, p: 24, c: 54, f: 14 },
  { name: 'Salmon Fillet with Sweet Potato & Asparagus', type: 'dinner', cal: 580, p: 42, c: 38, f: 22 },
  { name: 'Greek Yogurt with Honey & Almonds', type: 'snack', cal: 220, p: 18, c: 16, f: 9 },
  { name: 'Protein Shake (Whey + Banana)', type: 'snack', cal: 250, p: 30, c: 28, f: 3 },
  { name: 'Paneer / Cottage Cheese Bowl', type: 'dinner', cal: 410, p: 26, c: 18, f: 24 }
];

export function MealLoggerModal({ isOpen, onClose }) {
  const { addMealLog } = useLogs();
  const [mealType, setMealType] = useState('breakfast');
  const [name, setName] = useState('');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [carbs, setCarbs] = useState('');
  const [fat, setFat] = useState('');

  if (!isOpen) return null;

  const handleSelectSuggestion = (sug) => {
    setName(sug.name);
    setMealType(sug.type);
    setCalories(sug.cal);
    setProtein(sug.p);
    setCarbs(sug.c);
    setFat(sug.f);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    addMealLog(mealType, name, calories || 0, protein || 0, carbs || 0, fat || 0);
    onClose();
    setName('');
    setCalories('');
    setProtein('');
    setCarbs('');
    setFat('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-6 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 bg-gray-100 p-2 rounded-full transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <div className="p-2.5 bg-orange-100 text-secondary rounded-2xl">
            <Utensils className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-textDark">Log Your Meal</h2>
            <p className="text-xs text-gray-500">Track calories and macronutrients</p>
          </div>
        </div>

        {/* Quick Suggestions */}
        <div className="mb-5">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 text-secondary" />
            Quick Meal Ideas
          </label>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
            {MEAL_SUGGESTIONS.map((sug, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectSuggestion(sug)}
                className="whitespace-nowrap px-3 py-1.5 text-xs bg-gray-50 hover:bg-orange-50 border border-gray-200 hover:border-orange-300 rounded-xl text-gray-700 font-medium transition"
              >
                {sug.name} ({sug.cal} cal)
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Meal Category</label>
            <div className="grid grid-cols-4 gap-2">
              {['breakfast', 'lunch', 'dinner', 'snack'].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setMealType(type)}
                  className={`py-2 text-xs font-bold rounded-xl capitalize border transition ${
                    mealType === type
                      ? 'bg-primary text-white border-primary shadow-sm'
                      : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Meal / Food Description</label>
            <input
              type="text"
              required
              placeholder="e.g. Oatmeal with chia seeds & almond milk"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Total Calories (kcal)</label>
              <input
                type="number"
                placeholder="e.g. 450"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
                className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Protein (g)</label>
              <input
                type="number"
                placeholder="e.g. 35"
                value={protein}
                onChange={(e) => setProtein(e.target.value)}
                className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Carbs (g)</label>
              <input
                type="number"
                placeholder="e.g. 40"
                value={carbs}
                onChange={(e) => setCarbs(e.target.value)}
                className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Fats (g)</label>
              <input
                type="number"
                placeholder="e.g. 12"
                value={fat}
                onChange={(e) => setFat(e.target.value)}
                className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-secondary hover:bg-secondary-hover text-white font-bold rounded-2xl shadow-lg transition duration-200 flex items-center justify-center gap-2 mt-4"
          >
            <Plus className="w-5 h-5" /> Save Meal Entry
          </button>
        </form>
      </div>
    </div>
  );
}

export default MealLoggerModal;
