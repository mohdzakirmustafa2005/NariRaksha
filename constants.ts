import { Complaint, ComplaintStatus } from './types';

export const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi"
];

export const MOCK_COMPLAINTS: Complaint[] = [
  {
    id: "NR-2023-8821",
    applicantName: "Sunita Sharma",
    applicantRelation: "Mother",
    victimName: "Priya Sharma",
    accusedName: "Rahul Verma",
    district: "Lucknow",
    state: "Uttar Pradesh",
    status: ComplaintStatus.UNDER_VERIFICATION,
    dateFiled: "2023-10-24",
    description: "Demanding 10 Lakhs cash post marriage.",
    evidenceCount: 3,
    policeStation: "Mahila Thana Lucknow"
  },
  {
    id: "NR-2023-9902",
    applicantName: "Anjali Desai",
    applicantRelation: "Self",
    victimName: "Anjali Desai",
    accusedName: "Vikram Mehta",
    district: "Mumbai Suburban",
    state: "Maharashtra",
    status: ComplaintStatus.ACTION_TAKEN,
    dateFiled: "2023-10-20",
    description: "Physical harassment for car demand.",
    evidenceCount: 5,
    policeStation: "Bandra Police Station"
  },
  {
    id: "NR-2023-7712",
    applicantName: "Ramesh Gupta",
    applicantRelation: "Father",
    victimName: "Sneha Gupta",
    accusedName: "Amit Bansal",
    district: "Jaipur",
    state: "Rajasthan",
    status: ComplaintStatus.SUBMITTED,
    dateFiled: "2023-10-26",
    description: "Threatening messages received regarding dowry.",
    evidenceCount: 2
  }
];