import Image from "next/image";

const FeatureCard = ({ title, description, link, icon }) => {
  return (
    <div className="p-6 rounded-2xl bg-gray-900/50 hover:bg-gray-900/70 transition-all">
      <div className="space-y-4">
        <Image src={icon} alt={title} width={48} height={48} />
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-gray-400">{description}</p>
        <a href={link} className="flex items-center gap-2 text-purple-400 hover:text-purple-300">
          Learn more
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>
  );
}

const Features = () => {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            title="Create Prompt"
            description="For Generate AI"
            link="#"
            icon="/prompt-icon.svg"
          />
          <FeatureCard
            title="Create Video"
            description="For Motion"
            link="#"
            icon="/video-icon.svg"
          />
          <FeatureCard
            title="Perfect for SaaS"
            description="Platforms, AI tools, and virtual assistants"
            link="#"
            icon="/saas-icon.svg"
          />
        </div>
      </div>
    </section>
  );
}

export default Features;