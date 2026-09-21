/** أنواع شاشة المحادثة — مطابقة لما يُرجعه /api/v1/chat */

export type PlanStepId = "understand" | "search" | "rank" | "compose" | "cite";

export interface PlanStep {
  id: PlanStepId;
  label: string;
  /** شارة الحصيلة على يسار الخطوة، إن وُجدت */
  tag?: string;
  status: "done" | "running" | "idle";
}

export interface Citation {
  id: string;
  book: string;
  author: string;
  /** الباب أو الفصل داخل الكتاب */
  chapter?: string;
  volume?: string;
  page?: string;
  hadithNumber?: string;
  /** المقطع المسترجَع حرفيًّا من المصدر */
  excerpt?: string;
  persons?: string[];
  places?: string[];
  events?: string[];
  footnotes?: string[];
}

export interface UserMessage {
  id: string;
  role: "user";
  text: string;
}

export interface AssistantMessage {
  id: string;
  role: "assistant";
  /** نصّ الإجابة بصيغة Markdown مبسّطة */
  body: string;
  plan: PlanStep[];
  citations: Citation[];
  feedback?: "up" | "down";
}

export type Message = UserMessage | AssistantMessage;

export interface Session {
  id: string;
  title: string;
  /** تجميع زمنيّ جاهز من الخادم */
  group: "today" | "yesterday" | "week" | "month" | "older";
}
