import React, { useState } from 'react';
import { X, Utensils, Sparkles, Plus } from 'lucide-react';

export function MealLoggerModal({ isOpen, onClose, onSaveMeal }) {
  const [mealType, setMealType] = useState('Lunch'); // 'Breakfast', 'Lunch', 'Dinner', 'Snack'
  const [foodName, setFoodName] = useState('');
  const [quantity, setQuantity] = useState('1 serving');
  const [calories, setCalories] = useState('388');
  const [protein, setProtein] = useState('25');
  const [carbs, setCarbs] = useState('45');
  const [fat, setFat] = useState('12');

  if (!isOpen) return null;

  const handleQuickPreset = (presetName, cal, p, c, f) => {
    setFoodName(presetName);
    setCalories(String(cal));
    setProtein(String(p));
    setCarbs(String(c));
    setFat(String(f));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!foodName) return;

    onSaveMeal({
      id: Date.now(),
      type: mealType,
      name: foodName,
      quantity,
      calories: Number(calories) || 250,
      protein: Number(protein) || 20,
      carbs: Number(carbs) || 30,
      fat: Number(fat) || 10
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-sm sm:max-w-md w-full p-6 space-y-4 shadow-2xl border border-gray-100">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-orange-50 text-[#FF5E3A]">
              <Utensils className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-black text-gray-900">Log Food & Macros</h2>
          </div>
          <button onClick={onClose} className="p-1 rounded-full text-gray-400 hover:bg-gray-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          {/* Meal Type Select */}
          <div>
            <label className="block text-gray-700 font-extrabold mb-1">Meal Category</label>
            <div className="grid grid-cols-4 gap-1.5">
              {['Breakfast', 'Lunch', 'Dinner', 'Snack'].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setMealType(t)}
                  className={`py-2 rounded-xl font-extrabold text-[11px] transition ${
                    mealType === t ? 'bg-[#FF5E3A] text-white shadow-sm' : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Presets */}
          <div>
            <label className="block text-gray-500 font-bold mb-1 text-[10px] uppercase">Quick Food Presets</label>
            <div className="flex gap-1.5 overflow-x-auto scrollbar-none pb-1">
              {[
                { name: 'Omelet (2 eggs)', cal: 180, p: 14, c: 2, f: 14 },
                { name: 'Chicken & Rice', cal: 420, p: 35, c: 45, f: 8 },
                { name: 'Protein Shake', cal: 220, p: 28, c: 8, f: 4 },
                { name: 'Greek Yogurt', cal: 150, p: 18, c: 10, f: 2 }
              ].map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleQuickPreset(item.name, item.cal, item.p, item.c, item.f)}
                  className="px-3 py-1.5 bg-purple-50 text-[#7C3AED] border border-purple-100 rounded-xl font-extrabold text-[10px] whitespace-nowrap hover:bg-purple-100 transition"
                >
                  + {item.name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-extrabold mb-1">Food Item Name</label>
            <input
              type="text"
              required
              placeholder="e.g. White Rice & Fish Curry"
              value={foodName}
              onChange={(e) => setFoodName(e.target.value)}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-2xl font-bold focus:ring-2 focus:ring-[#FF5E3A] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-gray-700 font-bold mb-1">Serving Quantity</label>
              <input
                type="text"
                placeholder="e.g. 1 bowl"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl font-semibold"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-1">Calories (kcal)</label>
              <input
                type="number"
                required
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl font-bold text-[#FF5E3A]"
              />
            </div>
          </div>

          {/* Macro Inputs */}
          <div>
            <label className="block text-gray-700 font-extrabold mb-1">Macro Breakdown (Grams)</label>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <span className="text-[10px] font-extrabold text-[#7C3AED] block mb-0.5">Protein (g)</span>
                <input
                  type="number"
                  value={protein}
                  onChange={(e) => setProtein(e.target.value)}
                  className="w-full p-2 bg-gray-50 border border-gray-200 rounded-xl font-bold"
                />
              </div>
              <div>
                <span className="text-[10px] font-extrabold text-[#FF5E3A] block mb-0.5">Carbs (g)</span>
                <input
                  type="number"
                  value={carbs}
                  onChange={(e) => setCarbs(e.target.value)}
                  className="w-full p-2 bg-gray-50 border border-gray-200 rounded-xl font-bold"
                />
              </div>
              <div>
                <span className="text-[10px] font-extrabold text-cyan-600 block mb-0.5">Fat (g)</span>
                <input
                  type="number"
                  value={fat}
                  onChange={(e) => setFat(e.target.value)}
                  className="w-full p-2 bg-gray-50 border border-gray-200 rounded-xl font-bold"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-[#FF5E3A] hover:bg-[#E04826] text-white font-black rounded-2xl shadow-md transition text-xs mt-2"
          >
            Save Meal to Nutrition Log
          </button>
        </form>
      </div>
    </div>
  );
}

export default MealLoggerModal;
