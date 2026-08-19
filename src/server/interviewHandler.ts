import { getOrCreateSession } from './sessionStore';
import {
  processInterviewStep,
  generateFinalFeedback,
  processLocalInterviewStep,
  analyzeCandidateAnswersLocal,
} from './aiService';

export interface InterviewLogicResponse {
  status: number;
  data: any;
}

export async function handleInterviewLogic(body: any): Promise<InterviewLogicResponse> {
  const { sessionId, candidate, message, chatHistory, forceEvaluate } = body || {};

  const effectiveSessionId = sessionId || `sess_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

  let session;
  try {
    session = getOrCreateSession(effectiveSessionId, candidate);
  } catch (err: any) {
    console.error('Error creating session, using fallback session:', err);
    session = getOrCreateSession(effectiveSessionId, undefined);
  }

  // If client supplied chatHistory, sync it into session.conversationHistory
  if (Array.isArray(chatHistory) && chatHistory.length > 0) {
    const validMsgs = chatHistory.filter((m: any) => m.sender !== 'system' && m.text);
    session.conversationHistory = validMsgs.map((m: any) => ({
      role: m.sender === 'ai' ? 'interviewer' : 'candidate',
      text: m.text,
      dayCovered: m.curriculumDay,
      topic: m.topic,
    }));

    // Recalculate covered days and topics if needed
    validMsgs.forEach((m: any) => {
      if (m.curriculumDay && !session.daysCovered.includes(m.curriculumDay)) {
        session.daysCovered.push(m.curriculumDay);
      }
      if (m.topic && !session.topicsCovered.includes(m.topic)) {
        session.topicsCovered.push(m.topic);
      }
    });
  }

  const msgTrim = typeof message === 'string' ? message.trim().toLowerCase() : '';
  const isConcludeRequest =
    forceEvaluate ||
    msgTrim === 'conclude interview' ||
    msgTrim === 'generate report' ||
    msgTrim === 'finish interview';

  if (isConcludeRequest) {
    try {
      const feedback = await generateFinalFeedback(session);
      session.done = true;
      session.feedback = feedback;
      return {
        status: 200,
        data: {
          reply: `Thank you, ${session.candidate?.member?.name || 'Candidate'}. That concludes our technical interview evaluation.`,
          done: true,
          feedback: session.feedback,
          questionNumber: session.questionsAsked,
          daysCoveredCount: session.daysCovered.length,
        },
      };
    } catch {
      const feedback = analyzeCandidateAnswersLocal(session.candidate, session.conversationHistory);
      session.done = true;
      session.feedback = feedback;
      return {
        status: 200,
        data: {
          reply: `Thank you, ${session.candidate?.member?.name || 'Candidate'}. That concludes our technical interview evaluation.`,
          done: true,
          feedback,
          questionNumber: session.questionsAsked,
          daysCoveredCount: session.daysCovered.length,
        },
      };
    }
  }

  // If session is already completed, return existing feedback
  if (session.done && session.feedback) {
    return {
      status: 200,
      data: {
        reply: 'Interview completed.',
        done: true,
        feedback: session.feedback,
        questionNumber: session.questionsAsked,
        daysCoveredCount: session.daysCovered.length,
      },
    };
  }

  try {
    const result: any = await processInterviewStep(session, message);
    return {
      status: 200,
      data: {
        reply: result.reply,
        done: result.done,
        feedback: result.feedback,
        questionNumber: result.questionNumber ?? session.questionsAsked,
        daysCoveredCount: result.daysCoveredCount ?? session.daysCovered.length,
        topic: result.topic,
        curriculumDay: result.curriculumDay,
        isFollowUp: result.isFollowUp,
        isClarificationRequest: result.isClarificationRequest,
        isOffTopic: result.isOffTopic,
        currentDifficulty: result.currentDifficulty ?? session.currentDifficulty,
      },
    };
  } catch {
    try {
      const result: any = processLocalInterviewStep(session, message);
      return {
        status: 200,
        data: {
          reply: result.reply,
          done: result.done,
          feedback: result.feedback,
          questionNumber: result.questionNumber ?? session.questionsAsked,
          daysCoveredCount: result.daysCoveredCount ?? session.daysCovered.length,
          topic: result.topic,
          curriculumDay: result.curriculumDay,
          isFollowUp: result.isFollowUp,
          isClarificationRequest: result.isClarificationRequest,
          isOffTopic: result.isOffTopic,
          currentDifficulty: result.currentDifficulty ?? session.currentDifficulty,
        },
      };
    } catch (fallbackErr: any) {
      return {
        status: 200,
        data: {
          reply: 'Thank you for your answer. Moving forward: how do you optimize latency and resource usage in your deployment?',
          done: false,
          questionNumber: session.questionsAsked || 1,
          daysCoveredCount: session.daysCovered.length || 1,
          topic: 'System Performance',
          curriculumDay: 7,
          isFollowUp: false,
        },
      };
    }
  }
}
