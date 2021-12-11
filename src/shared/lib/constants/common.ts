export const deviceWidths = {
  mobile: 320,
  tablet: 768,
  desktop: 1200,
};
export interface IDevices {
  mobile: string;
  tablet: string;
  desktop: string;
}

export const devices: IDevices = {
  mobile: `${deviceWidths.mobile}px`,
  tablet: `${deviceWidths.tablet}px`,
  desktop: `${deviceWidths.desktop}px`,
};

export const publicRoutes: string[] = ["/login", "/register"];

export const EMAIL_REGEX: RegExp =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
