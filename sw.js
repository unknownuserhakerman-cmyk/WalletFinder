// Service Worker for background persistence
const CACHE = 'seedhunter-v1';

self.addEventListener('install', (e) => {
    self.skipWaiting();
    e.waitUntil(
        caches.open(CACHE).then(c => c.addAll(['/', 'engine.js', 'app.js', 'manifest.json']))
    );
});

self.addEventListener('activate', (e) => {
    e.waitUntil(clients.claim());
});

// Keep alive periodically
self.addEventListener('message', (e) => {
    if (e.data === 'ping') {
        e.source.postMessage('pong');
    }
});

// Periodic sync for background scanning (if supported)
self.addEventListener('periodicsync', (e) => {
    if (e.tag === 'scan-wallets') {
        e.waitUntil(doBackgroundScan());
    }
});

async function doBackgroundScan() {
    // This runs even when browser is minimized/closed
    // In a full implementation, we'd continue from where we left off
    const clients = await self.clients.matchAll();
    clients.forEach(c => c.postMessage({ type: 'background-tick' }));
}ango","mansion","manual","maple","marble","march","margin","marine","market",
    "marriage","mask","mass","master","match","material","math","matrix","matter","maximum",
    "maze","meadow","mean","measure","meat","mechanic","medal","media","melody","melt",
    "member","memory","mention","menu","mercy","merge","merit","merry","mesh","message",
    "metal","method","middle","midnight","milk","million","mimic","mind","minimum","minor",
    "minute","miracle","mirror","misery","miss","mistake","mix","mixed","mixture","mobile",
    "model","modify","mom","moment","monitor","monkey","monster","month","moon","moral",
    "more","morning","mosquito","mother","motion","motor","mountain","mouse","move","movie",
    "much","muffin","mule","multiply","muscle","museum","mushroom","music","must","mutual",
    "myself","mystery","myth","naive","name","napkin","narrow","nasty","nation","nature",
    "near","neck","need","negative","neglect","neither","nephew","nerve","nest","net",
    "network","neutral","never","news","next","nice","night","noble","noise","nominee",
    "noodle","normal","north","nose","notable","note","nothing","notice","novel","now",
    "nuclear","number","nurse","nut","oak","obey","object","oblige","obscure","observe",
    "obtain","obvious","occur","ocean","october","odor","off","offer","office","often",
    "oil","okay","old","olive","olympic","omit","once","one","onion","online",
    "only","open","opera","opinion","oppose","option","orange","orbit","orchard","order",
    "ordinary","organ","orient","original","orphan","ostrich","other","outdoor","outer","output",
    "outside","oval","oven","over","own","owner","oxygen","oyster","ozone","pact",
    "paddle","page","pair","palace","palm","panda","panel","panic","panther","paper",
    "parade","parent","park","parrot","party","pass","patch","path","patient","patrol",
    "pattern","pause","pave","payment","peace","peanut","pear","peasant","pelican","pen",
    "penalty","pencil","people","pepper","perfect","permit","person","pet","phone","photo",
    "phrase","physical","piano","picnic","picture","piece","pig","pigeon","pill","pilot",
    "pink","pioneer","pipe","pistol","pitch","pizza","place","planet","plastic","plate",
    "play","player","please","pledge","pluck","plug","plunge","poem","poet","point",
    "polar","pole","police","pond","pony","pool","popular","portion","position","possible",
    "post","potato","pottery","poverty","powder","power","practice","praise","predict","prefer",
    "prepare","present","pretty","prevent","price","pride","primary","print","priority","prison",
    "private","prize","problem","process","produce","profit","program","project","promote","proof",
    "property","prosper","protect","proud","provide","public","pudding","pull","pulp","pulse",
    "pumpkin","punch","pupil","puppy","purchase","purity","purpose","purse","push","put",
    "puzzle","pyramid","quality","quantum","quarter","question","quick","quit","quiz","quote",
    "rabbit","raccoon","race","rack","radar","radio","rail","rain","raise","rally",
    "ramp","ranch","random","range","rapid","rare","rate","rather","raven","raw",
    "razor","ready","real","reason","rebel","rebuild","recall","receive","recipe","record",
    "recycle","reduce","reflect","reform","refuse","region","regret","regular","reject","relax",
    "release","relief","rely","remain","remember","remind","remove","render","renew","rent",
    "reopen","repair","repeat","replace","report","require","rescue","resemble","resist","resource",
    "response","result","retire","retreat","return","reunion","reveal","review","reward","rhythm",
    "rib","ribbon","rice","rich","ride","ridge","rifle","right","rigid","ring",
    "riot","ripple","risk","ritual","rival","river","road","roast","robot","robust",
    "rocket","romance","roof","rookie","room","rose","rotate","rough","round","route",
    "royal","rubber","rude","rug","rule","run","runway","rural","sad","saddle",
    "sadness","safe","sail","salad","salmon","salon","salt","salute","same","sample",
    "sand","satisfy","satoshi","sauce","sausage","save","say","scale","scan","scare",
    "scatter","scene","scheme","school","science","scissors","scorpion","scout","scrap","screen",
    "script","scrub","sea","search","season","seat","second","secret","section","security",
    "seed","seek","segment","select","sell","seminar","senior","sense","sentence","series",
    "service","session","settle","setup","seven","shadow","shaft","shallow","share","shed",
    "shell","sheriff","shield","shift","shine","ship","shiver","shock","shoe","shoot",
    "shop","short","shoulder","shove","shrimp","shrug","shuffle","shy","sibling","sick",
    "side","siege","sight","sign","silent","silk","silly","silver","similar","simple",
    "since","sing","siren","sister","situate","six","size","skate","sketch","ski",
    "skill","skin","skirt","skull","slab","slam","sleep","slender","slice","slide",
    "slight","slim","slogan","slot","slow","slush","small","smart","smile","smoke",
    "smooth","snack","snake","snap","sniff","snow","soap","soccer","social","sock",
    "soda","soft","solar","soldier","solid","solution","solve","someone","song","soon",
    "sorry","sort","soul","sound","soup","source","south","space","spare","spatial",
    "spawn","speak","special","speed","spell","spend","sphere","spice","spider","spike",
    "spin","spirit","split","spoil","sponsor","spoon","sport","spot","spray","spread",
    "spring","spy","square","squeeze","squirrel","stable","stadium","staff","stage","stairs",
    "stamp","stand","start","state","stay","steak","steel","step","stereo","stick",
    "still","sting","stock","stomach","stone","stool","story","stove","strategy","street",
    "strike","strong","struggle","student","stuff","stumble","style","subject","submit","subway",
    "success","such","sudden","suffer","sugar","suggest","suit","sun","sunny","sunset",
    "super","supply","support","surprise","surround","survey","suspect","sustain","swallow","swamp",
    "swap","swarm","swear","sweet","swift","swim","swing","switch","sword","symbol",
    "symptom","syrup","system","table","tackle","tag","tail","talent","talk","tank",
    "tape","target","task","taste","tattoo","taxi","teach","team","tell","ten",
    "tenant","tennis","tent","term","test","text","thank","that","theme","then",
    "theory","there","they","thing","this","thought","three","thrive","throw","thumb",
    "thunder","ticket","tide","tiger","tilt","timber","time","tiny","tip","tired",
    "tissue","title","toast","tobacco","today","toddler","toe","together","toilet","token",
    "tomato","tomorrow","tone","tongue","tonight","tool","tooth","top","topic","topple",
    "torch","tornado","tortoise","toss","total","tourist","toward","tower","town","toy",
    "track","trade","traffic","tragic","train","transfer","trap","trash","travel","tray",
    "treat","tree","trend","trial","tribe","trick","trigger","trim","trip","trophy",
    "trouble","truck","true","truly","trumpet","trust","truth","try","tube","tuition",
    "tumble","tuna","tunnel","turkey","turn","turtle","twelve","twenty","twice","twin",
    "twist","two","type","typical","ugly","umbrella","unable","unaware","uncle","uncover",
    "under","undo","unfair","unfold","unhappy","uniform","unique","unit","universe","unknown",
    "unlock","until","unusual","unveil","update","upgrade","uphold","upon","upper","upset",
    "urban","urge","usage","use","used","useful","useless","usual","utility","vacant",
    "vacuum","vague","valid","valley","valve","van","vanish","vapor","various","vast",
    "vault","vehicle","velvet","vendor","venture","venue","verb","verify","version","very",
    "vessel","veteran","viable","vibrant","vicious","victory","video","view","village","vintage",
    "violin","virtual","virus","visa","visit","visual","vital","vivid","vocal","voice",
    "void","volcano","volume","vote","voyage","wage","wagon","wait","walk","wall",
    "walnut","want","warfare","warm","warrior","wash","wasp","waste","water","wave",
    "way","wealth","weapon","wear","weasel","weather","web","wedding","weekend","weird",
    "welcome","west","wet","whale","what","wheat","wheel","when","where","whip",
    "whisper","wide","width","wife","wild","will","win","window","wine","wing",
    "wink","winner","winter","wire","wisdom","wise","wish","witness","wolf","woman",
    "wonder","wood","wool","word","work","world","worry","worth","wrap","wreck",
    "wrestle","wrist","write","wrong","yard","year","yellow","you","young","youth",
    "zebra","zero","zone","zoo"
];

// Normalize wordlist for binary search
const WORDLIST_SORTED = [...BIP39_WORDS_FULL].sort();

// Word -> index lookup
const WORD_TO_INDEX = {};
BIP39_WORDS_FULL.forEach((w, i) => { WORD_TO_INDEX[w] = i; });

// ============================================================
// SHA256 Implementation (pure JS)
// ============================================================
function sha256(ascii) {
    function rightRotate(val, shift) { return (val >>> shift) | (val << (32 - shift)); }
    const mathPow = Math.pow;
    const maxWord = mathPow(2, 32);
    const K = [
        0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5,
        0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
        0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3,
        0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
        0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc,
        0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
        0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7,
        0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
        0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13,
        0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
        0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3,
        0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
        0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5,
        0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
        0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208,
        0x90befffa, 0xa4506ceb, 0xb
