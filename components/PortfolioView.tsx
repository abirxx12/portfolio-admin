"use client";

import { useMemo, useState } from "react";
import { Code2, Download, ExternalLink, Globe2, Mail } from "lucide-react";
import { PortfolioData } from "@/lib/types";
import { useAdminTrigger } from "@/lib/adminTrigger";

export default function PortfolioView({
  data,
  onOpenAdmin,
}: {
  data: PortfolioData;
  onOpenAdmin: () => void;
}) {
  const { trigger } = useAdminTrigger(onOpenAdmin);
  const [activeFilter, setActiveFilter] = useState("All");
  const accent = data.theme?.accentColor || "#38bdf8";

  const filteredProjects = useMemo(() => {
    if (activeFilter === "Featured") {
      return data.projects.filter((project) => project.featured);
    }

    if (activeFilter === "All") {
      return [...data.projects].sort((a, b) => a.order - b.order);
    }

    return data.projects.filter((project) => project.category === activeFilter);
  }, [activeFilter, data.projects]);

  const filterOptions = ["All", "Featured", ...Array.from(new Set(data.projects.map((project) => project.category)))];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#" className="text-2xl font-extrabold tracking-tight">
            {data.name.split(" ")[0]}
            <span style={{ color: accent }}>.</span>
          </a>

          <nav className="hidden gap-8 text-sm font-medium text-slate-300 md:flex">
            <a href="#home" className="hover:text-sky-400">Home</a>
            <a href="#about" className="hover:text-sky-400">About</a>
            <a href="#skills" className="hover:text-sky-400">Skills</a>
            <a href="#projects" className="hover:text-sky-400">Projects</a>
            <a href="#contact" className="hover:text-sky-400">Contact</a>
            <button
              type="button"
              onClick={() => {
                if (data.resume) {
                  window.open(data.resume, "_blank");
                } else {
                  window.alert("Resume not uploaded yet");
                }
              }}
              className="hover:text-sky-400"
            >
              Resume
            </button>
          </nav>
        </div>
      </header>

      <section id="home" className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 py-20 md:grid-cols-2">
        <div className="flex flex-col justify-center">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em]" style={{ color: accent }}>
            Frontend Developer Portfolio
          </p>

          <h1 className="mb-4 text-5xl font-extrabold leading-tight md:text-6xl">
            Hi, I&apos;m <span style={{ color: accent }}>{data.name}</span>
          </h1>

          <h2 className="mb-5 text-2xl font-semibold text-slate-300">{data.role}</h2>

          <p className="mb-8 max-w-2xl text-lg leading-8 text-slate-400">{data.intro}</p>

          <div className="flex flex-wrap gap-4">
            <a href="#projects" className="rounded-xl px-6 py-3 font-bold text-slate-950 transition hover:scale-[1.02]" style={{ backgroundColor: accent }}>
              View Projects
            </a>
            <a href="#contact" className="rounded-xl border border-white/15 px-6 py-3 font-bold text-white transition hover:border-sky-400 hover:text-sky-400">
              Contact Me
            </a>
            {data.resume ? (
              <a href={data.resume} download className="flex items-center gap-2 rounded-xl border border-white/10 px-6 py-3 font-bold text-slate-300 transition hover:border-sky-400 hover:text-sky-400">
                <Download size={18} /> Resume
              </a>
            ) : null}
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <a href={data.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-slate-300 hover:border-sky-400 hover:text-sky-400">
              <Code2 size={18} /> GitHub
            </a>

            <a href={data.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-slate-300 hover:border-sky-400 hover:text-sky-400">
              <Globe2 size={18} /> LinkedIn
            </a>

            <a href={`mailto:${data.email}`} className="flex items-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-slate-300 hover:border-sky-400 hover:text-sky-400">
              <Mail size={18} /> Email
            </a>
          </div>
        </div>

        <button
          type="button"
          onClick={trigger}
          className="rounded-3xl border border-white/10 bg-slate-900 p-8 text-left shadow-2xl transition hover:-translate-y-1 hover:border-sky-400"
        >
          <div className="mb-6 flex h-24 w-24 items-center justify-center overflow-hidden rounded-full text-3xl font-extrabold text-slate-950" style={{ backgroundColor: accent }}>
            {data.profileImage ? (
              <img src={data.profileImage} alt={data.name} className="h-full w-full object-cover" />
            ) : (
              <span>AR</span>
            )}
          </div>

          <h3 className="text-3xl font-bold">{data.name}</h3>
          <p className="mt-2 text-lg text-slate-400">{data.role}</p>

          <div className="mt-8 space-y-4">
            <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
              <p className="text-sm text-slate-400">Based In</p>
              <h4 className="mt-1 text-lg font-semibold">{data.location}</h4>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
              <p className="text-sm text-slate-400">Focus</p>
              <h4 className="mt-1 text-lg font-semibold">Frontend Development</h4>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
              <p className="text-sm text-slate-400">Availability</p>
              <h4 className="mt-1 text-lg font-semibold">{data.availability}</h4>
            </div>
          </div>
        </button>
      </section>

      <section id="about" className="mx-auto max-w-6xl px-6 py-12">
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em]" style={{ color: accent }}>About Me</p>
        <h2 className="mb-6 text-4xl font-bold">Who I Am</h2>

        <div className="rounded-3xl border border-white/10 bg-slate-900 p-8 text-lg leading-8 text-slate-300">
          {data.about}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-6">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {data.heroStats.map((item, index) => (
            <div key={`${item.label}-${index}`} className="rounded-2xl border border-white/10 bg-slate-900 p-5">
              <p className="text-sm text-slate-400">{item.label}</p>
              <h3 className="mt-2 text-2xl font-bold" style={{ color: accent }}>{item.value}</h3>
            </div>
          ))}
        </div>
      </section>

      <section id="skills" className="mx-auto max-w-6xl px-6 py-12">
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em]" style={{ color: accent }}>Skills</p>
        <h2 className="mb-8 text-4xl font-bold">Tech Stack & Tools</h2>

        <div className="space-y-6">
          {data.skills.map((category) => (
            <div key={category.id} className="rounded-3xl border border-white/10 bg-slate-900 p-6">
              <h3 className="mb-4 text-xl font-semibold" style={{ color: accent }}>{category.name}</h3>
              <div className="flex flex-wrap gap-3">
                {category.items.map((skill, index) => (
                  <span key={`${skill}-${index}`} className="rounded-full border border-white/10 bg-slate-950 px-4 py-2 text-sm font-medium text-slate-200">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="projects" className="mx-auto max-w-6xl px-6 py-12">
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em]" style={{ color: accent }}>Projects</p>
        <h2 className="mb-6 text-4xl font-bold">Featured Work</h2>

        <div className="mb-6 flex flex-wrap gap-3">
          {filterOptions.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${activeFilter === filter ? "text-slate-950" : "border border-white/10 text-slate-300 hover:border-sky-400 hover:text-sky-400"}`}
              style={activeFilter === filter ? { backgroundColor: accent } : undefined}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredProjects.map((project, index) => (
            <div key={`${project.title}-${index}`} className="rounded-3xl border border-white/10 bg-slate-900 p-6 transition hover:-translate-y-1 hover:border-sky-400">
              <div className="mb-4 flex items-center justify-between gap-3">
                <span className="rounded-full border border-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                  {project.category}
                </span>
                <span className="rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-950" style={{ backgroundColor: accent }}>
                  {project.status}
                </span>
              </div>

              <div className="mb-4 flex h-36 items-center justify-center overflow-hidden rounded-2xl bg-slate-950/70">
                {project.image ? (
                  <img src={project.image} alt={project.title} className="h-full w-full object-cover" />
                ) : (
                  <span className="text-sm text-slate-500">Preview image</span>
                )}
              </div>

              <div className="mb-2 flex items-center justify-between gap-3">
                <h3 className="text-2xl font-bold">{project.title}</h3>
                {project.featured ? (
                  <span className="rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-950" style={{ backgroundColor: accent }}>
                    Featured
                  </span>
                ) : null}
              </div>
              <p className="mt-3 leading-7 text-slate-400">{project.shortDescription}</p>
              <p className="mt-4 text-sm text-slate-400">{project.date}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {project.techStack.map((tech, techIndex) => (
                  <span key={`${tech}-${techIndex}`} className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex gap-3">
                {project.github ? (
                  <a href={project.github} target="_blank" rel="noreferrer" className="rounded-xl border border-white/10 px-4 py-2 text-sm font-semibold text-slate-300 hover:border-sky-400 hover:text-sky-400">
                    GitHub
                  </a>
                ) : null}

                {project.live ? (
                  <a href={project.live} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold text-slate-950 hover:opacity-90" style={{ backgroundColor: accent }}>
                    Live <ExternalLink size={15} />
                  </a>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em]" style={{ color: accent }}>Education</p>
        <h2 className="mb-6 text-4xl font-bold">Academic Background</h2>

        <div className="space-y-4">
          {data.education.map((item) => (
            <div key={item.id} className="rounded-3xl border border-white/10 bg-slate-900 p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-xl font-semibold">{item.degree}</h3>
                  <p className="mt-1 text-slate-400">{item.institute}</p>
                </div>
                <p className="text-sm text-slate-400">{item.startYear} - {item.endYear}</p>
              </div>
              <p className="mt-3 text-slate-400">{item.description}</p>
              <p className="mt-2 text-sm text-slate-500">{item.score} • {item.location}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em]" style={{ color: accent }}>Experience</p>
        <h2 className="mb-6 text-4xl font-bold">Work & Growth</h2>

        <div className="space-y-4">
          {data.experience.map((item) => (
            <div key={item.id} className="rounded-3xl border border-white/10 bg-slate-900 p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-xl font-semibold">{item.role}</h3>
                  <p className="mt-1 text-slate-400">{item.company}</p>
                </div>
                <p className="text-sm text-slate-400">{item.startDate} - {item.endDate}</p>
              </div>
              <p className="mt-3 text-slate-400">{item.description}</p>
              <p className="mt-2 text-sm text-slate-500">{item.technologies} • {item.location}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-6xl px-6 py-12">
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em]" style={{ color: accent }}>Contact</p>
        <h2 className="mb-6 text-4xl font-bold">Let’s Connect</h2>

        <div className="rounded-3xl border border-white/10 bg-slate-900 p-8">
          <p className="max-w-3xl text-lg leading-8 text-slate-300">
            If you’d like to connect, collaborate, or discuss frontend opportunities, feel free to reach out.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a href={`mailto:${data.email}`} className="rounded-xl border border-white/10 px-5 py-3 font-semibold text-slate-300 hover:border-sky-400 hover:text-sky-400">
              {data.email}
            </a>

            <a href={data.github} target="_blank" rel="noreferrer" className="rounded-xl border border-white/10 px-5 py-3 font-semibold text-slate-300 hover:border-sky-400 hover:text-sky-400">
              GitHub
            </a>

            <a href={data.linkedin} target="_blank" rel="noreferrer" className="rounded-xl border border-white/10 px-5 py-3 font-semibold text-slate-300 hover:border-sky-400 hover:text-sky-400">
              LinkedIn
            </a>
          </div>

          <div className="mt-6 flex flex-wrap gap-4 text-sm text-slate-400">
            <span className="rounded-full border border-white/10 px-3 py-2">{data.location}</span>
            <span className="rounded-full border border-white/10 px-3 py-2">{data.availability}</span>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 py-6 text-center text-slate-500">
        © 2026 {data.name}. All rights reserved.
      </footer>
    </div>
  );
}