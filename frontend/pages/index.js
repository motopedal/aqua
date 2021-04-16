import React from "react";
import { fetcherGRAPHQL } from "../utils/fetcher";
import { LANDING_PAGE_QUERY } from "../utils/schemas/query";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
  ImageWithZoom,
} from "pure-react-carousel";

export default function Home({ data }) {
  return (
    <div>
      <div>
        <img
          style={{ height: "100vh", width: "100%" }}
          src={`http://localhost:1337${data.Video.url}`}
        />
      </div>

      <h1 className="text-center mt-10 font-bold text-4xl">Products</h1>
      <div>
        <CarouselProvider
          visibleSlides={3}
          totalSlides={data.products.length}
          step={2}
          naturalSlideWidth={500}
          naturalSlideHeight={400}
          className="p-36 text-center"
          isPlaying
        >
          <Slider>
            {data.products.map(({ Name, price, Images }, idx) => {
              return (
                <Slide index={idx}>
                  <div className="h-100">
                    <center>
                      <ImageWithZoom
                        style={{ height: "200px", width: "200px" }}
                        src={`http://localhost:1337${Images[0].url}`}
                        isBgImage
                      />
                    </center>
                    <div className="mt-4 font-bold">{Name}</div>
                    <div>{price}€</div>
                  </div>
                </Slide>
              );
            })}
          </Slider>
          <ButtonBack>
            <img className="w-6" src="chevron-disc-left.svg" />
          </ButtonBack>
          <ButtonNext>
            <img className="w-6" src="chevron-disc-right.svg" />
          </ButtonNext>
        </CarouselProvider>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const data = await fetcherGRAPHQL(LANDING_PAGE_QUERY);
  return {
    props: { data: data.landingPage },
  };
}
