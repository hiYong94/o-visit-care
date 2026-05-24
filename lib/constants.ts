export const SITE_NAME = "오뚜기방문재활운동센터";
export const PHONE = "010-7749-1655";
export const EMAIL = "info@o-visit-care.com";
export const KAKAO_LINK = "https://open.kakao.com/o/your-openchat-link";

export const MEDICAL_DISCLAIMER = [
  "본 센터는 의료기관이 아니며, 진단·처방·치료를 제공하지 않습니다.",
  "의료기관에서 진단받으신 분들의 일상생활 회복과 건강증진을 위한 재활운동·훈련 서비스를 제공합니다.",
] as const;

export const PROGRAMS = [
  {
    icon: "🧠",
    title: "뇌질환 재활 운동",
    description:
      "뇌졸중, 뇌경색, 뇌출혈 등 뇌질환 환자를 위한 전문 재활 운동 프로그램",
    value: "brain",
  },
  {
    icon: "🦴",
    title: "척추·관절 재활 운동",
    description: "허리디스크, 척추협착증, 인공관절 수술 후 재활운동",
    value: "spine",
  },
  {
    icon: "💪",
    title: "근력 강화 운동",
    description: "노인 근감소증 예방 및 일상생활 기능 회복 프로그램",
    value: "strength",
  },
  {
    icon: "🍽️",
    title: "연하장애 재활 운동",
    description: "삼킴 장애 개선을 위한 전문 연하재활 운동 치료",
    value: "swallowing",
  },
  {
    icon: "👶",
    title: "소아 재활 운동",
    description: "사경, 발달지연, 뇌손상 아동을 위한 맞춤 재활 운동",
    value: "pediatric",
  },
  {
    icon: "🎯",
    title: "맞춤형 케어 운동",
    description: "개인의 상태와 목표에 맞춘 1:1 재활 운동 설계",
    value: "custom",
  },
] as const;

export const CONSULTATION_PROGRAM_OPTIONS = [
  ...PROGRAMS,
  {
    title: "기타",
    value: "other",
  },
] as const;

export const PROCESS_STEPS = [
  {
    step: 1,
    title: "상담 신청",
    description: "전화 또는 카카오톡으로 상담을 신청합니다",
  },
  {
    step: 2,
    title: "방문 평가",
    description:
      "원장님이 직접 방문하여 돌봄대상자의 상태를 파악하고 대면 상담을 진행합니다",
  },
  {
    step: 3,
    title: "재활 시작",
    description:
      "원장님의 맞춤형 재활 프로그램으로 정기적인 방문 재활을 시작합니다",
  },
] as const;

export const DIRECTOR_SPECIALTIES = [
  "뇌질환 전문 재활",
  "뇌졸중/뇌출혈/파킨슨/혈관성 치매",
  "관절 척추 수술 후 재활",
  "선천성/희귀 난치성 질환 재활",
  "노인 활동 기능회복",
] as const;

export const DIRECTOR_CAREER = [
  "과) 삼육대학원 물리치료학과 석사",
  "졸) 대전보건대 물리치료과",
  "현) 재활평가 분점 대표",
  "현) 국제재활운동필라테스협회장",
  "현) 오뚜기방문재활운동센터 대표",
  "전) 성화대전요양병원 운동치료팀장",
  "전) 청주바른신경외과 도수치료팀장",
  "전) 가천대 인천길병원 물리치료실",
  "전) 삼육재단장애인복지관 운동치료실장",
  "전) 강남더재활클리닉 원장",
] as const;

export const DIRECTOR_ACTIVITIES = [
  "대한물리치료사협회",
  "성인 한국Bobath 학회",
  "소아 한국Bobath 학회",
  "한국보이타협회 서울시회",
  "대한PNF학회",
  "대한심호흡물리치료학회",
  "대한전동물리치료학회",
  "한국치매협회",
  "KCI 대한카이로프랙틱학회",
  "국제카이로프랙틱협회",
  "중국 선전시 중의사대상 한국 추나 강의",
] as const;

export const REGIONS = [
  "서울",
  "경기",
  "인천",
  "강원",
  "충북",
  "충남",
  "대전",
  "세종",
  "경북",
  "경남",
  "대구",
  "울산",
  "부산",
  "전북",
  "전남",
  "광주",
  "제주",
] as const;

export const CALL_TIME_OPTIONS = [
  { value: "morning", label: "오전 (10:00-12:00)" },
  { value: "afternoon", label: "오후 (13:00-17:00)" },
  { value: "evening", label: "저녁 (17:00-20:00)" },
  { value: "anytime", label: "상관없음" },
] as const;
