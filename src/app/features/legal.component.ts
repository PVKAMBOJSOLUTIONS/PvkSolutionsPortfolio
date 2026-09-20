import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-legal',
  standalone: true,
  imports: [RouterLink],
  template: `
    <article class="legal-content">
      <p class="eyebrow">Website information</p>
      @if (isPrivacy) {
        <h1>Privacy policy.</h1>
        <p>This notice explains the data handling of Pratham Kamboj's informational portfolio.</p>
        <h2>Browsing this website</h2>
        <p>The portfolio application does not use advertising trackers, analytics scripts, or browser storage to track visitors. The hosting provider may process technical request information, such as IP addresses and browser details, to deliver and secure the website.</p>
        <h2>Contacting me</h2>
        <p>The contact form prepares a draft in your own email application. It does not send the form fields to a website backend or save them in browser storage. You choose whether to send the draft.</p>
        <p>If you send an email, your email address, name, and message become part of that correspondence and are handled by the email services involved. Please do not include sensitive personal information in an initial inquiry.</p>
        <h2>External links</h2>
        <p>Social profiles, map links, source repositories, and project demos are external websites. Their own privacy policies apply when you visit them. External content is linked rather than embedded.</p>
        <h2>Privacy questions</h2>
        <p>For questions about correspondence or to request deletion of information you have sent, contact <a href="mailto:prathamkamboj002@gmail.com">prathamkamboj002&#64;gmail.com</a>.</p>
      } @else {
        <h1>Terms of service.</h1>
        <p>These terms apply to use of Pratham Kamboj's informational portfolio.</p>
        <h2>Purpose of the website</h2>
        <p>This website presents professional experience, technical skills, and project summaries. It does not provide a paid service, take payments, or create a client relationship. Any professional engagement requires a separate agreement.</p>
        <h2>Portfolio material</h2>
        <p>You may browse the portfolio and download the resume for personal evaluation or recruitment. Project names, trademarks, and third-party materials belong to their respective owners. A project description does not grant a license to its source code or other materials.</p>
        <h2>Information and availability</h2>
        <p>Project status and technical information may change. Please confirm details directly before relying on them for an engagement. Continuous availability of this website or external project links is not guaranteed.</p>
        <h2>External websites</h2>
        <p>Links to external sites are provided for reference. Those sites are governed by their own terms. A link does not imply ownership or control of the linked service.</p>
        <h2>Contact</h2>
        <p>Questions about the portfolio or these terms can be sent to <a href="mailto:prathamkamboj002@gmail.com">prathamkamboj002&#64;gmail.com</a>.</p>
      }
      <a routerLink="/contact" class="text-link">Contact information</a>
    </article>
  `
})
export class LegalComponent {
  private readonly route = inject(ActivatedRoute);
  get isPrivacy(): boolean { return this.route.snapshot.data['kind'] === 'privacy'; }
}
