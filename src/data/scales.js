export const scales = [
  {
    id: 'pss-10',
    name: 'Perceived Stress Scale 10-Item Scale',
    shortName: 'Stress',
    description: 'A classic instrument for measuring the perception of stress.',
    timeEstimate: '3 min',
    questions: [
      "In the last month, how often have you been upset because of something that happened unexpectedly?",
      "In the last month, how often have you felt that you were unable to control the important things in your life?",
      "In the last month, how often have you felt nervous and 'stressed'?",
      "In the last month, how often have you felt confident about your ability to handle your personal problems?",
      "In the last month, how often have you felt that things were going your way?",
      "In the last month, how often have you found that you could not cope with all the things that you had to do?",
      "In the last month, how often have you been able to control irritations in your life?",
      "In the last month, how often have you felt that you were on top of things?",
      "In the last month, how often have you been angered because of things that were outside of your control?",
      "In the last month, how often have you felt difficulties were piling up so high that you could not overcome them?"
    ],
    options: [
      { text: "Never", value: 0 },
      { text: "Almost Never", value: 1 },
      { text: "Sometimes", value: 2 },
      { text: "Fairly Often", value: 3 },
      { text: "Very Often", value: 4 }
    ],
    scoringRules: {
      reverseItems: [3, 4, 6, 7] // 0-indexed: Q4, Q5, Q7, Q8
    },
    interpretation: [
      { min: 0, max: 13, label: 'Low Stress', color: 'text-green-400', desc: 'Your perceived stress level is relatively low.' },
      { min: 14, max: 26, label: 'Moderate Stress', color: 'text-yellow-400', desc: 'You are experiencing a moderate level of stress. Consider self-care and stress-management techniques.' },
      { min: 27, max: 40, label: 'High Perceived Stress', color: 'text-red-400', desc: 'Your perceived stress level is high. It may be helpful to consult a professional or seek support.' }
    ],
    sourceLinks: [
      { text: 'Perceived stress in daily life', url: 'https://www.slu.edu/medicine/family-medicine/-pdf/perceived-stress-scale.pdf' },
      { text: 'Perceived Stress Scale Scoring Guide', url: 'https://podcast.uctv.tv/webdocuments/cohen-perceived-stress-scale.pdf' }
    ],
    disclaimer: 'This is a screening tool, not a diagnosis.'
  },
  {
    id: 'gad-7',
    name: 'Generalized Anxiety Disorder 7-Item Scale',
    shortName: 'Anxiety',
    description: 'A validated tool to screen for and measure the severity of generalized anxiety disorder.',
    timeEstimate: '2 min',
    questions: [
      "Feeling nervous, anxious, or on edge",
      "Not being able to stop or control worrying",
      "Worrying too much about different things",
      "Trouble relaxing",
      "Being so restless that it is hard to sit still",
      "Becoming easily annoyed or irritable",
      "Feeling afraid, as if something awful might happen"
    ],
    options: [
      { text: "Not at all", value: 0 },
      { text: "Several days", value: 1 },
      { text: "More than half the days", value: 2 },
      { text: "Nearly every day", value: 3 }
    ],
    scoringRules: {
      reverseItems: []
    },
    interpretation: [
      { min: 0, max: 4, label: 'Minimal Anxiety', color: 'text-green-400', desc: 'Your symptoms suggest minimal to no anxiety.' },
      { min: 5, max: 9, label: 'Mild Anxiety', color: 'text-blue-400', desc: 'Your symptoms suggest mild anxiety.' },
      { min: 10, max: 14, label: 'Moderate Anxiety', color: 'text-yellow-400', desc: 'Your symptoms suggest moderate anxiety. It may be helpful to talk to a health professional.' },
      { min: 15, max: 21, label: 'Severe Anxiety', color: 'text-red-400', desc: 'Your symptoms suggest severe anxiety. We recommend consulting a healthcare provider.' }
    ],
    sourceLinks: [
      { text: 'Anxiety symptoms', url: 'https://www.dartmouth-hitchcock.org/sites/default/files/2021-02/gad-7-anxiety-scale.pdf' },
      { text: 'Anxiety Screening Tool', url: 'https://adaa.org/sites/default/files/2026-01/GAD-7_Anxiety-updated_0.pdf' }
    ],
    disclaimer: 'This is a screening tool, not a diagnosis.'
  },
  {
    id: 'phq-9',
    name: 'Patient Health Questionnaire 9-Item Depression Scale',
    shortName: 'Depression',
    description: 'A widely used instrument for screening, diagnosing, monitoring and measuring the severity of depression.',
    timeEstimate: '3 min',
    questions: [
      "Little interest or pleasure in doing things",
      "Feeling down, depressed, or hopeless",
      "Trouble falling or staying asleep, or sleeping too much",
      "Feeling tired or having little energy",
      "Poor appetite or overeating",
      "Feeling bad about yourself — or that you are a failure or have let yourself or your family down",
      "Trouble concentrating on things, such as reading the newspaper or watching television",
      "Moving or speaking so slowly that other people could have noticed? Or the opposite — being so fidgety or restless that you have been moving around a lot more than usual",
      "Thoughts that you would be better off dead or of hurting yourself in some way"
    ],
    options: [
      { text: "Not at all", value: 0 },
      { text: "Several days", value: 1 },
      { text: "More than half the days", value: 2 },
      { text: "Nearly every day", value: 3 }
    ],
    scoringRules: {
      reverseItems: [],
      safetyItemIndex: 8 // Q9 is index 8
    },
    interpretation: [
      { min: 0, max: 4, label: 'Minimal Depression', color: 'text-green-400', desc: 'Your symptoms suggest minimal to no depression.' },
      { min: 5, max: 9, label: 'Mild Depression', color: 'text-blue-400', desc: 'Your symptoms suggest mild depression.' },
      { min: 10, max: 14, label: 'Moderate Depression', color: 'text-yellow-400', desc: 'Your symptoms suggest moderate depression. Please consider talking to a healthcare professional.' },
      { min: 15, max: 19, label: 'Moderately Severe Depression', color: 'text-orange-400', desc: 'Your symptoms suggest moderately severe depression. Professional support is recommended.' },
      { min: 20, max: 27, label: 'Severe Depression', color: 'text-red-400', desc: 'Your symptoms suggest severe depression. Please consult a qualified mental health professional.' }
    ],
    sourceLinks: [
      { text: 'Depression / low mood symptoms', url: 'https://www.apa.org/depression-guideline/patient-health-questionnaire.pdf' },
      { text: 'Patient Depression Questionnaire', url: 'https://integrationacademy.ahrq.gov/sites/default/files/2020-07/PHQ-9.pdf' }
    ],
    disclaimer: 'This is a screening tool, not a diagnosis.'
  },
  {
    id: 'who-5',
    name: 'World Health Organization 5-Item Well-Being Index',
    shortName: 'Wellbeing',
    description: 'A short self-reported measure of current mental wellbeing.',
    timeEstimate: '1 min',
    questions: [
      "I have felt cheerful and in good spirits",
      "I have felt calm and relaxed",
      "I have felt active and vigorous",
      "I woke up feeling fresh and rested",
      "My daily life has been filled with things that interest me"
    ],
    options: [
      { text: "At no time", value: 0 },
      { text: "Some of the time", value: 1 },
      { text: "Less than half of the time", value: 2 },
      { text: "More than half of the time", value: 3 },
      { text: "Most of the time", value: 4 },
      { text: "All of the time", value: 5 }
    ],
    scoringRules: {
      reverseItems: [],
      multiplyBy: 4 // Raw score range: 0-25. Percentage score = raw score * 4
    },
    interpretation: [
      { min: 0, max: 28, label: 'Poor Wellbeing', color: 'text-red-400', desc: 'Your score suggests poor wellbeing. You may benefit from professional support.' },
      { min: 29, max: 50, label: 'Low Wellbeing', color: 'text-yellow-400', desc: 'Your score suggests low wellbeing. Consider focusing on self-care or seeking support.' },
      { min: 51, max: 100, label: 'Moderate/Good Wellbeing', color: 'text-green-400', desc: 'Your score suggests moderate to good mental wellbeing.' }
    ],
    sourceLinks: [
      { text: 'General mental wellbeing / positive mood', url: 'https://www.who.int/publications/m/item/WHO-UCN-MSD-MHE-2024.01' },
      { text: 'WHO-5 Questionnaire PDF', url: 'https://cdn.who.int/media/docs/default-source/mental-health/who-5_english-original4da539d6ed4b49389e3afe47cda2326a.pdf' }
    ],
    disclaimer: 'This is a screening tool, not a diagnosis.'
  },
  {
    id: 'isi',
    name: 'Insomnia Severity Index',
    shortName: 'Sleep',
    description: 'A brief screening measure of insomnia severity.',
    timeEstimate: '2 min',
    questions: [
      "Difficulty falling asleep",
      "Difficulty staying asleep",
      "Problems waking up too early",
      "How SATISFIED/DISSATISFIED are you with your CURRENT sleep pattern?",
      "How NOTICEABLE to others do you think your sleep problem is in terms of impairing the quality of your life?",
      "How WORRIED/DISTRESSED are you about your current sleep problem?",
      "To what extent do you consider your sleep problem to INTERFERE with your daily functioning (e.g. daytime fatigue, mood, ability to function at work/daily chores, concentration, etc.) CURRENTLY?"
    ],
    options: [
      { text: "None / Very Satisfied / Not at all", value: 0 },
      { text: "Mild / Satisfied / A little", value: 1 },
      { text: "Moderate / Neutral / Somewhat", value: 2 },
      { text: "Severe / Dissatisfied / Much", value: 3 },
      { text: "Very Severe / Very Dissatisfied / Very much", value: 4 }
    ],
    scoringRules: {
      reverseItems: []
    },
    interpretation: [
      { min: 0, max: 7, label: 'No clinically significant insomnia', color: 'text-green-400', desc: 'You are experiencing no significant insomnia.' },
      { min: 8, max: 14, label: 'Subthreshold insomnia', color: 'text-blue-400', desc: 'You are experiencing subthreshold insomnia.' },
      { min: 15, max: 21, label: 'Moderate insomnia', color: 'text-yellow-400', desc: 'You are experiencing clinical insomnia (moderate severity).' },
      { min: 22, max: 28, label: 'Severe insomnia', color: 'text-red-400', desc: 'You are experiencing clinical insomnia (severe).' }
    ],
    sourceLinks: [
      { text: 'Sleep problems / insomnia severity', url: 'https://www.med.upenn.edu/cbti/assets/user-content/documents/Insomnia%20Severity%20Index%20%28ISI%29.pdf' },
      { text: 'Licensing / permission info', url: 'https://eprovide.mapi-trust.org/instruments/insomnia-severity-index' }
    ],
    disclaimer: 'This is a screening tool, not a diagnosis.'
  }
];

export const calculateScore = (scaleId, answers) => {
  const scale = scales.find(s => s.id === scaleId);
  if (!scale) return 0;
  
  let totalScore = 0;
  
  answers.forEach((val, index) => {
    let score = val;
    if (scale.scoringRules.reverseItems?.includes(index)) {
      // Reverse scoring logic
      const maxVal = scale.options[scale.options.length - 1].value;
      score = maxVal - val;
    }
    totalScore += score;
  });

  if (scale.scoringRules.multiplyBy) {
    totalScore = totalScore * scale.scoringRules.multiplyBy;
  }
  
  return totalScore;
};

export const getInterpretation = (scaleId, score) => {
  const scale = scales.find(s => s.id === scaleId);
  if (!scale) return null;
  
  return scale.interpretation.find(int => score >= int.min && score <= int.max);
};

export const getMaxScore = (scaleId) => {
  const scale = scales.find(s => s.id === scaleId);
  if (!scale) return 0;
  
  const maxOptionValue = Math.max(...scale.options.map(o => o.value));
  let maxScore = scale.questions.length * maxOptionValue;

  if (scale.scoringRules.multiplyBy) {
    maxScore = maxScore * scale.scoringRules.multiplyBy;
  }
  
  return maxScore;
};
