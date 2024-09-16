
import { PrivateRoute } from "./private";
import { useState } from 'react'
import {MarkdownRenderer} from '../components/markdown-renderer'
import VoiceRecorder from '../components/voice-recorder'

function QueryLectures() {
    const [markdownContent, setMarkdownContent] = useState('Your notes will appear here')
    
  return (

      <div className="space-y-6">
            <div className="space-y-4">
                <VoiceRecorder setMarkdownContent={setMarkdownContent} />
                <MarkdownRenderer content={markdownContent} />
            </div>
        </div>
  );
}

export function Lectures() {
  return (
    <PrivateRoute>
      <QueryLectures />
    </PrivateRoute>
  );
}
