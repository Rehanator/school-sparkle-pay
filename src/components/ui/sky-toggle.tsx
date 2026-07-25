import type { ChangeEvent } from "react";
import styled from "styled-components";

type SkyToggleProps = {
  checked?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  ariaLabel?: string;
};

const SkyToggle = ({ checked, onChange, className, ariaLabel = "Toggle theme" }: SkyToggleProps) => {
  return (
    <StyledWrapper className={className}>
      <label className="theme-switch">
        <input
          type="checkbox"
          className="theme-switch__checkbox"
          checked={checked}
          onChange={onChange}
          aria-label={ariaLabel}
        />
        <div className="theme-switch__container">
          <div className="theme-switch__clouds" />
          <div className="theme-switch__stars-container">
            <svg viewBox="0 0 55 23" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.9414 1.5C21.2779 0.833333 22.238 0.833334 22.5745 1.5L23.3572 3.05052C23.4874 3.30846 23.7343 3.48784 24.0198 3.53372L25.7355 3.80949C26.4735 3.92812 26.7702 4.83879 26.2432 5.37285L25.0183 6.61443C24.8144 6.82112 24.7201 7.11128 24.7642 7.39813L25.0289 9.12071C25.1428 9.86149 24.3661 10.4249 23.7003 10.0783L22.1524 9.27227C21.8947 9.13809 21.5876 9.13809 21.3299 9.27227L19.7819 10.0783C19.1162 10.4249 18.3395 9.86149 18.4534 9.12071L18.7181 7.39813C18.7622 7.11128 18.6679 6.82112 18.464 6.61443L17.2391 5.37285C16.7121 4.83879 17.0088 3.92812 17.7468 3.80949L19.4625 3.53372C19.748 3.48784 19.9948 3.30846 20.1251 3.05052L20.9414 1.5Z" />
              <path d="M43.9414 8.5C44.2779 7.83333 45.238 7.83333 45.5745 8.5L46.3572 10.0505C46.4874 10.3085 46.7343 10.4878 47.0198 10.5337L48.7355 10.8095C49.4735 10.9281 49.7702 11.8388 49.2432 12.3728L48.0183 13.6144C47.8144 13.8211 47.7201 14.1113 47.7642 14.3981L48.0289 16.1207C48.1428 16.8615 47.3661 17.4249 46.7003 17.0783L45.1524 16.2723C44.8947 16.1381 44.5876 16.1381 44.3299 16.2723L42.7819 17.0783C42.1162 17.4249 41.3395 16.8615 41.4534 16.1207L41.7181 14.3981C41.7622 14.1113 41.6679 13.8211 41.464 13.6144L40.2391 12.3728C39.7121 11.8388 40.0088 10.9281 40.7468 10.8095L42.4625 10.5337C42.748 10.4878 42.9948 10.3085 43.1251 10.0505L43.9414 8.5Z" />
              <path d="M32.9414 15.5C33.2779 14.8333 34.238 14.8333 34.5745 15.5L34.7572 15.8505C34.8874 16.1085 35.1343 16.2878 35.4198 16.3337L35.7355 16.3838C36.4735 16.5024 36.7702 17.4131 36.2432 17.9472L36.0183 18.1887C35.8144 18.3954 35.7201 18.6856 35.7642 18.9724L35.8117 19.2652C35.9256 20.006 35.1489 20.5694 34.4831 20.2228L34.1524 20.05C33.8947 19.9158 33.5876 19.9158 33.3299 20.05L32.9993 20.2228C32.3335 20.5694 31.5568 20.006 31.6707 19.2652L31.7181 18.9724C31.7622 18.6856 31.6679 18.3954 31.464 18.1887L31.2391 17.9472C30.7121 17.4131 31.0088 16.5024 31.7468 16.3838L32.0625 16.3337C32.348 16.2878 32.5948 16.1085 32.7251 15.8505L32.9414 15.5Z" />
              <path d="M6.94141 13.5C7.27789 12.8333 8.23803 12.8333 8.57451 13.5L8.75721 13.8505C8.88744 14.1085 9.13432 14.2878 9.41977 14.3337L9.73555 14.3838C10.4735 14.5024 10.7702 15.4131 10.2432 15.9472L10.0183 16.1887C9.81439 16.3954 9.72011 16.6856 9.76421 16.9724L9.81167 17.2652C9.92559 18.006 9.14893 18.5694 8.48311 18.2228L8.15245 18.05C7.89475 17.9158 7.58762 17.9158 7.32993 18.05L6.99927 18.2228C6.33345 18.5694 5.55679 18.006 5.67071 17.2652L5.71817 16.9724C5.76227 16.6856 5.66799 16.3954 5.46411 16.1887L5.23918 15.9472C4.71215 15.4131 5.00888 14.5024 5.74683 14.3838L6.06261 14.3337C6.34806 14.2878 6.59494 14.1085 6.72517 13.8505L6.94141 13.5Z" />
            </svg>
          </div>
          <div className="theme-switch__circle-container">
            <div className="theme-switch__sun-moon-container">
              <div className="theme-switch__moon">
                <div className="theme-switch__spot" />
                <div className="theme-switch__spot" />
                <div className="theme-switch__spot" />
              </div>
            </div>
          </div>
        </div>
      </label>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: inline-flex;
  align-items: center;

  .theme-switch {
    --toggle-size: 12px;
    --container-width: 5.625em;
    --container-height: 2.5em;
    --container-radius: 6.25em;
    --container-light-bg: #3D7EAE;
    --container-night-bg: #1D1F2C;
    --circle-container-diameter: 3.375em;
    --sun-moon-diameter: 2.125em;
    --sun-bg: #ECCA2F;
    --moon-bg: #C4C9D1;
    --spot-color: #959DB1;
    --circle-container-offset: calc((var(--circle-container-diameter) - var(--container-height)) / 2 * -1);
    --stars-color: #fff;
    --clouds-color: #F3FDFF;
    --back-clouds-color: #AACADF;
    --transition: .5s cubic-bezier(0, -0.02, 0.4, 1.25);
    --circle-transition: .3s cubic-bezier(0, -0.02, 0.35, 1.17);
    display: inline-block;
  }

  .theme-switch, .theme-switch *, .theme-switch *::before, .theme-switch *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-size: var(--toggle-size);
  }

  .theme-switch__container {
    width: var(--container-width);
    height: var(--container-height);
    background-color: var(--container-light-bg);
    border-radius: var(--container-radius);
    overflow: hidden;
    cursor: pointer;
    box-shadow: 0em -0.062em 0.062em rgba(0, 0, 0, 0.25), 0em 0.062em 0.125em rgba(255, 255, 255, 0.94);
    transition: var(--transition);
    position: relative;
  }

  .theme-switch__container::before {
    content: "";
    position: absolute;
    z-index: 1;
    inset: 0;
    box-shadow: 0em 0.05em 0.187em rgba(0, 0, 0, 0.25) inset, 0em 0.05em 0.187em rgba(0, 0, 0, 0.25) inset;
    border-radius: var(--container-radius);
  }

  .theme-switch__checkbox {
    display: none;
  }

  .theme-switch__circle-container {
    width: var(--circle-container-diameter);
    height: var(--circle-container-diameter);
    background-color: rgba(255, 255, 255, 0.1);
    position: absolute;
    left: var(--circle-container-offset);
    top: var(--circle-container-offset);
    border-radius: var(--container-radius);
    box-shadow: inset 0 0 0 3.375em rgba(255, 255, 255, 0.1), inset 0 0 0 3.375em rgba(255, 255, 255, 0.1), 0 0 0 0.625em rgba(255, 255, 255, 0.1), 0 0 0 1.25em rgba(255, 255, 255, 0.1);
    display: flex;
    transition: var(--circle-transition);
    pointer-events: none;
    z-index: 2;
  }

  .theme-switch__sun-moon-container {
    pointer-events: auto;
    position: relative;
    z-index: 2;
    width: var(--sun-moon-diameter);
    height: var(--sun-moon-diameter);
    margin: auto;
    border-radius: var(--container-radius);
    background-color: var(--sun-bg);
    box-shadow: 0.062em 0.062em 0.062em 0em rgba(254, 255, 239, 0.61) inset, 0em -0.062em 0.062em 0em #a1872a inset;
    filter: drop-shadow(0.062em 0.125em 0.125em rgba(0, 0, 0, 0.25)) drop-shadow(0em 0.062em 0.125em rgba(0, 0, 0, 0.25));
    overflow: hidden;
    transition: var(--transition);
  }

  .theme-switch__moon {
    transform: translateX(100%);
    width: 100%;
    height: 100%;
    background-color: var(--moon-bg);
    border-radius: inherit;
    box-shadow: 0.062em 0.062em 0.062em 0em rgba(254, 255, 239, 0.61) inset, 0em -0.062em 0.062em 0em #969696 inset;
    transition: var(--transition);
    position: relative;
  }

  .theme-switch__spot {
    position: absolute;
    top: 0.75em;
    left: 0.312em;
    width: 0.75em;
    height: 0.75em;
    border-radius: var(--container-radius);
    background-color: var(--spot-color);
    box-shadow: 0em 0.0312em 0.062em rgba(0, 0, 0, 0.25) inset;
  }

  .theme-switch__spot:nth-of-type(2) {
    width: 0.375em;
    height: 0.375em;
    top: 0.937em;
    left: 1.375em;
  }

  .theme-switch__spot:nth-last-of-type(3) {
    width: 0.25em;
    height: 0.25em;
    top: 0.312em;
    left: 0.812em;
  }

  .theme-switch__clouds {
    width: 1.25em;
    height: 1.25em;
    background-color: var(--clouds-color);
    border-radius: var(--container-radius);
    position: absolute;
    bottom: -0.625em;
    left: 0.312em;
    box-shadow: 0.937em 0.312em var(--clouds-color), -0.312em -0.312em var(--back-clouds-color), 1.437em 0.375em var(--clouds-color), 0.5em -0.125em var(--back-clouds-color), 2.187em 0 var(--clouds-color), 1.25em -0.062em var(--back-clouds-color), 2.937em 0.312em var(--clouds-color), 2em -0.312em var(--back-clouds-color), 3.625em -0.062em var(--clouds-color), 2.625em 0em var(--back-clouds-color), 4.5em -0.312em var(--clouds-color), 3.375em -0.437em var(--back-clouds-color), 4.625em -1.75em 0 0.437em var(--clouds-color), 4em -0.625em var(--back-clouds-color), 4.125em -2.125em 0 0.437em var(--back-clouds-color);
    transition: 0.5s cubic-bezier(0, -0.02, 0.4, 1.25);
  }

  .theme-switch__stars-container {
    position: absolute;
    color: var(--stars-color);
    top: -100%;
    left: 0.312em;
    width: 2.75em;
    height: auto;
    transition: var(--transition);
  }

  .theme-switch__checkbox:checked + .theme-switch__container {
    background-color: var(--container-night-bg);
  }

  .theme-switch__checkbox:checked + .theme-switch__container .theme-switch__circle-container {
    left: calc(100% - var(--circle-container-offset) - var(--circle-container-diameter));
  }

  .theme-switch__checkbox:checked + .theme-switch__container .theme-switch__circle-container:hover {
    left: calc(100% - var(--circle-container-offset) - var(--circle-container-diameter) - 0.187em);
  }

  .theme-switch__circle-container:hover {
    left: calc(var(--circle-container-offset) + 0.187em);
  }

  .theme-switch__checkbox:checked + .theme-switch__container .theme-switch__moon {
    transform: translate(0);
  }

  .theme-switch__checkbox:checked + .theme-switch__container .theme-switch__clouds {
    bottom: -4.062em;
  }

  .theme-switch__checkbox:checked + .theme-switch__container .theme-switch__stars-container {
    top: 50%;
    transform: translateY(-50%);
  }
`;

export default SkyToggle;
