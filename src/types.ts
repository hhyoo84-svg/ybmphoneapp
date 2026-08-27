export type ActionStyleType = 
  | 'minimal'        // VER 1: 미니멀 아이콘
  | 'outline'        // VER 2: 소프트 라인(아웃라인)
  | 'solid_tint'     // VER 3: 채워진 솔리드 틴트 (추천)
  | 'bubble_dock'    // VER 4: 말풍선 내부 하단 독(통합형)
  | 'smart_chips';   // VER 5: 텍스트 라벨 포함 스마트 칩

export type ActionButtonStyle = ActionStyleType;

export type DisplayMode = 'always' | 'hover';
export type AccentVoice = 'en-US' | 'en-GB';

export interface VocabularyItem {
  id: string;
  word: string;
  pos: string; // 'n.' | 'v.' | 'adj.' | 'adv.' | 'idiom'
  phonetic?: string;
  meaning: string;
  exampleEn: string;
  exampleKo: string;
  imageUrl?: string;
}

export interface KeyExpressionItem {
  id: number;
  en: string;
  ko: string;
}

export interface ChoiceQuestionItem {
  id: number;
  sentence: string; // e.g. "She _____ to the gym every morning."
  options: string[]; // e.g. ["go", "goes", "going"]
  correctIndex: number;
  explanation?: string;
  ko?: string;
}

export interface QAPairItem {
  id: number;
  speakerA: string;
  speakerB: string;
  speakerAKo?: string;
  speakerBKo?: string;
}

export interface SentencePromptItem {
  id: number;
  prompt: string;
  example: string;
  placeholder: string;
  guideKo?: string;
}

export interface PatternPromptItem {
  id: number;
  description: string; // e.g. "Make your own sentence using the pattern \"used to.\""
  pattern: string; // e.g. "used to"
  example: string;
  placeholder: string;
}

export interface PictureTaskItem {
  title: string;
  prompt: string;
  imageUrl?: string;
  question: string;
  guide: string;
  tgAnswer: string;
}

export interface PhoneSurveyTaskItem {
  scenario: string;
  hiddenScript: string;
  imageUrl?: string;
  question: string;
  guide: string;
  tgAnswer: string;
}

export interface QuestionGuideItem {
  id: string;
  qNumber: string; // e.g. "Q5", "Q6", "Q7"
  questionEn: string;
  questionKo?: string;
  guideAnswerEn: string;
  guideAnswerKo?: string;
  tgAnswer?: string;
}

export interface RespondQuestionsTaskItem {
  partSubtitle: string; // "Part 3 (Q5~7) of the test"
  scenario: string; // "Imagine that you are talking to a new neighbor. You are having a telephone conversation about grocery shopping."
  scenarioKo?: string;
  questions: QuestionGuideItem[];
}

export interface DialogueSentence {
  id: string;
  speaker: 'tutor' | 'me';
  speakerName: string;
  speakerRole: 'Tutor' | 'Student';
  avatarText: string;
  avatarBg: string;
  en: string;
  ko: string;
  keyPhrases: {
    phrase: string;
    meaning: string;
    tip: string;
  }[];
  audioDurationSeconds: number;
  tgNote?: string; // Teacher's Guide note
}

export interface LessonPart {
  id: number;
  partNumber: string;
  typeNumber: number; // 1 ~ 13번 교재 타입 번호
  title: string;
  typeLabel: string; // e.g. "타입 01", "타입 02"
  koreanTitle: string;
  description: string;
  tgGuide?: string; // Teacher's Guide top note
  headerActionType?: 'translation' | 'guide' | 'none'; // 상단 버튼 타입 (해석/영문 또는 Guide/Hide)
  type: 
    | 'pronunciation_phrases' // 1번 타입: 내용 소제목 / 번호 / 영문 / 한글해석 + TTS
    | 'vocabulary_simple'     // 2번 타입: 번호 / 영문 / 한글해석 + TTS
    | 'pattern_drill_choice'  // 3번 타입: 번호 / 영문(빈칸) / 한글해석 / 보기입력
    | 'qa_pairs_unused'       // 4번 타입: 번호 / A영문 / A한글해석 / B영문 / B한글해석 (미사용 교재)
    | 'speak_blank_line'      // 5번 타입: 번호 / 빈줄 / 예문 (Speaking Tip)
    | 'talking_topic_list'    // 6번 타입: 대화문 내용 / 질문 묶음 리스트
    | 'messenger_dialogue'    // 7번 타입: 대화자 위치 / 이름 / 내용 (메신저 대화)
    | 'word_sentence_ex'      // 8번 타입: 단어 / 예문
    | 'comprehension_tip'     // 9번 타입: 보기설명 / 예문
    | 'article_reading_qa'    // 10번 타입: 본문내용 / 질문
    | 'describe_picture_guide'// 11번 타입: 단어 / 예문(사진) + 브레인스토밍 가이드
    | 'respond_questions_tos' // 12번 타입: 문제 / 질문 / 답변가이드 / 답변TG
    | 'phone_survey_table';   // 13번 타입: 문제 / 질문 / 답변가이드 / 답변TG / 숨김텍스트
  durationMinutes: number;
}

export interface CourseLessonItem {
  id: number;
  lessonNumber: string;
  title: string;
  koreanTitle: string;
  description?: string;
  partsCount: number;
}

export interface LessonData {
  lessonId: string;
  courseName: string; // e.g. "일상회화 Daily Life 초급"
  lessonNumber: string;
  title: string;
  koreanTitle: string;
  targetLevel: string;
  currentPartIndex: number;
  parts: LessonPart[];
  dialogueTurns: DialogueSentence[];
  teacherGuide: {
    lessonGoals: string[];
    warmupQuestions: string[];
    pronunciationAlerts: { word: string; note: string }[];
    expansionActivities: string[];
  };
}

