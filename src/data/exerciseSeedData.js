export const EXERCISE_DATABASE = [
  // CHEST EXERCISES (1-15)
  {
    id: "ex_chest_01",
    name: "Barbell Bench Press",
    category: "chest",
    difficulty: "intermediate",
    equipment_needed: ["barbell"],
    targetMuscles: ["Pectoralis Major", "Anterior Deltoids", "Triceps Brachii"],
    form_guide: {
      steps: [
        "Lie flat on bench with eyes directly under bar. Retract shoulder blades and arch lower back slightly.",
        "Grasp bar slightly wider than shoulder-width with full grip.",
        "Unrack bar and lower under control to mid-chest while tucking elbows at ~45-degree angle.",
        "Press back up explosively to starting position without locking out elbows aggressively."
      ],
      common_mistakes: [
        "Flaring elbows out at a 90-degree angle (causes shoulder impingement).",
        "Bouncing the bar off chest.",
        "Lifting hips off the bench during heavy press."
      ],
      injury_prevention: "Keep feet firmly planted on the floor and maintain upper back tension throughout the entire set."
    },
    variations: [
      { name: "Incline Barbell Bench Press", description: "Target upper chest angle at 30 degrees." },
      { name: "Dumbbell Bench Press", description: "Provides deeper stretch and independent arm stabilization." }
    ]
  },
  {
    id: "ex_chest_02",
    name: "Standard Push-Up",
    category: "chest",
    difficulty: "beginner",
    equipment_needed: ["bodyweight"],
    targetMuscles: ["Pectoralis Major", "Triceps", "Core", "Serratus Anterior"],
    form_guide: {
      steps: [
        "Place hands slightly wider than shoulder-width on floor with legs extended back.",
        "Engage core and glutes to form a straight line from crown of head to heels.",
        "Lower body under control until chest is 1-2 inches above ground.",
        "Push through palms back to top extension."
      ],
      common_mistakes: [
        "Sagging hips or arching lower back.",
        "Flaring elbows out to T-shape.",
        "Half reps (not going low enough)."
      ],
      injury_prevention: "Squeeze glutes and brace abdominal wall to protect lumbar spine."
    },
    variations: [
      { name: "Incline Push-Up", description: "Hands elevated on bench to make exercise easier." },
      { name: "Decline Push-Up", description: "Feet elevated on bench to shift emphasis to upper chest." }
    ]
  },
  {
    id: "ex_chest_03",
    name: "Incline Dumbbell Press",
    category: "chest",
    difficulty: "intermediate",
    equipment_needed: ["dumbbells"],
    targetMuscles: ["Clavicular Pectoralis (Upper Chest)", "Anterior Deltoids", "Triceps"],
    form_guide: {
      steps: [
        "Set bench to 30-45 degree incline. Sit with dumbbells resting on thighs.",
        "Kick knees up to lift dumbbells to shoulder height as you lean back.",
        "Press dumbbells upward until arms are extended above chest.",
        "Lower slowly until dumbbells align with upper chest."
      ],
      common_mistakes: [
        "Setting incline too high (turns movement into shoulder press).",
        "Letting dumbbells drift too far apart at the bottom."
      ],
      injury_prevention: "Avoid setting bench angle above 45 degrees to prevent excess shoulder strain."
    },
    variations: [
      { name: "Incline Dumbbell Fly", description: "Focussed on chest adduction with slight elbow bend." }
    ]
  },
  {
    id: "ex_chest_04",
    name: "Dumbbell Chest Fly",
    category: "chest",
    difficulty: "beginner",
    equipment_needed: ["dumbbells"],
    targetMuscles: ["Pectoralis Major", "Anterior Deltoids"],
    form_guide: {
      steps: [
        "Lie on flat bench holding dumbbells directly above chest with palms facing each other.",
        "Maintain slight bend in elbows as you arc dumbbells out to sides.",
        "Lower until chest feels comfortable stretch.",
        "Contract chest muscles to hug arms back together above chest."
      ],
      common_mistakes: [
        "Bending elbows too much (turning fly into a press).",
        "Over-stretching at bottom putting shoulder joint at risk."
      ],
      injury_prevention: "Never drop elbows below bench height if experiencing shoulder laxity."
    },
    variations: [
      { name: "Cable Chest Fly", description: "Maintains continuous tension throughout entire movement arc." }
    ]
  },
  {
    id: "ex_chest_05",
    name: "Chest Dips",
    category: "chest",
    difficulty: "advanced",
    equipment_needed: ["pullup_bar", "bodyweight"],
    targetMuscles: ["Lower Pectoralis Major", "Triceps Brachii", "Anterior Deltoids"],
    form_guide: {
      steps: [
        "Grasp parallel dip bars and lock out arms above bars.",
        "Lean torso forward slightly (~30 degrees) and bend knees.",
        "Lower body under control until upper arms are parallel to floor.",
        "Press through palms to push back up to starting position."
      ],
      common_mistakes: [
        "Staying completely upright (shifts load entirely to triceps).",
        "Dropping too fast or going deeper than 90 degrees shoulder flexion."
      ],
      injury_prevention: "Maintain shoulder retraction and stop descent if feeling sharp anterior shoulder pinch."
    },
    variations: [
      { name: "Weighted Dips", description: "Use dip belt to add weight for progressive overload." },
      { name: "Assisted Dip Machine", description: "Reduces bodyweight load for beginners." }
    ]
  },
  {
    id: "ex_chest_06",
    name: "Cable Crossover (High to Low)",
    category: "chest",
    difficulty: "intermediate",
    equipment_needed: ["cable"],
    targetMuscles: ["Lower Chest", "Pectoralis Major"],
    form_guide: {
      steps: [
        "Attach D-handles to high pulleys of cable station.",
        "Take step forward in split stance, keeping slight forward lean.",
        "Pull handles downward and inward in arc until hands meet in front of waist.",
        "Squeeze chest for 1 second, then slowly return to start position."
      ],
      common_mistakes: ["Using momentum or swinging torso.", "Bending elbows excessively."],
      injury_prevention: "Keep core locked to prevent spinal twisting."
    },
    variations: [{ name: "Low-to-High Cable Fly", description: "Targets upper chest fibers." }]
  },
  {
    id: "ex_chest_07",
    name: "Decline Barbell Press",
    category: "chest",
    difficulty: "intermediate",
    equipment_needed: ["barbell"],
    targetMuscles: ["Sternocostal Pectoralis (Lower Chest)", "Triceps"],
    form_guide: {
      steps: [
        "Secure legs in decline bench and lay back.",
        "Unrack barbell over lower chest.",
        "Lower bar under control to sternum area.",
        "Press upward until arms extended."
      ],
      common_mistakes: ["Pressing bar over neck instead of chest.", "Losing foot security."],
      injury_prevention: "Always use a spotter on decline bench press."
    },
    variations: [{ name: "Decline Dumbbell Press", description: "Greater range of motion for lower chest." }]
  },
  {
    id: "ex_chest_08",
    name: "Diamond Push-Up",
    category: "chest",
    difficulty: "intermediate",
    equipment_needed: ["bodyweight"],
    targetMuscles: ["Inner Chest", "Triceps Brachii", "Anterior Deltoids"],
    form_guide: {
      steps: [
        "Assume plank position with index fingers and thumbs touching to form diamond shape.",
        "Lower chest toward hands keeping elbows close to body.",
        "Push back up to plank position."
      ],
      common_mistakes: ["Flares elbows excessively.", "Hips sag down."],
      injury_prevention: "If wrist pain occurs, widen hand placement slightly."
    },
    variations: [{ name: "Knee Diamond Push-Up", description: "Easier variation performed on knees." }]
  },
  {
    id: "ex_chest_09",
    name: "Pec Deck Machine Fly",
    category: "chest",
    difficulty: "beginner",
    equipment_needed: ["gym"],
    targetMuscles: ["Pectoralis Major"],
    form_guide: {
      steps: [
        "Adjust seat so handles are at chest level.",
        "Place forearms or hands on pads and pull handles together in front of chest.",
        "Squeeze chest at peak contraction, then slowly open arms."
      ],
      common_mistakes: ["Setting seat too low.", "Shrugging shoulders up."],
      injury_prevention: "Keep scapula pressed against back pad throughout."
    },
    variations: [{ name: "Single-Arm Pec Deck", description: "Isolates chest unilateral control." }]
  },
  {
    id: "ex_chest_10",
    name: "Floor Press with Dumbbells",
    category: "chest",
    difficulty: "beginner",
    equipment_needed: ["dumbbells"],
    targetMuscles: ["Mid Chest", "Triceps"],
    form_guide: {
      steps: [
        "Lie flat on floor with knees bent, holding dumbbells above chest.",
        "Lower dumbbells until triceps lightly touch floor.",
        "Pause briefly, then press back up."
      ],
      common_mistakes: ["Bouncing triceps off floor."],
      injury_prevention: "Great option for protecting shoulders from deep extension."
    },
    variations: [{ name: "Single Arm Floor Press", description: "Core anti-rotational challenge." }]
  },
  {
    id: "ex_chest_11",
    name: "Resistance Band Chest Press",
    category: "chest",
    difficulty: "beginner",
    equipment_needed: ["bands"],
    targetMuscles: ["Pectoralis Major", "Triceps"],
    form_guide: {
      steps: [
        "Wrap resistance band around mid-back or behind sturdy anchor.",
        "Hold handles at chest level and step forward for tension.",
        "Press handles forward until arms straight, squeeze chest."
      ],
      common_mistakes: ["Band sliding up back.", "Lack of tension at start."],
      injury_prevention: "Ensure band is securely anchored."
    },
    variations: [{ name: "Band Fly", description: "Arc movement for chest stretch." }]
  },
  {
    id: "ex_chest_12",
    name: "Chest Press Machine",
    category: "chest",
    difficulty: "beginner",
    equipment_needed: ["gym"],
    targetMuscles: ["Pectoralis Major", "Triceps"],
    form_guide: {
      steps: [
        "Adjust seat height so handles line up with mid-chest.",
        "Grasp handles and press forward smoothly.",
        "Return under control without letting weight stack slam."
      ],
      common_mistakes: ["Locking elbows harshly at extension."],
      injury_prevention: "Set stack weight appropriately for smooth control."
    },
    variations: [{ name: "Neutral Grip Press Machine", description: "Easier on shoulder joints." }]
  },
  {
    id: "ex_chest_13",
    name: "SVEND Press",
    category: "chest",
    difficulty: "beginner",
    equipment_needed: ["dumbbells"],
    targetMuscles: ["Inner Chest Squeeze"],
    form_guide: {
      steps: [
        "Stand tall pressing two small weight plates or a dumbbell between palms at sternum level.",
        "Squeeze palms together as hard as possible.",
        "Slowly extend arms straight out in front while maintaining squeeze, then pull back."
      ],
      common_mistakes: ["Losing palm compression during extension."],
      injury_prevention: "Focus on tension over heavy weight."
    },
    variations: [{ name: "Plate Press Out", description: "Performed lying on bench." }]
  },
  {
    id: "ex_chest_14",
    name: "Explosive Clap Push-Up",
    category: "chest",
    difficulty: "advanced",
    equipment_needed: ["bodyweight"],
    targetMuscles: ["Chest Power", "Triceps", "Fast-Twitch Fibers"],
    form_guide: {
      steps: [
        "Lower into push-up position.",
        "Push off floor explosively so hands leave ground.",
        "Clap hands quickly in mid-air and absorb landing with bent elbows."
      ],
      common_mistakes: ["Landing with locked elbows."],
      injury_prevention: "Perform on non-slip, forgiving surface."
    },
    variations: [{ name: "Plyo Push-Up to Box", description: "Explosive press onto elevated platform." }]
  },
  {
    id: "ex_chest_15",
    name: "Single-Arm Cable Press",
    category: "chest",
    difficulty: "intermediate",
    equipment_needed: ["cable"],
    targetMuscles: ["Chest", "Core Anti-Rotation"],
    form_guide: {
      steps: [
        "Set cable pulley to chest height. Stand facing away from pulley holding D-handle.",
        "Press handle forward while bracing core to prevent torso twisting.",
        "Return handle slowly to chest."
      ],
      common_mistakes: ["Allowing cable to pull shoulder backward out of alignment."],
      injury_prevention: "Brace core heavily throughout movement."
    },
    variations: [{ name: "Band Single Arm Press", description: "Home friendly alternative using bands." }]
  },

  // BACK EXERCISES (16-30)
  {
    id: "ex_back_01",
    name: "Conventional Barbell Deadlift",
    category: "back",
    difficulty: "advanced",
    equipment_needed: ["barbell"],
    targetMuscles: ["Erector Spinae", "Latissimus Dorsi", "Hamstrings", "Gluteus Maximus", "Trapezius"],
    form_guide: {
      steps: [
        "Stand with feet hip-width apart, barbell over mid-foot.",
        "Hinge at hips to grip bar just outside knees with overhand or mixed grip.",
        "Flatten back, pull shoulders back, brace core, and drive through heels to lift bar.",
        "Stand tall squeezing glutes at top, then lower bar along thighs under control."
      ],
      common_mistakes: [
        "Rounding lower back during lift (dangerous lumbar strain).",
        "Bar drifting away from shins/thighs.",
        "Hyperextending spine at lockout."
      ],
      injury_prevention: "Brace abdominal wall tightly and reset breath between each rep."
    },
    variations: [
      { name: "Sumo Deadlift", description: "Wider stance with hands inside knees, more quad/glute emphasis." },
      { name: "Romanian Deadlift", description: "Focused on hamstring and glute eccentric stretch." }
    ]
  },
  {
    id: "ex_back_02",
    name: "Pull-Up",
    category: "back",
    difficulty: "intermediate",
    equipment_needed: ["pullup_bar", "bodyweight"],
    targetMuscles: ["Latissimus Dorsi", "Rhomboids", "Middle/Lower Trapezius", "Biceps"],
    form_guide: {
      steps: [
        "Hang from pull-up bar with pronated grip (palms facing away) slightly wider than shoulders.",
        "Depress shoulder blades down and back before initiating pull.",
        "Pull chest up toward bar until chin clears bar.",
        "Lower body under full control back to dead hang."
      ],
      common_mistakes: [
        "Kipping or swinging legs for momentum.",
        "Not going down to full extension.",
        "Reaching chin up over bar while shrugging shoulders."
      ],
      injury_prevention: "Avoid uncontrolled dropping into dead hang at bottom."
    },
    variations: [
      { name: "Chin-Up", description: "Supinated grip (palms facing you) shifting emphasis to biceps." },
      { name: "Band-Assisted Pull-Up", description: "Uses loop band under foot to assist movement." }
    ]
  },
  {
    id: "ex_back_03",
    name: "Bent-Over Barbell Row",
    category: "back",
    difficulty: "intermediate",
    equipment_needed: ["barbell"],
    targetMuscles: ["Latissimus Dorsi", "Rhomboids", "Middle Trapezius", "Rear Deltoids"],
    form_guide: {
      steps: [
        "Stand with feet shoulder-width apart, hinge at hips until torso is ~45 degrees.",
        "Hold barbell with overhand grip slightly wider than shoulder width.",
        "Pull bar toward lower ribcage/belly button while squeezing shoulder blades together.",
        "Lower bar under control without rounding back."
      ],
      common_mistakes: [
        "Jerking upper body up and down to swing weight.",
        "Pulling bar to upper chest instead of abdomen."
      ],
      injury_prevention: "Keep lower back flat and knees slightly flexed to absorb strain."
    },
    variations: [
      { name: "Pendlay Row", description: "Bar starts from floor on every repetition." },
      { name: "Single-Arm Dumbbell Row", description: "One knee rested on bench for back support." }
    ]
  },
  {
    id: "ex_back_04",
    name: "Lat Pulldown (Wide Grip)",
    category: "back",
    difficulty: "beginner",
    equipment_needed: ["cable", "gym"],
    targetMuscles: ["Latissimus Dorsi", "Teres Major", "Biceps"],
    form_guide: {
      steps: [
        "Sit at cable machine securing thighs under pads.",
        "Grasp bar with wide overhand grip.",
        "Lean back slightly (10-15 degrees) and pull bar down to upper chest.",
        "Slowly extend arms back to starting position."
      ],
      common_mistakes: [
        "Pulling bar behind neck (damaging to shoulder joint).",
        "Excessive leaning back using bodyweight momentum."
      ],
      injury_prevention: "Pull with elbows leading down towards side pockets."
    },
    variations: [
      { name: "Close-Grip V-Bar Pulldown", description: "Emphasizes lower lat stretch." }
    ]
  },
  {
    id: "ex_back_05",
    name: "Single-Arm Dumbbell Row",
    category: "back",
    difficulty: "beginner",
    equipment_needed: ["dumbbells"],
    targetMuscles: ["Latissimus Dorsi", "Rhomboids", "Rear Delts"],
    form_guide: {
      steps: [
        "Place left knee and left hand flat on flat bench.",
        "Hold dumbbell in right hand with arm extended down.",
        "Pull dumbbell up towards hip pocket keeping elbow close to side.",
        "Lower under control back to stretch."
      ],
      common_mistakes: ["Twisting torso open at top of row.", "Pulling to shoulder instead of hip."],
      injury_prevention: "Keep spine parallel to bench throughout."
    },
    variations: [{ name: "Meadows Row", description: "Overhand landmine row variation." }]
  },
  {
    id: "ex_back_06",
    name: "Seated Cable Row",
    category: "back",
    difficulty: "beginner",
    equipment_needed: ["cable"],
    targetMuscles: ["Middle Trapezius", "Rhomboids", "Lats"],
    form_guide: {
      steps: [
        "Sit on bench with feet braced on footrests and knees slightly bent.",
        "Grip V-bar handle and sit upright with chest out.",
        "Pull handles into lower abdomen squeezing shoulder blades.",
        "Extend arms forward allowing lats to stretch."
      ],
      common_mistakes: ["Rocking back and forth at hips.", "Rounding shoulders at forward reach."],
      injury_prevention: "Maintain erect spinal alignment throughout."
    },
    variations: [{ name: "Wide Grip Seated Row", description: "Shifts emphasis to upper back and rear delts." }]
  },
  {
    id: "ex_back_07",
    name: "Inverted Bodyweight Row",
    category: "back",
    difficulty: "beginner",
    equipment_needed: ["pullup_bar", "bodyweight"],
    targetMuscles: ["Rhomboids", "Lats", "Rear Delts", "Core"],
    form_guide: {
      steps: [
        "Set bar in rack at waist height. Lie under bar and grip overhand shoulder-width.",
        "Keep body in rigid plank position with heels on floor.",
        "Pull chest up to touch bar, then lower slowly."
      ],
      common_mistakes: ["Hips sagging down.", "Pumping neck forward to touch bar."],
      injury_prevention: "Keep glutes squeezed tightly."
    },
    variations: [{ name: "Bent-Knee Inverted Row", description: "Bends knees at 90 degrees to lower resistance." }]
  },
  {
    id: "ex_back_08",
    name: "T-Bar Row",
    category: "back",
    difficulty: "intermediate",
    equipment_needed: ["barbell", "gym"],
    targetMuscles: ["Middle Back", "Lats", "Trapezius"],
    form_guide: {
      steps: [
        "Straddle landmine or T-bar machine and grip handles.",
        "Hinge at hips with flat back.",
        "Pull handles to chest squeezing back muscles.",
        "Lower under control to full arm stretch."
      ],
      common_mistakes: ["Standing up too high during row."],
      injury_prevention: "Maintain strong core contraction."
    },
    variations: [{ name: "Chest-Supported T-Bar Row", description: "Eliminates lower back strain." }]
  },
  {
    id: "ex_back_09",
    name: "Face Pulls",
    category: "back",
    difficulty: "beginner",
    equipment_needed: ["cable", "bands"],
    targetMuscles: ["Rear Deltoids", "Infraspinatus", "Middle Trapezius"],
    form_guide: {
      steps: [
        "Attach rope to high pulley. Grip ends with thumbs pointing back.",
        "Step back, pull rope directly towards nose/forehead while separating hands.",
        "Rotate shoulders externally at end of motion.",
        "Return slowly."
      ],
      common_mistakes: ["Pulling to neck without external rotation."],
      injury_prevention: "Essential exercise for shoulder health and posture."
    },
    variations: [{ name: "Band Face Pull", description: "Home option using resistance band." }]
  },
  {
    id: "ex_back_10",
    name: "Hyper-Extensions (Back Extensions)",
    category: "back",
    difficulty: "beginner",
    equipment_needed: ["gym", "bodyweight"],
    targetMuscles: ["Erector Spinae", "Glutes", "Hamstrings"],
    form_guide: {
      steps: [
        "Lock feet in hyper-extension bench with hips resting over pad.",
        "Cross arms over chest or behind head.",
        "Bend at waist to lower upper body down.",
        "Contract lower back and glutes to return torso to straight alignment."
      ],
      common_mistakes: ["Hyperextending spine excessively past straight line."],
      injury_prevention: "Stop when torso is parallel with legs."
    },
    variations: [{ name: "Weighted Back Extension", description: "Hold weight plate against chest." }]
  },
  {
    id: "ex_back_11",
    name: "Straight-Arm Cable Lat Pulldown",
    category: "back",
    difficulty: "intermediate",
    equipment_needed: ["cable"],
    targetMuscles: ["Latissimus Dorsi", "Teres Major"],
    form_guide: {
      steps: [
        "Stand facing high pulley holding straight bar with overhand grip.",
        "Keep arms straight with soft elbow bend, lean slightly forward.",
        "Pull bar down in arc to thighs using lats.",
        "Slowly return bar upward to eye height."
      ],
      common_mistakes: ["Bending elbows during pull (turning into tricep pushdown)."],
      injury_prevention: "Focus on isolating lats without arm flexion."
    },
    variations: [{ name: "Band Straight-Arm Pull", description: "Executed using resistance band." }]
  },
  {
    id: "ex_back_12",
    name: "Rack Pulls",
    category: "back",
    difficulty: "intermediate",
    equipment_needed: ["barbell"],
    targetMuscles: ["Upper/Lower Erector Spinae", "Trapezius", "Lats"],
    form_guide: {
      steps: [
        "Set safety bars in power rack just below or above knee level.",
        "Setup over barbell like conventional deadlift.",
        "Drive hips forward to stand upright.",
        "Lower bar back to safety pins."
      ],
      common_mistakes: ["Hyperextending lower back at top."],
      injury_prevention: "Great for building upper back thickness with reduced leg leverage."
    },
    variations: [{ name: "Above Knee Rack Pull", description: "Shorter range of motion for heavy load." }]
  },
  {
    id: "ex_back_13",
    name: "Single-Leg Romanian Deadlift with Dumbbell",
    category: "back",
    difficulty: "intermediate",
    equipment_needed: ["dumbbells"],
    targetMuscles: ["Erector Spinae", "Hamstrings", "Gluteus Medius"],
    form_guide: {
      steps: [
        "Stand on right foot holding dumbbell in left hand.",
        "Hinge at right hip extending left leg backward for balance.",
        "Lower dumbbell toward floor keeping spine neutral.",
        "Squeeze glute to return to standing upright."
      ],
      common_mistakes: ["Opening hip outward rather than keeping hips square."],
      injury_prevention: "Keep rear toe pointing down to lock hip alignment."
    },
    variations: [{ name: "Bodyweight Single-Leg RDL", description: "Master balance without weights." }]
  },
  {
    id: "ex_back_14",
    name: "Dumbbell Shrugs",
    category: "back",
    difficulty: "beginner",
    equipment_needed: ["dumbbells"],
    targetMuscles: ["Upper Trapezius"],
    form_guide: {
      steps: [
        "Stand tall holding heavy dumbbells at sides.",
        "Elevate shoulders straight up towards ears as high as possible.",
        "Hold contraction for 1 second, then lower shoulders down."
      ],
      common_mistakes: ["Rolling shoulders in circles (causes joint grinding)."],
      injury_prevention: "Shrug straight up and down vertically."
    },
    variations: [{ name: "Barbell Shrugs", description: "Allows heavier loading in front or behind back." }]
  },
  {
    id: "ex_back_15",
    name: "Good Mornings",
    category: "back",
    difficulty: "intermediate",
    equipment_needed: ["barbell"],
    targetMuscles: ["Erector Spinae", "Hamstrings", "Glutes"],
    form_guide: {
      steps: [
        "Rest barbell across upper traps (like squat setup).",
        "Soft knees, hinge back at hips lowering torso until nearly parallel to floor.",
        "Drive hips forward to stand tall."
      ],
      common_mistakes: ["Rounding spine while bending forward."],
      injury_prevention: "Start with very light weight to master hip hinge movement."
    },
    variations: [{ name: "Band Good Mornings", description: "Step on band and loop around neck." }]
  },

  // LEGS EXERCISES (31-50)
  {
    id: "ex_legs_01",
    name: "Barbell Back Squat",
    category: "legs",
    difficulty: "intermediate",
    equipment_needed: ["barbell"],
    targetMuscles: ["Quadriceps", "Gluteus Maximus", "Adductor Magnus", "Hamstrings"],
    form_guide: {
      steps: [
        "Rest barbell across upper traps. Unrack and take 2-3 steps back.",
        "Set feet slightly wider than shoulder-width with toes turned out 15-30 degrees.",
        "Inhale, brace core, and bend hips and knees simultaneously to lower until thighs break parallel.",
        "Drive through mid-foot to press back up to starting position."
      ],
      common_mistakes: [
        "Knees caving inward (valgus collapse).",
        "Rising onto toes during squat descent.",
        "Butt wink (excessive pelvic tuck at depth)."
      ],
      injury_prevention: "Push knees outward in line with toes during ascent."
    },
    variations: [
      { name: "Barbell Front Squat", description: "Bar rests on front deltoids, targeting quads more intensely." },
      { name: "Goblet Squat", description: "Dumbbell held at chest level for beginner progression." }
    ]
  },
  {
    id: "ex_legs_02",
    name: "Dumbbell Bulgarian Split Squat",
    category: "legs",
    difficulty: "intermediate",
    equipment_needed: ["dumbbells"],
    targetMuscles: ["Quadriceps", "Gluteus Maximus", "Hamstrings"],
    form_guide: {
      steps: [
        "Stand 2 feet in front of bench. Place top of rear foot flat on bench.",
        "Hold dumbbells at sides with tall posture.",
        "Lower hips until front thigh is parallel to floor and rear knee hovers above ground.",
        "Drive through front heel to stand up."
      ],
      common_mistakes: [
        "Front foot placed too close to bench (excessive knee shear).",
        "Leaning excessively forward."
      ],
      injury_prevention: "Keep front foot positioned far enough forward to maintain heel contact."
    },
    variations: [
      { name: "Bodyweight Split Squat", description: "Perform without dumbbells to master balance." }
    ]
  },
  {
    id: "ex_legs_03",
    name: "Leg Press Machine",
    category: "legs",
    difficulty: "beginner",
    equipment_needed: ["gym"],
    targetMuscles: ["Quadriceps", "Glutes", "Hamstrings"],
    form_guide: {
      steps: [
        "Sit on leg press machine placing feet hip-width on sled.",
        "Release safety handles and lower sled until knees form 90-degree angle.",
        "Press sled back up without locking knees out hard at top."
      ],
      common_mistakes: [
        "Locking knees forcibly at top.",
        "Lifting lower back/tailbone off backpad."
      ],
      injury_prevention: "Never allow knees to lock out completely under heavy weight."
    },
    variations: [
      { name: "High Foot Placement Leg Press", description: "Shifts load to glutes and hamstrings." }
    ]
  },
  {
    id: "ex_legs_04",
    name: "Walking Dumbbell Lunges",
    category: "legs",
    difficulty: "intermediate",
    equipment_needed: ["dumbbells"],
    targetMuscles: ["Quadriceps", "Glutes", "Calves"],
    form_guide: {
      steps: [
        "Hold dumbbells at sides. Step forward with right foot.",
        "Lower left knee toward floor until right thigh is parallel.",
        "Push through right heel and step left leg forward into next lunge stride."
      ],
      common_mistakes: ["Front knee extending past toes excessively.", "Loss of balance."],
      injury_prevention: "Maintain shoulder-width tracking with feet."
    },
    variations: [{ name: "Reverse Lunges", description: "Easier on knee joints." }]
  },
  {
    id: "ex_legs_05",
    name: "Barbell Hip Thrust",
    category: "legs",
    difficulty: "intermediate",
    equipment_needed: ["barbell"],
    targetMuscles: ["Gluteus Maximus", "Hamstrings"],
    form_guide: {
      steps: [
        "Sit on floor with upper back against bench, padded barbell over hips.",
        "Plant feet flat on floor knee-width apart.",
        "Drive through heels to extend hips upward until torso and thighs form straight line.",
        "Squeeze glutes at top for 1 second, then lower hips under control."
      ],
      common_mistakes: ["Arching lower back instead of hinging hips.", "Not reaching full hip extension."],
      injury_prevention: "Keep chin tucked toward chest throughout movement."
    },
    variations: [{ name: "Single Leg Hip Thrust", description: "Bodyweight unilateral variation." }]
  },
  {
    id: "ex_legs_06",
    name: "Romanian Deadlift (Barbell)",
    category: "legs",
    difficulty: "intermediate",
    equipment_needed: ["barbell"],
    targetMuscles: ["Hamstrings", "Gluteus Maximus", "Erector Spinae"],
    form_guide: {
      steps: [
        "Stand holding barbell with overhand grip at hip height.",
        "Soft knee bend, push hips backward lowering bar along thighs until deep hamstring stretch felt.",
        "Drive hips forward to return to standing."
      ],
      common_mistakes: ["Bending knees too much turning movement into squat."],
      injury_prevention: "Keep spine straight; stop descent when hips stop moving backward."
    },
    variations: [{ name: "Dumbbell RDL", description: "Allows natural wrist rotation." }]
  },
  {
    id: "ex_legs_07",
    name: "Lying Leg Curl Machine",
    category: "legs",
    difficulty: "beginner",
    equipment_needed: ["gym"],
    targetMuscles: ["Hamstrings (Biceps Femoris)"],
    form_guide: {
      steps: [
        "Lie face down on machine with lever pad resting just above ankles.",
        "Grasp handles and flex knees to pull pad toward glutes.",
        "Squeeze hamstrings at top, then lower under control."
      ],
      common_mistakes: ["Lifting hips off pad during curl."],
      injury_prevention: "Keep hips pressed flat against pad."
    },
    variations: [{ name: "Seated Leg Curl", description: "Targets hamstrings in hip-flexed position." }]
  },
  {
    id: "ex_legs_08",
    name: "Leg Extension Machine",
    category: "legs",
    difficulty: "beginner",
    equipment_needed: ["gym"],
    targetMuscles: ["Quadriceps (Rectus Femoris)"],
    form_guide: {
      steps: [
        "Sit on machine with back against pad, lower shin against lever pad.",
        "Extend legs upward until knees are straight.",
        "Pause at top, then slowly lower back down."
      ],
      common_mistakes: ["Using momentum or kicking weight."],
      injury_prevention: "Avoid heavy low-rep sets to protect patellar tendon."
    },
    variations: [{ name: "Single Leg Extension", description: "Corrects leg quad imbalance." }]
  },
  {
    id: "ex_legs_09",
    name: "Standing Calf Raises",
    category: "legs",
    difficulty: "beginner",
    equipment_needed: ["dumbbells", "bodyweight"],
    targetMuscles: ["Gastrocnemius", "Soleus"],
    form_guide: {
      steps: [
        "Stand with balls of feet on elevated step, heels hanging off edge.",
        "Lower heels down into deep stretch.",
        "Press up onto big toes as high as possible."
      ],
      common_mistakes: ["Bouncing rapidly at bottom without full stretch."],
      injury_prevention: "Pause at bottom stretch for 1 second."
    },
    variations: [{ name: "Seated Calf Raise", description: "Focuses specifically on soleus muscle." }]
  },
  {
    id: "ex_legs_10",
    name: "Bodyweight Air Squat",
    category: "legs",
    difficulty: "beginner",
    equipment_needed: ["bodyweight"],
    targetMuscles: ["Quads", "Glutes"],
    form_guide: {
      steps: [
        "Feet shoulder-width apart, arms out front for balance.",
        "Lower hips down until thighs parallel to ground.",
        "Stand up pushing through mid-foot."
      ],
      common_mistakes: ["Knees buckling inward."],
      injury_prevention: "Keep chest tall."
    },
    variations: [{ name: "Jump Squat", description: "Plyometric explosive squat." }]
  },
  {
    id: "ex_legs_11",
    name: "Sumo Squat with Dumbbell",
    category: "legs",
    difficulty: "beginner",
    equipment_needed: ["dumbbells"],
    targetMuscles: ["Adductors (Inner Thighs)", "Glutes", "Quads"],
    form_guide: {
      steps: [
        "Take wide stance with toes turned outward 45 degrees.",
        "Hold single heavy dumbbell vertically between legs.",
        "Squat down keeping knees tracking over toes.",
        "Drive through heels to stand."
      ],
      common_mistakes: ["Knees collapsing inside toe angle."],
      injury_prevention: "Stay upright and open hips."
    },
    variations: [{ name: "Barbell Sumo Squat", description: "Heavy loading on traps." }]
  },
  {
    id: "ex_legs_12",
    name: "Step-Ups onto Box/Bench",
    category: "legs",
    difficulty: "beginner",
    equipment_needed: ["dumbbells", "bodyweight"],
    targetMuscles: ["Quads", "Glutes"],
    form_guide: {
      steps: [
        "Stand in front of sturdy bench.",
        "Place right foot fully on bench.",
        "Drive through right heel to step up, bringing left foot to touch bench.",
        "Step left foot back down under control."
      ],
      common_mistakes: ["Pushing off trailing back foot."],
      injury_prevention: "Isolate leading leg completely."
    },
    variations: [{ name: "Weighted Box Step-Up", description: "Hold dumbbells at side." }]
  },
  {
    id: "ex_legs_13",
    name: "Sissy Squat",
    category: "legs",
    difficulty: "advanced",
    equipment_needed: ["bodyweight"],
    targetMuscles: ["Quadriceps Isolation"],
    form_guide: {
      steps: [
        "Hold onto support bar.",
        "Rise onto toes and lean torso back while pushing knees forward.",
        "Lower knees toward floor creating maximum quad stretch.",
        "Press through toes to return upright."
      ],
      common_mistakes: ["Going too low without knee stability."],
      injury_prevention: "Build up quad strength gradually before deep knee extension."
    },
    variations: [{ name: "Weighted Sissy Squat", description: "Hold plate against chest." }]
  },
  {
    id: "ex_legs_14",
    name: "Nordic Hamstring Curl",
    category: "legs",
    difficulty: "advanced",
    equipment_needed: ["bodyweight"],
    targetMuscles: ["Hamstring Eccentrics"],
    form_guide: {
      steps: [
        "Kneel on pad with ankles anchored firmly behind.",
        "Keep hips straight, lower torso forward towards floor under hamstring tension as slowly as possible.",
        "Catch self with hands, push off lightly and pull back up with hamstrings."
      ],
      common_mistakes: ["Bending at waist during descent."],
      injury_prevention: "Focus on slow 3-5 second eccentric phase."
    },
    variations: [{ name: "Band-Assisted Nordic Curl", description: "Band tied behind to assist pull." }]
  },
  {
    id: "ex_legs_15",
    name: "Cable Glute Kickback",
    category: "legs",
    difficulty: "beginner",
    equipment_needed: ["cable", "bands"],
    targetMuscles: ["Gluteus Maximus"],
    form_guide: {
      steps: [
        "Attach ankle cuff to low cable.",
        "Face pulley, lean forward slightly.",
        "Kick working leg back squeezing glute at top.",
        "Return leg slowly."
      ],
      common_mistakes: ["Hyperextending lower back."],
      injury_prevention: "Keep core tight and movement in hip joint only."
    },
    variations: [{ name: "Band Standing Kickback", description: "Perform with ankle loop band." }]
  },

  // SHOULDER EXERCISES (51-65)
  {
    id: "ex_shoulders_01",
    name: "Standing Barbell Overhead Press (OHP)",
    category: "shoulders",
    difficulty: "intermediate",
    equipment_needed: ["barbell"],
    targetMuscles: ["Anterior Deltoids", "Lateral Deltoids", "Triceps", "Upper Chest"],
    form_guide: {
      steps: [
        "Grip barbell shoulder-width apart resting across collarbone.",
        "Brace core and glutes, tilt head slightly back to clear chin.",
        "Press bar overhead in straight path until locked out.",
        "Lower under control back to collarbone."
      ],
      common_mistakes: ["Excessive leaning back arching spine.", "Using leg bounce (turns into push press)."],
      injury_prevention: "Keep abdominal wall rock solid to protect lower back."
    },
    variations: [
      { name: "Seated Dumbbell Shoulder Press", description: "Seated version with back support." },
      { name: "Push Press", description: "Uses dip-drive leg power to lift heavier weights." }
    ]
  },
  {
    id: "ex_shoulders_02",
    name: "Dumbbell Lateral Raise",
    category: "shoulders",
    difficulty: "beginner",
    equipment_needed: ["dumbbells"],
    targetMuscles: ["Lateral Deltoids (Side Shoulders)"],
    form_guide: {
      steps: [
        "Stand tall holding dumbbells at sides with slight elbow bend.",
        "Raise arms out to sides until parallel to floor.",
        "Pause briefly, then lower down slowly over 2 seconds."
      ],
      common_mistakes: ["Swinging torso for momentum.", "Shrugging traps up toward ears."],
      injury_prevention: "Lead movement with elbows rather than wrists."
    },
    variations: [{ name: "Cable Lateral Raise", description: "Provides constant tension across bottom of movement." }]
  },
  {
    id: "ex_shoulders_03",
    name: "Seated Arnold Press",
    category: "shoulders",
    difficulty: "intermediate",
    equipment_needed: ["dumbbells"],
    targetMuscles: ["Anterior Deltoids", "Lateral Deltoids", "Triceps"],
    form_guide: {
      steps: [
        "Sit on upright bench holding dumbbells at chest height with palms facing in.",
        "As you press upward, rotate wrists so palms face forward at top of extension.",
        "Reverse rotation on way down back to chest."
      ],
      common_mistakes: ["Rushing rotation phase.", "Arching lower back away from pad."],
      injury_prevention: "Keep rotation smooth and controlled throughout motion."
    },
    variations: [{ name: "Standing Arnold Press", description: "Demands core stabilization." }]
  },
  {
    id: "ex_shoulders_04",
    name: "Bent-Over Dumbbell Rear Delt Fly",
    category: "shoulders",
    difficulty: "beginner",
    equipment_needed: ["dumbbells"],
    targetMuscles: ["Posterior Deltoids (Rear Shoulders)", "Rhomboids"],
    form_guide: {
      steps: [
        "Hinge forward at hips until torso is nearly parallel to floor.",
        "Hold light dumbbells beneath chest with palms facing.",
        "Raise dumbbells out to sides squeezing rear delts.",
        "Lower under control."
      ],
      common_mistakes: ["Using heavy weights and swinging upper body."],
      injury_prevention: "Use light weight to focus purely on rear delt activation."
    },
    variations: [{ name: "Reverse Cable Fly", description: "Performed on cable crossover machine." }]
  },
  {
    id: "ex_shoulders_05",
    name: "Front Dumbbell Raise",
    category: "shoulders",
    difficulty: "beginner",
    equipment_needed: ["dumbbells"],
    targetMuscles: ["Anterior Deltoid"],
    form_guide: {
      steps: [
        "Hold dumbbells against front of thighs.",
        "Raise one dumbbell straight up in front to shoulder height.",
        "Lower under control and alternate arms."
      ],
      common_mistakes: ["Swinging back."],
      injury_prevention: "Keep torso stationary."
    },
    variations: [{ name: "Plate Front Raise", description: "Hold weight plate with both hands." }]
  },
  {
    id: "ex_shoulders_06",
    name: "Upright Barbell Row",
    category: "shoulders",
    difficulty: "intermediate",
    equipment_needed: ["barbell"],
    targetMuscles: ["Lateral Deltoids", "Trapezius"],
    form_guide: {
      steps: [
        "Hold barbell with grip shoulder-width apart.",
        "Pull bar straight up along body until elbows reach shoulder height.",
        "Lower bar back down slowly."
      ],
      common_mistakes: ["Gripping bar too narrow (causes shoulder impingement)."],
      injury_prevention: "Grip shoulder-width or wider and stop pulling at chest height."
    },
    variations: [{ name: "Dumbbell Upright Row", description: "Easier on wrist angles." }]
  },
  {
    id: "ex_shoulders_07",
    name: "Pike Push-Up",
    category: "shoulders",
    difficulty: "intermediate",
    equipment_needed: ["bodyweight"],
    targetMuscles: ["Anterior & Lateral Deltoids", "Triceps"],
    form_guide: {
      steps: [
        "Start in push-up position, then walk feet forward into inverted V shape.",
        "Lower crown of head toward floor in front of hands.",
        "Press back up along diagonal angle to pike start position."
      ],
      common_mistakes: ["Flaring elbows out to sides."],
      injury_prevention: "Tuck elbows at 45-degree angle."
    },
    variations: [{ name: "Handstand Push-Up", description: "Advanced vertical pressing against wall." }]
  },
  {
    id: "ex_shoulders_08",
    name: "Face Pulls with Resistance Band",
    category: "shoulders",
    difficulty: "beginner",
    equipment_needed: ["bands"],
    targetMuscles: ["Rear Delts", "Rotator Cuff"],
    form_guide: {
      steps: [
        "Anchor band at head height.",
        "Pull band to forehead separating hands, squeeze back of shoulders.",
        "Return slowly."
      ],
      common_mistakes: ["Pulling too low."],
      injury_prevention: "Great post-workout corrective movement."
    },
    variations: [{ name: "Seated Band Face Pull", description: "Performed seated on floor." }]
  },
  {
    id: "ex_shoulders_09",
    name: "Single-Arm Cable Lateral Raise",
    category: "shoulders",
    difficulty: "intermediate",
    equipment_needed: ["cable"],
    targetMuscles: ["Lateral Deltoid"],
    form_guide: {
      steps: [
        "Stand next to low pulley. Reach across body to grab handle.",
        "Raise handle out to side until arm is parallel to floor.",
        "Lower slowly resisting cable tension."
      ],
      common_mistakes: ["Leaning away from machine."],
      injury_prevention: "Keep body upright."
    },
    variations: [{ name: "Behind-the-Back Cable Lateral Raise", description: "Puts lateral delt under stretch at bottom." }]
  },
  {
    id: "ex_shoulders_10",
    name: "Landmine Press",
    category: "shoulders",
    difficulty: "beginner",
    equipment_needed: ["barbell"],
    targetMuscles: ["Anterior Deltoids", "Upper Chest"],
    form_guide: {
      steps: [
        "Place one end of barbell in landmine base or corner.",
        "Hold top sleeve with right hand at shoulder.",
        "Press bar upward and forward at 45-degree angle.",
        "Lower back to shoulder."
      ],
      common_mistakes: ["Leaning back too far."],
      injury_prevention: "Joint-friendly pressing option for shoulder impingements."
    },
    variations: [{ name: "Two-Handed Landmine Press", description: "Grasp bar end with both hands." }]
  },
  {
    id: "ex_shoulders_11",
    name: "Machine Shoulder Press",
    category: "shoulders",
    difficulty: "beginner",
    equipment_needed: ["gym"],
    targetMuscles: ["Anterior & Lateral Deltoids"],
    form_guide: {
      steps: [
        "Adjust seat so handles are at ear height.",
        "Press handles overhead to arm extension.",
        "Lower under control back to starting height."
      ],
      common_mistakes: ["Stack slamming on descent."],
      injury_prevention: "Avoid arching back."
    },
    variations: [{ name: "Neutral Grip Press Machine", description: "Puts less stress on rotator cuff." }]
  },
  {
    id: "ex_shoulders_12",
    name: "Reverse Pec Deck Machine",
    category: "shoulders",
    difficulty: "beginner",
    equipment_needed: ["gym"],
    targetMuscles: ["Rear Deltoids"],
    form_guide: {
      steps: [
        "Sit facing machine chest against pad.",
        "Grasp handles in front.",
        "Pull handles outward and backward in wide arc.",
        "Return slowly."
      ],
      common_mistakes: ["Shrugging traps."],
      injury_prevention: "Keep shoulders depressed."
    },
    variations: [{ name: "Single Arm Reverse Pec Deck", description: "Unilateral rear delt isolation." }]
  },
  {
    id: "ex_shoulders_13",
    name: "Cuban Press",
    category: "shoulders",
    difficulty: "intermediate",
    equipment_needed: ["dumbbells"],
    targetMuscles: ["Rotator Cuff", "Rear Delts", "Side Delts"],
    form_guide: {
      steps: [
        "Hold light dumbbells. Upright row to chest height.",
        "Externally rotate shoulders until dumbbells are overhead.",
        "Press overhead, then reverse sequence back down."
      ],
      common_mistakes: ["Using too heavy weight."],
      injury_prevention: "Use lightweight for rotator cuff strength."
    },
    variations: [{ name: "Barbell Cuban Press", description: "Performed with light barbell." }]
  },
  {
    id: "ex_shoulders_14",
    name: "Plate Bus Drivers",
    category: "shoulders",
    difficulty: "beginner",
    equipment_needed: ["dumbbells"],
    targetMuscles: ["Anterior Deltoids", "Isometric Endurance"],
    form_guide: {
      steps: [
        "Hold weight plate straight out in front at shoulder height.",
        "Rotate plate 90 degrees clockwise, then 90 degrees counter-clockwise.",
        "Maintain straight arm height throughout set."
      ],
      common_mistakes: ["Dropping arms below shoulder height."],
      injury_prevention: "Keep core braced."
    },
    variations: [{ name: "Dumbbell Hold & Rotate", description: "Hold dumbbells out front." }]
  },
  {
    id: "ex_shoulders_15",
    name: "Scapular Wall Slides",
    category: "shoulders",
    difficulty: "beginner",
    equipment_needed: ["bodyweight"],
    targetMuscles: ["Serratus Anterior", "Lower Trapezius", "Posture"],
    form_guide: {
      steps: [
        "Stand with back, head, and elbows flat against wall.",
        "Slide forearms up wall keeping wrists and elbows in wall contact.",
        "Slide back down to starting position."
      ],
      common_mistakes: ["Lower back arching off wall."],
      injury_prevention: "Excellent mobility warm-up."
    },
    variations: [{ name: "Foam Roller Wall Slides", description: "Forearms roll on foam roller against wall." }]
  },

  // ARMS EXERCISES (66-75)
  {
    id: "ex_arms_01",
    name: "Barbell Bicep Curl",
    category: "arms",
    difficulty: "beginner",
    equipment_needed: ["barbell"],
    targetMuscles: ["Biceps Brachii", "Brachialis"],
    form_guide: {
      steps: [
        "Stand tall gripping barbell underhand shoulder-width apart.",
        "Keep elbows pinned to ribcage, curl bar upward toward shoulders.",
        "Squeeze biceps at top, then lower bar down over 2-3 seconds."
      ],
      common_mistakes: ["Swinging hips for momentum.", "Elbows drifting forward."],
      injury_prevention: "Keep back flat and stay stationary."
    },
    variations: [
      { name: "EZ-Bar Curl", description: "Angled grip reduces wrist strain." },
      { name: "Dumbbell Hammer Curl", description: "Neutral grip targeting brachialis and forearm." }
    ]
  },
  {
    id: "ex_arms_02",
    name: "Tricep Rope Pushdown",
    category: "arms",
    difficulty: "beginner",
    equipment_needed: ["cable"],
    targetMuscles: ["Triceps Brachii (Lateral & Medial Heads)"],
    form_guide: {
      steps: [
        "Attach rope to high cable pulley. Grip ends with palms facing.",
        "Keep upper arms pinned to sides.",
        "Extend forearms down, spreading rope ends apart at bottom extension.",
        "Return slowly to 90-degree elbow bend."
      ],
      common_mistakes: ["Flaring upper arms away from sides.", "Leaning whole body over rope."],
      injury_prevention: "Keep upper arms locked in place."
    },
    variations: [{ name: "Straight Bar Pushdown", description: "Allows heavier weight overload." }]
  },
  {
    id: "ex_arms_03",
    name: "Dumbbell Incline Bicep Curl",
    category: "arms",
    difficulty: "intermediate",
    equipment_needed: ["dumbbells"],
    targetMuscles: ["Long Head Biceps Brachii"],
    form_guide: {
      steps: [
        "Sit on 45-degree incline bench with dumbbells hanging at arm's length.",
        "Keep shoulders back against pad, curl dumbbells up.",
        "Squeeze biceps at top, then lower fully under stretch."
      ],
      common_mistakes: ["Shoulders swinging forward off pad."],
      injury_prevention: "Enforces full bicep stretch."
    },
    variations: [{ name: "Incline Hammer Curl", description: "Neutral grip stretch on incline." }]
  },
  {
    id: "ex_arms_04",
    name: "Skull Crushers (Lying Tricep Extension)",
    category: "arms",
    difficulty: "intermediate",
    equipment_needed: ["barbell", "dumbbells"],
    targetMuscles: ["Long Head Triceps"],
    form_guide: {
      steps: [
        "Lie on flat bench holding EZ-bar above shoulders.",
        "Hinge at elbows lowering bar toward forehead.",
        "Extend forearms back to starting position."
      ],
      common_mistakes: ["Elbows splaying outwards."],
      injury_prevention: "Lower bar behind head slightly to relieve elbow stress."
    },
    variations: [{ name: "Dumbbell Skull Crushers", description: "Neutral grip on dumbbells." }]
  },
  {
    id: "ex_arms_05",
    name: "Concentration Curl",
    category: "arms",
    difficulty: "beginner",
    equipment_needed: ["dumbbells"],
    targetMuscles: ["Biceps Peak"],
    form_guide: {
      steps: [
        "Sit on bench, rest tricep against inner thigh.",
        "Curl dumbbell up to chest.",
        "Lower under full control."
      ],
      common_mistakes: ["Using leg to push arm up."],
      injury_prevention: "Strict isolation movement."
    },
    variations: [{ name: "Standing Cable Concentration Curl", description: "Cable version standing." }]
  },
  {
    id: "ex_arms_06",
    name: "Overhead Dumbbell Tricep Extension",
    category: "arms",
    difficulty: "beginner",
    equipment_needed: ["dumbbells"],
    targetMuscles: ["Long Head Triceps"],
    form_guide: {
      steps: [
        "Sit or stand holding single heavy dumbbell with both hands overhead.",
        "Lower dumbbell behind head flexing elbows.",
        "Press dumbbell back up overhead."
      ],
      common_mistakes: ["Arching lower back excessively."],
      injury_prevention: "Brace core to keep spine neutral."
    },
    variations: [{ name: "Cable Overhead Extension", description: "Continuous tension using rope cable." }]
  },
  {
    id: "ex_arms_07",
    name: "Preacher Curl",
    category: "arms",
    difficulty: "intermediate",
    equipment_needed: ["barbell", "dumbbells", "gym"],
    targetMuscles: ["Short Head Biceps"],
    form_guide: {
      steps: [
        "Rest triceps over preacher bench pad.",
        "Lower EZ-bar until arms fully extended.",
        "Curl bar back up squeezing biceps."
      ],
      common_mistakes: ["Bouncing weight at bottom extension."],
      injury_prevention: "Avoid hyperextending elbows violently at bottom."
    },
    variations: [{ name: "Dumbbell Single Arm Preacher Curl", description: "Unilateral bicep focus." }]
  },
  {
    id: "ex_arms_08",
    name: "Bench Tricep Dips",
    category: "arms",
    difficulty: "beginner",
    equipment_needed: ["bodyweight"],
    targetMuscles: ["Triceps Brachii"],
    form_guide: {
      steps: [
        "Hands on edge of bench, feet extended out in front.",
        "Lower hips by bending elbows to 90 degrees.",
        "Push back up to top lockout."
      ],
      common_mistakes: ["Shoulders shrugging up near ears."],
      injury_prevention: "Keep torso close to bench edge."
    },
    variations: [{ name: "Weighted Bench Dip", description: "Place weight plate across thighs." }]
  },
  {
    id: "ex_arms_09",
    name: "Reverse Grip Barbell Curl",
    category: "arms",
    difficulty: "beginner",
    equipment_needed: ["barbell"],
    targetMuscles: ["Brachioradialis (Forearm)", "Brachialis"],
    form_guide: {
      steps: [
        "Grip barbell overhand (palms down).",
        "Curl bar upward keeping wrists straight.",
        "Lower down slowly."
      ],
      common_mistakes: ["Bending wrists upward at top."],
      injury_prevention: "Use manageable weight to protect forearms."
    },
    variations: [{ name: "Cable Reverse Curl", description: "Cable variation." }]
  },
  {
    id: "ex_arms_10",
    name: "Close-Grip Barbell Bench Press",
    category: "arms",
    difficulty: "intermediate",
    equipment_needed: ["barbell"],
    targetMuscles: ["Triceps Brachii", "Inner Chest"],
    form_guide: {
      steps: [
        "Lie on bench, grip bar shoulder-width apart.",
        "Lower bar to chest keeping elbows tucked to ribs.",
        "Press up forcefully."
      ],
      common_mistakes: ["Gripping too narrow (<6 inches apart puts extreme wrist strain)."],
      injury_prevention: "Keep hands shoulder-width apart."
    },
    variations: [{ name: "Close Grip Floor Press", description: "Protects shoulder joints." }]
  },

  // CORE EXERCISES (76-85)
  {
    id: "ex_core_01",
    name: "Plank Hold",
    category: "core",
    difficulty: "beginner",
    equipment_needed: ["bodyweight"],
    targetMuscles: ["Transverse Abdominis", "Rectus Abdominis", "Obliques"],
    form_guide: {
      steps: [
        "Rest forearms on floor with elbows directly beneath shoulders.",
        "Extend legs back on toes, body forming straight line from head to heels.",
        "Brace belly button to spine, squeeze glutes, hold position."
      ],
      common_mistakes: ["Sagging hips down.", "Piking hips high in air.", "Holding breath."],
      injury_prevention: "Maintain deep continuous breathing."
    },
    variations: [
      { name: "Side Plank", description: "Rests on one forearm targeting obliques." },
      { name: "Weighted Plank", description: "Place weight plate on upper back." }
    ]
  },
  {
    id: "ex_core_02",
    name: "Hanging Leg Raise",
    category: "core",
    difficulty: "intermediate",
    equipment_needed: ["pullup_bar", "bodyweight"],
    targetMuscles: ["Lower Rectus Abdominis", "Hip Flexors"],
    form_guide: {
      steps: [
        "Hang from pull-up bar with straight arms.",
        "Raise straight legs up until parallel to floor (or toes to bar).",
        "Lower legs down slowly without swinging body."
      ],
      common_mistakes: ["Swinging body back and forth for momentum."],
      injury_prevention: "Control descent to prevent lower back strain."
    },
    variations: [{ name: "Hanging Knee Raise", description: "Bends knees to 90 degrees for easier lever." }]
  },
  {
    id: "ex_core_03",
    name: "Ab Wheel Rollout",
    category: "core",
    difficulty: "advanced",
    equipment_needed: ["bodyweight"],
    targetMuscles: ["Rectus Abdominis", "Transverse Abdominis", "Lats"],
    form_guide: {
      steps: [
        "Kneel on pad holding ab wheel handles below shoulders.",
        "Roll wheel forward extending body into straight line above ground.",
        "Contract abs to pull wheel back under shoulders."
      ],
      common_mistakes: ["Sagging lumbar spine into hyperextension."],
      injury_prevention: "Only roll out as far as core can maintain flat back."
    },
    variations: [{ name: "Band-Assisted Rollout", description: "Band attached behind to assist return." }]
  },
  {
    id: "ex_core_04",
    name: "Cable Ab Crunch",
    category: "core",
    difficulty: "beginner",
    equipment_needed: ["cable"],
    targetMuscles: ["Rectus Abdominis"],
    form_guide: {
      steps: [
        "Kneel in front of high cable holding rope attachment by ears.",
        "Flex spine to curl elbows down toward knees.",
        "Uncurl slowly back to vertical."
      ],
      common_mistakes: ["Pulling rope with arms instead of flexing abs."],
      injury_prevention: "Keep hips locked in position throughout."
    },
    variations: [{ name: "Band Kneeling Crunch", description: "Uses resistance band overhead." }]
  },
  {
    id: "ex_core_05",
    name: "Russian Twists",
    category: "core",
    difficulty: "beginner",
    equipment_needed: ["dumbbells", "bodyweight"],
    targetMuscles: ["Internal & External Obliques"],
    form_guide: {
      steps: [
        "Sit on floor with knees bent and feet elevated slightly.",
        "Lean back 45 degrees, rotate torso side to side touching ground beside hips."
      ],
      common_mistakes: ["Twisting arms without rotating thoracic spine."],
      injury_prevention: "Keep chest open and head following shoulders."
    },
    variations: [{ name: "Weighted Russian Twist", description: "Hold dumbbell or plate." }]
  },
  {
    id: "ex_core_06",
    name: "Bicycle Crunches",
    category: "core",
    difficulty: "beginner",
    equipment_needed: ["bodyweight"],
    targetMuscles: ["Obliques", "Rectus Abdominis"],
    form_guide: {
      steps: [
        "Lie flat on back, hands lightly behind head, legs lifted.",
        "Bring right elbow to left knee while extending right leg straight.",
        "Alternate sides in fluid pedaling motion."
      ],
      common_mistakes: ["Yanking neck forward with hands."],
      injury_prevention: "Focus on shoulder rotation rather than elbow strain."
    },
    variations: [{ name: "Slow Tempo Bicycle Crunch", description: "Pause 2 seconds at each cross." }]
  },
  {
    id: "ex_core_07",
    name: "Paloff Press",
    category: "core",
    difficulty: "intermediate",
    equipment_needed: ["cable", "bands"],
    targetMuscles: ["Core Anti-Rotation", "Obliques"],
    form_guide: {
      steps: [
        "Stand perpendicular to cable machine, holding handle at chest.",
        "Press handle straight out in front resisting cable twist pull.",
        "Hold 2 seconds, pull back to chest."
      ],
      common_mistakes: ["Torso twisting toward stack."],
      injury_prevention: "Fantastic exercise for lower back rehabilitation."
    },
    variations: [{ name: "Band Pallof Press", description: "Executed using resistance band." }]
  },
  {
    id: "ex_core_08",
    name: "Mountain Climbers",
    category: "core",
    difficulty: "beginner",
    equipment_needed: ["cardio", "bodyweight"],
    targetMuscles: ["Rectus Abdominis", "Hip Flexors", "Cardio"],
    form_guide: {
      steps: [
        "Start in high push-up plank position.",
        "Drive right knee toward chest, quickly jump-switch legs.",
        "Maintain quick rhythm while keeping hips low."
      ],
      common_mistakes: ["Bouncing hips up in air."],
      injury_prevention: "Keep wrists aligned under shoulders."
    },
    variations: [{ name: "Cross-Body Mountain Climbers", description: "Drive knee to opposite elbow." }]
  },
  {
    id: "ex_core_09",
    name: "Deadbug",
    category: "core",
    difficulty: "beginner",
    equipment_needed: ["bodyweight"],
    targetMuscles: ["Deep Core", "Transverse Abdominis"],
    form_guide: {
      steps: [
        "Lie on back with arms pointing up and knees bent 90 degrees.",
        "Lower right arm back over head while extending left leg straight down.",
        "Return to top and switch opposite sides."
      ],
      common_mistakes: ["Lower back arching off floor."],
      injury_prevention: "Press lower back firmly into floor throughout."
    },
    variations: [{ name: "Weighted Deadbug", description: "Hold light dumbbells." }]
  },
  {
    id: "ex_core_10",
    name: "Captain's Chair Leg Raise",
    category: "core",
    difficulty: "beginner",
    equipment_needed: ["gym"],
    targetMuscles: ["Lower Abs", "Hip Flexors"],
    form_guide: {
      steps: [
        "Step into Captain's chair resting forearms on pads.",
        "Raise knees up toward chest in smooth motion.",
        "Lower under control."
      ],
      common_mistakes: ["Swinging legs for momentum."],
      injury_prevention: "Keep back pressed against rear pad."
    },
    variations: [{ name: "Straight Leg Captain's Raise", description: "Extends legs straight for higher resistance." }]
  }
];
