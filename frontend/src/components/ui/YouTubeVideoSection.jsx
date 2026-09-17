
import React, { useEffect, useRef, useState } from "react";
import { Play, ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const YouTubeVideoSection = () => {
  const sectionRef = useRef(null);
  const eyebrowRef = useRef(null);
  const headingRef = useRef(null);
  const descriptionRef = useRef(null);
  const videoRef = useRef(null);
  const lineRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          once: true,
        },
      });

      tl.fromTo(
        eyebrowRef.current,
        {
          opacity: 0,
          y: 18,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        }
      )
        .fromTo(
          headingRef.current,
          {
            opacity: 0,
            y: 65,
            clipPath: "inset(100% 0% 0% 0%)",
          },
          {
            opacity: 1,
            y: 0,
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.25,
            ease: "power4.out",
          },
          "-=0.45"
        )
        .fromTo(
          descriptionRef.current,
          {
            opacity: 0,
            y: 28,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
          },
          "-=0.65"
        )
        .fromTo(
          lineRef.current,
          {
            scaleX: 0,
            transformOrigin: "center center",
          },
          {
            scaleX: 1,
            duration: 1,
            ease: "power3.inOut",
          },
          "-=0.55"
        )
        .fromTo(
          videoRef.current,
          {
            opacity: 0,
            y: 70,
            scale: 0.965,
            clipPath: "inset(10% 0% 10% 0%)",
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.4,
            ease: "power4.out",
          },
          "-=0.65"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-cream "
    >

      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12 xl:px-16 border-t border-gold/50 py-16">

        {/* =====================================================
            HEADER
        ====================================================== */}

        <div className="mx-auto mb-10 max-w-5xl text-center">
          <h3 className="font-serif text-3xl font-bold leading-tight tracking-tight text-black md:text-5xl">
            Business Opportunity with <br /> <span className="text-gold-dark">Aryans Buildcon</span>
          </h3>
          {/* Gold divider */}

          <div className="my-7 flex items-center justify-center sm:my-8">
            <span
              ref={lineRef}
              className="h-px w-50 bg-gold sm:w-60"
            />
          </div>
          <p className="mx-auto max-w-5xl text-justify sm:text-center pt-1 font-sans text-lg font-semibold leading-relaxed text-black/55">
            Join hands with one of Nagpur's most trusted names in premium residential plots and build a rewarding career in real estate.
            <br /> At <b>Aryans Buildcon</b>, we believe in growth together. We are offering a <b><em>Golden Business Opportunity</em></b> for individuals who are looking for a high-income career without any investment.
            Whether you are a working professional, housewife, retired person, or a budding entrepreneur, you can start your journey as our Business Associate / Channel Partner .
          </p>
        </div>
        {/* =====================================================
            VIDEO
        ====================================================== */}

        <div
          ref={videoRef}
          className="relative mx-auto max-w-6xl"
        >

          {/* Outer frame */}

          <div
            className="
              relative
              border
              border-gold/30
              bg-cream-light/60
              p-2
              shadow-[0_30px_80px_rgba(20,17,13,0.12)]
              backdrop-blur-sm
              sm:p-3
              lg:p-4
            "
          >

            {/* Inner video */}

            <div className="relative aspect-video overflow-hidden bg-black">

              {!isPlaying ? (
                <>
                  {/* =================================================
                      YOUTUBE THUMBNAIL
                  ================================================== */}

                  <img
                    src="https://img.youtube.com/vi/YN73JCqdK78/maxresdefault.jpg"
                    alt="Aryans Buildcons — A Better Address"
                    className="
                      absolute
                      inset-0
                      h-full
                      w-full
                      object-cover
                      transition-transform
                      duration-[1400ms]
                      ease-out
                      hover:scale-[1.035]
                    "
                  />

                  {/* Dark cinematic overlay */}

                  <div className="absolute inset-0 bg-black/30" />

                  {/* Bottom cinematic gradient */}

                  <div
                    className="
                      absolute
                      inset-0
                      bg-gradient-to-t
                      from-black/80
                      via-black/15
                      to-black/20
                    "
                  />

                  {/* Subtle center glow */}

                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_42%)]" />

                  {/* =================================================
                      PLAY BUTTON
                  ================================================== */}

                  <button
                    type="button"
                    onClick={handlePlay}
                    aria-label="Play cinematic film"
                    className="
                      group
                      absolute
                      left-1/2
                      top-1/2
                      flex
                      -translate-x-1/2
                      -translate-y-1/2
                      items-center
                      justify-center
                    "
                  >



                    {/* Main button */}

                    <span
                      className="
                        relative
                        flex
                        h-16
                        w-16
                        items-center
                        justify-center
                        rounded-full
                        bg-cream-light
                        text-ink
                        shadow-2xl
                        transition-all
                        duration-500
                        group-hover:scale-110
                        group-hover:bg-gold
                        group-hover:text-white
                        sm:h-20
                        sm:w-20
                      "
                    >
                      <Play
                        size={21}
                        strokeWidth={1.4}
                        fill="currentColor"
                        className="ml-1"
                      />
                    </span>
                  </button>

                  {/* =================================================
                      VIDEO LABEL
                  ================================================== */}

                  <div
                    className="
                      absolute
                      bottom-5
                      left-5
                      right-5
                      flex
                      items-end
                      justify-between
                      sm:bottom-7
                      sm:left-7
                      sm:right-7
                      lg:bottom-9
                      lg:left-9
                      lg:right-9
                    "
                  >

                    <div className="max-w-2xl">

                      <p
                        className="
                          font-sans
                          text-[9px]
                          font-medium
                          uppercase
                          tracking-[0.32em]
                          text-white/65
                          sm:text-[10px]
                        "
                      >
                        Featured Film
                      </p>

                      <p
                        className="
                          mt-2
                          font-serif
                          text-xl
                          font-normal
                          leading-tight
                          text-white
                          sm:text-2xl
                          lg:text-4xl
                        "
                      >
                        A Better Address.
                        <span className="italic text-gold-light">
                          {" "}A Better Way of Living.
                        </span>
                      </p>

                    </div>

                    {/* Arrow */}

                    <div
                      className="
                        hidden
                        h-12
                        w-12
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-white/35
                        text-white
                        backdrop-blur-md
                        transition-all
                        duration-500
                        hover:border-gold
                        hover:bg-gold
                        sm:flex
                      "
                    >
                      <ArrowUpRight
                        size={18}
                        strokeWidth={1.3}
                      />
                    </div>

                  </div>
                </>
              ) : (

                /* =================================================
                   YOUTUBE IFRAME
                ================================================== */

                <iframe
                  className="absolute inset-0 h-full w-full"
                  src="https://www.youtube.com/embed/YN73JCqdK78?autoplay=1&rel=0"
                  title="Aryans Buildcons — A Better Address. A Better Way of Living."
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              )}

            </div>
          </div>

          {/* =====================================================
              DECORATIVE CORNERS
          ====================================================== */}

          <span className="absolute -left-2 -top-2 h-8 w-8 border-l border-t border-gold sm:-left-3 sm:-top-3 sm:h-10 sm:w-10" />

          <span className="absolute -right-2 -top-2 h-8 w-8 border-r border-t border-gold sm:-right-3 sm:-top-3 sm:h-10 sm:w-10" />

          <span className="absolute -bottom-2 -left-2 h-8 w-8 border-b border-l border-gold sm:-bottom-3 sm:-left-3 sm:h-10 sm:w-10" />

          <span className="absolute -bottom-2 -right-2 h-8 w-8 border-b border-r border-gold sm:-bottom-3 sm:-right-3 sm:h-10 sm:w-10" />
        </div>

        {/* =====================================================
            FOOTER
        ====================================================== */}

        <div
          className="
            mt-10
            flex
            flex-col
            items-center
            justify-between
            gap-4
            border-t
            border-border
            pt-7
            sm:mt-12
            sm:flex-row
            sm:pt-8
          "
        >

          <p
            className="
              font-sans
              text-[9px]
              font-medium
              uppercase
              tracking-[0.3em]
              text-ink-faint
              sm:text-[10px]
            "
          >
            Creating spaces that transcend time
          </p>

          <div className="flex items-center gap-3">

            <span className="h-px w-8 bg-gold/70" />

            <span
              className="
                font-serif
                text-sm
               font-bold
                text-gold-dark
              "
            >
              Inspired by excellence
            </span>

          </div>
        </div>

      </div>
    </section>
  );
};

export default YouTubeVideoSection;
