import { PortfolioData, Project } from "./types";

export const STORAGE_KEY = "portfolio-data-v2";
const LEGACY_STORAGE_KEY = "portfolio-data-v1";

function normalizePortfolioData(data: Partial<PortfolioData> | null | undefined, defaultData: PortfolioData): PortfolioData {
  const rawSkills = (data as Partial<PortfolioData> | undefined)?.skills;
  const normalizedSkills = Array.isArray(rawSkills)
    ? rawSkills.every((entry) => typeof entry === "object" && entry !== null && "name" in entry)
      ? rawSkills
      : defaultData.skills
    : defaultData.skills;

  const rawProjects = (data as Partial<PortfolioData> | undefined)?.projects;
  const normalizedProjects = Array.isArray(rawProjects)
    ? rawProjects.map((project: Partial<Project> & Record<string, unknown>, index: number) => ({
        ...project,
        id: project.id || `project-${index}`,
        title: project.title || "Untitled Project",
        shortDescription: project.shortDescription || (typeof project.description === "string" ? project.description : "") || "",
        fullDescription: project.fullDescription || (typeof project.description === "string" ? project.description : "") || "",
        techStack: Array.isArray(project.techStack)
          ? project.techStack
          : typeof project.tech === "string"
            ? project.tech.split(",").map((item) => item.trim()).filter(Boolean)
            : [],
        github: project.github || "",
        live: project.live || "",
        image: project.image || "",
        category: project.category || "Frontend",
        status: project.status || "Completed",
        featured: Boolean(project.featured),
        date: project.date || "",
        order: project.order ?? index + 1,
      }))
    : defaultData.projects;

  const normalizedHeroStats = Array.isArray((data as Partial<PortfolioData> | undefined)?.heroStats)
    ? (data as Partial<PortfolioData>).heroStats || defaultData.heroStats
    : defaultData.heroStats;

  const normalizedEducation = Array.isArray((data as Partial<PortfolioData> | undefined)?.education)
    ? (data as Partial<PortfolioData>).education || defaultData.education
    : defaultData.education;

  const normalizedExperience = Array.isArray((data as Partial<PortfolioData> | undefined)?.experience)
    ? (data as Partial<PortfolioData>).experience || defaultData.experience
    : defaultData.experience;

  return {
    ...defaultData,
    ...data,
    heroStats: normalizedHeroStats,
    skills: normalizedSkills,
    projects: normalizedProjects,
    education: normalizedEducation,
    experience: normalizedExperience,
    theme: {
      accentColor: data?.theme?.accentColor || defaultData.theme.accentColor,
    },
  } as PortfolioData;
}

export function loadPortfolioData(defaultData: PortfolioData): PortfolioData {
  if (typeof window === "undefined") {
    return defaultData;
  }

  try {
    const saved = window.localStorage.getItem(STORAGE_KEY) || window.localStorage.getItem(LEGACY_STORAGE_KEY);
    if (!saved) {
      return defaultData;
    }

    const parsed = JSON.parse(saved) as Partial<PortfolioData>;
    return normalizePortfolioData(parsed, defaultData);
  } catch {
    return defaultData;
  }
}

export function savePortfolioData(data: PortfolioData) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}
