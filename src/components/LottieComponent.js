import React, { useState } from 'react'
import Lottie from 'react-lottie'
import Loading from './loading.json'

function LottieComponent() {
    const { loading} = useState(false);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: Loading,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  return (
    <div>
         <Lottie
        options={defaultOptions}
        height={200}
        width={200}
        loading={loading}
      />
    </div>
  )
}

export default LottieComponent