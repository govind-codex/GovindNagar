import { TimelineProjectGrid } from "@/components/application/journey.static";

export const journey_data = [
  {
    date: "Sep 2023 - May 2027",
    role: "B.Tech at SKITM",
    content: (
      <>
        <p>
          I am pursuing a Bachelor of Technology at SKITM in Indore, Madhya
          Pradesh. My coursework and practice cover programming fundamentals,
          object-oriented programming, DBMS, operating systems, computer
          networks, and API design.
        </p>
      </>
    ),
  },
  {
    date: "Nov 2025 - Jan 2026",
    role: "Software Development Intern at IndoRyque Technologies",
    content: (
      <>
        <p>
          I worked on backend development with Node.js, Express.js, MongoDB,
          Mongoose, JWT authentication, RBAC, and RESTful APIs. The internship
          helped me connect clean API design with real application workflows.
        </p>
        <p className="mt-4">
          I also used Postman for testing, Git and GitHub for version control,
          and followed MVC structure, centralized error handling, and validation
          practices.
        </p>
      </>
    ),
  },
  {
    date: "Projects",
    role: "Backend and Full-Stack Applications",
    content: (
      <>
        <p>
          My resume projects focus on asset management and financial planning,
          with backend APIs, authentication, database design, and frontend to
          backend integration.
        </p>
        <TimelineProjectGrid yearFilter={["2026"]} />
      </>
    ),
  },
];
