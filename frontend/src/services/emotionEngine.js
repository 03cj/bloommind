// ============================================
// 🌿 BLOOMMIND — Emotion Engine (Client-side)
// Keyword-based emotion detection + leaf mapping
// Used as fallback when backend is unavailable
// ============================================

// ── Emotion Keyword Map ──────────────────────
const EMOTION_KEYWORDS = {
  // Original 19 emotions
  stress: [
    'stress', 'stressed', 'overwhelmed', 'pressure', 'pressured',
    'burnout', 'exhausted', 'pagod', 'napagod', 'oberwelm',
    'too much', 'maraming trabaho', 'overloaded', 'drained',
  ],
  sad: [
    'sad', 'sadness', 'malungkot', 'cry', 'crying', 'umiyak',
    'heartbroken', 'broken', 'hurt', 'pain', 'grief', 'loss',
    'miss', 'missing', 'nawala', 'wala na',
  ],
  lonely: [
    'lonely', 'alone', 'mag-isa', 'nag-iisa', 'isolated',
    'no one', 'walang kasama', 'abandoned', 'left out',
    'forgotten', 'invisible', 'nobody cares',
  ],
  love: [
    'love', 'mahal', 'in love', 'crush', 'kilig', 'happy',
    'joy', 'joyful', 'masaya', 'grateful', 'thankful',
    'blessed', 'content', 'fulfilled', 'loved',
  ],
  heartbreak: [
    'heartbreak', 'heartbroken', 'broken heart', 'ex', 'breakup',
    'break up', 'hiwalay', 'nawala siya', 'she left', 'he left',
    'rejected', 'rejection', 'unrequited', 'sawi',
  ],
  hope: [
    'hope', 'hopeful', 'pag-asa', 'better', 'improve',
    'tomorrow', 'future', 'dream', 'wish', 'believe',
    'faith', 'trust', 'new beginning', 'fresh start',
  ],
  anger: [
    'angry', 'anger', 'galit', 'mad', 'furious', 'frustrated',
    'frustration', 'irritated', 'annoyed', 'unfair', 'injustice',
    'hate', 'ayaw ko', 'nakakainis', 'inis',
  ],
  calm: [
    'calm', 'peaceful', 'peace', 'relaxed', 'relax', 'quiet',
    'still', 'serene', 'tranquil', 'okay', 'fine', 'alright',
    'payapa', 'tahimik', 'rest', 'resting',
  ],
  healing: [
    'healing', 'heal', 'recover', 'recovery', 'getting better',
    'moving on', 'move on', 'pagtanggap', 'accept', 'acceptance',
    'letting go', 'pakawalan', 'forgive', 'forgiveness',
  ],
  deep: [
    'deep', 'profound', 'existential', 'meaning', 'purpose',
    'lost', 'confused', 'nalilito', 'nawawala', 'searching',
    'who am i', 'bakit', 'why', 'question', 'wonder',
  ],
  passion: [
    'passion', 'passionate', 'excited', 'excited', 'fire',
    'driven', 'motivated', 'ambition', 'goal', 'dream big',
    'determined', 'strong', 'powerful', 'lakas', 'sigasig',
  ],
  anxiety: [
    'anxiety', 'anxious', 'worried', 'nervous', 'tense',
    'restless', 'uneasy', 'panic', 'fear', 'scared',
    'takot', 'kaba', 'worried', 'overthinking',
  ],
  joy: [
    'joy', 'joyful', 'happy', 'happiness', 'excited',
    'thrilled', 'delighted', 'cheerful', 'upbeat',
    'masaya', 'saya', 'tuwa', 'celebrate',
  ],
  gratitude: [
    'grateful', 'thankful', 'blessed', 'appreciate',
    'thank you', 'salamat', 'appreciation', 'gratitude',
    'fortunate', 'lucky', 'blessed',
  ],
  nostalgia: [
    'nostalgia', 'nostalgic', 'memories', 'remember',
    'miss', 'missing', 'alala', 'alaala', 'past',
    'childhood', 'throwback', 'reminisce',
  ],
  courage: [
    'courage', 'brave', 'strong', 'strength', 'bold',
    'fearless', 'determined', 'resilient', 'tough',
    'matapang', 'lakas', 'determinado',
  ],
  peace: [
    'peace', 'peaceful', 'serene', 'tranquil', 'harmony',
    'balanced', 'centered', 'grounded', 'still',
    'kapayapaan', 'tahimik', 'payapa',
  ],
  wonder: [
    'wonder', 'curious', 'amazed', 'awed', 'fascinated',
    'intrigued', 'interested', 'explore', 'discover',
    'magical', 'amazing', 'incredible',
  ],
  melancholy: [
    'melancholy', 'melancholic', 'wistful', 'pensive',
    'reflective', 'contemplative', 'thoughtful',
    'malungkot', 'malumbay', 'sentimental',
  ],
  // New 31 emotions to reach 50
  excitement: [
    'excited', 'excitement', 'thrilled', 'pumped', 'energized',
    'enthusiastic', 'eager', 'anticipating', 'looking forward',
    'can\'t wait', 'sabik', 'nasasabik', 'hyped',
  ],
  fear: [
    'fear', 'afraid', 'scared', 'terrified', 'frightened',
    'horror', 'dread', 'phobia', 'nightmare', 'takot',
    'kinakabahan', 'nanginginig', 'panic',
  ],
  surprise: [
    'surprise', 'surprised', 'shocked', 'astonished', 'amazed',
    'unexpected', 'wow', 'omg', 'oh my', 'gulat',
    'nagulat', 'hindi inaasahan', 'out of nowhere',
  ],
  disgust: [
    'disgust', 'disgusted', 'gross', 'revolting', 'repulsive',
    'sick', 'nauseous', 'yuck', 'eww', 'kadiri',
    'nakakasuka', 'nakakadiri', 'awful',
  ],
  shame: [
    'shame', 'ashamed', 'embarrassed', 'humiliated', 'mortified',
    'disgraced', 'guilty', 'hiya', 'nakakahiya',
    'napahiya', 'kahihiyan', 'embarrassment',
  ],
  guilt: [
    'guilt', 'guilty', 'remorse', 'regret', 'sorry',
    'fault', 'blame', 'my bad', 'kasalanan',
    'nagkasala', 'pagkakamali', 'mali ko',
  ],
  pride: [
    'pride', 'proud', 'accomplished', 'achievement', 'success',
    'triumph', 'victory', 'won', 'excelled', 'ipinagmamalaki',
    'karangalan', 'tagumpay', 'achievement',
  ],
  envy: [
    'envy', 'envious', 'jealous', 'covet', 'wish I had',
    'why not me', 'unfair', 'inggit', 'naiinggit',
    'sana all', 'bakit sila', 'comparison',
  ],
  jealousy: [
    'jealous', 'jealousy', 'possessive', 'territorial',
    'suspicious', 'distrust', 'insecure', 'selos',
    'nagseselos', 'seloso', 'selosa', 'threatened',
  ],
  embarrassment: [
    'embarrassed', 'embarrassment', 'awkward', 'cringe',
    'blushing', 'red face', 'oops', 'my mistake',
    'nakakahiya', 'napahiya', 'hiyang-hiya',
  ],
  contempt: [
    'contempt', 'contemptuous', 'disdain', 'scorn', 'disrespect',
    'look down', 'superior', 'better than', 'dismissive',
    'hamak', 'maliitin', 'mataas ang lipad',
  ],
  awe: [
    'awe', 'awed', 'awe-inspiring', 'breathtaking', 'magnificent',
    'majestic', 'grand', 'spectacular', 'marvel',
    'kamangha-mangha', 'nakakamangha', 'kahanga-hanga',
  ],
  serenity: [
    'serenity', 'serene', 'tranquil', 'placid', 'undisturbed',
    'untroubled', 'at ease', 'content', 'satisfied',
    'katahimikan', 'tahimik na isipan', 'inner peace',
  ],
  euphoria: [
    'euphoria', 'euphoric', 'ecstatic', 'elated', 'on cloud nine',
    'overjoyed', 'blissful', 'rapturous', 'exhilarated',
    'sobrang saya', 'labis na tuwa', 'peak happiness',
  ],
  despair: [
    'despair', 'despairing', 'hopeless', 'helpless', 'defeated',
    'giving up', 'no way out', 'end of rope', 'desperate',
    'kawalan ng pag-asa', 'sukong-suko', 'walang laban',
  ],
  grief: [
    'grief', 'grieving', 'mourning', 'bereaved', 'loss',
    'devastated', 'shattered', 'broken', 'anguish',
    'pagluluksa', 'matinding kalungkutan', 'deep sorrow',
  ],
  remorse: [
    'remorse', 'remorseful', 'regret', 'regretful', 'sorry',
    'apologetic', 'contrite', 'penitent', 'repentant',
    'pagsisisi', 'nagsisisi', 'pinagsisihan',
  ],
  anticipation: [
    'anticipation', 'anticipating', 'expecting', 'awaiting',
    'looking forward', 'counting down', 'preparing',
    'excited for', 'inaabangan', 'naghihintay',
  ],
  trust: [
    'trust', 'trusting', 'faith', 'confidence', 'reliance',
    'dependable', 'reliable', 'secure', 'safe',
    'tiwala', 'mapagkakatiwalaan', 'kumpiyansa',
  ],
  admiration: [
    'admiration', 'admire', 'look up to', 'respect', 'esteem',
    'appreciation', 'impressed', 'inspired', 'motivated',
    'hangaan', 'humahanga', 'ginagalang',
  ],
  amusement: [
    'amusement', 'amused', 'entertained', 'funny', 'humorous',
    'laughing', 'giggling', 'chuckling', 'hilarious',
    'nakakatawa', 'natatawa', 'kasiyahan',
  ],
  boredom: [
    'bored', 'boredom', 'uninterested', 'nothing to do',
    'dull', 'monotonous', 'tedious', 'repetitive',
    'walang magawa', 'nakakabagot', 'boring',
  ],
  confusion: [
    'confused', 'confusion', 'bewildered', 'puzzled', 'perplexed',
    'lost', 'uncertain', 'unsure', 'mixed up',
    'nalilito', 'litong-lito', 'hindi maintindihan',
  ],
  curiosity: [
    'curious', 'curiosity', 'inquisitive', 'interested',
    'want to know', 'wondering', 'questioning', 'exploring',
    'mausisa', 'nagtataka', 'gustong malaman',
  ],
  determination: [
    'determined', 'determination', 'resolute', 'committed',
    'persistent', 'persevering', 'unwavering', 'steadfast',
    'determinado', 'matiyaga', 'hindi sumusuko',
  ],
  disappointment: [
    'disappointed', 'disappointment', 'let down', 'deflated',
    'discouraged', 'disheartened', 'unfulfilled', 'unmet',
    'nadismaya', 'nabigo', 'hindi natupad',
  ],
  frustration: [
    'frustrated', 'frustration', 'exasperated', 'aggravated',
    'fed up', 'at my limit', 'can\'t take it', 'impatient',
    'naiirita', 'naiinis', 'sawang-sawa',
  ],
  impatience: [
    'impatient', 'impatience', 'restless', 'antsy', 'fidgety',
    'can\'t wait', 'hurry up', 'waiting', 'delayed',
    'mainipin', 'hindi mapakali', 'mabilis mainis',
  ],
  longing: [
    'longing', 'longing for', 'yearning', 'craving', 'pining',
    'wish for', 'desire', 'ache for', 'homesick',
    'nangungulila', 'nananabik', 'paghahangad',
  ],
  relief: [
    'relief', 'relieved', 'weight off', 'burden lifted',
    'thank goodness', 'finally', 'at last', 'free',
    'ginhawa', 'nahinga', 'magaan ang pakiramdam',
  ],
  satisfaction: [
    'satisfied', 'satisfaction', 'content', 'fulfilled',
    'pleased', 'gratified', 'accomplished', 'complete',
    'nasiyahan', 'kontento', 'masaya na',
  ],
};

