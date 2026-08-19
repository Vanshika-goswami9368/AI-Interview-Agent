import { GoogleGenAI, Type } from '@google/genai';
import { InterviewSession, FinalFeedback, Candidate, QuestionMemoryItem, SelectedDayPlan, QuestionEvaluationDetail } from '../types';
import { curriculumData } from '../data/curriculumData';

// Helper to format memory layer (previous questions, answers, scores, and evaluations)
export function formatMemoryContext(memoryLayer?: QuestionMemoryItem[]): string {
  if (!memoryLayer || memoryLayer.length === 0) {
    return 'No previous questions answered yet in this interview session.';
  }

  return memoryLayer
    .map((item, idx) => {
      const qNum = item.questionNumber || idx + 1;
      const topicInfo = item.topic ? ` [Topic: ${item.topic}${item.curriculumDay ? `, Day ${item.curriculumDay}` : ''}]` : '';
      const diffInfo = item.difficulty ? ` (Difficulty: ${item.difficulty})` : '';
      const scoreStr = item.score !== undefined ? `${item.score}/10` : 'N/A';
      const statusStr = item.status || 'evaluated';
      const reasonStr = item.reason || 'No specific evaluation note.';
      const demonstratedStr = item.conceptsDemonstrated && item.conceptsDemonstrated.length > 0
        ? item.conceptsDemonstrated.join(', ')
        : 'None noted';
      const missingStr = item.conceptsMissingOrFlawed && item.conceptsMissingOrFlawed.length > 0
        ? item.conceptsMissingOrFlawed.join(', ')
        : 'None noted';

      return `Memory Record #${idx + 1} (Question #${qNum})${topicInfo}${diffInfo}:
  • Question Asked: "${item.question}"
  • Candidate Answer: "${item.candidateAnswer || '(No response provided)'}"
  • Evaluation Score: ${scoreStr}
  • Evaluation Status: ${statusStr}
  • Reason / Rationale: ${reasonStr}
  • Concepts Demonstrated: ${demonstratedStr}
  • Missing or Flawed Concepts: ${missingStr}`;
    })
    .join('\n\n');
}

const TECHNICAL_ONTOLOGY = [
  'vector', 'embedding', 'rag', 'chunk', 'prompt', 'mcp', 'agent', 'docker', 'kubernetes',
  'index', 'cosine', 'hnsw', 'retrieval', 'rerank', 'pipeline', 'token', 'latency', 'database',
  'grpc', 'schema', 'fallback', 'cache', 'throughput', 'concurrency', 'failover', 'consistency',
  'qdrant', 'pinecone', 'pgvector', 'kafka', 'fastapi', 'ollama', 'redis', 'chroma', 'microservices',
  'ivf', 'quantization', 'bm25', 'precision', 'recall', 'lora', 'context window'
];

const REASONING_KEYWORDS = [
  'because', 'since', 'therefore', 'due to', 'leads to', 'result', 'reason', 'why',
  'analyze', 'investigate', 'debug', 'troubleshoot', 'root cause', 'diagnose', 'mitigate',
  'prevent', 'isolate', 'handle', 'solve', 'resolve', 'scenario', 'edge case', 'failure mode',
  'condition', 'if', 'when', 'unless', 'fallback', 'circuit breaker', 'retry', 'backoff'
];

const ENGINEERING_KEYWORDS = [
  'tradeoff', 'trade-off', 'scale', 'scalability', 'latency', 'throughput', 'cost',
  'memory', 'cpu', 'ram', 'p99', 'p95', 'sla', 'sharding', 'replication', 'partition',
  'durability', 'consistency', 'availability', 'cap theorem', 'acid', 'cache', 'caching',
  'eviction', 'lru', 'bottleneck', 'production', 'architecture', 'choose', 'prefer',
  'versus', 'vs', 'instead of', 'compromise', 'overhead', 'benchmark'
];

const COMMUNICATION_KEYWORDS = [
  'first', 'second', 'third', 'furthermore', 'moreover', 'specifically', 'in summary',
  'for example', 'for instance', 'in addition', 'to summarize', 'pros', 'cons',
  'advantage', 'disadvantage', 'tradeoff', 'approach', 'strategy', 'consideration'
];

const TRADEOFF_KEYWORDS = [
  'tradeoff', 'trade-off', 'latency', 'scale', 'throughput', 'cost', 'bottleneck',
  'failover', 'concurrency', 'fallback', 'cache', 'consistency', 'architecture', 'p99', 'sharding'
];

// Helper to filter relevant curriculum days and profile context for a candidate
export function getCandidateCurriculumContext(candidate: Candidate) {
  const passedMissions = (candidate.missions || []).filter((m) => m.passed === true);
  const passedDays = passedMissions.map((m) => m.day);

  // Map to full curriculum details for passed/completed days
  const completedCurriculumDays = curriculumData.days
    .filter((d) => passedDays.includes(d.day))
    .map((d) => ({
      day: d.day,
      title: d.title,
      type: d.type,
      tools: d.tools,
      objectives: d.objectives ? d.objectives.slice(0, 4) : [],
    }));

  const uncompletedDays = curriculumData.days
    .filter((d) => !passedDays.includes(d.day))
    .map((d) => ({
      day: d.day,
      title: d.title,
    }));

  // If no passed days yet, default to active available curriculum days
  const activeCompletedDays = completedCurriculumDays.length > 0
    ? completedCurriculumDays
    : curriculumData.days.slice(0, 5).map((d) => ({
        day: d.day,
        title: d.title,
        type: d.type,
        tools: d.tools,
        objectives: d.objectives ? d.objectives.slice(0, 4) : [],
      }));

  return {
    candidateProfile: {
      id: candidate.member.id,
      name: candidate.member.name,
      role: candidate.member.jobRole,
      yearsExperience: candidate.member.yearsExperience,
      education: candidate.member.education,
      skills: candidate.member.skills || ['Vector Databases', 'RAG Systems', 'LLM Architectures'],
      technologies: candidate.member.technologies || ['Python', 'Docker', 'Kubernetes'],
      programmingLanguages: candidate.member.programmingLanguages || ['Python'],
      projects: candidate.member.projects || [],
      experience: candidate.member.experience || [],
      certifications: candidate.member.certifications || [],
      internships: candidate.member.internships || [],
      commitDays: candidate.signals?.commitDays,
      missionsCompleted: candidate.signals?.missionsCompleted,
      missionsFirstTry: candidate.signals?.missionsFirstTry,
    },
    completedCurriculumDays: activeCompletedDays,
    uncompletedDays,
  };
}

// Ensures the interview session has EXACTLY 4 distinct curriculum Days selected for the 8-question interview plan
export function ensureSelected4Days(session: InterviewSession): SelectedDayPlan[] {
  if (session.selectedDays && session.selectedDays.length === 4) {
    return session.selectedDays;
  }

  const context = getCandidateCurriculumContext(session.candidate);
  const passedDays = context.completedCurriculumDays;

  const chosen: SelectedDayPlan[] = [];
  const chosenDayNums = new Set<number>();

  for (const d of passedDays) {
    if (chosen.length >= 4) break;
    if (!chosenDayNums.has(d.day)) {
      chosenDayNums.add(d.day);
      chosen.push({
        day: d.day,
        title: d.title,
        type: d.type,
        tools: d.tools,
        objectives: d.objectives && d.objectives.length > 0 ? d.objectives : ['Design and optimization in production'],
      });
    }
  }

  if (chosen.length < 4) {
    for (const d of curriculumData.days) {
      if (chosen.length >= 4) break;
      if (!chosenDayNums.has(d.day)) {
        chosenDayNums.add(d.day);
        chosen.push({
          day: d.day,
          title: d.title,
          type: d.type,
          tools: d.tools,
          objectives: d.objectives && d.objectives.length > 0 ? d.objectives : ['Design and optimization in production'],
        });
      }
    }
  }

  session.selectedDays = chosen.slice(0, 4);
  return session.selectedDays;
}

// Local NLP Helper Functions
function cleanJsonText(rawText: string): string {
  if (!rawText) return '{}';
  let cleaned = rawText.trim();
  if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim();
  }
  return cleaned;
}

let geminiQuotaCooldownUntil = 0;

export function isGeminiInCooldown(): boolean {
  return Date.now() < geminiQuotaCooldownUntil;
}

export function setGeminiCooldown(seconds: number = 60) {
  geminiQuotaCooldownUntil = Date.now() + seconds * 1000;
}

async function generateContentWithFallback(ai: GoogleGenAI, params: { contents: string; config: any }): Promise<any> {
  if (isGeminiInCooldown()) {
    throw new Error('Gemini API is in quota cooldown. Using local engine.');
  }

  const models = ['gemini-3.7-flash', 'gemini-3.1-flash-lite', 'gemini-flash-latest'];
  let lastError: any = null;

  for (const model of models) {
    try {
      const apiCallPromise = ai.models.generateContent({
        model,
        contents: params.contents,
        config: params.config,
      });

      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error(`Model ${model} timed out after 5s`)), 5000);
      });

      const response: any = await Promise.race([apiCallPromise, timeoutPromise]);
      if (response && response.text) {
        return response;
      }
    } catch (err: any) {
      lastError = err;
      let errMsg = '';
      if (typeof err?.message === 'string') {
        errMsg = err.message;
      } else {
        try {
          errMsg = JSON.stringify(err);
        } catch {
          errMsg = String(err);
        }
      }

      if (errMsg.includes('429') || errMsg.includes('503') || errMsg.includes('RESOURCE_EXHAUSTED') || errMsg.includes('Quota exceeded') || errMsg.includes('high demand') || errMsg.includes('exceeded your current quota')) {
        setGeminiCooldown(60);
        break; // If project-level quota is exhausted, exit model loop immediately
      }
    }
  }

  throw lastError || new Error('Gemini model calls unavailable');
}

function normalizeText(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9\s]/g, ' ');
}

function tokenize(text: string): string[] {
  const stopWords = new Set(['is', 'a', 'the', 'and', 'or', 'in', 'on', 'at', 'for', 'with', 'to', 'of', 'that', 'this', 'it', 'by', 'as', 'an', 'be', 'are']);
  return normalizeText(text)
    .split(/\s+/)
    .filter((word) => word.length > 2 && !stopWords.has(word));
}

function extractDomainConcepts(text: string, currentTopicObjectives: string[] = []): string[] {
  const tokens = tokenize(text);
  const found: string[] = [];

  TECHNICAL_ONTOLOGY.forEach((term) => {
    if (text.toLowerCase().includes(term) && !found.includes(term)) {
      found.push(term);
    }
  });

  currentTopicObjectives.forEach((obj) => {
    tokenize(obj).forEach((t) => {
      if (tokens.includes(t) && !found.includes(t) && t.length > 4) {
        found.push(t);
      }
    });
  });

  return found;
}

