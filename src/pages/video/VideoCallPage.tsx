import React, { useEffect, useRef, useState } from "react";
import {
  Camera,
  CameraOff,
  Mic,
  MicOff,
  ScreenShare,
  PhoneOff,
  PhoneCall,
} from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Card, CardBody, CardHeader } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";

export const VideoCallPage: React.FC = () => {
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const screenVideoRef = useRef<HTMLVideoElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [screenStream, setScreenStream] = useState<MediaStream | null>(null);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [isCallActive, setIsCallActive] = useState(false);
  const [callStatus, setCallStatus] = useState("Ready to start");

  useEffect(() => {
    if (localVideoRef.current && stream) {
      localVideoRef.current.srcObject = stream;
    }
  }, [stream]);

  useEffect(() => {
    if (screenVideoRef.current && screenStream) {
      screenVideoRef.current.srcObject = screenStream;
    }
  }, [screenStream]);

  useEffect(() => {
    return () => {
      stream?.getTracks().forEach((track) => track.stop());
      screenStream?.getTracks().forEach((track) => track.stop());
    };
  }, [stream, screenStream]);

  const startCall = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setStream(mediaStream);
      setIsCallActive(true);
      setCallStatus("Connected in mock WebRTC room");
    } catch {
      setCallStatus("Camera access blocked. Showing call mockup only.");
      setIsCallActive(true);
    }
  };

  const endCall = () => {
    stream?.getTracks().forEach((track) => track.stop());
    screenStream?.getTracks().forEach((track) => track.stop());
    setStream(null);
    setScreenStream(null);
    setIsCallActive(false);
    setCallStatus("Call ended");
  };

  const toggleTrack = (kind: "audio" | "video") => {
    if (!stream) {
      setAudioEnabled(kind === "audio" ? !audioEnabled : audioEnabled);
      setVideoEnabled(kind === "video" ? !videoEnabled : videoEnabled);
      return;
    }

    stream.getTracks().forEach((track) => {
      if (track.kind === kind) {
        track.enabled = !track.enabled;
      }
    });

    if (kind === "audio") {
      setAudioEnabled((previous) => !previous);
    } else {
      setVideoEnabled((previous) => !previous);
    }
  };

  const toggleScreenShare = async () => {
    if (screenStream) {
      screenStream.getTracks().forEach((track) => track.stop());
      setScreenStream(null);
      return;
    }

    try {
      const displayStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
      });
      setScreenStream(displayStream);
    } catch {
      setCallStatus("Screen share was not started");
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-primary-800 to-secondary-700 p-6 text-white shadow-xl">
        <p className="text-xs uppercase tracking-[0.3em] text-white/60">
          Week 2 milestone
        </p>
        <h1 className="mt-2 text-3xl font-bold">Video Calling Section</h1>
        <p className="mt-2 max-w-2xl text-sm text-white/85">
          A frontend-only WebRTC experience with start/end controls, mic and
          camera toggles, and optional screen share support.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Badge variant="primary">WebRTC mock</Badge>
          <Badge variant="secondary">Audio + video</Badge>
          <Badge variant="accent">Screen share optional</Badge>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
        <Card className="overflow-hidden border border-gray-200 shadow-lg">
          <CardHeader className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Live room</h2>
              <p className="text-sm text-gray-500">{callStatus}</p>
            </div>
            <Badge variant={isCallActive ? "success" : "gray"}>
              {isCallActive ? "In call" : "Idle"}
            </Badge>
          </CardHeader>
          <CardBody className="space-y-4">
            <div className="grid gap-4 lg:grid-cols-2">
              <div className="rounded-3xl border border-gray-200 bg-gray-950 p-3">
                <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-[0.24em] text-white/60">
                  <span>You</span>
                  <span>{videoEnabled ? "Camera on" : "Camera off"}</span>
                </div>
                <video
                  ref={localVideoRef}
                  autoPlay
                  muted
                  playsInline
                  className="h-72 w-full rounded-2xl bg-gray-900 object-cover"
                />
              </div>
              <div className="rounded-3xl border border-dashed border-gray-300 bg-gray-50 p-3">
                <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-[0.24em] text-gray-500">
                  <span>Remote participant</span>
                  <span>Mock feed</span>
                </div>
                <div className="flex h-72 items-center justify-center rounded-2xl bg-gradient-to-br from-gray-100 to-white text-center">
                  <div>
                    <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-primary-100 text-primary-700">
                      <PhoneCall size={28} />
                    </div>
                    <p className="font-semibold text-gray-900">
                      Investor room ready
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      Use this area for a live peer feed or stream placeholder.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {screenStream && (
              <div className="rounded-2xl border border-secondary-100 bg-secondary-50 p-3">
                <div className="mb-2 flex items-center justify-between text-sm font-medium text-secondary-800">
                  <span>Screen share preview</span>
                  <span>Active</span>
                </div>
                <video
                  ref={screenVideoRef}
                  autoPlay
                  playsInline
                  className="h-52 w-full rounded-xl bg-black object-cover"
                />
              </div>
            )}

            <div className="flex flex-wrap gap-3">
              <Button
                variant="success"
                leftIcon={<PhoneCall size={16} />}
                onClick={startCall}
                disabled={isCallActive}
              >
                Start call
              </Button>
              <Button
                variant="error"
                leftIcon={<PhoneOff size={16} />}
                onClick={endCall}
                disabled={!isCallActive}
              >
                End call
              </Button>
              <Button
                variant="outline"
                leftIcon={
                  videoEnabled ? <Camera size={16} /> : <CameraOff size={16} />
                }
                onClick={() => toggleTrack("video")}
                disabled={!isCallActive}
              >
                {videoEnabled ? "Video on" : "Video off"}
              </Button>
              <Button
                variant="outline"
                leftIcon={
                  audioEnabled ? <Mic size={16} /> : <MicOff size={16} />
                }
                onClick={() => toggleTrack("audio")}
                disabled={!isCallActive}
              >
                {audioEnabled ? "Audio on" : "Audio off"}
              </Button>
              <Button
                variant="outline"
                leftIcon={<ScreenShare size={16} />}
                onClick={toggleScreenShare}
                disabled={!isCallActive}
              >
                {screenStream ? "Stop share" : "Share screen"}
              </Button>
            </div>
          </CardBody>
        </Card>

        <Card className="border border-gray-200 shadow-lg">
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900">
              Call controls
            </h2>
          </CardHeader>
          <CardBody className="space-y-4">
            <div className="rounded-2xl bg-gray-50 p-4">
              <p className="text-sm font-semibold text-gray-900">
                Meeting state
              </p>
              <p className="mt-1 text-sm text-gray-600">
                This panel gives you a polished calling interface even when live
                media permissions are not available.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-gray-200 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-gray-500">
                  Latency
                </p>
                <p className="mt-2 text-2xl font-bold text-gray-900">18 ms</p>
              </div>
              <div className="rounded-2xl border border-gray-200 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-gray-500">
                  Quality
                </p>
                <p className="mt-2 text-2xl font-bold text-secondary-700">HD</p>
              </div>
            </div>
            <div className="rounded-2xl border border-dashed border-gray-300 p-4 text-sm text-gray-600">
              Screen share is optional and can be turned on when a live demo
              needs it.
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};
