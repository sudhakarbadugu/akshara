import type { DialogueItem } from '../../types'

export const hindiDialogues: DialogueItem[] = [
  {
    id: 'hindi-market',
    title: 'At the Market',
    scenario: 'Buying vegetables and asking prices at a local market',
    emoji: '🥬',
    lines: [
      {
        speaker: 'A',
        english: 'How much for these tomatoes?',
        native: 'इन टमाटर की कीमत कितनी है?',
        pronunciation: 'In tomato ki keemat kiti hai?'
      },
      {
        speaker: 'B',
        english: 'These are fifty rupees per kilogram.',
        native: 'ये पचास रुपए किलो हैं।',
        pronunciation: 'Ye pachaas rupeye kilo hain.'
      },
      {
        speaker: 'A',
        english: 'Can I get two kilograms please?',
        native: 'क्या मुझे दो किलो मिल सकते हैं?',
        pronunciation: 'Kya mujhe do kilo mil sakte hain?'
      },
      {
        speaker: 'B',
        english: 'Here you are. Fresh from the farm!',
        native: 'लीजिए। खेत से ताजा!',
        pronunciation: 'Leejiye. Khet se taaza!'
      },
      {
        speaker: 'A',
        english: 'Do you also have carrots?',
        native: 'क्या आपके पास गाजर भी है?',
        pronunciation: 'Kya aapke paas gaajar bhi hai?'
      },
      {
        speaker: 'B',
        english: 'Yes, right here. Forty rupees a bunch.',
        native: 'जी हाँ, यह रहा। गुच्छे के चालीस रुपए।',
        pronunciation: 'Ji haan, ye raha. Guchche ke chaalees rupeye.'
      }
    ]
  },
  {
    id: 'hindi-friend',
    title: 'Meeting a Friend',
    scenario: 'Meeting an old friend and catching up',
    emoji: '👋',
    lines: [
      {
        speaker: 'A',
        english: 'Hey! Long time no see! How are you?',
        native: 'अरे! बहुत दिनों बाद! कैसे हो?',
        pronunciation: 'Are! Bahut dino baad! Kaise ho?'
      },
      {
        speaker: 'B',
        english: 'I am very well, thank you! And you?',
        native: 'मैं बहुत अच्छी हूँ, धन्यवाद! और तुम?',
        pronunciation: 'Main bahut achchi hoon, dhanyavaad! Aur tum?'
      },
      {
        speaker: 'A',
        english: 'I am also fine. What have you been up to?',
        native: 'मैं भी ठीक हूँ। तुम क्या कर रही हो?',
        pronunciation: 'Main bhi theek hoon. Tum kya kar rahi ho?'
      },
      {
        speaker: 'B',
        english: 'I started a new job last month. It is very exciting!',
        native: 'पिछले महीने मैंने नई नौकरी शुरू की। बहुत रोमांचक है!',
        pronunciation: 'Pichhle mahine mainei nai naukri shuru ki. Bahut romantic hai!'
      },
      {
        speaker: 'A',
        english: 'That is wonderful news! Congratulations!',
        native: 'यह बढ़िया खबर है! बधाई हो!',
        pronunciation: 'Ye badhiya khabar hai! Badhai ho!'
      }
    ]
  },
  {
    id: 'hindi-restaurant',
    title: 'At the Restaurant',
    scenario: 'Ordering food and asking for recommendations',
    emoji: '🍽️',
    lines: [
      {
        speaker: 'A',
        english: 'Excuse me, I would like to order something.',
        native: 'माफ़ कीजिए, मैं कुछ ऑर्डर करना चाहूँगी।',
        pronunciation: 'Maaf keejiye, main kuchh order karna chaahoonggi.'
      },
      {
        speaker: 'B',
        english: 'What would you like? Here is the menu.',
        native: 'आप क्या लेना चाहेंगी? यह मेन्यू।',
        pronunciation: 'Aap kya lena chahenggi? Yeh menu.'
      },
      {
        speaker: 'A',
        english: 'What do you recommend?',
        native: 'आप क्या सुझाती हैं?',
        pronunciation: 'Aap kya sujhaati hain?'
      },
      {
        speaker: 'B',
        english: 'The paneer dish is very tasty today. You should try it!',
        native: 'आज पनीर बहुत स्वादिष्ट है। आपको ज़रूर चाहिए!',
        pronunciation: 'Aaj paneer bahut swadisht hai. Aapko zaroor chahiye!'
      },
      {
        speaker: 'A',
        english: 'Alright, I will have the paneer dish and a lassi.',
        native: 'ठीक है, मुझे पनीर और एक लस्सी चाहिए।',
        pronunciation: 'Theek hai, mujhe paneer aur ek lassi chahiye.'
      },
      {
        speaker: 'B',
        english: 'Sure! That will be three hundred rupees.',
        native: 'ज़रूर! कुल तीन सौ रुपए होंगे।',
        pronunciation: 'Zaroor! Kul teen sau rupeye honge.'
      }
    ]
  },
  {
    id: 'hindi-doctor',
    title: 'At the Doctor',
    scenario: 'Visiting a doctor and describing symptoms',
    emoji: '🏥',
    lines: [
      {
        speaker: 'A',
        english: 'Good morning doctor. I have been feeling unwell.',
        native: 'सुप्रभात डॉक्टर। मुझे बीमार लग रहा है।',
        pronunciation: 'Suprabhaat doctor. Mujhe beemar lag raha hai.'
      },
      {
        speaker: 'B',
        english: 'Good morning. What symptoms are you experiencing?',
        native: 'सुप्रभात। आपको क्या तकलीफ है?',
        pronunciation: 'Suprabhaat. Aapko kya takaleef hai?'
      },
      {
        speaker: 'A',
        english: 'I have a headache and fever since yesterday.',
        native: 'कल से सिरदर्द और बुखार है।',
        pronunciation: 'Kal se sirdard aur buqhaar hai.'
      },
      {
        speaker: 'B',
        english: 'Let me check your temperature. Please open your mouth.',
        native: 'मैं तापमान देखता हूँ। कृपया मुँह खोलिए।',
        pronunciation: 'Main taamaan dekhta hoon. Kritpaa munh kholiye.'
      },
      {
        speaker: 'A',
        english: 'Should I take any medicine?',
        native: 'क्या मुझे कोई दवा लेनी चाहिए?',
        pronunciation: 'Kya mujhe koi dawa lenee chahiye?'
      },
      {
        speaker: 'B',
        english: 'Rest well, drink plenty of water, and take this medicine twice a day.',
        native: 'अच्छी तरह आराम कीजिए, बहुत पानी पीजिए, और यह दवा दिन में दो बार लीजिए।',
        pronunciation: 'Achchi tarah aaraam keejiye, bahut paani peejie, aur yeh dawa din mein do baar leejie.'
      }
    ]
  },
  {
    id: 'hindi-directions',
    title: 'Asking for Directions',
    scenario: 'Getting directions to a nearby location',
    emoji: '🗺️',
    lines: [
      {
        speaker: 'A',
        english: 'Excuse me, how do I get to the railway station?',
        native: 'माफ़ कीजिए, रेलवे स्टेशन कैसे जाऊँ?',
        pronunciation: 'Maaf keejiye, railway station kaise jaaoon?'
      },
      {
        speaker: 'B',
        english: 'Go straight and turn right at the traffic light.',
        native: 'सीधे जाइए और ट्रैफिक लाइट पर दाएँ मुड़ जाइए।',
        pronunciation: 'Seede jaaie aur traffic light par daaen mud jaaie.'
      },
      {
        speaker: 'A',
        english: 'Is it far from here?',
        native: 'क्या यहाँ से दूर है?',
        pronunciation: 'Kya yahan se door hai?'
      },
      {
        speaker: 'B',
        english: 'No, it is just ten minutes by foot.',
        native: 'नहीं, पैदल दस मिनट ही है।',
        pronunciation: 'Nahin, paidal das minute hi hai.'
      },
      {
        speaker: 'A',
        english: 'Thank you very much!',
        native: 'बहुत-बहुत धन्यवाद!',
        pronunciation: 'Bahut-bahut dhanyavaad!'
      },
      {
        speaker: 'B',
        english: 'You are welcome!',
        native: 'कोई बात नहीं!',
        pronunciation: 'Koi baat nahin!'
      }
    ]
  }
]

export default hindiDialogues