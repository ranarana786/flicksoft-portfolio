export type ServiceIcon = "headset" | "network" | "presentation" | "code" | "app" | "pen";

export type ServiceCategory = "IT Services" | "Software Development";

export interface HeroSlide {
  id: string;
  category: ServiceCategory;
  service: string;
  title: string;
  description: string;
  href: string;
  /** Serializable icon key, resolved to a component on the client. */
  icon: ServiceIcon;
  image: {
    src: string;
    alt: string;
  };
}

const unsplash = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=2400&q=80`;

export const heroSlides: HeroSlide[] = [
  {
    id: "managed-it-support",
    category: "IT Services",
    service: "Managed IT Support",
    title: "Always-On Managed IT Support",
    description:
      "Proactive monitoring, rapid helpdesk response and end-to-end device management that keeps your team productive.",
    href: "/services/managed-it-support",
    icon: "headset",
    image: {
      src: unsplash("1573164713988-8665fc963095"),
      alt: "IT engineer reviewing systems on a laptop inside a server room",
    },
  },
  {
    id: "network-installation",
    category: "IT Services",
    service: "Network Installation",
    title: "Reliable Networks Built to Scale",
    description:
      "Structured cabling, secure Wi-Fi and enterprise switching designed, installed and certified by experienced engineers.",
    href: "/services/network-installation",
    icon: "network",
    image: {
      src: unsplash("1544197150-b99a580bb7a8"),
      alt: "Network patch panel with neatly connected ethernet cables",
    },
  },
  {
    id: "av-meeting-rooms",
    category: "IT Services",
    service: "AV & Meeting Rooms",
    title: "Meeting Rooms That Just Work",
    description:
      "Video conferencing, displays and room audio integrated seamlessly for one-touch, hybrid-ready collaboration.",
    href: "/services/av-meeting-rooms",
    icon: "presentation",
    image: {
      src: unsplash("1431540015161-0bf868a2d407"),
      alt: "Modern conference room with a long table and ceiling projector",
    },
  },
  {
    id: "web-development",
    category: "Software Development",
    service: "Web Development",
    title: "High-Performance Web Platforms",
    description:
      "Fast, secure and SEO-ready websites and web apps engineered with modern frameworks for measurable growth.",
    href: "/services/web-development",
    icon: "code",
    image: {
      src: unsplash("1461749280684-dccba630e2f6"),
      alt: "Source code displayed on a monitor",
    },
  },
  {
    id: "app-development",
    category: "Software Development",
    service: "App Development",
    title: "Mobile Apps Your Users Love",
    description:
      "Native and cross-platform iOS and Android apps, from MVP to app store launch and beyond.",
    href: "/services/app-development",
    icon: "app",
    image: {
      src: unsplash("1551650975-87deedd944c3"),
      alt: "Hand holding a smartphone showing a mobile app dashboard",
    },
  },
  {
    id: "ui-ux-design",
    category: "Software Development",
    service: "UI/UX Design",
    title: "Design That Drives Conversion",
    description:
      "Research-led user experiences and pixel-perfect interfaces that turn complex workflows into effortless journeys.",
    href: "/services/ui-ux-design",
    icon: "pen",
    image: {
      src: unsplash("1586717791821-3f44a563fa4c"),
      alt: "Designer sketching app wireframes on a tablet with a stylus",
    },
  },
];
