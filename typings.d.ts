declare module "*.css";
declare module "*.less";
declare module "*.png";
declare module "*.svg" {
  export function ReactComponent(
    props: React.SVGProps<SVGSVGElement>,
  ): React.ReactElement;

  const url: string;
  export default url;
}
declare global {
  interface window {
    YQV5: {
      trackSingle: (p: {
        YQ_ContainerId: string;
        YQ_Lang: string;
        YQ_Fc: string;
        YQ_Height: number;
        YQ_Num: string;
      }) => void;
    };
    paypal: {
      Buttons: (props: { [key: string]: any }) => (className: string) => void;
    };
    FB: {
      init: (a: any) => void;
      login: (a: any) => void;
      getLoginStatus: (a: any) => void;
    };
  }
}