// ── Leaf Map ─────────────────────────────────
// Maps emotion → leaf/plant emoji for display
const LEAF_MAP = {
  // Original 19 emotions
  stress:     { single: '🌿', bundle: '🌲' },
  sad:        { single: '🍂', bundle: '🍁' },
  lonely:     { single: '🌾', bundle: '🌾' },
  love:       { single: '🍀', bundle: '🌿' },
  heartbreak: { single: '🥀', bundle: '🍂' },
  hope:       { single: '🌱', bundle: '🌿' },
  anger:      { single: '🌵', bundle: '🌲' },
  calm:       { single: '🍃', bundle: '🌿' },
  healing:    { single: '🌿', bundle: '🌳' },
  deep:       { single: '🌴', bundle: '🌲' },
  passion:    { single: '🌺', bundle: '🌻' },
  anxiety:    { single: '🌵', bundle: '🌲' },
  joy:        { single: '🌻', bundle: '🌻' },
  gratitude:  { single: '🍀', bundle: '🌿' },
  nostalgia:  { single: '🍂', bundle: '🍁' },
  courage:    { single: '🌲', bundle: '🌲' },
  peace:      { single: '🍃', bundle: '🌿' },
  wonder:     { single: '🌸', bundle: '🌺' },
  melancholy: { single: '🥀', bundle: '🍂' },
  // New 31 emotions
  excitement:    { single: '🌻', bundle: '🌻' },
  fear:          { single: '🌵', bundle: '🌲' },
  surprise:      { single: '🌸', bundle: '🌺' },
  disgust:       { single: '🍂', bundle: '🍁' },
  shame:         { single: '🥀', bundle: '🍂' },
  guilt:         { single: '🥀', bundle: '🍂' },
  pride:         { single: '🌲', bundle: '🌲' },
  envy:          { single: '🌵', bundle: '🌲' },
  jealousy:      { single: '🌵', bundle: '🌲' },
  embarrassment: { single: '🥀', bundle: '🍂' },
  contempt:      { single: '🌵', bundle: '🌲' },
  awe:           { single: '🌸', bundle: '🌺' },
  serenity:      { single: '🍃', bundle: '🌿' },
  euphoria:      { single: '🌻', bundle: '🌻' },
  despair:       { single: '🥀', bundle: '🍂' },
  grief:         { single: '🍂', bundle: '🍁' },
  remorse:       { single: '🥀', bundle: '🍂' },
  anticipation:  { single: '🌱', bundle: '🌿' },
  trust:         { single: '🍀', bundle: '🌿' },
  admiration:    { single: '🌸', bundle: '🌺' },
  amusement:     { single: '🌻', bundle: '🌻' },
  boredom:       { single: '🌾', bundle: '🌾' },
  confusion:     { single: '🌴', bundle: '🌲' },
  curiosity:     { single: '🌱', bundle: '🌿' },
  determination: { single: '🌲', bundle: '🌲' },
  disappointment:{ single: '🍂', bundle: '🍁' },
  frustration:   { single: '🌵', bundle: '🌲' },
  impatience:    { single: '🌵', bundle: '🌲' },
  longing:       { single: '🌾', bundle: '🌾' },
  relief:        { single: '🍃', bundle: '🌿' },
  satisfaction:  { single: '🍀', bundle: '🌿' },
};