interface LocalIntentAnalysis {
  intent: 'asking_clarification' | 'asking_explanation' | 'expressing_confusion' | 'admitting_lack_of_knowledge' | 'off_topic' | 'irrelevant' | 'answering';
  isClarificationRequest: boolean;
  isOffTopic: boolean;
  isExplicitDontKnow: boolean;
  isIrrelevant?: boolean;
  understandingLevel: 'strong' | 'partial' | 'incorrect' | 'confused' | 'off_topic' | 'skipped' | 'irrelevant';
  detectedConcepts: string[];
  missingTradeoffs: boolean;
}

function detectLanguageStyle(text: string): 'hinglish' | 'hindi' | 'english' {
  if (!text) return 'english';
  if (/[\u0900-\u097F]/.test(text)) {
    return 'hindi';
  }
  const hinglishWords = [
    'kya', 'kaise', 'samajh', 'batao', 'bataiye', 'hai', 'hain', 'nahi', 'nahin',
    'mujhe', 'hum', 'aap', 'mera', 'meri', 'karo', 'karna', 'raha', 'rahi', 'sahi',
    'galat', 'baat', 'pehle', 'kuch', 'bhi', 'se', 'ko', 'par', 'aur', 'toh', 'yeh', 'woh',
    'achha', 'accha', 'kaun', 'kab', 'kahan', 'kyun', 'kyu', 'matlab', 'bolo', 'ha', 'haan'
  ];
  const words = text.toLowerCase().split(/\s+/);
  const matchCount = words.filter((w) => hinglishWords.includes(w)).length;
  if (matchCount >= 1 || (words.length > 0 && matchCount / words.length > 0.08)) {
    return 'hinglish';
  }
  return 'english';
}

