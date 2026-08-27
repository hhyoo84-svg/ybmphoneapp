import { 
  LessonData, 
  VocabularyItem, 
  KeyExpressionItem, 
  ChoiceQuestionItem, 
  QAPairItem, 
  SentencePromptItem, 
  PatternPromptItem, 
  PictureTaskItem, 
  PhoneSurveyTaskItem,
  RespondQuestionsTaskItem,
  LessonPart
} from '../types';

export const ALL_13_TYPES_DATA = {
  // TYPE 01: 내용 소제목 / 번호 / 영문 / 한글해석 + TTS
  type01: {
    subtitleGuide: "소제목과 번호에 맞추어 단어 및 문장을 원어민 음성으로 확인해보세요.",
    sections: [
      {
        sectionTitle: "/s/,/z/ + s' (/iz/) 발음 익히기",
        items: [
          { id: 1, en: "kiss", ko: "키스하다", ipa: "[kɪs]" },
          { id: 2, en: "dance", ko: "춤", ipa: "[dæns]" }
        ]
      },
      {
        sectionTitle: "Step 01 Introducing names",
        items: [
          { id: 3, en: "My name is John Matthew.", ko: "제 이름은 존 매튜입니다." },
          { id: 4, en: "My name is Sandra Lopez.", ko: "제 이름은 산드라 로페즈입니다." },
          { id: 5, en: "I am Gary Owens.", ko: "저는 게리 오웬스입니다." }
        ]
      },
      {
        sectionTitle: "Step 02 Introducing positions",
        items: [
          { id: 6, en: "I am the marketing director at Nexon.", ko: "저는 넥슨의 마케팅 디렉터입니다." }
        ]
      }
    ]
  },

  // TYPE 02: 번호 / 영문 / 한글해석 + TTS
  type02: {
    subtitleGuide: "각 번호별 문장과 어휘를 듣고 큰 소리로 따라 읽어보세요.",
    items: [
      { id: 1, en: "pleasure", ko: "기쁨, 즐거움" },
      { id: 2, en: "be raised", ko: "양육되다, 자라다" },
      { id: 3, en: "about", ko: "약, 대략" },
      { id: 4, en: "A: What is your first name?\nB: My first name is Tina.", ko: "A: 이름이 무엇인가요?\nB: 제 이름은 티나입니다." },
      { id: 5, en: "What countries have you traveled to?", ko: "어떤 나라들을 여행해보셨나요?" },
      { id: 6, en: "Where do you come from?", ko: "어디 출신이신가요?" }
    ]
  },

  // TYPE 03: 번호 / 영문(빈칸) / 한글해석 / 보기입력 (Vocabulary Tip)
  type03: {
    subtitleGuide: "Vocabulary Tip의 단어 중 알맞은 것을 골라 빈칸을 채워 말해보세요.",
    items: [
      {
        id: 1,
        subCategory: "",
        en: "Bobby ( ) tired.",
        ko: "바비는 피곤해요.",
        tip: "is / are / was / were"
      },
      {
        id: 2,
        subCategory: "",
        en: "They ( ) from Canada.",
        ko: "그들은 캐나다에서 왔어요.",
        tip: "is / are / was / were"
      },
      {
        id: 3,
        subCategory: "플랜 요청하기",
        en: "Q: What kind of plan are you looking for?\nB: I'm looking for ( ).",
        ko: "Q: 어떤 플랜을 찾으시나요?\nB: 저는 ( )을 찾고 있어요.",
        tip: "- a prepaid plan\n- a monthly plan\n- a BYOD plan"
      },
      {
        id: 4,
        subCategory: "개통 요청하기",
        en: "A: What is your first name?\nB: My first name ( ) Tina.",
        ko: "A: 이름이 무엇인가요?\nB: 제 이름은 ( ) 티나입니다.",
        tip: "am / is"
      },
      {
        id: 5,
        subCategory: "Ice Breaking Small Talk",
        en: "What was the last movie you watched, and how did you like it?",
        ko: "가장 최근에 본 영화는 무엇이었고, 어떠셨나요?",
        tip: "genre / story / impression"
      }
    ]
  },

  // TYPE 04: 번호 / A영문 / A한글해석 / B영문 / B한글해석 (*현재 사용 교재 없음)
  type04: {
    subtitleGuide: "질문자(A)와 답변자(B)가 짝을 이루는 문답 형식 연습 구조입니다.",
    pairs: [
      {
        id: 1,
        speakerA: "What time do you leave home in the morning?",
        speakerAKo: "아침에 보통 몇 시에 집을 나서시나요?",
        speakerB: "I usually leave around eight in the morning.",
        speakerBKo: "저는 보통 아침 8시쯤 나섭니다."
      },
      {
        id: 2,
        speakerA: "How do you usually commute to work?",
        speakerAKo: "회사에는 보통 어떻게 출근하시나요?",
        speakerB: "I take the subway line 2, and it takes about 30 minutes.",
        speakerBKo: "지하철 2호선을 타는데, 30분 정도 걸려요."
      },
      {
        id: 3,
        speakerA: "Do you have time for breakfast before leaving?",
        speakerAKo: "출발하기 전에 아침 식사할 시간은 있으신가요?",
        speakerB: "Not always, so I just grab an iced americano.",
        speakerBKo: "항상 그렇진 않아서, 그냥 아이스 아메리카노 한 잔 챙겨 들고 나와요."
      }
    ]
  },

  // TYPE 05: 번호 / 빈줄 / 예문 (Speak In a Sentence)
  type05: {
    subtitleGuide: "Speaking Tip을 확인하며 어순에 맞추어 직접 스피킹 해봅니다.",
    items: [
      {
        id: 1,
        tip: "a teacher. / I'm not",
        model: "I'm not a teacher.",
        ko: "저는 선생님이 아닙니다."
      },
      {
        id: 2,
        tip: "the deadline? / When is",
        model: "When is the deadline?",
        ko: "마감일이 언제인가요?"
      },
      {
        id: 3,
        tip: "your parents? / How are",
        model: "How are your parents?",
        ko: "부모님께서는 어떻게 지내시나요?"
      },
      {
        id: 4,
        tip: "on time / You are",
        model: "You are on time.",
        ko: "제시간에 맞춰 오셨네요."
      }
    ]
  },

  // TYPE 06: 대화문 내용 / 질문 리스트 묶음
  type06: {
    subtitleGuide: "주어진 질문들을 확인하고 강사님과 함께 대화를 이어가 봅니다.",
    groups: [
      {
        id: "group-1",
        title: "Talking about the topic",
        questions: [
          { num: "Q1", text: "What is the most dangerous thing in your home? How can your home be made less dangerous?", ko: "집에서 가장 위험한 것은 무엇인가요? 어떻게 덜 위험하게 만들 수 있을까요?" },
          { num: "Q2", text: "What is the most dangerous thing in your home for a child? How can it be made less dangerous?", ko: "아이에게 집에서 가장 위험한 것은 무엇인가요? 어떻게 덜 위험하게 만들 수 있을까요?" },
          { num: "Q3", text: "What is the most dangerous thing in your home for an elderly person? How can it be made less dangerous?", ko: "노인에게 집에서 가장 위험한 것은 무엇인가요? 어떻게 덜 위험하게 만들 수 있을까요?" }
        ]
      },
      {
        id: "group-2",
        title: "Talking about the Dialogue",
        questions: [
          { num: "Q1", text: "Where are Jason and Linda from?", ko: "제이슨과 린다는 어디 출신인가요?" },
          { num: "Q2", text: "Who moved to Pangyo about five years ago?", ko: "약 5년 전에 판교로 이사 온 사람은 누구인가요?" },
          { num: "Q3", text: "Why did Jason say he loved his job?", ko: "제이슨은 왜 자신의 일을 사랑한다고 말했나요?" }
        ]
      }
    ]
  },

  // TYPE 07: 메신저형 대화 (화자 이름, 아바타, 말풍선, TTS, 번역)
  type07: {
    subtitleGuide: "강사와 함께 역할을 나누어 실전 대화를 소리 내어 연습해보세요.",
    dialogue: [
      {
        id: "d-1",
        speaker: "tutor",
        speakerName: "Linda",
        avatarBg: "bg-[#EEEDFC] text-[#5D4BE2]",
        en: "How are you? My name is Linda. It's a pleasure to meet you. What's your name?",
        ko: "안녕하세요? 제 이름은 린다입니다. 만나서 반가워요. 성함이 어떻게 되시나요?",
        tgNote: "학생의 이름과 자기소개 답변을 듣고 자연스럽게 리액션해주세요."
      },
      {
        id: "d-2",
        speaker: "me",
        speakerName: "Jason",
        avatarBg: "bg-stone-100 text-stone-700",
        en: "Hello, I'm Jason Ming. Likewise, it's nice to meet you as well, Linda.",
        ko: "안녕하세요, 제이슨 밍입니다. 저도 만나서 반갑습니다, 린다 씨.",
        tgNote: "Likewise의 발음과 억양을 확인해 주세요."
      },
      {
        id: "d-3",
        speaker: "tutor",
        speakerName: "Linda",
        avatarBg: "bg-[#EEEDFC] text-[#5D4BE2]",
        en: "Where do you come from?",
        ko: "어디 출신이신가요?",
        tgNote: "학생에게 출신 지역 및 거주 기간을 추가로 질문해보세요."
      },
      {
        id: "d-4",
        speaker: "me",
        speakerName: "Jason",
        avatarBg: "bg-stone-100 text-stone-700",
        en: "I was born and raised in Beijing, China, but I also lived in Shanghai for many years. How about yourself?",
        ko: "저는 중국 베이징에서 태어나고 자랐지만, 상하이에서도 오랫동안 살았습니다. 린다 씨는 어떠신가요?",
        tgNote: "born and raised 연음 표현을 칭찬해주세요."
      }
    ]
  },

  // TYPE 08: 단어, 예문 (Make your own Sentence)
  type08: {
    subtitleGuide: "아래의 단어들을 사용하여 본인이 겪었던 사건, 혹은 생각 등에 대해 말해봅니다.",
    items: [
      {
        id: 1,
        word: "pleasure",
        exampleEn: "ex) I think friendship is both a source of pleasure and a component of good health.",
        exampleKo: "우정은 즐거움의 원천이자 건강의 한 요소라고 생각합니다."
      },
      {
        id: 2,
        word: "travel",
        exampleEn: "ex) I made the booking through a travel agent.",
        exampleKo: "여행사를 통해 예약했습니다."
      },
      {
        id: 3,
        word: "move to",
        exampleEn: "ex) I decided to pack my bag and move to New York.",
        exampleKo: "짐을 싸서 뉴욕으로 이사하기로 결심했어요."
      },
      {
        id: 4,
        word: "확정된 건가요?",
        exampleEn: "ex) Is it officially confirmed by the management team?",
        exampleKo: "오늘 이 문장은 꼭 외우세요!"
      }
    ]
  },

  // TYPE 09: 보기설명, 예문 (Comprehension Check)
  type09: {
    subtitleGuide: "위 문단의 주제와 내용에 대해 강사님 질문에 요약하여 말씀해 보세요.",
    tips: [
      {
        id: 1,
        tag: "Speaking Tip",
        instruction: "다음과 같이 시작해보면 어떨까요?",
        examples: [
          "This dialogue is about ~",
          "This paragraph is about ~"
        ]
      },
      {
        id: 2,
        tag: "Speaking Tip",
        instruction: "조금 더 이어가 보시겠어요?",
        examples: [
          "so ~ then ~ therefore ~ as a result ~"
        ]
      },
      {
        id: 3,
        tag: "Speaking Tip",
        instruction: "나의 느낌과 생각을 덧붙여 마무리해 보세요.",
        examples: [
          "Overall, I think that ~",
          "What surprised me most was that ~"
        ]
      }
    ]
  },

  // TYPE 10: 본문내용, 질문 (Article Reading 1)
  type10: {
    subtitleGuide: "뉴스 내용을 이해할 수 있도록 노력하며 소리 내어 읽어봅니다.",
    articleEn: "From big purchases to even small everyday ones, more retailers are offering shoppers options to buy now and pay later.\n\nIt's essentially a short-term loan from a third party and it allows you to break up the price into a few payments over time but buyers beware.",
    articleKo: "큰 구매부터 작은 일상 구매까지, 점점 더 많은 소매업체들이 쇼핑객에게 지금 사고 나중에 결제하는(BNPL) 옵션을 제공하고 있습니다.\n\n이는 본질적으로 제3자가 제공하는 단기 대출로, 가격을 여러 차례에 걸쳐 분할 납부할 수 있게 해주지만 구매자의 주의가 필요합니다.",
    questionEn: "How does the buy now, pay later option work?",
    questionKo: "지금 사고 나중에 결제하는 옵션은 어떻게 작동하나요?",
    modelAnswerEn: "It works as a short-term installment plan that allows customers to divide their purchase total into smaller periodic payments.",
    modelAnswerKo: "구매 총액을 더 작은 정기 분할금으로 나누어 지불할 수 있도록 하는 단기 할부 대출 방식으로 작동합니다."
  },

  // TYPE 11: 단어, 예문(이미지/가이드 - Describe a picture)
  type11: {
    subtitleGuide: "사진에 대한 Brainstorming을 진행함으로 묘사해야 할 내용을 자연스럽게 정리해봅니다.",
    imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    partSubheader: "Part 2 (Q3~4) of the test",
    sentences: [
      "① I am a student.",
      "② You are a teacher.",
      "③ She is an artist.",
      "④ I'm not happy.",
      "⑤ He isn't in the room.",
      "⑥ I'm a doctor.",
      "⑦ It's not mine.",
      "⑧ You're early.",
      "⑨ She's not from Korea.",
      "⑩ He's almost here."
    ],
    brainstorming: {
      title: "Brainstorming",
      sections: [
        {
          label: "사진소개 (Intro)",
          items: ["Where is this place?", "How many people do you see?", "What do you see in this picture?"]
        },
        {
          label: "중심소개 (Center)",
          items: ["What do you see in the middle of this picture?", "What are they doing?"]
        },
        {
          label: "주변/분위기 (Surrounding)",
          items: ["How does everyone in the picture look?", "What else do you see in the picture?"]
        }
      ]
    }
  },

  // TYPE 12: 문제, 질문, 답변가이드, 답변TG (TOEIC SPEAKING Part 3)
  type12: {
    subtitleGuide: "강사님이 읽어주시는 주제문을 듣고 그에 대한 질문에 답변해 봅니다. Guide를 참고하셔도 좋습니다.",
    partSubheader: "Part 3 (Q5~7) of the test",
    scenarioEn: "Imagine that you are talking to a new neighbor. You are having a telephone conversation about grocery shopping.",
    scenarioKo: "새 이웃과 전화로 식료품 쇼핑에 대해 이야기하고 있다고 상상해 보세요.",
    questions: [
      {
        id: "q5",
        number: "Q5",
        textEn: "When was the last time you went grocery shopping? What did you buy?",
        textKo: "마지막으로 식료품 쇼핑을 한 것은 언제였나요? 무엇을 샀나요?",
        guideEn: "A: The last time I went grocery shopping was (yesterday). I bought (pork and beef).",
        guideKo: "A: 마지막으로 장을 본 것은 (어제)였어요. (돼지고기와 소고기)를 샀습니다.",
        tgModelAnswer: "The last time I went grocery shopping was yesterday. I bought fresh pork, beef, and vegetables at the supermarket near my house."
      },
      {
        id: "q6",
        number: "Q6",
        textEn: "Would you rather cook at home or eat out at a restaurant? Why?",
        textKo: "집에서 요리하는 것과 식당에서 외식하는 것 중 어느 것을 더 선호하시나요? 이유는 무엇인가요?",
        guideEn: "A: I would rather (cook at home) because (it is healthier and saves money).",
        guideKo: "A: 저는 (집에서 요리하는 것)을 선호하는데, (더 건강하고 돈을 절약할 수 있기) 때문입니다.",
        tgModelAnswer: "I would rather cook at home because preparing my own meals is healthier and helps me manage my monthly budget."
      },
      {
        id: "q7",
        number: "Q7",
        textEn: "Do you think our neighborhood is a good place to buy groceries? Why or why not?",
        textKo: "우리 동네가 식료품을 사기에 좋은 곳이라고 생각하시나요? 왜 그런가요?",
        guideEn: "A: Yes, I think so because (there are multiple supermarkets within walking distance).",
        guideKo: "A: 네, 그렇게 생각합니다. (걸어갈 수 있는 거리에 슈퍼마켓이 여러 개 있기) 때문입니다.",
        tgModelAnswer: "Yes, definitely. There are three large supermarkets within walking distance, and they always offer fresh local produce."
      }
    ]
  },

  // TYPE 13: 문제, 질문, 답변가이드, 답변TG, 숨김텍스트 (TOEIC SPEAKING Part 4)
  type13: {
    subtitleGuide: "주어진 표를 참고하여 답변해 봅니다. Guide를 참고하셔도 좋습니다. (실제 시험에서는 주제문과 질문이 텍스트로 보여지지 않는 점을 참고하세요!)",
    partSubheader: "Part 4 (Q8~10) of the test",
    scenarioEn: "Hello, I'll be attending the workshop upcoming Monday. Can you help me with some questions I have?",
    scenarioKo: "안녕하세요, 다음 주 월요일 워크숍에 참석할 예정입니다. 궁금한 점 몇 가지만 도와주실 수 있나요?",
    tableTitle: "2026 Social Network Media Workshop",
    tableLocation: "Imperial Palace Convention Center Room B\n154 Newbury, Boston\nMonday, Feb 2",
    tableRows: [
      { time: "10:00 a.m.", details: "Registration", presenter: "-" },
      { time: "10:30 a.m.", details: "Workshop: Information-oriented Society", presenter: "Sean Clark" },
      { time: "12:30 p.m.", details: "Lunch (Buffet Room A)", presenter: "-" },
      { time: "2:00 p.m.", details: "Lecture: Smart Ways to Use Social Media", presenter: "Jez Frampton" },
      { time: "4:00 p.m.", details: "Workshop: Creative Ads Solutions", presenter: "Elizabeth Fang" },
      { time: "5:00 p.m.", details: "Lecture: 6 ways to ignite the social media content fire", presenter: "Sean Clark" }
    ],
    questions: [
      {
        id: "q8",
        number: "Q8",
        hiddenStudentText: "Q8. Listen to the question",
        actualQuestionEn: "What date is the conference and when is the first event?",
        actualQuestionKo: "컨퍼런스 날짜는 언제이며 첫 행사는 몇 시인가요?",
        guideEn: "A: The conference will be held on (date). The first event is (name of the event), and it will take place at (time).",
        guideKo: "A: 컨퍼런스는 (날짜)에 열립니다. 첫 번째 행사는 (행사명)이며 (시간)에 진행됩니다.",
        tgModelAnswer: "The conference will be held on February 2nd. The first event is registration, and it will take place at 10 a.m."
      },
      {
        id: "q9",
        number: "Q9",
        hiddenStudentText: "Q9. Listen to the question",
        actualQuestionEn: "I think the Lecture on 'Smart Ways to Use Social Media' will be held in the morning. Am I correct?",
        actualQuestionKo: "'스마트한 소셜미디어 활용법' 강의가 아침에 열린다고 들었는데, 맞나요?",
        guideEn: "A: No, actually the lecture on (title) will be held at (time) in the afternoon.",
        guideKo: "A: 아니요, 사실 (강의명) 강의는 오후 (시간)에 진행됩니다.",
        tgModelAnswer: "No, actually that lecture on 'Smart Ways to Use Social Media' will take place at 2:00 p.m. in the afternoon."
      },
      {
        id: "q10",
        number: "Q10",
        hiddenStudentText: "Q10. Listen to the question",
        actualQuestionEn: "I liked Sean Clark's lecture last year. Will there be any lectures presented by Sean?",
        actualQuestionKo: "작년에 숀 클락 강사의 강의가 참 좋았는데요. 숀이 진행하는 강의가 있나요?",
        guideEn: "A: Yes, (Name of the speaker) will have a lecture on (title) at (time).",
        guideKo: "A: 네, (강사명) 강사님께서 (시간)에 (강의명) 강의를 진행하십니다.",
        tgModelAnswer: "Yes, Sean Clark will present two sessions: 'Information-oriented Society' at 10:30 a.m. and '6 ways to ignite the social media content fire' at 5:00 p.m."
      }
    ]
  }
};

