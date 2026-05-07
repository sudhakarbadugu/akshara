import type { DialogueItem } from '../../types'

export const tamilDialogues: DialogueItem[] = [
  {
    id: 'tamil-market',
    title: 'At the Market',
    scenario: 'Buying vegetables and asking prices at a local market',
    emoji: '🥬',
    lines: [
      {
        speaker: 'A',
        english: 'How much for these tomatoes?',
        native: 'இந்த தக்காளியின் விலை என்ன?',
        pronunciation: 'Intha thakkaaliyin vilai enna?'
      },
      {
        speaker: 'B',
        english: 'These are fifty rupees per kilogram.',
        native: 'இவை கிலோவுக்கு ஐம்பது ரூபாய்.',
        pronunciation: 'Ivaikilo-vukku aimbathu roobaay'
      },
      {
        speaker: 'A',
        english: 'Can I get two kilograms please?',
        native: 'இரண்டு கிலோ எனக்கு கொடுக்க முடியுமா?',
        pronunciation: 'Irandu kilo enakku kodukka mudiyamaa?'
      },
      {
        speaker: 'B',
        english: 'Here you are. Fresh from the farm!',
        native: 'இதோ உங்களுக்கு. பச்சதையில் இருந்து வந்தது!',
        pronunciation: 'Idho ungalukku. Pachathaiyil irundhu vandhu!'
      },
      {
        speaker: 'A',
        english: 'Do you also have carrots?',
        native: 'நீங்கள் கேரட் மாடுவீர்களா?',
        pronunciation: 'Neengal carrot maaduveergalaa?'
      },
      {
        speaker: 'B',
        english: 'Yes, right here. Forty rupees a bunch.',
        native: 'ஆமாம், இதோ இங்கே. கட்டுக்கு நாற்பது ரூபாய்.',
        pronunciation: 'Aamam, idho inge. Kattukku naarpu roobaay'
      }
    ]
  },
  {
    id: 'tamil-friend',
    title: 'Meeting a Friend',
    scenario: 'Meeting an old friend and catching up',
    emoji: '👋',
    lines: [
      {
        speaker: 'A',
        english: 'Hey! Long time no see! How are you?',
        native: 'ஏய்! நீண்ட நேரம் காணவில்லை! நீ எப்படி இருக்கிறாய்?',
        pronunciation: 'Aey! Needra naeram kaanavilai! Nee epadi irukkiraay?'
      },
      {
        speaker: 'B',
        english: 'I am very well, thank you! And you?',
        native: 'நான் மிகவும் நன்றி, நன்றி! மற்றும் நீ?',
        pronunciation: 'Naan mikavum nandri! Mattrom nee?'
      },
      {
        speaker: 'A',
        english: 'I am also fine. What have you been up to?',
        native: 'நானும் சரி. நீங்கள் என்ன செய்து கொண்டிருக்கிறீர்கள்?',
        pronunciation: 'Naanum sari. Neengal enna seidhu kontirukkireergal?'
      },
      {
        speaker: 'B',
        english: 'I started a new job last month. It is very exciting!',
        native: 'கடந்த மாதம் புதிய வேலையை தொடங்கினேன். மிகவும் உற்சாகமாக இருக்கிறது!',
        pronunciation: 'Kadhantha maatham puthiya vellaiyai todanginen. Mikavum urchaagamaha irukkirkku!'
      },
      {
        speaker: 'A',
        english: 'That is wonderful news! Congratulations!',
        native: 'அற்புதமான செய்தி! வாழ்த்துக்கள்!',
        pronunciation: 'Arputhamana seithi! Vaazhthukkal!'
      }
    ]
  },
  {
    id: 'tamil-restaurant',
    title: 'At the Restaurant',
    scenario: 'Ordering food and asking for recommendations',
    emoji: '🍽️',
    lines: [
      {
        speaker: 'A',
        english: 'Excuse me, I would like to order something.',
        native: 'மன்னிக்கவும், நான் ஏதாவது ஒன்றை ஆர்டர் செய்ய விரும்புகிறேன்.',
        pronunciation: 'Mannikkavum, naan aethaavathu ondrai order seiya virumbugiren.'
      },
      {
        speaker: 'B',
        english: 'What would you like? Here is the menu.',
        native: 'நீங்கள் என்ன விரும்புகிறீர்கள்? இதோ மெனு.',
        pronunciation: 'Neengal enna virumbukireergal? Idho menu.'
      },
      {
        speaker: 'A',
        english: 'What do you recommend?',
        native: 'நீங்கள் என்ன பரிந்துரைக்கிறீர்கள்?',
        pronunciation: 'Neengal enna parindhuraikireergal?'
      },
      {
        speaker: 'B',
        english: 'The dosai is very tasty today. You should try it!',
        native: 'இன்று தோசை மிகவும் சுவையானது. நீங்கள் அதை முயற்சிக்க வேண்டும்!',
        pronunciation: 'Indru dosai mikavum suvaiyanathu. Neengal athai muyarchi vaendum!'
      },
      {
        speaker: 'A',
        english: 'Alright, I will have one dosai and a coffee.',
        native: 'சரி, ஒரு தோசை ஒன்றும் ஒரு குடிநீரும் வேண்டும்.',
        pronunciation: 'Sari, oru dosai ondrum oru kudineerum vaendum.'
      },
      {
        speaker: 'B',
        english: 'Sure! That will be ninety rupees.',
        native: 'நிச்சயம்! அதை ஒன்பது ரூபாய்.',
        pronunciation: 'Nitchayam! Athai onpathu roobaay.'
      }
    ]
  },
  {
    id: 'tamil-doctor',
    title: 'At the Doctor',
    scenario: 'Visiting a doctor and describing symptoms',
    emoji: '🏥',
    lines: [
      {
        speaker: 'A',
        english: 'Good morning doctor. I have been feeling unwell.',
        native: 'காலை வணக்கம் டாக்டர். நான் உடல் நலமாக இல்லை.',
        pronunciation: 'Kaalai vanakkam doctor. Naan udal nalamaka illai.'
      },
      {
        speaker: 'B',
        english: 'Good morning. What symptoms are you experiencing?',
        native: 'காலை வணக்கம். நீங்கள் என்ன அறிகுறிகளை அனுபவிக்கிறீர்கள்?',
        pronunciation: 'Kaalai vanakkam. Neengal enna arigurigalai anubavikkireergal?'
      },
      {
        speaker: 'A',
        english: 'I have a headache and fever since yesterday.',
        native: 'நேற்று முதல் தலைவலி மற்றும் காய்ச்சல் உள்ளது.',
        pronunciation: 'Netru mudhal thalai vali mattrom kaaichchal uundathu.'
      },
      {
        speaker: 'B',
        english: 'Let me check your temperature. Please open your mouth.',
        native: 'உங்கள் காய்ச்சலை பரிசோதிக்க விடுங்கள். தயவுசெய்து வாயை திறக்கவும்.',
        pronunciation: 'Ungal kaaichchalai parisodhikka vidunggal. Thayavuseidhu vaai thidakavum.'
      },
      {
        speaker: 'A',
        english: 'Should I take any medicine?',
        native: 'நான் ஏதாவது மருந்து எடுக்க வேண்டுமா?',
        pronunciation: 'Naan aethaavathu marunthu edukka vaendum aa?'
      },
      {
        speaker: 'B',
        english: 'Rest well, drink plenty of water, and take this medicine twice a day.',
        native: 'நன்றாக ஓய்வு எடுத்துக் கொள்ளுங்கள், நிறைய தண்ணீர் குடியுங்கள், இந்த மருந்தை நாளை இரண்டு முறை எடுத்துக் கொள்ளுங்கள்.',
        pronunciation: 'Nandraagha oyvu eduthikkolunggal, niraay thanneer kudiyungal, intha marunthai naal irandu murai eduthikkolungal.'
      }
    ]
  },
  {
    id: 'tamil-directions',
    title: 'Asking for Directions',
    scenario: 'Getting directions to a nearby location',
    emoji: '🗺️',
    lines: [
      {
        speaker: 'A',
        english: 'Excuse me, how do I get to the railway station?',
        native: 'மன்னிக்கவும், ரயில் நிலையத்தை எப்படி அடைவது?',
        pronunciation: 'Mannikkavum, rail nilaayam ethai epadi adavathu?'
      },
      {
        speaker: 'B',
        english: 'Go straight and turn right at the traffic light.',
        native: 'நேராக செல்லுங்கள், ட்ராஃபிக் லைட்டில் வலக்குப் பக்கம் திரும்புங்கள்.',
        pronunciation: 'Neraagha sellungal, traffic light-il valakkup pakam thirumbungal.'
      },
      {
        speaker: 'A',
        english: 'Is it far from here?',
        native: 'இங்கிருந்து தூரமாக இருக்கிறதா?',
        pronunciation: 'Ingirundhu thooramaha irukkiradhaa?'
      },
      {
        speaker: 'B',
        english: 'No, it is just ten minutes by foot.',
        native: 'இல்லை, நடந்து போனால் பத்து நிமிடம் தான்.',
        pronunciation: 'Illai, nadhandhu ponaal pathu nimidam dhaan.'
      },
      {
        speaker: 'A',
        english: 'Thank you very much!',
        native: 'மிகவும் நன்றி!',
        pronunciation: 'Mikavum nandri!'
      },
      {
        speaker: 'B',
        english: 'You are welcome!',
        native: 'வரையறுக்கப் படாத!',
        pronunciation: 'Varaiyarruka patatha!'
      }
    ]
  }
]

export default tamilDialogues