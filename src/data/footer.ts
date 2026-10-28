export interface FooterLink {
  label: string;
  href: string;
  /** Rendered in the accent colour, like a call to action. */
  highlight?: boolean;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export const footerTagline =
  "IT field services across Europe. Verified engineers, for the companies that hold the contract and the companies that sign it.";

export const footerColumns: FooterColumn[] = [
  {
    title: "Services",
    links: [
      { label: "Software development", href: "/services/software-services" },
      { label: "Managed IT support", href: "/services/managed-it-support" },
      { label: "Site and data surveys", href: "/services/site-data-survey" },
      { label: "Network installation", href: "/services/network-installation" },
      { label: "Data centre services", href: "/services/data-center-services" },
      { label: "Workplace and device services", href: "/services/workplace-device-services" },
      { label: "AV and meeting rooms", href: "/services/av-meeting-rooms" },
      { label: "IT staffing and backfill", href: "/services/it-staffing-backfill" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "European coverage", href: "/coverage" },
      { label: "Cost estimate", href: "/cost-estimate" },
      { label: "Engineer standards", href: "/how-we-work#engineers" },
      { label: "Partners", href: "/partners" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact", href: "/contact", highlight: true },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Impressum", href: "/impressum" },
      { label: "Privacy notice", href: "/privacy" },
      { label: "Terms and conditions", href: "/terms" },
    ],
  },
];

export const footerContact = {
  email: "info@flicksoftgroup.com",
  // TODO: replace with the FlickSoft company page URL.
  linkedin: "https://www.linkedin.com/",
};

export const footerLegalLine = "A German UG and a UK Ltd.";
