export type UserRole = 'victim' | 'police' | 'admin' | 'guest';

export enum ComplaintStatus {
  SUBMITTED = 'Submitted',
  UNDER_VERIFICATION = 'Under Verification',
  SENT_TO_POLICE = 'Sent to Police',
  ACTION_TAKEN = 'Action Taken',
  CLOSED = 'Closed'
}

export interface UserProfile {
  id: string;
  name: string;
  mobile: string;
  isAnonymous: boolean;
}

export interface EvidenceFile {
  name: string;
  type: string;
  size: number;
  timestamp: number;
}

export interface Complaint {
  id: string;
  applicantName: string;
  applicantRelation: string;
  victimName: string;
  accusedName: string;
  district: string;
  state: string;
  status: ComplaintStatus;
  dateFiled: string;
  description: string;
  evidenceCount: number;
  policeStation?: string;
  remarks?: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}