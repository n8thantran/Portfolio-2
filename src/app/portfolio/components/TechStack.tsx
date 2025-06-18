import { cn } from "@/lib/utils";
import { Marquee } from "@/components/magicui/marquee";

const skillsData = [
  { slug: "python", name: "Python" },
  { slug: "javascript", name: "JavaScript" },
  { slug: "typescript", name: "TypeScript" },
  { slug: "html5", name: "HTML5" },
  { slug: "react", name: "React" },
  { slug: "nextdotjs", name: "Next.js" },
  { slug: "fastapi", name: "FastAPI" },
  { slug: "flask", name: "Flask" },
  { slug: "git", name: "Git" },
  { slug: "docker", name: "Docker" },
  { slug: "unity", name: "Unity" },
  { slug: "meta", name: "Meta" },
  { slug: "roblox", name: "Roblox Studio" },
  { slug: "mongodb", name: "MongoDB" },
  { slug: "supabase", name: "Supabase" },
  { slug: "google", name: "Google" },
  { slug: "discord", name: "Discord" },
  { slug: "openai", name: "OpenAI" },
  { slug: "langchain", name: "LangChain" },
  { slug: "numpy", name: "NumPy" },
  { slug: "scikitlearn", name: "Scikit-Learn" },
  { slug: "pytorch", name: "PyTorch" },
  { slug: "pandas", name: "Pandas" },
];

const skills = skillsData.map((skill) => ({
  ...skill,
  img: `https://cdn.simpleicons.org/${skill.slug}`,
}));

const firstRow = skills.slice(0, Math.ceil(skills.length / 2));
const secondRow = skills.slice(Math.ceil(skills.length / 2));

const TechCard = ({ img, name }: { img: string; name: string }) => {
  return (
    <figure
      className={cn(
        "relative flex h-36 w-36 cursor-pointer flex-col items-center justify-center gap-2 overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
      )}
    >
      <div className="flex h-12 w-12 items-center justify-center">
        <img className="h-full w-full object-contain" alt={name} src={img} />
      </div>
      <div className="flex flex-col">
        <figcaption className="text-center text-sm font-medium dark:text-white">
          {name}
        </figcaption>
      </div>
    </figure>
  );
};

export function TechStack() {
  return (
    <div>
      <h2 className="mb-12 text-center text-3xl font-bold">Technical Skills</h2>
      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
        <Marquee pauseOnHover className="[--duration:40s]">
          {firstRow.map((skill) => (
            <TechCard key={skill.slug} {...skill} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:40s]">
          {secondRow.map((skill) => (
            <TechCard key={skill.slug} {...skill} />
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-white dark:from-black"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-white dark:from-black"></div>
      </div>
    </div>
  );
} 