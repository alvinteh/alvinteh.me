import keyMirror from 'keymirror';

type SkillType = 'FRONTEND' | 'BACKEND' | 'INFRASTRUCTURE' | 'ARCHITECTURE' | 'PRODUCT';

const SkillTypes: Record<SkillType, SkillType> = keyMirror({
  FRONTEND: null,
  BACKEND: null,
  INFRASTRUCTURE: null,
  ARCHITECTURE: null,
  PRODUCT: null,
});

const skills: Record<string, Record<string, number>> = {
  [SkillTypes.FRONTEND]: {
    'HTML': 5,
    'CSS': 3,
    'TypeScript': 10,
    'React': 9,
    'Redux': 6,
    'D3': 2,
    'Vite': 1,
    'Webpack': 1,
    'Next.js': 2,
    'Gatsby': 1,
    'React Native': 4,
    'Selenium': 1,
    'Three.js': 1,

    'Appium': 1,
    'Styled Components': 2,
    
  },
  [SkillTypes.BACKEND]: {
    'PHP': 8,
    'Python': 7,
    'Go': 6,
    'Java': 6,
    'node.js': 10,
    'PostgreSQL': 9,
    'MySQL': 9,
    'SQL Server': 5,
    'DynamoDB': 5,
    'MongoDB': 8,
    'Redis': 8,
    'neo4j': 6,
    'Redshift': 3,
    'RabbitMQ': 4,
    'Kafka': 4,
  },
  [SkillTypes.INFRASTRUCTURE]: {
    'AWS': 10,
    'Azure': 8,
    'Google Cloud': 8,
    'vSphere': 3,
    'Tanzu': 1,
    'Hybrid Cloud': 4,
    'DevOps': 10,
    'GitHub': 9,
    'Jenkins': 3,
    'Kubernetes': 10,
    'Prometheus': 2,
    'Grafana': 1,
    'Elastic': 3,
    'Jaeger': 2,
    'New Relic': 1,
    'Istio': 4,
  },
  [SkillTypes.ARCHITECTURE]: {
    'GraphQL': 3,
    'gRPC': 3,
    'Distributed Systems': 10,
    'Microservices': 10,
    'Chaos Engineering': 5,
    'SRE': 8,
    'Data Streaming': 3,
    'Serverless': 4,
    'Event-Driven Architecture': 3,
    'System Design': 2,
  },
  [SkillTypes.PRODUCT]: {
    'Amplitude': 1,
    'Mixpanel': 1,
    'Agile': 7,
    'Scrum': 3,
    'Kanban': 2,
    'UX': 7,
    'Prototyping': 4,
    'Product Market Fit': 1,
    'Product Analytics': 7,
    'Product Differentiation': 1,
    'User Interviews': 1,
    'Roadmap Prioritization': 2,
    'Program Management': 3,
  },
};

const skillColors: Record<string, string> = {
  [SkillTypes.FRONTEND]: '#ea5545',
  [SkillTypes.BACKEND]: '#f46a9b',
  [SkillTypes.INFRASTRUCTURE]: '#ef9b20',
  [SkillTypes.ARCHITECTURE]: '#edbf33',
  [SkillTypes.PRODUCT]: '#ede15b',
};

export {
  skills,
  skillColors,
  SkillTypes,
};

export type { SkillType };