export const LESSON_01: LessonData = {
  lessonId: 'lesson-01',
  courseName: 'YBMLMS 화상영어 표준 교재 템플릿',
  lessonNumber: '교재 시안',
  title: '13가지 파트 타입 템플릿 검증 뷰어',
  koreanTitle: 'YBMLMS 교재 타입별 표준 레이아웃',
  targetLevel: '전 레벨 공통 표준안',
  currentPartIndex: 1,
  parts: [
    { 
      id: 1, 
      partNumber: 'PART 01', 
      typeNumber: 1, 
      typeLabel: '타입 01',
      title: 'Pronunciation & Reading', 
      koreanTitle: '내용 소제목 / 번호 / 영문 / 한글해석', 
      description: '소제목과 함께 상황별 문장을 원어민 음성으로 확인해 보세요.', 
      tgGuide: "Let's check the student's pronunciation of /s/ and /z/ sounds. Guide them through Step 01 and 02 clearly.",
      type: 'pronunciation_phrases', 
      durationMinutes: 2, 
      headerActionType: 'translation' 
    },
    { 
      id: 2, 
      partNumber: 'PART 02', 
      typeNumber: 2, 
      typeLabel: '타입 02',
      title: 'Vocabulary & Simple Q&A', 
      koreanTitle: '번호 / 영문 / 한글해석', 
      description: '각 번호별 문장과 어휘를 듣고 큰 소리로 따라 읽어보세요.', 
      tgGuide: "Ask the student to read each item aloud. Correct intonation and check comprehension for each word.",
      type: 'vocabulary_simple', 
      durationMinutes: 2, 
      headerActionType: 'translation' 
    },
    { 
      id: 3, 
      partNumber: 'PART 03', 
      typeNumber: 3, 
      typeLabel: '타입 03',
      title: 'Pattern Drill (Vocabulary Tip)', 
      koreanTitle: '번호 / 영문(빈칸) / 한글해석 / 보기입력', 
      description: 'Vocabulary Tip의 단어 중 알맞은 것을 골라 빈칸을 채워 말해보세요.', 
      tgGuide: "Guide the student to choose the correct options from the Vocabulary Tip. Have them speak the full sentence.",
      type: 'pattern_drill_choice', 
      durationMinutes: 3, 
      headerActionType: 'translation' 
    },
    { 
      id: 4, 
      partNumber: 'PART 04', 
      typeNumber: 4, 
      typeLabel: '타입 04',
      title: 'Q&A Warm-up (A/B Pair)', 
      koreanTitle: '번호 / A영문 / A한글 / B영문 / B한글', 
      description: '질문(A)과 답변(B)이 한 세트로 묶이는 구성으로 롤플레잉 연습합니다.', 
      tgGuide: "Switch roles between Speaker A and Speaker B. Encourage natural conversational pacing.",
      type: 'qa_pairs_unused', 
      durationMinutes: 3, 
      headerActionType: 'translation' 
    },
    { 
      id: 5, 
      partNumber: 'PART 05', 
      typeNumber: 5, 
      typeLabel: '타입 05',
      title: 'Speak In a Sentence', 
      koreanTitle: '번호 / 빈줄 / 예문 (Speaking Tip)', 
      description: 'Speaking Tip을 확인하며 어순에 맞추어 직접 스피킹 해봅니다.', 
      tgGuide: "Have the student formulate a full sentence following the prompt and Speaking Tip.",
      type: 'speak_blank_line', 
      durationMinutes: 2, 
      headerActionType: 'translation' 
    },
    { 
      id: 6, 
      partNumber: 'PART 06', 
      typeNumber: 6, 
      typeLabel: '타입 06',
      title: 'Talking About The Topic', 
      koreanTitle: '대화문 내용 / 질문 묶음 리스트', 
      description: '주어진 주제 질문들을 확인하고 강사님과 함께 자유롭게 대화를 이어가 봅니다.', 
      tgGuide: "Ask questions (1), (2), (3) sequentially. Encourage the student to elaborate on reasons and personal stories.",
      type: 'talking_topic_list', 
      durationMinutes: 4, 
      headerActionType: 'translation' 
    },
    { 
      id: 7, 
      partNumber: 'PART 07', 
      typeNumber: 7, 
      typeLabel: '타입 07',
      title: 'Dialogue Speaking (Messenger)', 
      koreanTitle: '대화자 위치 / 이름 / 내용 (메신저형)', 
      description: '강사와 함께 역할을 나누어 실전 대화를 소리 내어 연습해보세요.', 
      tgGuide: "Assign roles (Linda & Jason). Focus on conversational flow, natural tone, and key linking phrases.",
      type: 'messenger_dialogue', 
      durationMinutes: 5, 
      headerActionType: 'translation' 
    },
    { 
      id: 8, 
      partNumber: 'PART 08', 
      typeNumber: 8, 
      typeLabel: '타입 08',
      title: 'Make Your Own Sentence', 
      koreanTitle: '단어 / 예문', 
      description: '아래의 단어들을 사용하여 본인이 겪었던 사건, 혹은 생각 등에 대해 말해봅니다.', 
      tgGuide: "Have the student read the example sentence first, then create their own original sentence with the key word.",
      type: 'word_sentence_ex', 
      durationMinutes: 3, 
      headerActionType: 'translation' 
    },
    { 
      id: 9, 
      partNumber: 'PART 09', 
      typeNumber: 9, 
      typeLabel: '타입 09',
      title: 'Comprehension Check', 
      koreanTitle: '보기설명 / 예문', 
      description: '위 문단의 주제와 내용에 대해 강사님 질문에 요약하여 말씀해 보세요.', 
      tgGuide: "Use the Speaking Tips to scaffold the student's summary: starting phrase -> connector -> personal opinion.",
      type: 'comprehension_tip', 
      durationMinutes: 3, 
      headerActionType: 'translation' 
    },
    { 
      id: 10, 
      partNumber: 'PART 10', 
      typeNumber: 10, 
      typeLabel: '타입 10',
      title: 'Article Reading & Question', 
      koreanTitle: '본문 내용 / 질문 분리 카드', 
      description: '뉴스 기사 본문을 읽고 이어지는 핵심 질문에 정확히 답해 보세요.', 
      tgGuide: "Check student's reading comprehension of the article passage, then ask the highlighted question below.",
      type: 'article_reading_qa', 
      durationMinutes: 4, 
      headerActionType: 'translation' 
    },
    { 
      id: 11, 
      partNumber: 'PART 11', 
      typeNumber: 11, 
      typeLabel: '타입 11',
      title: 'Describe A Picture', 
      koreanTitle: '단어 / 예문(사진) + Brainstorming Guide', 
      description: '사진에 대한 Brainstorming 가이드를 열어 묘사할 내용을 체계적으로 정리해 봅니다.', 
      tgGuide: "Guide student to describe: 1) Place & people count, 2) Central action, 3) Atmosphere & background details.",
      type: 'describe_picture_guide', 
      durationMinutes: 3, 
      headerActionType: 'guide' 
    },
    { 
      id: 12, 
      partNumber: 'PART 12', 
      typeNumber: 12, 
      typeLabel: '타입 12',
      title: 'Respond to Questions (TOS Part 3)', 
      koreanTitle: '문제 / 질문 / 답변가이드 / 답변TG', 
      description: 'TOEIC SPEAKING Part 3 실전입니다. Guide 버튼으로 답변 가이드를 열어 확인해 보세요.', 
      tgGuide: "Read Q5, Q6, Q7 to the student with standard exam timing. Compare with Model Answers.",
      type: 'respond_questions_tos', 
      durationMinutes: 4, 
      headerActionType: 'guide' 
    },
    { 
      id: 13, 
      partNumber: 'PART 13', 
      typeNumber: 13, 
      typeLabel: '타입 13',
      title: 'Information Provided (TOS Part 4)', 
      koreanTitle: '도표 / 질문 / 답변가이드 / 답변TG / 숨김텍스트', 
      description: '도표를 참고하여 답변합니다. 학생용 화면은 실제 시험처럼 질문이 숨겨져 있습니다.', 
      tgGuide: "Teacher reads the actual question scripts to student. Student refers to the schedule table to answer.",
      type: 'phone_survey_table', 
      durationMinutes: 4, 
      headerActionType: 'guide' 
    }
  ],
  dialogueTurns: ALL_13_TYPES_DATA.type07.dialogue.map((d, i) => ({
    id: `turn-${i + 1}`,
    speaker: d.speaker as 'tutor' | 'me',
    speakerName: d.speakerName,
    speakerRole: (d.speaker === 'tutor' ? 'Tutor' : 'Student') as 'Tutor' | 'Student',
    avatarText: d.speakerName[0],
    avatarBg: d.avatarBg,
    en: d.en,
    ko: d.ko,
    keyPhrases: [],
    audioDurationSeconds: 4.0,
    tgNote: d.tgNote
  })),
  teacherGuide: {
    lessonGoals: [
      'YBMLMS 13개 교재 타입 템플릿 완벽 지원',
      '화상영어 강사(TG)와 학습자(SB) 맞춤 뷰 인터랙션 검증',
      '스피킹, 어휘, 독해, 토익스피킹 실전 유형 통일된 디자인 시스템 적용'
    ],
    warmupQuestions: [
      'Are the action buttons and translations clear?',
      'Does the TG guide show properly in each mode?'
    ],
    pronunciationAlerts: [],
    expansionActivities: []
  }
};

