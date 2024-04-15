//======== Used in redux/room_mate and redux/user========
export type FieldType = {
  name?: string;
  label: string;
  value: string;
  disabled: boolean;
};

export type RoommateType = {
  HMId: string;
  HMEmail: string;
  HMFirstname: string;
  HMUsername: string;
  HMPhone: string;
  HMEthinicity: string;
  HMNationality: string;
  HMReligion: string;
  HMRelationship: string;
  HMAge: string;
  HMGender: string;
  HMProfession: string;
  HMType: string;
  HMPets: string;
  HMImage: string;
  HMBio: string;
  HMEducation: string;
  HMLikes: string;
  HMDislikes: string;
  HMLastname: string;
  HMIsverified: string;
};