import React from "react";
import { fetcherGRAPHQL } from "../utils/fetcher";
import { LANDING_PAGE_QUERY } from "../utils/schemas/query";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
  Image,
} from "pure-react-carousel";
import Link from "next/link";
import gsap from "gsap";

export default function Home({ data }) {
  return (
    <div>
      <div>
        <img
          style={{
            height: "calc(100vh - 3rem)",
            width: "100%",
            filter: "brightness(.6)",
          }}
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
          infinite
        >
          <Slider>
            {data.products.map(({ name, images }, idx) => {
              return (
                <Slide index={idx}>
                  <Link href={`/products?id=${idx}`} as="/products">
                    <div
                      className="h-100 cursor-pointer"
                      onMouseOver={(e) =>
                        gsap.to(e.currentTarget, {
                          y: "50px",
                        })
                      }
                      onMouseLeave={(e) =>
                        gsap.to(e.currentTarget, {
                          y: 0,
                        })
                      }
                    >
                      <center>
                        <Image
                          style={{ height: "200px", width: "200px" }}
                          src={`http://localhost:1337${images[0].url}`}
                          isBgImage
                        />
                      </center>
                      <div className="mt-4 font-bold">{name}</div>
                    </div>
                  </Link>
                </Slide>
              );
            })}
          </Slider>
          <ButtonBack className="focus:outline-none">
            <div className="w-6 slider-left"></div>
          </ButtonBack>
          <ButtonNext className="focus:outline-none">
            <div className="w-6 slider-right"></div>
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
