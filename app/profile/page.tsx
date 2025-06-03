'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { api } from '@/convex/_generated/api';

import { useQuery } from 'convex/react';
import { useState } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Profile',
  description: 'Your profile',
};

export default function ProfilePage() {
  const user = useQuery(api.users.getUser);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [editedEmail, setEditedEmail] = useState('');

  if (!user) {
    return (
      <div className="container mx-auto py-8">
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-48" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Skeleton className="h-20 w-20 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleUpdateProfile = () => {
    // Dummy function to update profile
    console.log('Updating profile with:', { name: editedName, email: editedEmail });
    setIsEditing(false);
  };

  const handleUpdatePassword = () => {
    // Dummy function to update password
    console.log('Updating password');
  };

  const handleUpdatePreferences = () => {
    // Dummy function to update preferences
    console.log('Updating preferences');
  };

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6 flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={user.image} alt={user.name} />
              <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-semibold">{user.name}</h2>
              <p className="text-muted-foreground">{user.email}</p>
            </div>
          </div>

          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-4">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Name</label>
                  {isEditing ? (
                    <Input
                      value={editedName}
                      onChange={e => setEditedName(e.target.value)}
                      placeholder="Enter your name"
                      className="mt-1"
                    />
                  ) : (
                    <p className="text-muted-foreground mt-1">{user.name}</p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium">Email</label>
                  {isEditing ? (
                    <Input
                      value={editedEmail}
                      onChange={e => setEditedEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="mt-1"
                    />
                  ) : (
                    <p className="text-muted-foreground mt-1">{user.email}</p>
                  )}
                </div>
                {isEditing ? (
                  <div className="flex gap-2">
                    <Button onClick={handleUpdateProfile}>Save Changes</Button>
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <Button
                    onClick={() => {
                      setIsEditing(true);
                      setEditedName(user.name || '');
                      setEditedEmail(user.email || '');
                    }}
                  >
                    Edit Profile
                  </Button>
                )}
              </div>
            </TabsContent>

            <TabsContent value="security" className="space-y-4">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Current Password</label>
                  <Input type="password" className="mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium">New Password</label>
                  <Input type="password" className="mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium">Confirm New Password</label>
                  <Input type="password" className="mt-1" />
                </div>
                <Button onClick={handleUpdatePassword}>Update Password</Button>
              </div>
            </TabsContent>

            <TabsContent value="preferences" className="space-y-4">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Email Notifications</label>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="notify-ratings" />
                      <label htmlFor="notify-ratings">Notify me when someone rates my reviews</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="notify-watchlist" />
                      <label htmlFor="notify-watchlist">Notify me about watchlist updates</label>
                    </div>
                  </div>
                </div>
                <Button onClick={handleUpdatePreferences}>Save Preferences</Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
