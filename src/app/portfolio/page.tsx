"use client";

import React from "react";
import ExperienceItem from "./components/ExperienceItem";
import HackathonItem from "./components/HackathonItem";
import Head from "next/head";
import { PortfolioDock } from "./components/PortfolioDock";

const PortfolioPage = () => {
  const experiences = [
    {
        logoUrl: "https://tr.rbxcdn.com/180DAY-3c76f389517893346e3395278a6aabe1/150/150/Image/Webp/noFilter",
        companyName: "BloxShield",
        link: "https://bloxshield.org/",
        title: "BloxShield",
        date: "June 2025 - Present",
        position: "Software Engineering Intern",
        responsibilities: [
            "Developed internal investigation tooling using FastAPI and LangChain that automated content analysis and threat detection, resulting in a 25-30% improvement in investigation process efficiency"
        ],
    },
    {
      logoUrl: "https://static-00.iconduck.com/assets.00/uber-icon-2048x2048-1c9pt96a.png",
      companyName: "Uber",
      link: "https://www.uber.com/us/en/careers/careerprep/",
      title: "Uber",
      date: "Dec. 2024 - Present",
      position: "Software Engineering Fellow",
      responsibilities: [
        "Selected for Uber's competitive career preparation program focused on technical interview preparation, data structures & algorithms, and software engineering best practices",
      ],
    },
    {
      logoUrl: "https://bookface-images.s3.amazonaws.com/small_logos/ccbeabe74e35bc254e82e981b4fca69945e24730.png",
      companyName: "Ego",
      link: "https://ego.live",
      title: "Ego (YC W24)",
      date: "Nov. 2024 - Present",
      position: "Software Engineering Intern",
      responsibilities: [
        "Optimized LLM integration for enhanced user interactions, including game speech patterns and Discord activities, while improving backend efficiency through FastAPI optimizations and researching automated QA testing",
      ],
    },
    {
      logoUrl: "https://www.sjsu.edu/people/hiuyung.wong/pics/sjsu_COE.png",
      companyName: "SJSU College of Engineering",
      link: "https://sce.sjsu.edu/",
      title: "SJSU College of Engineering",
      date: "Sept. 2024 - Present",
      position: "Software Engineering Intern",
      responsibilities: [
        "Developed a Discord bot with LLM integration using FastAPI and LangChain, enabling members to interact with club services like the fridge inventory system and access school information through natural language queries.",
      ],
    },
    {
      logoUrl: "https://avatars.githubusercontent.com/u/17789654?s=280&v=4",
      companyName: "Software and Computer Engineering Society",
      link: "https://sce.sjsu.edu/",
      title: "Software and Computer Engineering Society",
      date: "Sept. 2024 - Present",
      position: "Artificial Intelligence & Machine Learning Team Lead",
      responsibilities: [
        "Led weekly workshops and team meetings focused on machine learning projects, guiding members through data analysis, model development, and collaborative coding practices using tools like Google Colab and Git",
      ],
    },
  ];

  const hackathons = [
    {
        logoUrl: "https://d112y698adiu2z.cloudfront.net/photos/production/challenge_photos/000/624/233/datas/original.png",
        hackathonName: "HackSJSU",
        title: "San Jose State University: SJHacks 2025",
        date: "April 2025",
        location: "San Jose, California",
        isWinner: false,
        description: [
            "San Jose's notorious traffic congestion doesn't just waste time and fuel — it can cost lives when emergency vehicles are delayed. We set out to build a practical, AI-powered system that transforms ordinary intersections into smart, responsive nodes in a citywide network, all without requiring expensive new hardware or disruptive infrastructure changes.",
        ],
        links: [
            { icon: "fas fa-globe", label: "Devpost", url: "https://devpost.com/software/traffico-973wr2" },
            { icon: "fab fa-github", label: "Source", url: "https://github.com/n8thantran/SJHacks-2025" },
            { icon: "fas fa-play", label: "Demo", url: "https://traffico-beta.vercel.app/" },
            {icon: "fas fa-file-pdf", label: "Presentation", url: "https://docs.google.com/presentation/d/1cesmYvw1MQ_Zr_5Ol6HrijHAw-WvadYTsXphrBEbOHc/edit?usp=sharing"},
            {icon: "fas fa-file-video", label: "Video", url: "https://youtu.be/BgwGHjwiLG8"}
        ],
    },
    {
      logoUrl: "https://seeklogo.com/images/H/hackdavis-logo-A72F6F30FA-seeklogo.com.png",
      hackathonName: "HackDavis",
      title: "UC Davis: HackDavis 2025",
      date: "April 2025",
      location: "Davis, California",
      description: [
        "MedLM is an equality-focused healthcare platform that eliminates racial bias through anonymized consultations, ensuring equal medication recommendations and care options while tracking health data to identify and correct treatment disparities.",
      ],
      links: [
        { icon: "fas fa-globe", label: "Devpost", url: "https://devpost.com/software/medlm" },
        { icon: "fab fa-github", label: "Source", url: "https://github.com/steeevin88/medLM" },
        { icon: "fas fa-play", label: "Research Paper", url: "https://docs.google.com/document/d/1WoZ7AjkMtlMs9ROhX4OyMAbJyHaAGq2D_okqHV4xULY/edit?tab=t.0#heading" },
      ],
    },
    {
      logoUrl: "https://media.licdn.com/dms/image/v2/D560BAQFpp-qgfI9M5w/company-logo_200_200/company-logo_200_200/0/1731572246007/sf_hacks_sfsu_logo?e=2147483647&v=beta&t=Ex8J-ZEq2V1b7JF_cD1PxEeeetMV6gBfQ5jGxED2VZs",
      hackathonName: "SFHacks",
      title: "San Francisco State University: SFHacks",
      date: "April 2025",
      location: "San Francisco, California",
      isWinner: true,
      description: [
        "Won Best BioTech Hack and People of Color Empowerment awards by developing an Agentic document workflows for first-gen immigrants struggling with medical documents. A user uploads a video explaining their situation to power a RAG automation agent to parse and fill documents.",
      ],
      links: [
        { icon: "fas fa-globe", label: "Devpost", url: "https://devpost.com/software/form-force" },
        { icon: "fab fa-github", label: "Source", url: "https://github.com/jask1m/fillosophy" },
      ],
    },
    {
        logoUrl: "https://d112y698adiu2z.cloudfront.net/photos/production/challenge_thumbnails/003/297/661/datas/original.jpeg",
        hackathonName: "Hack Hayward",
        title: "CSU Eastbay: HackHayward 2025",
        date: "February 2025",
        location: "Hayward, California",
        isWinner: true,
        description: [
            "Won Best Multimodal Use of Groq for developing an AI-powered Browser Agent that autonomously navigates websites and completes tasks via voice commands, utilizing PyGame for rendering the Browser Assistant 3D Model and Groq for processing the website's DOM.",
        ],
        links: [
            { icon: "fas fa-globe", label: "Devpost", url: "https://devpost.com/software/ava-zamdu0" },
            { icon: "fab fa-github", label: "Source", url: "https://github.com/n8thantran/HackHayward2025" },
        ],
    },
    {
        logoUrl: "https://d112y698adiu2z.cloudfront.net/photos/production/challenge_thumbnails/001/816/098/datas/original.png",
        hackathonName: "Hack for Humanity",
        title: "Santa Clara University: Hack for Humanity",
        date: "February 2025",
        location: "Santa Clara, California",
        isWinner: false,
        description: [
            "lmk is a real-time incident tracking platform that empowers communities to report and monitor local safety concerns through an interactive map interface with AI-powered classification and alert systems. The project combines Next.js, Mapbox, and a sophisticated AI pipeline featuring Classifier, Warning, Summarizer, and Aggregator agents to process incident reports and deliver relevant, actionable safety information to users based on severity and proximity.",
        ],
        links: [
            { icon: "fas fa-globe", label: "Devpost", url: "https://devpost.com/software/lmk-2tzig6" },
            { icon: "fab fa-github", label: "Source", url: "https://github.com/NicholasLe04/hackforhumanity" },
            { icon: "fas fa-play", label: "Demo", url: "https://lmk-kappa.vercel.app/" },
        ],
    },
    {
        logoUrl: "https://d112y698adiu2z.cloudfront.net/photos/production/challenge_thumbnails/002/663/411/datas/large.png",
        hackathonName: "Immerse the Bay",
        title: "Stanford XR Hacks: Immerse the Bay 2024",
        date: "November 2024",
        location: "Stanford, California",
        isWinner: true,
        description: [
            "Won Best Use of Amazon AWS, Best Integration of AI prizes, and Runner Up for Meta for Dreamscapes, a VR sandbox enabling voice-commanded 3D model generation. Created an AI pipeline using FLUX.1-schelle and TripoSR models to convert text to 3D meshes in ~30 seconds, while implementing Redis vector search for asset caching and AWS S3 for model storage and delivery.",
        ],
        links: [
            { icon: "fas fa-globe", label: "Devpost", url: "https://devpost.com/software/stellar-horizons" },
            { icon: "fab fa-github", label: "Source", url: "https://github.com/banyar-shin/DreamScapes" },
        ],
    },
    {
        logoUrl: "https://d112y698adiu2z.cloudfront.net/photos/production/challenge_thumbnails/003/083/836/datas/original.png",
        hackathonName: "CalHacks 11.0",
        title: "UC Berkeley: CalHacks 11.0",
        date: "October 2024",
        location: "San Francisco, California",
        isWinner: false,
        description: [
            "Collaborated with Snap Spectacles to develop NutriLens, an AR application that provides nutritional information and recipe suggestions based on photos taken through smart glasses, built using TypeScript and JavaScript while integrating USDA nutrition data, AR technology, and AI-powered image recognition for food identification and macro tracking.",
        ],
        links: [
            { icon: "fas fa-globe", label: "Devpost", url: "https://devpost.com/software/nutrilens-1u9jo4" }
        ],
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-200">
      <Head>
        <title>Nathan Tran - Portfolio</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
      </Head>
      <PortfolioDock />
      
      <main className="container mx-auto px-6 py-24 max-w-4xl">

        <section id="experience" className="mb-16">
          <h2 className="text-3xl font-light mb-8 border-b border-gray-200 dark:border-gray-700 pb-2">Work Experience</h2>
          <div>
            {experiences.map((exp, index) => (
              <ExperienceItem key={index} {...exp} />
            ))}
          </div>
        </section>

        <section id="hackathons" className="mb-16">
          <h2 className="text-3xl font-light mb-8 border-b border-gray-200 dark:border-gray-700 pb-2">Hackathons</h2>
          <div>
            {hackathons.map((hack, index) => (
              <HackathonItem key={index} {...hack} />
            ))}
          </div>
        </section>

        <section id="education" className="mb-16">
          <h2 className="text-3xl font-light mb-8 border-b border-gray-200 dark:border-gray-700 pb-2">Education</h2>
          <div className="space-y-8">
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 flex-shrink-0">
                <img 
                  src="https://community.cob.sjsu.edu/wp-content/uploads/2018/09/cropped-SJSU-Spartan-Logo.png" 
                  alt="SJSU Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 className="text-xl font-light">San Jose State University</h3>
                <p className="text-gray-700 dark:text-gray-300">Bachelor of Science in Computer Science</p>
                <p className="text-gray-600 dark:text-gray-400">Expected Graduation: May 2025</p>
                <div className="mt-4">
                  <h4 className="text-lg font-light mb-2">Organizations & Activities</h4>
                  <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                    <li>Software and Computer Engineering Society, Responsible Computing Club, Association for Computing Machinery (ACM)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default PortfolioPage;