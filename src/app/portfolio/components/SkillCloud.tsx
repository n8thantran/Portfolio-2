import { IconCloud } from "@/components/magicui/icon-cloud";

interface SkillCloudProps {
  slugs: string[];
}

export function SkillCloud({ slugs }: SkillCloudProps) {
  const images = slugs.map(
    (slug) => `https://cdn.simpleicons.org/${slug}/${slug}`,
  );

  return (
    <div className="relative flex size-full items-center justify-center overflow-hidden">
      <IconCloud images={images} />
    </div>
  );
} 