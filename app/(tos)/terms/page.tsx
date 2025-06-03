import { Metadata } from 'next';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for Cinemate - Your Movie Tracking Platform',
};

export default function TermsOfService() {
  return (
    <div className="py-8">
      <h1 className="text-2xl font-bold">Terms of Service</h1>
      <p className="text-muted-foreground mb-8 text-sm">Last updated: {new Date().toLocaleDateString()}</p>

      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Introduction</CardTitle>
            <CardDescription>
              Welcome to Cinemate. These Terms of Service govern your use of our movie tracking platform and services.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="agreement">
                <AccordionTrigger>Agreement to Terms</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">
                    By accessing or using Cinemate, you agree to be bound by these Terms of Service and all applicable
                    laws and regulations. If you do not agree with any of these terms, you are prohibited from using or
                    accessing this site.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="changes">
                <AccordionTrigger>Changes to Terms</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">
                    We reserve the right to modify these terms at any time. We will notify users of any material changes
                    by posting the new Terms of Service on this page.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Accounts & Responsibilities</CardTitle>
            <CardDescription>
              Information about user accounts, responsibilities, and acceptable use of the platform.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="account-creation">
                <AccordionTrigger>Account Creation</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground mb-4">To use certain features of Cinemate, you must:</p>
                  <ul className="text-muted-foreground list-disc space-y-2 pl-6">
                    <li>Be at least 13 years old</li>
                    <li>Provide accurate and complete information</li>
                    <li>Maintain the security of your account</li>
                    <li>Notify us immediately of any unauthorized use</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="acceptable-use">
                <AccordionTrigger>Acceptable Use</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground mb-4">You agree not to:</p>
                  <ul className="text-muted-foreground list-disc space-y-2 pl-6">
                    <li>Use the service for any illegal purpose</li>
                    <li>Harass, abuse, or harm others</li>
                    <li>Post or transmit unauthorized commercial communications</li>
                    <li>Engage in any activity that interferes with the service</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Content & Intellectual Property</CardTitle>
            <CardDescription>
              Information about content ownership, intellectual property rights, and user-generated content.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="user-content">
                <AccordionTrigger>User-Generated Content</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground mb-4">When you post content on Cinemate:</p>
                  <ul className="text-muted-foreground list-disc space-y-2 pl-6">
                    <li>You retain ownership of your content</li>
                    <li>You grant us a license to use, modify, and display your content</li>
                    <li>You are responsible for the content you post</li>
                    <li>You must have the rights to share the content</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="platform-content">
                <AccordionTrigger>Platform Content</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">
                    All content provided by Cinemate, including but not limited to text, graphics, logos, and software,
                    is the property of Cinemate or its content suppliers and is protected by international copyright
                    laws.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Service & Limitations</CardTitle>
            <CardDescription>Information about service availability, limitations, and termination.</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="service-availability">
                <AccordionTrigger>Service Availability</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">
                    We strive to provide uninterrupted service, but we do not guarantee that the service will be
                    available at all times. We reserve the right to modify, suspend, or discontinue the service at any
                    time.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="termination">
                <AccordionTrigger>Account Termination</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground mb-4">We may terminate or suspend your account if:</p>
                  <ul className="text-muted-foreground list-disc space-y-2 pl-6">
                    <li>You violate these Terms of Service</li>
                    <li>You engage in fraudulent or illegal activities</li>
                    <li>You abuse the service or other users</li>
                    <li>We need to comply with legal requirements</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Legal & Contact</CardTitle>
            <CardDescription>Important legal information and how to contact us regarding these terms.</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="disclaimer">
                <AccordionTrigger>Disclaimer</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">
                    Cinemate is provided &quot;as is&quot; without any warranties, expressed or implied. We do not
                    guarantee that the service will be error-free or uninterrupted.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="contact">
                <AccordionTrigger>Contact Information</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">
                    If you have any questions about these Terms of Service, please contact us at:{' '}
                    <a href="mailto:simon.bjerkas10@gmail.com" className="text-primary hover:underline">
                      simon.bjerkas10@gmail.com
                    </a>
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
