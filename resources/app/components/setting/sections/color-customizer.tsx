import { memo, Fragment } from 'react';

import _ from 'lodash';

//react-bootstrap
import { Tooltip, OverlayTrigger } from 'react-bootstrap';

import { useDispatch } from 'react-redux';
import { theme_color } from '@/redux/slice';

// Images

type ColorCustomizerProps = {
  themeColor: {
    value: string;
    colors: {
      '--{{prefix}}primary': string;
      '--{{prefix}}info': string;
    };
  };
};

export const ColorCustomizer = memo((props: ColorCustomizerProps) => {
  const dispatch = useDispatch();

  const colorValue = props.themeColor;

  const updateColor = (colorClassName, colorObj) => {
    dispatch(theme_color({ value: colorClassName, colors: colorObj }));
  };

  const slowChange = _.debounce((colorClassName, colorObj) => {
    updateColor(colorClassName, colorObj);
  }, 300);

  const colorChange = (colorClassName, colorObj, isDebounce = false) => {
    if (isDebounce) {
      slowChange(colorClassName, colorObj);
    } else {
      updateColor(colorClassName, colorObj);
    }
  };

  return (
    <Fragment>
      <div className="d-flex align-items-center justify-content-between">
        <h5 className="mt-4 mb-3">Thay đổi màu giao diện</h5>
        <div className="d-flex align-items-center">
          <div data-setting="radio">
            <input
              type="radio"
              value="theme-color-default"
              className="btn-check"
              name="theme_color"
              id="theme-color-default"
            />
            <label
              className="btn bg-transparent"
              htmlFor="theme-color-default"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Reset Color"
              data-bs-original-title="Reset color"
            >
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip style={{ zIndex: 10000 }}>Khôi phục màu mặc định</Tooltip>}
              >
                <div
                  data-value="theme-color-default"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title="Default"
                  data-bs-original-title="Default"
                  onClick={() => {
                    colorChange('theme-color-default', {
                      '--{{prefix}}primary': '#f26f21',
                      '--{{prefix}}info': '#1A73E8',
                    });
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M21.4799 12.2424C21.7557 12.2326 21.9886 12.4482 21.9852 12.7241C21.9595 14.8075 21.2975 16.8392 20.0799 18.5506C18.7652 20.3986 16.8748 21.7718 14.6964 22.4612C12.518 23.1505 10.1711 23.1183 8.01299 22.3694C5.85488 21.6205 4.00382 20.196 2.74167 18.3126C1.47952 16.4293 0.875433 14.1905 1.02139 11.937C1.16734 9.68346 2.05534 7.53876 3.55018 5.82945C5.04501 4.12014 7.06478 2.93987 9.30193 2.46835C11.5391 1.99683 13.8711 2.2599 15.9428 3.2175L16.7558 1.91838C16.9822 1.55679 17.5282 1.62643 17.6565 2.03324L18.8635 5.85986C18.945 6.11851 18.8055 6.39505 18.549 6.48314L14.6564 7.82007C14.2314 7.96603 13.8445 7.52091 14.0483 7.12042L14.6828 5.87345C13.1977 5.18699 11.526 4.9984 9.92231 5.33642C8.31859 5.67443 6.8707 6.52052 5.79911 7.74586C4.72753 8.97119 4.09095 10.5086 3.98633 12.1241C3.8817 13.7395 4.31474 15.3445 5.21953 16.6945C6.12431 18.0446 7.45126 19.0658 8.99832 19.6027C10.5454 20.1395 12.2278 20.1626 13.7894 19.6684C15.351 19.1743 16.7062 18.1899 17.6486 16.8652C18.4937 15.6773 18.9654 14.2742 19.0113 12.8307C19.0201 12.5545 19.2341 12.3223 19.5103 12.3125L21.4799 12.2424Z"
                      fill="#31BAF1"
                    />
                    <path
                      d="M20.0941 18.5594C21.3117 16.848 21.9736 14.8163 21.9993 12.7329C22.0027 12.4569 21.7699 12.2413 21.4941 12.2512L19.5244 12.3213C19.2482 12.3311 19.0342 12.5633 19.0254 12.8395C18.9796 14.283 18.5078 15.6861 17.6628 16.8739C16.7203 18.1986 15.3651 19.183 13.8035 19.6772C12.2419 20.1714 10.5595 20.1483 9.01246 19.6114C7.4654 19.0746 6.13845 18.0534 5.23367 16.7033C4.66562 15.8557 4.28352 14.9076 4.10367 13.9196C4.00935 18.0934 6.49194 21.37 10.008 22.6416C10.697 22.8908 11.4336 22.9852 12.1652 22.9465C13.075 22.8983 13.8508 22.742 14.7105 22.4699C16.8889 21.7805 18.7794 20.4073 20.0941 18.5594Z"
                      fill="#0169CA"
                    />
                  </svg>
                </div>
              </OverlayTrigger>
            </label>
          </div>
        </div>
      </div>
      <div className="grid-cols-5 mb-4 mt-4 d-grid gap-3">
        <OverlayTrigger placement="top" overlay={<Tooltip style={{ zIndex: 10000 }}>Gmail</Tooltip>}>
          <div>
            <input
              type="radio"
              value="theme-color-blue"
              className="btn-check"
              name="theme_color"
              id="theme-color-1"
              onClick={() =>
                colorChange('theme-color-blue', { '--{{prefix}}info': '#EA4335', '--{{prefix}}primary': '#4285F4' })
              }
              defaultChecked={colorValue.value === 'theme-color-blue'}
            />
            <label
              className={`btn btn-border d-block bg-transparent`}
              htmlFor="theme-color-1"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              data-bs-original-title="Theme-1"
            >
              <svg
                className="customizer-btn"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="26"
                height="26"
              >
                <circle cx="12" cy="12" r="10" fill="#4285F4"></circle>
                <path d="M2,12 a1,1 1 1,0 20,0" fill="#EA4335"></path>
              </svg>
            </label>
          </div>
        </OverlayTrigger>
        <OverlayTrigger placement="top" overlay={<Tooltip style={{ zIndex: 10000 }}>Reddit</Tooltip>}>
          <div>
            <input
              type="radio"
              value="theme-color-red"
              className="btn-check"
              name="theme_color"
              id="theme-color-2"
              onClick={() =>
                colorChange('theme-color-red', { '--{{prefix}}info': '#1A73E8', '--{{prefix}}primary': '#dd300e' })
              }
              defaultChecked={colorValue.value === 'theme-color-red'}
            />
            <label
              className={` btn btn-border d-block bg-transparent`}
              htmlFor="theme-color-2"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              data-bs-original-title="Theme-2"
            >
              <svg
                className="customizer-btn"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="26"
                height="26"
              >
                <circle cx="12" cy="12" r="10" fill="#FF4500"></circle>
                <path d="M2,12 a1,1 1 1,0 20,0" fill="#1A73E8"></path>
              </svg>
            </label>
          </div>
        </OverlayTrigger>
        <OverlayTrigger placement="top" overlay={<Tooltip style={{ zIndex: 10000 }}>Twitch</Tooltip>}>
          <div>
            <input
              type="radio"
              value="theme-color-purple"
              className="btn-check"
              name="theme_color"
              id="theme-color-3"
              onClick={() => {
                colorChange('theme-color-purple', { '--{{prefix}}info': '#EE4266', '--{{prefix}}primary': '#8755f2' });
              }}
              defaultChecked={colorValue.value === 'theme-color-purple'}
            />
            <label
              className={` btn btn-border d-block bg-transparent`}
              htmlFor="theme-color-3"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              data-bs-original-title="Theme-3"
            >
              <svg
                className="customizer-btn"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="26"
                height="26"
              >
                <circle cx="12" cy="12" r="10" fill="#5C16C5"></circle>
                <path d="M2,12 a1,1 1 1,0 20,0" fill="#EE4266"></path>
              </svg>
            </label>
          </div>
        </OverlayTrigger>
        {/* <OverlayTrigger placement="top" overlay={<Tooltip>Linkdin</Tooltip>}>
          <div>
            <input
              type="radio"
              value="theme-color-cyan"
              className="btn-check"
              name="theme_color"
              id="theme-color-4"
              onClick={() => {
                colorChange('theme-color-cyan', { '--{{prefix}}info': '#333333', '--{{prefix}}primary': '#0A66C2' });
              }}
              defaultChecked={colorValue.value === 'theme-color-cyan'}
            />
            <label
              className={` btn btn-border d-block bg-transparent`}
              htmlFor="theme-color-4"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              data-bs-original-title="Theme-4"
            >
              <svg
                className="customizer-btn"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="26"
                height="26"
              >
                <circle cx="12" cy="12" r="10" fill="#0A66C2"></circle>
                <path d="M2,12 a1,1 1 1,0 20,0" fill="#333333"></path>
              </svg>
            </label>
          </div>
        </OverlayTrigger> */}
        <OverlayTrigger placement="top" overlay={<Tooltip style={{ zIndex: 10000 }}>Spotify</Tooltip>}>
          <div>
            <input
              type="radio"
              value="theme-color-green"
              className="btn-check"
              name="theme_color"
              id="theme-color-5"
              onClick={() => {
                colorChange('theme-color-green', { '--{{prefix}}info': '#25C799', '--{{prefix}}primary': '#000000' });
              }}
              defaultChecked={colorValue.value === 'theme-color-green'}
            />
            <label
              className={`btn btn-border d-block bg-transparent`}
              htmlFor="theme-color-5"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              data-bs-original-title="Theme-5"
            >
              <svg
                className="customizer-btn"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="26"
                height="26"
              >
                <circle cx="12" cy="12" r="10" fill="#0B9D43"></circle>
                <path d="M2,12 a1,1 1 1,0 20,0" fill="#000000"></path>
              </svg>
            </label>
          </div>
        </OverlayTrigger>
        <OverlayTrigger placement="top" overlay={<Tooltip style={{ zIndex: 10000 }}>FPT Polytechnic</Tooltip>}>
          <div>
            <input
              type="radio"
              value="theme-color-orange"
              className="btn-check"
              name="theme_color"
              id="theme-color-6"
              onClick={() => {
                colorChange('theme-color-orange', { '--{{prefix}}info': '#1A73E8', '--{{prefix}}primary': '#f26f21' });
              }}
              defaultChecked={colorValue.value === 'theme-color-orange'}
            />
            <label
              className={`btn btn-border d-block bg-transparent`}
              htmlFor="theme-color-6"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              data-bs-original-title="Theme-6"
            >
              <svg
                className="customizer-btn"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="26"
                height="26"
              >
                <circle cx="12" cy="12" r="10" fill="#f26f21"></circle>
                <path d="M2,12 a1,1 1 1,0 20,0" fill="#1A73E8"></path>
              </svg>
            </label>
          </div>
        </OverlayTrigger>
      </div>
    </Fragment>
  );
});

ColorCustomizer.displayName = 'ColorCustomizer';
