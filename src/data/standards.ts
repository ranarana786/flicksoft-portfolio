export interface OperatingStandard {
  /** The recognised name — set in the stronger weight. */
  name: string;
  /** How we apply it — set quieter beside the name. */
  qualifier?: string;
}

export const operatingStandards: OperatingStandard[] = [
  { name: "GDPR / DSGVO", qualifier: "Art. 28" },
  { name: "ITIL", qualifier: "aligned" },
  { name: "ISO 27001", qualifier: "aligned" },
  { name: "CEFR B2", qualifier: "minimum" },
  { name: "DE UG + UK Ltd" },
];
