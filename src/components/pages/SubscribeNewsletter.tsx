import Script from 'next/script';

const SubscribeNewsletter = () => {
  return (
    <div className="col-xs-4 col-sm-12 col-md-8 col-lg-8 col-xl-12 text-center octopus-input-margin-left">
      <Script
        async
        src="https://eocampaign1.com/form/c7a77916-5181-11f0-89d8-53de9ab0fedf.js"
        data-form="c7a77916-5181-11f0-89d8-53de9ab0fedf"
      ></Script>
    </div>
  );
};

export default SubscribeNewsletter;
