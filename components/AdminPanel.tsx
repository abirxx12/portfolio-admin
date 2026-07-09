"use client";

import { useEffect, useState, type ChangeEvent } from "react";
import { defaultPortfolioData } from "@/lib/defaultData";
import { loadPortfolioData, savePortfolioData } from "@/lib/storage";
import { EducationItem, ExperienceItem, PortfolioData, Project, SkillCategory } from "@/lib/types";

export default function AdminPanel({
  isOpen,
  onClose,
  initialData,
  onDataChange,
}: {
  isOpen: boolean;
  onClose: () => void;
  initialData: PortfolioData;
  onDataChange: (data: PortfolioData) => void;
}) {
  const [data, setData] = useState<PortfolioData>(initialData);
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    if (isOpen) {
      setData(initialData);
      setPassword("");
      setAuthenticated(false);
      setStatusMessage("");
    }
  }, [isOpen, initialData]);

  useEffect(() => {
    const loaded = loadPortfolioData(defaultPortfolioData);
    setData(loaded);
  }, []);

  const saveData = () => {
    savePortfolioData(data);
    onDataChange(data);
    setStatusMessage("Changes saved locally.");
  };

  const handleFileRead = (file: File | undefined, setter: (value: string) => void) => {
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : "";
      setter(result);
    };
    reader.readAsDataURL(file);
  };

  const handleProfileImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleFileRead(event.target.files?.[0], (value) => setData((current) => ({ ...current, profileImage: value })));
  };

  const handleResumeChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleFileRead(event.target.files?.[0], (value) => setData((current) => ({ ...current, resume: value })));
  };

  const addHeroStat = () => {
    setData((current) => ({ ...current, heroStats: [...current.heroStats, { label: "New Stat", value: "Value" }] }));
  };

  const updateHeroStat = (index: number, field: "label" | "value", value: string) => {
    const updated = [...data.heroStats];
    updated[index] = { ...updated[index], [field]: value };
    setData((current) => ({ ...current, heroStats: updated }));
  };

  const removeHeroStat = (index: number) => {
    setData((current) => ({ ...current, heroStats: current.heroStats.filter((_, itemIndex) => itemIndex !== index) }));
  };

  const addSkillCategory = () => {
    const newCategory: SkillCategory = {
      id: `category-${Date.now()}`,
      name: "New Category",
      items: ["Skill"],
    };
    setData((current) => ({ ...current, skills: [...current.skills, newCategory] }));
  };

  const updateSkillCategory = (index: number, name: string) => {
    const updated = [...data.skills];
    updated[index] = { ...updated[index], name };
    setData((current) => ({ ...current, skills: updated }));
  };

  const removeSkillCategory = (index: number) => {
    setData((current) => ({ ...current, skills: current.skills.filter((_, itemIndex) => itemIndex !== index) }));
  };

  const addSkillItem = (categoryIndex: number) => {
    const updated = [...data.skills];
    updated[categoryIndex] = { ...updated[categoryIndex], items: [...updated[categoryIndex].items, "New Skill"] };
    setData((current) => ({ ...current, skills: updated }));
  };

  const updateSkillItem = (categoryIndex: number, itemIndex: number, value: string) => {
    const updated = [...data.skills];
    const items = [...updated[categoryIndex].items];
    items[itemIndex] = value;
    updated[categoryIndex] = { ...updated[categoryIndex], items };
    setData((current) => ({ ...current, skills: updated }));
  };

  const removeSkillItem = (categoryIndex: number, itemIndex: number) => {
    const updated = [...data.skills];
    const items = updated[categoryIndex].items.filter((_, skillIndex) => skillIndex !== itemIndex);
    updated[categoryIndex] = { ...updated[categoryIndex], items };
    setData((current) => ({ ...current, skills: updated }));
  };

  const addProject = () => {
    const newProject: Project = {
      id: `project-${Date.now()}`,
      title: "New Project",
      shortDescription: "Short description",
      fullDescription: "Full description",
      techStack: ["Next.js"],
      github: "",
      live: "",
      image: "",
      category: "Frontend",
      status: "Completed",
      featured: false,
      date: "2026",
      order: data.projects.length + 1,
    };
    setData((current) => ({ ...current, projects: [...current.projects, newProject] }));
  };

  const updateProject = <K extends keyof Project>(index: number, field: K, value: Project[K]) => {
    const updated = [...data.projects];
    updated[index] = { ...updated[index], [field]: value };
    setData((current) => ({ ...current, projects: updated }));
  };

  const removeProject = (index: number) => {
    setData((current) => ({ ...current, projects: current.projects.filter((_, itemIndex) => itemIndex !== index) }));
  };

  const handleProjectImageChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
    handleFileRead(event.target.files?.[0], (value) => {
      const updated = [...data.projects];
      updated[index] = { ...updated[index], image: value };
      setData((current) => ({ ...current, projects: updated }));
    });
  };

  const addEducation = () => {
    const newItem: EducationItem = {
      id: `education-${Date.now()}`,
      institute: "New Institute",
      degree: "Degree",
      location: "Location",
      startYear: "2024",
      endYear: "Present",
      score: "",
      description: "Description",
    };
    setData((current) => ({ ...current, education: [...current.education, newItem] }));
  };

  const updateEducation = (index: number, field: keyof EducationItem, value: string) => {
    const updated = [...data.education];
    updated[index] = { ...updated[index], [field]: value };
    setData((current) => ({ ...current, education: updated }));
  };

  const removeEducation = (index: number) => {
    setData((current) => ({ ...current, education: current.education.filter((_, itemIndex) => itemIndex !== index) }));
  };

  const addExperience = () => {
    const newItem: ExperienceItem = {
      id: `experience-${Date.now()}`,
      company: "New Company",
      role: "Role",
      startDate: "2024",
      endDate: "Present",
      location: "Location",
      description: "Description",
      technologies: "React, Next.js",
    };
    setData((current) => ({ ...current, experience: [...current.experience, newItem] }));
  };

  const updateExperience = (index: number, field: keyof ExperienceItem, value: string) => {
    const updated = [...data.experience];
    updated[index] = { ...updated[index], [field]: value };
    setData((current) => ({ ...current, experience: updated }));
  };

  const removeExperience = (index: number) => {
    setData((current) => ({ ...current, experience: current.experience.filter((_, itemIndex) => itemIndex !== index) }));
  };

  if (!isOpen) {
    return null;
  }

  if (!authenticated) {
    return (
      <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/90 px-6">
        <div className="w-full max-w-md rounded-3xl border border-white/10 bg-slate-900 p-8 shadow-2xl">
          <h1 className="mb-4 text-3xl font-bold">Admin Login</h1>
          <p className="mb-6 text-slate-400">Enter the password to manage the portfolio content.</p>

          <input
            type="password"
            placeholder="Enter password"
            className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="mt-4 flex gap-3">
            <button
              onClick={() => {
                if (password === "abhi123") {
                  setAuthenticated(true);
                  setStatusMessage("");
                } else {
                  setStatusMessage("Incorrect password.");
                }
              }}
              className="flex-1 rounded-xl bg-sky-400 px-4 py-3 font-bold text-slate-950"
            >
              Login
            </button>
            <button onClick={onClose} className="rounded-xl border border-white/10 px-4 py-3 font-semibold text-slate-300">
              Close
            </button>
          </div>

          {statusMessage ? <p className="mt-4 text-sm text-rose-400">{statusMessage}</p> : null}
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto bg-slate-950/90 px-4 py-6 sm:px-6">
      <div className="mx-auto max-w-6xl rounded-3xl border border-white/10 bg-slate-900 p-6 shadow-2xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold sm:text-4xl">Portfolio Admin Panel</h1>
            <p className="mt-2 text-slate-400">Update your portfolio content locally and keep it synced with the public view.</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button onClick={saveData} className="rounded-xl bg-sky-400 px-6 py-3 font-bold text-slate-950">
              Save Changes
            </button>
            <button onClick={onClose} className="rounded-xl border border-white/10 px-6 py-3 font-semibold text-slate-300">
              Close
            </button>
          </div>
        </div>

        {statusMessage ? <p className="mb-6 text-sm text-emerald-400">{statusMessage}</p> : null}

        <div className="space-y-8">
          <section className="rounded-3xl border border-white/10 bg-slate-950/60 p-6">
            <h2 className="mb-4 text-2xl font-bold">Basic Info</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <input className="rounded-xl border border-white/10 bg-slate-900 p-3 text-white outline-none" placeholder="Name" value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} />
              <input className="rounded-xl border border-white/10 bg-slate-900 p-3 text-white outline-none" placeholder="Role" value={data.role} onChange={(e) => setData({ ...data, role: e.target.value })} />
              <input className="rounded-xl border border-white/10 bg-slate-900 p-3 text-white outline-none md:col-span-2" placeholder="Intro" value={data.intro} onChange={(e) => setData({ ...data, intro: e.target.value })} />
              <textarea className="rounded-xl border border-white/10 bg-slate-900 p-3 text-white outline-none md:col-span-2" rows={5} placeholder="About" value={data.about} onChange={(e) => setData({ ...data, about: e.target.value })} />
              <input className="rounded-xl border border-white/10 bg-slate-900 p-3 text-white outline-none" placeholder="Location" value={data.location} onChange={(e) => setData({ ...data, location: e.target.value })} />
              <input className="rounded-xl border border-white/10 bg-slate-900 p-3 text-white outline-none" placeholder="Availability" value={data.availability} onChange={(e) => setData({ ...data, availability: e.target.value })} />
              <input className="rounded-xl border border-white/10 bg-slate-900 p-3 text-white outline-none" placeholder="GitHub" value={data.github} onChange={(e) => setData({ ...data, github: e.target.value })} />
              <input className="rounded-xl border border-white/10 bg-slate-900 p-3 text-white outline-none" placeholder="LinkedIn" value={data.linkedin} onChange={(e) => setData({ ...data, linkedin: e.target.value })} />
              <input className="rounded-xl border border-white/10 bg-slate-900 p-3 text-white outline-none md:col-span-2" placeholder="Email" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} />
              <input className="rounded-xl border border-white/10 bg-slate-900 p-3 text-white outline-none" placeholder="Accent Color" value={data.theme.accentColor} onChange={(e) => setData({ ...data, theme: { ...data.theme, accentColor: e.target.value } })} />
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-slate-900/70 p-4">
              <h3 className="mb-3 text-lg font-semibold">Profile Image</h3>
              <div className="flex flex-col gap-3 md:flex-row md:items-center">
                <input type="file" accept="image/*" onChange={handleProfileImageChange} className="w-full rounded-xl border border-white/10 bg-slate-950 p-3 text-sm text-slate-300 file:mr-3 file:rounded-full file:border-0 file:bg-sky-400 file:px-3 file:py-2 file:font-semibold file:text-slate-950" />
                <button type="button" onClick={() => setData((current) => ({ ...current, profileImage: "" }))} className="rounded-xl border border-white/10 px-4 py-3 font-semibold text-slate-300">
                  Remove Photo
                </button>
              </div>
              {data.profileImage ? (
                <div className="mt-4 flex items-center gap-4">
                  <img src={data.profileImage} alt="Profile preview" className="h-16 w-16 rounded-full object-cover" />
                  <p className="text-sm text-slate-400">A profile image is ready to save.</p>
                </div>
              ) : null}
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-slate-900/70 p-4">
              <h3 className="mb-3 text-lg font-semibold">Resume</h3>
              <div className="flex flex-col gap-3 md:flex-row md:items-center">
                <input type="file" accept=".pdf" onChange={handleResumeChange} className="w-full rounded-xl border border-white/10 bg-slate-950 p-3 text-sm text-slate-300 file:mr-3 file:rounded-full file:border-0 file:bg-sky-400 file:px-3 file:py-2 file:font-semibold file:text-slate-950" />
                <button type="button" onClick={() => setData((current) => ({ ...current, resume: "" }))} className="rounded-xl border border-white/10 px-4 py-3 font-semibold text-slate-300">
                  Remove Resume
                </button>
              </div>
              <div className="mt-3 flex flex-wrap gap-3">
                {data.resume ? (
                  <>
                    <a href={data.resume} target="_blank" rel="noreferrer" className="rounded-xl border border-white/10 px-4 py-3 text-sm font-semibold text-slate-300 hover:border-sky-400 hover:text-sky-400">
                      View Current Resume
                    </a>
                    <a href={data.resume} download className="rounded-xl border border-white/10 px-4 py-3 text-sm font-semibold text-slate-300 hover:border-sky-400 hover:text-sky-400">
                      Download Current Resume
                    </a>
                  </>
                ) : (
                  <p className="text-sm text-slate-400">No resume uploaded yet.</p>
                )}
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-white/10 bg-slate-950/60 p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold">Hero Stats</h2>
              <button onClick={addHeroStat} className="rounded-xl bg-sky-400 px-4 py-2 font-bold text-slate-950">+ Add Stat</button>
            </div>
            <div className="space-y-3">
              {data.heroStats.map((stat, index) => (
                <div key={`${stat.label}-${index}`} className="grid gap-3 md:grid-cols-[1fr_1fr_auto]">
                  <input className="rounded-xl border border-white/10 bg-slate-900 p-3 text-white outline-none" value={stat.label} onChange={(e) => updateHeroStat(index, "label", e.target.value)} />
                  <input className="rounded-xl border border-white/10 bg-slate-900 p-3 text-white outline-none" value={stat.value} onChange={(e) => updateHeroStat(index, "value", e.target.value)} />
                  <button onClick={() => removeHeroStat(index)} className="rounded-xl border border-red-500 px-4 text-red-400">Delete</button>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-white/10 bg-slate-950/60 p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold">Skills Categories</h2>
              <button onClick={addSkillCategory} className="rounded-xl bg-sky-400 px-4 py-2 font-bold text-slate-950">+ Add Category</button>
            </div>
            <div className="space-y-5">
              {data.skills.map((category, categoryIndex) => (
                <div key={category.id} className="rounded-2xl border border-white/10 bg-slate-900 p-4">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <input className="flex-1 rounded-xl border border-white/10 bg-slate-950 p-3 text-white outline-none" value={category.name} onChange={(e) => updateSkillCategory(categoryIndex, e.target.value)} />
                    <button onClick={() => removeSkillCategory(categoryIndex)} className="rounded-xl border border-red-500 px-4 text-red-400">Delete Category</button>
                  </div>
                  <div className="space-y-2">
                    {category.items.map((skill, itemIndex) => (
                      <div key={`${skill}-${itemIndex}`} className="flex gap-3">
                        <input className="flex-1 rounded-xl border border-white/10 bg-slate-950 p-3 text-white outline-none" value={skill} onChange={(e) => updateSkillItem(categoryIndex, itemIndex, e.target.value)} />
                        <button onClick={() => removeSkillItem(categoryIndex, itemIndex)} className="rounded-xl border border-red-500 px-4 text-red-400">Remove</button>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => addSkillItem(categoryIndex)} className="mt-3 rounded-xl border border-white/10 px-4 py-2 text-sm font-semibold text-slate-300">
                    + Add Skill
                  </button>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-white/10 bg-slate-950/60 p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold">Projects</h2>
              <button onClick={addProject} className="rounded-xl bg-sky-400 px-4 py-2 font-bold text-slate-950">+ Add Project</button>
            </div>

            <div className="space-y-6">
              {data.projects.map((project, index) => (
                <div key={project.id} className="rounded-2xl border border-white/10 bg-slate-900 p-5">
                  <div className="grid gap-3 md:grid-cols-2">
                    <input className="rounded-xl border border-white/10 bg-slate-950 p-3 text-white outline-none" value={project.title} onChange={(e) => updateProject(index, "title", e.target.value)} placeholder="Project title" />
                    <input className="rounded-xl border border-white/10 bg-slate-950 p-3 text-white outline-none" value={project.category} onChange={(e) => updateProject(index, "category", e.target.value)} placeholder="Category" />
                    <input className="rounded-xl border border-white/10 bg-slate-950 p-3 text-white outline-none" value={project.date} onChange={(e) => updateProject(index, "date", e.target.value)} placeholder="Date / Year" />
                    <input className="rounded-xl border border-white/10 bg-slate-950 p-3 text-white outline-none" value={project.status} onChange={(e) => updateProject(index, "status", e.target.value)} placeholder="Status" />
                    <input className="rounded-xl border border-white/10 bg-slate-950 p-3 text-white outline-none md:col-span-2" value={project.shortDescription} onChange={(e) => updateProject(index, "shortDescription", e.target.value)} placeholder="Short description" />
                    <textarea className="rounded-xl border border-white/10 bg-slate-950 p-3 text-white outline-none md:col-span-2" rows={4} value={project.fullDescription} onChange={(e) => updateProject(index, "fullDescription", e.target.value)} placeholder="Full description" />
                    <input className="rounded-xl border border-white/10 bg-slate-950 p-3 text-white outline-none md:col-span-2" value={project.techStack.join(", ")} onChange={(e) => updateProject(index, "techStack", e.target.value.split(",").map((item) => item.trim()).filter(Boolean))} placeholder="Tech stack (comma separated)" />
                    <input className="rounded-xl border border-white/10 bg-slate-950 p-3 text-white outline-none" value={project.github} onChange={(e) => updateProject(index, "github", e.target.value)} placeholder="GitHub link" />
                    <input className="rounded-xl border border-white/10 bg-slate-950 p-3 text-white outline-none" value={project.live} onChange={(e) => updateProject(index, "live", e.target.value)} placeholder="Live link" />
                    <input className="rounded-xl border border-white/10 bg-slate-950 p-3 text-white outline-none" value={project.order} onChange={(e) => updateProject(index, "order", Number(e.target.value))} placeholder="Order" />
                  </div>

                  <label className="mt-4 flex items-center gap-3 text-sm text-slate-300">
                    <input type="checkbox" checked={project.featured} onChange={(e) => updateProject(index, "featured", e.target.checked)} />
                    Featured project
                  </label>

                  <div className="mt-4 rounded-2xl border border-white/10 bg-slate-950/70 p-4">
                    <h3 className="mb-3 text-lg font-semibold">Project Image</h3>
                    <input type="file" accept="image/*" onChange={(event) => handleProjectImageChange(index, event)} className="w-full rounded-xl border border-white/10 bg-slate-950 p-3 text-sm text-slate-300 file:mr-3 file:rounded-full file:border-0 file:bg-sky-400 file:px-3 file:py-2 file:font-semibold file:text-slate-950" />
                    {project.image ? <img src={project.image} alt={project.title} className="mt-3 h-20 w-20 rounded-xl object-cover" /> : null}
                  </div>

                  <button onClick={() => removeProject(index)} className="mt-4 rounded-xl border border-red-500 px-4 py-2 text-red-400">
                    Delete Project
                  </button>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-white/10 bg-slate-950/60 p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold">Education</h2>
              <button onClick={addEducation} className="rounded-xl bg-sky-400 px-4 py-2 font-bold text-slate-950">+ Add Education</button>
            </div>
            <div className="space-y-4">
              {data.education.map((item, index) => (
                <div key={item.id} className="rounded-2xl border border-white/10 bg-slate-900 p-4">
                  <div className="grid gap-3 md:grid-cols-2">
                    <input className="rounded-xl border border-white/10 bg-slate-950 p-3 text-white outline-none" value={item.institute} onChange={(e) => updateEducation(index, "institute", e.target.value)} placeholder="Institute" />
                    <input className="rounded-xl border border-white/10 bg-slate-950 p-3 text-white outline-none" value={item.degree} onChange={(e) => updateEducation(index, "degree", e.target.value)} placeholder="Degree" />
                    <input className="rounded-xl border border-white/10 bg-slate-950 p-3 text-white outline-none" value={item.location} onChange={(e) => updateEducation(index, "location", e.target.value)} placeholder="Location" />
                    <input className="rounded-xl border border-white/10 bg-slate-950 p-3 text-white outline-none" value={item.score} onChange={(e) => updateEducation(index, "score", e.target.value)} placeholder="Score / CGPA" />
                    <input className="rounded-xl border border-white/10 bg-slate-950 p-3 text-white outline-none" value={item.startYear} onChange={(e) => updateEducation(index, "startYear", e.target.value)} placeholder="Start Year" />
                    <input className="rounded-xl border border-white/10 bg-slate-950 p-3 text-white outline-none" value={item.endYear} onChange={(e) => updateEducation(index, "endYear", e.target.value)} placeholder="End Year" />
                    <textarea className="rounded-xl border border-white/10 bg-slate-950 p-3 text-white outline-none md:col-span-2" rows={3} value={item.description} onChange={(e) => updateEducation(index, "description", e.target.value)} placeholder="Description" />
                  </div>
                  <button onClick={() => removeEducation(index)} className="mt-3 rounded-xl border border-red-500 px-4 py-2 text-red-400">Delete</button>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-white/10 bg-slate-950/60 p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold">Experience</h2>
              <button onClick={addExperience} className="rounded-xl bg-sky-400 px-4 py-2 font-bold text-slate-950">+ Add Experience</button>
            </div>
            <div className="space-y-4">
              {data.experience.map((item, index) => (
                <div key={item.id} className="rounded-2xl border border-white/10 bg-slate-900 p-4">
                  <div className="grid gap-3 md:grid-cols-2">
                    <input className="rounded-xl border border-white/10 bg-slate-950 p-3 text-white outline-none" value={item.company} onChange={(e) => updateExperience(index, "company", e.target.value)} placeholder="Company / Org" />
                    <input className="rounded-xl border border-white/10 bg-slate-950 p-3 text-white outline-none" value={item.role} onChange={(e) => updateExperience(index, "role", e.target.value)} placeholder="Role" />
                    <input className="rounded-xl border border-white/10 bg-slate-950 p-3 text-white outline-none" value={item.startDate} onChange={(e) => updateExperience(index, "startDate", e.target.value)} placeholder="Start Date" />
                    <input className="rounded-xl border border-white/10 bg-slate-950 p-3 text-white outline-none" value={item.endDate} onChange={(e) => updateExperience(index, "endDate", e.target.value)} placeholder="End Date / Present" />
                    <input className="rounded-xl border border-white/10 bg-slate-950 p-3 text-white outline-none" value={item.location} onChange={(e) => updateExperience(index, "location", e.target.value)} placeholder="Location" />
                    <input className="rounded-xl border border-white/10 bg-slate-950 p-3 text-white outline-none" value={item.technologies} onChange={(e) => updateExperience(index, "technologies", e.target.value)} placeholder="Technologies" />
                    <textarea className="rounded-xl border border-white/10 bg-slate-950 p-3 text-white outline-none md:col-span-2" rows={3} value={item.description} onChange={(e) => updateExperience(index, "description", e.target.value)} placeholder="Description" />
                  </div>
                  <button onClick={() => removeExperience(index)} className="mt-3 rounded-xl border border-red-500 px-4 py-2 text-red-400">Delete</button>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}