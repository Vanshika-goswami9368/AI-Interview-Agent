import { InterviewSession, Candidate } from '../types';
import { candidatesData } from '../data/candidatesData';

const sessions = new Map<string, InterviewSession>();

export function getOrCreateSession(sessionId: string, candidate?: Candidate): InterviewSession {
  let session = sessions.get(sessionId);
  if (!session) {
    const fallbackCandidate = (candidatesData as unknown as Candidate[])[0];
    const effectiveCandidate = candidate || fallbackCandidate;
    if (!effectiveCandidate) {
      throw new Error(`Session ${sessionId} not found and no candidate provided.`);
    }
    session = {
      sessionId,
      candidate: effectiveCandidate,
      conversationHistory: [],
      memoryLayer: [],
      questionsAsked: 0,
      daysCovered: [],
      topicsCovered: [],
      currentDifficulty: 'adaptive',
      done: false,
      createdAt: Date.now(),
      lastActiveAt: Date.now(),
    };
    sessions.set(sessionId, session);
  } else {
    session.lastActiveAt = Date.now();
    if (candidate) {
      session.candidate = candidate;
    }
  }
  return session;
}

export function getSession(sessionId: string): InterviewSession | undefined {
  return sessions.get(sessionId);
}

export function updateSession(session: InterviewSession): void {
  session.lastActiveAt = Date.now();
  sessions.set(session.sessionId, session);
}

export function listSessions(): InterviewSession[] {
  return Array.from(sessions.values());
}
