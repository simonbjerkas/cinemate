import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { ProfileDetails } from './details';
import { ProfilePreferences } from './preferences';

import { withAuth } from '@workos-inc/authkit-nextjs';

export default async function ProfilePage() {
  const { user } = await withAuth({ ensureSignedIn: true });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6 flex items-center gap-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={user.profilePictureUrl || ''} alt={`${user.firstName || ''} ${user.lastName || ''}`} />
            <AvatarFallback>
              {user.firstName && user.lastName ? `${user.firstName.charAt(0)}${user.lastName.charAt(0)}` : ''}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-semibold">
              {user.firstName} {user.lastName}
            </h2>
            <p className="text-muted-foreground">{user.email}</p>
          </div>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-2 gap-1">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="mt-4 flex flex-col gap-4">
            <ProfileDetails />
          </TabsContent>

          <TabsContent value="preferences" className="mt-4 flex flex-col gap-4">
            <ProfilePreferences />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
