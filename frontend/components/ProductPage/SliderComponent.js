import React from "react";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
  Image,
} from "pure-react-carousel";

export default function SliderComponent({ images }) {
  return (
    <>
      {images?.length > 1 ? (
        <CarouselProvider
          visibleSlides={1}
          totalSlides={images?.length}
          step={1}
          naturalSlideWidth={400}
          naturalSlideHeight={400}
          className="text-center"
          isIntrinsicHeight
          style={{ width: "650px" }}
        >
          <Slider>
            {images?.map(({ url }, index) => {
              return (
                <Slide index={index}>
                  <div>
                    <center>
                      <Image
                        style={{ height: "400px", width: "400px" }}
                        src={`http://localhost:1337${url}`}
                        isBgImage
                      />
                    </center>
                  </div>
                </Slide>
              );
            })}
          </Slider>
          <div className="mt-8">
            <ButtonBack className="focus:outline-none">
              <div className="w-6 slider-left"></div>
            </ButtonBack>
            <ButtonNext className="focus:outline-none">
              <div className="w-6 slider-right"></div>
            </ButtonNext>
          </div>
        </CarouselProvider>
      ) : (
        <div style={{ height: "400px", width: "650px" }}>
          <center>
            <img
              style={{ height: "400px", width: "400px" }}
              src={`http://localhost:1337${images[0]?.url}`}
            />
          </center>
        </div>
      )}
    </>
  );
}
