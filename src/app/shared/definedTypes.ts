export type agentInterface = {
  HMId: number;
  HMFirstname: string;
  HMIsverified: string;
  HMLastname: string;
  HMEmail: string;
  HMUsername: string;
  HMLink: string;
  HMType: string;
  HMImage: string;
  HMPhone: string;
  HMPhone2: string;
  HMAccountNo: string;
  HMAccountName: string;
  HMBankName: string;
  HMState: string;
  HMCity: string;
  HMProfession: string;
  HMEducation: string;
  HMLikes: string;
  HMReviews: number;
  HMRating: number;
  HMPublishes: number;
  HMSales: number;
  HMAge: string;
  HMBio: string;
  HMEthinicity: string;
  HMGender: string;
  HMNationality: string;
  HMOccupation: string;
  HMPets: string;
  HMRelationshipStatus: string;
  HMReligion: string;
  HMSchool: string;
};

export type userInterface = {
  HMFirstname: string;
  HMId: number;
  HMUsername: string;
  HMImage: string;
  HMLastname: string;
  HMType: string;
};

export type reviewsInterface = {
  HRContent: string;
  HRCreated: string;
  HRId: number;
  HRStar: number;
  HRUser: number;
  HMFirstname: string;
  HMLastname: string;
  HMImage: string;
};

export type agentReviewInterface = {
  User: number;
  Star: number;
  Content: string;
  Created: string;
  HMFirstname: string;
  HMLastname: string;
  HMImage: string;
};

export type propertyInterface = {
  HPId: number;
  HPUser: number;
  HPTitle: string;
  HPCategory: string;
  HPDescription: string;
  HPImages: string[];
  HPState: string;
  HPCity: string;
  HPMinAFee: number;
  HPMaxAFee: number;
  HPLegalFee: number;
  HPCautionFee:number;
  HPSecurityFee:number;
  HPPrice:number;
  HPToilets: number;
  HPBedrooms: number;
  HPBathrooms: number;
  HMId: number;
  HMType: string;
  HMUsername: string;
  HMFirstname: string;
  HMLastname: string;
  HMPhone: string;
  HMPhone2: string;
  HMAccountNo: string;
  HMAccountName: string;
  HMBankName: string;
  HMState: string;
  HMCity: string;
  HMEducation: string;
  HMProfession: string;
  HMLikes: string;
  HMImage: string;
  HMReviews: number;
  HMRating: string;
  HMPublishes: number;
  HMSales: number;
  reviews: reviewsInterface[];
};

export type UpdateInterface = {
  HUserId: number,
  HUContent: string,
  HUCategory: string,
  HULocation: string,
}

export type TagAgentInterface = {
  AgentId: number,
  AgentFullName: string,
  AgentShare: number,
}