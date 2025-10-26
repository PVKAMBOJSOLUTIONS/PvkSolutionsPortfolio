export interface ContactInfo {
  email: string;
  phone: string;
  location: string;
  socialLinks: SocialLink[];
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}