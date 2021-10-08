import React, { useEffect } from 'react';

interface Props {
  onSuccess?: () => void;
  onError: (err: any) => void;
  createOrder: (data: any, actions: any) => void;
  createSubscription?: () => void;
  onApprove: (data: any, actions: any) => void;
  style: {
    [key: string]: string;
  };
  onInit?: () => void;
  onClick?: () => void;
  onCancel?: (data: any) => void;
}

const Paypal = (props: Props) => {
  useEffect(() => {
    const onload = () => {
      if (typeof window !== `undefined`) {
        // @ts-ignore
        window.paypal
          .Buttons({
            ...props,
          })
          .render('#paypal-button');
      }
    };
    // @ts-ignore
    if (!window.paypal) {
      const clientId = `AfT8aC1gkayVTl9gP4PBbifGpV9e1Ki-NBG8BN1wxNSpQW_N2-accMva485YaNZpVFjmZVQOjchOpHxi`;
      const currency = `USD`;
      const src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=${currency}`;
      const script = document.createElement('script');
      script.src = src;
      document.body.appendChild(script);
      script.onload = onload;
    } else {
      onload();
    }
  }, []);

  return (
    <div id="smart-button-container">
      <div>
        <div id="paypal-button" />
      </div>
    </div>
  );
};
export default Paypal;
