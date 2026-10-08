// All portfolio content lives here. Edit this file to update the site.
// Later, the admin panel can replace this object with data from an API.
const PORTFOLIO = {
  name: "Ujjwal Pratap Singh",
  role: "Cloud and DevOps Engineer in the making",
  summary: "B.Tech Computer Science student who builds and ships AWS solutions, from architecture to deployment, backed by a six-month DevOps internship.",
  email: "12345ujjwalpratap@gmail.com",
  repo: "12345ujjwal/portfolio",   // GitHub repo that deploys this site (used by the deploy badge). Change to your real repo name.
  nodes: {
    visitor: { title: "Visitor", text: "A browser asks for the site over HTTPS. DNS for the custom domain is handled by Route 53.", status: "Live" },
    cloudfront: { title: "CloudFront", text: "CDN in front of the bucket. It serves the site over HTTPS from edge locations, caches files, and is the only way in: the bucket itself stays private through Origin Access Control.", status: "Live" },
    s3: { title: "S3 static site", text: "Holds the HTML, CSS, JavaScript and resume PDF. Private bucket. GitHub Actions uploads each new build here and invalidates the CloudFront cache.", status: "Live" },
    admin: { title: "Admin", text: "You, signed in through Cognito, editing projects, skills and experience without touching code.", status: "Planned" },
    api: { title: "API Gateway + Lambda", text: "Checks who is calling, then reads and writes portfolio content. Serverless, so there is nothing to patch or keep running.", status: "Planned" },
    dynamodb: { title: "DynamoDB", text: "Stores the content that currently lives in data.js, so the public site can load it from the API.", status: "Planned" }
  },
  github: "https://github.com/12345ujjwal",
  linkedin: "https://www.linkedin.com/in/ujjwal-pratap-singh/",
  resume: "assets/Ujjwal_Pratap_Resume.pdf",
  about: [
    "I am a final-year B.Tech student in Computer Science Engineering at Khwaja Moinuddin Chishti Language University, Lucknow, focused on cloud computing and DevOps.",
    "I like designing systems end to end: planning the network, automating delivery, and watching them run. My projects cover serverless AI on AWS, Kubernetes on EC2, and secure multi-tier VPC networking."
  ],
  skills: [
    { group: "Cloud (AWS)", items: ["EC2", "S3", "VPC", "IAM", "Lambda", "API Gateway", "DynamoDB", "CloudFront", "Route 53", "Amazon SES", "Bedrock", "Amplify"] },
    { group: "DevOps tools", items: ["Docker", "Kubernetes", "Jenkins", "Terraform", "Git", "SSH"] },
    { group: "Languages and OS", items: ["Python", "Bash", "Ubuntu"] },
    { group: "Monitoring", items: ["Prometheus", "Grafana"] }
  ],
  projects: [
    {
      title: "Nagar Sahayak",
      subtitle: "AI-powered civic complaint platform",
      tech: ["Lambda", "API Gateway", "Bedrock", "DynamoDB", "Amplify", "SES", "S3", "Slack API"],
      points: [
        "Serverless AI agent that turns multilingual, free-form citizen complaints (text or voice) into structured tickets routed to the right department.",
        "Fully serverless backend covering intake, AI drafting, photo and GPS capture, Slack and email alerts, and status tracking.",
        "Companion admin dashboard with live status management and a geospatial complaint map."
      ],
      links: [{ label: "Live demo", url: "https://staging.d1pto0hvryewtc.amplifyapp.com/" }]
    },
    {
      title: "Multi-microservice Kubernetes project",
      subtitle: "Ingress, autoscaling and persistent storage on EC2",
      tech: ["Kubernetes", "KIND", "Nginx Ingress", "Django", "MySQL", "Adminer", "EC2"],
      points: [
        "Multiple microservices behind an ingress controller, running on a KIND cluster on AWS EC2.",
        "Persistent volumes for data recovery and a Horizontal Pod Autoscaler for variable load.",
        "Deployment automated with YAML manifests, cutting manual steps."
      ],
      links: [{ label: "GitHub repo", url: "https://github.com/12345ujjwal/django-notes-app-k8s" }]
    },
    {
      title: "Secure multi-tier AWS network",
      subtitle: "Custom VPC with public and private subnets",
      tech: ["VPC", "EC2", "Internet Gateway", "NAT Gateway", "Route Tables", "Security Groups", "Linux"],
      points: [
        "Planned CIDR ranges and built public and private subnets in a custom VPC.",
        "Configured gateways, route tables and security groups so private resources stay isolated but reachable where needed.",
        "Launched Linux EC2 instances and verified routing end to end over SSH."
      ],
      links: [{ label: "Project details", url: "https://www.linkedin.com/in/ujjwal-pratap-singh/details/projects/" }]
    }
  ],
  experience: [
    {
      role: "DevOps and Cloud Computing Intern",
      org: "SureTrust",
      when: "July 2025 to January 2026",
      points: [
        "Built Jenkins CI/CD pipelines that automate application build and deployment.",
        "Deployed containerized applications on AWS using Docker and Kubernetes.",
        "Set up Prometheus and Grafana dashboards for infrastructure monitoring."
      ]
    }
  ],
  achievements: [
    { title: "AWS Community Builder (Containers)", text: "Selected for the AWS Community Builders program, contributing technical content and knowledge sharing." },
    { title: "AWS re:Invent grant", text: "Selected by AWS for a fully sponsored trip to re:Invent in Las Vegas, for contributions to the cloud community." }
  ],
  education: [
    { title: "B.Tech, Computer Science Engineering", text: "Khwaja Moinuddin Chishti Language University, Lucknow. 2023 to 2027. CGPA 8.4/10." },
    { title: "School", text: "Class XII (CBSE) 90%. Class X (CBSE) 92%." }
  ],
  certificates: [
    { title: "AWS Solutions Architect Associate", text: "In progress" },
    { title: "Networking Basics", text: "Cisco Networking Academy" },
    { title: "Artificial Intelligence Fundamentals", text: "IBM SkillsBuild" }
  ]
};
