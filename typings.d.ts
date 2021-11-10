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
// declare class YQV5 {
//     static trackSingle: (p: {
//         YQ_ContainerId: string;
//         YQ_Lang: string;
//         YQ_Fc: string;
//         YQ_Height: number;
//         YQ_Num: string;
//       }) => void;
// }
declare function checkLogin(bb: any): void;
declare namespace YQV5 {
  export function trackSingle(p: {
    YQ_ContainerId: string;
    YQ_Lang: string;
    YQ_Fc: string;
    YQ_Height: number;
    YQ_Num: string;
  }): void;
}
declare namespace paypal {
  export function Buttons(props: { [key: string]: any }): {
    render: (className: string) => void;
  };
}
declare namespace FB {
  export function init(a: {
    appId: string;
    cookie: boolean;
    xfbml: boolean;
    version: string;
  }): void;
  export function login(
    cb: (a: any) => void,
    b: { scope: "public_profile,email" },
  ): void;
  export function logout(): void;
  export function getLoginStatus(cb: (a: any) => void): void;
  export module XFBML {
    export function parse(): void;
  }
}