// ── Emotional Messages ───────────────────────
const MESSAGES = {
  // Original 19 emotions
  stress:     'Your garden holds fern — a symbol of resilience and strength even under pressure.',
  sad:        'Your garden holds autumn leaves — a reminder that beauty exists even in moments of letting go.',
  lonely:     'Your garden holds wheat — a symbol of quiet dignity and the grace of standing alone.',
  love:       'Your garden blooms with clover — a symbol of luck, warmth, and the joy of connection.',
  heartbreak: 'Your garden holds withered petals — a symbol of healing hearts and the courage to feel deeply.',
  hope:       'Your garden carries seedlings — a gentle symbol of hope, new beginnings, and the light ahead.',
  anger:      'Your garden holds cactus — a symbol of fierce emotion and the fire that drives change.',
  calm:       'Your garden carries leaves — a symbol of peaceful grace and quiet inner strength.',
  healing:    'Your garden holds herbs — a symbol of healing, renewal, and gentle restoration.',
  deep:       'Your garden carries palm — a symbol of rare depth and searching souls.',
  passion:    'Your garden blooms with hibiscus — a symbol of passionate spirit and vibrant, unstoppable energy.',
  anxiety:    'Your garden holds cactus — a symbol of protection and the strength to weather storms.',
  joy:        'Your garden blooms with sunflower — a symbol of radiant happiness and positive energy.',
  gratitude:  'Your garden carries clover — a symbol of gratitude and the warmth of being blessed.',
  nostalgia:  'Your garden holds autumn leaves — a symbol of cherished memories and the beauty of the past.',
  courage:    'Your garden stands with pine — a symbol of unwavering strength and fearless spirit.',
  peace:      'Your garden carries leaves — a symbol of harmony and the gentle flow of inner peace.',
  wonder:     'Your garden blooms with cherry blossom — a symbol of awe and the magic of discovery.',
  melancholy: 'Your garden holds withered petals — a symbol of deep reflection and tender sentiment.',
  // New 31 emotions
  excitement:    'Your garden blooms with sunflower — a symbol of vibrant energy and the thrill of what\'s to come.',
  fear:          'Your garden holds cactus — a symbol of protection and the courage to face the unknown.',
  surprise:      'Your garden blooms with cherry blossom — a symbol of unexpected beauty and life\'s delightful twists.',
  disgust:       'Your garden holds autumn leaves — a symbol of release and the wisdom to turn away from harm.',
  shame:         'Your garden holds withered petals — a symbol of vulnerability and the strength found in humility.',
  guilt:         'Your garden holds withered petals — a symbol of conscience and the path to making things right.',
  pride:         'Your garden stands with pine — a symbol of achievement and the heights you\'ve reached.',
  envy:          'Your garden holds cactus — a symbol of longing and the fire that can fuel your own growth.',
  jealousy:      'Your garden holds cactus — a symbol of fierce protectiveness and the depth of what you value.',
  embarrassment: 'Your garden holds withered petals — a symbol of tender moments and the beauty of being human.',
  contempt:      'Your garden holds cactus — a symbol of boundaries and the strength to hold your ground.',
  awe:           'Your garden blooms with cherry blossom — a symbol of wonder and the magnificence of existence.',
  serenity:      'Your garden carries leaves — a symbol of deep tranquility and the stillness of a peaceful mind.',
  euphoria:      'Your garden blooms with sunflower — a symbol of pure bliss and the peak of happiness.',
  despair:       'Your garden holds withered petals — a symbol of deep sorrow and the seeds of eventual renewal.',
  grief:         'Your garden holds autumn leaves — a symbol of profound loss and the honor of loving deeply.',
  remorse:       'Your garden holds withered petals — a symbol of heartfelt regret and the courage to seek forgiveness.',
  anticipation:  'Your garden carries seedlings — a symbol of eager waiting and the promise of what\'s ahead.',
  trust:         'Your garden carries clover — a symbol of faith and the warmth of reliable bonds.',
  admiration:    'Your garden blooms with cherry blossom — a symbol of appreciation and the beauty you see in others.',
  amusement:     'Your garden blooms with sunflower — a symbol of lighthearted joy and the gift of laughter.',
  boredom:       'Your garden holds wheat — a symbol of stillness and the potential waiting to be awakened.',
  confusion:     'Your garden carries palm — a symbol of searching and the journey toward clarity.',
  curiosity:     'Your garden carries seedlings — a symbol of wonder and the eagerness to explore.',
  determination: 'Your garden stands with pine — a symbol of unwavering resolve and the strength to persevere.',
  disappointment:'Your garden holds autumn leaves — a symbol of unmet expectations and the resilience to try again.',
  frustration:   'Your garden holds cactus — a symbol of restless energy and the drive to push through barriers.',
  impatience:    'Your garden holds cactus — a symbol of restless anticipation and the eagerness for change.',
  longing:       'Your garden holds wheat — a symbol of yearning and the quiet ache of distant dreams.',
  relief:        'Your garden carries leaves — a symbol of release and the gentle ease of burdens lifted.',
  satisfaction:  'Your garden carries clover — a symbol of contentment and the warmth of a heart at peace.',
};

