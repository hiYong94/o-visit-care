export type ConsultationPayload = {
  name: string;
  phone: string;
  patientGender: string;
  patientBirthdate: string;
  patientBirthdateYymmdd: string;
  program: string;
  address: string;
  preferredDate: string;
  preferredTime: string;
  message?: string;
};

export type RecruitmentPayload = {
  name: string;
  birthDate: string;
  birthDateYymmdd: string;
  gender: string;
  region: string;
  preferredLocation: string;
  phone: string;
  experience?: string;
  certifications?: string;
};