function classifyCandidateIntentLocal(
  message: string,
  activeTopicObjectives: string[] = [],
  candidateSkills: string[] = []
): LocalIntentAnalysis {
  const raw = (message || '').trim();
  const lower = raw.toLowerCase();
  const tokens = tokenize(raw);

  // 0. Empty or Explicit No-Answer Check
  if (!raw || raw === '(No answer provided)' || raw === '(Candidate skipped question)' || raw === 'n/a' || raw === 'none') {
    return {
      intent: 'admitting_lack_of_knowledge',
      isClarificationRequest: false,
      isOffTopic: false,
      isExplicitDontKnow: true,
      understandingLevel: 'skipped',
      detectedConcepts: [],
      missingTradeoffs: true,
    };
  }

  // 1. Explanation or Clarification Request Check
  const explanationReqRegex = /\b(explain|samjha|samjhao|samjhayein|detail|details|what is|how does|kaise kaam|kaise karta|tell me about|batao|bataiye)\b/i;
  const clarificationRegex = /\b(clarif|what do you mean|rephrase|repeat|could you explain|what does that mean|didn't understand|didnt understand|don't understand|dont understand|what is meant by|can you elaborate|please elaborate|give an example|give me an example|for example|explain more|explain this|explain further|elaborate|give example)\b/i;
  const isQuestionMarkBrief = lower.endsWith('?') && tokens.length < 12;

  if (explanationReqRegex.test(lower) && (lower.startsWith('what') || lower.startsWith('how') || lower.includes('samjha') || lower.includes('batao') || lower.includes('explain'))) {
    return {
      intent: 'asking_explanation',
      isClarificationRequest: true,
      isOffTopic: false,
      isExplicitDontKnow: false,
      understandingLevel: 'confused',
      detectedConcepts: extractDomainConcepts(raw, activeTopicObjectives),
      missingTradeoffs: true,
    };
  }

  if (clarificationRegex.test(lower) || isQuestionMarkBrief) {
    return {
      intent: 'asking_clarification',
      isClarificationRequest: true,
      isOffTopic: false,
      isExplicitDontKnow: false,
      understandingLevel: 'confused',
      detectedConcepts: extractDomainConcepts(raw, activeTopicObjectives),
      missingTradeoffs: true,
    };
  }

  // 2. Confusion Check
  const confusionRegex = /\b(confused|getting mixed up|hard to follow|lost me|don't get it|dont get it|samajh nahi)\b/i;
  if (confusionRegex.test(lower)) {
    return {
      intent: 'expressing_confusion',
      isClarificationRequest: true,
      isOffTopic: false,
      isExplicitDontKnow: false,
      understandingLevel: 'confused',
      detectedConcepts: [],
      missingTradeoffs: true,
    };
  }

  // 3. Admitting Lack of Knowledge / Skipped Check ("I don't know", "pass", "skip", "no answer", etc.)
  const dontKnowRegex = /\b(don't know|dont know|no idea|not sure|pass|passing|never used|haven't used|havent used|haven't studied|havent studied|haven't|havent|skip|skipped|skipping|idk|no clue|dunno|pata nahi|maloom nahi|unsure|don't recall|dont recall|no answer|leave this|next question|next|nothing|chhor do|aage badho)\b/i;
  if (dontKnowRegex.test(lower) && tokens.length < 15) {
    return {
      intent: 'admitting_lack_of_knowledge',
      isClarificationRequest: false,
      isOffTopic: false,
      isExplicitDontKnow: true,
      understandingLevel: 'skipped', // Explicitly marked as skipped!
      detectedConcepts: [],
      missingTradeoffs: true,
    };
  }

  const detectedConcepts = extractDomainConcepts(message, activeTopicObjectives);
  const hasTradeoff = TRADEOFF_KEYWORDS.some((term) => lower.includes(term));

  // 4. Irrelevant / Meaningless Answer Check (e.g., gibberish, "abc", "foo bar", non-technical chatter)
  if (detectedConcepts.length === 0 && tokens.length < 4 && !dontKnowRegex.test(lower) && !clarificationRegex.test(lower)) {
    return {
      intent: 'irrelevant',
      isClarificationRequest: false,
      isOffTopic: true,
      isExplicitDontKnow: false,
      isIrrelevant: true,
      understandingLevel: 'irrelevant',
      detectedConcepts: [],
      missingTradeoffs: true,
    };
  }

  // 5. Off-Topic Check
  const skillMatches = candidateSkills.filter((s) => lower.includes(s.toLowerCase())).length;
  if (detectedConcepts.length === 0 && skillMatches === 0 && tokens.length < 5) {
    return {
      intent: 'off_topic',
      isClarificationRequest: false,
      isOffTopic: true,
      isExplicitDontKnow: false,
      understandingLevel: 'off_topic',
      detectedConcepts: [],
      missingTradeoffs: true,
    };
  }

  // 6. Answering - Grade Depth
  let understandingLevel: 'strong' | 'partial' | 'incorrect' = 'partial';
  if (tokens.length >= 18 && (detectedConcepts.length >= 2 || hasTradeoff)) {
    understandingLevel = 'strong';
  } else if (tokens.length >= 8 || detectedConcepts.length >= 1) {
    understandingLevel = 'partial';
  } else {
    understandingLevel = 'incorrect';
  }

  return {
    intent: 'answering',
    isClarificationRequest: false,
    isOffTopic: false,
    isExplicitDontKnow: false,
    understandingLevel,
    detectedConcepts,
    missingTradeoffs: !hasTradeoff,
  };
}

// Helper to extract candidate mentions, projects, and technologies from conversation history
function extractCandidateDemonstratedContext(
  conversationHistory: { role: 'interviewer' | 'candidate'; text: string }[],
  candidate: Candidate
): {
  mentionedProjects: string[];
  mentionedTechnologies: string[];
  demonstratedConcepts: string[];
} {
  const mentionedProjects: string[] = [];
  const mentionedTechnologies: string[] = [];
  const demonstratedConcepts: string[] = [];

  const candidateMsgs = conversationHistory.filter((c) => c.role === 'candidate');
  const allCandidateText = candidateMsgs.map((c) => c.text).join(' ').toLowerCase();

  // Check candidate profile projects
  (candidate.member.projects || []).forEach((p) => {
    if (p.name && allCandidateText.includes(p.name.toLowerCase()) && !mentionedProjects.includes(p.name)) {
      mentionedProjects.push(p.name);
    }
  });

  // Check candidate technologies & skills
  const allKnownTechs = [
    ...(candidate.member.technologies || []),
    ...(candidate.member.skills || []),
    ...(candidate.member.programmingLanguages || []),
  ];

  allKnownTechs.forEach((tech) => {
    if (tech && allCandidateText.includes(tech.toLowerCase()) && !mentionedTechnologies.includes(tech)) {
      mentionedTechnologies.push(tech);
    }
  });

  TECHNICAL_ONTOLOGY.forEach((term) => {
    if (allCandidateText.includes(term) && !demonstratedConcepts.includes(term)) {
      demonstratedConcepts.push(term);
    }
  });

  return {
    mentionedProjects,
    mentionedTechnologies,
    demonstratedConcepts,
  };
}

// Local Context-Aware Response Generator
function generateLocalResponse(
  session: InterviewSession,
  candidateMessage?: string
) {
  const context = getCandidateCurriculumContext(session.candidate);
  const candidateName = context.candidateProfile.name;
  const candidateRole = context.candidateProfile.role;
  const candidateExp = context.candidateProfile.yearsExperience;
  const projects = context.candidateProfile.projects;
  const skills = context.candidateProfile.skills;
  const technologies = context.candidateProfile.technologies;
  const languages = context.candidateProfile.programmingLanguages;
  const selected4Days = ensureSelected4Days(session);

  const nextQNum = candidateMessage ? Math.min(session.questionsAsked + 1, 8) : 1;
  const dayIndex = Math.min(Math.floor((nextQNum - 1) / 2), 3);
  const targetDayObj = selected4Days[dayIndex];
  const isSecondQuestionOnDay = (nextQNum % 2 === 0);

  // Extract candidate demonstrated knowledge and mentioned items from earlier turns
  const demonstratedContext = extractCandidateDemonstratedContext(
    session.conversationHistory,
    session.candidate
  );

  // Find candidate's project or technology relevant to this curriculum topic
  const targetTopicLower = (targetDayObj.title + ' ' + (targetDayObj.objectives || []).join(' ')).toLowerCase();
  
  // Find project matching candidate profile
  const matchedProject = projects.find((p) => {
    const pText = (p.name + ' ' + (p.description || '') + ' ' + (p.technologies || []).join(' ')).toLowerCase();
    return targetTopicLower.split(/\s+/).some((w) => w.length > 4 && pText.includes(w));
  }) || projects[0];

  // Find candidate technologies matching candidate profile
  const matchedTechs = technologies.filter((t) => targetTopicLower.includes(t.toLowerCase()));
  const candidatePrimaryTech = matchedTechs.length > 0 
    ? matchedTechs[0] 
    : (technologies[0] || (languages && languages[0]) || 'your production stack');

  // INITIAL TURN (Question 1 - Conceptual / Foundation Angle)
  if (!candidateMessage || session.questionsAsked === 0) {
    let profileIntro = '';
    if (matchedProject) {
      profileIntro = ` Drawing from your experience as a ${candidateRole} (${candidateExp} years experience) and your work on "${matchedProject.name}" with ${matchedProject.technologies?.slice(0, 2).join(' and ') || candidatePrimaryTech},`;
    } else if (technologies.length > 0) {
      profileIntro = ` Drawing from your experience as a ${candidateRole} working with ${technologies.slice(0, 2).join(' and ')},`;
    } else {
      profileIntro = ` With your background as a ${candidateRole},`;
    }

    const primaryObjective = targetDayObj.objectives[0] || 'How do you optimize vector retrieval accuracy?';

    return {
      reply: `Welcome ${candidateName}!${profileIntro} let's begin our technical interview with Question 1 of 8 on Day ${targetDayObj.day}: ${targetDayObj.title}. Why is ${primaryObjective} essential in this architecture, and what fundamental mechanism in ${candidatePrimaryTech} enables it?`,
      topic: targetDayObj.title,
      curriculumDay: targetDayObj.day,
      isFollowUp: false,
      shouldAdvanceQuestionCount: true,
    };
  }

  const langStyle = detectLanguageStyle(candidateMessage);
  const analysis = classifyCandidateIntentLocal(candidateMessage, targetDayObj.objectives, skills);

  const rawMsg = candidateMessage.trim();
  const detectedConcepts = analysis.detectedConcepts;
  let dynamicSubject = '';
  if (detectedConcepts.length > 0) {
    dynamicSubject = detectedConcepts[0];
  } else {
    const tokens = tokenize(rawMsg);
    if (tokens.length > 0) {
      dynamicSubject = tokens[0];
    }
  }

  // Multilingual local fallback responses for clarification / explanation
  if (analysis.intent === 'asking_explanation' || analysis.intent === 'asking_clarification' || analysis.intent === 'expressing_confusion') {
    const objClarification = targetDayObj.objectives[0] || 'the core design requirements';
    const topicFocus = dynamicSubject ? dynamicSubject : targetDayObj.title;

    if (langStyle === 'hinglish') {
      return {
        reply: `Haan bilkul! Day ${targetDayObj.day} (${targetDayObj.title}) me ${topicFocus} ka matlab hai: ${objClarification}. Real production environment me aapke stack (${candidatePrimaryTech}) ke saath isko kaise configure karenge?`,
        topic: targetDayObj.title,
        curriculumDay: targetDayObj.day,
        isFollowUp: true,
        shouldAdvanceQuestionCount: false,
        intentAnalysis: analysis,
      };
    } else if (langStyle === 'hindi') {
      return {
        reply: `बिल्कुल! Day ${targetDayObj.day} (${targetDayObj.title}) में ${topicFocus} के बारे में: मुख्य उद्देश्य है ${objClarification}। आप वास्तविक उत्पादन सेटअप में ${candidatePrimaryTech} के साथ इसे कैसे लागू करेंगे?`,
        topic: targetDayObj.title,
        curriculumDay: targetDayObj.day,
        isFollowUp: true,
        shouldAdvanceQuestionCount: false,
        intentAnalysis: analysis,
      };
    } else {
      return {
        reply: `To clarify Day ${targetDayObj.day} (${targetDayObj.title}) regarding ${topicFocus}: our core focus is ${objClarification}. Specifically, how would you configure ${candidatePrimaryTech} in your pipeline to manage this in practice?`,
        topic: targetDayObj.title,
        curriculumDay: targetDayObj.day,
        isFollowUp: true,
        shouldAdvanceQuestionCount: false,
        intentAnalysis: analysis,
      };
    }
  }

  // Handle SKIPPED / "I don't know" answers respectfully
  if (analysis.intent === 'admitting_lack_of_knowledge' || analysis.understandingLevel === 'skipped') {
    const objText = targetDayObj.objectives[0] || 'the core system requirement';
    return {
      reply: `Understood! We will skip this question and move forward. Let's move to Question #${nextQNum} of 8 on Day ${targetDayObj.day}: ${targetDayObj.title}. When dealing with ${objText} in ${candidatePrimaryTech}, what is the primary technical trade-off you evaluate?`,
      topic: targetDayObj.title,
      curriculumDay: targetDayObj.day,
      isFollowUp: isSecondQuestionOnDay,
      shouldAdvanceQuestionCount: true,
      intentAnalysis: analysis,
    };
  }

  // Handle IRRELEVANT / Meaningless answers
  if (analysis.intent === 'irrelevant' || analysis.understandingLevel === 'irrelevant') {
    const objText = targetDayObj.objectives[0] || 'the core architecture';
    return {
      reply: `That response doesn't seem directly connected to our discussion on ${targetDayObj.title}. To keep our technical evaluation focused, let's proceed to Question #${nextQNum} of 8 on Day ${targetDayObj.day} (${targetDayObj.title}): How do you handle ${objText} in ${candidatePrimaryTech}?`,
      topic: targetDayObj.title,
      curriculumDay: targetDayObj.day,
      isFollowUp: isSecondQuestionOnDay,
      shouldAdvanceQuestionCount: true,
      intentAnalysis: analysis,
    };
  }

  if (analysis.intent === 'off_topic') {
    if (langStyle === 'hinglish') {
      return {
        reply: `Aapne ${dynamicSubject || 'is point'} ki baat ki. Technical context ko maintain karne ke liye, Question #${nextQNum} (Day ${targetDayObj.day}: ${targetDayObj.title}) par aate hain: aap ${candidatePrimaryTech} me is requirement ko kaise approach karte hain?`,
        topic: targetDayObj.title,
        curriculumDay: targetDayObj.day,
        isFollowUp: true,
        shouldAdvanceQuestionCount: false,
        intentAnalysis: analysis,
      };
    } else if (langStyle === 'hindi') {
      return {
        reply: `आपने ${dynamicSubject || 'इस विषय'} का उल्लेख किया। आइए तकनीकी मूल्यांकन के लिए Question #${nextQNum} (Day ${targetDayObj.day}: ${targetDayObj.title}) पर ध्यान केंद्रित करें: ${candidatePrimaryTech} में आपका क्या दृष्टिकोण रहेगा?`,
        topic: targetDayObj.title,
        curriculumDay: targetDayObj.day,
        isFollowUp: true,
        shouldAdvanceQuestionCount: false,
        intentAnalysis: analysis,
      };
    } else {
      return {
        reply: `I see you mentioned ${dynamicSubject || 'that aspect'}. To keep our technical evaluation structured, let's connect that back to Question #${nextQNum} on Day ${targetDayObj.day} (${targetDayObj.title}): how does ${dynamicSubject || 'this'} impact ${targetDayObj.objectives[0] || 'your system design'} in ${candidatePrimaryTech}?`,
        topic: targetDayObj.title,
        curriculumDay: targetDayObj.day,
        isFollowUp: true,
        shouldAdvanceQuestionCount: false,
        intentAnalysis: analysis,
      };
    }
  }

  // Tailor interviewer feedback prefix based on correctness
  let qualityPrefix = '';
  if (analysis.understandingLevel === 'strong') {
    qualityPrefix = dynamicSubject ? `Good analysis on ${dynamicSubject}. ` : `Solid explanation. `;
  } else if (analysis.understandingLevel === 'partial') {
    qualityPrefix = dynamicSubject ? `Thanks for your thoughts on ${dynamicSubject}. ` : `Noted. `;
  } else if (analysis.understandingLevel === 'incorrect') {
    qualityPrefix = dynamicSubject ? `I see your perspective on ${dynamicSubject}, though production systems often require different safeguards. ` : `Understood. `;
  }

  // DIVERSE, NON-REPETITIVE QUESTION GENERATION BY QUESTION NUMBER & ANGLE
  // Question 2: Scenario-based / Debugging Follow-up
  if (nextQNum === 2) {
    if (langStyle === 'hinglish') {
      return {
        reply: `${qualityPrefix}Question #2 (Day ${targetDayObj.day}: ${targetDayObj.title}): Maan lijiye production me ${dynamicSubject || candidatePrimaryTech} index update ke baad irrelevant chunks return karne lage. Is scenario me aap root cause diagnose karne ke liye kaunse exact metrics ya pipeline stages sabse pehle inspect karenge?`,
        topic: targetDayObj.title,
        curriculumDay: targetDayObj.day,
        isFollowUp: true,
        shouldAdvanceQuestionCount: true,
        intentAnalysis: analysis,
      };
    } else if (langStyle === 'hindi') {
      return {
        reply: `${qualityPrefix}Question #2 (Day ${targetDayObj.day}: ${targetDayObj.title}): मान लीजिए उत्पादन में ${dynamicSubject || candidatePrimaryTech} इंडेक्स अपडेट के बाद अप्रासंगिक परिणाम देने लगे। आप मूल कारण का निदान करने के लिए सबसे पहले किन मैट्रिक्स या पाइपलाइन चरणों की जांच करेंगे?`,
        topic: targetDayObj.title,
        curriculumDay: targetDayObj.day,
        isFollowUp: true,
        shouldAdvanceQuestionCount: true,
        intentAnalysis: analysis,
      };
    } else {
      return {
        reply: `${qualityPrefix}Moving to Question #2 on Day ${targetDayObj.day} (${targetDayObj.title}): Suppose in production your ${dynamicSubject || candidatePrimaryTech} setup suddenly returns irrelevant or degraded chunks after an index update. What specific similarity metrics, embeddings, or pipeline stages would you inspect first to diagnose the root cause?`,
        topic: targetDayObj.title,
        curriculumDay: targetDayObj.day,
        isFollowUp: true,
        shouldAdvanceQuestionCount: true,
        intentAnalysis: analysis,
      };
    }
  }

  // Question 3: Comparative Analysis & Strategy Selection
  if (nextQNum === 3) {
    const objText = targetDayObj.objectives[0] || 'data ingestion and processing';
    if (langStyle === 'hinglish') {
      return {
        reply: `${qualityPrefix}Aaiye ab Question #3 ke liye next topic par chalte hain: Day ${targetDayObj.day} (${targetDayObj.title}). ${objText} ke liye different strategies compare karte waqt, ${candidatePrimaryTech} me ek approach choose karne ka technical criteria kya hota hai?`,
        topic: targetDayObj.title,
        curriculumDay: targetDayObj.day,
        isFollowUp: false,
        shouldAdvanceQuestionCount: true,
        intentAnalysis: analysis,
      };
    } else if (langStyle === 'hindi') {
      return {
        reply: `${qualityPrefix}आइए अब Question #3 के लिए अगले विषय पर बढ़ते हैं: Day ${targetDayObj.day} (${targetDayObj.title})। ${objText} के लिए विभिन्न रणनीतियों की तुलना करते समय, ${candidatePrimaryTech} में एक दृष्टिकोण चुनने के तकनीकी मानदंड क्या हैं?`,
        topic: targetDayObj.title,
        curriculumDay: targetDayObj.day,
        isFollowUp: false,
        shouldAdvanceQuestionCount: true,
        intentAnalysis: analysis,
      };
    } else {
      return {
        reply: `${qualityPrefix}Let's proceed to Question #3 of 8 on Day ${targetDayObj.day}: ${targetDayObj.title}. When comparing different architectural strategies for ${objText}, what concrete technical criteria guide when you would choose one approach over another in ${candidatePrimaryTech}?`,
        topic: targetDayObj.title,
        curriculumDay: targetDayObj.day,
        isFollowUp: false,
        shouldAdvanceQuestionCount: true,
        intentAnalysis: analysis,
      };
    }
  }

  // Question 4: Practical Evaluation & Benchmarking
  if (nextQNum === 4) {
    if (langStyle === 'hinglish') {
      return {
        reply: `${qualityPrefix}Question #4 (Day ${targetDayObj.day}: ${targetDayObj.title}): ${dynamicSubject || candidatePrimaryTech} ke context me, aap practically kaise measure aur benchmark karte hain ki aapka system accuracy aur latency thresholds par khara utar raha hai?`,
        topic: targetDayObj.title,
        curriculumDay: targetDayObj.day,
        isFollowUp: true,
        shouldAdvanceQuestionCount: true,
        intentAnalysis: analysis,
      };
    } else if (langStyle === 'hindi') {
      return {
        reply: `${qualityPrefix}Question #4 (Day ${targetDayObj.day}: ${targetDayObj.title}): ${dynamicSubject || candidatePrimaryTech} के संदर्भ में, आप व्यावहारिक रूप से कैसे मापते हैं कि आपकी प्रणाली सटीकता और लेटेंसी सीमाओं को पूरा कर रही है?`,
        topic: targetDayObj.title,
        curriculumDay: targetDayObj.day,
        isFollowUp: true,
        shouldAdvanceQuestionCount: true,
        intentAnalysis: analysis,
      };
    } else {
      return {
        reply: `${qualityPrefix}For Question #4 on Day ${targetDayObj.day} (${targetDayObj.title}): Following up on your discussion of ${dynamicSubject || candidatePrimaryTech}, how do you practically evaluate and benchmark whether this implementation is meeting target precision and latency thresholds under real-world traffic?`,
        topic: targetDayObj.title,
        curriculumDay: targetDayObj.day,
        isFollowUp: true,
        shouldAdvanceQuestionCount: true,
        intentAnalysis: analysis,
      };
    }
  }

  // Question 5: Failure Modes & Edge-case Bottlenecks
  if (nextQNum === 5) {
    const objText = targetDayObj.objectives[0] || 'service orchestration';
    if (langStyle === 'hinglish') {
      return {
        reply: `${qualityPrefix}Moving to Question #5 on Day ${targetDayObj.day}: ${targetDayObj.title}. ${candidatePrimaryTech} me ${objText} ke dauran kaunse subtle failure modes ya edge cases (jaise memory leaks ya context fragmentation) bottleneck ban sakte hain?`,
        topic: targetDayObj.title,
        curriculumDay: targetDayObj.day,
        isFollowUp: false,
        shouldAdvanceQuestionCount: true,
        intentAnalysis: analysis,
      };
    } else if (langStyle === 'hindi') {
      return {
        reply: `${qualityPrefix}Question #5 के लिए Day ${targetDayObj.day}: ${targetDayObj.title} पर बढ़ते हैं। ${candidatePrimaryTech} में ${objText} के दौरान कौन से अप्रत्याशित विफलता मोड या बॉटलनेक उत्पन्न हो सकते हैं?`,
        topic: targetDayObj.title,
        curriculumDay: targetDayObj.day,
        isFollowUp: false,
        shouldAdvanceQuestionCount: true,
        intentAnalysis: analysis,
      };
    } else {
      return {
        reply: `${qualityPrefix}Turning to Question #5 of 8 on Day ${targetDayObj.day}: ${targetDayObj.title}. What subtle failure modes or edge-case bottlenecks (such as context fragmentation or memory pressure) can cause ${objText} to degrade when implemented with ${candidatePrimaryTech}?`,
        topic: targetDayObj.title,
        curriculumDay: targetDayObj.day,
        isFollowUp: false,
        shouldAdvanceQuestionCount: true,
        intentAnalysis: analysis,
      };
    }
  }

  // Question 6: Concrete Mitigation & Circuit-breaking
  if (nextQNum === 6) {
    if (langStyle === 'hinglish') {
      return {
        reply: `${qualityPrefix}Question #6 (Day ${targetDayObj.day}: ${targetDayObj.title}): ${dynamicSubject || 'is failure scenario'} ko prevent karne ke liye aap ${candidatePrimaryTech} me kaunsa circuit-breaker ya retry fallback mechanism implement karenge?`,
        topic: targetDayObj.title,
        curriculumDay: targetDayObj.day,
        isFollowUp: true,
        shouldAdvanceQuestionCount: true,
        intentAnalysis: analysis,
      };
    } else if (langStyle === 'hindi') {
      return {
        reply: `${qualityPrefix}Question #6 (Day ${targetDayObj.day}: ${targetDayObj.title}): ${dynamicSubject || 'इस विफलता परिदृश्य'} को रोकने के लिए आप ${candidatePrimaryTech} में कौन सा फॉलबैक या सर्किट-ब्रेकर तंत्र लागू करेंगे?`,
        topic: targetDayObj.title,
        curriculumDay: targetDayObj.day,
        isFollowUp: true,
        shouldAdvanceQuestionCount: true,
        intentAnalysis: analysis,
      };
    } else {
      return {
        reply: `${qualityPrefix}For Question #6 on Day ${targetDayObj.day} (${targetDayObj.title}): In light of your points on ${dynamicSubject || candidatePrimaryTech}, what concrete mitigation pattern (such as circuit-breaking, backpressure management, or fallback caches) would you implement to guarantee high availability?`,
        topic: targetDayObj.title,
        curriculumDay: targetDayObj.day,
        isFollowUp: true,
        shouldAdvanceQuestionCount: true,
        intentAnalysis: analysis,
      };
    }
  }

  // Question 7: Candidate-Profile-Based System Design
  if (nextQNum === 7) {
    const objText = targetDayObj.objectives[0] || 'the core architecture';
    const projectRef = matchedProject ? `your project "${matchedProject.name}"` : `your experience with ${candidatePrimaryTech}`;
    if (langStyle === 'hinglish') {
      return {
        reply: `${qualityPrefix}Aaiye ab Day ${targetDayObj.day} (${targetDayObj.title}) ke sath Question #7 par chalte hain. ${projectRef} ke background ko dhyan me rakhte hue, aap ${objText} ke metadata structure aur access controls ko kaise design karenge?`,
        topic: targetDayObj.title,
        curriculumDay: targetDayObj.day,
        isFollowUp: false,
        shouldAdvanceQuestionCount: true,
        intentAnalysis: analysis,
      };
    } else if (langStyle === 'hindi') {
      return {
        reply: `${qualityPrefix}आइए अब Day ${targetDayObj.day} (${targetDayObj.title}) के साथ Question #7 पर बढ़ते हैं। ${projectRef} के आधार पर, आप ${objText} के लिए डेटा संरचना और एक्सेस नियंत्रण कैसे डिजाइन करेंगे?`,
        topic: targetDayObj.title,
        curriculumDay: targetDayObj.day,
        isFollowUp: false,
        shouldAdvanceQuestionCount: true,
        intentAnalysis: analysis,
      };
    } else {
      return {
        reply: `${qualityPrefix}Moving to Question #7 of 8 on Day ${targetDayObj.day}: ${targetDayObj.title}. Drawing directly from ${projectRef}: How would you structure metadata filtering and state partitioning for ${objText} to ensure strict isolation and consistency?`,
        topic: targetDayObj.title,
        curriculumDay: targetDayObj.day,
        isFollowUp: false,
        shouldAdvanceQuestionCount: true,
        intentAnalysis: analysis,
      };
    }
  }

  // Question 8: Live Incident Triage & Root Cause Analysis (Final Question)
  if (langStyle === 'hinglish') {
    return {
      reply: `${qualityPrefix}Yeh hamara final Question #8 of 8 hai (Day ${targetDayObj.day}: ${targetDayObj.title}): Maan lijiye peak production traffic me ${dynamicSubject || candidatePrimaryTech} par sudden p99 latency spike aur queue backup shuru ho jata hai. Step-by-step batayein ki aap root cause ko isolate aur resolve karne ke liye kya triage procedure follow karenge?`,
      topic: targetDayObj.title,
      curriculumDay: targetDayObj.day,
      isFollowUp: true,
      shouldAdvanceQuestionCount: true,
      intentAnalysis: analysis,
    };
  } else if (langStyle === 'hindi') {
    return {
      reply: `${qualityPrefix}यह हमारा अंतिम Question #8 of 8 है (Day ${targetDayObj.day}: ${targetDayObj.title}): मान लीजिए पीक प्रोडक्शन ट्रैफिक में ${dynamicSubject || candidatePrimaryTech} पर अचानक p99 लेटेंसी स्पाइक हो जाता है। आप मूल कारण को अलग करने और हल करने के लिए चरण-दर-चरण क्या प्रक्रिया अपनाएंगे?`,
      topic: targetDayObj.title,
      curriculumDay: targetDayObj.day,
      isFollowUp: true,
      shouldAdvanceQuestionCount: true,
      intentAnalysis: analysis,
    };
  } else {
    return {
      reply: `${qualityPrefix}This is Question #8 of 8 (our final question) on Day ${targetDayObj.day} (${targetDayObj.title}): Suppose during a peak traffic surge, your ${dynamicSubject || candidatePrimaryTech} service suffers an unexpected p99 latency spike and downstream timeouts. Walk me through your step-by-step live incident triage procedure to isolate and resolve the root bottleneck.`,
      topic: targetDayObj.title,
      curriculumDay: targetDayObj.day,
      isFollowUp: true,
      shouldAdvanceQuestionCount: true,
      intentAnalysis: analysis,
    };
  }
}

export function processLocalInterviewStep(
  session: InterviewSession,
  candidateMessage?: string
): {
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
} {
  if (!session.memoryLayer) {
    session.memoryLayer = [];
  }

  const selected4Days = ensureSelected4Days(session);

  // TERMINATION AFTER QUESTION #8: When candidate provides answer to Question #8
  if (candidateMessage && session.questionsAsked >= 8) {
    const activeQ = session.activeQuestion?.text || 'Question #8';
    const activeTopic = session.activeQuestion?.topic || selected4Days[3].title;
    const activeDay = session.activeQuestion?.curriculumDay || selected4Days[3].day;

    const analysis = classifyCandidateIntentLocal(
      candidateMessage,
      [activeTopic],
      session.candidate.member.skills
    );

    let localScore = 6;
    let localStatus: QuestionMemoryItem['status'] = 'partially_correct';
    let localReason = 'Evaluated final candidate response using local engine.';

    if (analysis.understandingLevel === 'strong') {
      localScore = 9;
      localStatus = 'correct';
      localReason = 'Candidate clearly articulated technical details and domain reasoning.';
    } else if (analysis.understandingLevel === 'incorrect') {
      localScore = 3;
      localStatus = 'incorrect';
      localReason = 'Answer contained misconceptions or lacked technical depth.';
    } else if (analysis.understandingLevel === 'confused') {
      localScore = 2;
      localStatus = 'confused';
      localReason = 'Candidate expressed confusion or requested explanation.';
    }

    const memoryRecord: QuestionMemoryItem = {
      id: `mem_local_${Date.now()}_${session.memoryLayer.length + 1}`,
      questionNumber: 8,
      question: activeQ,
      topic: activeTopic,
      curriculumDay: activeDay,
      difficulty: session.activeQuestion?.difficulty || session.currentDifficulty,
      candidateAnswer: candidateMessage,
      score: localScore,
      status: localStatus,
      reason: localReason,
      conceptsDemonstrated: analysis.detectedConcepts || [],
      conceptsMissingOrFlawed: analysis.missingTradeoffs ? ['Production Trade-offs & Bottlenecks'] : [],
      timestamp: Date.now(),
    };
    session.memoryLayer.push(memoryRecord);

    if (!session.evaluationHistory) session.evaluationHistory = [];
    session.evaluationHistory.push({
      turnNumber: session.conversationHistory.length,
      answerStatus: analysis.understandingLevel,
      isClarificationRequest: analysis.isClarificationRequest,
      isOffTopic: analysis.isOffTopic,
      isAnswered: !analysis.isClarificationRequest && !analysis.isOffTopic,
      conceptsUnderstood: analysis.detectedConcepts,
      conceptsMissing: analysis.missingTradeoffs ? ['System Trade-offs & Bottlenecks'] : [],
      feedbackComment: `Score: ${localScore}/10 (${localStatus}) - ${localReason}`,
    });

    session.questionsAsked = 8;
    const feedback = analyzeCandidateAnswersLocal(session.candidate, session.conversationHistory);
    session.done = true;
    session.feedback = feedback;

    return {
      reply: `Thank you, ${session.candidate?.member?.name || 'Candidate'}. That concludes our 8-question technical interview evaluation covering 4 core topics. Compiling your final Performance Report now...`,
      done: true,
      feedback,
      questionNumber: 8,
      daysCoveredCount: session.daysCovered.length,
      topic: activeTopic,
      curriculumDay: activeDay,
      isFollowUp: false,
      currentDifficulty: session.currentDifficulty,
    };
  }

  // Generate local response for turns 1 to 7
  const stepResult = generateLocalResponse(session, candidateMessage);

  if (candidateMessage && stepResult.intentAnalysis) {
    const analysis = stepResult.intentAnalysis;

    let localScore = 7;
    let localStatus: QuestionMemoryItem['status'] = 'partially_correct';
    let localReason = 'Evaluated response using local NLP engine.';

    if (analysis.understandingLevel === 'strong') {
      localScore = 9;
      localStatus = 'correct';
      localReason = 'Candidate clearly articulated technical details and domain reasoning.';
    } else if (analysis.understandingLevel === 'incorrect') {
      localScore = 3;
      localStatus = 'incorrect';
      localReason = 'Answer contained misconceptions or lacked technical depth.';
    } else if (analysis.understandingLevel === 'confused') {
      localScore = 2;
      localStatus = 'confused';
      localReason = 'Candidate expressed confusion or requested explanation.';
    } else if (analysis.isClarificationRequest) {
      localScore = 5;
      localStatus = 'clarification_requested';
      localReason = 'Candidate requested clarification or an example.';
    } else if (analysis.missingTradeoffs) {
      localScore = 6;
      localStatus = 'minor_mistake';
      localReason = 'Answer was partially correct but missed critical production trade-offs.';
    }

    const memoryRecord: QuestionMemoryItem = {
      id: `mem_local_${Date.now()}_${session.memoryLayer.length + 1}`,
      questionNumber: session.questionsAsked || 1,
      question: session.activeQuestion?.text || 'Initial Question',
      topic: session.activeQuestion?.topic || stepResult.topic,
      curriculumDay: session.activeQuestion?.curriculumDay || stepResult.curriculumDay,
      difficulty: session.activeQuestion?.difficulty || session.currentDifficulty,
      candidateAnswer: candidateMessage,
      score: localScore,
      status: localStatus,
      reason: localReason,
      conceptsDemonstrated: analysis.detectedConcepts || [],
      conceptsMissingOrFlawed: analysis.missingTradeoffs ? ['Production Trade-offs & Bottlenecks'] : [],
      timestamp: Date.now(),
    };
    session.memoryLayer.push(memoryRecord);

    if (!session.evaluationHistory) session.evaluationHistory = [];
    session.evaluationHistory.push({
      turnNumber: session.conversationHistory.length,
      answerStatus: analysis.understandingLevel,
      isClarificationRequest: analysis.isClarificationRequest,
      isOffTopic: analysis.isOffTopic,
      isAnswered: !analysis.isClarificationRequest && !analysis.isOffTopic,
      conceptsUnderstood: analysis.detectedConcepts,
      conceptsMissing: analysis.missingTradeoffs ? ['System Trade-offs & Production Bottlenecks'] : [],
      feedbackComment: `Score: ${localScore}/10 (${localStatus}) - ${localReason}`,
    });

    if (analysis.detectedConcepts.length > 0) {
      if (!session.conceptsUnderstood) session.conceptsUnderstood = [];
      analysis.detectedConcepts.forEach((c) => {
        if (!session.conceptsUnderstood!.includes(c)) session.conceptsUnderstood!.push(c);
      });
    }

    if (analysis.missingTradeoffs) {
      if (!session.conceptsStruggling) session.conceptsStruggling = [];
      if (!session.conceptsStruggling.includes('Production Trade-offs & Scalability')) {
        session.conceptsStruggling.push('Production Trade-offs & Scalability');
      }
    }

    if (candidateMessage) {
      session.questionsAsked += 1;
      if (stepResult.curriculumDay && !session.daysCovered.includes(stepResult.curriculumDay)) {
        session.daysCovered.push(stepResult.curriculumDay);
      }
      if (stepResult.topic && !session.topicsCovered.includes(stepResult.topic)) {
        session.topicsCovered.push(stepResult.topic);
      }
    }

    if (analysis.understandingLevel === 'strong') {
      session.currentDifficulty = 'hard';
    } else if (analysis.understandingLevel === 'incorrect' || analysis.understandingLevel === 'confused') {
      session.currentDifficulty = 'easy';
    } else {
      session.currentDifficulty = 'medium';
    }
  } else if (!candidateMessage) {
    if (stepResult.curriculumDay && !session.daysCovered.includes(stepResult.curriculumDay)) {
      session.daysCovered.push(stepResult.curriculumDay);
    }
    if (stepResult.topic && !session.topicsCovered.includes(stepResult.topic)) {
      session.topicsCovered.push(stepResult.topic);
    }
    session.questionsAsked = 1;
  }

  session.conversationHistory.push({
    role: 'interviewer',
    text: stepResult.reply,
    dayCovered: stepResult.curriculumDay,
    topic: stepResult.topic,
  });

  session.activeQuestion = {
    text: stepResult.reply,
    topic: stepResult.topic,
    curriculumDay: stepResult.curriculumDay,
    difficulty: session.currentDifficulty,
  };

  return {
    reply: stepResult.reply,
    done: false,
    questionNumber: session.questionsAsked,
    daysCoveredCount: session.daysCovered.length,
    currentDayTitle: stepResult.topic,
    topic: stepResult.topic,
    curriculumDay: stepResult.curriculumDay,
    isFollowUp: stepResult.isFollowUp,
    isClarificationRequest: stepResult.intentAnalysis?.isClarificationRequest,
    isOffTopic: stepResult.intentAnalysis?.isOffTopic,
    currentDifficulty: session.currentDifficulty,
  };
}

async function processGeminiInterviewStep(
  session: InterviewSession,
  candidateMessage?: string
) {
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
      retryOptions: {
        attempts: 1,
      },
    },
  });
  const context = getCandidateCurriculumContext(session.candidate);
  const selected4Days = ensureSelected4Days(session);

  // TERMINATION AFTER QUESTION #8: If candidate is providing answer to Question #8
  if (candidateMessage && session.questionsAsked >= 8) {
    if (!session.memoryLayer) session.memoryLayer = [];
    const activeQ = session.activeQuestion?.text || 'Question #8';
    const activeTopic = session.activeQuestion?.topic || selected4Days[3].title;
    const activeDay = session.activeQuestion?.curriculumDay || selected4Days[3].day;

    // Evaluate answer #8 with local/memory analysis
    const memoryRecord: QuestionMemoryItem = {
      id: `mem_${Date.now()}_${session.memoryLayer.length + 1}`,
      questionNumber: 8,
      question: activeQ,
      topic: activeTopic,
      curriculumDay: activeDay,
      difficulty: session.activeQuestion?.difficulty || session.currentDifficulty,
      candidateAnswer: candidateMessage,
      score: 7,
      status: 'partially_correct',
      reason: 'Evaluated final candidate response.',
      conceptsDemonstrated: [],
      conceptsMissingOrFlawed: [],
      timestamp: Date.now(),
    };
    session.memoryLayer.push(memoryRecord);

    if (!session.evaluationHistory) session.evaluationHistory = [];
    session.evaluationHistory.push({
      turnNumber: session.conversationHistory.length,
      answerStatus: 'partial',
      isClarificationRequest: false,
      isOffTopic: false,
      isAnswered: true,
      conceptsUnderstood: [],
      conceptsMissing: [],
      feedbackComment: 'Score: 7/10 (partially_correct) - Evaluated final response.',
    });

    session.questionsAsked = 8;
    let feedback: FinalFeedback;
    try {
      feedback = await generateGeminiFinalFeedback(session);
    } catch (e: any) {
      console.warn('[AI Service] Gemini final feedback fallback to local analysis:', e?.message);
      feedback = analyzeCandidateAnswersLocal(session.candidate, session.conversationHistory);
    }

    session.done = true;
    session.feedback = feedback;

    return {
      reply: `Thank you, ${session.candidate?.member?.name || 'Candidate'}. That concludes our 8-question technical interview evaluation covering 4 core topics. Compiling your final Performance Report now...`,
      done: true,
      feedback,
      questionNumber: 8,
      daysCoveredCount: session.daysCovered.length,
      topic: activeTopic,
      curriculumDay: activeDay,
      isFollowUp: false,
      currentDifficulty: session.currentDifficulty,
    };
  }

  const nextQNum = candidateMessage ? Math.min(session.questionsAsked + 1, 8) : 1;
  const dayIndex = Math.min(Math.floor((nextQNum - 1) / 2), 3);
  const targetDay = selected4Days[dayIndex];
  const isSecondQuestionOnDay = (nextQNum % 2 === 0);

  if (!session.memoryLayer) {
    session.memoryLayer = [];
  }

  const memoryContext = formatMemoryContext(session.memoryLayer);
  const demonstratedContext = extractCandidateDemonstratedContext(session.conversationHistory, session.candidate);

  const prompt = `
You are an expert Lead Technical Interviewer conducting a dynamic, human-like technical interview with candidate ${context.candidateProfile.name} (${context.candidateProfile.role}).

==================================================
MANDATORY DISTRIBUTION RULE: EXACTLY 8 QUESTIONS ACROSS 4 DAYS (EXACTLY 2 QUESTIONS PER DAY)
==================================================
The interview consists of 8 technical questions distributed across EXACTLY 4 DIFFERENT DAYS/TOPICS, asking EXACTLY 2 QUESTIONS PER DAY:
- Questions #1 & #2: Day ${selected4Days[0].day} (${selected4Days[0].title})
- Questions #3 & #4: Day ${selected4Days[1].day} (${selected4Days[1].title})
- Questions #5 & #6: Day ${selected4Days[2].day} (${selected4Days[2].title})
- Questions #7 & #8: Day ${selected4Days[3].day} (${selected4Days[3].title})

CURRENT TURN REQUIREMENT:
- You are generating Question #${nextQNum} of 8.
- MUST BE ON Day ${targetDay.day}: "${targetDay.title}".
- Topic: ${targetDay.title}
- Day Objectives: ${JSON.stringify(targetDay.objectives || [])}
- ${isSecondQuestionOnDay
    ? `This is the 2nd (and final) question on Day ${targetDay.day}. Ask a follow-up or deeper technical trade-off/system design question on ${targetDay.title} tightly connected to the candidate's previous response. Do NOT switch topics yet!`
    : `This is the 1st question on Day ${targetDay.day}. Introduce a core question on ${targetDay.title} connected to the candidate's profile/projects.`}
