import type { LucideIcon } from "lucide-react";
import {
  AppWindow,
  ClipboardList,
  Code2,
  Headset,
  MonitorSmartphone,
  Network,
  PenTool,
  Presentation,
  Server,
  ShieldCheck,
  Smartphone,
  UserPlus,
} from "lucide-react";

export interface MenuService {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
}

export interface MegaMenu {
  id: string;
  label: string;
  /** Intro column shown beside the service grid. */
  intro: {
    eyebrow: string;
    heading: string;
    text: string;
    cta: { label: string; href: string };
  };
  items: MenuService[];
}

export interface NavLink {
  label: string;
  href: string;
}

export const megaMenus: MegaMenu[] = [
  {
    id: "it-services",
    label: "IT Services",
    intro: {
      eyebrow: "IT Services",
      heading: "Infrastructure that keeps business moving",
      text: "From the first site survey to day-to-day support, we design, install and run the technology your teams rely on.",
      cta: { label: "Explore IT Services", href: "/services/it-services" },
    },
    items: [
      {
        title: "Managed IT Support",
        description: "Proactive monitoring and a responsive helpdesk for your team.",
        href: "/services/managed-it-support",
        icon: Headset,
      },
      {
        title: "Site & Data Survey",
        description: "On-site assessments that map coverage, cabling and capacity.",
        href: "/services/site-data-survey",
        icon: ClipboardList,
      },
      {
        title: "Network Installation",
        description: "Structured cabling, Wi-Fi and secure enterprise switching.",
        href: "/services/network-installation",
        icon: Network,
      },
      {
        title: "Data Center & Services",
        description: "Rack builds, migrations and reliable data center operations.",
        href: "/services/data-center-services",
        icon: Server,
      },
      {
        title: "Workplace & Device Services",
        description: "Device deployment, imaging and full lifecycle management.",
        href: "/services/workplace-device-services",
        icon: MonitorSmartphone,
      },
      {
        title: "AV & Meeting Rooms",
        description: "Video conferencing, displays and room audio that just work.",
        href: "/services/av-meeting-rooms",
        icon: Presentation,
      },
      {
        title: "IT Staffing & Backfill",
        description: "Skilled engineers on demand to cover projects and gaps.",
        href: "/services/it-staffing-backfill",
        icon: UserPlus,
      },
    ],
  },
  {
    id: "software-services",
    label: "Software Services",
    intro: {
      eyebrow: "Software Services",
      heading: "Digital products built for growth",
      text: "Strategy, design and engineering under one roof — shipping software that is fast, secure and loved by users.",
      cta: { label: "Explore Software Services", href: "/services/software-services" },
    },
    items: [
      {
        title: "UI/UX Design",
        description: "Research-led experiences and pixel-perfect interfaces.",
        href: "/services/ui-ux-design",
        icon: PenTool,
      },
      {
        title: "Web Development",
        description: "High-performance websites and web apps on modern stacks.",
        href: "/services/web-development",
        icon: Code2,
      },
      {
        title: "Custom Applications",
        description: "Tailor-made business software that fits your workflows.",
        href: "/services/custom-applications",
        icon: AppWindow,
      },
      {
        title: "Mobile App Development",
        description: "Native and cross-platform apps for iOS and Android.",
        href: "/services/app-development",
        icon: Smartphone,
      },
      {
        title: "Testing & QA",
        description: "Manual and automated testing for release-ready quality.",
        href: "/services/testing-qa",
        icon: ShieldCheck,
      },
    ],
  },
];

export const navLinks: NavLink[] = [
  { label: "How We Work", href: "/how-we-work" },
  { label: "About Us", href: "/about" },
];

export const contactLink: NavLink = { label: "Contact", href: "/contact" };
