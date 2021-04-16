import React from "react";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
  Image,
} from "pure-react-carousel";

export default function SliderComponent({ Images }) {
  return (
    <>
      {Images.length > 1 ? (
        <CarouselProvider
          visibleSlides={1}
          totalSlides={2}
          step={1}
          naturalSlideWidth={400}
          naturalSlideHeight={400}
          className="text-center"
          isIntrinsicHeight
        >
          <Slider>
            {Images.map(({ url }, index) => {
              return (
                <Slide index={index}>
                  <div>
                    <center>
                      <Image
                        style={{ height: "400px", width: "400px" }}
                        src={`http://localhost:1337${url}`}
                      />
                    </center>
                  </div>
                </Slide>
              );
            })}
          </Slider>
          <div className="mt-8">
            <ButtonBack>
              <img className="w-6 mt-2" src="chevron-disc-left.svg" />
            </ButtonBack>
            <ButtonNext>
              <img className="w-6" src="chevron-disc-right.svg" />
            </ButtonNext>
          </div>
        </CarouselProvider>
      ) : (
        <div style={{ height: "400px", width: "650px" }}>
          <center>
            <img
              style={{ height: "400px", width: "400px" }}
              src={`http://localhost:1337${Images[0].url}`}
            />
          </center>
        </div>
      )}
    </>
  );
}
