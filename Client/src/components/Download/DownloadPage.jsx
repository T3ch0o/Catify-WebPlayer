import React from 'react';
import Fade from 'react-reveal/Fade';

import programImage from '../../images/Main Interface.png';

const DownloadPage = () => (
    <section className="download-container">
        <Fade left>
            <div>
                <h1>Open the file to finish up.</h1>
                <p>If your download didn't start, <span><a href="https://github.com/Aleksbgbg/YouTube-Downloader/releases/download/v1.2.0/Release.zip">try again</a></span>.</p>
            </div>
            <img src={programImage} alt="asd"/>
        </Fade>
    </section>
);

export default DownloadPage;