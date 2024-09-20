import React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

type ImageResult = {
  title: string;
  image: string;
  thumbnail: string;
  url: string;
  height: number;
  width: number;
  source: string;
};

type ImageCarouselProps = {
  results?: ImageResult[];
};

const ImageCarousel: React.FC<ImageCarouselProps> = ({ results }) => {
  return (
    <div className="relative mx-auto w-full max-w-sm">
      <Carousel opts={{ align: "start" }} className="w-full">
        <CarouselContent>
          {results?.map((result, index) => (
            <CarouselItem key={index}>
              <div className="p-4 border bg-white rounded-md shadow-lg">
                <a href={result.url} target="_blank" rel="noopener noreferrer">
                  <img
                    src={result.thumbnail}
                    alt={result.title}
                    className="w-full h-auto object-cover rounded-md"
                  />
                </a>
                <h3 className="mt-2 text-center font-medium text-gray-700">{result.title}</h3>
                {/* <p className="text-center text-xs text-gray-500">{result.source}</p> */}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-100 text-gray-900" />
        <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-100 text-gray-900" />
      </Carousel>
    </div>
  );
};

export default ImageCarousel;
