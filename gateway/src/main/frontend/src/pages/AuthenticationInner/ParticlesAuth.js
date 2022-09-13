import React from "react";
import { withRouter } from "react-router-dom";
import Particles from "react-tsparticles";

const ParticlesAuth = ({ children }) => {
  return (
    <React.Fragment>
      <div className="auth-page-wrapper pt-5">
        <div className="auth-one-bg-position auth-one-bg" id="auth-particles">
          <div className="bg-overlay"></div>

          <div className="shape">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 1440 120"
            >
              <path d="M 0,36 C 144,53.6 432,123.2 720,124 C 1008,124.8 1296,56.8 1440,40L1440 140L0 140z"></path>
            </svg>
          </div>
          <Particles
            options={{
              fullScreen: {
                enable: true,
                zIndex: 1,
              },
              particles: {
                number: {
                  value: 80,
                  density: {
                    enable: true,
                    value_area: 800,
                  },
                },
                color: {
                  value: "#ffffff",
                },
                shape: {
                  type: "char",
                  character: {
                    value: [
                      "A",
                      "C",
                      "T",
                      "E",
                      "C",
                      "H",
                      "1",
                      "2",
                      "3",
                      "4",
                      "5",
                      "6",
                    ],
                    font: "Verdana",
                    style: "",
                    weight: "400",
                    fill: true,
                  },
                },
                stroke: {
                  width: 0.5,
                  color: "#ffffff",
                },
                opacity: {
                  value: 0.3,
                  random: false,
                  anim: {
                    enable: true,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false,
                  },
                },
                size: {
                  value: 13,
                  random: false,
                  anim: {
                    enable: false,
                    speed: 10,
                    size_min: 10,
                    sync: false,
                  },
                },
                line_linked: {
                  enable: true,
                  distance: 70,
                  color: "#ffffff",
                  opacity: 0.3,
                  width: 1,
                },
                move: {
                  enable: true,
                  speed: 2,
                  direction: "none",
                  random: false,
                  straight: false,
                  out_mode: "out",
                  attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 1200,
                  },
                },
              },
              interactivity: {
                events: {
                  onhover: {
                    enable: true,
                    mode: "repulse",
                    parallax: {
                      enable: false,
                      force: 60,
                      smooth: 10,
                    },
                  },
                  onclick: {
                    enable: true,
                    mode: "push",
                  },
                  resize: true,
                },
                modes: {
                  grab: {
                    distance: 400,
                    line_linked: {
                      opacity: 1,
                    },
                  },
                  bubble: {
                    distance: 400,
                    size: 40,
                    duration: 2,
                    opacity: 0.8,
                    speed: 3,
                  },
                  repulse: {
                    distance: 200,
                  },
                  push: {
                    particles_nb: 4,
                  },
                  remove: {
                    particles_nb: 2,
                  },
                },
              },
              retina_detect: true,
              background: {
                color: "#1a468b",
                image: "",
                position: "50% 50%",
                repeat: "no-repeat",
                size: "cover",
              },
            }}
          />
        </div>

        {/* pass the children */}
        {children}

        <footer className="footer">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="text-center">
                  <p className="mb-0 text-light">
                    &copy; {new Date().getFullYear()} Ancao. Crafted with{" "}
                    <i className="mdi mdi-heart text-danger"></i> by ANCAO TEAM
                  </p>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </React.Fragment>
  );
};

export default withRouter(ParticlesAuth);