${nextQNum === 8 ? '- State clearly to the candidate that this is Question #8 of 8 (the final question).' : ''}
- Do NOT ask questions from any other Day on this turn!

==================================================
1. MEMORY LAYER (PREVIOUS QUESTIONS, ANSWERS, SCORES & EVALUATIONS)
==================================================
Below is the stored memory layer of all questions previously asked in this interview session, candidate's answers, scores, and short evaluation reasons:

${memoryContext}

CRITICAL MEMORY & ADAPTIVE RULES:
• NEVER REPEAT A PREVIOUS QUESTION: Review every question recorded in the memory layer above. Never repeat any question or identical question concept that has already been asked.
• EVALUATE LATEST ANSWER WITH SCORE & RATIONALE:
  For the active question ("${session.activeQuestion?.text || 'Initial Question'}"), evaluate the candidate's latest response and award an explicit numeric score from 0 to 10 along with a status and short evaluation reason:
  - 'correct' (Score 9-10): Thorough, accurate, and technically sound explanation.
  - 'mostly_correct' (Score 7-8): Good grasp with minor details missing.
  - 'minor_mistake' (Score 5-6): Answer is mostly on track but contains a minor mistake, edge-case omission, or small flaw.
  - 'partially_correct' (Score 4-5): Partial understanding; misses core mechanics or trade-offs.
  - 'incorrect' (Score 1-3): Fundamentally flawed or wrong technical reasoning.
  - 'confused' (Score 0-3): Candidate expresses confusion or asks for explanation.
  - 'clarification_requested': Candidate requested clarification or example (do not penalize or advance question count).

