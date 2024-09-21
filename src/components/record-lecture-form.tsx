import React, { useState, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MicIcon, Square } from 'lucide-react'

export default function RecordLectureForm() {
  const [isRecording, setIsRecording] = useState(false)
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder

      const chunks: BlobPart[] = []
      mediaRecorder.ondataavailable = (e) => chunks.push(e.data)
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/ogg; codecs=opus' })
        setAudioBlob(blob)
      }

      mediaRecorder.start()
      setIsRecording(true)
    } catch (error) {
      console.error('Error accessing microphone:', error)
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the form data to your backend
    console.log('Form submitted')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Lecture Title</Label>
        <Input id="title" required />
      </div>
      <div>
        <Label htmlFor="date">Date</Label>
        <Input id="date" type="date" required />
      </div>
      <div>
        <Label>Audio</Label>
        {!isRecording && !audioBlob && (
          <Button type="button" onClick={startRecording}>
            <MicIcon className="mr-2 h-4 w-4" /> Start Recording
          </Button>
        )}
        {isRecording && (
          <Button type="button" onClick={stopRecording} variant="destructive">
            <Square className="mr-2 h-4 w-4" /> Stop Recording
          </Button>
        )}
        {audioBlob && (
          <audio src={URL.createObjectURL(audioBlob)} controls className="w-full mt-2" />
        )}
      </div>
      <Button type="submit" disabled={!audioBlob}>Submit</Button>
    </form>
  )
}