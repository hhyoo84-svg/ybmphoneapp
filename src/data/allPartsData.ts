// Full 14-parts mock data directly adapted from the user's uploaded Figma screenshots
export interface PartContentData {
  id: number;
  partNumber: string;
  title: string;
  koreanSubtitle: string;
  bannerDescription: string;
  type: string;
  items?: any[];
  readingPassage?: {
    en: string;
    ko: string;
  };
  surveyIntro?: {
    promptEn: string;
    promptKo: string;
    speakerEn: string;
    speakerKo: string;
    questionEn: string;
    questionKo: string;
    guide: string;
    modelAnswerEn: string;
    modelAnswerKo: string;
  };
}

export const ALL_PARTS_CONTENT: Record<number, PartContentData> = {
  // PART 01: Warm-up
  1: {
    id: 1,
    partNumber: 'PART 01',
    title: 'Warm-up',
    koreanSubtitle: '워밍업 질문',
    bannerDescription: '오늘의 주제를 읽어보며 수업을 시작해 보세요.',
    type: 'passage_intro',
    items: [
      {
        en: 'How do you start your day? Some people jump out of bed as soon as the alarm rings, while others need a few more minutes under the covers. Today, let\'s talk about your morning routine.',
        ko: '하루를 어떻게 시작하시나요? 어떤 사람들은 알람이 울리자마자 침대에서 벌떡 일어나고, 또 어떤 사람들은 이불 속에서 몇 분 더 시간이 필요하죠. 오늘은 여러분의 아침 일과에 대해 이야기해 봅시다.'
      }
    ]
  },

  // PART 02: Vocabulary
  2: {
    id: 2,
    partNumber: 'PART 02',
    title: 'Vocabulary',
    koreanSubtitle: '핵심 어휘',
    bannerDescription: '오늘 수업에서 사용할 핵심 단어를 익혀보세요.',
    type: 'word_list',
    items: [
      {
        word: 'routine',
        pos: 'n.',
        meaning: '(정해진) 일과, 루틴',
        exampleEn: 'My weekend routine is very different from my weekday one.',
        exampleKo: '주말 일과는 평일과 아주 달라요.'
      },
      {
        word: 'alarm',
        pos: 'n.',
        meaning: '알람, 자명종',
        exampleEn: 'I set two alarms, just in case.',
        exampleKo: '혹시 몰라서 알람을 두 개 맞춰 둬요.'
      },
      {
        word: 'commute',
        pos: 'v.',
        meaning: '통근하다',
        exampleEn: 'It takes me an hour to commute to work.',
        exampleKo: '출근하는 데 한 시간이 걸려요.'
      },
      {
        word: 'skip',
        pos: 'v.',
        meaning: '거르다, 건너뛰다',
        exampleEn: 'I sometimes skip breakfast when I\'m in a hurry.',
        exampleKo: '바쁠 때는 가끔 아침을 걸러요.'
      },
      {
        word: 'refreshed',
        pos: 'adj.',
        meaning: '개운한, 상쾌한',
        exampleEn: 'A cold shower makes me feel refreshed.',
        exampleKo: '차가운 물로 샤워하면 개운해져요.'
      }
    ]
  },

  // PART 03: Key Expressions
  3: {
    id: 3,
    partNumber: 'PART 03',
    title: 'Key Expressions',
    koreanSubtitle: '핵심 표현',
    bannerDescription: '오늘의 핵심 표현입니다. 소리 내어 따라 읽어보세요.',
    type: 'numline_list',
    items: [
      {
        num: 1,
        en: "I'm not a morning person at all.",
        ko: '저는 아침형 인간이 전혀 아니에요.'
      },
      {
        num: 2,
        en: 'I hit the snooze button at least three times.',
        ko: '알람 스누즈 버튼을 적어도 세 번은 눌러요.'
      },
      {
        num: 3,
        en: 'I grab a quick breakfast on my way out.',
        ko: '나가는 길에 간단히 아침을 챙겨 먹어요.'
      },
      {
        num: 4,
        en: "Once I have my coffee, I'm ready to go.",
        ko: '커피를 한 잔 마시고 나면 갈 준비가 완료돼요.'
      }
    ]
  },

  // PART 04: Main Dialogue (Handled in main view)
  4: {
    id: 4,
    partNumber: 'PART 04',
    title: 'Main Dialogue',
    koreanSubtitle: '메인 대화',
    bannerDescription: '강사와 함께 오늘의 대화를 읽어보세요.',
    type: 'dialogue'
  },

  // PART 05: Talk About You
  5: {
    id: 5,
    partNumber: 'PART 05',
    title: 'Talk About You',
    koreanSubtitle: '나의 이야기',
    bannerDescription: '오늘 배운 표현으로 나의 이야기를 해보세요.',
    type: 'numline_list',
    items: [
      {
        num: 1,
        en: 'What time do you usually wake up on weekdays?',
        ko: '평일에는 보통 몇 시에 일어나시나요?'
      },
      {
        num: 2,
        en: 'What is the first thing you do after you get up?',
        ko: '일어나서 가장 먼저 하는 일은 무엇인가요?'
      },
      {
        num: 3,
        en: 'If you had one extra hour every morning, how would you use it?',
        ko: '매일 아침 1시간의 여유 시간이 더 주어진다면 어떻게 쓰시겠어요?'
      }
    ]
  },

  // PART 06: Morning Phrases
  6: {
    id: 6,
    partNumber: 'PART 06',
    title: 'Morning Phrases',
    koreanSubtitle: '상황별 표현',
    bannerDescription: '상황별로 묶인 표현들을 소제목과 함께 확인해 보세요.',
    type: 'numline_list',
    items: [
      {
        num: 1,
        en: 'I usually hit snooze once before I actually get up.',
        ko: '실제로 일어나기 전에 보통 스누즈를 한 번 눌러요.'
      },
      {
        num: 2,
        en: 'The first thing I do is open the curtains.',
        ko: '가장 먼저 하는 일은 커튼을 여는 거예요.'
      },
      {
        num: 3,
        en: 'I get dressed while my coffee is brewing.',
        ko: '커피가 내려지는 동안 옷을 입어요.'
      },
      {
        num: 4,
        en: 'I try to leave the house by eight sharp.',
        ko: '8시 정각까지는 집을 나서려고 노력해요.'
      }
    ]
  },

  // PART 07: Choose & Complete
  7: {
    id: 7,
    partNumber: 'PART 07',
    title: 'Choose & Complete',
    koreanSubtitle: '빈칸 선택 완성',
    bannerDescription: '문장 속 빈칸에 알맞은 보기를 선택해 보세요.',
    type: 'choice_quiz',
    items: [
      {
        num: 1,
        sentence: 'She _____ to the gym every morning.',
        options: ['go', 'goes', 'going'],
        correctIndex: 1,
        meaning: '그녀는 매일 아침 헬스장에 간다.'
      },
      {
        num: 2,
        sentence: "I haven't had breakfast _____ Monday.",
        options: ['for', 'since', 'from'],
        correctIndex: 1,
        meaning: '나는 월요일 이후로 아침을 먹지 못했다.'
      }
    ]
  },

  // PART 08: Q&A Warm-up
  8: {
    id: 8,
    partNumber: 'PART 08',
    title: 'Q&A Warm-up',
    koreanSubtitle: '질의응답 훈련',
    bannerDescription: '질문(A)과 답변(B)이 한 세트로 묶이는 구성입니다.',
    type: 'qa_pairs',
    items: [
      {
        q: 'What time do you leave home?',
        qKo: '몇 시에 집에서 나오시나요?',
        a: 'I usually leave around eight.',
        aKo: '보통 8시쯤에 출발해요.'
      },
      {
        q: 'How do you usually get to work?',
        qKo: '출근은 보통 어떻게 하시나요?',
        a: "I take the subway, it's about 30 minutes.",
        aKo: '지하철을 타요. 30분 정도 걸려요.'
      }
    ]
  },

  // PART 09: My Morning Sentence
  9: {
    id: 9,
    partNumber: 'PART 09',
    title: 'My Morning Sentence',
    koreanSubtitle: '나만의 문장',
    bannerDescription: '예문을 참고해 나의 아침 일과를 직접 문장으로 만들어 보세요.',
    type: 'sentence_input_prompt',
    items: [
      {
        num: 1,
        prompt: 'Tell me about your morning. _____',
        example: 'I usually wake up at 7 and make coffee first.',
        exampleKo: '예문: 보통 7시에 일어나서 커피부터 내려요.',
        placeholder: '나의 문장을 만들어 입력해 보세요'
      },
      {
        num: 2,
        prompt: "What's different on weekends? _____",
        example: 'On weekends, I sleep in until 10.',
        exampleKo: '예문: 주말에는 10시까지 늦잠을 자요.',
        placeholder: '나의 문장을 만들어 입력해 보세요'
      }
    ]
  },

  // PART 10: Pattern Practice
  10: {
    id: 10,
    partNumber: 'PART 10',
    title: 'Pattern Practice',
    koreanSubtitle: '패턴 연습',
    bannerDescription: '보기설명과 예문을 참고해 나만의 문장을 입력해 보세요.',
    type: 'pattern_input_practice',
    items: [
      {
        guideLabel: '보기설명',
        patternGoal: 'Make your own sentence using the pattern "used to."',
        example: 'I used to skip breakfast every day.',
        exampleKo: '예문: 전에는 매일 아침을 거르곤 했어요.',
        placeholder: "'used to'를 활용해 문장을 입력해 보세요"
      },
      {
        guideLabel: '보기설명',
        patternGoal: 'Describe your habit using "every time."',
        example: 'Every time I check my phone in bed, I wake up late.',
        exampleKo: '예문: 침대에서 폰을 볼 때마다 늦게 일어나요.',
        placeholder: "'every time'을 활용해 문장을 입력해 보세요"
      }
    ]
  },

  // PART 11: Reading: Minji's Morning
  11: {
    id: 11,
    partNumber: 'PART 11',
    title: "Reading: Minji's Morning",
    koreanSubtitle: '지문 읽기',
    bannerDescription: '읽기 본문을 읽고 이어지는 질문에 답해 보세요.',
    type: 'passage_intro',
    items: [
      {
        en: 'Minji starts her day at six. She checks her schedule over a cup of tea, then takes a short walk before work. She says this quiet hour keeps her focused for the rest of the day.',
        ko: '민지는 6시에 하루를 시작합니다. 그녀는 차 한 잔을 마시며 일정을 확인하고, 출근 전 가벼운 산책을 합니다. 그녀는 이 조용한 한 시간이 하루 종일 집중력을 유지해 준다고 말합니다.'
      }
    ]
  },

  // PART 12: Morning Objects
  12: {
    id: 12,
    partNumber: 'PART 12',
    title: 'Morning Objects',
    koreanSubtitle: '사물 어휘 연상',
    bannerDescription: '등록된 이미지와 함께 단어와 예문을 익혀보세요.',
    type: 'word_with_image',
    items: [
      {
        word: 'routine',
        pos: 'n.',
        meaning: '(정해진) 일과, 루틴',
        exampleEn: 'My weekend routine is very different from my weekday one.',
        exampleKo: '주말 일과는 평일과 아주 달라요.',
        imagePlaceholder: '등록된 이미지 노출 영역'
      },
      {
        word: 'toast',
        pos: 'n.',
        meaning: '토스트',
        exampleEn: 'I usually have toast and coffee for breakfast.',
        exampleKo: '저는 보통 아침으로 토스트와 커피를 먹어요.',
        imagePlaceholder: '등록된 이미지 노출 영역'
      }
    ]
  },

  // PART 13: Describe the Picture
  13: {
    id: 13,
    partNumber: 'PART 13',
    title: 'Describe the Picture',
    koreanSubtitle: '그림 묘사하기',
    bannerDescription: '답변 가이드 포함, 답변TG는 강사 화면 전용이에요.',
    type: 'picture_qa',
    items: [
      {
        sectionLabel: 'Describe the Picture',
        instruction: 'Look at the picture and describe what you see.',
        imagePlaceholder: '등록된 이미지 노출 영역',
        questionLabel: '질문',
        question: 'What is the person doing, and what time of day do you think it is?',
        guideLabel: '답변 가이드',
        guideText: '인물 → 행동 → 시간대 순서로 묘사해 보세요. "I can see...", "It looks like..." 패턴을 활용하면 좋아요.',
        tgLabel: '답변 TG · 강사 전용',
        tgAnswer: 'Model answer: I can see a woman making coffee in her kitchen. It looks like early morning, since the sky outside is still dim.'
      }
    ]
  },

  // PART 14: Phone Survey
  14: {
    id: 14,
    partNumber: 'PART 14',
    title: 'Phone Survey',
    koreanSubtitle: '전화 롤플레잉 서베이',
    bannerDescription: '숨김 텍스트는 기본 접힘 상태로, 필요할 때 펼쳐 확인합니다.',
    type: 'phone_survey',
    surveyIntro: {
      promptEn: 'Imagine you are talking on the phone with a market research company about your morning habits.',
      promptKo: '시장 조사 기관과 아침 습관에 대해 전화로 이야기하고 있다고 상상해 보세요.',
      speakerEn: 'Hi, this is Alex from Daily Survey. May I ask you a few questions about how you spend your mornings?',
      speakerKo: '안녕하세요, Daily Survey의 알렉스입니다. 아침 시간을 어떻게 보내시는지 몇 가지 여쭤봐도 될까요?',
      questionEn: 'How do you usually get the news in the morning?',
      questionKo: '아침에 뉴스는 보통 어떻게 접하시나요?',
      guide: '수단(폰/TV/라디오) → 시점 → 이유 순서로 답해 보세요.',
      modelAnswerEn: "Model answer: I usually check the news on my phone while having breakfast, because it's the fastest way to catch up.",
      modelAnswerKo: '모범 답변: 가장 빠르게 소식을 접할 수 있어서 보통 아침 식사를 하면서 폰으로 뉴스를 확인해요.'
    }
  }
};