==================================================
2. DYNAMIC LANGUAGE & SCRIPT MATCHING (MANDATORY)
==================================================
Observe the EXACT language, script, and code-switching style used by the candidate in their latest message:
- If candidate speaks English → reply in clear, professional English.
- If candidate speaks Hindi in Devanagari script → reply in fluent Hindi in Devanagari script.
- If candidate speaks Hinglish / Hindi in Latin script → reply in natural Hinglish!
- If candidate switches languages or scripts mid-interview → adapt IMMEDIATELY and reply in their new language/script.

==================================================
3. CANDIDATE PROFILE, RESUME CONTEXT & DEMONSTRATED KNOWLEDGE
==================================================
Candidate Profile Details:
- Name: ${context.candidateProfile.name}
- Role: ${context.candidateProfile.role} (${context.candidateProfile.yearsExperience} yrs exp)
- Education: ${JSON.stringify(context.candidateProfile.education || 'N/A')}
- Key Skills: ${JSON.stringify(context.candidateProfile.skills)}
- Primary Technologies & Languages: ${JSON.stringify([...context.candidateProfile.technologies, ...context.candidateProfile.programmingLanguages])}
- Work Experience: ${JSON.stringify(context.candidateProfile.experience)}
- Projects Built/Led: ${JSON.stringify(context.candidateProfile.projects)}
- Certifications: ${JSON.stringify(context.candidateProfile.certifications)}
- Studied / Completed Curriculum Days: ${JSON.stringify(context.completedCurriculumDays.map(d => `Day ${d.day}: ${d.title}`))}

