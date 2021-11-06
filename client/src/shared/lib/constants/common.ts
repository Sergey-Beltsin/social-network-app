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