// ── Multi-emotion Messages ───────────────────
function buildMessage(detectedEmotions, leaves) {
  if (detectedEmotions.length === 0) {
    return 'Your garden is a gentle reflection of your heart — whatever you carry, you are seen.';
  }

  if (detectedEmotions.length === 1) {
    return MESSAGES[detectedEmotions[0]] || MESSAGES.calm;
  }

  // Multi-emotion: build a combined message
  const leafNames = leaves.map(l => FLOWER_DISPLAY_NAMES[l] || l);
  const uniqueNames = [...new Set(leafNames)];
  const nameList = uniqueNames.length > 1
    ? uniqueNames.slice(0, -1).join(', ') + ' and ' + uniqueNames[uniqueNames.length - 1]
    : uniqueNames[0];

  return `Your garden carries ${nameList} — a reflection of the many layers within you. Each plant honors a different part of what you feel.`;
}

// ── Intensity Detection ──────────────────────
const INTENSITY_WORDS = [
  'very', 'so', 'really', 'extremely', 'deeply', 'sobra', 'grabe',
  'too', 'super', 'talaga', 'lubos', 'labis', 'intense', 'overwhelming',
];

function detectIntensity(text) {
  const lower = text.toLowerCase();
  return INTENSITY_WORDS.some(word => lower.includes(word));
}