Demonstrated Knowledge & Explicit Mentions in Interview:
- Mentioned Projects: ${JSON.stringify(demonstratedContext.mentionedProjects)}
- Mentioned Technologies: ${JSON.stringify(demonstratedContext.mentionedTechnologies)}
- Demonstrated Concepts: ${JSON.stringify(demonstratedContext.demonstratedConcepts)}

==================================================
4. CONTEXTUAL UNDERSTANDING OF CANDIDATE'S MESSAGE
==================================================
- Current Question Number: #${nextQNum} of 8
- Target Day for this Question: Day ${targetDay.day} (${targetDay.title})
- Topics Covered So Far: ${JSON.stringify(session.topicsCovered)}
- Days Covered So Far: ${JSON.stringify(session.daysCovered)}
- Current Difficulty Level: ${session.currentDifficulty}
- Conversation History:
${session.conversationHistory.map((h, i) => `Turn ${i + 1} [${h.role.toUpperCase()}]: ${h.text}`).join('\n\n')}
- Candidate's Latest Message:
  "${candidateMessage || '(Candidate initiated interview)'}"

==================================================
5. STRICT QUESTION-GENERATION & RELEVANCE RULES (MANDATORY)
==================================================
Questions must be generated strictly based on:
1. The candidate's profile, including their role, experience, skills, projects, and technologies mentioned in their profile/resume.
2. The curriculum topics that the candidate is currently being interviewed on (Day ${targetDay.day}: "${targetDay.title}").
3. Any projects, work experience, or technologies that the candidate has explicitly mentioned or demonstrated knowledge of during the interview.
4. The concepts already tested in earlier questions.

The interviewer MUST NOT ask random questions that are unrelated to the candidate's profile, experience, skills, projects, or the relevant curriculum topic.

==================================================
6. ANTI-REPETITION & QUESTION ANGLE VARIATION (CRITICAL)
==================================================
• DO NOT REPEAT THE SAME QUESTION PATTERN, WORDING, OR EVALUATION ANGLE ACROSS QUESTIONS.
• Never ask essentially the same question twice, even if the phrasing is different.
• Before generating Question #${nextQNum}, review ALL previous questions in the Memory Layer. Reject any question that tests the same concept, skill, or reasoning angle.
• Each question MUST introduce a NEW assessment dimension.

BANNED GENERIC PATTERNS - NEVER REPEAT THESE:
- Do NOT repeatedly ask "What trade-offs guide your setup?"
- Do NOT repeatedly ask "What architectural principles guide your setup?"
- Do NOT repeatedly ask "How would you handle scalability?"
- Do NOT repeatedly ask "How would you design this?"

VARY THE QUESTION TYPE AND REASONING ANGLE ACROSS THE 8 QUESTIONS:
- Conceptual: e.g., "Why are embeddings useful in semantic search?" or "What mechanism determines index resolution in ${targetDay.title}?"
- Scenario-based: e.g., "Suppose retrieval is returning irrelevant chunks after an index update. What would you investigate first?"
- Debugging / Root Cause: e.g., "Your vector search suddenly returns high latency or empty payloads under concurrency. How would you diagnose it?"
- System Design: e.g., "How would you structure metadata filtering and state partitioning in a RAG pipeline?"
- Comparison: e.g., "When would you choose one vector indexing or chunking strategy over another in production?"
- Practical & Metrics: e.g., "How would you evaluate and benchmark whether your embedding model is meeting accuracy and latency SLAs?"
- Failure-based: e.g., "What subtle edge case or memory bottleneck could cause this service to degrade under high ingestion?"
- Candidate-profile-based: Connect to a specific technology or project explicitly stated in the candidate's resume/profile.

• STRICT NO-ELABORATION RULE:
- Do not ask the candidate to "elaborate" unless their previous answer is genuinely incomplete.
- Ask a direct question based on what the candidate has already answered.
- The interview should feel like a natural technical conversation, NOT a fixed questionnaire.

