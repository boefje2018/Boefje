import { Product, Coupon, JournalArticle } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-01',
    sku: 'BF-MM-001',
    slug: 'micromodal-air-boxer-brief-3pack',
    name: 'MicroModal Air Boxer Brief (3-Pack)',
    subtitle: 'Signature ultra-soft Austrian beechwood micro-modal with ergonomic 3D pouch.',
    category: 'underwear',
    gender: 'men',
    price: 1190,
    salePrice: 990,
    description: 'Boefje MicroModal Air, ultra hafif yapısı ve 3 kat daha nefes alabilen Avusturya kayın ağacı elyafı ile gün boyu sıfır baskı ve kusursuz konfor sunar. Ergonomik çift katmanlı ön destek cebi ve yuvarlanmayan mikrofiber bel bandı sayesinde her harekette sabit kalır.',
    materials: '92% Lenzing MicroModal®, 8% Elastan (Lycra® Adaptive)',
    fit: 'Modern Anatomik Fit. Vücuda tam oturan, toplanma yapmayan ve bacak içi sürtünmeyi önleyen orta boy paça.',
    care: '30°C hassas yıkama. Ağartıcı ve yumuşatıcı kullanmayınız. Düşük ısıda kurutulabilir.',
    features: [
      'Ergonomik 3D U-Pouch anatomik destek',
      'Ultra yumuşak ve dikişsiz hissiyatlı 3.5cm bel lastiği',
      'Bacak içi sürtünmeyi engelleyen çift yönlü mikro dikişler',
      'Doğal antibakteriyel ve nem transferi'
    ],
    inStock: true,
    rating: 4.9,
    reviewCount: 148,
    isBestSeller: true,
    isNew: false,
    images: {
      main: '/src/assets/images/cat_underwear_pack_1791051494979.jpg',
      front: '/src/assets/images/cat_underwear_pack_1791051494979.jpg',
      back: '/src/assets/images/hero_male_editorial_1791051483046.jpg',
      side: '/src/assets/images/cat_underwear_pack_1791051494979.jpg',
      detail: '/src/assets/images/story_amsterdam_atelier_1791051513856.jpg',
      lifestyle: '/src/assets/images/hero_male_editorial_1791051483046.jpg'
    },
    colors: [
      { name: 'Pitch Black', hex: '#111111', label: 'Derin Siyah' },
      { name: 'Shadow Slate', hex: '#374151', label: 'Antrasit Gri' },
      { name: 'Chalk White', hex: '#F3F4F6', label: 'Kırık Beyaz' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    stockByVariant: {
      'Pitch Black-XS': 8,
      'Pitch Black-S': 22,
      'Pitch Black-M': 35,
      'Pitch Black-L': 28,
      'Pitch Black-XL': 15,
      'Pitch Black-XXL': 6,
      'Shadow Slate-M': 18,
      'Shadow Slate-L': 14,
      'Chalk White-M': 12
    },
    reviews: [
      {
        id: 'rev-01',
        author: 'Kaan V.',
        rating: 5,
        date: '28 Şubat 2026',
        title: 'Calvin Klein ve CDLP’den çok daha iyi',
        comment: 'Kumaşın dokusu inanılmaz. Ne terletiyor ne de yukarı toplanıyor. Amsterdam tasarımını Ege pamuk & modal dokumasıyla birleştirmeleri muazzam bir kalite doğurmuş.',
        verified: true,
        fitFeedback: 'True to size'
      },
      {
        id: 'rev-02',
        author: 'Emre S.',
        rating: 5,
        date: '14 Mart 2026',
        title: 'Bel bandı kesinlikle katlanmıyor',
        comment: 'Gün boyu hareket halindeyim, spor yaparken de normalde de en rahat ettiğim boxer oldu. 3’lü paketi kesinlikle tavsiye ederim.',
        verified: true,
        fitFeedback: 'True to size'
      }
    ]
  },
  {
    id: 'prod-02',
    sku: 'BF-ST-002',
    slug: 'seamless-tech-trunk',
    name: 'Seamless Tech Trunk Boxer',
    subtitle: 'Frictionless 4-way stretch with zero-chafe bonded seams.',
    category: 'underwear',
    gender: 'men',
    price: 490,
    description: 'Dikişsiz termal yapıştırma teknolojisi ile üretilen Boefje Seamless Tech Trunk, ten üzerinde hissedilmeyen ikinci bir deri tabakası yaratır. Dar pantolonlar altında iz yapmaz, antrenman ve yoğun günlerde maksimum hareket özgürlüğü sağlar.',
    materials: '88% Geri Dönüştürülmüş Poliamid, 12% Spandex',
    fit: 'Trunk Fit (Kısa Paça). Vücudu sıkmadan kavrayan aerodinamik kesim.',
    care: 'Maksimum 30°C programda benzer renklerle yıkayınız.',
    features: [
      'Lazer kesim dikişsiz paça bitişleri',
      'İz bırakmayan mikrofiber esnek bel şeridi',
      'Termal havalandırma mikro perfore paneller',
      'Hızlı kuruyan hydro-wicking kumaş'
    ],
    inStock: true,
    rating: 4.8,
    reviewCount: 92,
    isBestSeller: true,
    isNew: true,
    images: {
      main: '/src/assets/images/hero_male_editorial_1791051483046.jpg',
      front: '/src/assets/images/hero_male_editorial_1791051483046.jpg',
      back: '/src/assets/images/cat_underwear_pack_1791051494979.jpg',
      side: '/src/assets/images/hero_male_editorial_1791051483046.jpg',
      detail: '/src/assets/images/story_amsterdam_atelier_1791051513856.jpg'
    },
    colors: [
      { name: 'Stealth Black', hex: '#141416', label: 'Mat Siyah' },
      { name: 'Olive Drab', hex: '#3b4335', label: 'Asker Yeşili' },
      { name: 'Heather Grey', hex: '#6b7280', label: 'Duman Grisi' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    stockByVariant: {
      'Stealth Black-S': 14,
      'Stealth Black-M': 28,
      'Stealth Black-L': 19,
      'Stealth Black-XL': 9,
      'Olive Drab-M': 10,
      'Heather Grey-L': 8
    },
    reviews: [
      {
        id: 'rev-03',
        author: 'Burak A.',
        rating: 5,
        date: '5 Mart 2026',
        title: 'Spor yaparken tam performans',
        comment: 'Dikişsiz olması bacak içini tahriş etmesini tamamen engelliyor. Kumaş kalitesi birinci sınıf.',
        verified: true,
        fitFeedback: 'True to size'
      }
    ]
  },
  {
    id: 'prod-03',
    sku: 'BF-OC-003',
    slug: 'pure-aegean-cotton-long-boxer',
    name: 'Pure Aegean Organic Long Boxer',
    subtitle: 'Uzun paçalı, sürtünme önleyici %95 Ege organik pamuk boxer.',
    category: 'underwear',
    gender: 'men',
    price: 460,
    description: 'GOTS sertifikalı uzun elyaflı Ege pamuğundan dokunan Pure Organic Long Boxer, ekstra uzun paça boyuyla bacakların birbirine temasını ve sürtünmesini tamamen sıfırlar.',
    materials: '95% GOTS Sertifikalı Ege Organik Taranmış Pamuk, 5% Elastan',
    fit: 'Long Boxer Fit (Uzun Paça). Uyluğu sarar, yukarı sıyrılma yapmaz.',
    care: '40°C yıkanabilir. Düşük devirde sıkınız.',
    features: [
      'GOTS sertifikalı organik tarım pamuğu',
      'Uyluk boyunca uzanan anti-roll paça yapısı',
      'Ekstra takviyeli ağ paneli',
      'Boefje kabartma tonal dokuma bel bandı'
    ],
    inStock: true,
    rating: 5.0,
    reviewCount: 64,
    isBestSeller: false,
    isNew: false,
    images: {
      main: '/src/assets/images/cat_underwear_pack_1791051494979.jpg',
      front: '/src/assets/images/cat_underwear_pack_1791051494979.jpg',
      back: '/src/assets/images/hero_male_editorial_1791051483046.jpg',
      side: '/src/assets/images/cat_underwear_pack_1791051494979.jpg',
      detail: '/src/assets/images/story_amsterdam_atelier_1791051513856.jpg'
    },
    colors: [
      { name: 'Pitch Black', hex: '#111111', label: 'Derin Siyah' },
      { name: 'Deep Navy', hex: '#1e293b', label: 'Gece Mavisi' }
    ],
    sizes: ['M', 'L', 'XL', 'XXL'],
    stockByVariant: {
      'Pitch Black-M': 20,
      'Pitch Black-L': 24,
      'Pitch Black-XL': 18,
      'Pitch Black-XXL': 10
    },
    reviews: [
      {
        id: 'rev-04',
        author: 'Murat D.',
        rating: 5,
        date: '20 Şubat 2026',
        title: 'Uzun paça arayanlar için zirve',
        comment: 'Özellikle yazın ve uzun yürüyüşlerde kurtarıcı oldu. Hiç yukarı toplanmıyor.',
        verified: true,
        fitFeedback: 'True to size'
      }
    ]
  },
  {
    id: 'prod-04',
    sku: 'BF-SP-004',
    slug: 'aeromesh-performance-short',
    name: 'Aeromesh 2-in-1 Performance Short',
    subtitle: 'Dahili kompresyon astarlı, hafif ve su itici teknik antrenman şortu.',
    category: 'sportswear',
    gender: 'men',
    price: 1350,
    salePrice: 1150,
    description: 'Yüksek yoğunluklu antrenmanlar ve koşu için geliştirilen Aeromesh 2-in-1 Short, dışta 4 yönlü ultra esnek mat kumaş, içte ise kasları stabilize eden ve sürtünmeyi önleyen entegre kompresyon astarı içerir.',
    materials: 'Dış Kumaş: 86% Nylon, 14% Spandex (DWR kaplamalı); İç Astar: 80% Polyester, 20% Elastan',
    fit: 'Athletic 7-inch Inseam. Diz üstü optimum hareket aralığı.',
    care: '30°C soğuk yıkama. Yumuşatıcı kullanmayınız.',
    features: [
      'Gizli telefon hazneli iç kompresyon cebi',
      'Su geçirmez fermuarlı yan anahtar cebi',
      'Havalandırmalı yan paneller ve arka havlu askısı',
      'Reflektif mat Boefje minimal logo detayı'
    ],
    inStock: true,
    rating: 4.9,
    reviewCount: 78,
    isBestSeller: true,
    isNew: true,
    images: {
      main: '/src/assets/images/cat_sportswear_model_1791051503755.jpg',
      front: '/src/assets/images/cat_sportswear_model_1791051503755.jpg',
      back: '/src/assets/images/cat_sportswear_model_1791051503755.jpg',
      side: '/src/assets/images/cat_sportswear_model_1791051503755.jpg',
      detail: '/src/assets/images/cat_sportswear_model_1791051503755.jpg'
    },
    colors: [
      { name: 'Matte Black', hex: '#161616', label: 'Mat Siyah' },
      { name: 'Concrete Slate', hex: '#4b5563', label: 'Kaya Grisi' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    stockByVariant: {
      'Matte Black-S': 8,
      'Matte Black-M': 16,
      'Matte Black-L': 14,
      'Matte Black-XL': 7
    },
    reviews: [
      {
        id: 'rev-05',
        author: 'Arda G.',
        rating: 5,
        date: '10 Mart 2026',
        title: 'Nike ve Lululemon ayarında',
        comment: 'Astarın sıkılığı ve telefon cebi harika. Koşarken telefon kesinlikle sallanmıyor.',
        verified: true,
        fitFeedback: 'True to size'
      }
    ]
  },
  {
    id: 'prod-05',
    sku: 'BF-SP-005',
    slug: 'kinetic-seamless-training-tee',
    name: 'Kinetic Seamless Training Tee',
    subtitle: 'Nefes alabilir havalandırma örgülü dikişsiz antrenman tişörtü.',
    category: 'sportswear',
    gender: 'men',
    price: 890,
    description: 'Kinetic Seamless Tee, göğüs ve sırt bölgesine stratejik olarak yerleştirilen gradyan mikro delik örgüsüyle vücut ısısını dengeler. Gümüş iyon teknolojisi koku oluşumunu engeller.',
    materials: '72% Poliamid, 28% Polyester (Silvadur™ Antimikrobiyal)',
    fit: 'Tailored Athletic Fit. Omuzları ve göğsü vurgulayan, bele doğru rahatlayan kesim.',
    care: '30°C hassas yıkama. Ütüleme gerektirmez.',
    features: [
      'Gövdede sürtünmeyi önleyen dikişsiz (seamless) silindir dokuma',
      'Hareket kısıtlamayan ergonomik raglan omuz kolları',
      'Koku önleyici gümüş iyon lif teknolojisi',
      'Hafif ve ipeksi ten teması'
    ],
    inStock: true,
    rating: 4.8,
    reviewCount: 52,
    isBestSeller: false,
    isNew: true,
    images: {
      main: '/src/assets/images/cat_sportswear_model_1791051503755.jpg',
      front: '/src/assets/images/cat_sportswear_model_1791051503755.jpg',
      back: '/src/assets/images/cat_sportswear_model_1791051503755.jpg',
      side: '/src/assets/images/hero_male_editorial_1791051483046.jpg',
      detail: '/src/assets/images/story_amsterdam_atelier_1791051513856.jpg'
    },
    colors: [
      { name: 'Obsidian Black', hex: '#0f1012', label: 'Obsidyen Siyah' },
      { name: 'Vapor White', hex: '#f8fafc', label: 'Buz Beyaz' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    stockByVariant: {
      'Obsidian Black-S': 10,
      'Obsidian Black-M': 22,
      'Obsidian Black-L': 18,
      'Obsidian Black-XL': 12
    },
    reviews: [
      {
        id: 'rev-06',
        author: 'Tolga K.',
        rating: 5,
        date: '1 Mart 2026',
        title: 'Mükemmel kalıp ve nefes alma',
        comment: 'Crossfit antrenmanında kullandım. Islandığında ağırlaşmıyor, kalıbı çok estetik duruyor.',
        verified: true,
        fitFeedback: 'True to size'
      }
    ]
  },
  {
    id: 'prod-06',
    sku: 'BF-SP-006',
    slug: 'hyperflex-compression-tight',
    name: 'HyperFlex Compression Tight',
    subtitle: 'Kademeli kas desteği ve sürtünmesiz performans taytı.',
    category: 'sportswear',
    gender: 'men',
    price: 1100,
    description: 'Kan dolaşımını destekleyen ve kas titreşimini azaltarak yorgunluğu geciktiren HyperFlex Compression Tight, şort altı veya tek başına giyilmek üzere tasarlanmıştır.',
    materials: '78% Geri Dönüştürülmüş Naylon, 22% Xtra Life Lycra®',
    fit: 'Graduated Compression Fit (Kademeli Sıkıştırma).',
    care: '30°C soğuk suyla ters çevirerek yıkayınız.',
    features: [
      'Hedefli kuadriseps ve kalf stabilizasyon panelleri',
      'Geniş kaymayan elastik kordonlu bel bandı',
      'Düz kilit (flatlock) çift yönlü dikişler'
    ],
    inStock: true,
    rating: 4.7,
    reviewCount: 39,
    isBestSeller: false,
    isNew: false,
    images: {
      main: '/src/assets/images/cat_sportswear_model_1791051503755.jpg',
      front: '/src/assets/images/cat_sportswear_model_1791051503755.jpg',
      back: '/src/assets/images/cat_sportswear_model_1791051503755.jpg',
      side: '/src/assets/images/cat_sportswear_model_1791051503755.jpg',
      detail: '/src/assets/images/hero_male_editorial_1791051483046.jpg'
    },
    colors: [
      { name: 'Pitch Black', hex: '#111111', label: 'Mat Siyah' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    stockByVariant: {
      'Pitch Black-S': 6,
      'Pitch Black-M': 15,
      'Pitch Black-L': 12,
      'Pitch Black-XL': 8
    },
    reviews: []
  },
  {
    id: 'prod-07',
    sku: 'BF-BB-007',
    slug: 'raw-bamboo-everyday-brief',
    name: 'Raw Bamboo Everyday Brief',
    subtitle: 'Doğal bambu lifi, termo-regülasyon ve klasik Avrupa kesimi.',
    category: 'underwear',
    gender: 'men',
    price: 390,
    description: 'Klasik brief sevenler için Boefje standardında yeniden yorumlandı. İpeksi bambu kumaşı cildi serin tutar ve en sıcak günlerde bile kuru kalmanızı sağlar.',
    materials: '95% Bambu Viskoz, 5% Elastan',
    fit: 'Classic Tailored Brief. Bacak oyuntusu anatomik açı ile optimize edilmiştir.',
    care: '30°C hassas yıkama.',
    features: [
      'Doğal nem emici ve koku engelleyici bambu lifleri',
      'Konfor odaklı dikişsiz kasık astarı',
      'İnce jakarlı minimalist logo kemeri'
    ],
    inStock: true,
    rating: 4.9,
    reviewCount: 45,
    isBestSeller: false,
    isNew: false,
    images: {
      main: '/src/assets/images/cat_underwear_pack_1791051494979.jpg',
      front: '/src/assets/images/cat_underwear_pack_1791051494979.jpg',
      back: '/src/assets/images/hero_male_editorial_1791051483046.jpg',
      side: '/src/assets/images/cat_underwear_pack_1791051494979.jpg',
      detail: '/src/assets/images/story_amsterdam_atelier_1791051513856.jpg'
    },
    colors: [
      { name: 'Chalk White', hex: '#F3F4F6', label: 'Kırık Beyaz' },
      { name: 'Slate Grey', hex: '#4B5563', label: 'Kayrak Grisi' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    stockByVariant: {
      'Chalk White-S': 12,
      'Chalk White-M': 20,
      'Chalk White-L': 15,
      'Slate Grey-M': 18
    },
    reviews: []
  },
  {
    id: 'prod-08',
    sku: 'BF-SW-008',
    slug: 'studio-heavyweight-sweatpant',
    name: 'Studio Heavyweight 450GSM Sweatpant',
    subtitle: 'Ağır gramaj Fransız havlu kumaş, minimal mimari siluet.',
    category: 'sportswear',
    gender: 'men',
    price: 1850,
    salePrice: 1590,
    description: 'Amsterdam stüdyomuzda tasarlanan bu eşofman altı, 450 GSM saf taranmış pamuk yapısıyla tok ve kusursuz bir düşüş sergiler. Hem dinlenme hem de sokak stilinde üst düzey lüks sunar.',
    materials: '100% Organik Ağır Pamuk French Terry (450 GSM)',
    fit: 'Relaxed Tapered Fit. Rahat üst kesim, bileğe doğru hafif daralan form.',
    care: 'Ters çevirerek 30°C yıkayınız. Ağartıcı kullanmayınız.',
    features: [
      'Özel boyanmış mat metal uçlu pamuk kordon',
      'Derin cepler ve gizli arka fermuarlı kart cebi',
      'Kalıp bozmayan yoğun dokuma ribana paça'
    ],
    inStock: true,
    rating: 5.0,
    reviewCount: 31,
    isBestSeller: true,
    isNew: true,
    images: {
      main: '/src/assets/images/cat_sportswear_model_1791051503755.jpg',
      front: '/src/assets/images/cat_sportswear_model_1791051503755.jpg',
      back: '/src/assets/images/cat_sportswear_model_1791051503755.jpg',
      side: '/src/assets/images/hero_male_editorial_1791051483046.jpg',
      detail: '/src/assets/images/story_amsterdam_atelier_1791051513856.jpg'
    },
    colors: [
      { name: 'Washed Black', hex: '#1c1c1e', label: 'Yıkanmış Siyah' },
      { name: 'Stone Grey', hex: '#78716c', label: 'Taş Grisi' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    stockByVariant: {
      'Washed Black-S': 5,
      'Washed Black-M': 14,
      'Washed Black-L': 12,
      'Washed Black-XL': 8,
      'Stone Grey-M': 10
    },
    reviews: []
  }
];

export const INITIAL_COUPONS: Coupon[] = [
  {
    code: 'WELCOME10',
    discountPercent: 10,
    minOrder: 500,
    active: true,
    description: 'İlk siparişinize özel %10 indirim.'
  },
  {
    code: 'BOEFJE20',
    discountPercent: 20,
    minOrder: 1500,
    active: true,
    description: '1500 TL üzeri alışverişlerde %20 indirim.'
  },
  {
    code: 'BLACKFRIDAY',
    discountPercent: 25,
    minOrder: 2000,
    active: true,
    description: 'Özel kampanya dönemi %25 indirim.'
  }
];

export const JOURNAL_ARTICLES: JournalArticle[] = [
  {
    id: 'art-01',
    slug: 'anatomy-of-micromodal',
    title: 'MicroModal’ın Anatomisi: Neden Pamuktan 3 Kat Daha Yumuşak?',
    category: 'MATERIALS & SCIENCE',
    readTime: '4 dk okuma',
    date: 'Ekim 2026',
    excerpt: 'Avusturya kayın ağaçlarından elde edilen sürdürülebilir selüloz liflerinin lüks iç giyimi nasıl sonsuza dek dönüştürdüğünü keşfedin.',
    image: '/src/assets/images/cat_underwear_pack_1791051494979.jpg',
    content: [
      'Geleneksel iç giyim endüstrisi onlarca yıldır standart pamuk karışımlarına dayanıyordu. Ancak yüksek performanslı yaşam tarzı, ter emme yeteneği sınırlı olan kumaşların ötesine geçmeyi gerektiriyor.',
      'Boefje olarak kullandığımız Lenzing MicroModal®, Avusturya ormanlarından sertifikalı sürdürülebilir kayın ağaçlarının selülozundan üretilir. İpliğin çapı insan saç telinin beşte biri kadardır.',
      'Sonuç: Ciltle temas ettiği anda hissedilen serin, pürüzsüz ve dökümlü bir mikro doku. Onlarca yıkamadan sonra bile rengini ve yumuşaklığını ilk günkü gibi muhafaza eder.'
    ]
  },
  {
    id: 'art-02',
    slug: 'boxer-briefs-vs-trunks',
    title: 'Boxer Brief mi, Trunk mu? Vücut Tipine Göre Doğru Kesim Rehberi',
    category: 'FIT & STYLE',
    readTime: '3 dk okuma',
    date: 'Eylül 2026',
    excerpt: 'Her hareketinizde konfor sağlamak için bacak yapınız ve günlük kıyafetlerinizle en uyumlu kesimi seçin.',
    image: '/src/assets/images/hero_male_editorial_1791051483046.jpg',
    content: [
      'Erkek iç giyiminde en sık karşılaşılan hata, yanlış bacak uzunluğuna sahip modelleri tercih etmektir.',
      'Boxer Brief: Uyluğun ortasına kadar uzanır. Özellikle bacak içi sürtünmesi yaşayan veya takım elbise/kumaş pantolon giyen erkekler için yukarı toplanmayı sıfırlar.',
      'Trunk: Daha kısa ve dinamiktir. Şortlar ve slim fit pantolonlar altında kusursuz bir çizgisizlik sunar.'
    ]
  },
  {
    id: 'art-03',
    slug: 'minimalist-athletic-wardrobe',
    title: 'Spor Salonundan Sokak Modasına: Kapsül Sportswear Gardırobu',
    category: 'PERFORMANCE',
    readTime: '5 dk okuma',
    date: 'Ağustos 2026',
    excerpt: 'Amsterdam minimalizmini teknik spor kumaşlarıyla buluşturan modern erkek gardırop manifestosu.',
    image: '/src/assets/images/cat_sportswear_model_1791051503755.jpg',
    content: [
      'Aşırı logolu, neon renkli ve gereksiz detaylarla dolu spor giyim dönemi sona erdi.',
      'Boefje Sportswear, spor salonundaki yüksek tempoyu şehir sokaklarındaki zarif minimalizmle birleştirir. Mat siyah tonlar, dikişsiz geçişler ve termal yönetim detayları ön plandadır.'
    ]
  }
];
