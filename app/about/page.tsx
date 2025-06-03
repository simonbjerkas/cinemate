import { Metadata } from 'next';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Tmdb } from '@/components/tmdb';
import { Logo } from '@/components/cinemate';

import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn more about Cinemate - Your Movie Tracking Platform',
};

export default function AboutPage() {
  return (
    <div className="py-8">
      <div className="mb-8 flex items-center gap-4">
        <Logo className="size-16" />
        <div>
          <h1 className="text-2xl font-bold">About Cinemate</h1>
          <p className="text-muted-foreground text-sm">Your personal movie companion</p>
        </div>
      </div>

      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>What is Cinemate?</CardTitle>
            <CardDescription>
              Cinemate is a modern platform for movie enthusiasts to track, rate, and discover films.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="mission">
                <AccordionTrigger>Our Mission</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">
                    We aim to create a seamless experience for movie lovers to keep track of their film journey, share
                    their thoughts, and discover new movies based on their preferences.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="features">
                <AccordionTrigger>Key Features</AccordionTrigger>
                <AccordionContent>
                  <ul className="text-muted-foreground list-disc space-y-2 pl-6">
                    <li>Track movies you&apos;ve watched</li>
                    <li>Rate and review films</li>
                    <li>Create and manage watchlists</li>
                    <li>Discover trending and popular movies</li>
                    <li>Connect with other movie enthusiasts</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Technology</CardTitle>
            <CardDescription>Built with modern technologies for the best user experience.</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="stack">
                <AccordionTrigger>Tech Stack</AccordionTrigger>
                <AccordionContent>
                  <ul className="text-muted-foreground list-disc space-y-2 pl-6">
                    <li>Next.js for the frontend and API routes</li>
                    <li>Convex for real-time database and authentication</li>
                    <li>Tailwind CSS for styling</li>
                    <li>shadcn/ui for beautiful components</li>
                    <li>TMDB API for movie data</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="open-source">
                <AccordionTrigger>Open Source</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">
                    Cinemate is built using open-source technologies and follows best practices in web development. We
                    believe in the power of community-driven development and transparency.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Credits & Acknowledgments</CardTitle>
            <CardDescription>
              Special thanks to the services and communities that make Cinemate possible.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="tmdb">
                <AccordionTrigger>TMDB</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      This product uses the TMDB API but is not endorsed or certified by TMDB. Movie data and images are
                      provided by TMDB.
                    </p>
                    <div className="flex items-center gap-4">
                      <Tmdb className="w-32" />
                      <Button asChild variant="outline">
                        <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer">
                          Visit TMDB
                        </a>
                      </Button>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="contributors">
                <AccordionTrigger>Contributors</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">
                    Cinemate is developed and maintained by Simon Bjerkås. Special thanks to the open-source community
                    and all the amazing tools that make this project possible.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Get in Touch</CardTitle>
            <CardDescription>Have questions or suggestions? We&apos;d love to hear from you.</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="contact">
                <AccordionTrigger>Contact Information</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">
                    You can reach us at:{' '}
                    <a href="mailto:simon.bjerkas10@gmail.com" className="text-primary hover:underline">
                      simon.bjerkas10@gmail.com
                    </a>
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="legal">
                <AccordionTrigger>Legal Information</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    <p className="text-muted-foreground">
                      Please review our{' '}
                      <Link href="/privacy" className="text-primary hover:underline">
                        Privacy Policy
                      </Link>{' '}
                      and{' '}
                      <Link href="/terms" className="text-primary hover:underline">
                        Terms of Service
                      </Link>{' '}
                      for more information.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
