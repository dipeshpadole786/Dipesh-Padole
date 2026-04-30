import { Reveal } from "./Reveal";

export function SectionTitle({
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-2xl mx-auto text-center mb-12">
      <Reveal>
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-ink">
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.1}>
          <p className="mt-3 text-ink-soft text-base">{description}</p>
        </Reveal>
      )}
    </div>
  );
}
