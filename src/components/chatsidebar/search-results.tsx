import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface SearchResult {
  href: string;
  title: string;
  body: string;
}

function CardComponent({ data }: { data: SearchResult }) {
  return (
    <a
      href={data.href}
      target="_blank"
      rel="noopener noreferrer"
      className="block"
    >
      <Card className="mx-auto flex w-full max-w-sm transform cursor-pointer flex-col border-none bg-gray-100 text-gray-900 transition-transform hover:scale-105 hover:shadow-lg hover:underline">
        <CardHeader>
          <CardTitle>{data.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex-1">
          <p>{data.body}</p>
        </CardContent>
      </Card>
    </a>
  );
}

export default function CarouselCards({
  results,
}: {
  results?: SearchResult[];
}) {
  return (
    <div className="relative mx-auto w-full max-w-sm">
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent>
          {results?.map((result) => (
            <CarouselItem key={result.href}>
              <CardComponent data={result} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-100 text-gray-900" />
        <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-100 text-gray-900" />
      </Carousel>
    </div>
  );
}
