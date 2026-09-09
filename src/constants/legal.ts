export type LegalDocument = 'terms' | 'privacy';

export const LEGAL_CONTENT: Record<
  LegalDocument,
  { title: string; content: string }
> = {
  terms: {
    title: 'Terms of Use',
    content:
      'By using PlantApp, you agree to use the app responsibly and only for personal, lawful purposes. Plant identification results are provided for informational purposes and should not replace professional advice, especially when a plant may be poisonous or unsafe. Features and subscriptions are subject to the applicable purchase and cancellation terms.',
  },
  privacy: {
    title: 'Privacy Policy',
    content:
      'PlantApp may process information you provide and technical usage data to provide, improve, and secure the app. If you use plant identification, images may be processed to provide results. We do not sell personal information. You can manage app permissions in your device settings. This summary is for convenience; the applicable privacy policy governs our practices.',
  },
};