// ── Main Analysis Function ───────────────────
/**
 * Analyzes text client-side and returns leaves + message.
 * @param {string} text
 * @returns {{ flowers: string[], message: string, emotions: string[] }}
 */
export function analyzeLocally(text) {
  const lower = text.toLowerCase();
  const isIntense = detectIntensity(lower);
  const detectedEmotions = [];

  // Score each emotion
  for (const [emotion, keywords] of Object.entries(EMOTION_KEYWORDS)) {
    const score = keywords.filter(kw => lower.includes(kw)).length;
    if (score > 0) {
      detectedEmotions.push({ emotion, score });
    }
  }

  // Sort by score descending, take top 3
  detectedEmotions.sort((a, b) => b.score - a.score);
  const topEmotions = detectedEmotions.slice(0, 3).map(e => e.emotion);

  // Default to 'calm' if nothing detected
  if (topEmotions.length === 0) {
    topEmotions.push('calm');
  }

  // Map to leaves
  const flowers = topEmotions.map(emotion => {
    const leafEntry = LEAF_MAP[emotion];
    if (!leafEntry) return '🍃';
    return isIntense ? leafEntry.bundle : leafEntry.single;
  });

  // Remove duplicates
  const uniqueFlowers = [...new Set(flowers)];

  const message = buildMessage(topEmotions, uniqueFlowers);

  return {
    flowers: uniqueFlowers,
    message,
    emotions: topEmotions,
  };
}

