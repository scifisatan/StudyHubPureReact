
import React, { useState, useRef } from 'react'
import { Mic, Square } from 'lucide-react'
import { toast } from "sonner";
import { getLectureSummary } from '@/api';
type VoiceRecorderProps = {
    setMarkdownContent: (content: string) => void;
};

const VoiceRecorder: React.FC<VoiceRecorderProps> = ({setMarkdownContent }) => {
    const [isRecording, setIsRecording] = useState(false)
    const [audioUrl, setAudioUrl] = useState<string | null>(null)
    const mediaRecorderRef = useRef<MediaRecorder | null>(null)
    const audioRef = useRef<HTMLAudioElement | null>(null)


    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
            mediaRecorderRef.current = new MediaRecorder(stream)
            const chunks: Blob[] = []

            mediaRecorderRef.current.ondataavailable = (e) => chunks.push(e.data)
            mediaRecorderRef.current.onstop = () => {
                const blob = new Blob(chunks, { type: 'audio/wav' })
                setAudioUrl(URL.createObjectURL(blob))
                getLectureSummary(blob).then((data) => {
                    setMarkdownContent(data)
                }
                )
               
            }

            mediaRecorderRef.current.start()
            setIsRecording(true)
        } catch (err) {
            console.error('Error accessing microphone:', err)
        }
    }

    const stopRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop()
            setIsRecording(false)
            toast.success("Audio has been recorded successfully.")
            setMarkdownContent('Kati ramro aawaj timro')
        }
    }

    const toggleRecording = () => {
        if (isRecording) {
            stopRecording()
        } else {
            startRecording()
        }
    }


    return (
        <div className="flex items-center space-x-10 my-8 justify-center">
          <div className="flex flex-col items-center space-y-2">
           <button
                onClick={toggleRecording}
                className={`p-4 rounded-full ${isRecording ? 'bg-red-500' : 'bg-blue-500'
                } text-white hover:opacity-80 transition-opacity`}
            >
                {isRecording ? <Square size={24} /> : <Mic size={24} />}
            </button>
                <span className="text-xs" >{isRecording ? 'Stop recording' : 'Start recording'}</span>
                </div>
            {audioUrl && (
                    <audio  controls ref={audioRef} src={audioUrl}  />
            )}
        </div>
    )
}

export default VoiceRecorder