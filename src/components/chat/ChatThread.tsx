import { Avatar } from "../ui/Avatar";
import { currentUser } from "../../data/user";
import { AgentPlan } from "./AgentPlan";
import { AnswerBody } from "./AnswerBody";
import { CitationList } from "./CitationList";
import { MessageActions } from "./MessageActions";
import type { Message } from "../../types";

function UserBubble({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-2.5">
      <Avatar name={currentUser.name} src={currentUser.avatar} size={32} />
      <p className="max-w-[76%] rounded-2xl rounded-se-md bg-sand/60 px-4 py-2.5 text-[15px] leading-[1.85] text-ink">
        {text}
      </p>
    </div>
  );
}

export function ChatThread({ messages }: { messages: Message[] }) {
  return (
    <div className="mx-auto flex w-full max-w-[46rem] flex-col gap-6 px-5 pb-2 pt-7 sm:px-8">
      {messages.map((m) =>
        m.role === "user" ? (
          <UserBubble key={m.id} text={m.text} />
        ) : (
          <article key={m.id} className="flex flex-col gap-4">
            <AgentPlan steps={m.plan} />
            <AnswerBody body={m.body} />

            {m.citations.length > 0 && <CitationList citations={m.citations} />}

            <MessageActions onCopy={() => navigator.clipboard?.writeText(m.body)} />
          </article>
        ),
      )}
    </div>
  );
}
