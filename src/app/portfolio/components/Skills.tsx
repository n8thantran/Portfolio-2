import { SkillCloud } from "./SkillCloud";

const languagesAndFrameworks = [
  "python",
  "java",
  "csharp",
  "javascript",
  "typescript",
  "html5",
  "css3",
  "react",
  "nextdotjs",
  "fastapi",
  "flask",
];

const toolsAndPlatforms = [
  "git",
  "docker",
  "visualstudiocode",
  "visualstudio",
  "unity",
  "meta",
  "roblox",
  "mongodb",
  "supabase",
  "google",
  "discord",
  "openai",
];

const dataScienceAndAI = [
  "langchain",
  "numpy",
  "scikitlearn",
  "pytorch",
  "pandas",
  "matplotlib",
];

export function Skills() {
  return (
    <div className="py-10">
      <h2 className="text-3xl font-bold text-center mb-12">Technical Skills</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="flex flex-col items-center">
          <h3 className="text-2xl font-semibold mb-4">Languages & Frameworks</h3>
          <div className="w-full h-[400px]">
            <SkillCloud slugs={languagesAndFrameworks} />
          </div>
        </div>
        <div className="flex flex-col items-center">
          <h3 className="text-2xl font-semibold mb-4">Tools & Platforms</h3>
          <div className="w-full h-[400px]">
            <SkillCloud slugs={toolsAndPlatforms} />
          </div>
        </div>
        <div className="flex flex-col items-center">
          <h3 className="text-2xl font-semibold mb-4">
            Data Science & AI Libraries
          </h3>
          <div className="w-full h-[400px]">
            <SkillCloud slugs={dataScienceAndAI} />
          </div>
        </div>
      </div>
    </div>
  );
} 