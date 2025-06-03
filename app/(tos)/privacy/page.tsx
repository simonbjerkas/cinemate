import { Metadata } from 'next';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for Cinemate - Your Movie Tracking Platform',
};

export default function PrivacyPolicy() {
  return (
    <div className="py-8">
      <h1 className="text-2xl font-bold">Privacy Policy</h1>
      <p className="text-muted-foreground mb-8 text-sm">Last updated: {new Date().toLocaleDateString()}</p>

      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Introduction</CardTitle>
            <CardDescription>
              Welcome to Cinemate. This Privacy Policy explains how we collect, use, and protect your personal
              information when you use our movie tracking platform.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="overview">
                <AccordionTrigger>Overview</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">
                    This privacy policy outlines how we handle your data, what information we collect, and your rights
                    regarding your personal information.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="scope">
                <AccordionTrigger>Scope</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">
                    This policy applies to all users of Cinemate, including those who browse, rate, review, or interact
                    with movies on our platform.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Data Collection & Usage</CardTitle>
            <CardDescription>
              Learn about what information we collect and how we use it to provide and improve our services.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="information-collected">
                <AccordionTrigger>Information We Collect</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground mb-4">We collect the following information:</p>
                  <ul className="text-muted-foreground list-disc space-y-2 pl-6">
                    <li>Authentication information through Google OAuth</li>
                    <li>Movie ratings and reviews you submit</li>
                    <li>Your watchlist information</li>
                    <li>Basic movie interaction data (movies you&apos;ve rated or reviewed)</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="information-use">
                <AccordionTrigger>How We Use Your Information</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground mb-4">We use your information to:</p>
                  <ul className="text-muted-foreground list-disc space-y-2 pl-6">
                    <li>Provide and maintain our service</li>
                    <li>Store your movie preferences and ratings</li>
                    <li>Manage your watchlist</li>
                    <li>Improve our platform based on usage patterns</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Third-Party Services & Cookies</CardTitle>
            <CardDescription>Information about the third-party services we use and our cookie policy.</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="third-party">
                <AccordionTrigger>Third-Party Services</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground mb-4">We use the following third-party services:</p>
                  <ul className="text-muted-foreground list-disc space-y-2 pl-6">
                    <li>Google OAuth for authentication</li>
                    <li>PostHog for analytics (planned)</li>
                    <li>Vercel Speed and Analytics Insights (planned)</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="cookies">
                <AccordionTrigger>Cookies</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">
                    We only use cookies that are essential for authentication purposes. These cookies are necessary for
                    the proper functioning of our service.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Data Protection & Your Rights</CardTitle>
            <CardDescription>
              Information about how we protect your data and your rights regarding your personal information.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="data-sharing">
                <AccordionTrigger>Data Sharing</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">
                    We do not share your personal data with any third parties. Your data is used solely for the purpose
                    of providing and improving our service.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="rights">
                <AccordionTrigger>Your Rights</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground mb-4">
                    You have full control over your data, including the right to:
                  </p>
                  <ul className="text-muted-foreground list-disc space-y-2 pl-6">
                    <li>Access your personal data</li>
                    <li>Delete all your data</li>
                    <li>Modify your data</li>
                    <li>Export your data</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact & Updates</CardTitle>
            <CardDescription>How to contact us and information about policy updates.</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="contact">
                <AccordionTrigger>Contact Information</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">
                    If you have any questions about this Privacy Policy or our data practices, please contact us at:{' '}
                    <a href="mailto:simon.bjerkas10@gmail.com" className="text-primary hover:underline">
                      simon.bjerkas10@gmail.com
                    </a>
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="changes">
                <AccordionTrigger>Changes to This Policy</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">
                    We may update this Privacy Policy from time to time. We will notify you of any changes by posting
                    the new Privacy Policy on this page.
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