==================================================
7. GENERATE THE NEXT INTERVIEW QUESTION DIRECTLY:
==================================================
- Generate Question #${nextQNum} of 8 on Day ${targetDay.day}: "${targetDay.title}".
- Formulate this question with a distinct reasoning angle that has NOT been used in previous turns.
- Keep the candidate's exact language/script (English / Hinglish / Hindi).
`;

  const response: any = await generateContentWithFallback(ai, {
    contents: prompt,
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          internalUnderstanding: {
            type: Type.OBJECT,
            properties: {
              detectedLanguage: { type: Type.STRING, description: 'Language/script detected e.g. English, Hinglish, Hindi' },
              candidateIntent: { type: Type.STRING },
              semanticMeaning: { type: Type.STRING },
              isAnsweringActiveQuestion: { type: Type.BOOLEAN },
              specificPointsMentioned: { type: Type.ARRAY, items: { type: Type.STRING } },
              conceptsUnderstood: { type: Type.ARRAY, items: { type: Type.STRING } },
              conceptsMisunderstood: { type: Type.ARRAY, items: { type: Type.STRING } },
              candidateInteractionType: { type: Type.STRING },
              keyInformationExtracted: { type: Type.STRING },
              recommendedAction: { type: Type.STRING },
            },
            required: [
              'detectedLanguage',
              'candidateIntent',
              'semanticMeaning',
              'isAnsweringActiveQuestion',
              'candidateInteractionType',
              'keyInformationExtracted',
              'recommendedAction',
            ],
          },
          nextTurn: {
            type: Type.OBJECT,
            properties: {
              reply: { type: Type.STRING, description: 'Natural conversational response spoken directly to candidate in their language/script.' },
              curriculumDay: { type: Type.INTEGER },
              topic: { type: Type.STRING },
              isFollowUp: { type: Type.BOOLEAN },
              shouldAdvanceQuestionCount: { type: Type.BOOLEAN },
              reasoningAngle: {
                type: Type.STRING,
                description: 'The distinct reasoning angle for this question: conceptual, scenario_based, debugging, comparison, practical_evaluation, failure_analysis, system_design, or candidate_profile'
              },
              newAssessmentDimension: {
                type: Type.STRING,
                description: 'The fresh technical competency or dimension tested in this turn.'
              },
            },
            required: ['reply', 'curriculumDay', 'topic', 'isFollowUp', 'shouldAdvanceQuestionCount'],
          },
          answerEvaluation: {
            type: Type.OBJECT,
            properties: {
              score: { type: Type.INTEGER, description: 'Score from 0 to 10 evaluating the candidate\'s latest answer.' },
              status: {
                type: Type.STRING,
                description: 'Status: correct, mostly_correct, minor_mistake, partially_correct, incorrect, confused, or clarification_requested'
              },
              reason: { type: Type.STRING, description: 'Short 1-2 sentence evaluation/reason for the score given.' },
              conceptsDemonstrated: { type: Type.ARRAY, items: { type: Type.STRING } },
              conceptsMissingOrFlawed: { type: Type.ARRAY, items: { type: Type.STRING } },
              understandingLevel: { type: Type.STRING },
              isClarificationRequest: { type: Type.BOOLEAN },
              isOffTopic: { type: Type.BOOLEAN },
              isAnswered: { type: Type.BOOLEAN },
              difficultyRecommendation: { type: Type.STRING },
            },
            required: ['score', 'status', 'reason', 'understandingLevel', 'isClarificationRequest', 'isOffTopic', 'isAnswered', 'difficultyRecommendation'],
          },
        },
        required: ['internalUnderstanding', 'nextTurn', 'answerEvaluation'],
      },
    },
  });

  const parsed = JSON.parse(cleanJsonText(response.text || '{}'));
  const nextTurn = parsed.nextTurn;
  const answerEval = parsed.answerEvaluation;

  if (!nextTurn || !nextTurn.reply) {
    throw new Error('Invalid JSON structure returned by Gemini API');
  }

  // FORCE OVERRIDE DAY AND TOPIC TO ENSURE STRICT MAPPING TO THE 4 DAYS
  nextTurn.curriculumDay = targetDay.day;
  nextTurn.topic = targetDay.title;

  if (candidateMessage && answerEval) {
    const memoryRecord: QuestionMemoryItem = {
      id: `mem_${Date.now()}_${session.memoryLayer.length + 1}`,
      questionNumber: session.questionsAsked || 1,
      question: session.activeQuestion?.text || 'Initial Question',
      topic: session.activeQuestion?.topic || targetDay.title,
      curriculumDay: session.activeQuestion?.curriculumDay || targetDay.day,
      difficulty: session.activeQuestion?.difficulty || session.currentDifficulty,
      candidateAnswer: candidateMessage,
      score: typeof answerEval.score === 'number' ? Math.max(0, Math.min(10, answerEval.score)) : 7,
      status: (answerEval.status as any) || (answerEval.understandingLevel as any) || 'partially_correct',
      reason: answerEval.reason || parsed.internalUnderstanding?.semanticMeaning || 'Evaluated candidate answer based on technical depth and accuracy.',
      conceptsDemonstrated: answerEval.conceptsDemonstrated || parsed.internalUnderstanding?.conceptsUnderstood || [],
      conceptsMissingOrFlawed: answerEval.conceptsMissingOrFlawed || parsed.internalUnderstanding?.conceptsMisunderstood || [],
      timestamp: Date.now(),
    };
    session.memoryLayer.push(memoryRecord);

    if (!session.evaluationHistory) session.evaluationHistory = [];
    session.evaluationHistory.push({
      turnNumber: session.conversationHistory.length,
      answerStatus: answerEval.understandingLevel || 'partial',
      isClarificationRequest: !!answerEval.isClarificationRequest,
      isOffTopic: !!answerEval.isOffTopic,
      isAnswered: !!answerEval.isAnswered,
      conceptsUnderstood: memoryRecord.conceptsDemonstrated || [],
      conceptsMissing: memoryRecord.conceptsMissingOrFlawed || [],
      feedbackComment: `Score: ${memoryRecord.score}/10 (${memoryRecord.status}) - ${memoryRecord.reason}`,
    });

    if (candidateMessage) {
      session.questionsAsked += 1;
      if (!session.daysCovered.includes(targetDay.day)) {
        session.daysCovered.push(targetDay.day);
      }
      if (!session.topicsCovered.includes(targetDay.title)) {
        session.topicsCovered.push(targetDay.title);
      }
    }

    if (answerEval.difficultyRecommendation === 'harder') {
      session.currentDifficulty = 'hard';
    } else if (answerEval.difficultyRecommendation === 'easier') {
      session.currentDifficulty = 'easy';
    } else {
      session.currentDifficulty = 'medium';
    }
  } else if (!candidateMessage) {
    if (!session.daysCovered.includes(targetDay.day)) {
      session.daysCovered.push(targetDay.day);
    }
    if (!session.topicsCovered.includes(targetDay.title)) {
      session.topicsCovered.push(targetDay.title);
    }
    session.questionsAsked = 1;
  }

  session.conversationHistory.push({
    role: 'interviewer',
    text: nextTurn.reply,
    dayCovered: targetDay.day,
    topic: targetDay.title,
  });

  session.activeQuestion = {
    text: nextTurn.reply,
    topic: targetDay.title,
    curriculumDay: targetDay.day,
    difficulty: session.currentDifficulty,
  };



  return {
    reply: nextTurn.reply,
    done: false,
    questionNumber: session.questionsAsked,
    daysCoveredCount: session.daysCovered.length,
    currentDayTitle: targetDay.title,
    topic: targetDay.title,
    curriculumDay: targetDay.day,
    isFollowUp: nextTurn.isFollowUp,
    isClarificationRequest: answerEval?.isClarificationRequest,
    isOffTopic: answerEval?.isOffTopic,
    currentDifficulty: session.currentDifficulty,
  };
}

async function generateGeminiFinalFeedback(session: InterviewSession): Promise<FinalFeedback> {
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
      retryOptions: {
        attempts: 1,
      },
    },
  });
  const context = getCandidateCurriculumContext(session.candidate);

  const prompt = `
Generate an in-depth, personalized Performance Report for candidate ${context.candidateProfile.name} (${context.candidateProfile.role}, ${context.candidateProfile.yearsExperience} yrs exp) based strictly on their actual technical interview transcript.

Candidate Profile & Experience:
- Listed Skills: ${JSON.stringify(context.candidateProfile.skills)}
- Primary Technologies: ${JSON.stringify(context.candidateProfile.technologies)}
- Projects Led/Built: ${JSON.stringify(context.candidateProfile.projects)}
- Completed Missions/Curriculum Days: ${JSON.stringify(context.completedCurriculumDays, null, 2)}
- Days Covered in Session: ${JSON.stringify(session.daysCovered)} (${session.daysCovered.length} days)
- Topics Discussed: ${JSON.stringify(session.topicsCovered)}
- Total Questions Asked & Answered: ${session.questionsAsked}

Memory Layer Records (Questions, Answers, Scores & Evaluations):
${formatMemoryContext(session.memoryLayer)}

Turn-by-Turn Evaluation History:
${JSON.stringify(session.evaluationHistory || [], null, 2)}

Full Interview Transcript:
${session.conversationHistory.map((h, i) => `Turn ${i + 1} [${h.role.toUpperCase()}]: ${h.text}`).join('\n\n')}

CRITICAL EVALUATION INSTRUCTIONS:
1. "summary": Provide a clear, 2-3 sentence executive evaluation of their technical depth, problem-solving, and communication demonstrated during THIS specific interview transcript.
2. "strengths": List 3-5 specific strengths derived directly from technical concepts, architecture choices, or trade-offs they correctly explained during the session.
3. "gaps": List 2-4 specific technical gaps, misconceptions, or areas where they struggled or gave incomplete/incorrect/non-answers/skipped questions during the interview.
4. "next": List 3 actionable, highly specific recommendations for their career growth and technical skill refinement based on the gaps identified.
5. "overallScore": Calculate a realistic, strictly calibrated overall score (10-98) based on their actual answers in the transcript:
   - ONLY correct and partially correct answers should contribute positively to the score.
   - Wrong / incorrect answers should reduce performance accordingly.
   - Skipped questions ("I don't know", pass, skip, or unanswered) should also reduce performance accordingly.
   - If the candidate gave incorrect answers or skipped questions, the score MUST reflect this reduction (e.g. 15-45 out of 100).
   - If the candidate gave strong, accurate, detailed answers with trade-offs across all questions, assign high scores (85-98 out of 100).
6. "competencies": Provide calibrated 10-99 scores matching their true answer quality:
   - technicalUnderstanding: Depth of knowledge on covered topics (10-99)
   - problemSolving: Handling edge cases, scale, and trade-offs (10-98)
   - engineeringDecision: System design choices, technology selection, and architecture reasoning (10-97)
   - communication: Clarity of explanations and responsive back-and-forth dialogue (15-98)