export const COURSE_INFO = {
  category: '전화영어 · 초급',
  koreanTitle: '일상회화',
  englishTitle: 'Daily Life',
  description: '매일 마주치는 순간을 자연스러운 영어로 말해보는\n왕초보 회화 코스예요.',
  totalLessons: 10,
};

export const COURSE_LESSONS = [
  { id: 1, lessonNumber: '01', title: 'My Morning Routine', koreanTitle: '아침 일과 말하기', partsCount: 13 },
  { id: 2, lessonNumber: '02', title: 'Ordering Coffee', koreanTitle: '카페에서 주문하기', partsCount: 13 },
  { id: 3, lessonNumber: '03', title: 'Talking About Weather', koreanTitle: '날씨 표현 익히기', partsCount: 13 },
  { id: 4, lessonNumber: '04', title: 'Weekend Plans', koreanTitle: '주말 계획 말하기', partsCount: 13 },
  { id: 5, lessonNumber: '05', title: 'At the Grocery Store', koreanTitle: '장보기 표현', partsCount: 13 },
  { id: 6, lessonNumber: '06', title: 'Making Appointments', koreanTitle: '약속 잡기', partsCount: 13 },
  { id: 7, lessonNumber: '07', title: 'Hobby and Free Time', koreanTitle: '취미와 여가 생활', partsCount: 13 },
  { id: 8, lessonNumber: '08', title: 'Asking for Directions', koreanTitle: '길 묻고 답하기', partsCount: 13 },
  { id: 9, lessonNumber: '09', title: 'At the Restaurant', koreanTitle: '식당에서 주문하고 결제하기', partsCount: 13 },
  { id: 10, lessonNumber: '10', title: 'Travel and Vacation', koreanTitle: '여행 계획과 경험 나누기', partsCount: 13 },
];

