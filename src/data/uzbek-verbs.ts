// Uzbek Verb Database - Extracted from DATA.md

export interface Affix {
  id: string;
  name: string;
  form: string;
  function: string;
  examples: string[];
  category: 'nisbat' | 'zamon' | 'mayl' | 'shaxs' | 'yasovchi' | 'inkor' | 'sifatdosh' | 'ravishdosh' | 'harakatNomi';
}

export interface VerbType {
  id: string;
  name: string;
  description: string;
  examples: string[];
  subtypes?: VerbSubtype[];
}

export interface VerbSubtype {
  name: string;
  examples: string[];
}

export interface ConjugationTable {
  tense: string;
  affixes: string[];
  examples: ConjugationExample[];
}

export interface ConjugationExample {
  person: string;
  form: string;
  translation?: string;
}

export interface GrammarRule {
  id: string;
  title: string;
  content: string;
  examples: string[];
  exceptions?: string[];
}

export interface Exercise {
  id: string;
  type: 'sentence-builder' | 'suffix-select' | 'fill-blank';
  question: string;
  correctAnswer: string | string[];
  options?: string[];
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

// === AFFIXES FROM DATA.md ===

export const affixes: Affix[] = [
  // Nisbat (Voice) Affixes
  {
    id: 'nisbat-1',
    name: "O'zlik nisbati",
    form: '-(i)l',
    function: "O'zlik va majhul nisbat shakli",
    examples: ['bezaldi', "ko'rildi", 'yazildi'],
    category: 'nisbat'
  },
  {
    id: 'nisbat-2',
    name: "O'zlik nisbati",
    form: '-(i)n',
    function: "O'zlik va majhul nisbat shakli",
    examples: ['bezandi', "ko'rindi", 'yazindi'],
    category: 'nisbat'
  },
  {
    id: 'nisbat-3',
    name: "Birgalik nisbati",
    form: '-(i)sh',
    function: "Birgalik nisbat shakli",
    examples: ["o'qishdi", 'yozishdi', 'gapirishdi'],
    category: 'nisbat'
  },
  {
    id: 'nisbat-4',
    name: "Orttirma nisbat",
    form: '-t',
    function: "Orttirma nisbat shakli",
    examples: ["o'qit", 'yozit', 'chizit'],
    category: 'nisbat'
  },
  {
    id: 'nisbat-5',
    name: "Orttirma nisbat",
    form: '-dir',
    function: "Orttirma nisbat shakli",
    examples: ['kuldir', 'yugurdir', "o'qitdir"],
    category: 'nisbat'
  },
  {
    id: 'nisbat-6',
    name: "Orttirma nisbat",
    form: '-tir',
    function: "Orttirma nisbat shakli",
    examples: ['ektir', 'yazdir', "ko'rsatir"],
    category: 'nisbat'
  },
  {
    id: 'nisbat-7',
    name: "Orttirma nisbat",
    form: '-sat',
    function: "Orttirma nisbat shakli",
    examples: ["ko'rsat", 'ichsat', 'yazsat'],
    category: 'nisbat'
  },
  {
    id: 'nisbat-8',
    name: "Orttirma nisbat",
    form: '-ir',
    function: "Orttirma nisbat shakli",
    examples: ['pishir', 'yazir', "o'qir"],
    category: 'nisbat'
  },
  {
    id: 'nisbat-9',
    name: "Orttirma nisbat",
    form: '-ar',
    function: "Orttirma nisbat shakli",
    examples: ['chiqar', 'kirar', "ko'tarar"],
    category: 'nisbat'
  },
  {
    id: 'nisbat-10',
    name: "Orttirma nisbat",
    form: '-iz',
    function: "Orttirma nisbat shakli",
    examples: ['tomiz', 'oqiz', 'yoziz'],
    category: 'nisbat'
  },
  
  // Zamon (Tense) Affixes
  {
    id: 'zamon-1',
    name: "O'tgan zamon",
    form: '-di',
    function: "Aniq o'tgan zamon",
    examples: ['bordim', 'keldim', 'yazdim'],
    category: 'zamon'
  },
  {
    id: 'zamon-2',
    name: "O'tgan zamon",
    form: '-gan',
    function: "Noma'lum o'tgan zamon",
    examples: ['borganman', 'kelganman', 'yazganman'],
    category: 'zamon'
  },
  {
    id: 'zamon-3',
    name: "O'tgan zamon",
    form: '-(i)b',
    function: "O'tgan zamon (bilish)",
    examples: ['boribman', 'kelibman', 'yazibman'],
    category: 'zamon'
  },
  {
    id: 'zamon-4',
    name: "Hozirgi zamon",
    form: '-yap',
    function: "Hozirgi davomli zamon",
    examples: ['borayapman', 'kelayapman', 'yazayapman'],
    category: 'zamon'
  },
  {
    id: 'zamon-5',
    name: "Hozirgi zamon",
    form: '-moqda',
    function: "Hozirgi zamon",
    examples: ['bormoqdaman', 'kelmoqdaman', 'yazmoqdaman'],
    category: 'zamon'
  },
  {
    id: 'zamon-6',
    name: "Hozirgi zamon",
    form: '-ayotir',
    function: "Hozirgi davomli zamon",
    examples: ['borayotirman', 'kelayotirman', 'yazayotirman'],
    category: 'zamon'
  },
  {
    id: 'zamon-7',
    name: "Kelasi zamon",
    form: '-ar/-yar',
    function: "Kelasi zamon",
    examples: ['borarman', 'kelarman', 'yazarman'],
    category: 'zamon'
  },
  {
    id: 'zamon-8',
    name: "Kelasi zamon",
    form: '-jak',
    function: "Kelasi zamon (aniq)",
    examples: ['borajakman', 'kelajakman', 'yazajakman'],
    category: 'zamon'
  },
  {
    id: 'zamon-9',
    name: "Kelasi zamon",
    form: '-gay',
    function: "Kelasi zamon (faraz)",
    examples: ['boragayman', 'kelagayman', 'yazagayman'],
    category: 'zamon'
  },
  
  // Mayl (Mood) Affixes
  {
    id: 'mayl-1',
    name: "Buyruq-istak mayli",
    form: '-gin',
    function: "Buyruq-istak mayli",
    examples: ['kelgin', 'borgan', 'yazgin'],
    category: 'mayl'
  },
  {
    id: 'mayl-2',
    name: "Buyruq-istak mayli",
    form: '-sin',
    function: "Buyruq-istak mayli",
    examples: ['kelsin', 'borsin', 'yazsin'],
    category: 'mayl'
  },
  {
    id: 'mayl-3',
    name: "Shart mayli",
    form: '-sa',
    function: "Shart mayli",
    examples: ['kelsam', 'borsam', 'yazsam'],
    category: 'mayl'
  },
  {
    id: 'mayl-4',
    name: "Maqsad mayli",
    form: '-moqchi',
    function: "Maqsad mayli",
    examples: ['bormoqchiman', 'kelmoqchiman', 'yazmoqchiman'],
    category: 'mayl'
  },
  
  // Fe'l Yasovchi (Verb Forming) Affixes
  {
    id: 'yasovchi-1',
    name: "Fe'l yasovchi -la",
    form: '-la',
    function: "Ot va sifatlardan fe'l yasaydi",
    examples: ['ishla', "o'yna", "yig'la"],
    category: 'yasovchi'
  },
  {
    id: 'yasovchi-2',
    name: "Fe'l yasovchi -a",
    form: '-a',
    function: "Ot va sifatlardan fe'l yasaydi",
    examples: ["o'yna", 'kuyla', "bo'ya"],
    category: 'yasovchi'
  },
  {
    id: 'yasovchi-3',
    name: "Fe'l yasovchi -ay",
    form: '-ay',
    function: "Sifatlardan fe'l yasaydi",
    examples: ["sarg'ay", "ulg'ay", 'ko\'kay'],
    category: 'yasovchi'
  },
  {
    id: 'yasovchi-4',
    name: "Fe'l yasovchi -ar",
    form: '-ar',
    function: "Sifatlardan fe'l yasaydi",
    examples: ['qizar', "ko'kar", 'sariqar'],
    category: 'yasovchi'
  },
  {
    id: 'yasovchi-5',
    name: "Fe'l yasovchi -i",
    form: '-i',
    function: "Sifatlardan fe'l yasaydi",
    examples: ["bo'yi", 'tinch-i', 'yaxshi-i'],
    category: 'yasovchi'
  },
  {
    id: 'yasovchi-6',
    name: "Fe'l yasovchi -ir",
    form: '-ir',
    function: "Fe'l yasaydi",
    examples: ['gapir', 'qayir', 'yopir'],
    category: 'yasovchi'
  },
  {
    id: 'yasovchi-7',
    name: "Fe'l yasovchi -ira",
    form: '-ira',
    function: "Taqlid so'zlardan fe'l yasaydi",
    examples: ['yaltira', 'jilira', 'charaqlira'],
    category: 'yasovchi'
  },
  {
    id: 'yasovchi-8',
    name: "Fe'l yasovchi -illa",
    form: '-illa',
    function: "Taqlid so'zlardan fe'l yasaydi",
    examples: ['taqilla', 'gupilla', 'chirilla'],
    category: 'yasovchi'
  },
  {
    id: 'yasovchi-9',
    name: "Fe'l yasovchi -ik",
    form: '-ik',
    function: "Sifatlardan fe'l yasaydi",
    examples: ['kechik', 'qiyiq', 'egik'],
    category: 'yasovchi'
  },
  {
    id: 'yasovchi-10',
    name: "Fe'l yasovchi -iq",
    form: '-iq',
    function: "Fe'l yasaydi",
    examples: ["yo'liq", 'chiqiq', 'tushiq'],
    category: 'yasovchi'
  },
  {
    id: 'yasovchi-11',
    name: "Fe'l yasovchi -lan",
    form: '-lan',
    function: "Ot va sifatlardan fe'l yasaydi",
    examples: ['odatlan', 'tayyorlan', 'quvvanatlan'],
    category: 'yasovchi'
  },
  {
    id: 'yasovchi-12',
    name: "Fe'l yasovchi -lash",
    form: '-lash',
    function: "Ot va sifatlardan fe'l yasaydi",
    examples: ['yordamlash', 'tanish', 'gaplash'],
    category: 'yasovchi'
  },
  {
    id: 'yasovchi-13',
    name: "Fe'l yasovchi -si",
    form: '-si',
    function: "Fe'l yasaydi",
    examples: ['garangsi', 'hayronsi', 'quvonsi'],
    category: 'yasovchi'
  },
  {
    id: 'yasovchi-14',
    name: "Fe'l yasovchi -sira",
    form: '-sira',
    function: "Fe'l yasaydi",
    examples: ['kulimsira', 'qarashsira', 'tinchimsira'],
    category: 'yasovchi'
  },
  
  // Inkor (Negative) Affixes
  {
    id: 'inkor-1',
    name: "Bo'lishsizlik",
    form: '-ma',
    function: "Fe'lning inkor shakli",
    examples: ['kelmadi', 'bormadi', 'yazmadi'],
    category: 'inkor'
  },
  {
    id: 'inkor-2',
    name: "Bo'lishsizlik",
    form: '-mas',
    function: "Kelasi zamon inkori",
    examples: ['bormas', 'kelmas', 'yazmas'],
    category: 'inkor'
  },
  
  // Sifatdosh (Participle) Affixes
  {
    id: 'sifatdosh-1',
    name: "O'tgan zamon sifatdoshi",
    form: '-gan',
    function: "O'tgan zamon sifatdoshi",
    examples: ["o'qigan bola", 'pishgan olma', 'yazgan xat'],
    category: 'sifatdosh'
  },
  {
    id: 'sifatdosh-2',
    name: "O'tgan zamon sifatdoshi",
    form: '-kan',
    function: "O'tgan zamon sifatdoshi (-k dan keyin)",
    examples: ['ekkan', 'tikkan', 'chekkan'],
    category: 'sifatdosh'
  },
  {
    id: 'sifatdosh-3',
    name: "O'tgan zamon sifatdoshi",
    form: '-qan',
    function: "O'tgan zamon sifatdoshi (-q dan keyin)",
    examples: ['chiqqan', "o'qigan", 'yazgan'],
    category: 'sifatdosh'
  },
  {
    id: 'sifatdosh-4',
    name: "Hozirgi zamon sifatdoshi",
    form: '-(a)yotgan',
    function: "Hozirgi zamon sifatdoshi",
    examples: ['borayotgan', 'kelayotgan', 'yazayotgan'],
    category: 'sifatdosh'
  },
  {
    id: 'sifatdosh-5',
    name: "Kelasi zamon sifatdoshi",
    form: '-digan',
    function: "Kelasi zamon sifatdoshi",
    examples: ['boradigan', 'keladigan', 'yazadigan'],
    category: 'sifatdosh'
  },
  {
    id: 'sifatdosh-6',
    name: "Kelasi zamon sifatdoshi",
    form: '-ar/-yar',
    function: "Kelasi zamon sifatdoshi",
    examples: ['oqar daryo', 'yurar odam', 'kelar kun'],
    category: 'sifatdosh'
  },
  
  // Ravishdosh (Adverbial Participle) Affixes
  {
    id: 'ravishdosh-1',
    name: "Ravishdosh",
    form: '-(i)b',
    function: "Holat, payt, sabab ravishdoshi",
    examples: ["o'qib", 'yazib', 'kelib'],
    category: 'ravishdosh'
  },
  {
    id: 'ravishdosh-2',
    name: "Ravishdosh",
    form: '-a/-y',
    function: "Holat, sabab ravishdoshi",
    examples: ["o'qiy", 'kel-a', 'bor-a'],
    category: 'ravishdosh'
  },
  {
    id: 'ravishdosh-3',
    name: "Ravishdosh",
    form: '-gach',
    function: "Payt ravishdoshi",
    examples: ["o'qigach", 'yazgach', 'kelgach'],
    category: 'ravishdosh'
  },
  {
    id: 'ravishdosh-4',
    name: "Ravishdosh",
    form: '-guncha',
    function: "Payt ravishdoshi",
    examples: ['kelguncha', 'borgancha', 'yazguncha'],
    category: 'ravishdosh'
  },
  {
    id: 'ravishdosh-5',
    name: "Ravishdosh",
    form: '-gani',
    function: "Maqsad ravishdoshi",
    examples: ["o'qigani keldi", 'yazgani bordi', 'kelgani aytdi'],
    category: 'ravishdosh'
  },
  
  // Harakat Nomi (Verbal Noun) Affixes
  {
    id: 'harakat-1',
    name: "Harakat nomi",
    form: '-moq',
    function: "Fe'lning infinitiv shakli",
    examples: ["o'qimoq", 'yazmoq', 'bormoq'],
    category: 'harakatNomi'
  },
  {
    id: 'harakat-2',
    name: "Harakat nomi",
    form: '-ish',
    function: "Harakat nomi",
    examples: ["o'qish", 'yazish', 'borish'],
    category: 'harakatNomi'
  },
  {
    id: 'harakat-3',
    name: "Harakat nomi",
    form: '-(i)sh',
    function: "Harakat nomi",
    examples: ['yashash', "o'qish", 'bilish'],
    category: 'harakatNomi'
  },
  {
    id: 'harakat-4',
    name: "Harakat nomi",
    form: '-(u)v',
    function: "Harakat nomi",
    examples: ['yuruv', 'keluv', 'boruv'],
    category: 'harakatNomi'
  },
];

// === VERB TYPES FROM DATA.md ===

export const verbTypes: VerbType[] = [
  {
    id: 'tuzilish-1',
    name: 'Sodda fe\'llar',
    description: 'Bitta asosdan iborat fe\'llar',
    examples: ['yurmoq', "o'qimoq", 'bormoq', 'kelmoq'],
    subtypes: [
      {
        name: 'Sodda tub',
        examples: ['yur-', "o'qi-", 'bor-', 'kel-', 'ayt-', 'qur-']
      },
      {
        name: 'Sodda yasama',
        examples: ['yashamoq (yash dan)', 'qizardi (qizil dan)', 'ishlamoq (ish dan)', "sarg'aymoq (sariq dan)"]
      }
    ]
  },
  {
    id: 'tuzilish-2',
    name: "Qo'shma fe'llar",
    description: 'Ikki va undan ortiq asosdan tashkil topgan fe\'llar',
    examples: ['yordam bermoq', 'tamom qilmoq', 'sotib olmoq'],
    subtypes: [
      {
        name: 'Ot + fe\'l',
        examples: ['yordam bermoq', 'tamom qilmoq', 'xizmat qilmoq', 'javob oldi']
      },
      {
        name: 'Fe\'l + fe\'l',
        examples: ['sotib olmoq', 'olib kelmoq', 'chiqib ketmoq']
      }
    ]
  },
  {
    id: 'tuzilish-3',
    name: 'Juft fe\'llar',
    description: "Tire bilan bog'langan ikkita fe'l yagona ma'noni ifodalaydi",
    examples: ["aytdi-qo'ydi", "yozdi-oldi", 'keldi-ketdi'],
    subtypes: []
  },
  {
    id: 'tuzilish-4',
    name: 'Takroriy fe\'llar',
    description: 'Davomlilik yoki intensivlikni bildiradi',
    examples: ['yura-yura', "ko'ra-ko'ra", "o'qi-o'qi"],
    subtypes: []
  }
];

// === CONJUGATION TABLES ===

export const conjugationTables: ConjugationTable[] = [
  {
    tense: "O'tgan zamon (-di)",
    affixes: ['-dim', '-ding', '-di', '-dik', '-dinglar', '-di'],
    examples: [
      { person: 'Men', form: 'bordim' },
      { person: 'Sen', form: 'bording' },
      { person: 'U', form: 'bordi' },
      { person: 'Biz', form: 'bordik' },
      { person: 'Siz', form: 'bordingiz' },
      { person: 'Ular', form: 'borishdi' }
    ]
  },
  {
    tense: "O'tgan zamon (-gan)",
    affixes: ['-ganman', '-gansan', '-gan', '-ganmiz', '-gansiz', '-gan'],
    examples: [
      { person: 'Men', form: 'borganman' },
      { person: 'Sen', form: 'borgansan' },
      { person: 'U', form: 'borgan' },
      { person: 'Biz', form: 'borganmiz' },
      { person: 'Siz', form: 'borgansiz' },
      { person: 'Ular', form: 'borgan' }
    ]
  },
  {
    tense: "Hozirgi zamon (-yap)",
    affixes: ['-yapman', '-yapsan', '-yap', '-yapmiz', '-yapsiz', '-yap'],
    examples: [
      { person: 'Men', form: 'borayapman' },
      { person: 'Sen', form: 'borayapsan' },
      { person: 'U', form: 'borayap' },
      { person: 'Biz', form: 'borayapmiz' },
      { person: 'Siz', form: 'borayapsiz' },
      { person: 'Ular', form: 'borayap' }
    ]
  },
  {
    tense: "Hozirgi zamon (-ayotir)",
    affixes: ['-ayotirman', '-ayotirsan', '-ayotir', '-ayotirmiz', '-ayotirsiz', '-ayotir'],
    examples: [
      { person: 'Men', form: 'borayotirman' },
      { person: 'Sen', form: 'borayotirsan' },
      { person: 'U', form: 'borayotir' },
      { person: 'Biz', form: 'borayotirmiz' },
      { person: 'Siz', form: 'borayotirsiz' },
      { person: 'Ular', form: 'borayotir' }
    ]
  },
  {
    tense: "Kelasi zamon (-ar)",
    affixes: ['-arman', '-arsan', '-ar', '-armiz', '-arsiz', '-ar'],
    examples: [
      { person: 'Men', form: 'borarman' },
      { person: 'Sen', form: 'borarsan' },
      { person: 'U', form: 'borar' },
      { person: 'Biz', form: 'borarmiz' },
      { person: 'Siz', form: 'borarsiz' },
      { person: 'Ular', form: 'borar' }
    ]
  },
  {
    tense: "Kelasi zamon (-jak)",
    affixes: ['-jakman', '-jaksan', '-jak', '-jakmiz', '-jaksiz', '-jak'],
    examples: [
      { person: 'Men', form: 'borajakman' },
      { person: 'Sen', form: 'borajaksan' },
      { person: 'U', form: 'borajak' },
      { person: 'Biz', form: 'borajakmiz' },
      { person: 'Siz', form: 'borajaksiz' },
      { person: 'Ular', form: 'borajak' }
    ]
  }
];

// === GRAMMAR RULES ===

export const grammarRules: GrammarRule[] = [
  {
    id: 'rule-1',
    title: "Fe'l yasalishi",
    content: "Fe'llar ot, sifat, ravish, taqlid va undov so'zlardan yasaladi. Eng faol affiks -la.",
    examples: [
      'ish + la = ishlamoq',
      'oq + ar = oqarmoq',
      'taq + illa = taqillamoq',
      "sariq + ay = sarg'aymoq"
    ],
    exceptions: ["Ba'zi affikslar qo'shilganda tovush o'zgarishi sodir bo'ladi"]
  },
  {
    id: 'rule-2',
    title: 'Tovush o\'zgarishlari',
    content: "Fe'l yasovchi affikslar qo'shilganda o'zakdagi ba'zi tovushlar tushib qolishi yoki almashinishi mumkin.",
    examples: [
      "yig'i + la = yig'la (i tushib qoladi)",
      "o'yin + a = o'yna (i tushib qoladi)",
      "ulug' + ay = ulg'ay (u tushib qoladi)",
      'qizil + ar = qizar (il tushib qoladi)',
      'gup + illa = gupulla (i/u almashinadi)'
    ]
  },
  {
    id: 'rule-3',
    title: "Ko'makchi fe'lli konstruksiyalar",
    content: "Yetakchi fe'l -(i)b yoki -a/-y shaklida keladi. Ko'makchi fe'l o'z leksik ma'nosini yo'qotadi va harakat xarakterini bildiradi.",
    examples: [
      "o'qib chiqdi (to'liq o'qidi)",
      'yozib bo\'ldi (yozib tugatdi)',
      'ishlay oladi (ishlash imkoniyati bor)',
      'yozib yubordi (tez yozdi)'
    ],
    exceptions: ['Zamon va shaxs-son faqat ko\'makchi fe\'lga qo\'shiladi']
  },
  {
    id: 'rule-4',
    title: "Qo'shma fe'l va so'z birikmasi farqi",
    content: "Qo'shma fe'l bitta leksik birlik, so'z birikmasi esa ikkita mustaqil so'z.",
    examples: [
      'javob oldi (qo\'shma fe\'l = "javob berdi")',
      'daftar oldi (so\'z birikmasi = "daftar sotib oldi")',
      "ta'lim berdi (qo'shma fe'l = \"o'qitdi\")",
      'kitob berdi (so\'z birikmasi = "kitob topshirdi")'
    ]
  },
  {
    id: 'rule-5',
    title: "Bo'lishsizlik shakllari",
    content: "Fe'lning inkor shakli -ma affiksi bilan yoki emas/yo'q so'zlari bilan ifodalanadi.",
    examples: [
      'kelmadi (-ma affiksi)',
      'borgan emas (emas so\'zi)',
      "kelgani yo'q (yo'q so'zi)",
      'bormas (kelasi zamon inkori)'
    ]
  },
  {
    id: 'rule-6',
    title: 'Ravishdosh turlari',
    content: 'Ravishdoshlar holat, payt, sabab va maqsad ma\'nolarini bildiradi.',
    examples: [
      "Holat: o'qib keldi, kel-a aytdi",
      'Payt: o\'qigach keldi, kelguncha kutdi',
      "Sabab: o'qib qoldi, kel-a qoldi",
      "Maqsad: o'qigani keldi (o'qish uchun keldi)"
    ]
  }
];

// === EXERCISES FOR GAME MODE ===

export const exercises: Exercise[] = [
  // Sentence Builder Exercises
  {
    id: 'ex-1',
    type: 'sentence-builder',
    question: 'Quyidagi so\'zlardan to\'g\'ri gap tuzing: "Men / maktabga / bordim"',
    correctAnswer: 'Men maktabga bordim',
    options: ['Men', 'maktabga', 'bordim', 'boraman', 'ketdi', 'uyga'],
    explanation: "O'zbek tilida gap tartibi: Ega + To'ldiruvchi + Kesim",
    difficulty: 'easy'
  },
  {
    id: 'ex-2',
    type: 'sentence-builder',
    question: "Quyidagi so'zlardan to'g'ri gap tuzing: \"U / kitob / o'qiyapti\"",
    correctAnswer: "U kitob o'qiyapti",
    options: ['U', 'kitob', "o'qiyapti", 'yozayapti', 'daftar', 'men'],
    explanation: "Hozirgi zamon: -yap affiksi bilan \"o'qiyapti\" shakli hosil bo'ladi",
    difficulty: 'easy'
  },
  {
    id: 'ex-3',
    type: 'sentence-builder',
    question: "Quyidagi so'zlardan to'g'ri gap tuzing: \"Biz / o'qib / chiqdik\"",
    correctAnswer: "Biz o'qib chiqdik",
    options: ['Biz', "o'qib", 'chiqdik', 'yozib', 'keldik', 'ular'],
    explanation: "Ko'makchi fe'lli konstruksiya: o'qib (yetakchi) + chiqdik (ko'makchi)",
    difficulty: 'medium'
  },
  {
    id: 'ex-4',
    type: 'sentence-builder',
    question: "Quyidagi so'zlardan to'g'ri gap tuzing: \"Ular / yordam / berdilar\"",
    correctAnswer: "Ular yordam berdilar",
    options: ['Ular', 'yordam', 'berdilar', 'oldilar', 'biz', 'qildilar'],
    explanation: "Qo'shma fe'l: \"yordam bermoq\" - ot + fe'l",
    difficulty: 'medium'
  },
  
  // Suffix Selection Exercises
  {
    id: 'ex-5',
    type: 'suffix-select',
    question: 'To\'g\'ri affiksni tanlang: "Men maktabga bor___"',
    correctAnswer: 'dim',
    options: ['dim', 'ding', 'di', 'dik'],
    explanation: 'I shaxs, o\'tgan zamon: bor + dim = bordim',
    difficulty: 'easy'
  },
  {
    id: 'ex-6',
    type: 'suffix-select',
    question: "To'g'ri affiksni tanlang: \"Sen o'qib ___\"",
    correctAnswer: 'chiqding',
    options: ['chiqdim', 'chiqding', 'chiqdi', 'chiqdik'],
    explanation: "II shaxs (sen): o'qib chiq + ding = o'qib chiqding",
    difficulty: 'easy'
  },
  {
    id: 'ex-7',
    type: 'suffix-select',
    question: 'To\'g\'ri affiksni tanlang: "U kel___"',
    correctAnswer: 'adi',
    options: ['adi', 'amiz', 'asiz', 'ar'],
    explanation: 'III shaxs, hozirgi-kelasi zamon: kel + adi = keladi',
    difficulty: 'easy'
  },
  {
    id: 'ex-8',
    type: 'suffix-select',
    question: 'To\'g\'ri affiksni tanlang: "Biz yozayotgan___"',
    correctAnswer: 'miz',
    options: ['man', 'san', 'miz', 'siz'],
    explanation: 'I shaxs ko\'plik (biz): yozayotgan + miz = yozayotganmiz',
    difficulty: 'medium'
  },
  {
    id: 'ex-9',
    type: 'suffix-select',
    question: 'To\'g\'ri affiksni tanlang: "Siz kelgan___"',
    correctAnswer: 'siz',
    options: ['man', 'san', 'siz', 'lar'],
    explanation: 'II shaxs (siz): kelgan + siz = kelgansiz',
    difficulty: 'medium'
  },
  {
    id: 'ex-10',
    type: 'suffix-select',
    question: "To'g'ri affiksni tanlang: \"Men o'qiyap___\"",
    correctAnswer: 'man',
    options: ['san', 'man', 'di', 'miz'],
    explanation: "I shaxs (men), hozirgi zamon: o'qiyap + man = o'qiyapman",
    difficulty: 'easy'
  },
  
  // Fill in the Blank Exercises
  {
    id: 'ex-11',
    type: 'fill-blank',
    question: 'Bo\'sh joyni to\'ldiring: "Men kecha kinoga ___" (bormoq - o\'tgan zamon)',
    correctAnswer: 'bordim',
    options: ['bordim', 'boraman', 'boryapman', 'borardim'],
    explanation: "O'tgan zamon, I shaxs: bor + di + m = bordim",
    difficulty: 'easy'
  },
  {
    id: 'ex-12',
    type: 'fill-blank',
    question: "Bo'sh joyni to'ldiring: \"Hozir u dars ___\" (o'qimoq - hozirgi zamon)",
    correctAnswer: "o'qiyapti",
    options: ["o'qiyapti", 'o\'qidi', 'o\'qir', "o'qigan"],
    explanation: "Hozirgi zamon, III shaxs: o'qi + yap + ti = o'qiyapti",
    difficulty: 'easy'
  },
  {
    id: 'ex-13',
    type: 'fill-blank',
    question: 'Bo\'sh joyni to\'ldiring: "Ertaga biz uyga ___" (bormoq - kelasi zamon)',
    correctAnswer: 'boramiz',
    options: ['boramiz', 'bordik', 'boryapmiz', 'borganmiz'],
    explanation: 'Kelasi zamon, I shaxs ko\'plik: bor + a + miz = boramiz',
    difficulty: 'medium'
  },
  {
    id: 'ex-14',
    type: 'fill-blank',
    question: "Bo'sh joyni to'ldiring: \"Ular o'qib ___\" (chiqmoq - ko'makchi fe'l)",
    correctAnswer: 'chiquvchilar',
    options: ['chiquvchilar', 'chiquvchi', 'chiqdi', 'chiqar'],
    explanation: "Ko'makchi fe'lli konstruksiya: o'qib chiquvchilar",
    difficulty: 'hard'
  },
  {
    id: 'ex-15',
    type: 'fill-blank',
    question: 'Bo\'sh joyni to\'ldiring: "Men bu xabarni eshitib ___" (qolmoq - o\'tgan zamon)',
    correctAnswer: 'qoldim',
    options: ['qoldim', 'qolaman', 'qolibman', 'qolardim'],
    explanation: "Ko'makchi fe'l: eshitib qoldim (to'satdan eshitdim)",
    difficulty: 'medium'
  },
  {
    id: 'ex-16',
    type: 'fill-blank',
    question: "To'g'ri shaklni tanlang: \"___ bola darsni yaxshi o'qidi\" (o'qimoq - sifatdosh)",
    correctAnswer: "O'qigan",
    options: ["O'qigan", "O'qiyotgan", "O'qir", "O'qib"],
    explanation: "O'tgan zamon sifatdoshi: o'qi + gan = o'qigan",
    difficulty: 'medium'
  },
  {
    id: 'ex-17',
    type: 'fill-blank',
    question: "Bo'sh joyni to'ldiring: \"U ___ keldi\" (o'qimoq - maqsad ravishdoshi)",
    correctAnswer: "o'qigani",
    options: ["o'qigani", "o'qib", "o'qigach", "o'qiy"],
    explanation: "Maqsad ravishdoshi: o'qi + gani = o'qigani (o'qish uchun)",
    difficulty: 'hard'
  },
  {
    id: 'ex-18',
    type: 'fill-blank',
    question: "To'g'ri shaklni tanlang: \"___ daryo juda chiroyli\" (oqmoq - sifatdosh)",
    correctAnswer: 'Oqar',
    options: ['Oqar', "Oqayotgan", 'Oqqan', "Oqib"],
    explanation: 'Kelasi zamon sifatdoshi: oq + ar = oqar',
    difficulty: 'medium'
  },
  
  // Nisbat (Voice) Exercises
  {
    id: 'ex-19',
    type: 'suffix-select',
    question: "To'g'ri nisbat affiksini tanlang: \"Bez___\" (o'zlik nisbat)",
    correctAnswer: 'aldi',
    options: ['aldi', 'andi', 'ashdi', 'atdi'],
    explanation: "O'zlik nisbati -(i)l: bez + il + di = bezaldi",
    difficulty: 'medium'
  },
  {
    id: 'ex-20',
    type: 'suffix-select',
    question: "To'g'ri nisbat affiksini tanlang: \"O'q___\" (birgalik nisbat)",
    correctAnswer: 'ishdi',
    options: ['ildi', 'indi', 'ishdi', 'itdi'],
    explanation: "Birgalik nisbati -(i)sh: o'qi + sh + di = o'qishdi",
    difficulty: 'medium'
  }
];

// === SECTIONS FOR PRESENTATION MODE ===

export interface Section {
  id: string;
  title: string;
  icon: string;
  subsections: Subsection[];
}

export interface Subsection {
  id: string;
  title: string;
  content: ContentBlock[];
}

export interface ContentBlock {
  type: 'text' | 'table' | 'list' | 'example' | 'warning';
  title?: string;
  content: string | string[] | ConjugationTable | VerbType;
}

export const sections: Section[] = [
  {
    id: 'section-1',
    title: "Fe'l yasalishi",
    icon: '📚',
    subsections: [
      {
        id: 'subsection-1-1',
        title: "Fe'l yasovchi affikslar",
        content: [
          {
            type: 'text',
            content: "Fe'llar ot, sifat, ravish, taqlid va undov so'zlardan affiksal usulda yasaladi. Eng faol affiks -la."
          },
          {
            type: 'list',
            title: 'Asosiy fe\'l yasovchi affikslar:',
            content: [
              '-la: ish + la = ishlamoq',
              "-a: o'yin + a = o'ynamoq",
              "-ay: sariq + ay = sarg'aymoq",
              '-ar: qizil + ar = qizarmoq',
              '-illa: taq + illa = taqillamoq',
              '-ira: yalt + ira = yaltiramoq',
              '-lan: odat + lan = odatlanmoq',
              '-lash: yordam + lash = yordamlashmoq'
            ]
          },
          {
            type: 'example',
            title: 'Misollar:',
            content: [
              'boy + i = boyimoq',
              'qisqa + r = qisqarmoq',
              'tinch + i = tinchimoq',
              'gap + ir = gapirmoq'
            ]
          }
        ]
      },
      {
        id: 'subsection-1-2',
        title: 'Tovush o\'zgarishlari',
        content: [
          {
            type: 'text',
            content: "Fe'l yasovchi affikslar qo'shilganda o'zakdagi ba'zi tovushlar tushib qolishi yoki almashinishi mumkin."
          },
          {
            type: 'table',
            title: 'Tovush o\'zgarishlari jadvali:',
            content: {
              tense: 'Tovush o\'zgarishlari',
              affixes: ['-la', '-a', '-ay', '-ar', '-illa'],
              examples: [
                { person: "yig'i + la", form: "yig'la", translation: 'i tushib qoladi' },
                { person: "o'yin + a", form: "o'yna", translation: 'i tushib qoladi' },
                { person: "ulug' + ay", form: "ulg'ay", translation: 'u tushib qoladi' },
                { person: 'qizil + ar', form: 'qizar', translation: 'il tushib qoladi' },
                { person: 'gup + illa', form: 'gupulla', translation: 'i/u almashinadi' }
              ]
            } as unknown as ConjugationTable
          }
        ]
      }
    ]
  },
  {
    id: 'section-2',
    title: "Tuzilishiga ko'ra",
    icon: '🏗️',
    subsections: [
      {
        id: 'subsection-2-1',
        title: 'Sodda fe\'llar',
        content: [
          {
            type: 'text',
            content: 'Bitta asosdan iborat fe\'llar. Tub va yasama turlarga bo\'linadi.'
          },
          {
            type: 'list',
            title: 'Sodda tub fe\'llar:',
            content: ['yurmoq', "o'qimoq", 'bormoq', 'kelmoq', 'aytmoq', 'qurmoq']
          },
          {
            type: 'list',
            title: 'Sodda yasama fe\'llar:',
            content: [
              'yashamoq (yash dan)',
              'qizardi (qizil dan)',
              'ishlamoq (ish dan)',
              "sarg'aymoq (sariq dan)"
            ]
          }
        ]
      },
      {
        id: 'subsection-2-2',
        title: "Qo'shma fe'llar",
        content: [
          {
            type: 'text',
            content: "Ikki va undan ortiq asosdan tashkil topgan fe'llar. Bitta leksik birlik sifatida ishlaydi."
          },
          {
            type: 'list',
            title: 'Ot + fe\'l:',
            content: [
              'yordam bermoq',
              'tamom qilmoq',
              'xizmat qilmoq',
              'javob oldi'
            ]
          },
          {
            type: 'list',
            title: 'Fe\'l + fe\'l:',
            content: [
              'sotib olmoq',
              'olib kelmoq',
              'chiqib ketmoq'
            ]
          },
          {
            type: 'warning',
            title: 'Farq:',
            content: "Qo'shma fe'l bitta savolga javob beradi va gapning bitta bo'lagi hisoblanadi."
          }
        ]
      },
      {
        id: 'subsection-2-3',
        title: 'Juft va takroriy fe\'llar',
        content: [
          {
            type: 'text',
            content: 'Juft va takroriy fe\'llar doimo tire bilan yoziladi.'
          },
          {
            type: 'list',
            title: 'Juft fe\'llar:',
            content: [
              "aytdi-qo'ydi",
              "yozdi-oldi",
              'keldi-ketdi'
            ]
          },
          {
            type: 'list',
            title: 'Takroriy fe\'llar:',
            content: [
              'yura-yura',
              "ko'ra-ko'ra",
              "o'qi-o'qi"
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'section-3',
    title: 'Nisbat shakllari',
    icon: '🔄',
    subsections: [
      {
        id: 'subsection-3-1',
        title: 'Nisbat turlari',
        content: [
          {
            type: 'text',
            content: "Nisbat harakatning sub'ekt va ob'ektga munosabatini belgilovchi toifa."
          },
          {
            type: 'list',
            title: "O'zlik nisbati:",
            content: [
              '-(i)l: bezaldi, ko\'rildi, yazildi',
              '-(i)n: bezandi, ko\'rindi, yazindi'
            ]
          },
          {
            type: 'list',
            title: 'Birgalik nisbati:',
            content: [
              '-(i)sh: o\'qishdi, yozishdi, gapirishdi'
            ]
          },
          {
            type: 'list',
            title: 'Orttirma nisbat:',
            content: [
              '-t: o\'qit, yozit',
              '-dir: kuldir, yugurdir',
              '-tir: ektir, yazdir',
              '-sat: ko\'rsat, ichsat',
              '-ir: pishir, yazir',
              '-ar: chiqar, kirar',
              '-iz: tomiz, oqiz'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'section-4',
    title: 'Zamon shakllari',
    icon: '⏰',
    subsections: [
      {
        id: 'subsection-4-1',
        title: "O'tgan zamon",
        content: [
          {
            type: 'text',
            content: "O'tgan zamonda bajarilgan harakatlarni ifodalaydi."
          },
          {
            type: 'table',
            title: "O'tgan zamon shakllari:",
            content: {
              tense: "O'tgan zamon",
              affixes: ['-di', '-gan', '-(i)b'],
              examples: [
                { person: 'Men', form: 'bordim' },
                { person: 'Sen', form: 'bording' },
                { person: 'U', form: 'bordi' },
                { person: 'Biz', form: 'bordik' },
                { person: 'Siz', form: 'bordingiz' },
                { person: 'Ular', form: 'borishdi' }
              ]
            } as unknown as ConjugationTable
          },
          {
            type: 'example',
            title: 'Misollar:',
            content: [
              '-di: bordim, keldim, yazdim',
              '-gan: borganman, kelganman, yazganman',
              '-(i)b: boribman, kelibman, yazibman'
            ]
          }
        ]
      },
      {
        id: 'subsection-4-2',
        title: 'Hozirgi zamon',
        content: [
          {
            type: 'text',
            content: 'Hozir bajarilayotgan harakatlarni ifodalaydi.'
          },
          {
            type: 'example',
            title: 'Hozirgi zamon shakllari:',
            content: [
              '-yap: borayapman, kelayapman, yazayapman',
              '-moqda: bormoqdaman, kelmoqdaman, yazmoqdaman',
              '-ayotir: borayotirman, kelayotirman, yazayotirman'
            ]
          }
        ]
      },
      {
        id: 'subsection-4-3',
        title: 'Kelasi zamon',
        content: [
          {
            type: 'text',
            content: 'Kelajakda bajariladigan harakatlarni ifodalaydi.'
          },
          {
            type: 'example',
            title: 'Kelasi zamon shakllari:',
            content: [
              '-ar/-yar: borarman, kelarman, yazarman',
              '-jak: borajakman, kelajakman, yazajakman',
              '-gay: boragayman, kelagayman, yazagayman'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'section-5',
    title: 'Mayl shakllari',
    icon: '🎯',
    subsections: [
      {
        id: 'subsection-5-1',
        title: 'Mayl turlari',
        content: [
          {
            type: 'text',
            content: 'Mayl harakatning bajarilish maqsadini, istagini bildiradi.'
          },
          {
            type: 'list',
            title: 'Buyruq-istak mayli:',
            content: [
              '-gin: kelgin, borgan, yazgin',
              '-sin: kelsin, borsin, yazsin'
            ]
          },
          {
            type: 'list',
            title: 'Shart mayli:',
            content: [
              '-sa: kelsam, borsam, yazsam'
            ]
          },
          {
            type: 'list',
            title: 'Maqsad mayli:',
            content: [
              '-moqchi: bormoqchiman, kelmoqchiman, yazmoqchiman'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'section-6',
    title: "Ko'makchi fe'llar",
    icon: '🤝',
    subsections: [
      {
        id: 'subsection-6-1',
        title: "Ko'makchi fe'lli konstruksiyalar",
        content: [
          {
            type: 'text',
            content: "Yetakchi fe'l -(i)b yoki -a/-y shaklida keladi. Ko'makchi fe'l o'z leksik ma'nosini yo'qotadi va harakat xarakterini bildiradi."
          },
          {
            type: 'list',
            title: 'Harakat bosqichi:',
            content: [
              'Boshlanishi: boshlamoq',
              'Davomi: turmoq, yurmoq, yotmoq',
              'Tugashi: chiqmoq, bo\'lmoq, bitmoq'
            ]
          },
          {
            type: 'list',
            title: 'Harakat tarzi:',
            content: [
              'Tezlik: yubormoq, qolmoq',
              'Imkoniyat: olmoq'
            ]
          },
          {
            type: 'example',
            title: 'Misollar:',
            content: [
              "o'qib chiqdi (to'liq o'qidi)",
              'yozib bo\'ldi (yozib tugatdi)',
              'ishlay oladi (ishlash imkoniyati bor)',
              'yozib yubordi (tez yozdi)'
            ]
          },
          {
            type: 'warning',
            title: 'Muhim:',
            content: 'Zamon va shaxs-son faqat ko\'makchi fe\'lga qo\'shiladi.'
          }
        ]
      }
    ]
  },
  {
    id: 'section-7',
    title: 'Sifatdosh',
    icon: '📝',
    subsections: [
      {
        id: 'subsection-7-1',
        title: 'Sifatdosh turlari',
        content: [
          {
            type: 'text',
            content: 'Sifatdosh fe\'l va sifat belgilarini birlashtiradi. "Qanday?" savoliga javob beradi va predmetni tavsiflaydi.'
          },
          {
            type: 'list',
            title: "O'tgan zamon sifatdoshi:",
            content: [
              '-gan: o\'qigan bola, pishgan olma, yazgan xat',
              '-kan: ekkan, tikkan, chekkan',
              '-qan: chiqqan, o\'qigan, yazgan'
            ]
          },
          {
            type: 'list',
            title: 'Hozirgi zamon sifatdoshi:',
            content: [
              '-(a)yotgan: borayotgan, kelayotgan, yazayotgan'
            ]
          },
          {
            type: 'list',
            title: 'Kelasi zamon sifatdoshi:',
            content: [
              '-digan: boradigan, keladigan, yazadigan',
              '-ar/-yar: oqar daryo, yurar odam, kelar kun'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'section-8',
    title: 'Ravishdosh',
    icon: '📍',
    subsections: [
      {
        id: 'subsection-8-1',
        title: 'Ravishdosh turlari',
        content: [
          {
            type: 'text',
            content: 'Ravishdosh qo\'shimcha harakatni (harakat belgisini) bildiradi.'
          },
          {
            type: 'list',
            title: 'Holat ravishdoshi:',
            content: [
              '-(i)b: o\'qib, yazib, kelib',
              '-a/-y: o\'qiy, kel-a, bor-a',
              '-gancha: kelgancha, borgancha'
            ]
          },
          {
            type: 'list',
            title: 'Payt ravishdoshi:',
            content: [
              '-gach: o\'qigach, yazgach, kelgach',
              '-guncha: kelguncha, borgancha, yazguncha'
            ]
          },
          {
            type: 'list',
            title: 'Sabab ravishdoshi:',
            content: [
              '-(i)b: o\'qib qoldi, kelib qoldi',
              '-a/-y: kel-a qoldi'
            ]
          },
          {
            type: 'list',
            title: 'Maqsad ravishdoshi:',
            content: [
              "-gani: o'qigani keldi (o'qish uchun keldi), yazgani bordi"
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'section-9',
    title: "Bo'lishsizlik",
    icon: '❌',
    subsections: [
      {
        id: 'subsection-9-1',
        title: 'Inkor shakllari',
        content: [
          {
            type: 'text',
            content: "Fe'lning inkor shakli -ma affiksi bilan yoki emas/yo'q so'zlari bilan ifodalanadi."
          },
          {
            type: 'list',
            title: 'Inkor shakllari:',
            content: [
              '-ma affiksi: kelmadi, bormadi, yazmadi',
              '-mas affiksi: bormas, kelmas, yazmas',
              'emas so\'zi: borgan emas, kelgan emas',
              "yo'q so'zi: kelgani yo'q, borgan yo'q"
            ]
          },
          {
            type: 'warning',
            title: 'Muhim:',
            content: '-ma affiksi zamon va shaxs affikslaridan oldin keladi.'
          }
        ]
      }
    ]
  }
];
