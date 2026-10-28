import type { LucideIcon } from "lucide-react";
import {
  Blocks,
  ClipboardCheck,
  Globe,
  Headset,
  MonitorSmartphone,
  Network,
  PenTool,
  Presentation,
  Ruler,
  Server,
  Smartphone,
  UserPlus,
} from "lucide-react";

export interface Service {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  image: { src: string; alt: string };
}

export interface ServiceGroup {
  id: string;
  label: string;
  services: Service[];
}

const unsplash = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&crop=entropy&w=960&h=1200&q=85`;

export const servicesIntro = {
  eyebrow: "Our Services",
  heading: "What we do",
  text: "Two sides of the same company: engineers on site across Europe, and software built and maintained by our own developers.",
};

export const serviceGroups: ServiceGroup[] = [
  {
    id: "it-support",
    label: "IT Support",
    services: [
      {
        id: "managed-it-support",
        title: "Managed IT support",
        description:
          "A service desk for everyday issues, specialists for the harder ones, and engineers on site.",
        href: "/services/managed-it-support",
        icon: Headset,
        image: {
          src: unsplash("1573164713988-8665fc963095"),
          alt: "IT engineer working on a laptop inside a server room",
        },
      },
      {
        id: "site-data-surveys",
        title: "Site and data surveys",
        description: "A documented survey before installation, so the second visit never happens.",
        href: "/services/site-data-survey",
        icon: Ruler,
        image: {
          src: unsplash("1504307651254-35680f356dfd"),
          alt: "Engineers surveying a site with cabling and equipment",
        },
      },
      {
        id: "network-installation",
        title: "Network installation",
        description: "Routers, firewalls, wireless and structured cabling, tested and certified.",
        href: "/services/network-installation",
        icon: Network,
        image: {
          src: unsplash("1544197150-b99a580bb7a8"),
          alt: "Network patch panel with connected ethernet cables",
        },
      },
      {
        id: "data-centre-services",
        title: "Data centre services",
        description: "Smart hands: rack & stack, cross-connects, swaps and decommission.",
        href: "/services/data-center-services",
        icon: Server,
        image: {
          src: unsplash("1558494949-ef010cbdcc31"),
          alt: "Server racks with cabling in a data centre",
        },
      },
      {
        id: "workplace-device-services",
        title: "Workplace and device services",
        description: "Provisioning, imaging, rollouts, office setup and print, run in waves.",
        href: "/services/workplace-device-services",
        icon: MonitorSmartphone,
        image: {
          src: unsplash("1593642632559-0c6d3fc62b89"),
          alt: "Laptop and monitor set up on a bright office desk",
        },
      },
      {
        id: "av-meeting-rooms",
        title: "AV and meeting rooms",
        description:
          "Screens, cameras, microphones and Cisco room systems, installed, cabled and tested.",
        href: "/services/av-meeting-rooms",
        icon: Presentation,
        image: {
          src: unsplash("1431540015161-0bf868a2d407"),
          alt: "Conference room with a long table and ceiling projector",
        },
      },
      {
        id: "it-staffing-backfill",
        title: "IT staffing and backfill",
        description:
          "Service desk and specialist engineers placed with you, plus absence cover and surge teams.",
        href: "/services/it-staffing-backfill",
        icon: UserPlus,
        image: {
          src: unsplash("1522071820081-009f0129c71c"),
          alt: "Team of engineers working together on laptops",
        },
      },
    ],
  },
  {
    id: "software-development",
    label: "Software Development",
    services: [
      {
        id: "ui-ux-design",
        title: "UI and UX design",
        description:
          "Wireframes, interface design and a design system developers can build straight from.",
        href: "/services/ui-ux-design",
        icon: PenTool,
        image: {
          src: unsplash("1531403009284-440f080d1e12"),
          alt: "Designer arranging wireframes on a whiteboard",
        },
      },
      {
        id: "custom-applications",
        title: "Custom applications",
        description: "Line-of-business systems built around how the work actually happens.",
        href: "/services/custom-applications",
        icon: Blocks,
        image: {
          src: unsplash("1551288049-bebda4e38f71"),
          alt: "Analytics dashboard of a custom business application",
        },
      },
      {
        id: "web-applications",
        title: "Web applications",
        description: "Customer and internal-facing web software, from one tool to a platform.",
        href: "/services/web-development",
        icon: Globe,
        image: {
          src: unsplash("1555066931-4365d14bab8c"),
          alt: "Web application source code on a laptop screen",
        },
      },
      {
        id: "mobile-app-development",
        title: "Mobile app development",
        description: "iOS and Android, native or cross-platform, chosen on what the app must do.",
        href: "/services/app-development",
        icon: Smartphone,
        image: {
          src: unsplash("1563986768609-322da13575f3"),
          alt: "Person using a mobile app on a smartphone next to a laptop",
        },
      },
      {
        id: "testing-qa",
        title: "Testing and QA",
        description:
          "Test strategy, automated suites and manual checks, so every release ships with confidence.",
        href: "/services/testing-qa",
        icon: ClipboardCheck,
        image: {
          src: unsplash("1516321318423-f06f85e504b3"),
          alt: "Two people reviewing software on a laptop screen",
        },
      },
    ],
  },
];
