"use client";

import { useRef, forwardRef, useImperativeHandle } from "react";
import IconAudio from "../../../public/assets/icons/mingcute_voice-fill";
import Button from "../components/Button";

const AudioRecorder = forwardRef(({ onRecordingStart, onRecordingStop, isRecording }, ref) => {
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const audioStreamRef = useRef(null);

  useImperativeHandle(ref, () => ({
    stopRecording: () => {
      if (mediaRecorderRef.current && isRecording) {
        mediaRecorderRef.current.stop();
      }
    },
    getRecordedAudio: () => {
      if (audioChunksRef.current.length > 0) {
        return new Blob(audioChunksRef.current, { type: "audio/wav" });
      }
      return null;
    },
  }));

  const getSupportedMimeType = () => {
    const possibleTypes = ["audio/wav", "audio/webm", "audio/mp4", "audio/ogg"];

    for (const type of possibleTypes) {
      if (MediaRecorder.isTypeSupported(type)) {
        return type;
      }
    }

    return undefined;
  };

  const handleRecordToggle = async () => {
    if (isRecording) {
      mediaRecorderRef.current.stop();
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        audioStreamRef.current = stream;

        const options = {
          mimeType: getSupportedMimeType(),
          audioBitsPerSecond: 128000,
        };

        const mediaRecorder = new MediaRecorder(stream, options);
        mediaRecorderRef.current = mediaRecorder;

        audioChunksRef.current = [];

        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            audioChunksRef.current.push(event.data);
          }
        };

        mediaRecorder.onstop = () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: mediaRecorder.mimeType });

          if (audioStreamRef.current) {
            audioStreamRef.current.getTracks().forEach((track) => track.stop());
            audioStreamRef.current = null;
          }

          if (onRecordingStop) {
            onRecordingStop(audioBlob);
          }
        };

        mediaRecorder.start();
        if (onRecordingStart) onRecordingStart();
      } catch (err) {
        console.error("Microphone access denied or error:", err);
        if (audioStreamRef.current) {
          audioStreamRef.current.getTracks().forEach((track) => track.stop());
          audioStreamRef.current = null;
        }
      }
    }
  };

  return (
    <Button variant="primary" className="flex flex-row gap-1" onClick={handleRecordToggle}>
      <IconAudio />
      {isRecording ? "Stop Recording" : "Start Recording"}
    </Button>
  );
});

AudioRecorder.displayName = "AudioRecorder";

export default AudioRecorder;