`;

  const response = await generateContentWithFallback(ai, {
    contents: prompt,
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          summary: { type: Type.STRING },
          strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
          gaps: { type: Type.ARRAY, items: { type: Type.STRING } },
          next: { type: Type.ARRAY, items: { type: Type.STRING } },
          overallScore: { type: Type.INTEGER },
          competencies: {
            type: Type.OBJECT,
            properties: {
              technicalUnderstanding: { type: Type.INTEGER },
              problemSolving: { type: Type.INTEGER },
              engineeringDecision: { type: Type.INTEGER },
              communication: { type: Type.INTEGER },
            },
            required: ['technicalUnderstanding', 'problemSolving', 'engineeringDecision', 'communication'],
          },
        },
        required: ['summary', 'strengths', 'gaps', 'next', 'overallScore', 'competencies'],
      },
    },
  });

  const parsed = JSON.parse(cleanJsonText(response.text || '{}'));
  const localAnalysis = analyzeCandidateAnswersLocal(session.candidate, session.conversationHistory);

  return {
    ...parsed,
    overallScore: localAnalysis.overallScore,
    competencies: localAnalysis.competencies,
    breakdown: localAnalysis.breakdown,
  };
}

export async function processInterviewStep(
  session: InterviewSession,
  candidateMessage?: string
): Promise<{
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
}> {
  if (candidateMessage) {
    session.conversationHistory.push({
      role: 'candidate',
      text: candidateMessage,
    });
  }

  // If session is already completed, return existing feedback
  if (session.done && session.feedback) {
    return {
      reply: `Thank you, ${session.candidate?.member?.name || 'Candidate'}. That concludes our technical interview evaluation.`,
      done: true,
      feedback: session.feedback,
      questionNumber: session.questionsAsked,
      daysCoveredCount: session.daysCovered.length,
      topic: undefined,
      curriculumDay: undefined,
      isFollowUp: false,
      isClarificationRequest: false,
      isOffTopic: false,
      currentDifficulty: session.currentDifficulty,
    };
  }

  if (process.env.GEMINI_API_KEY && !isGeminiInCooldown()) {
    try {
      return await processGeminiInterviewStep(session, candidateMessage);
    } catch {
      return processLocalInterviewStep(session, candidateMessage);
    }
  } else {
    return processLocalInterviewStep(session, candidateMessage);
  }
}

export function analyzeCandidateAnswersLocal(
  candidate: Candidate,
  conversationHistory: { role: string; text: string; topic?: string }[]
): FinalFeedback {
  const candidateName = candidate.member.name;
  const candidateRole = candidate.member.jobRole;
  const yearsExp = candidate.member.yearsExperience;

  const qaPairs: { question: string; answer: string; topic?: string }[] = [];
  for (let i = 0; i < conversationHistory.length; i++) {
    if (conversationHistory[i].role === 'interviewer') {
      const question = conversationHistory[i].text;
      const topic = conversationHistory[i].topic;
      let answer = '';
      if (i + 1 < conversationHistory.length && (conversationHistory[i + 1].role as string) !== 'interviewer') {
        answer = conversationHistory[i + 1].text;
      }
      qaPairs.push({ question, answer: answer || '(No answer provided)', topic });
    }
  }

  const clarificationRegex = /\b(don't understand|dont understand|didn't understand|rephrase|repeat|what do you mean|clarify|can you explain|what does that mean)\b/i;
  const dontKnowRegex = /\b(don't know|dont know|not sure|no idea|pass|no clue|idk|skip|skipped|skipping|dunno|haven't studied|havent studied|nothing|none|n\/a|pata nahi|maloom nahi|unsure|no answer|leave this|next question|next)\b/i;

  let correctCount = 0;
  let partiallyCorrectCount = 0;
  let incorrectCount = 0;
  let skippedCount = 0;
  let irrelevantCount = 0;

  const questionEvaluations: QuestionEvaluationDetail[] = [];
  const strengths: string[] = [];
  const gaps: string[] = [];
  const next: string[] = [];

  let totalScoredWords = 0;
  let scoredTurnCount = 0;
  let totalScorePoints = 0;
  let tradeoffHits = 0;
  let totalTechPoints = 0;
  let totalProbPoints = 0;
  let totalEngPoints = 0;
  let totalCommPoints = 0;

  qaPairs.forEach((pair, idx) => {
    const qNum = idx + 1;
    const topicLabel = pair.topic || `Topic ${qNum}`;
    const answerText = (pair.answer || '').trim();
    const lower = answerText.toLowerCase();
    const words = answerText.split(/\s+/).filter(Boolean);

    if (clarificationRegex.test(lower)) {
      return;
    }

    const isExplicitDontKnow = dontKnowRegex.test(lower);
    const isUnansweredOrSkipped =
      !answerText ||
      answerText === '(No answer provided)' ||
      answerText === '(Candidate skipped question)' ||
      (isExplicitDontKnow && words.length < 15) ||
      lower === 'skip' ||
      lower === 'skipped' ||
      lower === 'pass' ||
      lower === 'next';

    const techHits = TECHNICAL_ONTOLOGY.filter((k) => lower.includes(k)).length;
    const hasTradeoff = TRADEOFF_KEYWORDS.some((k) => lower.includes(k));

    if (isUnansweredOrSkipped) {
      // RULE: Skipped question -> 0 positive credit; reduces overall performance score accordingly
      skippedCount++;
      questionEvaluations.push({
        questionNumber: qNum,
        questionText: pair.question,
        candidateAnswer: (!answerText || answerText === '(No answer provided)') ? '(No answer provided - Question Skipped)' : answerText,
        classification: 'skipped',
        score: 0,
        topic: topicLabel,
        feedbackNote: `Question skipped / no answer provided; reduced overall performance score.`,
      });
      gaps.push(`Skipped question on ${topicLabel}`);
      return;
    }

    // Is it irrelevant / meaningless?
    if (techHits === 0 && words.length < 4) {
      irrelevantCount++;
      questionEvaluations.push({
        questionNumber: qNum,
        questionText: pair.question,
        candidateAnswer: answerText,
        classification: 'irrelevant',
        score: 0,
        topic: topicLabel,
        feedbackNote: `Answer lacked relevant technical content ("${answerText.slice(0, 30)}..."); reduced overall score.`,
      });
      gaps.push(`Irrelevant or non-technical response on ${topicLabel}`);
      scoredTurnCount++;
      totalScoredWords += words.length;
      return;
    }

    // Scored turns
    scoredTurnCount++;
    totalScoredWords += words.length;
    if (hasTradeoff) tradeoffHits++;

    let qTech = 0;
    let qProb = 0;
    let qEng = 0;
    let qComm = 0;

    if (words.length >= 18 && techHits >= 2) {
      correctCount++;
      questionEvaluations.push({
        questionNumber: qNum,
        questionText: pair.question,
        candidateAnswer: answerText,
        classification: 'correct',
        score: 100,
        topic: topicLabel,
        feedbackNote: `Strong, accurate response with solid domain reasoning (100%).`,
      });
      strengths.push(`Solid technical depth on ${topicLabel}`);
    } else if (words.length >= 8 || techHits >= 1) {
      partiallyCorrectCount++;
      questionEvaluations.push({
        questionNumber: qNum,
        questionText: pair.question,
        candidateAnswer: answerText,
        classification: 'partially_correct',
        score: 50,
        topic: topicLabel,
        feedbackNote: `Partially correct answer (50%); missed some trade-offs.`,
      });
    } else {
      incorrectCount++;
      questionEvaluations.push({
        questionNumber: qNum,
        questionText: pair.question,
        candidateAnswer: answerText,
        classification: 'incorrect',
        score: 0,
        topic: topicLabel,
        feedbackNote: `Incorrect technical reasoning (0%).`,
      });
      gaps.push(`Incorrect technical reasoning on ${topicLabel}`);
    }

    // 1. Technical Understanding (0 - 100 per question)
    if (techHits >= 3 && words.length >= 18) {
      qTech = 100;
    } else if (techHits >= 2 && words.length >= 12) {
      qTech = 85;
    } else if (techHits >= 1) {
      qTech = 60;
    } else if (words.length >= 12) {
      qTech = 35;
    } else {
      qTech = 15;
    }

    // 2. Problem Solving & Reasoning (0 - 100 per question)
    const reasoningHits = REASONING_KEYWORDS.filter((k) => lower.includes(k)).length;
    const hasCausal = ['because', 'since', 'therefore', 'due to', 'leads to', 'result', 'reason'].some((k) => lower.includes(k));
    const hasTroubleshoot = ['debug', 'troubleshoot', 'root cause', 'diagnose', 'investigate', 'mitigate', 'edge case', 'failure', 'fallback', 'retry'].some((k) => lower.includes(k));

    if ((reasoningHits >= 3 || (hasCausal && hasTroubleshoot)) && words.length >= 18) {
      qProb = 100;
    } else if (reasoningHits >= 2 || hasCausal || hasTroubleshoot) {
      qProb = 80;
    } else if (reasoningHits >= 1) {
      qProb = 55;
    } else if (words.length >= 12) {
      qProb = 35;
    } else {
      qProb = 15;
    }

    // 3. Engineering Decision-Making (0 - 100 per question)
    const engHits = ENGINEERING_KEYWORDS.filter((k) => lower.includes(k)).length;
    const hasExplicitDecision = ['tradeoff', 'trade-off', 'vs', 'versus', 'instead of', 'prefer', 'chose', 'choose', 'compromise'].some((k) => lower.includes(k));
    const hasConstraint = ['latency', 'scale', 'scalability', 'throughput', 'cost', 'memory', 'cpu', 'p99', 'sla', 'bottleneck', 'production', 'architecture', 'sharding', 'cache'].some((k) => lower.includes(k));

    if (hasExplicitDecision && hasConstraint && words.length >= 18) {
      qEng = 100;
    } else if (hasExplicitDecision || (engHits >= 2 && hasConstraint)) {
      qEng = 85;
    } else if (engHits >= 1 || hasConstraint) {
      qEng = 55;
    } else if (words.length >= 12) {
      qEng = 30;
    } else {
      qEng = 15;
    }

    // 4. Communication & Trade-off Articulation (0 - 100 per question)
    const commHits = COMMUNICATION_KEYWORDS.filter((k) => lower.includes(k)).length;
    const hasStructure = answerText.includes('\n') || answerText.includes('1.') || answerText.includes('- ') || answerText.includes('•') || answerText.includes('```') || answerText.includes(':');

    if ((hasStructure || commHits >= 2) && words.length >= 25) {
      qComm = 100;
    } else if (words.length >= 18 && (hasStructure || commHits >= 1)) {
      qComm = 85;
    } else if (words.length >= 12) {
      qComm = 65;
    } else if (words.length >= 6) {
      qComm = 40;
    } else {
      qComm = 20;
    }

    totalTechPoints += qTech;
    totalProbPoints += qProb;
    totalEngPoints += qEng;
    totalCommPoints += qComm;
  });

  // Fixed total of 8 interview questions. Denominator must ALWAYS be 8.
  const TOTAL_INTERVIEW_QUESTIONS = 8;
  const totalEarnedPoints = questionEvaluations.reduce((sum, q) => sum + (typeof q.score === 'number' ? q.score : 0), 0);
  const overallScore = Math.round((totalEarnedPoints / TOTAL_INTERVIEW_QUESTIONS) * 10) / 10;

  const technicalUnderstanding = Math.round((totalTechPoints / TOTAL_INTERVIEW_QUESTIONS) * 10) / 10;
  const problemSolving = Math.round((totalProbPoints / TOTAL_INTERVIEW_QUESTIONS) * 10) / 10;
  const engineeringDecision = Math.round((totalEngPoints / TOTAL_INTERVIEW_QUESTIONS) * 10) / 10;
  const communication = Math.round((totalCommPoints / TOTAL_INTERVIEW_QUESTIONS) * 10) / 10;

  if (strengths.length === 0) {
    if (correctCount > 0) strengths.push('Demonstrated strong domain understanding on core questions.');
    else strengths.push('Active participation and structured responses during questioning.');
  }

  if (gaps.length === 0) {
    if (skippedCount > 0) gaps.push(`Skipped ${skippedCount} question(s) ("I don't know"); recommend reviewing these specific topics.`);
    else gaps.push('Can further expand on multi-region failover and distributed edge cases.');
  }

  if (incorrectCount > 0 || skippedCount > 0) {
    next.push('Review Weak & Skipped Topics');
  }
  if (next.length < 2) next.push('Production Deployment & Latency Optimization');
  if (next.length < 3) next.push('Distributed System Architecture');

  const summary = `${candidateName} (${candidateRole}, ${yearsExp} yrs exp) completed evaluation. Results: ${correctCount} correct, ${partiallyCorrectCount} partially correct, ${incorrectCount} incorrect, ${skippedCount} skipped ("I don't know"), ${irrelevantCount} irrelevant. Overall score: ${overallScore}/100 calculated strictly from evaluated answers.`;

  return {
    summary,
    strengths: strengths.slice(0, 4),
    gaps: gaps.slice(0, 4),
    next: next.slice(0, 3),
    overallScore,
    competencies: {
      technicalUnderstanding,
      problemSolving,
      engineeringDecision,
      communication,
    },
    breakdown: {
      correctCount,
      partiallyCorrectCount,
      incorrectCount,
      skippedCount,
      irrelevantCount,
      questionEvaluations,
    },
  };
}

export async function generateFinalFeedback(session: InterviewSession): Promise<FinalFeedback> {
  if (process.env.GEMINI_API_KEY && !isGeminiInCooldown()) {
    try {
      return await generateGeminiFinalFeedback(session);
    } catch {
      return analyzeCandidateAnswersLocal(session.candidate, session.conversationHistory);
    }
  }
  return analyzeCandidateAnswersLocal(session.candidate, session.conversationHistory);
}
