// ============================================
// 🌸 BLOOMMIND — Emotion Service (Backend)
// Server-side emotion detection + flower mapping
// ============================================

// ── Emotion Keyword Map ──────────────────────
const EMOTION_KEYWORDS = {
  // Original 11 emotions
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
  // New 39 emotions to reach 50
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

// ── Flower Map ───────────────────────────────
const FLOWER_MAP = {
  // Original 11 emotions
  stress:     { single: 'sunflower_single',    bundle: 'sunflower_single' },
  sad:        { single: 'cherry_blossom_single', bundle: 'cherry_blossom_single' },
  lonely:     { single: 'white_lily_single',   bundle: 'white_lily_single' },
  love:       { single: 'rose_bundle',         bundle: 'rose_bundle' },
  heartbreak: { single: 'peony_single',        bundle: 'peony_bundle' },
  hope:       { single: 'daisy_bundle',        bundle: 'daisy_bundle2' },
  anger:      { single: 'marigold_single',     bundle: 'marigold_single' },
  calm:       { single: 'tulip_single',        bundle: 'tulip_bundle' },
  healing:    { single: 'sampaguita_single',   bundle: 'sampaguita_single' },
  deep:       { single: 'walingwaling_single', bundle: 'walingwaling_single' },
  passion:    { single: 'gumamela_single',     bundle: 'gumamela_single' },
  // New 39 emotions - mapped to existing flowers
  anxiety:       { single: 'marigold_single',     bundle: 'marigold_single' },
  joy:           { single: 'sunflower_single',    bundle: 'sunflower_single' },
  gratitude:     { single: 'rose_bundle',         bundle: 'rose_bundle' },
  nostalgia:     { single: 'cherry_blossom_single', bundle: 'cherry_blossom_single' },
  courage:       { single: 'marigold_single',     bundle: 'marigold_single' },
  peace:         { single: 'tulip_single',        bundle: 'tulip_bundle' },
  wonder:        { single: 'cherry_blossom_single', bundle: 'cherry_blossom_single' },
  melancholy:    { single: 'peony_single',        bundle: 'peony_bundle' },
  excitement:    { single: 'sunflower_single',    bundle: 'sunflower_single' },
  fear:          { single: 'marigold_single',     bundle: 'marigold_single' },
  surprise:      { single: 'cherry_blossom_single', bundle: 'cherry_blossom_single' },
  disgust:       { single: 'cherry_blossom_single', bundle: 'cherry_blossom_single' },
  shame:         { single: 'peony_single',        bundle: 'peony_bundle' },
  guilt:         { single: 'peony_single',        bundle: 'peony_bundle' },
  pride:         { single: 'marigold_single',     bundle: 'marigold_single' },
  envy:          { single: 'marigold_single',     bundle: 'marigold_single' },
  jealousy:      { single: 'marigold_single',     bundle: 'marigold_single' },
  embarrassment: { single: 'peony_single',        bundle: 'peony_bundle' },
  contempt:      { single: 'marigold_single',     bundle: 'marigold_single' },
  awe:           { single: 'cherry_blossom_single', bundle: 'cherry_blossom_single' },
  serenity:      { single: 'tulip_single',        bundle: 'tulip_bundle' },
  euphoria:      { single: 'sunflower_single',    bundle: 'sunflower_single' },
  despair:       { single: 'peony_single',        bundle: 'peony_bundle' },
  grief:         { single: 'cherry_blossom_single', bundle: 'cherry_blossom_single' },
  remorse:       { single: 'peony_single',        bundle: 'peony_bundle' },
  anticipation:  { single: 'daisy_bundle',        bundle: 'daisy_bundle2' },
  trust:         { single: 'rose_bundle',         bundle: 'rose_bundle' },
  admiration:    { single: 'cherry_blossom_single', bundle: 'cherry_blossom_single' },
  amusement:     { single: 'sunflower_single',    bundle: 'sunflower_single' },
  boredom:       { single: 'white_lily_single',   bundle: 'white_lily_single' },
  confusion:     { single: 'walingwaling_single', bundle: 'walingwaling_single' },
  curiosity:     { single: 'daisy_bundle',        bundle: 'daisy_bundle2' },
  determination: { single: 'marigold_single',     bundle: 'marigold_single' },
  disappointment:{ single: 'cherry_blossom_single', bundle: 'cherry_blossom_single' },
  frustration:   { single: 'marigold_single',     bundle: 'marigold_single' },
  impatience:    { single: 'marigold_single',     bundle: 'marigold_single' },
  longing:       { single: 'white_lily_single',   bundle: 'white_lily_single' },
  relief:        { single: 'tulip_single',        bundle: 'tulip_bundle' },
  satisfaction:  { single: 'rose_bundle',         bundle: 'rose_bundle' },
};

// ── Emotional Messages ───────────────────────
const MESSAGES = {
  // Original 11 emotions
  stress:     'Your bouquet carries sunflower — a symbol of resilience and strength even under pressure.',
  sad:        'Your bouquet holds cherry blossom — a reminder that beauty blooms even in fleeting moments of sadness.',
  lonely:     'Your bouquet carries white lily — a symbol of quiet dignity and the grace of solitude.',
  love:       'Your bouquet blooms with rose — a timeless symbol of love, warmth, and the joy of connection.',
  heartbreak: 'Your bouquet holds peony — a symbol of healing hearts and the courage to feel deeply.',
  hope:       'Your bouquet carries daisy — a gentle symbol of hope, new beginnings, and the light ahead.',
  anger:      'Your bouquet holds marigold — a symbol of fierce emotion and the fire that drives change.',
  calm:       'Your bouquet carries tulip — a symbol of peaceful grace and quiet inner strength.',
  healing:    'Your bouquet holds sampaguita — our national flower, a symbol of healing, purity, and gentle renewal.',
  deep:       'Your bouquet carries walingwaling — the queen of Philippine orchids, a symbol of rare depth and searching souls.',
  passion:    'Your bouquet blooms with gumamela — a symbol of passionate spirit and vibrant, unstoppable energy.',
  // New 39 emotions
  anxiety:       'Your bouquet holds marigold — a symbol of protection and the strength to weather storms.',
  joy:           'Your bouquet blooms with sunflower — a symbol of radiant happiness and positive energy.',
  gratitude:     'Your bouquet carries rose — a symbol of gratitude and the warmth of being blessed.',
  nostalgia:     'Your bouquet holds cherry blossom — a symbol of cherished memories and the beauty of the past.',
  courage:       'Your bouquet stands with marigold — a symbol of unwavering strength and fearless spirit.',
  peace:         'Your bouquet carries tulip — a symbol of harmony and the gentle flow of inner peace.',
  wonder:        'Your bouquet blooms with cherry blossom — a symbol of awe and the magic of discovery.',
  melancholy:    'Your bouquet holds peony — a symbol of deep reflection and tender sentiment.',
  excitement:    'Your bouquet blooms with sunflower — a symbol of vibrant energy and the thrill of what\'s to come.',
  fear:          'Your bouquet holds marigold — a symbol of protection and the courage to face the unknown.',
  surprise:      'Your bouquet blooms with cherry blossom — a symbol of unexpected beauty and life\'s delightful twists.',
  disgust:       'Your bouquet holds cherry blossom — a symbol of release and the wisdom to turn away from harm.',
  shame:         'Your bouquet holds peony — a symbol of vulnerability and the strength found in humility.',
  guilt:         'Your bouquet holds peony — a symbol of conscience and the path to making things right.',
  pride:         'Your bouquet stands with marigold — a symbol of achievement and the heights you\'ve reached.',
  envy:          'Your bouquet holds marigold — a symbol of longing and the fire that can fuel your own growth.',
  jealousy:      'Your bouquet holds marigold — a symbol of fierce protectiveness and the depth of what you value.',
  embarrassment: 'Your bouquet holds peony — a symbol of tender moments and the beauty of being human.',
  contempt:      'Your bouquet holds marigold — a symbol of boundaries and the strength to hold your ground.',
  awe:           'Your bouquet blooms with cherry blossom — a symbol of wonder and the magnificence of existence.',
  serenity:      'Your bouquet carries tulip — a symbol of deep tranquility and the stillness of a peaceful mind.',
  euphoria:      'Your bouquet blooms with sunflower — a symbol of pure bliss and the peak of happiness.',
  despair:       'Your bouquet holds peony — a symbol of deep sorrow and the seeds of eventual renewal.',
  grief:         'Your bouquet holds cherry blossom — a symbol of profound loss and the honor of loving deeply.',
  remorse:       'Your bouquet holds peony — a symbol of heartfelt regret and the courage to seek forgiveness.',
  anticipation:  'Your bouquet carries daisy — a symbol of eager waiting and the promise of what\'s ahead.',
  trust:         'Your bouquet carries rose — a symbol of faith and the warmth of reliable bonds.',
  admiration:    'Your bouquet blooms with cherry blossom — a symbol of appreciation and the beauty you see in others.',
  amusement:     'Your bouquet blooms with sunflower — a symbol of lighthearted joy and the gift of laughter.',
  boredom:       'Your bouquet holds white lily — a symbol of stillness and the potential waiting to be awakened.',
  confusion:     'Your bouquet carries walingwaling — a symbol of searching and the journey toward clarity.',
  curiosity:     'Your bouquet carries daisy — a symbol of wonder and the eagerness to explore.',
  determination: 'Your bouquet stands with marigold — a symbol of unwavering resolve and the strength to persevere.',
  disappointment:'Your bouquet holds cherry blossom — a symbol of unmet expectations and the resilience to try again.',
  frustration:   'Your bouquet holds marigold — a symbol of restless energy and the drive to push through barriers.',
  impatience:    'Your bouquet holds marigold — a symbol of restless anticipation and the eagerness for change.',
  longing:       'Your bouquet holds white lily — a symbol of yearning and the quiet ache of distant dreams.',
  relief:        'Your bouquet carries tulip — a symbol of release and the gentle ease of burdens lifted.',
  satisfaction:  'Your bouquet carries rose — a symbol of contentment and the warmth of a heart at peace.',
};

// ── Intensity Detection ──────────────────────
const INTENSITY_WORDS = [
  'very', 'so', 'really', 'extremely', 'deeply', 'sobra', 'grabe',
  'too', 'super', 'talaga', 'lubos', 'labis', 'intense', 'overwhelming',
];

function detectIntensity(text) {
  const lower = text.toLowerCase();
  return INTENSITY_WORDS.some(word => lower.includes(word));
}

// ── Build Multi-emotion Message ──────────────
function buildMessage(detectedEmotions, flowers) {
  if (detectedEmotions.length === 0) {
    return 'Your bouquet is a gentle reflection of your heart — whatever you carry, you are seen.';
  }

  if (detectedEmotions.length === 1) {
    return MESSAGES[detectedEmotions[0]] || MESSAGES.calm;
  }

  const flowerNames = flowers.map(f => {
    return f.replace(/_single|_bundle|_bundle2/g, '').replace(/_/g, ' ');
  });

  const uniqueNames = [...new Set(flowerNames)];
  const nameList = uniqueNames.length > 1
    ? uniqueNames.slice(0, -1).join(', ') + ' and ' + uniqueNames[uniqueNames.length - 1]
    : uniqueNames[0];

  return `Your bouquet carries ${nameList} — a reflection of the many layers within you. Each flower honors a different part of what you feel.`;
}

// ── Main Analysis Function ───────────────────
export function analyzeEmotion(text) {
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

  // Map to flowers
  const flowers = topEmotions.map(emotion => {
    const flowerEntry = FLOWER_MAP[emotion];
    if (!flowerEntry) return 'daisy_bundle';
    return isIntense ? flowerEntry.bundle : flowerEntry.single;
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