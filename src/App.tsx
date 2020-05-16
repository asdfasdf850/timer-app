import React, { useState, useRef } from 'react'
import './App.css'

function padTime(time: number): string {
  return time.toString().padStart(2, '0')
}

function App() {
  const [title, setTitle] = useState<string>('Let the countdown begin')
  const [timeLeft, setTimeLeft] = useState<number>(25 * 60)
  const [isRunning, setIsRunning] = useState<boolean>(false)
  const intervalRef = useRef<number | null>(null)

  function startTimer(): void {
    if (intervalRef.current !== null) return

    setTitle("You're doing great!")
    setIsRunning(true)
    intervalRef.current = window.setInterval(() => {
      setTimeLeft(timeLeft => {
        if (timeLeft >= 1) return timeLeft - 1

        resetTimer()
        return 0
      })
    }, 1000)
  }

  function stopTimer(): void {
    if (intervalRef.current === null) return
    clearInterval(intervalRef.current)
    intervalRef.current = null
    setTitle('Keep it up')
    setIsRunning(false)
  }

  function resetTimer(): void {
    clearInterval(intervalRef.current as number)
    intervalRef.current = null
    setTitle('Ready to go another round?')
    setTimeLeft(25 * 60)
    setIsRunning(false)
  }

  const minutes = padTime(Math.floor(timeLeft / 60))
  const seconds = padTime(timeLeft - +minutes * 60)

  return (
    <div className='app'>
      <h2>{title}</h2>

      <div className='timer'>
        <span>{minutes}</span>
        <span>:</span>
        <span>{seconds}</span>
      </div>

      <div className='buttons'>
        {!isRunning && <button onClick={startTimer}>Start</button>}
        {isRunning && <button onClick={stopTimer}>Stop</button>}
        <button onClick={resetTimer}>Reset</button>
      </div>
    </div>
  )
}

export default App
