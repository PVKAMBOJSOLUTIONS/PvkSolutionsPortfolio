import { Component, Input, OnChanges } from '@angular/core';

/**
 * Theme-matched line icons that replace OS emoji.
 * Usage: <app-icon name="angular"></app-icon> or <app-icon [name]="skill.icon">
 * `name` accepts an icon key, a display name ("Angular", ".NET Web API"),
 * or an emoji coming from the API ("🚀") — all resolve to the same glyph.
 * The svg sizes to 1em and strokes currentColor, so it inherits the
 * surrounding font-size and color exactly like the emoji did.
 */
@Component({
  selector: 'app-icon',
  standalone: true,
  template: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
         stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      @switch (key) {
        @case ('rocket') {
          <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
          <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
          <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
          <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
        }
        @case ('briefcase') {
          <rect x="2" y="7" width="20" height="14" rx="2"/>
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
        }
        @case ('graduation') {
          <path d="M21.42 10.92a1 1 0 0 0-.02-1.84L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.83l8.57 3.91a2 2 0 0 0 1.66 0z"/>
          <path d="M22 10v6"/>
          <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/>
        }
        @case ('gear') {
          <circle cx="12" cy="12" r="3"/>
          <path d="M12 2v3M12 19v3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M2 12h3M19 12h3M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12"/>
        }
        @case ('palette') {
          <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/>
          <circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/>
          <circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/>
          <circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/>
          <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.93 0 1.65-.75 1.65-1.69 0-.44-.18-.84-.44-1.13-.29-.29-.44-.65-.44-1.12a1.64 1.64 0 0 1 1.67-1.67h1.99c3.06 0 5.55-2.5 5.55-5.55C21.97 6.01 17.46 2 12 2z"/>
        }
        @case ('mobile') {
          <rect x="5" y="2" width="14" height="20" rx="2"/>
          <path d="M12 18h.01"/>
        }
        @case ('phone') {
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
        }
        @case ('database') {
          <ellipse cx="12" cy="5" rx="9" ry="3"/>
          <path d="M3 5v14a9 3 0 0 0 18 0V5"/>
          <path d="M3 12a9 3 0 0 0 18 0"/>
        }
        @case ('flask') {
          <path d="M10 2v7.53a2 2 0 0 1-.21.9L4.7 20.3a1 1 0 0 0 .9 1.5h12.8a1 1 0 0 0 .9-1.5l-5.09-9.87A2 2 0 0 1 14 9.53V2"/>
          <path d="M8.5 2h7"/>
          <path d="M7 16h10"/>
        }
        @case ('code') {
          <path d="m16 18 6-6-6-6"/>
          <path d="m8 6-6 6 6 6"/>
        }
        @case ('tools') {
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
        }
        @case ('star') {
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26"/>
        }
        @case ('sparkle') {
          <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3z"/>
          <path d="M19 15l.75 2.25L22 18l-2.25.75L19 21l-.75-2.25L16 18l2.25-.75L19 15z"/>
        }
        @case ('bolt') {
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
        }
        @case ('users') {
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        }
        @case ('user') {
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        }
        @case ('link') {
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
        }
        @case ('folder') {
          <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/>
        }
        @case ('document') {
          <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/>
          <path d="M14 2v4a2 2 0 0 0 2 2h4"/>
          <path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/>
        }
        @case ('download') {
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="7 10 12 15 17 10"/>
          <line x1="12" x2="12" y1="15" y2="3"/>
        }
        @case ('chat') {
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        }
        @case ('send') {
          <path d="m22 2-7 20-4-9-9-4Z"/>
          <path d="M22 2 11 13"/>
        }
        @case ('mail') {
          <rect width="20" height="16" x="2" y="4" rx="2"/>
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
        }
        @case ('edit') {
          <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
          <path d="m15 5 4 4"/>
        }
        @case ('message') {
          <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>
        }
        @case ('error') {
          <circle cx="12" cy="12" r="10"/>
          <path d="m15 9-6 6"/><path d="m9 9 6 6"/>
        }
        @case ('home') {
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        }
        @case ('camera') {
          <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/>
          <circle cx="12" cy="13" r="3"/>
        }
        @case ('pin') {
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
          <circle cx="12" cy="10" r="3"/>
        }
        @case ('trophy') {
          <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
          <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
          <path d="M4 22h16"/>
          <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
          <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
          <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
        }
        @case ('compass') {
          <circle cx="12" cy="12" r="10"/>
          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
        }
        @case ('gamepad') {
          <line x1="6" x2="10" y1="11" y2="11"/>
          <line x1="8" x2="8" y1="9" y2="13"/>
          <line x1="15" x2="15.01" y1="12" y2="12"/>
          <line x1="18" x2="18.01" y1="10" y2="10"/>
          <path d="M17.32 5H6.68a4 4 0 0 0-3.98 3.59c-.01.06-.01.12-.01.19C2.6 10.4 2 15.14 2 17a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.41-1.41A2 2 0 0 1 9.83 17h4.34a2 2 0 0 1 1.41.59L17 19c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.86-.6-6.6-.69-8.22 0-.07 0-.13-.01-.19A4 4 0 0 0 17.32 5z"/>
        }
        @case ('monitor') {
          <rect width="20" height="14" x="2" y="3" rx="2"/>
          <line x1="8" x2="16" y1="21" y2="21"/>
          <line x1="12" x2="12" y1="17" y2="21"/>
        }
        @case ('globe') {
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/>
          <path d="M2 12h20"/>
        }
        @case ('github') {
          <path fill="currentColor" stroke="none" d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        }
        @case ('clipboard') {
          <rect width="8" height="4" x="8" y="2" rx="1"/>
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
          <path d="M9 12h6"/><path d="M9 16h6"/>
        }
        @case ('wave') {
          <path d="M2 12c1.5-1.5 3-1.5 4.5 0s3 1.5 4.5 0 3-1.5 4.5 0 3 1.5 4.5 0 3-1.5 4.5 0"/>
          <path d="M2 17c1.5-1.5 3-1.5 4.5 0s3 1.5 4.5 0 3-1.5 4.5 0 3 1.5 4.5 0 3-1.5 4.5 0"/>
          <path d="M2 7c1.5-1.5 3-1.5 4.5 0s3 1.5 4.5 0 3-1.5 4.5 0 3 1.5 4.5 0 3-1.5 4.5 0"/>
        }
        @case ('arrow-left') {
          <path d="m12 19-7-7 7-7"/>
          <path d="M19 12H5"/>
        }
        @case ('arrow-right') {
          <path d="M5 12h14"/>
          <path d="m12 5 7 7-7 7"/>
        }
        @case ('arrow-up') {
          <path d="m5 12 7-7 7 7"/>
          <path d="M12 19V5"/>
        }
        @case ('angular') {
          <path d="M12 2.5 4 5.8 5.4 16.8 12 21.5l6.6-4.7L20 5.8z"/>
          <path fill="currentColor" stroke="none" d="M12 7 8.2 15h1.6l.8-1.9h2.8l.8 1.9h1.6zm0 3.5 1 2.4h-2z"/>
        }
        @case ('dotnet') {
          <rect x="2" y="4" width="20" height="16" rx="4"/>
          <text x="12" y="15" text-anchor="middle" font-size="6.5" font-weight="800" fill="currentColor" stroke="none">.NET</text>
        }
        @case ('csharp') {
          <rect x="2" y="4" width="20" height="16" rx="4"/>
          <text x="12" y="15" text-anchor="middle" font-size="7.5" font-weight="800" fill="currentColor" stroke="none">C#</text>
        }
        @case ('git') {
          <line x1="6" x2="6" y1="3" y2="15"/>
          <circle cx="18" cy="6" r="3"/>
          <circle cx="6" cy="18" r="3"/>
          <path d="M18 9a9 9 0 0 1-9 9"/>
        }
        @case ('server') {
          <rect x="2" y="2" width="20" height="8" rx="2"/>
          <rect x="2" y="14" width="20" height="8" rx="2"/>
          <line x1="6" x2="6.01" y1="6" y2="6"/>
          <line x1="6" x2="6.01" y1="18" y2="18"/>
        }
        @case ('cloud') {
          <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>
        }
        @case ('music') {
          <path d="M9 18V5l12-2v13"/>
          <circle cx="6" cy="18" r="3"/>
          <circle cx="18" cy="16" r="3"/>
        }
        @case ('flame') {
          <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.07-2.14-.22-4.05 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.15.43-2.29 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
        }
        @default {
          <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3z"/>
          <path d="M19 15l.75 2.25L22 18l-2.25.75L19 21l-.75-2.25L16 18l2.25-.75L19 15z"/>
        }
      }
    </svg>
  `,
  styles: [`
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      line-height: 0;
      flex-shrink: 0;
    }
    svg {
      width: 1em;
      height: 1em;
      display: block;
    }
  `]
})
export class IconComponent implements OnChanges {
  @Input() name = '';
  key = 'sparkle';

  // Emoji values returned by the API/mock data → icon keys
  private static readonly EMOJI_ICONS: Record<string, string> = {
    '🚀': 'rocket', '💼': 'briefcase', '🎓': 'graduation', '⚙': 'gear',
    '🎨': 'palette', '📱': 'mobile', '📞': 'phone', '🗄': 'database',
    '🗃': 'database', '🧪': 'flask', '🏸': 'trophy', '🏍': 'compass',
    '🎮': 'gamepad', '🖥': 'monitor', '💻': 'code', '🛠': 'tools',
    '⭐': 'star', '✨': 'sparkle', '🤝': 'users', '🔗': 'link',
    '📁': 'folder', '📄': 'document', '💬': 'chat', '👤': 'user',
    '📧': 'mail', '✉': 'mail', '📝': 'edit', '💭': 'message',
    '❌': 'error', '⚠': 'error', '🏠': 'home', '📸': 'camera',
    '📍': 'pin', '🌐': 'globe', '📋': 'clipboard', '👋': 'wave',
    '⚡': 'bolt', '🅰': 'angular', '🔥': 'flame', '🎵': 'music',
    '🎶': 'music', '🎧': 'music', '🎤': 'music', '☁': 'cloud', '🖧': 'server'
  };

  // Display-name keywords → icon keys (order matters: first match wins)
  private static readonly KEYWORD_ICONS: [string, string][] = [
    ['maui', 'mobile'],
    ['angular', 'angular'],
    ['dotnet', 'dotnet'], ['.net', 'dotnet'], ['asp.net', 'dotnet'],
    ['csharp', 'csharp'], ['c#', 'csharp'],
    ['sql', 'database'], ['database', 'database'],
    ['integrat', 'link'], ['webhook', 'link'],
    ['ci/cd', 'rocket'], ['devops', 'rocket'], ['deploy', 'rocket'],
    ['nunit', 'flask'], ['test', 'flask'],
    ['azure', 'cloud'], ['cloud', 'cloud'],
    ['server', 'server'], ['infra', 'server'], ['k3s', 'server'],
    ['kubernetes', 'server'], ['ansible', 'server'],
    ['music', 'music'], ['song', 'music'], ['aporia', 'music'],
    ['firebase', 'flame'], ['git', 'git'],
    ['typescript', 'code'], ['javascript', 'code'], ['xaml', 'code'], ['code', 'code'],
    ['phone', 'phone'], ['location', 'pin'], ['map', 'pin'],
    ['email', 'mail'], ['mail', 'mail'],
    ['travel', 'compass'], ['adventure', 'compass'],
    ['sport', 'trophy'], ['game', 'gamepad'],
    ['member', 'users'], ['frontend', 'palette'], ['design', 'palette'],
    ['resume', 'document'], ['doc', 'document'],
    ['home', 'home'], ['project', 'folder'],
    ['globe', 'globe'], ['demo', 'globe'], ['web', 'globe'],
    ['mobile', 'mobile'], ['monitor', 'monitor'], ['computer', 'monitor'],
    ['chat', 'chat'], ['message', 'message'], ['send', 'send'],
    ['camera', 'camera'], ['photo', 'camera'], ['clip', 'clipboard'],
    ['tool', 'tools'], ['setting', 'gear'], ['gear', 'gear'],
    ['education', 'graduation'], ['school', 'graduation'], ['b.tech', 'graduation'],
    ['briefcase', 'briefcase'], ['work', 'briefcase'], ['job', 'briefcase'],
    ['user', 'user'], ['link', 'link'], ['pin', 'pin'],
    ['star', 'star'], ['bolt', 'bolt'], ['wave', 'wave'],
    ['error', 'error'], ['warn', 'error']
  ];

  ngOnChanges(): void {
    this.key = IconComponent.resolve(this.name);
  }

  static resolve(raw: string): string {
    const n = (raw || '')
      .toLowerCase()
      .replace(/\uFE0F|\u200D/g, '') // strip emoji variation selector + ZWJ
      .trim();
    if (!n) return 'sparkle';

    for (const [emoji, key] of Object.entries(IconComponent.EMOJI_ICONS)) {
      if (n.includes(emoji.toLowerCase())) return key;
    }
    for (const [keyword, key] of IconComponent.KEYWORD_ICONS) {
      if (n.includes(keyword)) return key;
    }
    return 'sparkle';
  }
}
