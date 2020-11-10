import React from 'react';
import AdSense from 'react-adsense';

export default class AdsenseWidget extends React.Component {
  componentDidMount() {
    const installGoogleAds = () => {
      const elem = document.createElement('script');
      elem.src = '//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
      elem.async = true;
      elem.defer = true;
      document.body.insertBefore(elem, document.body.firstChild);
    };
    installGoogleAds();
  }

  render() {
    return (
      <AdSense.Google
        client="ca-pub-4661023416193408"
        slot="6923807900"
        style={{ width: 728, height: 90, display: 'block' }}
        format="auto"
        responsive="true"
      />
    );
  }
}
