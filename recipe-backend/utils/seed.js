// Simple seed to insert demo recipes into the DB
const mongoose = require("mongoose");
const Recipe = require("../models/Recipe");

const DB_PATH =
  "mongodb+srv://therecipespk:recipe.pk@the-recipespk.6fbccwt.mongodb.net/The-RecipesPk?retryWrites=true&w=majority&appName=The-RecipesPk";

async function run() {
  await mongoose.connect(DB_PATH);

  const data = [
    {
      title: "8 Popular Chicken Karahi Pakistani Recipes",
      titleinUrdu: "مشہور چکن کڑاہی پاکستانی ریسپی",
      description:
        "Discover the most authentic and delicious chicken karahi recipes from different regions of Pakistan. This collection features 8 traditional methods that will bring the true taste of Pakistani cuisine to your kitchen.",
      descriptionInUrdu:
        "پاکستان کے مختلف علاقوں سے آٹھ مشہور چکن کڑاہی کی ترکیبیں دریافت کریں جو آپ کے کچن میں حقیقی پاکستانی ذائقہ لائیں گی۔",
      image:
        "https://therecipespk.com/wp-content/uploads/2024/07/8-Popular-Chicken-Karahi-Pakistani-Recipes.png",
      section: "blog",
      category: "tikka-kabab-cutlets",
      contentType: "blog",
      ingredients: [
        "1 kg Chicken (cut into pieces)",
        "2 medium Tomatoes (chopped)",
        "1 large Onion (sliced)",
        "1 tbsp Ginger-Garlic paste",
        "2-3 Green chilies",
        "1 tsp Red chili powder",
        "1/2 tsp Turmeric powder",
        "1 tsp Coriander powder",
        "1 tsp Garam masala powder",
        "1/2 cup Cooking oil",
        "Salt to taste",
        "Fresh cilantro for garnish",
        "Fresh ginger (julienned)",
      ],
      ingredientsInUrdu: [
        "چکن ایک کلو (ٹکڑوں میں کٹا ہوا)",
        "ٹماٹر دو درمیانے (کٹے ہوئے)",
        "پیاز ایک بڑا (کٹا ہوا)",
        "ادرک لہسن کا پیسٹ ایک چمچ",
        "ہری مرچ دو سے تین",
        "سرخ مرچ پاؤڈر ایک چھوٹا چمچ",
        "ہلدی پاؤڈر آدھا چھوٹا چمچ",
        "دھنیا پاؤڈر ایک چھوٹا چمچ",
        "گرم مصالحہ پاؤڈر ایک چھوٹا چمچ",
        "کھانا پکانے کا تیل آدھا کپ",
        "نمک حسب ضرورت",
        "تازہ دھنیا سجانے کے لیے",
        "تازہ ادرک (باریک کٹا ہوا)",
      ],
      instructions: [
        "Heat oil in a karahi or heavy-bottomed pan over medium-high heat.",
        "Add sliced onions and fry until golden brown. Remove and set aside.",
        "In the same oil, add chicken pieces and cook until they change color on all sides.",
        "Add ginger-garlic paste and cook for 2-3 minutes until fragrant.",
        "Add chopped tomatoes, red chili powder, turmeric, coriander powder, and salt.",
        "Cook on medium heat until tomatoes break down and oil separates (about 10-12 minutes).",
        "Add fried onions back to the karahi and mix well.",
        "Add green chilies and garam masala powder.",
        "Cook for another 8-10 minutes until chicken is tender and gravy thickens.",
        "Garnish with fresh cilantro and julienned ginger.",
        "Serve hot with naan, roti, or rice.",
      ],
      instructionsInUrdu: [
        "کڑاہی میں تیل گرم کریں اور درمیانی آنچ پر رکھیں",
        "پیاز ڈال کر سنہری ہونے تک تلیں، نکال کر الگ رکھیں",
        "اسی تیل میں چکن کے ٹکڑے ڈال کر تمام طرف سے رنگ تبدیل ہونے تک پکائیں",
        "ادرک لہسن کا پیسٹ ڈال کر ۲-۳ منٹ خوشبو آنے تک پکائیں",
        "کٹے ہوئے ٹماٹر، سرخ مرچ، ہلدی، دھنیا پاؤڈر اور نمک ڈالیں",
        "درمیانی آنچ پر ۱۰-۱۲ منٹ تک پکائیں جب تک ٹماٹر گل جائیں اور تیل الگ ہو جائے",
        "تلے ہوئے پیاز واپس ڈال کر اچھی طرح ملائیں",
        "ہری مرچ اور گرم مصالحہ ڈالیں",
        "مزید ۸-۱۰ منٹ پکائیں جب تک چکن نرم ہو جائے اور گریوی گاڑھی ہو جائے",
        "تازہ دھنیا اور ادرک سے سجائیں",
        "گرم گرم نان، روٹی یا چاول کے ساتھ پیش کریں",
      ],
      prepTime: "15 minutes",
      cookTime: "35 minutes",
      totalTime: "50 minutes",
      servings: "6-8",
      difficulty: "Medium",
      cuisine: "Pakistani",
      author: {
        name: "Chef Faiza",
        image: "https://via.placeholder.com/60x60/FF6B6B/FFFFFF?text=CF",
        bio: "Master of traditional Pakistani cuisine with 15+ years experience",
      },
      nutritionalInfo: {
        calories: "380 per serving",
        protein: "35g",
        carbs: "8g",
        fat: "24g",
        fiber: "2g",
      },
      tips: [
        "Use bone-in chicken pieces for more flavor",
        "Don't skip frying the onions - they add essential sweetness",
        "Cook on high heat initially to get the signature smoky flavor",
        "Adjust spice levels according to your preference",
      ],
      tipsInUrdu: [
        "ہڈی والا چکن استعمال کریں زیادہ ذائقے کے لیے",
        "پیاز تلنا نہ چھوڑیں - یہ ضروری مٹھاس فراہم کرتا ہے",
        "ابتدا میں تیز آنچ پر پکائیں دھوئیں والا ذائقہ حاصل کرنے کے لیے",
        "اپنی پسند کے مطابق مسالے کی مقدار ایڈجسٹ کریں",
      ],
      rating: 4.8,
      reviewCount: 245,
      views: 15420,
      tags: ["chicken", "karahi", "pakistani", "spicy", "traditional"],
      isRamadan: false,
      inEid: false,
      isFeatured: true,
      relatedRecipes: [
        [
          "lahori-chicken-karahi",
          "sindhi-chicken-karahi",
          "punjabi-chicken-karahi",
          "karachi-style-chicken-karahi",
          "white-chicken-karahi",
          "afghani-chicken-karahi",
          "peshawari-chicken-karahi",
          "hyderabadi-chicken-karahi",
        ],
      ],
    },
    {
      title: "Pakistani Cooking Techniques: Tips and Tricks from Expert Chefs",
      titleinUrdu: "پاکستانی کھانا پکانے کی تکنیکیں: ماہر شیفز کے ٹپس اور ٹرکس",
      description:
        "Learn the secrets of authentic Pakistani cooking from master chefs. Discover traditional techniques, spice combinations, and cooking methods that have been passed down through generations.",
      descriptionInUrdu:
        "ماہر شیفز سے اصل پاکستانی کھانا پکانے کے راز سیکھیں۔ روایتی تکنیکیں، مسالوں کے امتزاج اور کھانا پکانے کے طریقے دریافت کریں جو نسلوں سے چلے آ رہے ہیں۔",
      image:
        "https://therecipespk.com/wp-content/uploads/2024/07/Pakistani-Cooking-Techniques-Tips-and-Tricks-from-Expert-Chefs.png",
      section: "blog",
      category: "general",
      prepTime: "N/A",
      cookTime: "N/A",
      totalTime: "Reading time: 8 minutes",
      servings: "N/A",
      difficulty: "Easy",
      cuisine: "Pakistani",
      author: {
        name: "Master Chef Hussain",
        image: "https://via.placeholder.com/60x60/4ECDC4/FFFFFF?text=CH",
        bio: "Culinary expert specializing in South Asian cuisine techniques",
      },
      tips: [
        "Always heat your spices in oil to release their full flavor",
        "Use whole spices for deeper taste - grind them fresh",
        "Let your onions caramelize properly - this is the foundation of most Pakistani dishes",
        "Balance is key - sweet, sour, spicy, and salty should complement each other",
        "Use fresh herbs as garnish to add color and freshness",
      ],
      tipsInUrdu: [
        "مسالوں کو ہمیشہ تیل میں گرم کریں تاکہ پورا ذائقہ نکلے",
        "مکمل مسالے استعمال کریں گہرے ذائقے کے لیے - انہیں تازہ پیسیں",
        "پیاز کو اچھی طرح بھونیں - یہ زیادہ تر پاکستانی کھانوں کی بنیاد ہے",
        "توازن اہم ہے - میٹھا، کھٹا، تیکھا اور نمکین ایک دوسرے کے ساتھ میل کھانا چاہیے",
        "رنگ اور تازگی کے لیے تازہ جڑی بوٹیاں سجاوٹ کے طور پر استعمال کریں",
      ],
      rating: 4.9,
      reviewCount: 189,
      views: 8750,
      tags: ["cooking-tips", "techniques", "pakistani", "chef-secrets"],
      isRamadan: false,
      inEid: false,
      isFeatured: true,
    },
    {
      title: "Regional Specialties: Exploring the Diverse Cuisines of Pakistan",
      titleinUrdu: "علاقائی خصوصیات: پاکستان کے متنوع کھانوں کی تلاش",
      description:
        "Take a culinary journey through Pakistan's diverse regions. From the rich flavors of Punjab to the aromatic dishes of Sindhi cuisine, discover what makes each region's food unique and special.",
      descriptionInUrdu:
        "پاکستان کے مختلف علاقوں کے ذریعے ایک کھانے کا سفر کریں۔ پنجاب کے بھرپور ذائقوں سے لے کر سندھی کھانوں کی خوشبو تک، دریافت کریں کہ ہر علاقے کا کھانا کیا منفرد اور خاص بناتا ہے۔",
      image:
        "https://therecipespk.com/wp-content/uploads/2024/07/Regional-Specialties-Exploring-the-Diverse-Cuisines-of-Pakistan.png",
      section: "blog",
      category: "general",
      prepTime: "N/A",
      cookTime: "N/A",
      totalTime: "Reading time: 12 minutes",
      servings: "N/A",
      difficulty: "Easy",
      cuisine: "Pakistani",
      author: {
        name: "Chef Amina Khan",
        image: "https://via.placeholder.com/60x60/FF8A80/FFFFFF?text=AK",
        bio: "Cultural cuisine specialist and food historian",
      },
      tips: [
        "Each region has its signature spice blend - learn to identify them",
        "Understanding regional cooking methods helps you cook more authentically",
        "Try using traditional cookware for authentic flavors",
        "Local ingredients make a huge difference in taste",
        "Don't be afraid to experiment with regional variations",
      ],
      tipsInUrdu: [
        "ہر علاقے کا اپنا مخصوص مسالا ہوتا ہے - انہیں پہچاننا سیکھیں",
        "علاقائی کھانا پکانے کے طریقوں کو سمجھنا زیادہ اصل پن سے پکانے میں مدد کرتا ہے",
        "اصل ذائقوں کے لیے روایتی برتن استعمال کرنے کی کوشش کریں",
        "مقامی اجزاء ذائقے میں بہت فرق لاتے ہیں",
        "علاقائی تبدیلیوں کے ساتھ تجربہ کرنے سے نہ گھبرائیں",
      ],
      rating: 4.7,
      reviewCount: 156,
      views: 6890,
      tags: ["regional", "diversity", "cultural", "pakistani", "specialty"],
      isRamadan: false,
      inEid: false,
      isFeatured: true,
      relatedRecipes: [
        [
          "lahori-chicken-karahi",
          "peshawari-chicken-karahi",
          "balochi-chicken-karahi",
          "sindhi-chicken-karahi",
          "punjabi-chicken-karahi",
          "karachi-style-chicken-karahi",
          "white-chicken-karahi",
          "afghani-chicken-karahi",
        ],
      ],
    },
    // Individual Karahi Recipes
    {
      title: "Lahori Chicken Karahi",
      titleinUrdu: "لاہوری چکن کڑاہی",
      description:
        "Traditional Lahori-style chicken karahi with rich tomato gravy and aromatic spices.",
      descriptionInUrdu:
        "روایتی لاہوری انداز میں چکن کڑاہی بھرپور ٹماٹر گریوی اور خوشبودار مسالوں کے ساتھ۔",
      image:
        "https://therecipespk.com/wp-content/uploads/2024/07/lahori-chicken-karahi.jpg",
      section: "general",
      category: "tikka-kabab-cutlets",
      contentType: "recipe",
      ingredients: [
        "1 kg chicken, cut into pieces",
        "3 large tomatoes, chopped",
        "1 large onion, sliced",
        "2 tbsp ginger-garlic paste",
        "3-4 green chilies",
        "1 tsp red chili powder",
        "1/2 tsp turmeric powder",
        "1 tsp coriander powder",
        "1/2 cup cooking oil",
        "Salt to taste",
        "Fresh cilantro for garnish",
      ],
      instructions: [
        "Heat oil in a karahi and fry chicken pieces until golden.",
        "Add onions and cook until translucent.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add tomatoes and cook until soft and pulpy.",
        "Add all spices and cook for 5 minutes.",
        "Add chicken back to karahi and simmer for 15 minutes.",
        "Garnish with cilantro and serve hot.",
      ],
      prepTime: "15 minutes",
      cookTime: "30 minutes",
      totalTime: "45 minutes",
      servings: "4-6",
      difficulty: "Medium",
      cuisine: "Pakistani",
      author: {
        name: "Chef Lahori",
        image: "https://via.placeholder.com/60x60/FF6B6B/FFFFFF?text=CL",
        bio: "Expert in traditional Lahori cuisine",
      },
      tags: ["chicken", "karahi", "lahori", "spicy", "traditional"],
      rating: 4.7,
      reviewCount: 89,
      views: 2340,
      collection: "top-8-recipes",
    },
    {
      title: "Peshawari Chicken Karahi",
      titleinUrdu: "پشاوری چکن کڑاہی",
      description:
        "Authentic Peshawari chicken karahi with distinctive flavors and cooking techniques.",
      descriptionInUrdu:
        "اصل پشاوری چکن کڑاہی مخصوص ذائقوں اور پکانے کی تکنیکوں کے ساتھ۔",
      image:
        "https://therecipespk.com/wp-content/uploads/2024/07/peshawari-chicken-karahi.jpg",
      section: "general",
      category: "tikka-kabab-cutlets",
      contentType: "recipe",
      ingredients: [
        "1 kg chicken with bones",
        "2 large tomatoes",
        "1 onion, sliced",
        "2 tbsp fresh ginger, julienned",
        "4-5 green chilies",
        "1 tsp red chili powder",
        "1 tsp garam masala",
        "1/2 cup desi ghee",
        "Salt to taste",
        "Fresh mint leaves",
      ],
      instructions: [
        "Heat ghee in karahi over high heat.",
        "Add chicken and cook until browned on all sides.",
        "Add onions and cook until golden.",
        "Add tomatoes and cook until completely broken down.",
        "Add spices and cook for 3-4 minutes.",
        "Cover and cook on medium heat for 20 minutes.",
        "Garnish with ginger julienne and mint.",
      ],
      prepTime: "20 minutes",
      cookTime: "35 minutes",
      totalTime: "55 minutes",
      servings: "4-6",
      difficulty: "Medium",
      cuisine: "Pakistani",
      author: {
        name: "Ustad Peshawari",
        image: "https://via.placeholder.com/60x60/4ECDC4/FFFFFF?text=UP",
        bio: "Master of traditional Peshawari cooking",
      },
      tags: ["chicken", "karahi", "peshawari", "authentic", "traditional"],
      rating: 4.8,
      reviewCount: 156,
      views: 3290,
      collection: "top-8-recipes",
    },
    {
      title: "Balochi Chicken Karahi",
      titleinUrdu: "بلوچی چکن کڑاہی",
      description:
        "Rich and flavorful Balochi-style chicken karahi with unique spice blend.",
      descriptionInUrdu:
        "بھرپور اور ذائقہ دار بلوچی انداز کی چکن کڑاہی منفرد مسالوں کے امتزاج کے ساتھ۔",
      image:
        "https://therecipespk.com/wp-content/uploads/2024/07/balochi-chicken-karahi.jpg",
      section: "general",
      category: "tikka-kabab-cutlets",
      contentType: "recipe",
      ingredients: [
        "1 kg chicken, cut into large pieces",
        "4 tomatoes, chopped",
        "2 onions, sliced",
        "3 tbsp ginger-garlic paste",
        "6-8 dried red chilies",
        "1 tbsp coriander seeds",
        "1 tsp cumin seeds",
        "1/2 cup mustard oil",
        "Salt to taste",
        "Fresh coriander leaves",
      ],
      instructions: [
        "Dry roast coriander and cumin seeds, then grind.",
        "Heat mustard oil in karahi until smoking.",
        "Add chicken and fry until well browned.",
        "Add onions and cook until caramelized.",
        "Add ginger-garlic paste and dried chilies.",
        "Add tomatoes and ground spices.",
        "Cook covered for 25 minutes on low heat.",
        "Garnish with fresh coriander.",
      ],
      prepTime: "25 minutes",
      cookTime: "40 minutes",
      totalTime: "65 minutes",
      servings: "4-6",
      difficulty: "Hard",
      cuisine: "Pakistani",
      author: {
        name: "Chef Baloch",
        image: "https://via.placeholder.com/60x60/FF8A80/FFFFFF?text=CB",
        bio: "Traditional Balochi cuisine specialist",
      },
      tags: ["chicken", "karahi", "balochi", "spicy", "authentic"],
      rating: 4.6,
      reviewCount: 67,
      views: 1890,
      collection: "top-8-recipes",
    },
    {
      title: "Sindhi Chicken Karahi",
      titleinUrdu: "سندھی چکن کڑاہی",
      description:
        "Sindhi-style chicken karahi with tangy flavors and aromatic herbs.",
      descriptionInUrdu:
        "سندھی انداز کی چکن کڑاہی کھٹے ذائقوں اور خوشبودار جڑی بوٹیوں کے ساتھ۔",
      image:
        "https://therecipespk.com/wp-content/uploads/2024/07/sindhi-chicken-karahi.jpg",
      section: "general",
      category: "tikka-kabab-cutlets",
      contentType: "recipe",
      ingredients: [
        "1 kg chicken pieces",
        "3 large tomatoes",
        "1 large onion",
        "2 tbsp tamarind paste",
        "1 tbsp ginger-garlic paste",
        "1 tsp red chili powder",
        "1/2 tsp turmeric",
        "1 tsp garam masala",
        "1/4 cup cooking oil",
        "Fresh curry leaves",
        "Salt to taste",
      ],
      instructions: [
        "Heat oil and add curry leaves.",
        "Add chicken pieces and fry until golden.",
        "Remove chicken and set aside.",
        "In same oil, cook onions until brown.",
        "Add ginger-garlic paste and tomatoes.",
        "Add tamarind paste and all spices.",
        "Return chicken to karahi and simmer.",
        "Cook for 20 minutes until tender.",
      ],
      prepTime: "15 minutes",
      cookTime: "35 minutes",
      totalTime: "50 minutes",
      servings: "4-6",
      difficulty: "Medium",
      cuisine: "Pakistani",
      author: {
        name: "Sindhi Master Chef",
        image: "https://via.placeholder.com/60x60/9C27B0/FFFFFF?text=SC",
        bio: "Expert in traditional Sindhi flavors",
      },
      tags: ["chicken", "karahi", "sindhi", "tangy", "traditional"],
      rating: 4.5,
      reviewCount: 78,
      views: 2150,
      collection: "top-8-recipes",
    },
    {
      title: "Punjabi Chicken Karahi",
      titleinUrdu: "پنجابی چکن کڑاہی",
      description:
        "Hearty Punjabi-style chicken karahi with rich gravy and bold flavors.",
      descriptionInUrdu:
        "دل بھر پنجابی انداز کی چکن کڑاہی بھرپور گریوی اور تیز ذائقوں کے ساتھ۔",
      image:
        "https://therecipespk.com/wp-content/uploads/2024/07/punjabi-chicken-karahi.jpg",
      section: "general",
      category: "tikka-kabab-cutlets",
      contentType: "recipe",
      ingredients: [
        "1 kg chicken, bone-in pieces",
        "4 tomatoes, pureed",
        "2 onions, fried golden",
        "2 tbsp ginger-garlic paste",
        "1 tbsp red chili powder",
        "1 tsp turmeric powder",
        "2 tsp coriander powder",
        "1 tsp garam masala",
        "1/2 cup mustard oil",
        "Fresh green chilies",
        "Ginger julienne",
      ],
      instructions: [
        "Heat mustard oil in heavy-bottomed karahi.",
        "Add chicken and fry until well sealed.",
        "Add fried onions and ginger-garlic paste.",
        "Add tomato puree and cook until thick.",
        "Add all dry spices and mix well.",
        "Add water if needed and simmer covered.",
        "Cook for 25-30 minutes until chicken is tender.",
        "Garnish with chilies and ginger.",
      ],
      prepTime: "20 minutes",
      cookTime: "45 minutes",
      totalTime: "65 minutes",
      servings: "6-8",
      difficulty: "Medium",
      cuisine: "Pakistani",
      author: {
        name: "Punjabi Chef",
        image: "https://via.placeholder.com/60x60/FF5722/FFFFFF?text=PC",
        bio: "Traditional Punjabi cooking expert",
      },
      tags: ["chicken", "karahi", "punjabi", "rich", "traditional"],
      rating: 4.9,
      reviewCount: 234,
      views: 4560,
    },
    {
      title: "Karachi Style Chicken Karahi",
      titleinUrdu: "کراچی اسٹائل چکن کڑاہی",
      description:
        "Urban Karachi-style chicken karahi with modern twist and city flavors.",
      descriptionInUrdu:
        "شہری کراچی اسٹائل چکن کڑاہی جدید انداز اور شہری ذائقوں کے ساتھ۔",
      image:
        "https://therecipespk.com/wp-content/uploads/2024/07/karachi-chicken-karahi.jpg",
      section: "general",
      category: "tikka-kabab-cutlets",
      contentType: "recipe",
      ingredients: [
        "1 kg boneless chicken, cubed",
        "3 tomatoes, diced",
        "1 capsicum, sliced",
        "1 onion, sliced",
        "2 tbsp ginger-garlic paste",
        "1 tsp red chili powder",
        "1/2 tsp black pepper",
        "1 tsp garam masala",
        "1/4 cup cooking oil",
        "1 tsp soy sauce",
        "Fresh coriander",
      ],
      instructions: [
        "Heat oil in karahi over high flame.",
        "Add chicken cubes and stir-fry quickly.",
        "Add onions and capsicum, toss well.",
        "Add ginger-garlic paste and cook briefly.",
        "Add tomatoes and all spices.",
        "Add soy sauce for umami flavor.",
        "Cook on high heat for 10-12 minutes.",
        "Garnish and serve immediately.",
      ],
      prepTime: "15 minutes",
      cookTime: "25 minutes",
      totalTime: "40 minutes",
      servings: "4-5",
      difficulty: "Easy",
      cuisine: "Pakistani",
      author: {
        name: "Karachi Chef",
        image: "https://via.placeholder.com/60x60/607D8B/FFFFFF?text=KC",
        bio: "Modern Pakistani cuisine specialist",
      },
      tags: ["chicken", "karahi", "karachi", "quick", "modern"],
      rating: 4.4,
      reviewCount: 123,
      views: 2890,
    },
    {
      title: "White Chicken Karahi",
      titleinUrdu: "سفید چکن کڑاہی",
      description:
        "Creamy white chicken karahi without tomatoes, rich in dairy and aromatic spices.",
      descriptionInUrdu:
        "کریمی سفید چکن کڑاہی بغیر ٹماٹر کے، ڈیری اور خوشبودار مسالوں سے بھرپور۔",
      image:
        "https://therecipespk.com/wp-content/uploads/2024/07/white-chicken-karahi.jpg",
      section: "general",
      category: "tikka-kabab-cutlets",
      contentType: "recipe",
      ingredients: [
        "1 kg chicken pieces",
        "1 cup thick yogurt",
        "1/2 cup fresh cream",
        "2 onions, fried crispy",
        "2 tbsp ginger-garlic paste",
        "1 tsp white pepper",
        "1/2 tsp garam masala",
        "1/4 cup ghee",
        "Salt to taste",
        "Fresh mint leaves",
        "Almonds, sliced",
      ],
      instructions: [
        "Marinate chicken in yogurt for 1 hour.",
        "Heat ghee in karahi and fry chicken.",
        "Add crispy fried onions, crushed.",
        "Add ginger-garlic paste and white pepper.",
        "Pour in fresh cream gradually.",
        "Add remaining yogurt and simmer gently.",
        "Cook covered for 20 minutes on low heat.",
        "Garnish with mint and almonds.",
      ],
      prepTime: "70 minutes (including marination)",
      cookTime: "30 minutes",
      totalTime: "100 minutes",
      servings: "4-6",
      difficulty: "Medium",
      cuisine: "Pakistani",
      author: {
        name: "Chef Creamy",
        image: "https://via.placeholder.com/60x60/E0E0E0/000000?text=CC",
        bio: "Specialist in creamy Pakistani dishes",
      },
      tags: ["chicken", "karahi", "white", "creamy", "mild"],
      rating: 4.3,
      reviewCount: 87,
      views: 1960,
    },
    {
      title: "Afghani Chicken Karahi",
      titleinUrdu: "افغانی چکن کڑاہی",
      description:
        "Afghani-style chicken karahi with robust flavors and traditional cooking methods.",
      descriptionInUrdu:
        "افغانی انداز کی چکن کڑاہی مضبوط ذائقوں اور روایتی پکانے کے طریقوں کے ساتھ۔",
      image:
        "https://therecipespk.com/wp-content/uploads/2024/07/afghani-chicken-karahi.jpg",
      section: "general",
      category: "tikka-kabab-cutlets",
      contentType: "recipe",
      ingredients: [
        "1 kg chicken, large pieces",
        "2 large tomatoes",
        "1 onion, chopped",
        "3 tbsp ginger-garlic paste",
        "1 tbsp red chili powder",
        "1 tsp turmeric",
        "2 tsp coriander powder",
        "1 tsp dried fenugreek leaves",
        "1/2 cup mustard oil",
        "Whole spices (bay leaves, cardamom)",
        "Fresh dill (optional)",
      ],
      instructions: [
        "Heat oil with whole spices until aromatic.",
        "Add chicken pieces and brown thoroughly.",
        "Add onions and cook until soft.",
        "Add ginger-garlic paste and cook well.",
        "Add tomatoes and mash completely.",
        "Add all powdered spices and fenugreek.",
        "Cover and cook on medium heat for 30 minutes.",
        "Check seasoning and garnish with dill.",
      ],
      prepTime: "20 minutes",
      cookTime: "40 minutes",
      totalTime: "60 minutes",
      servings: "4-6",
      difficulty: "Medium",
      cuisine: "Pakistani",
      author: {
        name: "Afghani Ustad",
        image: "https://via.placeholder.com/60x60/795548/FFFFFF?text=AU",
        bio: "Master of Afghani-Pakistani fusion cuisine",
      },
      tags: ["chicken", "karahi", "afghani", "robust", "traditional"],
      rating: 4.7,
      reviewCount: 98,
      views: 2670,
    },
    // Tips and Tricks Article
    {
      title: "Tips for Removing Smell of Kaleji (Liver)",
      titleinUrdu: "کلیجی کی بو ہٹانے کے طریقے",
      description:
        "Liver (kaleji) has a particular strong smell which makes it difficult to eat. Here are two Tips for Removing Smell of Kaleji (Liver)",
      descriptionInUrdu:
        "کلیجی کی ایک خاص تیز بو ہوتی ہے جو اسے کھانا مشکل بناتی ہے۔ یہاں کلیجی کی بو ہٹانے کے دو طریقے ہیں",
      image:
        "https://therecipespk.com/wp-content/uploads/2024/07/tips-removing-smell-kaleji-liver.jpg",
      section: "tipsandtricks",
      category: "general",
      contentType: "tipsandtricks",
      content: `
        <h2>2 Tips for Removing Smell of Kaleji (Liver)</h2>
        
        <p><strong>Tip 1:</strong> Liver should be cleaned properly and washed completely with cold water; then cut liver and leave it for 30 minutes then wash it with normal water.</p>
        
        <p><strong>Tip 2:</strong> Cut out the liver and soak in cold water for 10 minutes. The liver must wait with onion.</p>
        
        <h3>Try Our Delicious Kaleji Recipes</h3>
        <p><a href="/recipe/beef-kaleji">Beef Kaleji</a> – A must try recipe!</p>
        <p><a href="/recipe/delicious-grilled-kaleji">Delicious Grilled Kaleji</a> – A fusion version</p>
        <p><a href="/recipe/kaleji-with-green-chillies">Kaleji with Green Chilies</a> – An exciting flavor</p>
        
        <h3>Also Try These Recipes</h3>
        <ul>
          <li>How To Freeze Pizza Dough</li>
          <li>Chicken Cube Mila Maida – English and Urdu Recipe</li>
          <li>How to Remove Bitterness of Bitter Gourd</li>
          <li>Home Remedy for Hand Burn</li>
          <li>How to Store the Fish</li>
          <li>How to Get Rid of Fish Smell</li>
        </ul>
      `,
      contentInUrdu: `
        <h2>کلیجی کی بو ہٹانے کے 2 طریقے</h2>
        
        <p><strong>طریقہ 1:</strong> کلیجی کو اچھی طرح صاف کریں اور ٹھنڈے پانی سے مکمل دھوئیں؛ پھر کلیجی کاٹ کر 30 منٹ کے لیے چھوڑ دیں پھر عام پانی سے دھوئیں۔</p>
        
        <p><strong>طریقہ 2:</strong> کلیجی کاٹ کر ٹھنڈے پانی میں 10 منٹ کے لیے بھگو دیں۔ کلیجی کو پیاز کے ساتھ انتظار کرنا چاہیے۔</p>
        
        <h3>ہماری مزیدار کلیجی کی ترکیبیں آزمائیں</h3>
        <p><a href="/recipe/beef-kaleji">بیف کلیجی</a> – ضرور آزمائیں!</p>
        <p><a href="/recipe/delicious-grilled-kaleji">مزیدار گرلڈ کلیجی</a> – ایک فیوژن ورژن</p>
        <p><a href="/recipe/kaleji-with-green-chillies">ہری مرچ کے ساتھ کلیجی</a> – دلچسپ ذائقہ</p>
      `,
      prepTime: "N/A",
      cookTime: "N/A",
      totalTime: "Reading time: 3 minutes",
      servings: "N/A",
      difficulty: "Easy",
      cuisine: "Pakistani",
      author: {
        name: "Chef TheRecipesPK",
        image: "https://via.placeholder.com/60x60/4CAF50/FFFFFF?text=TR",
        bio: "I'm author. Welcome to my recipe blog! I'm passionate about creating and sharing delicious, easy-to-follow recipes that anyone can make at home. From conducting classics to exciting new dishes, I aim to inspire your inner chef and make every meal a memorable one. More about The Recipes PK",
      },
      tips: [
        "Always use cold water when cleaning liver",
        "Don't skip the soaking time - it's essential for removing the strong smell",
        "Pat dry the liver after washing before cooking",
        "Cook liver on high heat initially to seal in flavors",
      ],
      tipsInUrdu: [
        "کلیجی صاف کرتے وقت ہمیشہ ٹھنڈا پانی استعمال کریں",
        "بھگونے کا وقت نہ چھوڑیں - تیز بو ہٹانے کے لیے ضروری ہے",
        "پکانے سے پہلے دھونے کے بعد کلیجی کو خشک کریں",
        "ذائقوں کو بند کرنے کے لیے ابتدا میں تیز آنچ پر پکائیں",
      ],
      rating: 4.2,
      reviewCount: 34,
      views: 1840,
      tags: ["tips", "kaleji", "liver", "cooking-tips", "smell-removal"],
      isRamadan: false,
      inEid: false,
      isFeatured: false,
    },
    // Collection Recipes - Top 8 Recipes
    {
      title: "Beef Biryani Special",
      titleinUrdu: "بیف بریانی خاص",
      description:
        "A rich and aromatic beef biryani with perfectly cooked meat and fragrant rice.",
      image:
        "https://therecipespk.com/wp-content/uploads/2024/07/beef-biryani-special.jpg",
      section: "general",
      category: "rice",
      contentType: "recipe",
      collection: "top-8-recipes",
      ingredients: [
        "1 kg beef, cut into pieces",
        "2 cups basmati rice",
        "4 tbsp cooking oil",
        "2 onions, fried golden",
        "1 tbsp ginger-garlic paste",
        "1 tsp red chili powder",
        "1/2 tsp turmeric",
        "Whole spices (bay leaves, cardamom, cinnamon)",
        "Salt to taste",
        "Fresh mint and coriander",
      ],
      instructions: [
        "Marinate beef with spices for 30 minutes",
        "Cook beef until tender",
        "Boil rice with whole spices until 70% done",
        "Layer rice and beef alternately",
        "Cook on dum for 45 minutes",
        "Garnish with fried onions and herbs",
      ],
      prepTime: "45 minutes",
      cookTime: "90 minutes",
      totalTime: "135 minutes",
      servings: "6-8",
      difficulty: "Hard",
      cuisine: "Pakistani",
      rating: 4.9,
      reviewCount: 156,
      views: 8920,
      tags: ["beef", "biryani", "rice", "special", "traditional"],
    },
    {
      title: "Chicken Seekh Kabab",
      titleinUrdu: "چکن سیخ کباب",
      description:
        "Juicy and flavorful chicken seekh kababs perfect for grilling.",
      image:
        "https://therecipespk.com/wp-content/uploads/2024/07/chicken-seekh-kabab.jpg",
      section: "general",
      category: "tikka-kabab-cutlets",
      contentType: "recipe",
      collection: "top-8-recipes",
      ingredients: [
        "1 kg ground chicken",
        "2 tbsp ginger-garlic paste",
        "1 tsp red chili powder",
        "1 tsp garam masala",
        "1 tbsp coriander powder",
        "1 large onion, finely chopped",
        "Fresh mint leaves",
        "Salt to taste",
      ],
      instructions: [
        "Mix all ingredients with ground chicken",
        "Let it marinate for 2 hours",
        "Shape mixture around skewers",
        "Grill for 15-20 minutes turning frequently",
        "Serve hot with naan and chutney",
      ],
      prepTime: "30 minutes",
      cookTime: "20 minutes",
      totalTime: "50 minutes",
      servings: "4-6",
      difficulty: "Medium",
      cuisine: "Pakistani",
      rating: 4.7,
      reviewCount: 98,
      views: 5670,
      tags: ["chicken", "kabab", "grilled", "seekh", "barbecue"],
    },
    // Best Biryani Collection
    {
      title: "Hyderabadi Chicken Biryani",
      titleinUrdu: "حیدرآبادی چکن بریانی",
      description:
        "Authentic Hyderabadi-style chicken biryani with dum cooking method.",
      image:
        "https://therecipespk.com/wp-content/uploads/2024/07/hyderabadi-chicken-biryani.jpg",
      section: "general",
      category: "rice",
      contentType: "recipe",
      collection: "best-biryani",
      ingredients: [
        "1 kg chicken pieces",
        "2 cups basmati rice",
        "1 cup yogurt",
        "2 tbsp ginger-garlic paste",
        "Saffron soaked in milk",
        "Fried onions",
        "Whole spices",
        "Fresh mint and coriander",
        "Ghee and oil",
      ],
      instructions: [
        "Marinate chicken in yogurt and spices",
        "Cook chicken until 80% done",
        "Boil rice with whole spices",
        "Layer chicken and rice",
        "Add saffron milk and fried onions",
        "Cook on dum for 1 hour",
      ],
      prepTime: "60 minutes",
      cookTime: "120 minutes",
      totalTime: "180 minutes",
      servings: "8-10",
      difficulty: "Hard",
      cuisine: "Pakistani",
      rating: 4.9,
      reviewCount: 234,
      views: 12890,
      tags: ["biryani", "hyderabadi", "chicken", "dum", "authentic"],
    },
    {
      title: "Mutton Biryani Lucknowi",
      titleinUrdu: "مٹن بریانی لکھنوی",
      description: "Rich and aromatic Lucknowi-style mutton biryani.",
      image:
        "https://therecipespk.com/wp-content/uploads/2024/07/mutton-biryani-lucknowi.jpg",
      section: "general",
      category: "rice",
      contentType: "recipe",
      collection: "best-biryani",
      ingredients: [
        "1 kg mutton pieces",
        "2 cups basmati rice",
        "1 cup thick yogurt",
        "Saffron",
        "Rose water",
        "Whole spices",
        "Fried onions",
        "Mint and coriander",
        "Ghee",
      ],
      instructions: [
        "Marinate mutton with yogurt and spices overnight",
        "Cook mutton until very tender",
        "Prepare fragrant rice",
        "Layer mutton and rice with aromatics",
        "Seal and cook on dum",
        "Rest before serving",
      ],
      prepTime: "45 minutes",
      cookTime: "150 minutes",
      totalTime: "195 minutes",
      servings: "8-10",
      difficulty: "Hard",
      cuisine: "Pakistani",
      rating: 4.8,
      reviewCount: 187,
      views: 9560,
      tags: ["biryani", "mutton", "lucknowi", "dum", "aromatic"],
    },
    // Tips and Tricks Content
    {
      title: "Essential Spice Storage Tips for Pakistani Kitchen",
      titleinUrdu: "پاکستانی کچن کے لیے مسالوں کے اسٹوریج کے ضروری ٹپس",
      description:
        "Learn how to properly store spices to maintain their flavor and potency in Pakistani cooking.",
      image:
        "https://therecipespk.com/wp-content/uploads/2024/07/spice-storage-tips.jpg",
      section: "tipsandtricks",
      contentType: "tipsandtricks",
      content: `
        <h2>Proper Spice Storage for Maximum Flavor</h2>
        
        <p>Spices are the soul of Pakistani cuisine, and proper storage is crucial for maintaining their potency and flavor. Here are expert tips to keep your spices fresh and flavorful:</p>
        
        <h3>1. Store in Airtight Containers</h3>
        <p>Always use airtight glass or stainless steel containers to prevent moisture and air from degrading your spices. Avoid plastic containers as they can absorb odors.</p>
        
        <h3>2. Keep Away from Heat and Light</h3>
        <p>Store spices in a cool, dark place away from the stove and direct sunlight. Heat and light can quickly deteriorate the essential oils in spices.</p>
        
        <h3>3. Label with Dates</h3>
        <p>Always label your spice containers with the purchase or grinding date. Whole spices last 2-3 years, while ground spices are best used within 1-2 years.</p>
        
        <h3>4. Buy Whole Spices When Possible</h3>
        <p>Whole spices retain their flavor much longer than ground ones. Invest in a good spice grinder and grind spices as needed for maximum flavor.</p>
        
        <h3>5. Test for Freshness</h3>
        <p>Check your spices regularly by smelling them. If they don't have a strong aroma, it's time to replace them.</p>
      `,
      prepTime: "N/A",
      cookTime: "N/A",
      totalTime: "Reading time: 5 minutes",
      servings: "N/A",
      difficulty: "Easy",
      cuisine: "Pakistani",
      author: {
        name: "Spice Master Ali",
        image: "https://via.placeholder.com/60x60/795548/FFFFFF?text=SA",
        bio: "Expert in spice selection and storage with 20+ years experience",
      },
      rating: 4.6,
      reviewCount: 89,
      views: 4320,
      tags: ["spices", "storage", "kitchen-tips", "freshness", "pakistani"],
    },
    {
      title: "Perfect Rice Cooking Techniques for Biryani",
      titleinUrdu: "بریانی کے لیے چاول پکانے کی بہترین تکنیکیں",
      description:
        "Master the art of cooking rice perfectly for biryani with these professional techniques.",
      image:
        "https://therecipespk.com/wp-content/uploads/2024/07/rice-cooking-tips.jpg",
      section: "tipsandtricks",
      contentType: "tipsandtricks",
      content: `
        <h2>Mastering Rice for Perfect Biryani</h2>
        
        <p>The key to exceptional biryani lies in perfectly cooked rice. Follow these professional techniques to achieve restaurant-quality results every time:</p>
        
        <h3>1. Choose the Right Rice</h3>
        <p>Use aged basmati rice (at least 1 year old) for the best results. Aged rice has less moisture and cooks to longer, separate grains.</p>
        
        <h3>2. Proper Washing Technique</h3>
        <p>Wash rice in cold water until the water runs clear. This removes excess starch and prevents the rice from becoming sticky.</p>
        
        <h3>3. Soaking is Essential</h3>
        <p>Soak basmati rice for 30-45 minutes before cooking. This helps the grains cook evenly and achieve the perfect texture.</p>
        
        <h3>4. Salt the Water Generously</h3>
        <p>The water should taste like sea water. This is when the rice absorbs salt and develops proper flavor.</p>
        
        <h3>5. Cook to 70% Done</h3>
        <p>For biryani, rice should be 70% cooked when you drain it. It will finish cooking during the dum process.</p>
        
        <h3>6. Add Whole Spices</h3>
        <p>Add bay leaves, cardamom, cinnamon, and cloves to the boiling water for aromatic rice.</p>
      `,
      prepTime: "N/A",
      cookTime: "N/A",
      totalTime: "Reading time: 4 minutes",
      servings: "N/A",
      difficulty: "Easy",
      cuisine: "Pakistani",
      author: {
        name: "Biryani Master Hassan",
        image: "https://via.placeholder.com/60x60/FF5722/FFFFFF?text=BH",
        bio: "Professional biryani chef with expertise in traditional techniques",
      },
      rating: 4.8,
      reviewCount: 145,
      views: 6780,
      tags: ["rice", "biryani", "cooking-tips", "basmati", "technique"],
    },
  ];

  await Recipe.deleteMany({});
  await Recipe.insertMany(data);
  console.log("Seeded recipes");
  await mongoose.disconnect();
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
