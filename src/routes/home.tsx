import { BookOpen, Github, Linkedin } from "lucide-react";
import { ModeToggle } from "../components/mode-toggle";
import { HomePageConfig } from "../config/homepageConfig";
import { FeatureCardProps, FounderCardProps } from "../types";

export function Home() {
  return (
    <div className={"min-h-screen bg-background"}>
      <Navbar />

      <main className="container mx-auto px-4 py-16">
        <section className="mb-16 text-center">
          <h1 className="mb-6 text-5xl font-bold text-foreground">
            {HomePageConfig.content.welcomeMessage}
          </h1>
          <p className="mx-auto my-16 max-w-2xl text-xl text-muted-foreground">
            {HomePageConfig.content.description}
          </p>
          <a
            href={HomePageConfig.content.cta.link}
            className="my-4 inline-block rounded-full bg-primary px-8 py-3 text-lg font-semibold text-white transition-colors hover:bg-blue-700"
          >
            {HomePageConfig.content.cta.text}
          </a>
        </section>

        <section
          id="features"
          className="mb-24 grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {HomePageConfig.features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </section>

        <section id="team" className="mb-8 text-center">
          <h2 className="mb-8 text-3xl font-bold text-foreground">
            Developed by
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {HomePageConfig.founders.map((founder, index) => (
              <FounderCard
                key={index}
                name={founder.name}
                role={founder.role}
                linkedinUrl={founder.linkedinUrl}
                githubUrl={founder.githubUrl}
              />
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-background pb-12">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p> {HomePageConfig.footer.text}</p>
        </div>
      </footer>
    </div>
  );
}

function Navbar() {
  return (
    <header className="container mx-auto px-4 py-8">
      <nav className="flex items-center justify-around md:justify-between">
        <div className="flex items-center space-x-2">
          <BookOpen className="h-8 w-8 text-primary" />
          <span className="text-foregroun text-2xl font-bold">
            {HomePageConfig.title}
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <ModeToggle />
          <div className="hidden md:block md:space-x-4">
            {HomePageConfig.header.navigation.map((item, index) => (
              <a
                key={index}
                href={item.link}
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="rounded-lg bg-secondary p-6 shadow-md transition-shadow hover:shadow-lg">
      <div className="mb-4 flex items-center">
        {icon}
        <h3 className="ml-2 text-xl font-semibold text-foreground">{title}</h3>
      </div>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
function FounderCard({ name, role, linkedinUrl, githubUrl }: FounderCardProps) {
  return (
    <div className="rounded-lg bg-secondary p-6 shadow-md transition-shadow hover:shadow-lg">
      <h3 className="mb-2 text-xl font-semibold text-foreground">{name}</h3>
      <p className="mb-4 text-muted-foreground">{role}</p>
      <div className="flex justify-center space-x-4">
        <a
          href={linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:text-muted-foreground"
        >
          <Linkedin className="h-6 w-6" />
        </a>
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground hover:text-muted-foreground"
        >
          <Github className="h-6 w-6" />
        </a>
      </div>
    </div>
  );
}