// ── Leaf Display Names ───────────────────────
export const FLOWER_DISPLAY_NAMES = {
  '🌿': 'Fern',
  '🌲': 'Pine',
  '🍂': 'Autumn Leaf',
  '🍁': 'Maple',
  '🌾': 'Wheat',
  '🍀': 'Clover',
  '🥀': 'Withered Rose',
  '🌱': 'Seedling',
  '🌵': 'Cactus',
  '🍃': 'Leaf',
  '🌳': 'Tree',
  '🌴': 'Palm',
  '🌺': 'Hibiscus',
  '🌻': 'Sunflower',
  '🌸': 'Cherry Blossom',
};

export const FLOWER_MEANINGS = {
  '🌿': 'resilience & inner strength',
  '🌲': 'endurance & stability',
  '🍂': 'letting go & gentle sadness',
  '🍁': 'change & transformation',
  '🌾': 'quiet dignity & solitude',
  '🍀': 'luck & warm connection',
  '🥀': 'healing hearts & deep feeling',
  '🌱': 'hope & new beginnings',
  '🌵': 'fierce emotion & protection',
  '🍃': 'peaceful grace & calm',
  '🌳': 'healing & renewal',
  '🌴': 'rare depth & searching soul',
  '🌺': 'passion & vibrant energy',
  '🌻': 'joy & positive energy',
  '🌸': 'wonder & gentle beauty',
};