import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";

const fetchTopNews = async () => {
  const response = await fetch("https://api.example.com/top-news");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const Index = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["topNews"],
    queryFn: fetchTopNews,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container mx-auto p-4">
      <section className="mb-8">
        <Card>
          <CardHeader>
            <CardTitle>{data.topStory.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <img src={data.topStory.image} alt={data.topStory.title} className="w-full h-auto mb-4" />
            <p>{data.topStory.description}</p>
          </CardContent>
        </Card>
      </section>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.otherStories.map((story) => (
          <Card key={story.id}>
            <CardHeader>
              <CardTitle>{story.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <img src={story.image} alt={story.title} className="w-full h-auto mb-4" />
              <p>{story.description}</p>
            </CardContent>
          </Card>
        ))}
      </section>
      <aside className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Trending News</CardTitle>
          </CardHeader>
          <CardContent>
            <ul>
              {data.trending.map((item) => (
                <li key={item.id} className="mb-2">
                  <a href={item.link} className="hover:underline">{item.title}</a>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </aside>
    </div>
  );
};

export default Index;