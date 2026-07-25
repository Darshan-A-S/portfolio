import { WorkExperience } from "@/components/work-experience"

const experiences = [
  {
    id: "texas-ai",
    companyName: "Texas AI",
    isCurrentEmployer: true,
    positions: [
      {
        id: "texas-ai-1",
        title: "Associate Software Engineer",
        employmentType: "Full-time",
        employmentPeriod: { start: "03.2026" },
        description:
          "- Contributed to backend development using Java and Spring Boot, working on small features and bug fixes within an existing production codebase\n- Implemented and worked with REST APIs in a real-world enterprise environment, integrating backend services with existing systems\n- Resolved bugs and handled maintenance tasks across existing modules, improving code stability and gaining hands-on experience with debugging production-level code",
        skills: ["Java", "Spring Boot", "Postman", "Git", "Kafka", "JWT", "MySQL", "MongoDB"],
      },
    ],
  },
]

const Experience = () => {
  return (
    <div className="border-b border-[color:var(--color-border)] px-[8px] sm:px-0">
      <h2 className="border-b border-[color:var(--color-border)]">
        <div className="mx-auto max-w-[768px] border-x border-[color:var(--color-border)] px-4 py-3 text-[26px] font-bold">
          Experience
        </div>
      </h2>
      <div className="mx-auto max-w-[768px] border-x border-[color:var(--color-border)]">
        <WorkExperience experiences={experiences} />
      </div>
    </div>
  )
}

export default Experience
