import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import { PlaybackControls, VolumeSlider, ProgressBar, TimeMarker } from 'react-player-controls';
import Fade from 'react-reveal/Fade';
import { withRouter } from 'react-router-dom';

class MusicPlayer extends Component {
    constructor() {
        super();

        this.state = {
            url: '',
            playing: false,
            volume: 0.4,
            played: 0,
            loaded: 0,
            duration: 0,
            loop: false,
            currentPlaying: 0,
            hasNext: false,
            hasPrev: false,
            playable: false
        };

        this.checkSong = this.checkSong.bind(this);
        this.playPause = this.playPause.bind(this);
        this.nextSong = this.nextSong.bind(this);
        this.prevSong = this.prevSong.bind(this);
        this.onProgress = this.onProgress.bind(this);
        this.onSeekChange = this.onSeekChange.bind(this);
        this.ref = this.ref.bind(this);
    }

    componentWillReceiveProps(nextProp) {
        const playlist = nextProp.playlist;
        let currentSong = nextProp.currentSong;

        if (!currentSong || currentSong < 0 || currentSong >= playlist.length) {
            currentSong = 0;
        }

        this.checkSong(playlist, currentSong);

        this.setState({ url: playlist[currentSong].url, playable: true});
    }

    checkSong(playlist, currentPlaying) {
        if (currentPlaying === playlist.length - 1) {
            this.setState({ hasNext: false, currentPlaying });
        } else {
            this.setState({hasNext: true, currentPlaying});
        }

        if (currentPlaying > 0 && currentPlaying < playlist.length ) {
            this.setState({ hasPrev: true, currentPlaying});
        } else {
            this.setState({ hasPrev: false, currentPlaying });
        }
    }

    playPause() {
        this.setState({ playing: !this.state.playing });
    }

    nextSong() {
        const { currentPlaying } = this.state;
        const playlist = this.props.playlist;

        if (currentPlaying >= 0 && currentPlaying < playlist.length - 1 ) {
            this.props.history.push(`${this.props.location.pathname}?song=${currentPlaying + 2}`)
        }
    }

    prevSong() {
        const { currentPlaying } = this.state;

        if (currentPlaying > 0 ) {
            this.props.history.push(`${this.props.location.pathname}?song=${currentPlaying}`)
        }
    }

    onProgress(state) {
        if (!this.state.seeking) {
            state.duration = this.player.getDuration();
            this.setState(state);
        }
    }

    onSeekChange(time) {
        this.setState({ playedSeconds: time });
        this.player.seekTo(time);
    }

    ref(player) {
        this.player = player;
    };

    render() {
        return (
            <Fade big>
                <div className="full-player">
                    <ReactPlayer
                        className="useless"
                        url={this.state.url}
                        ref={this.ref}
                        playing={this.state.playing}
                        volume={this.state.volume}
                        onEnded={this.nextSong}
                        onProgress={this.onProgress}
                        onChange={() => console.log('gg')}
                    />
                    <div className="player-background">
                        <div className="player">
                            <PlaybackControls
                                isPlayable={this.state.playable}
                                isPlaying={this.state.playing}
                                hasPrevious={this.state.hasPrev}
                                hasNext={this.state.hasNext}
                                onPlaybackChange={this.playPause}
                                onPrevious={this.prevSong}
                                onNext={this.nextSong}
                            />
                            <VolumeSlider
                                direction="HORIZONTAL"
                                isEnabled={true}
                                volume={this.state.volume}
                                onVolumeChange={volume => this.setState({volume})}
                            />
                        </div>
                        <ProgressBar
                            totalTime={this.state.duration}
                            currentTime={this.state.playedSeconds}
                            bufferedTime={this.state.loadedSeconds}
                            isSeekable={true}
                            onSeekStart={this.onSeekChange.bind(this)}
                        />
                        <TimeMarker
                            totalTime={this.state.duration}
                            currentTime={this.state.playedSeconds}
                            markerSeparator=" / "
                            firstMarkerType="ELAPSED"
                            secondMarkerType="DURATION"
                            className="time-marker"
                        />
                    </div>
                </div>
            </Fade>
        );
    }
}

export default withRouter(MusicPlayer);
