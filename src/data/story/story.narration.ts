import type { StoryBeat } from "./story.types";

export const WORK_NARRATION: Record<string, StoryBeat[]> = {
  "indoryque technologies": [
    {
      id: "indoryque-role",
      heading: "Backend internship",
      body: "I worked as a Software Development Intern at IndoRyque Technologies, building backend APIs and production-ready application logic with Node.js and Express.js.",
      scene: { kind: "headline", body: "REST APIs, authentication, and database-backed features." },
    },
    {
      id: "indoryque-stack",
      heading: "What I built",
      body: "My work covered RESTful APIs, MongoDB schemas, CRUD operations, indexing, validation, JWT authentication, RBAC, and secure API access following MVC architecture.",
      scene: {
        kind: "stack",
        items: ["Node.js", "Express.js", "MongoDB", "Mongoose", "JWT", "Postman"],
      },
    },
    {
      id: "indoryque-practices",
      heading: "Engineering habits",
      body: "I used Git and GitHub for version control, tested APIs in Postman, handled errors centrally, and collaborated through code reviews in an agile development environment.",
      scene: { kind: "note", body: "Clean API design, secure access, and maintainable backend structure." },
    },
  ],
};

export const PROJECT_NARRATION: Record<string, StoryBeat[]> = {
  "asset-management-system": [
    {
      id: "asset-management-what",
      heading: "What it is",
      body: "A backend system for asset allocation, returns, tracking, lifecycle management, and reporting.",
      scene: { kind: "headline", body: "A structured API for managing assets through their lifecycle." },
    },
    {
      id: "asset-management-stack",
      heading: "Backend design",
      body: "It uses Node.js, Express.js, MongoDB, Mongoose, and JWT, with role-based access control and asset status validation.",
      scene: {
        kind: "stack",
        items: ["Node.js", "Express.js", "MongoDB", "Mongoose", "JWT", "MVC"],
      },
    },
  ],
  "smart-financial-planning-app": [
    {
      id: "financial-planning-what",
      heading: "What it is",
      body: "A financial planning application for budget tracking, expense management, financial goals, and transaction workflows.",
      scene: { kind: "headline", body: "Budget tracking and financial goals in one app." },
    },
    {
      id: "financial-planning-stack",
      heading: "Data and APIs",
      body: "It combines frontend integration with backend APIs, MySQL schema design, validation, and business logic for expense categorization and budget limits.",
      scene: {
        kind: "stack",
        items: ["HTML", "CSS", "JavaScript", "Node.js", "Express.js", "MySQL"],
      },
    },
  ],
};
