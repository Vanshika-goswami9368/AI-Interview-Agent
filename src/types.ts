export interface CandidateProject {
  name: string;
  description: string;
  role?: string;
  technologies?: string[];
}

export interface CandidateExperience {
  company: string;
  role: string;
  duration?: string;
  highlights?: string[];
}

export interface CandidateMember {
  id: string;
  name: string;
  jobRole: string;
  yearsExperience: number;
  education: string;
  status: string;
  skills?: string[];
  technologies?: string[];
  programmingLanguages?: string[];
  projects?: CandidateProject[];
  experience?: CandidateExperience[];
  internships?: string[];
  certifications?: string[];
}

export interface CandidateMission {
  day: number;
  title: string;
  passed?: boolean;
  attempts?: number;
  skipped?: boolean;
}

export interface CandidateSignals {
  commitDays: number;
  missionsCompleted: number;
  missionsFirstTry: number;
}

export interface Candidate {
  member: CandidateMember;
  missions: CandidateMission[];
  signals: CandidateSignals;
}

export interface CurriculumModule {
  n: number;
  title: string;
  days: number[];
}

export interface CurriculumDay {
  day: number;
  title: string;
  type: string;
  tools: string[];
  objectives: string[];
}

export interface Curriculum {
  cohort: string;
  modules: CurriculumModule[];
  days: CurriculumDay[];
}

export interface ChatMessage {
  id: string;
  sender: 'ai' | 'candidate' | 'system';
  text: string;
  timestamp: string;
  topic?: string;
  curriculumDay?: number;
  isFollowUp?: boolean;
  isClarification?: boolean;
}

export interface FinalFeedback {
  summary: string;
  strengths: string[];
  gaps: string[];
  next: string[];
  overallScore?: number;
  competencies?: {
    technicalUnderstanding: number;
    problemSolving: number;
    engineeringDecision: number;
    communication: number;
  };
  breakdown?: {
    correctCount: number;
    partiallyCorrectCount: number;
    incorrectCount: number;
    skippedCount: number;
    irrelevantCount: number;
    questionEvaluations: QuestionEvaluationDetail[];
  };
}

export interface QuestionEvaluationDetail {
  questionNumber: number;
  questionText: string;
  candidateAnswer: string;
  classification: 'correct' | 'partially_correct' | 'incorrect' | 'skipped' | 'irrelevant';
  score: number;
  topic?: string;
  feedbackNote: string;
}

export interface QuestionMemoryItem {
  id: string;
  questionNumber: number;
  question: string;
  topic?: string;
  curriculumDay?: number;
  difficulty?: string;
  candidateAnswer?: string;
  score?: number; // 0-10 rating scale
  status?: 'correct' | 'mostly_correct' | 'minor_mistake' | 'partially_correct' | 'incorrect' | 'confused' | 'clarification_requested' | 'off_topic' | 'skipped' | 'irrelevant';
  reason?: string; // Short evaluation/reason for the given score
  conceptsDemonstrated?: string[];
  conceptsMissingOrFlawed?: string[];
  timestamp?: number;
}

export interface EvaluationStep {
  turnNumber: number;
  answerStatus: 'strong' | 'partial' | 'incorrect' | 'confused' | 'off_topic' | 'skipped' | 'irrelevant';
  isClarificationRequest: boolean;
  isOffTopic: boolean;
  isAnswered: boolean;
  conceptsUnderstood: string[];
  conceptsMissing: string[];
  feedbackComment: string;
}

export interface ActiveQuestion {
  text: string;
  topic: string;
  curriculumDay?: number;
  difficulty?: 'easy' | 'medium' | 'hard' | 'adaptive';
}

export interface SelectedDayPlan {
  day: number;
  title: string;
  type?: string;
  tools?: string[];
  objectives: string[];
}

export interface InterviewSession {
  sessionId: string;
  candidate: Candidate;
  conversationHistory: { role: 'interviewer' | 'candidate'; text: string; dayCovered?: number; topic?: string }[];
  questionsAsked: number;
  daysCovered: number[];
  topicsCovered: string[];
  selectedDays?: SelectedDayPlan[];
  currentDifficulty: 'easy' | 'medium' | 'hard' | 'adaptive';
  done: boolean;
  feedback?: FinalFeedback;
  createdAt: number;
  lastActiveAt: number;
  activeQuestion?: ActiveQuestion;
  evaluationHistory?: EvaluationStep[];
  memoryLayer?: QuestionMemoryItem[];
  conceptsUnderstood?: string[];
  conceptsStruggling?: string[];
}

export interface InterviewApiRequest {
  sessionId: string;
  candidate?: Candidate;
  message?: string;
  chatHistory?: any[];
  forceEvaluate?: boolean;
}

export interface InterviewApiResponse {
  reply: string;
  done: boolean;
  feedback?: FinalFeedback;
  questionNumber?: number;
  daysCoveredCount?: number;
  currentDayTitle?: string;
  topic?: string;
  curriculumDay?: number;
  isFollowUp?: boolean;
  isClarificationRequest?: boolean;
  isOffTopic?: boolean;
  currentDifficulty?: string;
}
