import { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  ChevronRight,
  Loader2,
  Maximize,
  Pause,
  Play,
  Volume2,
  VolumeX,
} from 'lucide-react';

const formatTime = (seconds: number) => {
  if (!Number.isFinite(seconds)) {
    return '0:00';
  }

  const minutes = Math.floor(seconds / 60);
  const remainder = Math.floor(seconds % 60);

  return `${minutes}:${remainder.toString().padStart(2, '0')}`;
};

const ParticleField = () => {
  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 3 + 2,
    delay: Math.random() * 15,
    duration: Math.random() * 10 + 12,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-black"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            opacity: 0.06,
            animation: `particle-float ${p.duration}s linear infinite`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

export default function Hero() {
  const [loaded, setLoaded] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [isSeeking, setIsSeeking] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.7);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () =>
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    videoEl.volume = volume;
    videoEl.muted = isMuted;
  }, [volume, isMuted]);

  const togglePlay = async () => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    if (isPlaying) {
      videoEl.pause();
      setIsPlaying(false);
      return;
    }

    try {
      await videoEl.play();
      setHasStarted(true);
      setIsPlaying(true);
    } catch {
      /* no-op */
    }
  };

  const handleTimeUpdate = () => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    setProgress(videoEl.currentTime);
  };

  const handleLoadedMetadata = () => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    setDuration(videoEl.duration || 0);
    setIsLoading(false);
  };

  const handleSeek = (value: number) => {
    const videoEl = videoRef.current;
    if (!videoEl || !duration) return;

    const nextTime = (value / 100) * duration;
    videoEl.currentTime = nextTime;
    setProgress(nextTime);
  };

  const handleVolumeChange = (value: number) => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    const nextVolume = Math.min(Math.max(value, 0), 1);
    setVolume(nextVolume);
    videoEl.volume = nextVolume;

    if (nextVolume > 0) {
      setIsMuted(false);
      videoEl.muted = false;
    }
  };

  const handleToggleMute = () => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    videoEl.muted = nextMuted;

    if (!nextMuted && volume === 0) {
      const fallbackVolume = 0.4;
      setVolume(fallbackVolume);
      videoEl.volume = fallbackVolume;
    }
  };

  const handleFullscreen = () => {
    const playerEl = playerRef.current;
    if (!playerEl) return;

    if (document.fullscreenElement) {
      document.exitFullscreen?.();
      return;
    }

    playerEl.requestFullscreen?.();
  };

  const progressPercent = duration ? (progress / duration) * 100 : 0;
  const controlsVisible = hasStarted && (isHovering || !isPlaying || isSeeking);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white"
    >
      {/* Gradient Mesh Background */}
      <div className="absolute inset-0 gradient-mesh opacity-60" />

      {/* Particle Field */}
      <ParticleField />

      {/* Main Content */}
      <div className="relative z-10 container-custom py-20">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 xl:gap-12 items-center">
          <div>
            {/* Badge */}
            <div
              className={`inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full mb-8 transition-all duration-600 ${
                loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{
                transitionDelay: '200ms',
                transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-gray-700">
                Fix your SaaS conversion leaks
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6">
              <span
                className={`block transition-all duration-800 ${
                  loaded
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-12'
                }`}
                style={{
                  transitionDelay: '400ms',
                  transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                We implement the changes.
              </span>
            </h1>

            {/* Subhead */}
            <p
              className={`text-lg md:text-xl text-gray-600 leading-relaxed mb-10 max-w-2xl transition-all duration-700 ${
                loaded
                  ? 'opacity-100 translate-y-0 blur-0'
                  : 'opacity-0 translate-y-8 blur-sm'
              }`}
              style={{
                transitionDelay: '700ms',
                transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              Onboarding, UX, and user flow improvements that turn sign-ups into
              activated users—shipped by us, measured by metrics. No "consulting
              decks." No waiting.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button
                onClick={() => scrollToSection('pricing')}
                className={`btn-primary animate-glow-pulse flex items-center justify-center gap-2 transition-all duration-500 ${
                  loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                }`}
                style={{
                  transitionDelay: '900ms',
                  transitionTimingFunction:
                    'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                }}
              >
                Book the Activation Audit (20 min)
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => scrollToSection('solution')}
                className={`group flex items-center justify-center gap-2 text-black font-semibold py-4 px-6 border-animate transition-all duration-500 ${
                  loaded
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 -translate-x-5'
                }`}
                style={{
                  transitionDelay: '1000ms',
                  transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                See what you'll get
                <ChevronRight className="w-5 h-5 transition-transform duration-250 group-hover:translate-x-2" />
              </button>
            </div>
          </div>

          <div
            className={`w-full transition-all duration-700 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{
              transitionDelay: '850ms',
              transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <div className="relative w-full overflow-hidden rounded-2xl border border-gray-200 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.5)]">
              <div
                ref={playerRef}
                className="relative bg-gradient-to-b from-slate-50 via-white to-slate-100 flex items-center justify-center"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <video
                  ref={videoRef}
                  src="/explainer_FixToValue.mp4"
                  preload="metadata"
                  poster="/thumbnail_explianer_fixtovalue.png"
                  playsInline
                  className={`block w-full object-contain ${
                    isFullscreen
                      ? 'h-screen max-h-none'
                      : 'h-auto max-h-[520px]'
                  }`}
                  onClick={togglePlay}
                  onLoadedMetadata={handleLoadedMetadata}
                  onTimeUpdate={handleTimeUpdate}
                  onPlay={() => setHasStarted(true)}
                  onWaiting={() => setIsLoading(true)}
                  onPlaying={() => setIsLoading(false)}
                  onCanPlay={() => setIsLoading(false)}
                  onEnded={() => setIsPlaying(false)}
                  controls={false}
                >
                  Your browser does not support the video tag.
                </video>

                {/* Overlay gradient to soften edges */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/5" />

                {/* Center play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    type="button"
                    onClick={togglePlay}
                    className={`transition-all duration-300 ${
                      isPlaying
                        ? 'opacity-0 scale-95 pointer-events-none'
                        : 'opacity-100 scale-100'
                    }`}
                  >
                    <span className="inline-flex items-center justify-center rounded-full bg-gradient-to-br from-gray-900 to-gray-700 text-white shadow-xl shadow-black/30 ring-2 ring-white/60 backdrop-blur-lg size-14 sm:size-[3.75rem] md:size-16">
                      <Play className="w-6 h-6 sm:w-7 sm:h-7" />
                    </span>
                  </button>
                </div>

                {/* Loading indicator */}
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="inline-flex items-center gap-2 rounded-full bg-white/85 px-3 py-2 text-sm font-semibold text-slate-700 shadow-md backdrop-blur-md">
                      <Loader2 className="h-4 w-4 animate-spin text-gray-700" />
                      Preparing video
                    </span>
                  </div>
                )}

                {/* Controls */}
                <div
                  className={`absolute inset-x-4 bottom-4 flex flex-col gap-3 transition-all duration-300 ${
                    controlsVisible
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-3'
                  }`}
                >
                  <div className="relative h-[6px] rounded-full bg-white/75 backdrop-blur-md shadow-inner shadow-slate-300/50">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-gray-900 via-gray-700 to-gray-500 shadow-[0_3px_10px_-5px_rgba(0,0,0,0.35)]"
                      style={{ width: `${progressPercent}%` }}
                    />
                    <input
                      type="range"
                      min={0}
                      max={100}
                      step={0.1}
                      value={progressPercent}
                      onChange={(event) =>
                        handleSeek(event.currentTarget.valueAsNumber)
                      }
                      onMouseDown={() => setIsSeeking(true)}
                      onMouseUp={() => setIsSeeking(false)}
                      className="absolute inset-0 h-full w-full cursor-pointer appearance-none bg-transparent opacity-0"
                      aria-label="Seek"
                      style={{ WebkitTapHighlightColor: 'transparent' }}
                    />
                  </div>

                  <div className="flex items-center justify-between gap-3 rounded-xl bg-white/75 px-3 py-2.5 text-xs sm:text-sm text-slate-700 shadow-lg shadow-slate-500/20 backdrop-blur-xl border border-white/70">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={togglePlay}
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-gray-900 to-gray-700 text-white shadow-md transition hover:shadow-lg"
                        aria-label={isPlaying ? 'Pause video' : 'Play video'}
                      >
                        {isPlaying ? (
                          <Pause className="h-5 w-5" />
                        ) : (
                          <Play className="h-5 w-5 translate-x-[1px]" />
                        )}
                      </button>

                      <div className="flex items-center gap-1.5 font-semibold text-slate-800">
                        <span className="tabular-nums">
                          {formatTime(progress)}
                        </span>
                        <span className="text-slate-400">/</span>
                        <span className="tabular-nums text-slate-500">
                          {formatTime(duration)}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={handleToggleMute}
                          className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-sm ring-1 ring-white/70 transition hover:shadow-md"
                          aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                        >
                          {isMuted || volume === 0 ? (
                            <VolumeX className="h-5 w-5" />
                          ) : (
                            <Volume2 className="h-5 w-5" />
                          )}
                        </button>
                        <input
                          type="range"
                          min={0}
                          max={1}
                          step={0.01}
                          value={isMuted ? 0 : volume}
                          onChange={(event) =>
                            handleVolumeChange(
                              event.currentTarget.valueAsNumber
                            )
                          }
                          className="w-24 cursor-pointer accent-gray-800"
                          aria-label="Volume"
                        />
                      </div>

                      <button
                        type="button"
                        onClick={handleFullscreen}
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-sm ring-1 ring-white/70 transition hover:shadow-md"
                        aria-label="Toggle fullscreen"
                      >
                        <Maximize className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Proof Points */}
        <div
          className={`flex flex-wrap gap-4 mb-8 mt-10 transition-all duration-400 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}
          style={{ transitionDelay: '1100ms' }}
        >
          {[
            'For B2B/B2C SaaS with traffic + sign-ups (MRR $3k–$50k)',
            'Data → UX → Motion → Code → Metrics',
            'Implemented by us. Verified by your analytics.',
          ].map((text, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-2 text-sm text-gray-500"
              style={{ animationDelay: `${1100 + i * 80}ms` }}
            >
              <span className="w-1 h-1 bg-gray-400 rounded-full" />
              {text}
            </span>
          ))}
        </div>

        {/* Mini Bullets */}
        <div
          className={`flex flex-wrap gap-6 transition-all duration-400 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}
          style={{ transitionDelay: '1300ms' }}
        >
          {[
            'Find where users drop',
            'Ship 1–2 high-impact fixes',
            'Measure activation + paywall conversion',
          ].map((text, i) => (
            <div
              key={i}
              className="flex items-center gap-2 text-sm font-medium"
              style={{ animationDelay: `${1300 + i * 100}ms` }}
            >
              <span className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center text-xs">
                {i + 1}
              </span>
              {text}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </section>
  );
}
