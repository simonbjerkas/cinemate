import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function ActivitySection() {
  return (
    <section className="mb-12">
      <h2 className="mb-6 text-2xl font-bold">Recent Activity</h2>
      <div className="space-y-4">
        {[
          {
            id: 1,
            userId: 1,
            content: 'Activity 1',
            createdAt: new Date(),
          },
          {
            id: 2,
            userId: 2,
            content: 'Activity 2',
            createdAt: new Date(),
          },
          {
            id: 3,
            userId: 3,
            content: 'Activity 3',
            createdAt: new Date(),
          },
          {
            id: 4,
            userId: 4,
            content: 'Activity 4',
            createdAt: new Date(),
          },
        ].map(activity => (
          <Card key={activity.id}>
            <CardHeader>
              <CardTitle>{activity.content}</CardTitle>
              <CardDescription>{activity.createdAt.toLocaleDateString()}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{activity.content}</p>
              <p>{activity.createdAt.toLocaleDateString()}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
