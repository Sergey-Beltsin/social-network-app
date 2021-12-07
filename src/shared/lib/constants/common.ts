export interface IDevices {
  mobile: string;
  tablet: string;
  desktop: string;
}

export const devices: IDevices = {
  mobile: "320px",
  tablet: "768px",
  desktop: "1200px",
};

export const publicRoutes: string[] = ["/login", "/register"];

export const EMAIL_REGEX: RegExp =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
